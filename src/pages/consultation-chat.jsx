// @ts-ignore;
import React, { useState, useEffect, useRef } from 'react';
// @ts-ignore;
import { Button, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';
// @ts-ignore;
import { ArrowLeft, Send, Bot, User, Settings, History, Sparkles, Brain, Cpu, Globe, Zap, MessageCircle, Clock, CheckCircle, AlertCircle, Copy, Download, RefreshCw, Mic, MicOff, Paperclip } from 'lucide-react';

import { Navigation } from '@/components/Navigation';
import { AuthGuard } from '@/components/AuthGuard';
export default function ConsultationChat(props) {
  const {
    $w
  } = props;
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [consultationId, setConsultationId] = useState('');
  const [consultationData, setConsultationData] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [showModelSelector, setShowModelSelector] = useState(false);
  const [selectedModel, setSelectedModel] = useState('gpt-4');
  const [chatHistory, setChatHistory] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const navigateTo = pageId => {
    $w.utils.navigateTo({
      pageId,
      params: {}
    });
  };
  // AI模型配置
  const aiModels = [{
    id: 'gpt-4',
    name: 'GPT-4',
    provider: 'OpenAI',
    description: '最强大的通用AI助手',
    icon: Brain,
    color: 'text-green-500',
    capabilities: ['文本对话', '代码生成', '创意写作', '分析推理']
  }, {
    id: 'claude-3',
    name: 'Claude-3',
    provider: 'Anthropic',
    description: '安全可靠的AI助手',
    icon: Shield,
    color: 'text-blue-500',
    capabilities: ['对话交流', '文档分析', '创意写作', '安全对话']
  }, {
    id: 'gemini-pro',
    name: 'Gemini Pro',
    provider: 'Google',
    description: '多模态AI助手',
    icon: Sparkles,
    color: 'text-purple-500',
    capabilities: ['多模态理解', '代码生成', '数学推理', '创意任务']
  }, {
    id: 'qwen-max',
    name: 'Qwen Max',
    provider: '阿里云',
    description: '中文优化AI助手',
    icon: Globe,
    color: 'text-red-500',
    capabilities: ['中文对话', '知识问答', '文本创作', '代码生成']
  }, {
    id: 'baichuan2',
    name: 'Baichuan2',
    provider: '百川智能',
    description: '国产大模型',
    icon: Cpu,
    color: 'text-orange-500',
    capabilities: ['中文理解', '知识问答', '逻辑推理', '多轮对话']
  }, {
    id: 'yi-large',
    name: 'Yi Large',
    provider: '零一万物',
    description: '高性能AI助手',
    icon: Zap,
    color: 'text-cyan-500',
    capabilities: ['长文本理解', '知识问答', '代码生成', '创意写作']
  }];
  useEffect(() => {
    loadConsultationData();
    loadChatHistory();
    // 添加欢迎消息
    const welcomeMessage = {
      id: 'welcome',
      type: 'ai',
      content: '您好！我是AI太极智能助手，很高兴为您服务。我可以帮助您了解产品功能、技术支持、健康咨询等问题。请问有什么可以帮助您的吗？',
      timestamp: Date.now(),
      model: selectedModel
    };
    setMessages([welcomeMessage]);
  }, []);
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  const loadConsultationData = async () => {
    try {
      const currentUser = $w.auth.currentUser;
      if (!currentUser) {
        navigateTo('login');
        return;
      }

      // 从URL参数获取咨询ID或创建新的咨询
      const urlParams = new URLSearchParams(window.location.search);
      const consultationIdFromUrl = urlParams.get('consultationId');
      if (consultationIdFromUrl) {
        setConsultationId(consultationIdFromUrl);
        // 加载现有咨询数据
        const result = await $w.cloud.callDataSource({
          dataSourceName: 'consultation_record',
          methodName: 'wedaGetItemV2',
          params: {
            filter: {
              where: {
                _id: {
                  $eq: consultationIdFromUrl
                }
              }
            },
            select: {
              $master: true
            }
          }
        });
        if (result) {
          setConsultationData(result);
        }
      }
    } catch (error) {
      console.error('加载咨询数据失败:', error);
    }
  };
  const loadChatHistory = async () => {
    try {
      const currentUser = $w.auth.currentUser;
      if (!currentUser) return;

      // 模拟加载聊天历史
      const mockHistory = [{
        id: 'chat1',
        title: '产品功能咨询',
        lastMessage: '请问AI太极戒指的电池续航时间是多久？',
        timestamp: Date.now() - 1000 * 60 * 60 * 24,
        model: 'gpt-4',
        messageCount: 5
      }, {
        id: 'chat2',
        title: '技术支持',
        lastMessage: '戒指无法连接手机，请问如何解决？',
        timestamp: Date.now() - 1000 * 60 * 60 * 48,
        model: 'claude-3',
        messageCount: 8
      }];
      setChatHistory(mockHistory);
    } catch (error) {
      console.error('加载聊天历史失败:', error);
    }
  };
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
      timestamp: Date.now()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    setIsTyping(true);
    try {
      // 调用AI模型API
      const aiResponse = await callAIModel(inputMessage.trim(), selectedModel);
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse,
        timestamp: Date.now(),
        model: selectedModel
      };
      setMessages(prev => [...prev, aiMessage]);

      // 保存消息到数据库
      await saveMessageToDatabase(userMessage, aiMessage);
    } catch (error) {
      console.error('发送消息失败:', error);
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        type: 'error',
        content: '抱歉，发送消息时出现错误，请稍后重试。',
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  };
  const callAIModel = async (message, modelId) => {
    // 模拟AI模型调用
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
    return responses[modelId] || `我是${modelConfig?.name}，关于您的问题"${message}"，我正在为您查询相关信息，请稍等...`;
  };
  const saveMessageToDatabase = async (userMessage, aiMessage) => {
    try {
      const currentUser = $w.auth.currentUser;
      if (!currentUser) return;

      // 保存到咨询记录表
      if (consultationId) {
        await $w.cloud.callDataSource({
          dataSourceName: 'consultation_record',
          methodName: 'wedaUpdateV2',
          params: {
            filter: {
              where: {
                _id: {
                  $eq: consultationId
                }
              }
            },
            data: {
              last_message: userMessage.content,
              last_message_time: new Date().toISOString(),
              message_count: (consultationData?.message_count || 0) + 2,
              status: 'in-progress'
            }
          }
        });
      }
    } catch (error) {
      console.error('保存消息失败:', error);
    }
  };
  const handleModelChange = modelId => {
    setSelectedModel(modelId);
    setShowModelSelector(false);

    // 添加模型切换提示
    const modelInfo = aiModels.find(m => m.id === modelId);
    const switchMessage = {
      id: Date.now().toString(),
      type: 'system',
      content: `已切换到 ${modelInfo.name} (${modelInfo.provider})`,
      timestamp: Date.now()
    };
    setMessages(prev => [...prev, switchMessage]);
  };
  const handleKeyPress = e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  const handleCopyMessage = content => {
    navigator.clipboard.writeText(content);
    // 可以添加复制成功的提示
  };
  const handleVoiceToggle = () => {
    setIsRecording(!isRecording);
    // 这里可以集成语音识别功能
  };
  const handleNewChat = () => {
    setMessages([{
      id: 'welcome',
      type: 'ai',
      content: '您好！我是AI太极智能助手，很高兴为您服务。请问有什么可以帮助您的吗？',
      timestamp: Date.now(),
      model: selectedModel
    }]);
  };
  const handleExportChat = () => {
    const chatContent = messages.map(msg => `[${new Date(msg.timestamp).toLocaleString()}] ${msg.type === 'user' ? '用户' : 'AI'}: ${msg.content}`).join('\n\n');
    const blob = new Blob([chatContent], {
      type: 'text/plain'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai-chat-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };
  const currentModel = aiModels.find(m => m.id === selectedModel);
  const ModelIcon = currentModel?.icon || Bot;
  return <AuthGuard $w={$w}>
      <div className="min-h-screen bg-black text-white">
        <Navigation currentPage="consultation-chat" $w={$w} />

        <div className="flex h-screen pt-16">
          {/* 侧边栏 - 聊天历史 */}
          <div className="w-80 bg-gray-900 border-r border-gray-800 flex flex-col">
            <div className="p-4 border-b border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-yellow-500">AI助手</h2>
                <Button onClick={handleNewChat} size="sm" className="bg-yellow-500 hover:bg-yellow-600 text-black">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  新对话
                </Button>
              </div>
              
              {/* 模型选择器 */}
              <div className="relative">
                <Button onClick={() => setShowModelSelector(!showModelSelector)} variant="outline" className="w-full border-gray-700 text-gray-300 hover:border-gray-600 hover:text-white">
                  <ModelIcon className={`w-4 h-4 mr-2 ${currentModel?.color}`} />
                  {currentModel?.name} ({currentModel?.provider})
                  <Settings className="w-4 h-4 ml-auto" />
                </Button>
                
                {showModelSelector && <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-10 max-h-96 overflow-y-auto">
                    {aiModels.map(model => {
                  const Icon = model.icon;
                  return <button key={model.id} onClick={() => handleModelChange(model.id)} className={`w-full p-3 text-left hover:bg-gray-700 border-b border-gray-700 last:border-b-0 ${selectedModel === model.id ? 'bg-gray-700' : ''}`}>
                        <div className="flex items-center">
                          <Icon className={`w-5 h-5 mr-3 ${model.color}`} />
                          <div className="flex-1">
                            <div className="font-medium">{model.name}</div>
                            <div className="text-sm text-gray-400">{model.provider}</div>
                          </div>
                        </div>
                        <div className="text-xs text-gray-400 mt-1">{model.description}</div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {model.capabilities.slice(0, 3).map((cap, index) => <span key={index} className="text-xs bg-gray-700 px-2 py-1 rounded">
                              {cap}
                            </span>)}
                        </div>
                      </button>;
                })}
                  </div>}
              </div>
            </div>

            {/* 聊天历史列表 */}
            <div className="flex-1 overflow-y-auto p-4">
              <h3 className="text-sm font-medium text-gray-400 mb-3">历史对话</h3>
              <div className="space-y-2">
                {chatHistory.map(chat => <button key={chat.id} className="w-full text-left p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-sm">{chat.title}</span>
                      <span className="text-xs text-gray-400">{chat.messageCount}条消息</span>
                    </div>
                    <div className="text-xs text-gray-400 truncate">{chat.lastMessage}</div>
                    <div className="text-xs text-gray-500 mt-1">{new Date(chat.timestamp).toLocaleDateString()}</div>
                  </button>)}
              </div>
            </div>

            {/* 底部操作 */}
            <div className="p-4 border-t border-gray-800">
              <Button onClick={handleExportChat} variant="outline" size="sm" className="w-full border-gray-700 text-gray-400 hover:border-gray-600 hover:text-white">
                <Download className="w-4 h-4 mr-2" />
                导出对话
              </Button>
            </div>
          </div>

          {/* 主聊天区域 */}
          <div className="flex-1 flex flex-col">
            {/* 聊天头部 */}
            <div className="bg-gray-900 border-b border-gray-800 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Button onClick={() => navigateTo('consultation')} variant="ghost" className="mr-4 text-gray-400 hover:text-white">
                    <ArrowLeft className="w-5 h-5" />
                  </Button>
                  <div className="flex items-center">
                    <ModelIcon className={`w-6 h-6 mr-3 ${currentModel?.color}`} />
                    <div>
                      <h3 className="font-bold">{currentModel?.name}</h3>
                      <p className="text-sm text-gray-400">{currentModel?.description}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {isTyping && <div className="flex items-center text-sm text-gray-400">
                      <div className="animate-pulse mr-2">AI正在思考...</div>
                    </div>}
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                    <RefreshCw className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* 消息区域 */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map(message => <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-3xl ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                    <div className={`flex items-start space-x-3 ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${message.type === 'user' ? 'bg-yellow-500' : message.type === 'error' ? 'bg-red-500' : 'bg-gray-700'}`}>
                        {message.type === 'user' ? <User className="w-4 h-4 text-black" /> : message.type === 'error' ? <AlertCircle className="w-4 h-4 text-white" /> : <ModelIcon className={`w-4 h-4 ${currentModel?.color}`} />}
                      </div>
                      <div className={`rounded-lg p-4 max-w-2xl ${message.type === 'user' ? 'bg-yellow-500 text-black' : message.type === 'error' ? 'bg-red-500 text-white' : 'bg-gray-800 text-white'}`}>
                        <div className="whitespace-pre-wrap">{message.content}</div>
                        <div className={`flex items-center justify-between mt-2 text-xs ${message.type === 'user' ? 'text-black/70' : 'text-gray-400'}`}>
                          <span>{new Date(message.timestamp).toLocaleTimeString()}</span>
                          {message.model && <span>{message.model}</span>}
                          <div className="flex items-center space-x-2">
                            <button onClick={() => handleCopyMessage(message.content)} className="hover:text-yellow-500">
                              <Copy className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>)}
              <div ref={messagesEndRef} />
            </div>

            {/* 输入区域 */}
            <div className="bg-gray-900 border-t border-gray-800 p-4">
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
        </div>
      </div>
    </AuthGuard>;
}