
'use strict';

const cloudbase = require('@cloudbase/node-sdk');
const app = cloudbase.init();

/**
 * AI服务调度器
 * 支持多种AI模型API调用
 */
class AIServiceDispatcher {
  constructor() {
    this.supportedModels = ['openai', 'wenxin', 'tongyi', 'zhipu', 'claude'];
  }

  /**
   * 验证输入参数
   */
  validateInput(modelType, message, config) {
    if (!modelType || typeof modelType !== 'string') {
      throw new Error('modelType is required and must be a string');
    }
    
    if (!this.supportedModels.includes(modelType.toLowerCase())) {
      throw new Error(`Unsupported model type: ${modelType}. Supported models: ${this.supportedModels.join(', ')}`);
    }
    
    if (!message || typeof message !== 'string') {
      throw new Error('message is required and must be a string');
    }
    
    if (!config || typeof config !== 'object') {
      throw new Error('config is required and must be an object');
    }
  }

  /**
   * 调用OpenAI API
   */
  async callOpenAI(message, config) {
    const { apiKey, model = 'gpt-3.5-turbo', temperature = 0.7, maxTokens = 1000 } = config;
    
    if (!apiKey) {
      throw new Error('OpenAI API key is required');
    }

    const requestBody = {
      model,
      messages: [{ role: 'user', content: message }],
      temperature,
      max_tokens: maxTokens
    };

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`OpenAI API error: ${response.status} - ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    return {
      model: data.model,
      content: data.choices[0]?.message?.content || '',
      usage: data.usage,
      finishReason: data.choices[0]?.finish_reason
    };
  }

  /**
   * 调用文心一言API
   */
  async callWenxin(message, config) {
    const { apiKey, secretKey, model = 'ernie-bot', temperature = 0.7 } = config;
    
    if (!apiKey || !secretKey) {
      throw new Error('Wenxin API key and secret key are required');
    }

    // 获取access token
    const tokenResponse = await fetch(`https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=${apiKey}&client_secret=${secretKey}`, {
      method: 'POST'
    });

    if (!tokenResponse.ok) {
      throw new Error('Failed to get Wenxin access token');
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    const requestBody = {
      messages: [{ role: 'user', content: message }],
      temperature,
      penalty_score: 1.0
    };

    const response = await fetch(`https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/${model}?access_token=${accessToken}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Wenxin API error: ${response.status} - ${errorData.error_msg || response.statusText}`);
    }

    const data = await response.json();
    return {
      model,
      content: data.result || '',
      usage: data.usage,
      finishReason: data.is_end ? 'stop' : 'length'
    };
  }

  /**
   * 调用通义千问API
   */
  async callTongyi(message, config) {
    const { apiKey, model = 'qwen-turbo', temperature = 0.7, maxTokens = 1000 } = config;
    
    if (!apiKey) {
      throw new Error('Tongyi API key is required');
    }

    const requestBody = {
      model,
      input: {
        messages: [{ role: 'user', content: message }]
      },
      parameters: {
        temperature,
        max_tokens: maxTokens
      }
    };

    const response = await fetch('https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Tongyi API error: ${response.status} - ${errorData.message || response.statusText}`);
    }

    const data = await response.json();
    return {
      model,
      content: data.output?.text || '',
      usage: data.usage,
      finishReason: data.output?.finish_reason
    };
  }

  /**
   * 调用智谱AI API
   */
  async callZhipu(message, config) {
    const { apiKey, model = 'glm-3-turbo', temperature = 0.7, maxTokens = 1000 } = config;
    
    if (!apiKey) {
      throw new Error('Zhipu API key is required');
    }

    const requestBody = {
      model,
      messages: [{ role: 'user', content: message }],
      temperature,
      max_tokens: maxTokens
    };

    const response = await fetch('https://open.bigmodel.cn/api/paas/v4/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Zhipu API error: ${response.status} - ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    return {
      model: data.model,
      content: data.choices[0]?.message?.content || '',
      usage: data.usage,
      finishReason: data.choices[0]?.finish_reason
    };
  }

  /**
   * 调用Claude API
   */
  async callClaude(message, config) {
    const { apiKey, model = 'claude-3-sonnet-20240229', maxTokens = 1000 } = config;
    
    if (!apiKey) {
      throw new Error('Claude API key is required');
    }

    const requestBody = {
      model,
      max_tokens: maxTokens,
      messages: [{ role: 'user', content: message }]
    };

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Claude API error: ${response.status} - ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    return {
      model: data.model,
      content: data.content[0]?.text || '',
      usage: data.usage,
      finishReason: data.stop_reason
    };
  }

  /**
   * 调度AI服务
   */
  async dispatch(modelType, message, config) {
    try {
      this.validateInput(modelType, message, config);
      
      const normalizedModelType = modelType.toLowerCase();
      let result;

      switch (normalizedModelType) {
        case 'openai':
          result = await this.callOpenAI(message, config);
          break;
        case 'wenxin':
          result = await this.callWenxin(message, config);
          break;
        case 'tongyi':
          result = await this.callTongyi(message, config);
          break;
        case 'zhipu':
          result = await this.callZhipu(message, config);
          break;
        case 'claude':
          result = await this.callClaude(message, config);
          break;
        default:
          throw new Error(`Unsupported model type: ${modelType}`);
      }

      return {
        success: true,
        data: result,
        error: null
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: error.message || 'Unknown error occurred'
      };
    }
  }
}

/**
 * 云函数主入口
 */
exports.main = async (event, context) => {
  const { modelType, message, config } = event;
  
  if (!modelType || !message || !config) {
    return {
      success: false,
      data: null,
      error: 'Missing required parameters: modelType, message, config'
    };
  }

  const dispatcher = new AIServiceDispatcher();
  return await dispatcher.dispatch(modelType, message, config);
};
