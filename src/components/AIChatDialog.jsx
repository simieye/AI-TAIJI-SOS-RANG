// @ts-ignore;
import React, { useState, useEffect, useRef } from 'react';
// @ts-ignore;
import { Button } from '@/components/ui';
// @ts-ignore;
import { X, Bot, MessageCircle } from 'lucide-react';

import { AIChatHeader } from './AIChatHeader';
import { AIChatMessages } from './AIChatMessages';
import { AIChatInput } from './AIChatInput';
import { AIModelSelector } from './AIModelSelector';
export function AIChatDialog({
  isOpen,
  onClose,
  $w
}) {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showModelSelector, setShowModelSelector] = useState(false);
  const [selectedModel, setSelectedModel] = useState('gpt-4');
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // AI模型配置
  const aiModels = [{
    id: 'gpt-4',
    name: 'GPT-4',
    provider: 'OpenAI',
    description: '最强大的通用AI助手',
    icon: 'Brain',
    color: 'text-green-500',
    capabilities: ['文本对话', '代码生成', '创意写作', '分析推理'],
    status: 'available'
  }, {
    id: 'claude-3',
    name: 'Claude-3',
    provider: 'Anthropic',
    description: '安全可靠的AI助手',
    icon: 'Shield',
    color: 'text-blue-500',
    capabilities: ['对话交流', '文档分析', '创意写作', '安全对话'],
    status: 'available'
  }, {
    id: 'gemini-pro',
    name: 'Gemini Pro',
    provider: 'Google',
    description: '多模态AI助手',
    icon: 'Sparkles',
    color: 'text-purple-500',
    capabilities: ['多模态理解', '代码生成', '数学推理', '创意任务'],
    status: 'available'
  }, {
    id: 'qwen-max',
    name: 'Qwen Max',
    provider: '阿里云',
    description: '中文优化AI助手',
    icon: 'Globe',
    color: 'text-red-500',
    capabilities: ['中文对话', '知识问答', '文本创作', '代码生成'],
    status: 'available'
  }, {
    id: 'baichuan2',
    name: 'Baichuan2',
    provider: '百川智能',
    description: '国产大模型',
    icon: 'Cpu',
    color: 'text-orange-500',
    capabilities: ['中文理解', '知识问答', '逻辑推理', '多轮对话'],
    status: 'available'
  }, {
    id: 'yi-large',
    name: 'Yi Large',
    provider: '零一万物',
    description: '高性能AI助手',
    icon: 'Zap',
    color: 'text-cyan-500',
    capabilities: ['长文本理解', '知识问答', '代码生成', '创意写作'],
    status: 'available'
  }, {
    id: 'wenxin',
    name: '文心一言',
    provider: '百度',
    description: '中文大模型',
    icon: 'Brain',
    color: 'text-indigo-500',
    capabilities: ['中文理解', '知识问答', '文本创作', '逻辑推理'],
    status: 'available'
  }];
  useEffect(() => {
    if (isOpen) {
      // 添加欢迎消息
      const welcomeMessage = {
        id: 'welcome',
        type: 'system',
        content: '欢迎使用AI太极全能智能助手！我可以为您提供产品咨询、技术支持、健康建议、商业合作等全方位服务。请选择您需要的AI模型开始对话。',
        timestamp: Date.now(),
        mode: 'system'
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen]);
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;
    const userMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage.trim(),
      timestamp: Date.now(),
      mode: 'ai'
    };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    setIsTyping(true);
    try {
      // 调用云函数
      const currentUser = $w.auth.currentUser;
      if (!currentUser) {
        throw new Error('用户未登录');
      }
      const sessionId = 'hero_session_' + Date.now();
      const aiResponse = await callAIModel(inputMessage.trim(), selectedModel, currentUser.userId, sessionId);
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse.content,
        timestamp: Date.now(),
        model: selectedModel,
        mode: 'ai',
        usage: aiResponse.usage,
        cost: aiResponse.cost
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('发送消息失败:', error);
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        type: 'error',
        content: '抱歉，发送消息时出现错误，请稍后重试。',
        timestamp: Date.now(),
        mode: 'ai'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  };
  const callAIModel = async (message, modelId, userId, sessionId) => {
    try {
      // 准备消息格式
      const messages = [{
        role: 'user',
        content: message
      }];

      // 调用AI路由云函数
      const result = await $w.cloud.callFunction({
        name: 'ai-router',
        data: {
          model: modelId,
          messages: messages,
          temperature: 0.7,
          maxTokens: 2000,
          userId: userId,
          sessionId: sessionId,
          fallbackEnabled: true
        }
      });
      if (result.result && result.result.success) {
        return result.result.data;
      } else {
        throw new Error(result.result?.error || 'AI模型调用失败');
      }
    } catch (error) {
      console.error('调用AI模型失败:', error);
      throw error;
    }
  };
  const handleModelChange = modelId => {
    setSelectedModel(modelId);
    setShowModelSelector(false);
    const modelInfo = aiModels.find(m => m.id === modelId);
    const switchMessage = {
      id: Date.now().toString(),
      type: 'system',
      content: `已切换到 ${modelInfo.name} (${modelInfo.provider})`,
      timestamp: Date.now(),
      mode: 'system'
    };
    setMessages(prev => [...prev, switchMessage]);
  };
  const handleKeyPress = e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  const handleVoiceToggle = () => {
    setIsRecording(!isRecording);
  };
  const currentModel = aiModels.find(m => m.id === selectedModel);
  if (!isOpen) return null;
  return <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-xl border border-gray-800 w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <AIChatHeader currentModel={currentModel} onClose={onClose} onModelSelectorToggle={() => setShowModelSelector(!showModelSelector)} showModelSelector={showModelSelector} />

        {/* Model Selector */}
        {showModelSelector && <AIModelSelector models={aiModels} selectedModel={selectedModel} onModelChange={handleModelChange} onClose={() => setShowModelSelector(false)} />}

        {/* Messages */}
        <AIChatMessages messages={messages} isTyping={isTyping} currentModel={currentModel} messagesEndRef={messagesEndRef} />

        {/* Input */}
        <AIChatInput inputMessage={inputMessage} setInputMessage={setInputMessage} isLoading={isLoading} isRecording={isRecording} onSendMessage={handleSendMessage} onVoiceToggle={handleVoiceToggle} onKeyPress={handleKeyPress} inputRef={inputRef} currentModel={currentModel} />
      </div>
    </div>;
}