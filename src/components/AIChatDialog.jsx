// @ts-ignore;
import React, { useState, useEffect, useRef } from 'react';
// @ts-ignore;
import { Button, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';
// @ts-ignore;
import { X, Send, Bot, User, Settings, Sparkles, Brain, Shield, Globe, Cpu, Zap, MessageCircle, Mic, MicOff, Paperclip, ChevronDown, ExternalLink, Star, TrendingUp } from 'lucide-react';

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
  const [chatMode, setChatMode] = useState('ai');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // AI模型配置
  const aiModels = [{
    id: 'gpt-4',
    name: 'GPT-4',
    provider: 'OpenAI',
    description: '最强大的通用AI助手',
    icon: Brain,
    color: 'text-green-500',
    capabilities: ['文本对话', '代码生成', '创意写作', '分析推理'],
    status: 'available'
  }, {
    id: 'claude-3',
    name: 'Claude-3',
    provider: 'Anthropic',
    description: '安全可靠的AI助手',
    icon: Shield,
    color: 'text-blue-500',
    capabilities: ['对话交流', '文档分析', '创意写作', '安全对话'],
    status: 'available'
  }, {
    id: 'gemini-pro',
    name: 'Gemini Pro',
    provider: 'Google',
    description: '多模态AI助手',
    icon: Sparkles,
    color: 'text-purple-500',
    capabilities: ['多模态理解', '代码生成', '数学推理', '创意任务'],
    status: 'available'
  }, {
    id: 'qwen-max',
    name: 'Qwen Max',
    provider: '阿里云',
    description: '中文优化AI助手',
    icon: Globe,
    color: 'text-red-500',
    capabilities: ['中文对话', '知识问答', '文本创作', '代码生成'],
    status: 'available'
  }, {
    id: 'baichuan2',
    name: 'Baichuan2',
    provider: '百川智能',
    description: '国产大模型',
    icon: Cpu,
    color: 'text-orange-500',
    capabilities: ['中文理解', '知识问答', '逻辑推理', '多轮对话'],
    status: 'available'
  }, {
    id: 'yi-large',
    name: 'Yi Large',
    provider: '零一万物',
    description: '高性能AI助手',
    icon: Zap,
    color: 'text-cyan-500',
    capabilities: ['长文本理解', '知识问答', '代码生成', '创意写作'],
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
      mode: chatMode
    };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    setIsTyping(true);
    try {
      const aiResponse = await callAIModel(inputMessage.trim(), selectedModel);
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse,
        timestamp: Date.now(),
        model: selectedModel,
        mode: 'ai'
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('发送消息失败:', error);
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        type: 'error',
        content: '抱歉，发送消息时出现错误，请稍后重试。',
        timestamp: Date.now(),
        mode: chatMode
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  };
  const callAIModel = async (message, modelId) => {
    const startTime = Date.now();
    const modelConfig = aiModels.find(m => m.id === modelId);

    // 模拟API延迟
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    // 根据不同模型返回不同风格的回复
    const responses = {
      'gpt-4': `我是GPT-4，关于您的问题"${message}"，我为您提供以下解答：\n\nAI太极·SOS RING是一款集成了多种智能功能的可穿戴设备。它具备睡眠监测、SOS紧急呼叫、健康数据追踪等功能。电池续航时间根据使用情况可达3-7天。\n\n如果您还有其他问题，请随时询问！`,
      'claude-3': `感谢您的咨询。关于"${message}"这个问题，让我为您详细说明：\n\nAI太极智能戒指采用先进的传感器技术，能够实时监测您的健康状况。设备支持IP68级防水，日常使用无需担心。\n\n关于您关心的具体功能，我建议您可以查看产品说明书或联系我们的技术支持团队。`,
      'gemini-pro': `基于您的问题"${message}"，我来为您介绍AI太极戒指的核心功能：\n\n🔋 **电池续航**：正常使用情况下可达5-7天\n💤 **睡眠监测**：深度分析睡眠质量\n🚨 **SOS功能**：紧急情况下一键求助\n📊 **健康追踪**：心率、血氧、步数等数据\n\n有什么特定的功能您想了解更多吗？`,
      'qwen-max': `您好！关于"${message}"的问题，我来为您解答：\n\nAI太极·SOS RING智能戒指是一款专为健康生活设计的智能穿戴设备。主要特点包括：\n\n• 续航时间：3-7天（根据使用频率）\n• 防水等级：IP68\n• 连接方式：蓝牙5.0\n• 兼容性：iOS 12+ / Android 8+\n\n如果您需要更详细的技术参数，我可以为您提供完整的产品规格表。`,
      'baichuan2': `关于您提到的"${message}"，我来为您详细介绍：\n\nAI太极智能戒指作为新一代健康穿戴设备，具有以下优势：\n\n1. **长续航**：采用低功耗设计，正常使用可达一周\n2. **精准监测**：医疗级传感器，数据准确可靠\n3. **智能提醒**：久坐提醒、用药提醒等贴心功能\n4. **紧急救助**：SOS功能关键时刻保护您的安全\n\n还有什么想了解的吗？`,
      'yi-large': `针对您的问题"${message}"，我为您提供专业的解答：\n\nAI太极·SOS RING集成了多项创新技术：\n\n⚡ **性能特点**：\n- 处理器：低功耗ARM芯片\n- 内存：512MB RAM + 4GB存储\n- 传感器：心率、血氧、加速度计\n\n🔋 **电源管理**：\n- 电池容量：50mAh\n- 充电时间：1-2小时\n- 续航：3-7天\n\n需要了解更多技术细节吗？`
    };
    const response = responses[modelId] || `我是${modelConfig?.name}，关于您的问题"${message}"，我正在为您查询相关信息，请稍等...`;
    return response;
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
  const ModelIcon = currentModel?.icon || Bot;
  if (!isOpen) return null;
  return <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-xl border border-gray-800 w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <div className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${currentModel?.color}`}>
              <ModelIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-yellow-500">AI太极全能助手</h3>
              <p className="text-sm text-gray-400">智能健康与商业生态顾问</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {/* 模型选择器 */}
            <div className="relative">
              <Button onClick={() => setShowModelSelector(!showModelSelector)} variant="outline" size="sm" className="border-gray-700 text-gray-300 hover:border-gray-600 hover:text-white">
                <ModelIcon className={`w-4 h-4 mr-2 ${currentModel?.color}`} />
                {currentModel?.name}
                <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
              
              {showModelSelector && <div className="absolute top-full right-0 mt-2 w-80 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-10 max-h-96 overflow-y-auto">
                  {aiModels.map(model => {
                const Icon = model.icon;
                return <button key={model.id} onClick={() => handleModelChange(model.id)} className={`w-full p-3 text-left hover:bg-gray-700 border-b border-gray-700 last:border-b-0 ${selectedModel === model.id ? 'bg-gray-700' : ''}`}>
                        <div className="flex items-center">
                          <Icon className={`w-5 h-5 mr-3 ${model.color}`} />
                          <div className="flex-1">
                            <div className="font-medium">{model.name}</div>
                            <div className="text-sm text-gray-400">{model.provider}</div>
                          </div>
                          {model.status === 'available' && <div className="w-2 h-2 bg-green-500 rounded-full"></div>}
                        </div>
                        <div className="text-xs text-gray-400 mt-1">{model.description}</div>
                        {model.capabilities && <div className="flex flex-wrap gap-1 mt-2">
                            {model.capabilities.slice(0, 3).map((cap, index) => <span key={index} className="text-xs bg-gray-700 px-2 py-1 rounded">
                                {cap}
                              </span>)}
                          </div>}
                      </button>;
              })}
                </div>}
            </div>
            
            <Button onClick={onClose} variant="ghost" size="sm" className="text-gray-400 hover:text-white">
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map(message => <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-2xl ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                <div className={`flex items-start space-x-3 ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${message.type === 'user' ? 'bg-yellow-500' : message.type === 'error' ? 'bg-red-500' : 'bg-gray-700'}`}>
                    {message.type === 'user' ? <User className="w-4 h-4 text-black" /> : message.type === 'error' ? <X className="w-4 h-4 text-white" /> : <ModelIcon className={`w-4 h-4 ${currentModel?.color}`} />}
                  </div>
                  <div className={`rounded-lg p-4 max-w-xl ${message.type === 'user' ? 'bg-yellow-500 text-black' : message.type === 'error' ? 'bg-red-500 text-white' : 'bg-gray-800 text-white'}`}>
                    <div className="whitespace-pre-wrap">{message.content}</div>
                    <div className={`flex items-center justify-between mt-2 text-xs ${message.type === 'user' ? 'text-black/70' : 'text-gray-400'}`}>
                      <span>{new Date(message.timestamp).toLocaleTimeString()}</span>
                      {message.model && <span>{message.model}</span>}
                    </div>
                  </div>
                </div>
              </div>
            </div>)}
          {isTyping && <div className="flex justify-start">
              <div className="flex items-center space-x-2 text-gray-400">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-500"></div>
                <span className="text-sm">AI正在思考...</span>
              </div>
            </div>}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-6 border-t border-gray-800">
          <div className="flex items-end space-x-4">
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
              <Paperclip className="w-5 h-5" />
            </Button>
            <div className="flex-1">
              <textarea ref={inputRef} value={inputMessage} onChange={e => setInputMessage(e.target.value)} onKeyPress={handleKeyPress} placeholder="输入您的问题..." className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 resize-none" rows={1} style={{
              minHeight: '48px',
              maxHeight: '120px'
            }} />
            </div>
            <Button onClick={handleVoiceToggle} variant="ghost" size="sm" className={`${isRecording ? 'text-red-500' : 'text-gray-400'} hover:text-white`}>
              {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </Button>
            <Button onClick={handleSendMessage} disabled={!inputMessage.trim() || isLoading} className="bg-yellow-500 hover:bg-yellow-600 text-black disabled:opacity-50">
              <Send className="w-5 h-5" />
            </Button>
          </div>
          <div className="flex items-center justify-between mt-2 text-xs text-gray-400">
            <span>按 Enter 发送，Shift + Enter 换行</span>
            <span>当前模型: {currentModel?.name}</span>
          </div>
        </div>
      </div>
    </div>;
}