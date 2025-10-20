
'use strict';

const cloudbase = require('@cloudbase/node-sdk');
const app = cloudbase.init();

/**
 * 文心一言API处理器
 * 专门处理百度文心一言模型的API调用
 */
class WenxinHandler {
  constructor() {
    this.supportedModels = [
      'ernie-bot',
      'ernie-bot-turbo',
      'ernie-bot-4',
      'ernie-bot-8k',
      'ernie-bot-pro',
      'ernie-bot-pro-8k',
      'ernie-speed-8k',
      'ernie-speed-128k',
      'ernie-lite-8k',
      'ernie-tiny-8k'
    ];
    this.tokenCache = new Map();
    this.tokenCacheTimeout = 50 * 60 * 1000; // 50分钟缓存
  }

  /**
   * 验证API密钥格式
   */
  validateApiKeys(apiKey, secretKey) {
    if (!apiKey || typeof apiKey !== 'string') {
      throw new Error('API key is required and must be a string');
    }
    
    if (!secretKey || typeof secretKey !== 'string') {
      throw new Error('Secret key is required and must be a string');
    }
    
    if (apiKey.length < 10) {
      throw new Error('API key appears to be too short');
    }
    
    if (secretKey.length < 10) {
      throw new Error('Secret key appears to be too short');
    }
  }

  /**
   * 验证模型名称
   */
  validateModel(model) {
    if (!model || typeof model !== 'string') {
      throw new Error('Model is required and must be a string');
    }
    
    if (!this.supportedModels.includes(model)) {
      throw new Error(`Unsupported model: ${model}. Supported models: ${this.supportedModels.join(', ')}`);
    }
  }

  /**
   * 验证消息格式
   */
  validateMessages(messages) {
    if (!Array.isArray(messages)) {
      throw new Error('Messages must be an array');
    }
    
    if (messages.length === 0) {
      throw new Error('Messages array cannot be empty');
    }
    
    for (const message of messages) {
      if (!message.role || !message.content) {
        throw new Error('Each message must have role and content properties');
      }
      
      if (!['user', 'assistant'].includes(message.role)) {
        throw new Error('Message role must be one of: user, assistant');
      }
      
      if (typeof message.content !== 'string') {
        throw new Error('Message content must be a string');
      }
      
      if (message.content.length > 4800) {
        throw new Error('Message content is too long (max 4800 characters)');
      }
    }
  }

  /**
   * 验证温度参数
   */
  validateTemperature(temperature) {
    if (temperature !== undefined) {
      if (typeof temperature !== 'number') {
        throw new Error('Temperature must be a number');
      }
      
      if (temperature < 0.01 || temperature > 1.0) {
        throw new Error('Temperature must be between 0.01 and 1.0');
      }
    }
  }

  /**
   * 验证top_p参数
   */
  validateTopP(topP) {
    if (topP !== undefined) {
      if (typeof topP !== 'number') {
        throw new Error('TopP must be a number');
      }
      
      if (topP < 0 || topP > 1) {
        throw new Error('TopP must be between 0 and 1');
      }
    }
  }

  /**
   * 验证惩罚分数
   */
  validatePenaltyScore(penaltyScore) {
    if (penaltyScore !== undefined) {
      if (typeof penaltyScore !== 'number') {
        throw new Error('Penalty score must be a number');
      }
      
      if (penaltyScore < 1.0 || penaltyScore > 2.0) {
        throw new Error('Penalty score must be between 1.0 and 2.0');
      }
    }
  }

  /**
   * 验证所有参数
   */
  validateParams(params) {
    const { apiKey, secretKey, model, messages, temperature, topP, penaltyScore } = params;
    
    this.validateApiKeys(apiKey, secretKey);
    this.validateModel(model);
    this.validateMessages(messages);
    this.validateTemperature(temperature);
    this.validateTopP(topP);
    this.validatePenaltyScore(penaltyScore);
  }

  /**
   * 获取缓存的access_token
   */
  getCachedToken(apiKey) {
    const cached = this.tokenCache.get(apiKey);
    if (cached && Date.now() - cached.timestamp < this.tokenCacheTimeout) {
      return cached.token;
    }
    return null;
  }

  /**
   * 缓存access_token
   */
  cacheToken(apiKey, token) {
    this.tokenCache.set(apiKey, {
      token,
      timestamp: Date.now()
    });
  }

