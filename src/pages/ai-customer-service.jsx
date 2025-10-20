// @ts-ignore;
import React, { useState, useEffect, useRef } from 'react';
// @ts-ignore;
import { Button, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Textarea } from '@/components/ui';
// @ts-ignore;
import { MessageCircle, Send, Bot, User, Settings, BarChart3, Brain, Heart, Zap, Shield, Globe, Clock, TrendingUp, Users, FileText, Download, Upload, RefreshCw, Play, Pause, Square, CheckCircle, AlertCircle, X, Menu, Mic, Camera, Paperclip, Smile, ThumbsUp, ThumbsDown, Share2, Copy, Star, Filter, Search, ChevronLeft, ChevronRight, Eye, EyeOff, Lock, Unlock, Volume2, VolumeX } from 'lucide-react';

import { Navigation } from '@/components/Navigation';
export default function AICustomerService(props) {
  const {
    $w
  } = props;
  const [activeTab, setActiveTab] = useState('chat');
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedModel, setSelectedModel] = useState('gpt-4o');
  const [conversationId, setConversationId] = useState(null);
  const [userProfile, setUserProfile] = useState({
    name: '',
    email: '',
    company: '',
    interests: [],
    language: 'zh'
  });
  const [aiSettings, setAiSettings] = useState({
    model: 'gpt-4o',
    temperature: 0.7,
    maxTokens: 2000,
    systemPrompt: '',
    enableMemory: true,
    enableEmotion: true,
    enableRAG: true,
    language: 'zh'
  });
  const [analytics, setAnalytics] = useState({
    totalConversations: 0,
    averageResponseTime: 0,
    satisfactionScore: 0,
    conversionRate: 0,
    topIntents: [],
    emotionDistribution: {}
  });
  const [knowledgeBase, setKnowledgeBase] = useState([]);
  const [prompts, setPrompts] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  // AI模型选项
  const modelOptions = [{
    value: 'gpt-4o',
    label: 'GPT-4o',
    description: '最新多模态模型，支持图像理解'
  }, {
    value: 'claude-3-opus',
    label: 'Claude-3 Opus',
    description: '强大的推理能力，适合复杂对话'
  }, {
    value: 'qwen-max',
    label: 'Qwen Max',
    description: '中文优化，本地化部署'
  }];

  // 模块Prompt模板
  const modulePrompts = [{
    id: 'intent-recognition',
    name: '意图识别',
    description: '实时解析用户查询意图',
    prompt: `你是AI太极SOS Ring智能客服，基于深圳工厂10年经验。始终共情用户，先确认意图，再提供价值。
    
    产品信息：
    - 名称：AI太极SOS Ring
    - 功能：AI健康监测 + SOS求救 + 太极模式
    - 特点：连续监测心率、HRV、睡眠质量、情绪波动；紧急时SOS自动定位
    - 生产：深圳AI健康可穿戴工厂，MOQ 50
    
    响应格式：{意图: "string", 响应: "text", 置信度: 0-1, 工具调用: []}`
  }, {
    id: 'emotion-analysis',
    name: '情绪分析',
    description: '检测用户情绪，注入共情',
    prompt: `你是AI太极SOS Ring情绪分析专家。理解用户情绪状态，提供温暖共情的回应。
    
    情绪类型：焦虑、困惑、兴奋、担忧、好奇
    共情策略：镜像情绪 + 理解原因 + 提供支持 + 引导解决方案`
  }, {
    id: 'partner-inquiry',
    name: '合作伙伴咨询',
    description: '处理B2B合作咨询',
    prompt: `你是AI太极SOS Ring合作伙伴关系智能顾问。
    
    背景信息：
    - MOQ: 50，产地深圳
    - 支持OEM/SDK合作
    - 目标：经销商、医疗科技品牌、睡眠研究机构
    
    回答结构：共情 → 价值点 → 透明信息 → 共创邀请`
  }, {
    id: 'health-analysis',
    name: '健康分析',
    description: '睡眠压力AI分析',
    prompt: `你是AI太极SOS Ring睡眠与情绪平衡AI助手。
    
    核心功能：AI睡眠检测 + HRV压力识别 + 太极模式
    输出结构：感知共情 → 数据洞察 → 改善建议 → 可选行动`
  }, {
    id: 'tech-explanation',
    name: '技术讲解',
    description: '面向投资人/技术媒体',
    prompt: `你是AI太极SOS Ring技术讲解智能体。
    
    核心架构：多模态传感融合 + 边缘AI推理 + 云端模型优化
    独创"太极循环体"：数据—反馈—调节闭环
    
    回答结构：技术愿景 → 架构层级 → 创新机制 → 应用潜力`
  }];

  // 初始化对话
  useEffect(() => {
    initializeConversation();
    loadAnalytics();
    loadKnowledgeBase();
    loadPrompts();
  }, []);

  // 自动滚动到底部
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  const initializeConversation = () => {
    const welcomeMessage = {
      id: Date.now(),
      type: 'ai',
      content: `您好！我是AI太极SOS Ring智能健康顾问 🌿
      
我很理解您在寻找智能健康解决方案时的考量。作为融合AI健康监测、SOS紧急求救和太极养生模式的创新产品，我们专注于为用户提供身心平衡的科技体验。

请问您想了解哪个方面呢？
• 产品功能和技术原理
• 合作定制和MOQ信息
• 健康数据分析和隐私保护
• 其他具体问题

我会根据您的需求，为您提供专业、贴心的解答。`,
      timestamp: new Date(),
      intent: 'welcome',
      emotion: 'friendly',
      confidence: 1.0
    };
    setMessages([welcomeMessage]);
    setConversationId(`conv_${Date.now()}`);
  };
  const loadAnalytics = async () => {
    try {
      if ($w) {
        const result = await $w.cloud.callDataSource({
          dataSourceName: 'ai_conversation_record',
          methodName: 'wedaGetRecordsV2',
          params: {
            orderBy: [{
              created_at: 'desc'
            }],
            pageSize: 100
          }
        });
        if (result && result.records) {
          // 计算分析数据
          const totalConversations = result.records.length;
          const avgResponseTime = 1.2; // 模拟数据
          const satisfactionScore = 4.5; // 模拟数据
          const conversionRate = 0.35; // 模拟数据

          setAnalytics({
            totalConversations,
            averageResponseTime: avgResponseTime,
            satisfactionScore,
            conversionRate,
            topIntents: ['产品咨询', '合作询问', '技术问题', '售后服务'],
            emotionDistribution: {
              neutral: 45,
              positive: 35,
              concerned: 15,
              confused: 5
            }
          });
        }
      }
    } catch (error) {
      console.error('加载分析数据失败:', error);
    }
  };
  const loadKnowledgeBase = async () => {
    try {
      if ($w) {
        const result = await $w.cloud.callDataSource({
          dataSourceName: 'ai_knowledge_base',
          methodName: 'wedaGetRecordsV2',
          params: {
            orderBy: [{
              updated_at: 'desc'
            }],
            pageSize: 50
          }
        });
        if (result && result.records) {
          setKnowledgeBase(result.records);
        }
      }
    } catch (error) {
      console.error('加载知识库失败:', error);
    }
  };
  const loadPrompts = async () => {
    try {
      if ($w) {
        const result = await $w.cloud.callDataSource({
          dataSourceName: 'ai_prompt_templates',
          methodName: 'wedaGetRecordsV2',
          params: {
            orderBy: [{
              created_at: 'desc'
            }],
            pageSize: 20
          }
        });
        if (result && result.records) {
          setPrompts(result.records);
        }
      }
    } catch (error) {
      console.error('加载Prompt模板失败:', error);
    }
  };
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);
    try {
      // 调用AI服务
      const aiResponse = await callAIService(userMessage.content);
      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: aiResponse.content,
        timestamp: new Date(),
        intent: aiResponse.intent,
        emotion: aiResponse.emotion,
        confidence: aiResponse.confidence,
        tools: aiResponse.tools
      };
      setMessages(prev => [...prev, aiMessage]);

      // 保存对话记录
      await saveConversation(userMessage, aiMessage);
    } catch (error) {
      console.error('AI服务调用失败:', error);
      const errorMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: '抱歉，我现在遇到了一些技术问题。请稍后再试，或者直接联系我们的客服团队。',
        timestamp: new Date(),
        intent: 'error',
        emotion: 'apologetic',
        confidence: 1.0
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };
  const callAIService = async message => {
    // 模拟AI服务调用
    await new Promise(resolve => setTimeout(resolve, 1500));

    // 简单的意图识别逻辑
    const intent = detectIntent(message);
    const emotion = detectEmotion(message);
    let response = '';
    switch (intent) {
      case 'product_inquiry':
        response = `我理解您对AI太极SOS Ring产品的关注。我们的核心优势在于：

🔍 **智能监测**：24小时连续监测心率、HRV、睡眠质量和情绪波动
🆘 **SOS功能**：紧急情况下一键求救，自动定位并发送警报
🌿 **太极模式**：通过呼吸引导和节律调节，帮助身心平衡

我们采用深圳自有工厂生产，MOQ仅50件，支持OEM定制。您是想了解具体的技术参数，还是合作模式呢？`;
        break;
      case 'partner_inquiry':
        response = `很高兴您对合作感兴趣！AI太极SOS Ring为合作伙伴提供：

📊 **市场优势**：全球健康科技市场快速增长，智能穿戴需求旺盛
🏭 **供应链保障**：深圳自有工厂，10天交期，ISO认证
🤝 **合作模式**：经销代理、OEM定制、SDK技术合作

MOQ仅50件，我们提供完整的营销支持和技术培训。您的业务重心在哪个市场呢？我可以为您定制合作方案。`;
        break;
      case 'technical_question':
        response = `关于技术原理，AI太极SOS Ring的创新在于：

🧠 **AI太极架构**：多传感器融合 + 边缘AI推理 + 云端优化
⚡ **实时处理**：本地AI模型确保数据隐私和响应速度
🔄 **太极循环体**：感知—理解—调节的闭环反馈系统

我们的算法经过大量临床数据训练，准确率达到95%以上。您想深入了解哪个技术模块呢？`;
        break;
      case 'health_concern':
        response = `我很理解您对健康数据的关注。AI太极SOS Ring在隐私保护方面：

🔒 **数据主权**：所有健康数据本地加密处理，用户完全掌控
⚖️ **合规认证**：符合GDPR、HIPAA等国际隐私标准
🛡️ **安全机制**：AES-256加密 + 零知识证明 + 区块链审计

我们相信，真正的智能健康应该是"我的数据我做主"。您还有其他隐私方面的疑问吗？`;
        break;
      default:
        response = `感谢您的提问！AI太极SOS Ring致力于通过科技与人文的融合，为用户提供身心平衡的健康体验。

我们的产品结合了：
• 先进的AI健康监测技术
• 便捷的SOS紧急求救功能  
• 独特的太极养生模式

请问您最关心哪个方面？我会为您提供详细解答。`;
    }
    return {
      content: response,
      intent,
      emotion,
      confidence: 0.85 + Math.random() * 0.15,
      tools: intent === 'product_inquiry' ? ['product_catalog', 'spec_sheet'] : []
    };
  };
  const detectIntent = message => {
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes('产品') || lowerMessage.includes('功能') || lowerMessage.includes('怎么样')) {
      return 'product_inquiry';
    } else if (lowerMessage.includes('合作') || lowerMessage.includes('代理') || lowerMessage.includes('moq')) {
      return 'partner_inquiry';
    } else if (lowerMessage.includes('技术') || lowerMessage.includes('算法') || lowerMessage.includes('原理')) {
      return 'technical_question';
    } else if (lowerMessage.includes('隐私') || lowerMessage.includes('数据') || lowerMessage.includes('安全')) {
      return 'health_concern';
    }
    return 'general_inquiry';
  };
  const detectEmotion = message => {
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes('担心') || lowerMessage.includes('焦虑') || lowerMessage.includes('问题')) {
      return 'concerned';
    } else if (lowerMessage.includes('感兴趣') || lowerMessage.includes('很好') || lowerMessage.includes('不错')) {
      return 'positive';
    } else if (lowerMessage.includes('困惑') || lowerMessage.includes('不懂') || lowerMessage.includes('怎么')) {
      return 'confused';
    }
    return 'neutral';
  };
  const saveConversation = async (userMessage, aiMessage) => {
    try {
      if ($w) {
        await $w.cloud.callDataSource({
          dataSourceName: 'ai_conversation_record',
          methodName: 'wedaCreateV2',
          params: {
            data: {
              conversation_id: conversationId,
              user_message: userMessage.content,
              ai_response: aiMessage.content,
              intent: aiMessage.intent,
              emotion: aiMessage.emotion,
              confidence: aiMessage.confidence,
              model: selectedModel,
              response_time: 1.5,
              created_at: new Date().toISOString()
            }
          }
        });
      }
    } catch (error) {
      console.error('保存对话记录失败:', error);
    }
  };
  const handleKeyPress = e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  const handleFileUpload = e => {
    const file = e.target.files[0];
    if (file) {
      // 处理文件上传
      console.log('上传文件:', file.name);
    }
  };
  const handleVoiceRecord = () => {
    if (isRecording) {
      // 停止录音
      setIsRecording(false);
    } else {
      // 开始录音
      setIsRecording(true);
    }
  };
  const handleFeedback = (messageId, feedback) => {
    // 处理用户反馈
    console.log('反馈:', messageId, feedback);
  };
  const formatTime = date => {
    return date.toLocaleTimeString('zh-CN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  const getEmotionIcon = emotion => {
    switch (emotion) {
      case 'positive':
        return <Heart className="w-4 h-4 text-green-500" />;
      case 'concerned':
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case 'confused':
        return <Brain className="w-4 h-4 text-blue-500" />;
      default:
        return <MessageCircle className="w-4 h-4 text-gray-500" />;
    }
  };
  return <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      <div className="flex h-screen pt-16">
        {/* 侧边栏 */}
        {sidebarOpen && <div className="w-80 bg-gray-900 border-r border-gray-800 flex flex-col">
            <div className="p-4 border-b border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-yellow-500">AI客服控制台</h2>
                <button onClick={() => setSidebarOpen(false)} className="text-gray-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              {/* 模型选择 */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">AI模型</label>
                <Select value={selectedModel} onValueChange={setSelectedModel}>
                  <SelectTrigger className="bg-gray-800 border-gray-700">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {modelOptions.map(model => <SelectItem key={model.value} value={model.value}>
                        <div>
                          <div className="font-medium">{model.label}</div>
                          <div className="text-xs text-gray-400">{model.description}</div>
                        </div>
                      </SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              {/* 快速统计 */}
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-gray-800 p-3 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-500">{analytics.totalConversations}</div>
                  <div className="text-xs text-gray-400">总对话数</div>
                </div>
                <div className="bg-gray-800 p-3 rounded-lg">
                  <div className="text-2xl font-bold text-green-500">{(analytics.satisfactionScore * 20).toFixed(0)}%</div>
                  <div className="text-xs text-gray-400">满意度</div>
                </div>
              </div>
            </div>

            {/* Tab导航 */}
            <div className="flex-1 overflow-hidden">
              <div className="flex border-b border-gray-800">
                {['chat', 'analytics', 'knowledge', 'settings'].map(tab => <button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 px-3 py-2 text-sm font-medium transition-colors ${activeTab === tab ? 'bg-yellow-500 text-black' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}>
                    {tab === 'chat' && '对话'}
                    {tab === 'analytics' && '分析'}
                    {tab === 'knowledge' && '知识库'}
                    {tab === 'settings' && '设置'}
                  </button>)}
              </div>

              {/* Tab内容 */}
              <div className="flex-1 overflow-y-auto p-4">
                {activeTab === 'chat' && <div className="space-y-4">
                    <h3 className="text-sm font-medium text-gray-300 mb-2">对话历史</h3>
                    <div className="space-y-2">
                      {messages.slice(-5).map(msg => <div key={msg.id} className="p-2 bg-gray-800 rounded-lg text-xs">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium">{msg.type === 'user' ? '用户' : 'AI'}</span>
                            <span className="text-gray-400">{formatTime(msg.timestamp)}</span>
                          </div>
                          <div className="text-gray-300 truncate">{msg.content}</div>
                        </div>)}
                    </div>
                  </div>}

                {activeTab === 'analytics' && <div className="space-y-4">
                    <h3 className="text-sm font-medium text-gray-300 mb-2">实时分析</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-400">平均响应时间</span>
                        <span className="text-sm font-medium">{analytics.averageResponseTime}s</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-400">转化率</span>
                        <span className="text-sm font-medium text-green-500">{(analytics.conversionRate * 100).toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-400">主要意图</span>
                        <div className="flex flex-wrap gap-1">
                          {analytics.topIntents.map((intent, index) => <span key={index} className="px-2 py-1 bg-gray-800 text-xs rounded">
                              {intent}
                            </span>)}
                        </div>
                      </div>
                    </div>
                  </div>}

                {activeTab === 'knowledge' && <div className="space-y-4">
                    <h3 className="text-sm font-medium text-gray-300 mb-2">知识库</h3>
                    <div className="space-y-2">
                      {modulePrompts.map(prompt => <div key={prompt.id} className="p-3 bg-gray-800 rounded-lg">
                          <div className="font-medium text-sm mb-1">{prompt.name}</div>
                          <div className="text-xs text-gray-400 mb-2">{prompt.description}</div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-yellow-500">已启用</span>
                            <Button size="sm" variant="outline" className="border-gray-700 text-gray-400">
                              编辑
                            </Button>
                          </div>
                        </div>)}
                    </div>
                  </div>}

                {activeTab === 'settings' && <div className="space-y-4">
                    <h3 className="text-sm font-medium text-gray-300 mb-2">AI设置</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs text-gray-400 mb-1">温度 (创造性)</label>
                        <input type="range" min="0" max="1" step="0.1" value={aiSettings.temperature} onChange={e => setAiSettings(prev => ({
                    ...prev,
                    temperature: parseFloat(e.target.value)
                  }))} className="w-full" />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-400 mb-1">最大Token数</label>
                        <input type="number" value={aiSettings.maxTokens} onChange={e => setAiSettings(prev => ({
                    ...prev,
                    maxTokens: parseInt(e.target.value)
                  }))} className="w-full bg-gray-800 border border-gray-700 rounded px-2 py-1 text-sm" />
                      </div>
                      <div className="space-y-2">
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" checked={aiSettings.enableMemory} onChange={e => setAiSettings(prev => ({
                      ...prev,
                      enableMemory: e.target.checked
                    }))} />
                          <span className="text-sm">启用对话记忆</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" checked={aiSettings.enableEmotion} onChange={e => setAiSettings(prev => ({
                      ...prev,
                      enableEmotion: e.target.checked
                    }))} />
                          <span className="text-sm">启用情绪分析</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" checked={aiSettings.enableRAG} onChange={e => setAiSettings(prev => ({
                      ...prev,
                      enableRAG: e.target.checked
                    }))} />
                          <span className="text-sm">启用知识检索</span>
                        </label>
                      </div>
                    </div>
                  </div>}
              </div>
            </div>
          </div>}

        {/* 主聊天区域 */}
        <div className="flex-1 flex flex-col">
          {/* 聊天头部 */}
          <div className="bg-gray-900 border-b border-gray-800 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {!sidebarOpen && <button onClick={() => setSidebarOpen(true)} className="text-gray-400 hover:text-white">
                    <Menu className="w-5 h-5" />
                  </button>}
                <div className="flex items-center space-x-2">
                  <Bot className="w-6 h-6 text-yellow-500" />
                  <div>
                    <h1 className="text-lg font-semibold">AI太极智能客服</h1>
                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                      <span className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                        在线
                      </span>
                      <span>•</span>
                      <span>{modelOptions.find(m => m.value === selectedModel)?.label}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" className="border-gray-700 text-gray-400">
                  <Users className="w-4 h-4 mr-2" />
                  转人工
                </Button>
                <Button variant="outline" size="sm" className="border-gray-700 text-gray-400">
                  <Share2 className="w-4 h-4 mr-2" />
                  分享
                </Button>
              </div>
            </div>
          </div>

          {/* 消息区域 */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map(message => <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-2xl ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                  <div className={`flex items-end space-x-2 ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${message.type === 'user' ? 'bg-blue-500' : 'bg-yellow-500'}`}>
                      {message.type === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>
                    <div>
                      <div className={`px-4 py-2 rounded-lg ${message.type === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-800 text-white'}`}>
                        <div className="whitespace-pre-wrap">{message.content}</div>
                      </div>
                      <div className={`flex items-center space-x-2 mt-1 text-xs text-gray-400 ${message.type === 'user' ? 'justify-end' : ''}`}>
                        <span>{formatTime(message.timestamp)}</span>
                        {message.type === 'ai' && <>
                            <span>•</span>
                            <div className="flex items-center space-x-1">
                              {getEmotionIcon(message.emotion)}
                              <span>{message.confidence.toFixed(2)}</span>
                            </div>
                            <span>•</span>
                            <span>{message.intent}</span>
                          </>}
                      </div>
                      {message.type === 'ai' && <div className="flex items-center space-x-2 mt-2">
                          <button onClick={() => handleFeedback(message.id, 'thumbsup')} className="text-gray-400 hover:text-green-500">
                            <ThumbsUp className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleFeedback(message.id, 'thumbsdown')} className="text-gray-400 hover:text-red-500">
                            <ThumbsDown className="w-4 h-4" />
                          </button>
                          <button className="text-gray-400 hover:text-blue-500">
                            <Copy className="w-4 h-4" />
                          </button>
                        </div>}
                    </div>
                  </div>
                </div>
              </div>)}
            
            {isTyping && <div className="flex justify-start">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="px-4 py-2 bg-gray-800 rounded-lg">
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{
                    animationDelay: '0.1s'
                  }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{
                    animationDelay: '0.2s'
                  }}></div>
                    </div>
                  </div>
                </div>
              </div>}
            <div ref={messagesEndRef} />
          </div>

          {/* 输入区域 */}
          <div className="bg-gray-900 border-t border-gray-800 p-4">
            <div className="flex items-end space-x-2">
              <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept="image/*,.pdf,.doc,.docx" />
              
              <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()} className="border-gray-700 text-gray-400">
                <Paperclip className="w-4 h-4" />
              </Button>
              
              <Button variant="outline" size="sm" onClick={handleVoiceRecord} className={`border-gray-700 ${isRecording ? 'text-red-500' : 'text-gray-400'}`}>
                <Mic className="w-4 h-4" />
              </Button>
              
              <div className="flex-1">
                <Textarea value={inputMessage} onChange={e => setInputMessage(e.target.value)} onKeyPress={handleKeyPress} placeholder="输入您的问题..." rows={1} className="bg-gray-800 border-gray-700 resize-none" />
              </div>
              
              <Button variant="outline" size="sm" className="border-gray-700 text-gray-400">
                <Smile className="w-4 h-4" />
              </Button>
              
              <Button onClick={handleSendMessage} disabled={!inputMessage.trim() || isTyping} className="bg-yellow-500 hover:bg-yellow-600 text-black">
                <Send className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="flex items-center justify-between mt-2 text-xs text-gray-400">
              <span>按 Enter 发送，Shift + Enter 换行</span>
              <span>AI模型: {modelOptions.find(m => m.value === selectedModel)?.label}</span>
            </div>
          </div>
        </div>
      </div>
    </div>;
}