// @ts-ignore;
import React, { useState, useEffect, useRef } from 'react';
// @ts-ignore;
import { Button, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';
// @ts-ignore;
import { ArrowLeft, Send, Bot, User, Settings, History, Sparkles, Brain, Cpu, Globe, Zap, MessageCircle, Clock, CheckCircle, AlertCircle, Copy, Download, RefreshCw, Mic, MicOff, Paperclip, Headphones, Users, Phone, Shield } from 'lucide-react';

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
  const [chatMode, setChatMode] = useState('ai'); // 'ai' 或 'human'
  const [availableModels, setAvailableModels] = useState([]);
  const [humanAgents, setHumanAgents] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [waitingForAgent, setWaitingForAgent] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const navigateTo = pageId => {
    $w.utils.navigateTo({
      pageId,
      params: {}
    });
  };
  // AI模型配置 - 从数据源加载
  const defaultModels = [{
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
  // 人工客服配置
  const defaultAgents = [{
    id: 'agent_001',
    name: '客服小李',
    avatar: '/api/placeholder/40/40',
    department: '产品咨询',
    status: 'online',
    rating: 4.8,
    specialty: ['产品功能', '使用指导', '故障排除']
  }, {
    id: 'agent_002',
    name: '技术专家小王',
    avatar: '/api/placeholder/40/40',
    department: '技术支持',
    status: 'online',
    rating: 4.9,
    specialty: ['技术问题', '连接问题', '软件更新']
  }, {
    id: 'agent_003',
    name: '健康专家小张',
    avatar: '/api/placeholder/40/40',
    department: '健康咨询',
    status: 'busy',
    rating: 4.7,
    specialty: ['健康监测', '数据分析', '使用建议']
  }];
  useEffect(() => {
    loadConsultationData();
    loadAIModels();
    loadHumanAgents();
    loadChatHistory();
    // 添加欢迎消息
    const welcomeMessage = {
      id: 'welcome',
      type: 'system',
      content: '欢迎使用AI太极智能客服系统！您可以选择AI助手进行快速咨询，或选择人工客服获得专业服务。',
      timestamp: Date.now(),
      mode: 'system'
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
        try {
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
            // 如果有历史消息，加载它们
            if (result.conversation_history) {
              setMessages(result.conversation_history);
            }
          }
        } catch (error) {
          console.error('加载咨询数据失败:', error);
        }
      }
    } catch (error) {
      console.error('加载咨询数据失败:', error);
    }
  };
  const loadAIModels = async () => {
    try {
      // 从数据源加载AI模型配置
      try {
        const result = await $w.cloud.callDataSource({
          dataSourceName: 'ai_model_config',
          methodName: 'wedaGetRecordsV2',
          params: {
            filter: {
              where: {
                status: {
                  $eq: 'active'
                }
              }
            },
            select: {
              $master: true
            }
          }
        });
        if (result && result.records && result.records.length > 0) {
          const models = result.records.map(model => ({
            id: model._id,
            name: model.model_name,
            provider: model.provider,
            description: model.description,
            status: model.status,
            capabilities: model.model_parameters?.capabilities || []
          }));
          setAvailableModels(models);
        } else {
          setAvailableModels(defaultModels);
        }
      } catch (error) {
        console.error('加载AI模型配置失败:', error);
        setAvailableModels(defaultModels);
      }
    } catch (error) {
      console.error('加载AI模型失败:', error);
      setAvailableModels(defaultModels);
    }
  };
  const loadHumanAgents = async () => {
    try {
      // 模拟加载人工客服列表
      setHumanAgents(defaultAgents);
    } catch (error) {
      console.error('加载人工客服失败:', error);
    }
  };
  const loadChatHistory = async () => {
    try {
      const currentUser = $w.auth.currentUser;
      if (!currentUser) return;

      // 从数据源加载聊天历史
      try {
        const result = await $w.cloud.callDataSource({
          dataSourceName: 'ai_conversation_record',
          methodName: 'wedaGetRecordsV2',
          params: {
            filter: {
              where: {
                user_id: {
                  $eq: currentUser.userId
                }
              }
            },
            orderBy: [{
              message_timestamp: 'desc'
            }],
            pageSize: 20
          }
        });
        if (result && result.records) {
          // 按会话分组
          const sessions = {};
          result.records.forEach(record => {
            if (!sessions[record.session_id]) {
              sessions[record.session_id] = {
                id: record.session_id,
                title: record.message_content.substring(0, 20) + '...',
                lastMessage: record.message_content,
                timestamp: record.message_timestamp,
                model: record.ai_model_name,
                messageCount: 0
              };
            }
            sessions[record.session_id].messageCount++;
          });
          setChatHistory(Object.values(sessions));
        }
      } catch (error) {
        console.error('加载聊天历史失败:', error);
        // 使用模拟数据
        const mockHistory = [{
          id: 'chat1',
          title: '产品功能咨询',
          lastMessage: '请问AI太极戒指的电池续航时间是多久？',
          timestamp: Date.now() - 1000 * 60 * 60 * 24,
          model: 'GPT-4',
          messageCount: 5
        }, {
          id: 'chat2',
          title: '技术支持',
          lastMessage: '戒指无法连接手机，请问如何解决？',
          timestamp: Date.now() - 1000 * 60 * 60 * 48,
          model: 'Claude-3',
          messageCount: 8
        }];
        setChatHistory(mockHistory);
      }
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
      timestamp: Date.now(),
      mode: chatMode
    };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    setIsTyping(true);
    try {
      if (chatMode === 'ai') {
        // AI模式
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
        await saveMessageToDatabase(userMessage, aiMessage);
      } else {
        // 人工客服模式
        await sendToHumanAgent(inputMessage.trim());
        const agentMessage = {
          id: (Date.now() + 1).toString(),
          type: 'agent',
          content: selectedAgent ? `${selectedAgent.name}收到您的消息，正在为您处理...` : '客服正在为您转接，请稍等...',
          timestamp: Date.now(),
          agent: selectedAgent,
          mode: 'human'
        };
        setMessages(prev => [...prev, agentMessage]);
        await saveMessageToDatabase(userMessage, agentMessage);
      }
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
    try {
      // 记录开始时间
      const startTime = Date.now();

      // 调用AI模型API
      const modelConfig = availableModels.find(m => m.id === modelId) || defaultModels.find(m => m.id === modelId);

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

      // 记录使用统计
      const endTime = Date.now();
      const responseTime = endTime - startTime;
      await recordAIUsage(modelId, message, response, responseTime);
      return response;
    } catch (error) {
      console.error('调用AI模型失败:', error);
      throw error;
    }
  };
  const sendToHumanAgent = async message => {
    try {
      setWaitingForAgent(true);
      // 模拟连接人工客服
      await new Promise(resolve => setTimeout(resolve, 2000));
      setWaitingForAgent(false);

      // 这里可以集成实际的客服系统API
      console.log('发送消息给人工客服:', message, '选择的客服:', selectedAgent);
    } catch (error) {
      console.error('连接人工客服失败:', error);
      setWaitingForAgent(false);
      throw error;
    }
  };
  const recordAIUsage = async (modelId, inputMessage, response, responseTime) => {
    try {
      const currentUser = $w.auth.currentUser;
      if (!currentUser) return;

      // 计算token数量（简化计算）
      const inputTokens = Math.ceil(inputMessage.length / 4);
      const outputTokens = Math.ceil(response.length / 4);
      const totalTokens = inputTokens + outputTokens;

      // 保存使用记录
      await $w.cloud.callDataSource({
        dataSourceName: 'ai_conversation_record',
        methodName: 'wedaCreateV2',
        params: {
          data: {
            user_id: currentUser.userId,
            session_id: consultationId || 'session_' + Date.now(),
            message_id: 'msg_' + Date.now(),
            message_type: 'ai_response',
            message_content: response,
            ai_model_id: modelId,
            ai_model_name: availableModels.find(m => m.id === modelId)?.name || modelId,
            ai_provider: availableModels.find(m => m.id === modelId)?.provider || 'Unknown',
            message_timestamp: new Date().toISOString(),
            conversation_status: 'active',
            token_count: totalTokens,
            response_time: responseTime,
            cost_amount: calculateCost(totalTokens, modelId),
            currency: 'USD'
          }
        }
      });
    } catch (error) {
      console.error('记录AI使用失败:', error);
    }
  };
  const calculateCost = (tokens, modelId) => {
    // 简化的费用计算
    const costPerToken = {
      'gpt-4': 0.00003,
      'claude-3': 0.000025,
      'gemini-pro': 0.00002,
      'qwen-max': 0.000015,
      'baichuan2': 0.000015,
      'yi-large': 0.000018
    };
    return tokens * (costPerToken[modelId] || 0.00002);
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
              status: 'in-progress',
              conversation_history: [...messages, userMessage, aiMessage]
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
    const modelInfo = availableModels.find(m => m.id === modelId) || defaultModels.find(m => m.id === modelId);
    const switchMessage = {
      id: Date.now().toString(),
      type: 'system',
      content: `已切换到 ${modelInfo.name} (${modelInfo.provider})`,
      timestamp: Date.now(),
      mode: 'system'
    };
    setMessages(prev => [...prev, switchMessage]);
  };
  const handleModeSwitch = mode => {
    setChatMode(mode);
    const modeMessage = {
      id: Date.now().toString(),
      type: 'system',
      content: mode === 'ai' ? '已切换到AI助手模式' : '正在为您连接人工客服...',
      timestamp: Date.now(),
      mode: 'system'
    };
    setMessages(prev => [...prev, modeMessage]);
  };
  const handleAgentSelect = agent => {
    setSelectedAgent(agent);
    const selectMessage = {
      id: Date.now().toString(),
      type: 'system',
      content: `已选择 ${agent.name} (${agent.department}) 为您服务`,
      timestamp: Date.now(),
      mode: 'system'
    };
    setMessages(prev => [...prev, selectMessage]);
  };
  const handleKeyPress = e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  const handleCopyMessage = content => {
    navigator.clipboard.writeText(content);
  };
  const handleVoiceToggle = () => {
    setIsRecording(!isRecording);
  };
  const handleNewChat = () => {
    setMessages([{
      id: 'welcome',
      type: 'system',
      content: '欢迎使用AI太极智能客服系统！您可以选择AI助手进行快速咨询，或选择人工客服获得专业服务。',
      timestamp: Date.now(),
      mode: 'system'
    }]);
    setSelectedAgent(null);
  };
  const handleExportChat = () => {
    const chatContent = messages.map(msg => `[${new Date(msg.timestamp).toLocaleString()}] ${msg.type === 'user' ? '用户' : msg.type === 'ai' ? 'AI' : msg.type === 'agent' ? '客服' : '系统'}: ${msg.content}`).join('\n\n');
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
  const currentModel = availableModels.find(m => m.id === selectedModel) || defaultModels.find(m => m.id === selectedModel);
  const ModelIcon = currentModel?.icon || Bot;
  return <AuthGuard $w={$w}>
      <div className="min-h-screen bg-black text-white">
        <Navigation currentPage="consultation-chat" $w={$w} />

        <div className="flex h-screen pt-16">
          {/* 侧边栏 - 聊天历史和设置 */}
          <div className="w-80 bg-gray-900 border-r border-gray-800 flex flex-col">
            <div className="p-4 border-b border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-yellow-500">智能客服</h2>
                <Button onClick={handleNewChat} size="sm" className="bg-yellow-500 hover:bg-yellow-600 text-black">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  新对话
                </Button>
              </div>
              
              {/* 模式选择 */}
              <div className="mb-4">
                <div className="grid grid-cols-2 gap-2">
                  <Button onClick={() => handleModeSwitch('ai')} variant={chatMode === 'ai' ? 'default' : 'outline'} className={chatMode === 'ai' ? 'bg-yellow-500 text-black' : 'border-gray-700 text-gray-400 hover:border-gray-600 hover:text-white'}>
                    <Bot className="w-4 h-4 mr-2" />
                    AI助手
                  </Button>
                  <Button onClick={() => handleModeSwitch('human')} variant={chatMode === 'human' ? 'default' : 'outline'} className={chatMode === 'human' ? 'bg-blue-500 text-white' : 'border-gray-700 text-gray-400 hover:border-gray-600 hover:text-white'}>
                    <Users className="w-4 h-4 mr-2" />
                    人工客服
                  </Button>
                </div>
              </div>

              {/* AI模型选择器 */}
              {chatMode === 'ai' && <div className="relative mb-4">
                <Button onClick={() => setShowModelSelector(!showModelSelector)} variant="outline" className="w-full border-gray-700 text-gray-300 hover:border-gray-600 hover:text-white">
                  <ModelIcon className={`w-4 h-4 mr-2 ${currentModel?.color}`} />
                  {currentModel?.name} ({currentModel?.provider})
                  <Settings className="w-4 h-4 ml-auto" />
                </Button>
                
                {showModelSelector && <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-10 max-h-96 overflow-y-auto">
                    {(availableModels.length > 0 ? availableModels : defaultModels).map(model => {
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
              </div>}

              {/* 人工客服选择器 */}
              {chatMode === 'human' && <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-400 mb-2">选择客服</h3>
                <div className="space-y-2">
                  {humanAgents.map(agent => <button key={agent.id} onClick={() => handleAgentSelect(agent)} className={`w-full p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors ${selectedAgent?.id === agent.id ? 'ring-2 ring-blue-500' : ''}`}>
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gray-600 rounded-full mr-3 flex items-center justify-center">
                          <Users className="w-4 h-4" />
                        </div>
                        <div className="flex-1 text-left">
                          <div className="font-medium text-sm">{agent.name}</div>
                          <div className="text-xs text-gray-400">{agent.department}</div>
                        </div>
                        <div className="flex items-center">
                          <div className={`w-2 h-2 rounded-full mr-2 ${agent.status === 'online' ? 'bg-green-500' : agent.status === 'busy' ? 'bg-yellow-500' : 'bg-gray-500'}`}></div>
                          <span className="text-xs text-gray-400">{agent.status === 'online' ? '在线' : agent.status === 'busy' ? '忙碌' : '离线'}</span>
                        </div>
                      </div>
                      {agent.specialty && <div className="flex flex-wrap gap-1 mt-2">
                          {agent.specialty.slice(0, 2).map((spec, index) => <span key={index} className="text-xs bg-gray-700 px-2 py-1 rounded">
                              {spec}
                            </span>)}
                        </div>}
                    </button>)}
                </div>
              </div>}
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
                    {chatMode === 'ai' ? <>
                        <ModelIcon className={`w-6 h-6 mr-3 ${currentModel?.color}`} />
                        <div>
                          <h3 className="font-bold">{currentModel?.name}</h3>
                          <p className="text-sm text-gray-400">{currentModel?.description}</p>
                        </div>
                      </> : <>
                        <div className="w-10 h-10 bg-blue-500 rounded-full mr-3 flex items-center justify-center">
                          {selectedAgent ? <Users className="w-5 h-5 text-white" /> : <Headphones className="w-5 h-5 text-white" />}
                        </div>
                        <div>
                          <h3 className="font-bold">{selectedAgent ? selectedAgent.name : '人工客服'}</h3>
                          <p className="text-sm text-gray-400">{selectedAgent ? selectedAgent.department : '正在为您连接专业客服...'}</p>
                        </div>
                      </>}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {isTyping && <div className="flex items-center text-sm text-gray-400">
                      <div className="animate-pulse mr-2">{chatMode === 'ai' ? 'AI正在思考...' : '客服正在输入...'}</div>
                    </div>}
                  {waitingForAgent && <div className="flex items-center text-sm text-yellow-500">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-500 mr-2"></div>
                      正在连接客服...
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
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${message.type === 'user' ? 'bg-yellow-500' : message.type === 'error' ? 'bg-red-500' : message.type === 'agent' ? 'bg-blue-500' : 'bg-gray-700'}`}>
                        {message.type === 'user' ? <User className="w-4 h-4 text-black" /> : message.type === 'error' ? <AlertCircle className="w-4 h-4 text-white" /> : message.type === 'agent' ? <Users className="w-4 h-4 text-white" /> : <ModelIcon className={`w-4 h-4 ${currentModel?.color}`} />}
                      </div>
                      <div className={`rounded-lg p-4 max-w-2xl ${message.type === 'user' ? 'bg-yellow-500 text-black' : message.type === 'error' ? 'bg-red-500 text-white' : message.type === 'agent' ? 'bg-blue-500 text-white' : 'bg-gray-800 text-white'}`}>
                        <div className="whitespace-pre-wrap">{message.content}</div>
                        <div className={`flex items-center justify-between mt-2 text-xs ${message.type === 'user' ? 'text-black/70' : 'text-gray-400'}`}>
                          <span>{new Date(message.timestamp).toLocaleTimeString()}</span>
                          {message.model && <span>{message.model}</span>}
                          {message.agent && <span>{message.agent.name}</span>}
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
                  <textarea ref={inputRef} value={inputMessage} onChange={e => setInputMessage(e.target.value)} onKeyPress={handleKeyPress} placeholder={chatMode === 'ai' ? '输入您的问题...' : '输入您要咨询的问题...'} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 resize-none" rows={1} style={{
                  minHeight: '48px',
                  maxHeight: '120px'
                }} />
                </div>
                <Button onClick={handleVoiceToggle} variant="ghost" size="sm" className={`${isRecording ? 'text-red-500' : 'text-gray-400'} hover:text-white`}>
                  {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </Button>
                <Button onClick={handleSendMessage} disabled={!inputMessage.trim() || isLoading || waitingForAgent} className="bg-yellow-500 hover:bg-yellow-600 text-black disabled:opacity-50">
                  <Send className="w-5 h-5" />
                </Button>
              </div>
              <div className="flex items-center justify-between mt-2 text-xs text-gray-400">
                <span>按 Enter 发送，Shift + Enter 换行</span>
                <span>{chatMode === 'ai' ? `当前模型: ${currentModel?.name}` : selectedAgent ? `当前客服: ${selectedAgent.name}` : '人工客服模式'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>;
}