  /**
   * 获取access_token
   */
  async getAccessToken(apiKey, secretKey) {
    // 先检查缓存
    const cachedToken = this.getCachedToken(apiKey);
    if (cachedToken) {
      return cachedToken;
    }

    // 获取新的access_token
    const url = `https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=${apiKey}&client_secret=${secretKey}`;
    
    const response = await fetch(url, {
      method: 'POST'
    });
    
    if (!response.ok) {
      throw new Error(`Failed to get access token: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (data.error) {
      throw new Error(`Access token error: ${data.error_description || data.error}`);
    }
    
    if (!data.access_token) {
      throw new Error('No access token received from API');
    }
    
    // 缓存token
    this.cacheToken(apiKey, data.access_token);
    
    return data.access_token;
  }

  /**
   * 构建请求体
   */
  buildRequestBody(params) {
    const { messages, temperature = 0.95, topP = 0.8, penaltyScore = 1.0, ...otherParams } = params;
    
    const requestBody = {
      messages,
      temperature,
      top_p: topP,
      penalty_score: penaltyScore,
      stream: false
    };
    
    // 添加其他可选参数
    if (otherParams.userId) {
      requestBody.user_id = otherParams.userId;
    }
    
    if (otherParams.system) {
      requestBody.system = otherParams.system;
    }
    
    return requestBody;
  }

  /**
   * 发送API请求
   */
  async sendRequest(accessToken, model, requestBody) {
    const url = `https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/${model}?access_token=${accessToken}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });
    
    return response;
  }

  /**
   * 处理API响应
   */
  async handleResponse(response) {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      let errorMessage = `Wenxin API error: ${response.status}`;
      
      if (errorData.error_code) {
        errorMessage += ` - ${errorData.error_msg || errorData.error_code}`;
      } else {
        errorMessage += ` - ${response.statusText}`;
      }
      
      throw new Error(errorMessage);
    }
    
    const data = await response.json();
    
    if (data.error_code) {
      throw new Error(`Wenxin API error: ${data.error_msg || data.error_code}`);
    }
    
    return data;
  }

  /**
   * 格式化响应数据
   */
  formatResponse(data, model) {
    return {
      id: data.id || '',
      object: 'chat.completion',
      created: data.created || Date.now(),
      model,
      choices: [{
        index: 0,
        message: {
          role: 'assistant',
          content: data.result || ''
        },
        finishReason: data.is_end ? 'stop' : 'length'
      }],
      usage: {
        promptTokens: data.usage?.prompt_tokens || 0,
        completionTokens: data.usage?.completion_tokens || 0,
        totalTokens: data.usage?.total_tokens || 0
      }
    };
  }

  /**
   * 主要的API调用方法
   */
  async callWenxin(params) {
    try {
      // 参数验证
      this.validateParams(params);
      
      // 获取access_token
      const accessToken = await this.getAccessToken(params.apiKey, params.secretKey);
      
      // 构建请求体
      const requestBody = this.buildRequestBody(params);
      
      // 发送请求
      const response = await this.sendRequest(accessToken, params.model, requestBody);
      
      // 处理响应
      const data = await this.handleResponse(response);
      
      // 格式化返回数据
      const formattedResponse = this.formatResponse(data, params.model);
      
      return {
        success: true,
        data: formattedResponse,
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

  /**
   * 获取支持的模型列表
   */
  getSupportedModels() {
    return {
      success: true,
      data: {
        models: this.supportedModels,
        description: {
          'ernie-bot': 'ERNIE-Bot，百度自研的大语言模型',
          'ernie-bot-turbo': 'ERNIE-Bot-turbo，响应速度更快',
          'ernie-bot-4': 'ERNIE-Bot-4，最新版本，能力更强',
          'ernie-bot-8k': 'ERNIE-Bot-8k，支持8K上下文',
          'ernie-bot-pro': 'ERNIE-Bot-pro，专业版本',
          'ernie-bot-pro-8k': 'ERNIE-Bot-pro-8k，专业版8K上下文',
          'ernie-speed-8k': 'ERNIE-Speed-8k，高速版本8K上下文',
          'ernie-speed-128k': 'ERNIE-Speed-128k，高速版本128K上下文',
          'ernie-lite-8k': 'ERNIE-Lite-8k，轻量版本8K上下文',
          'ernie-tiny-8k': 'ERNIE-Tiny-8k，微型版本8K上下文'
        }
      },
      error: null
    };
  }

  /**
   * 清除token缓存
   */
  clearTokenCache(apiKey) {
    if (apiKey) {
      this.tokenCache.delete(apiKey);
    } else {
      this.tokenCache.clear();
    }
    
    return {
      success: true,
      data: { message: 'Token cache cleared' },
      error: null
    };
  }
}

/**
 * 云函数主入口
 */
exports.main = async (event, context) => {
  const { action, ...params } = event;
  
  const handler = new WenxinHandler();
  
  try {
    switch (action) {
      case 'chat':
        return await handler.callWenxin(params);
      case 'getModels':
        return handler.getSupportedModels();
      case 'clearCache':
        return handler.clearTokenCache(params.apiKey);
      default:
        return {
          success: false,
          data: null,
          error: `Unsupported action: ${action}. Supported actions: chat, getModels, clearCache`
        };
    }
  } catch (error) {
    return {
      success: false,
      data: null,
      error: error.message || 'Internal server error'
    };
  }
};
