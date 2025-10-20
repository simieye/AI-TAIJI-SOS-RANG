
'use strict';

const cloudbase = require('@cloudbase/node-sdk');
const app = cloudbase.init();

/**
 * OpenAI API处理器
 * 专门处理OpenAI GPT模型的API调用
 */
class OpenAIHandler {
  constructor() {
    this.supportedModels = [
      'gpt-3.5-turbo',
      'gpt-3.5-turbo-16k',
      'gpt-4',
      'gpt-4-32k',
      'gpt-4-turbo-preview',
      'gpt-4o',
      'gpt-4o-mini'
    ];
    this.maxTokens = {
      'gpt-3.5-turbo': 4096,
      'gpt-3.5-turbo-16k': 16384,
      'gpt-4': 8192,
      'gpt-4-32k': 32768,
      'gpt-4-turbo-preview': 128000,
      'gpt-4o': 128000,
      'gpt-4o-mini': 128000
    };
  }

  /**
   * 验证API密钥格式
   */
  validateApiKey(apiKey) {
    if (!apiKey || typeof apiKey !== 'string') {
      throw new Error('API key is required and must be a string');
    }
    
    if (!apiKey.startsWith('sk-')) {
      throw new Error('Invalid API key format. OpenAI API keys should start with "sk-"');
    }
    
    if (apiKey.length < 20) {
      throw new Error('API key appears to be too short');
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
      
      if (!['system', 'user', 'assistant'].includes(message.role)) {
        throw new Error('Message role must be one of: system, user, assistant');
      }
      
      if (typeof message.content !== 'string') {
        throw new Error('Message content must be a string');
      }
      
      if (message.content.length > 32000) {
        throw new Error('Message content is too long (max 32000 characters)');
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
      
      if (temperature < 0 || temperature > 2) {
        throw new Error('Temperature must be between 0 and 2');
      }
    }
  }

  /**
   * 验证最大token数
   */
  validateMaxTokens(maxTokens, model) {
    if (maxTokens !== undefined) {
      if (typeof maxTokens !== 'number') {
        throw new Error('Max tokens must be a number');
      }
      
      if (maxTokens < 1 || maxTokens > 4096) {
        throw new Error('Max tokens must be between 1 and 4096');
      }
      
      const modelMaxTokens = this.maxTokens[model] || 4096;
      if (maxTokens > modelMaxTokens) {
        throw new Error(`Max tokens cannot exceed ${modelMaxTokens} for model ${model}`);
      }
    }
  }

  /**
   * 验证所有参数
   */
  validateParams(params) {
    const { apiKey, model, messages, temperature, maxTokens } = params;
    
    this.validateApiKey(apiKey);
    this.validateModel(model);
    this.validateMessages(messages);
    this.validateTemperature(temperature);
    this.validateMaxTokens(maxTokens, model);
  }

  /**
   * 构建请求体
   */
  buildRequestBody(params) {
    const { model, messages, temperature = 0.7, maxTokens, stream = false, ...otherParams } = params;
    
    const requestBody = {
      model,
      messages,
      temperature,
      stream
    };
    
    if (maxTokens !== undefined) {
      requestBody.max_tokens = maxTokens;
    }
    
    // 添加其他可选参数
    if (otherParams.topP !== undefined) {
      requestBody.top_p = otherParams.topP;
    }
    
    if (otherParams.frequencyPenalty !== undefined) {
      requestBody.frequency_penalty = otherParams.frequencyPenalty;
    }
    
    if (otherParams.presencePenalty !== undefined) {
      requestBody.presence_penalty = otherParams.presencePenalty;
    }
    
    if (otherParams.stop !== undefined) {
      requestBody.stop = otherParams.stop;
    }
    
    return requestBody;
  }

  /**
   * 发送API请求
   */
  async sendRequest(apiKey, requestBody) {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
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
      let errorMessage = `OpenAI API error: ${response.status}`;
      
      if (errorData.error) {
        if (errorData.error.message) {
          errorMessage += ` - ${errorData.error.message}`;
        }
        if (errorData.error.type) {
          errorMessage += ` (Type: ${errorData.error.type})`;
        }
        if (errorData.error.code) {
          errorMessage += ` (Code: ${errorData.error.code})`;
        }
      } else {
        errorMessage += ` - ${response.statusText}`;
      }
      
      throw new Error(errorMessage);
    }
    
    const data = await response.json();
    return data;
  }

  /**
   * 格式化响应数据
   */
  formatResponse(data) {
    return {
      id: data.id,
      object: data.object,
      created: data.created,
      model: data.model,
      choices: data.choices.map(choice => ({
        index: choice.index,
        message: {
          role: choice.message.role,
          content: choice.message.content
        },
        finishReason: choice.finish_reason
      })),
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
  async callOpenAI(params) {
    try {
      // 参数验证
      this.validateParams(params);
      
      // 构建请求体
      const requestBody = this.buildRequestBody(params);
      
      // 发送请求
      const response = await this.sendRequest(params.apiKey, requestBody);
      
      // 处理响应
      const data = await this.handleResponse(response);
      
      // 格式化返回数据
      const formattedResponse = this.formatResponse(data);
      
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
        maxTokens: this.maxTokens
      },
      error: null
    };
  }
}

/**
 * 云函数主入口
 */
exports.main = async (event, context) => {
  const { action, ...params } = event;
  
  const handler = new OpenAIHandler();
  
  try {
    switch (action) {
      case 'chat':
        return await handler.callOpenAI(params);
      case 'getModels':
        return handler.getSupportedModels();
      default:
        return {
          success: false,
          data: null,
          error: `Unsupported action: ${action}. Supported actions: chat, getModels`
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
