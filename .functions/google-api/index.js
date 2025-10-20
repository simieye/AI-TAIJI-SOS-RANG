
// Google Gemini API调用云函数
const cloud = require('@cloudbase/node-sdk');
const axios = require('axios');

const app = cloud.init({
  env: cloud.getCurrentEnv()
});

const db = app.database();

exports.main = async (event, context) => {
  const { 
    model, 
    messages, 
    temperature = 0.7, 
    maxTokens = 2000,
    userId,
    sessionId 
  } = event;

  try {
    // 获取Google Gemini配置
    const configResult = await db.collection('ai_model_config')
      .where({
        model_id: 'google-gemini-pro',
        status: 'active'
      })
      .get();
    
    if (configResult.data.length === 0) {
      throw new Error('Google Gemini配置未找到或未激活');
    }

    const config = configResult.data[0];
    const apiKey = config.api_key;
    const apiBase = config.api_base || 'https://generativelanguage.googleapis.com';
    const modelId = model || 'gemini-pro';

    // 记录请求开始时间
    const startTime = Date.now();

    // 转换消息格式为Gemini格式
    const geminiMessages = messages.map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));

    // 调用Google Gemini API
    const response = await axios.post(`${apiBase}/v1beta/models/${modelId}:generateContent?key=${apiKey}`, {
      contents: geminiMessages,
      generationConfig: {
        temperature: temperature,
        maxOutputTokens: maxTokens,
        candidateCount: 1
      }
    }, {
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 30000
    });

    const endTime = Date.now();
    const responseTime = endTime - startTime;

    const aiResponse = response.data.candidates[0].content.parts[0].text;
    const usage = response.data.usageMetadata;
    const totalTokens = usage.totalTokenCount;
    const inputTokens = usage.promptTokenCount;
    const outputTokens = usage.candidatesTokenCount;

    // 计算费用
    const costPerToken = 0.00002; // Gemini Pro的价格
    const totalCost = totalTokens * costPerToken;

    // 保存对话记录
    await db.collection('ai_conversation_record').add({
      user_id: userId,
      session_id: sessionId,
      message_id: `msg_${Date.now()}`,
      message_type: 'ai_response',
      message_content: aiResponse,
      ai_model_id: 'google-gemini-pro',
      ai_model_name: 'Gemini Pro',
      ai_provider: 'Google',
      message_timestamp: new Date().toISOString(),
      conversation_status: 'active',
      token_count: totalTokens,
      input_tokens: inputTokens,
      output_tokens: outputTokens,
      response_time: responseTime,
      cost_amount: totalCost,
      currency: 'USD',
      model_parameters: {
        temperature: temperature,
        max_tokens: maxTokens
      }
    });

    // 更新使用统计
    await updateUsageStats(userId, 'google-gemini-pro', totalTokens, totalCost);

    return {
      success: true,
      data: {
        content: aiResponse,
        model: modelId,
        usage: {
          totalTokens,
          inputTokens,
          outputTokens
        },
        responseTime,
        cost: totalCost
      }
    };

  } catch (error) {
    console.error('Google Gemini API调用失败:', error);
    
    // 记录错误日志
    await db.collection('ai_error_logs').add({
      user_id: userId,
      session_id: sessionId,
      error_type: 'google_api_error',
      error_message: error.message,
      error_stack: error.stack,
      timestamp: new Date().toISOString(),
      model: model
    });

    return {
      success: false,
      error: error.message || 'Google Gemini API调用失败'
    };
  }
};

async function updateUsageStats(userId, modelId, tokens, cost) {
  try {
    const today = new Date().toISOString().split('T')[0];
    
    // 查找今日使用记录
    const existingRecord = await db.collection('ai_usage_billing')
      .where({
        user_id: userId,
        billing_period: today,
        ai_model_id: modelId
      })
      .get();

    if (existingRecord.data.length > 0) {
      // 更新现有记录
      const record = existingRecord.data[0];
      await db.collection('ai_usage_billing').doc(record._id).update({
        total_requests: record.total_requests + 1,
        total_tokens: record.total_tokens + tokens,
        total_cost: record.total_cost + cost,
        last_used: new Date().toISOString()
      });
    } else {
      // 创建新记录
      await db.collection('ai_usage_billing').add({
        user_id: userId,
        billing_period: today,
        ai_model_id: modelId,
        total_requests: 1,
        total_tokens: tokens,
        total_cost: cost,
        currency: 'USD',
        created_at: new Date().toISOString(),
        last_used: new Date().toISOString()
      });
    }
  } catch (error) {
    console.error('更新使用统计失败:', error);
  }
}
