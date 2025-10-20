
// AI模型路由云函数 - 统一处理所有AI模型调用
const cloud = require('@cloudbase/node-sdk');

const app = cloud.init({
  env: cloud.getCurrentEnv()
});

const db = app.database();

// 模型映射配置
const MODEL_CONFIG = {
  'gpt-4': {
    functionName: 'openai-api',
    modelId: 'openai-gpt-4',
    provider: 'OpenAI'
  },
  'claude-3': {
    functionName: 'anthropic-api',
    modelId: 'anthropic-claude-3',
    provider: 'Anthropic'
  },
  'gemini-pro': {
    functionName: 'google-api',
    modelId: 'google-gemini-pro',
    provider: 'Google'
  },
  'qwen-max': {
    functionName: 'qwen-api',
    modelId: 'alibaba-qwen-max',
    provider: '阿里云'
  },
  'baichuan2': {
    functionName: 'baichuan-api',
    modelId: 'baichuan2',
    provider: '百川智能'
  },
  'yi-large': {
    functionName: 'yi-api',
    modelId: 'yi-large',
    provider: '零一万物'
  },
  'wenxin': {
    functionName: 'baidu-api',
    modelId: 'baidu-wenxin',
    provider: '百度'
  }
};

exports.main = async (event, context) => {
  const { 
    model, 
    messages, 
    temperature = 0.7, 
    maxTokens = 2000,
    userId,
    sessionId,
    fallbackEnabled = true 
  } = event;

  try {
    // 验证用户权限
    if (!userId) {
      throw new Error('用户ID不能为空');
    }

    // 检查用户配额
    const quotaCheck = await checkUserQuota(userId);
    if (!quotaCheck.allowed) {
      throw new Error(quotaCheck.message || '配额不足');
    }

    // 获取模型配置
    const modelConfig = MODEL_CONFIG[model];
    if (!modelConfig) {
      throw new Error(`不支持的模型: ${model}`);
    }

    // 检查模型是否可用
    const modelStatus = await checkModelStatus(modelConfig.modelId);
    if (!modelStatus.available) {
      if (fallbackEnabled) {
        // 尝试使用备用模型
        const fallbackModel = await getFallbackModel(model);
        if (fallbackModel) {
          console.log(`模型 ${model} 不可用，切换到备用模型 ${fallbackModel}`);
          return await callAIModel(fallbackModel, { messages, temperature, maxTokens, userId, sessionId });
        }
      }
      throw new Error(`模型 ${model} 当前不可用`);
    }

    // 调用指定的AI模型
    return await callAIModel(model, { messages, temperature, maxTokens, userId, sessionId });

  } catch (error) {
    console.error('AI路由调用失败:', error);
    
    // 记录错误日志
    await db.collection('ai_error_logs').add({
      user_id: userId,
      session_id: sessionId,
      error_type: 'ai_router_error',
      error_message: error.message,
      error_stack: error.stack,
      timestamp: new Date().toISOString(),
      model: model
    });

    return {
      success: false,
      error: error.message || 'AI服务调用失败'
    };
  }
};

async function callAIModel(model, params) {
  const modelConfig = MODEL_CONFIG[model];
  
  try {
    // 调用对应的云函数
    const result = await app.callFunction({
      name: modelConfig.functionName,
      data: {
        model: model,
        ...params
      }
    });

    return result.result;
  } catch (error) {
    console.error(`调用模型 ${model} 失败:`, error);
    throw error;
  }
}

async function checkUserQuota(userId) {
  try {
    const today = new Date().toISOString().split('T')[0];
    
    // 获取今日使用统计
    const usageResult = await db.collection('ai_usage_billing')
      .where({
        user_id: userId,
        billing_period: today
      })
      .get();

    let totalTokens = 0;
    let totalCost = 0;
    
    usageResult.data.forEach(record => {
      totalTokens += record.total_tokens || 0;
      totalCost += record.total_cost || 0;
    });

    // 获取用户配额设置
    const userResult = await db.collection('users')
      .where({
        _id: userId
      })
      .get();

    if (userResult.data.length === 0) {
      return { allowed: false, message: '用户不存在' };
    }

    const user = userResult.data[0];
    const quotaLimit = user.ai_quota_limit || 10000; // 默认10000 tokens
    const costLimit = user.ai_cost_limit || 1.0; // 默认1美元

    if (totalTokens >= quotaLimit) {
      return { allowed: false, message: 'Token配额已用完' };
    }

    if (totalCost >= costLimit) {
      return { allowed: false, message: '费用配额已用完' };
    }

    return { 
      allowed: true, 
      remainingTokens: quotaLimit - totalTokens,
      remainingCost: costLimit - totalCost
    };

  } catch (error) {
    console.error('检查用户配额失败:', error);
    return { allowed: false, message: '配额检查失败' };
  }
}

async function checkModelStatus(modelId) {
  try {
    const result = await db.collection('ai_model_config')
      .where({
        model_id: modelId,
        status: 'active'
      })
      .get();

    return {
      available: result.data.length > 0,
      config: result.data[0] || null
    };
  } catch (error) {
    console.error('检查模型状态失败:', error);
    return { available: false };
  }
}

async function getFallbackModel(currentModel) {
  // 备用模型优先级列表
  const fallbackPriority = ['gpt-4', 'claude-3', 'qwen-max', 'wenxin'];
  
  for (const model of fallbackPriority) {
    if (model !== currentModel) {
      const status = await checkModelStatus(MODEL_CONFIG[model].modelId);
      if (status.available) {
        return model;
      }
    }
  }
  
  return null;
}
