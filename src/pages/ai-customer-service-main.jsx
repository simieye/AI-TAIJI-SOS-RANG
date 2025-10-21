// @ts-ignore;
import React, { useState, useEffect, useRef } from 'react';
// @ts-ignore;
import { Button, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Textarea, Switch } from '@/components/ui';
// @ts-ignore;
import { MessageCircle, Send, Bot, User, Settings, BarChart3, Brain, Heart, Zap, Shield, Globe, Clock, TrendingUp, Users, FileText, Download, Upload, RefreshCw, Play, Pause, Square, CheckCircle, AlertCircle, X, Menu, Mic, Camera, Paperclip, Smile, ThumbsUp, ThumbsDown, Share2, Copy, Star, Filter, Search, ChevronLeft, ChevronRight, Eye, EyeOff, Lock, Unlock, Volume2, VolumeX, HeadphonesIcon, UserCheck, ArrowRight, Phone, Mail, MessageSquare, Calendar, MapPin, Tag, Activity, Target, Languages, Database, Cpu, Wifi, Battery } from 'lucide-react';

import { Navigation } from '@/components/Navigation';
import { NotificationSystem } from '@/components/NotificationSystem';
export default function AICustomerServiceMain(props) {
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
    language: 'zh',
    region: 'cn'
  });
  const [aiSettings, setAiSettings] = useState({
    model: 'gpt-4o',
    temperature: 0.7,
    maxTokens: 2000,
    systemPrompt: '',
    enableMemory: true,
    enableEmotion: true,
    enableRAG: true,
    language: 'zh',
    enableNotifications: true,
    autoTranslate: false
  });
  const [analytics, setAnalytics] = useState({
    totalConversations: 0,
    averageResponseTime: 0,
    satisfactionScore: 0,
    conversionRate: 0,
    topIntents: [],
    emotionDistribution: {},
    activeUsers: 0,
    knowledgeBaseUsage: 0
  });
  const [knowledgeBase, setKnowledgeBase] = useState([]);
  const [emotionData, setEmotionData] = useState([]);
  const [availableAgents, setAvailableAgents] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [isTransferring, setIsTransferring] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentEmotion, setCurrentEmotion] = useState('neutral');
  const [emotionHistory, setEmotionHistory] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  // AI模型选项
  const modelOptions = [{
    value: 'gpt-4o',
    label: 'GPT-4o',
    description: '最新多模态模型，支持图像理解',
    provider: 'openai'
  }, {
    value: 'claude-3-opus',
    label: 'Claude-3 Opus',
    description: '强大的推理能力，适合复杂对话',
    provider: 'anthropic'
  }, {
    value: 'qwen-max',
    label: 'Qwen Max',
    description: '中文优化，本地化部署',
    provider: 'qwen'
  }, {
    value: 'baidu-ernie',
    label: '百度文心',
    description: '中文理解能力强',
    provider: 'baidu'
  }, {
    value: 'google-gemini',
    label: 'Google Gemini',
    description: '多模态理解，全球服务',
    provider: 'google'
  }];

  // 可用客服人员
  const agentsList = [{
    id: 'agent_001',
    name: '张明',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=zhang',
    status: 'available',
    specialty: '技术支持',
    language: ['zh', 'en'],
    rating: 4.8,
    currentChats: 2,
    maxChats: 5
  }, {
    id: 'agent_002',
    name: '李华',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=li',
    status: 'available',
    specialty: '商务合作',
    language: ['zh', 'en', 'ja'],
    rating: 4.9,
    currentChats: 1,
    maxChats: 5
  }, {
    id: 'agent_003',
    name: '王芳',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=wang',
    status: 'busy',
    specialty: '售后服务',
    language: ['zh'],
    rating: 4.7,
    currentChats: 5,
    maxChats: 5
  }];

  // 初始化数据
  useEffect(() => {
    initializeConversation();
    loadAnalytics();
    loadKnowledgeBase();
    loadAvailableAgents();
    loadNotifications();
  }, []);

  // 自动滚动到底部
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 情绪变化监听
  useEffect(() => {
    if (messages.length > 0) {
      analyzeEmotion();
    }
  }, [messages]);
  const initializeConversation = () => {
    const welcomeMessage = {
      id: Date.now(),
      type: 'ai',
      content: `🌿 您好！我是AI太极SOS Ring智能健康顾问
      
我很理解您在寻找智能健康解决方案时的考量。作为融合AI健康监测、SOS紧急求救和太极养生模式的创新产品，我们专注于为用户提供身心平衡的科技体验。

我可以为您提供：
• 产品功能和技术原理详解
• 合作定制和MOQ信息咨询  
• 健康数据分析和隐私保护说明
• 多语言服务支持

请问您想了解哪个方面呢？我会根据您的需求，提供专业、贴心的解答。`,
      timestamp: new Date(),
      intent: 'welcome',
      emotion: 'friendly',
      confidence: 1.0,
      model: selectedModel,
      tools: ['knowledge_retrieval']
    };
    setMessages([welcomeMessage]);
    setConversationId(`conv_${Date.now()}`);
    setCurrentEmotion('friendly');
    setEmotionHistory([{
      emotion: 'friendly',
      intensity: 0.8,
      timestamp: new Date()
    }]);
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
          const totalConversations = result.records.length;
          const avgResponseTime = 1.2;
          const satisfactionScore = 4.5;
          const conversionRate = 0.35;
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
            },
            activeUsers: 89,
            knowledgeBaseUsage: 156
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
            filter: {
              where: {
                status: {
                  $eq: 'published'
                }
              }
            },
            orderBy: [{
              usage_frequency: 'desc'
            }],
            pageSize: 20
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
  const loadAvailableAgents = () => {
    setAvailableAgents(agentsList);
  };
  const loadNotifications = () => {
    const mockNotifications = [{
      id: 'notif_001',
      type: 'info',
      title: '新知识库更新',
      message: '产品FAQ已更新，包含最新的SOS功能说明',
      timestamp: new Date(),
      read: false
    }, {
      id: 'notif_002',
      type: 'warning',
      title: '客服人员状态',
      message: '技术支持客服张明当前在线',
      timestamp: new Date(Date.now() - 300000),
      read: false
    }];
    setNotifications(mockNotifications);
  };
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoRef({
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

    // 保存用户消息
    await saveConversationRecord(userMessage);
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
        model: selectedModel,
        tools: aiResponse.tools,
        knowledgeUsed: aiResponse.knowledgeUsed
      };
      setMessages(prev => [...prev, aiMessage]);

      // 保存AI回复和情绪分析
      await saveConversationRecord(aiMessage);
      await saveEmotionAnalysis(userMessage, aiMessage);

      // 检查是否需要转人工
      if (aiResponse.shouldTransfer) {
        setShowTransferModal(true);
      }
    } catch (error) {
      console.error('AI服务调用失败:', error);
      const errorMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: '抱歉，我现在遇到了一些技术问题。请稍后再试，或者直接联系我们的客服团队。',
        timestamp: new Date(),
        intent: 'error',
        emotion: 'apologetic',
        confidence: 1.0,
        model: selectedModel
      };
      setMessages(prev => [...prev, errorMessage]);
      await saveConversationRecord(errorMessage);
    } finally {
      setIsTyping(false);
    }
  };
  const callAIService = async message => {
    // 模拟AI服务调用
    await new Promise(resolve => setTimeout(resolve, 1500));

    // 意图识别
    const intent = detectIntent(message);
    const emotion = detectEmotion(message);

    // 知识库检索
    const knowledgeResults = await searchKnowledgeBase(message);
    let response = '';
    let shouldTransfer = false;
    let knowledgeUsed = [];
    switch (intent) {
      case 'product_inquiry':
        response = generateProductResponse(message, knowledgeResults);
        knowledgeUsed = knowledgeResults.slice(0, 2);
        break;
      case 'partner_inquiry':
        response = generatePartnerResponse(message, knowledgeResults);
        knowledgeUsed = knowledgeResults.slice(0, 2);
        break;
      case 'technical_question':
        response = generateTechnicalResponse(message, knowledgeResults);
        knowledgeUsed = knowledgeResults.slice(0, 3);
        break;
      case 'complaint':
        response = generateComplaintResponse(message, emotion);
        shouldTransfer = emotion === 'frustrated' || emotion === 'angry';
        break;
      case 'emergency':
        response = generateEmergencyResponse(message);
        shouldTransfer = true;
        break;
      default:
        response = generateGeneralResponse(message, knowledgeResults);
        knowledgeUsed = knowledgeResults.slice(0, 1);
    }
    return {
      content: response,
      intent,
      emotion,
      confidence: 0.85 + Math.random() * 0.15,
      tools: intent === 'product_inquiry' ? ['product_catalog', 'spec_sheet'] : ['knowledge_retrieval'],
      shouldTransfer,
      knowledgeUsed
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
    } else if (lowerMessage.includes('投诉') || lowerMessage.includes('问题') || lowerMessage.includes('不满意')) {
      return 'complaint';
    } else if (lowerMessage.includes('紧急') || lowerMessage.includes('urgent') || lowerMessage.includes('help')) {
      return 'emergency';
    }
    return 'general_inquiry';
  };
  const detectEmotion = message => {
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes('担心') || lowerMessage.includes('焦虑') || lowerMessage.includes('问题')) {
      return 'concerned';
    } else if (lowerMessage.includes('满意') || lowerMessage.includes('很好') || lowerMessage.includes('不错')) {
      return 'positive';
    } else if (lowerMessage.includes('愤怒') || lowerMessage.includes('不满意') || lowerMessage.includes('糟糕')) {
      return 'frustrated';
    } else if (lowerMessage.includes('困惑') || lowerMessage.includes('不懂') || lowerMessage.includes('怎么')) {
      return 'confused';
    }
    return 'neutral';
  };
  const searchKnowledgeBase = async query => {
    try {
      if ($w) {
        const result = await $w.cloud.callDataSource({
          dataSourceName: 'ai_knowledge_base',
          methodName: 'wedaGetRecordsV2',
          params: {
            filter: {
              where: {
                $or: [{
                  keywords: {
                    $search: query
                  }
                }, {
                  title: {
                    $search: query
                  }
                }, {
                  content: {
                    $search: query
                  }
                }]
              }
            },
            orderBy: [{
              relevance_score: 'desc'
            }],
            pageSize: 5
          }
        });
        return result?.records || [];
      }
    } catch (error) {
      console.error('知识库检索失败:', error);
    }
    return [];
  };
  const generateProductResponse = (message, knowledgeResults) => {
    const baseResponse = `我理解您对AI太极SOS Ring产品的关注。`;
    if (knowledgeResults.length > 0) {
      const knowledge = knowledgeResults[0];
      return `${baseResponse}

${knowledge.summary}

${knowledge.content.substring(0, 200)}...

想了解更多详细信息吗？我可以为您介绍具体的功能特点或技术参数。`;
    }
    return `${baseResponse}我们的核心优势在于：

🔍 **智能监测**：24小时连续监测心率、HRV、睡眠质量和情绪波动
🆘 **SOS功能**：紧急情况下一键求救，自动定位并发送警报  
🌿 **太极模式**：通过呼吸引导和节律调节，帮助身心平衡

我们采用深圳自有工厂生产，MOQ仅50件，支持OEM定制。您是想了解具体的技术参数，还是合作模式呢？`;
  };
  const generatePartnerResponse = (message, knowledgeResults) => {
    const baseResponse = `很高兴您对合作感兴趣！`;
    if (knowledgeResults.length > 0) {
      const knowledge = knowledgeResults[0];
      return `${baseResponse}

${knowledge.summary}

${knowledge.content.substring(0, 200)}...

需要我为您详细介绍合作政策吗？`;
    }
    return `${baseResponse}AI太极SOS Ring为合作伙伴提供：

📊 **市场优势**：全球健康科技市场快速增长，智能穿戴需求旺盛
🏭 **供应链保障**：深圳自有工厂，10天交期，ISO认证
🤝 **合作模式**：经销代理、OEM定制、SDK技术合作

MOQ仅50件，我们提供完整的营销支持和技术培训。您的业务重心在哪个市场呢？`;
  };
  const generateTechnicalResponse = (message, knowledgeResults) => {
    const baseResponse = `关于技术原理，`;
    if (knowledgeResults.length > 0) {
      const knowledge = knowledgeResults[0];
      return `${baseResponse}

${knowledge.summary}

${knowledge.content.substring(0, 200)}...

需要我深入解释某个技术模块吗？`;
    }
    return `${baseResponse}AI太极SOS Ring的创新在于：

🧠 **AI太极架构**：多传感器融合 + 边缘AI推理 + 云端优化
⚡ **实时处理**：本地AI模型确保数据隐私和响应速度
🔄 **太极循环体**：感知—理解—调节的闭环反馈系统

我们的算法经过大量临床数据训练，准确率达到95%以上。您想深入了解哪个技术模块呢？`;
  };
  const generateComplaintResponse = (message, emotion) => {
    const empathyMap = {
      'frustrated': '我很理解您的挫败感，遇到问题确实令人困扰。',
      'angry': '我能感受到您的不满，给您带来不便非常抱歉。',
      'concerned': '我理解您的担心，让我们一起解决这个问题。'
    };
    const empathy = empathyMap[emotion] || '我理解您的感受。';
    return `${empathathy}

您遇到的具体问题是什么？我会立即为您：
1. 详细记录您的问题
2. 提供解决方案
3. 如需要，为您转接专业的技术支持

请告诉我具体情况，我会全力帮助您解决问题。`;
  };
  const generateEmergencyResponse = message => {
    return `⚠️ 我理解这可能是紧急情况！

如果您遇到的是产品使用紧急问题：
• SOS功能：请长按戒指侧边按钮3秒
• 紧急联系：立即拨打我们的24小时热线 400-123-4567
• 技术支持：技术团队在线待命

如果是其他紧急情况，请立即联系当地急救服务。

我已为您标记为高优先级，是否需要立即转接人工客服？`;
  };
  const generateGeneralResponse = (message, knowledgeResults) => {
    if (knowledgeResults.length > 0) {
      const knowledge = knowledgeResults[0];
      return `根据我的知识库，我找到了相关信息：

${knowledge.summary}

${knowledge.content.substring(0, 150)}...

这能解答您的问题吗？需要我提供更多详细信息吗？`;
    }
    return `感谢您的提问！AI太极SOS Ring致力于通过科技与人文的融合，为用户提供身心平衡的健康体验。

我们的产品结合了：
• 先进的AI健康监测技术
• 便捷的SOS紧急求救功能  
• 独特的太极养生模式

请问您最关心哪个方面？我会为您提供详细解答。`;
  };
  const saveConversationRecord = async message => {
    try {
      if ($w) {
        await $w.cloud.callDataSource({
          dataSourceName: 'ai_conversation_record',
          methodName: 'wedaCreateV2',
          params: {
            data: {
              conversation_id: conversationId,
              user_id: userProfile.name || 'anonymous',
              session_id: conversationId,
              user_message: message.type === 'user' ? message.content : '',
              ai_response: message.type === 'ai' ? message.content : '',
              message_type: message.type,
              intent: message.intent || '',
              emotion: message.emotion || 'neutral',
              confidence: message.confidence || 0.8,
              response_time: message.responseTime || 0,
              satisfaction_score: message.satisfactionScore || 0,
              model_used: message.model || selectedModel,
              prompt_template: message.promptTemplate || '',
              tools_called: message.tools || [],
              context_data: message.contextData || {},
              source: 'web',
              language: userProfile.language || 'zh',
              region: userProfile.region || 'cn',
              conversion_status: message.conversionStatus || '',
              tags: message.tags || [],
              feedback: message.feedback || {},
              status: 'active',
              priority: message.priority || 3,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            }
          }
        });
      }
    } catch (error) {
      console.error('保存对话记录失败:', error);
    }
  };
  const saveEmotionAnalysis = async (userMessage, aiMessage) => {
    try {
      if ($w && aiSettings.enableEmotion) {
        await $w.cloud.callDataSource({
          dataSourceName: 'ai_emotion_analysis',
          methodName: 'wedaCreateV2',
          params: {
            data: {
              analysis_id: `emotion_${Date.now()}`,
              conversation_id: conversationId,
              message_id: userMessage.id.toString(),
              user_id: userProfile.name || 'anonymous',
              emotion_type: aiMessage.emotion || 'neutral',
              emotion_intensity: 0.7,
              sentiment_score: aiMessage.emotion === 'positive' ? 0.8 : aiMessage.emotion === 'negative' ? -0.6 : 0.1,
              keywords: extractKeywords(userMessage.content),
              confidence: aiMessage.confidence || 0.8,
              analysis_method: 'hybrid',
              model_version: 'emotion_v2.1',
              emotion_change_trend: analyzeEmotionTrend(),
              previous_emotion: currentEmotion,
              emotion_triggers: detectEmotionTriggers(userMessage.content),
              context_factors: {
                conversation_stage: 'active',
                user_intent: aiMessage.intent || 'general',
                time_of_day: new Date().getHours()
              },
              risk_level: assessRiskLevel(aiMessage.emotion),
              escalation_triggered: false,
              analysis_depth: 'standard',
              data_sources: ['text'],
              processing_time: 150,
              quality_score: 0.9,
              session_context: {
                previous_messages: messages.length,
                session_duration: Date.now() - (messages[0]?.timestamp?.getTime() || Date.now()),
                topic_consistency: 'high'
              },
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            }
          }
        });
      }
    } catch (error) {
      console.error('保存情绪分析失败:', error);
    }
  };
  const extractKeywords = text => {
    const keywords = text.match(/[\u4e00-\u9fa5]+|[a-zA-Z]+/g) || [];
    return keywords.slice(0, 10);
  };
  const analyzeEmotionTrend = () => {
    if (emotionHistory.length < 2) return 'stable';
    const recent = emotionHistory.slice(-3);
    const trend = recent.map(e => e.emotion);
    if (trend.every(e => e === 'positive')) return 'improving';
    if (trend.every(e => e === 'negative')) return 'deteriorating';
    return 'stable';
  };
  const detectEmotionTriggers = text => {
    const triggers = [];
    if (text.includes('价格') || text.includes('钱')) triggers.push('price_concern');
    if (text.includes('技术') || text.includes('功能')) triggers.push('technical_inquiry');
    if (text.includes('合作') || text.includes('代理')) triggers.push('business_inquiry');
    return triggers;
  };
  const assessRiskLevel = emotion => {
    const riskMap = {
      'angry': 'high',
      'frustrated': 'medium',
      'concerned': 'low',
      'positive': 'low',
      'neutral': 'low'
    };
    return riskMap[emotion] || 'low';
  };
  const analyzeEmotion = () => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage && lastMessage.type === 'ai') {
      setCurrentEmotion(lastMessage.emotion || 'neutral');
      setEmotionHistory(prev => [...prev, {
        emotion: lastMessage.emotion || 'neutral',
        intensity: lastMessage.confidence || 0.8,
        timestamp: new Date()
      }]);
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
      console.log('上传文件:', file.name);
    }
  };
  const handleVoiceRecord = () => {
    if (isRecording) {
      setIsRecording(false);
    } else {
      setIsRecording(true);
    }
  };
  const handleTransferToAgent = async () => {
    if (!selectedAgent) {
      alert('请选择客服人员');
      return;
    }
    setIsTransferring(true);
    try {
      // 保存转接记录
      await $w.cloud.callDataSource({
        dataSourceName: 'ai_conversation_record',
        methodName: 'wedaUpdateV2',
        params: {
          data: {
            status: 'transferred',
            assigned_agent: selectedAgent.id,
            escalation_reason: 'user_request',
            updated_at: new Date().toISOString()
          },
          filter: {
            where: {
              conversation_id: {
                $eq: conversationId
              }
            }
          }
        }
      });

      // 发送通知给客服人员
      await sendNotificationToAgent(selectedAgent);

      // 添加转接消息
      const transferMessage = {
        id: Date.now(),
        type: 'system',
        content: `正在为您转接给客服专员 ${selectedAgent.name}（${selectedAgent.specialty}），请稍候...`,
        timestamp: new Date(),
        intent: 'transfer',
        emotion: 'neutral',
        confidence: 1.0
      };
      setMessages(prev => [...prev, transferMessage]);
      setShowTransferModal(false);
      setIsTransferring(false);
    } catch (error) {
      console.error('转接失败:', error);
      setIsTransferring(false);
      alert('转接失败，请重试');
    }
  };
  const sendNotificationToAgent = async agent => {
    try {
      await $w.cloud.callDataSource({
        dataSourceName: 'notifications',
        methodName: 'wedaCreateV2',
        params: {
          data: {
            recipient_id: agent.id,
            type: 'transfer_request',
            title: '新的对话转接',
            message: `用户请求转接，会话ID: ${conversationId}`,
            timestamp: new Date().toISOString(),
            read: false
          }
        }
      });
    } catch (error) {
      console.error('发送通知失败:', error);
    }
  };
  const handleFeedback = async (messageId, feedback) => {
    try {
      await $w.cloud.callDataSource({
        dataSourceName: 'ai_conversation_record',
        methodName: 'wedaUpdateV2',
        params: {
          data: {
            feedback: {
              helpful: feedback === 'thumbsup',
              rating: feedback === 'thumbsup' ? 5 : 2,
              timestamp: new Date().toISOString()
            },
            updated_at: new Date().toISOString()
          },
          filter: {
            where: {
              _id: {
                $eq: messageId
              }
            }
          }
        }
      });
    } catch (error) {
      console.error('保存反馈失败:', error);
    }
  };
  const formatTime = date => {
    return date.toLocaleTimeString('zh-CN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  const getEmotionIcon = emotion => {
    const iconMap = {
      'positive': <Heart className="w-4 h-4 text-green-500" />,
      'concerned': <AlertCircle className="w-4 h-4 text-yellow-500" />,
      'frustrated': <AlertCircle className="w-4 h-4 text-red-500" />,
      'confused': <Brain className="w-4 h-4 text-blue-500" />,
      'angry': <AlertCircle className="w-4 h-4 text-red-600" />,
      'neutral': <MessageCircle className="w-4 h-4 text-gray-500" />,
      'friendly': <Smile className="w-4 h-4 text-green-500" />
    };
    return iconMap[emotion] || <MessageCircle className="w-4 h-4 text-gray-500" />;
  };
  const getAgentStatusColor = status => {
    const colorMap = {
      'available': 'text-green-500',
      'busy': 'text-red-500',
      'offline': 'text-gray-500'
    };
    return colorMap[status] || 'text-gray-500';
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

              {/* 当前情绪状态 */}
              <div className="mb-4 p-3 bg-gray-800 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-300">当前情绪</span>
                  {getEmotionIcon(currentEmotion)}
                </div>
                <div className="text-xs text-gray-400">
                  检测到用户情绪: {currentEmotion}
                </div>
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
                {['chat', 'analytics', 'knowledge', 'agents', 'settings'].map(tab => <button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 px-3 py-2 text-sm font-medium transition-colors ${activeTab === tab ? 'bg-yellow-500 text-black' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}>
                    {tab === 'chat' && '对话'}
                    {tab === 'analytics' && '分析'}
                    {tab === 'knowledge' && '知识库'}
                    {tab === 'agents' && '客服'}
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
                        <span className="text-sm text-gray-400">知识库使用</span>
                        <span className="text-sm font-medium text-blue-500">{analytics.knowledgeBaseUsage}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-400">在线用户</span>
                        <span className="text-sm font-medium text-purple-500">{analytics.activeUsers}</span>
                      </div>
                    </div>
                  </div>}

                {activeTab === 'knowledge' && <div className="space-y-4">
                    <h3 className="text-sm font-medium text-gray-300 mb-2">知识库检索</h3>
                    <div className="space-y-2">
                      {knowledgeBase.slice(0, 5).map(item => <div key={item.knowledge_id} className="p-3 bg-gray-800 rounded-lg">
                          <div className="font-medium text-sm mb-1">{item.title}</div>
                          <div className="text-xs text-gray-400 mb-2">{item.category}</div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-yellow-500">使用次数: {item.usage_frequency || 0}</span>
                            <span className="text-xs text-green-500">有效性: {((item.effectiveness_score || 0) * 100).toFixed(0)}%</span>
                          </div>
                        </div>)}
                    </div>
                  </div>}

                {activeTab === 'agents' && <div className="space-y-4">
                    <h3 className="text-sm font-medium text-gray-300 mb-2">在线客服</h3>
                    <div className="space-y-2">
                      {availableAgents.map(agent => <div key={agent.id} className="p-3 bg-gray-800 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <img src={agent.avatar} alt={agent.name} className="w-8 h-8 rounded-full" />
                            <div className="flex-1">
                              <div className="font-medium text-sm">{agent.name}</div>
                              <div className="text-xs text-gray-400">{agent.specialty}</div>
                            </div>
                            <div className={`text-xs ${getAgentStatusColor(agent.status)}`}>
                              {agent.status === 'available' ? '在线' : agent.status === 'busy' ? '忙碌' : '离线'}
                            </div>
                          </div>
                          <div className="flex items-center justify-between mt-2 text-xs text-gray-400">
                            <span>评分: {agent.rating}</span>
                            <span>当前对话: {agent.currentChats}/{agent.maxChats}</span>
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
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" checked={aiSettings.enableNotifications} onChange={e => setAiSettings(prev => ({
                      ...prev,
                      enableNotifications: e.target.checked
                    }))} />
                          <span className="text-sm">启用通知</span>
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
                      <span>•</span>
                      <span className="flex items-center">
                        {getEmotionIcon(currentEmotion)}
                        <span className="ml-1">{currentEmotion}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button onClick={() => setShowTransferModal(true)} variant="outline" size="sm" className="border-gray-700 text-gray-400">
                  <Users className="w-4 h-4 mr-2" />
                  转人工
                </Button>
                <Button variant="outline" size="sm" className="border-gray-700 text-gray-400">
                  <Share2 className="w-4 h-4 mr-2" />
                  分享
                </Button>
                <div className="relative">
                  <Button variant="outline" size="sm" className="border-gray-700 text-gray-400">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    通知
                    {notifications.filter(n => !n.read).length > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                        {notifications.filter(n => !n.read).length}
                      </span>}
                  </Button>
                </div>
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
                        {message.knowledgeUsed && message.knowledgeUsed.length > 0 && <div className="mt-2 pt-2 border-t border-gray-700">
                            <div className="text-xs text-gray-400 mb-1">参考知识:</div>
                            {message.knowledgeUsed.map((knowledge, index) => <div key={index} className="text-xs text-yellow-500">
                                • {knowledge.title}
                              </div>)}
                          </div>}
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
                            <span>•</span>
                            <span>{message.model}</span>
                          </>}
                      </div>
                      {message.type === 'ai' && <div className="flex items-center space-x-2 mt-2">
                          <button onClick={() => handleFeedback(message._id, 'thumbsup')} className="text-gray-400 hover:text-green-500">
                            <ThumbsUp className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleFeedback(message._id, 'thumbsdown')} className="text-gray-400 hover:text-red-500">
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

      {/* 人工转接模态框 */}
      {showTransferModal && <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-xl border border-gray-800 w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-yellow-500">转接人工客服</h3>
                <button onClick={() => setShowTransferModal(false)} className="text-gray-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">选择客服人员</label>
                  <div className="space-y-2">
                    {availableAgents.filter(agent => agent.status === 'available').map(agent => <div key={agent.id} onClick={() => setSelectedAgent(agent)} className={`p-3 border rounded-lg cursor-pointer transition-colors ${selectedAgent?.id === agent.id ? 'border-yellow-500 bg-yellow-500/10' : 'border-gray-700 hover:border-gray-600'}`}>
                        <div className="flex items-center space-x-3">
                          <img src={agent.avatar} alt={agent.name} className="w-10 h-10 rounded-full" />
                          <div className="flex-1">
                            <div className="font-medium">{agent.name}</div>
                            <div className="text-sm text-gray-400">{agent.specialty}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-green-500">在线</div>
                            <div className="text-xs text-gray-400">评分: {agent.rating}</div>
                          </div>
                        </div>
                      </div>)}
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <Button onClick={() => setShowTransferModal(false)} variant="outline" className="flex-1 border-gray-700 text-gray-400">
                    取消
                  </Button>
                  <Button onClick={handleTransferToAgent} disabled={!selectedAgent || isTransferring} className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black">
                    {isTransferring ? '转接中...' : '确认转接'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>}

      {/* 通知系统 */}
      <NotificationSystem notifications={notifications} />
    </div>;
}