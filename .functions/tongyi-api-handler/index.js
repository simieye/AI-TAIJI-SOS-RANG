
'use strict';

const cloudbase = require('@cloudbase/node-sdk');
const app = cloudbase.init();

/**
 * 通义千问API处理器
 * 专门处理阿里云通义千问模型的API调用
 */
class TongyiHandler {
  constructor() {
    this.supportedModels = [
      'qwen-turbo',
      'qwen-plus',
      'qwen-max',
      'qwen-max-longcontext',
      'qwen-7b-chat',
      'qwen-14b-chat',
      'qwen-72b-chat',
      'qwen-1.8b-chat',
      'qwen-1.8b-longcontext-chat',
      'qwen-vl-plus',
      'qwen-vl-max'
    ];
    this.maxTokens = {
      'qwen-turbo': 6000,
      'qwen-plus': 30000,
      'qwen-max': 6000,
      'qwen-max-longcontext': 28000,
      'qwen-7b-chat': 6000,
      'qwen-14b-chat': 6000,
      'qwen-72b-chat': 6000,
      'qwen-1.8b-chat': 6000,
      'qwen-1.8b-longcontext-chat': 28000,
      'qwen-vl-plus': 6000,
      'qwen-vl-max': 6000
    };
  }

  /**
   * 验证API密钥格式
   */
  validateApiKey(apiKey) {
    if (!apiKey || typeof apiKey !== 'string') {
      throw new Error('API key is required and must be a string');
    }
    
    if (apiKey.length < 20) {
      throw new Error('API key appears to be too short');
    }
    
    // 通义千问API key通常以sk-开头
    if (!apiKey.startsWith('sk-')) {
      throw new Error('Invalid API key format. Tongyi API keys should start with "sk-"');
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
      
      if (message.content.length > 8000) {
        throw new Error('Message content is too long (max 8000 characters)');
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
   * 验证最大token数
   */
  validateMaxTokens(maxTokens, model) {
    if (maxTokens !== undefined) {
      if (typeof maxTokens !== 'number') {
        throw new Error('Max tokens must be a number');
      }
      
      if (maxTokens < 1 || maxTokens > 8000) {
        throw new Error('Max tokens must be between 1 and 8000');
      }
      
      const modelMaxTokens = this.maxTokens[model] || 6000;
      if (maxTokens > modelMaxTokens) {
        throw new Error(`Max tokens cannot exceed ${modelMaxTokens} for model ${model}`);
      }
    }
  }

  /**
   * 验证重复惩罚参数
   */
  validateRepetitionPenalty(repetitionPenalty) {
    if (repetitionPenalty !== undefined) {
      if (typeof repetitionPenalty !== 'number') {
        throw new Error('Repetition penalty must be a number');
      }
      
      if (repetitionPenalty < 1 || repetitionPenalty > 2) {
        throw new Error('Repetition penalty must be between 1 and 2');
      }
    }
  }

  /**
   * 验证所有参数
   */
  validateParams(params) {
    const { apiKey, model, messages, temperature, topP, maxTokens, repetitionPenalty } = params;
    
    this.validateApiKey(apiKey);
    this.validateModel(model);
    this.validateMessages(messages);
    this.validateTemperature(temperature);
    this.validateTopP(topP);
    this.validateMaxTokens(maxTokens, model);
    this.validateRepetitionPenalty(repetitionPenalty);
  }

  /**
   * 构建请求体
   */
  buildRequestBody(params) {
    const { model, messages, temperature = 0.85, topP = 0.8, maxTokens, repetitionPenalty = 1.1, ...otherParams } = params;
    
    const requestBody = {
      model,
      input: {
        messages
      },
      parameters: {
        temperature,
        top_p: topP,
        repetition_penalty: repetitionPenalty
      }
    };
    
    if (maxTokens !== undefined) {
      requestBody.parameters.max_tokens = maxTokens;
    }
    
    // 添加其他可选参数
    if (otherParams.stop) {
      requestBody.parameters.stop = otherParams.stop;
    }
    
    if (otherParams.seed !== undefined) {
      requestBody.parameters.seed = otherParams.seed;
    }
    
    if (otherParams.enableSearch !== undefined) {
      requestBody.parameters.enable_search = otherParams.enableSearch;
    }
    
    return requestBody;
  }

  /**
   * 发送API请求
   */
  async sendRequest(apiKey, requestBody) {
    const response = await fetch('https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation', {
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
      let errorMessage = `Tongyi API error: ${response.status}`;
      
      if (errorData.message) {
        errorMessage += ` - ${errorData.message}`;
      }
      
      if (errorData.code) {
        errorMessage += ` (Code: ${errorData.code})`;
      }
      
      if (errorData.request_id) {
        errorMessage += ` (Request ID: ${errorData.request_id})`;
      } else {
        errorMessage += ` - ${response.statusText}`;
      }
      
      throw new Error(errorMessage);
    }
    
    const data = await response.json();
    
    if (data.code && data.code !== '200') {
      throw new Error(`Tongyi API error: ${data.message || data.code}`);
    }
    
    return data;
  }

  /**
   * 格式化响应数据
   */
  formatResponse(data) {
    return {
      id: data.request_id || '',
      object: 'chat.completion',
      created: Date.now(),
      model: data.output?.model || '',
      choices: [{
        index: 0,
        message: {
          role: 'assistant',
          content: data.output?.text || ''
        },
        finishReason: data.output?.finish_reason || 'stop'
      }],
      usage: {
        promptTokens: data.usage?.input_tokens || 0,
        completionTokens: data.usage?.output_tokens || 0,
        totalTokens: data.usage?.total_tokens || 0
      }
    };
  }

  /**
   * 主要的API调用方法
   */
  async callTongyi(params) {
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
        maxTokens: this.maxTokens,
        description: {
          'qwen-turbo': '通义千问超大规模语言模型，速度快，成本低',
          'qwen-plus': '通义千问超大规模语言模型，效果更好，成本适中',
          'qwen-max': '通义千问超大规模语言模型，效果最好，成本较高',
          'qwen-max-longcontext': '通义千问超大规模语言模型，支持长上下文',
          'qwen-7b-chat': '通义千问7B参数对话模型',
          'qwen-14b-chat': '通义千问14B参数对话模型',
          'qwen-72b-chat': '通义千问72B参数对话模型',
          'qwen-1.8b-chat': '通义千问1.8B参数对话模型',
          'qwen-1.8b-longcontext-chat': '通义千问1.8B参数长上下文对话模型',
          'qwen-vl-plus': '通义千问多模态大模型，支持图文理解',
          'qwen-vl-max': '通义千问多模态大模型，效果更好'
        }
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
  
  const handler = new TongyiHandler();
  
  try {
    switch (action) {
      case 'chat':
        return await handler.callTongyi(params);
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
