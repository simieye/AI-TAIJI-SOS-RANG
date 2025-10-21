// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Textarea, Switch, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui';
// @ts-ignore;
import { Users, UserPlus, UserMinus, Settings, Eye, Edit2, Trash2, MessageCircle, HeadphonesIcon, Activity, TrendingUp, BarChart3, Clock, CheckCircle, XCircle, AlertCircle, Search, Filter, Download, Upload, RefreshCw, Globe, Languages, FileText, Database, Shield, Key, Mail, Phone, MapPin, Calendar, Star, ThumbsUp, ThumbsDown, ArrowRight, Play, Pause, Square, ChevronLeft, ChevronRight, MoreHorizontal, Plus, Edit, Copy, Share2, Bell, Zap, Target, Award, TrendingDown, X } from 'lucide-react';

import { Navigation } from '@/components/Navigation';
// 客服编辑模态框组件
function AgentModal({
  agent,
  onSave,
  onCancel
}) {
  const [formData, setFormData] = useState({
    name: agent?.name || '',
    email: agent?.email || '',
    specialty: agent?.specialty || '',
    department: agent?.department || '',
    language: agent?.language || ['zh'],
    maxChats: agent?.maxChats || 5,
    workingHours: agent?.workingHours || '09:00-18:00',
    timezone: agent?.timezone || 'Asia/Shanghai',
    permissions: agent?.permissions || ['view_conversations'],
    status: agent?.status || 'offline'
  });
  const handleSave = () => {
    onSave(formData);
  };
  return <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-xl border border-gray-800 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-yellow-500">
              {agent ? '编辑客服人员' : '添加客服人员'}
            </h3>
            <button onClick={onCancel} className="text-gray-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">姓名</label>
              <Input value={formData.name} onChange={e => setFormData(prev => ({
              ...prev,
              name: e.target.value
            }))} placeholder="输入姓名" className="bg-gray-800 border-gray-700" />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">邮箱</label>
              <Input type="email" value={formData.email} onChange={e => setFormData(prev => ({
              ...prev,
              email: e.target.value
            }))} placeholder="输入邮箱" className="bg-gray-800 border-gray-700" />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">专业领域</label>
              <Input value={formData.specialty} onChange={e => setFormData(prev => ({
              ...prev,
              specialty: e.target.value
            }))} placeholder="如：技术支持、商务合作" className="bg-gray-800 border-gray-700" />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">部门</label>
              <Input value={formData.department} onChange={e => setFormData(prev => ({
              ...prev,
              department: e.target.value
            }))} placeholder="如：技术部、商务部" className="bg-gray-800 border-gray-700" />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">最大对话数</label>
              <Input type="number" value={formData.maxChats} onChange={e => setFormData(prev => ({
              ...prev,
              maxChats: parseInt(e.target.value) || 5
            }))} min="1" max="10" className="bg-gray-800 border-gray-700" />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">工作时间</label>
              <Input value={formData.workingHours} onChange={e => setFormData(prev => ({
              ...prev,
              workingHours: e.target.value
            }))} placeholder="09:00-18:00" className="bg-gray-800 border-gray-700" />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">时区</label>
              <Input value={formData.timezone} onChange={e => setFormData(prev => ({
              ...prev,
              timezone: e.target.value
            }))} placeholder="Asia/Shanghai" className="bg-gray-800 border-gray-700" />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">状态</label>
              <Select value={formData.status} onValueChange={value => setFormData(prev => ({
              ...prev,
              status: value
            }))}>
                <SelectTrigger className="bg-gray-800 border-gray-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="online">在线</SelectItem>
                  <SelectItem value="busy">忙碌</SelectItem>
                  <SelectItem value="offline">离线</SelectItem>
                  <SelectItem value="away">离开</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex space-x-3 mt-6">
            <Button onClick={onCancel} variant="outline" className="flex-1 border-gray-700 text-gray-400">
              取消
            </Button>
            <Button onClick={handleSave} className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black">
              保存
            </Button>
          </div>
        </div>
      </div>
    </div>;
}

// 转接模态框组件
function TransferModal({
  conversation,
  agents,
  onTransfer,
  onCancel
}) {
  const [selectedAgent, setSelectedAgent] = useState(null);
  const handleTransfer = () => {
    if (selectedAgent && conversation) {
      onTransfer(conversation.id, selectedAgent);
    }
  };
  return <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-xl border border-gray-800 w-full max-w-md">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-yellow-500">转接对话</h3>
            <button onClick={onCancel} className="text-gray-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {conversation && <div className="mb-4 p-3 bg-gray-800 rounded-lg">
              <div className="text-sm text-gray-300 mb-1">对话信息</div>
              <div className="text-white">{conversation.userName}</div>
              <div className="text-sm text-gray-400">{conversation.lastMessage}</div>
            </div>}
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300 mb-2">选择客服人员</label>
            {agents.map(agent => <div key={agent.id} onClick={() => setSelectedAgent(agent)} className={`p-3 border rounded-lg cursor-pointer transition-colors ${selectedAgent?.id === agent.id ? 'border-yellow-500 bg-yellow-500/10' : 'border-gray-700 hover:border-gray-600'}`}>
                <div className="flex items-center space-x-3">
                  <img src={agent.avatar} alt={agent.name} className="w-10 h-10 rounded-full" />
                  <div className="flex-1">
                    <div className="font-medium">{agent.name}</div>
                    <div className="text-sm text-gray-400">{agent.specialty}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-green-500">在线</div>
                    <div className="text-xs text-gray-400">{agent.currentChats}/{agent.maxChats}</div>
                  </div>
                </div>
              </div>)}
          </div>
          
          <div className="flex space-x-3 mt-4">
            <Button onClick={onCancel} variant="outline" className="flex-1 border-gray-700 text-gray-400">
              取消
            </Button>
            <Button onClick={handleTransfer} disabled={!selectedAgent} className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black">
              确认转接
            </Button>
          </div>
        </div>
      </div>
    </div>;
}

// 语言模板编辑模态框组件
function LanguageTemplateModal({
  template,
  languages,
  onSave,
  onCancel
}) {
  const [formData, setFormData] = useState({
    name: template?.name || '',
    type: template?.type || 'welcome',
    language: template?.language || 'zh',
    region: template?.region || 'cn',
    content: template?.content || '',
    variables: template?.variables || [],
    status: template?.status || 'active'
  });
  const handleSave = () => {
    onSave(formData);
  };
  return <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-xl border border-gray-800 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-yellow-500">
              {template ? '编辑语言模板' : '添加语言模板'}
            </h3>
            <button onClick={onCancel} className="text-gray-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">模板名称</label>
                <Input value={formData.name} onChange={e => setFormData(prev => ({
                ...prev,
                name: e.target.value
              }))} placeholder="输入模板名称" className="bg-gray-800 border-gray-700" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">模板类型</label>
                <Select value={formData.type} onValueChange={value => setFormData(prev => ({
                ...prev,
                type: value
              }))}>
                  <SelectTrigger className="bg-gray-800 border-gray-700">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="welcome">欢迎消息</SelectItem>
                    <SelectItem value="transfer">转接通知</SelectItem>
                    <SelectItem value="goodbye">告别消息</SelectItem>
                    <SelectItem value="error">错误提示</SelectItem>
                    <SelectItem value="promotion">促销信息</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">语言</label>
                <Select value={formData.language} onValueChange={value => setFormData(prev => ({
                ...prev,
                language: value
              }))}>
                  <SelectTrigger className="bg-gray-800 border-gray-700">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map(lang => <SelectItem key={lang.value} value={lang.value}>
                        <div className="flex items-center space-x-2">
                          <span>{lang.flag}</span>
                          <span>{lang.label}</span>
                        </div>
                      </SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">地区</label>
                <Input value={formData.region} onChange={e => setFormData(prev => ({
                ...prev,
                region: e.target.value
              }))} placeholder="如：cn, us, jp" className="bg-gray-800 border-gray-700" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">模板内容</label>
              <Textarea value={formData.content} onChange={e => setFormData(prev => ({
              ...prev,
              content: e.target.value
            }))} placeholder="输入模板内容..." rows={4} className="bg-gray-800 border-gray-700" />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">状态</label>
              <Select value={formData.status} onValueChange={value => setFormData(prev => ({
              ...prev,
              status: value
            }))}>
                <SelectTrigger className="bg-gray-800 border-gray-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">活跃</SelectItem>
                  <SelectItem value="inactive">停用</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex space-x-3 mt-6">
            <Button onClick={onCancel} variant="outline" className="flex-1 border-gray-700 text-gray-400">
              取消
            </Button>
            <Button onClick={handleSave} className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black">
              保存
            </Button>
          </div>
        </div>
      </div>
    </div>;
}
export default function AgentManagementDashboard(props) {
  const {
    $w
  } = props;
  const [activeTab, setActiveTab] = useState('agents');
  const [agents, setAgents] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [performanceData, setPerformanceData] = useState([]);
  const [knowledgeBase, setKnowledgeBase] = useState([]);
  const [languageTemplates, setLanguageTemplates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [showAgentModal, setShowAgentModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [dateRange, setDateRange] = useState('7d');
  const [editingTemplate, setEditingTemplate] = useState(null);
  const [showTemplateModal, setShowTemplateModal] = useState(false);

  // 权限选项
  const permissionOptions = [{
    value: 'view_conversations',
    label: '查看对话',
    description: '查看用户对话记录'
  }, {
    value: 'manage_conversations',
    label: '管理对话',
    description: '接管和转接对话'
  }, {
    value: 'edit_knowledge',
    label: '编辑知识库',
    description: '添加和修改FAQ内容'
  }, {
    value: 'view_analytics',
    label: '查看分析',
    description: '查看绩效和统计数据'
  }, {
    value: 'manage_agents',
    label: '管理客服',
    description: '添加和管理其他客服人员'
  }, {
    value: 'system_settings',
    label: '系统设置',
    description: '修改系统配置'
  }];

  // 语言选项
  const languageOptions = [{
    value: 'zh',
    label: '中文',
    flag: '🇨🇳'
  }, {
    value: 'en',
    label: 'English',
    flag: '🇺🇸'
  }, {
    value: 'ja',
    label: '日本語',
    flag: '🇯🇵'
  }, {
    value: 'ko',
    label: '한국어',
    flag: '🇰🇷'
  }, {
    value: 'es',
    label: 'Español',
    flag: '🇪🇸'
  }, {
    value: 'fr',
    label: 'Français',
    flag: '🇫🇷'
  }];

  // 初始化数据
  useEffect(() => {
    loadAgents();
    loadConversations();
    loadPerformanceData();
    loadKnowledgeBase();
    loadLanguageTemplates();
  }, [currentPage, filterStatus, dateRange]);
  const loadAgents = async () => {
    setIsLoading(true);
    try {
      // 模拟客服人员数据
      const mockAgents = [{
        id: 'agent_001',
        name: '张明',
        email: 'zhangming@aitaiji.com',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=zhang',
        status: 'online',
        specialty: '技术支持',
        department: '技术部',
        language: ['zh', 'en'],
        rating: 4.8,
        totalChats: 1250,
        avgResponseTime: 1.2,
        satisfactionScore: 4.6,
        conversionRate: 0.35,
        permissions: ['view_conversations', 'manage_conversations', 'edit_knowledge', 'view_analytics'],
        joinDate: '2024-01-15',
        lastActive: new Date(),
        currentChats: 3,
        maxChats: 5,
        workingHours: '09:00-18:00',
        timezone: 'Asia/Shanghai'
      }, {
        id: 'agent_002',
        name: '李华',
        email: 'lihua@aitaiji.com',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=li',
        status: 'busy',
        specialty: '商务合作',
        department: '商务部',
        language: ['zh', 'en', 'ja'],
        rating: 4.9,
        totalChats: 980,
        avgResponseTime: 1.0,
        satisfactionScore: 4.8,
        conversionRate: 0.42,
        permissions: ['view_conversations', 'manage_conversations', 'view_analytics'],
        joinDate: '2024-02-20',
        lastActive: new Date(),
        currentChats: 5,
        maxChats: 5,
        workingHours: '09:00-18:00',
        timezone: 'Asia/Shanghai'
      }, {
        id: 'agent_003',
        name: '王芳',
        email: 'wangfang@aitaiji.com',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=wang',
        status: 'offline',
        specialty: '售后服务',
        department: '客服部',
        language: ['zh'],
        rating: 4.7,
        totalChats: 1560,
        avgResponseTime: 1.5,
        satisfactionScore: 4.5,
        conversionRate: 0.28,
        permissions: ['view_conversations', 'manage_conversations', 'edit_knowledge'],
        joinDate: '2023-11-10',
        lastActive: new Date(Date.now() - 3600000),
        currentChats: 0,
        maxChats: 5,
        workingHours: '08:00-20:00',
        timezone: 'Asia/Shanghai'
      }, {
        id: 'agent_004',
        name: 'John Smith',
        email: 'johnsmith@aitaiji.com',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john',
        status: 'online',
        specialty: 'International Support',
        department: '国际部',
        language: ['en', 'es', 'fr'],
        rating: 4.6,
        totalChats: 750,
        avgResponseTime: 1.8,
        satisfactionScore: 4.4,
        conversionRate: 0.31,
        permissions: ['view_conversations', 'manage_conversations'],
        joinDate: '2024-03-01',
        lastActive: new Date(),
        currentChats: 2,
        maxChats: 4,
        workingHours: '14:00-22:00',
        timezone: 'Europe/London'
      }];
      setAgents(mockAgents);
    } catch (error) {
      console.error('加载客服人员失败:', error);
    } finally {
      setIsLoading(false);
    }
  };
  const loadConversations = async () => {
    try {
      // 模拟对话数据
      const mockConversations = [{
        id: 'conv_001',
        conversationId: 'conv_20250121_001',
        userId: 'user_12345',
        userName: '李先生',
        userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user1',
        agentId: 'agent_001',
        agentName: '张明',
        status: 'active',
        priority: 'medium',
        intent: 'product_inquiry',
        emotion: 'neutral',
        startTime: new Date(Date.now() - 1800000),
        lastMessage: '我想了解一下AI太极SOS Ring的技术参数',
        messageCount: 8,
        satisfactionScore: null,
        language: 'zh',
        region: 'cn',
        source: 'web',
        tags: ['产品咨询', '技术问题'],
        aiHandled: true,
        transferRequested: false
      }, {
        id: 'conv_002',
        conversationId: 'conv_20250121_002',
        userId: 'user_67890',
        userName: 'Sarah Johnson',
        userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user2',
        agentId: null,
        agentName: 'AI Assistant',
        status: 'waiting',
        priority: 'high',
        intent: 'complaint',
        emotion: 'frustrated',
        startTime: new Date(Date.now() - 900000),
        lastMessage: 'The battery life is too short, I\'m not satisfied',
        messageCount: 5,
        satisfactionScore: 2,
        language: 'en',
        region: 'us',
        source: 'widget',
        tags: ['投诉', '电池问题'],
        aiHandled: true,
        transferRequested: true
      }, {
        id: 'conv_003',
        conversationId: 'conv_20250121_003',
        userId: 'user_11111',
        userName: '田中太郎',
        userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user3',
        agentId: 'agent_002',
        agentName: '李华',
        status: 'completed',
        priority: 'low',
        intent: 'partner_inquiry',
        emotion: 'positive',
        startTime: new Date(Date.now() - 3600000),
        endTime: new Date(Date.now() - 600000),
        lastMessage: 'Thank you for the detailed partnership information',
        messageCount: 12,
        satisfactionScore: 5,
        language: 'ja',
        region: 'jp',
        source: 'web',
        tags: ['合作', '批发'],
        aiHandled: false,
        transferRequested: false
      }];
      setConversations(mockConversations);
    } catch (error) {
      console.error('加载对话数据失败:', error);
    }
  };
  const loadPerformanceData = async () => {
    try {
      // 模拟绩效数据
      const mockPerformance = [{
        agentId: 'agent_001',
        agentName: '张明',
        date: '2025-01-21',
        totalChats: 45,
        avgResponseTime: 1.2,
        satisfactionScore: 4.6,
        conversionRate: 0.35,
        resolvedChats: 42,
        escalatedChats: 3,
        workingHours: 8,
        productivity: 5.6
      }, {
        agentId: 'agent_002',
        agentName: '李华',
        date: '2025-01-21',
        totalChats: 38,
        avgResponseTime: 1.0,
        satisfactionScore: 4.8,
        conversionRate: 0.42,
        resolvedChats: 36,
        escalatedChats: 2,
        workingHours: 8,
        productivity: 4.8
      }, {
        agentId: 'agent_003',
        agentName: '王芳',
        date: '2025-01-21',
        totalChats: 52,
        avgResponseTime: 1.5,
        satisfactionScore: 4.5,
        conversionRate: 0.28,
        resolvedChats: 48,
        escalatedChats: 4,
        workingHours: 10,
        productivity: 5.2
      }];
      setPerformanceData(mockPerformance);
    } catch (error) {
      console.error('加载绩效数据失败:', error);
    }
  };
  const loadKnowledgeBase = async () => {
    try {
      // 模拟知识库数据
      const mockKnowledge = [{
        id: 'kb_001',
        title: 'AI太极SOS Ring产品概述',
        category: 'product',
        subcategory: 'overview',
        language: 'zh',
        content: 'AI太极SOS Ring是一款融合传统太极养生理念与现代AI技术的智能健康监测戒指...',
        author: 'product_team',
        status: 'published',
        usageCount: 156,
        effectivenessScore: 0.92,
        lastUpdated: new Date(),
        tags: ['产品介绍', '核心功能'],
        translations: {
          'en': 'AI Taiji SOS Ring Product Overview...',
          'ja': 'AI太極SOSリング製品概要...'
        }
      }, {
        id: 'kb_002',
        title: 'SOS紧急求救功能使用指南',
        category: 'technical',
        subcategory: 'user_guide',
        language: 'zh',
        content: 'SOS功能使用方法：1）手动触发：长按戒指侧边按钮3秒...',
        author: 'tech_writer',
        status: 'published',
        usageCount: 98,
        effectivenessScore: 0.88,
        lastUpdated: new Date(),
        tags: ['SOS功能', '使用方法'],
        translations: {
          'en': 'SOS Emergency Function User Guide...',
          'ja': 'SOS緊急救助機能使用ガイド...'
        }
      }];
      setKnowledgeBase(mockKnowledge);
    } catch (error) {
      console.error('加载知识库失败:', error);
    }
  };
  const loadLanguageTemplates = async () => {
    try {
      // 模拟多语言模板数据
      const mockTemplates = [{
        id: 'template_001',
        name: '欢迎消息',
        type: 'welcome',
        language: 'zh',
        region: 'cn',
        content: '您好！我是AI太极SOS Ring智能健康顾问，很高兴为您服务。请问有什么可以帮助您的吗？',
        variables: ['user_name', 'time'],
        status: 'active',
        usageCount: 450,
        lastUsed: new Date(),
        author: 'content_team'
      }, {
        id: 'template_002',
        name: 'Welcome Message',
        type: 'welcome',
        language: 'en',
        region: 'us',
        content: 'Hello! I\'m the AI Taiji SOS Ring intelligent health advisor. How can I assist you today?',
        variables: ['user_name', 'time'],
        status: 'active',
        usageCount: 320,
        lastUsed: new Date(),
        author: 'content_team'
      }, {
        id: 'template_003',
        name: '转接通知',
        type: 'transfer',
        language: 'zh',
        region: 'cn',
        content: '正在为您转接给专业客服人员{agent_name}，请稍候...',
        variables: ['agent_name', 'department'],
        status: 'active',
        usageCount: 180,
        lastUsed: new Date(),
        author: 'content_team'
      }];
      setLanguageTemplates(mockTemplates);
    } catch (error) {
      console.error('加载语言模板失败:', error);
    }
  };
  const handleAddAgent = () => {
    setSelectedAgent(null);
    setShowAgentModal(true);
  };
  const handleEditAgent = agent => {
    setSelectedAgent(agent);
    setShowAgentModal(true);
  };
  const handleSaveAgent = async agentData => {
    try {
      if (selectedAgent) {
        // 更新现有客服
        console.log('更新客服:', agentData);
      } else {
        // 添加新客服
        console.log('添加客服:', agentData);
      }
      setShowAgentModal(false);
      loadAgents();
    } catch (error) {
      console.error('保存客服失败:', error);
    }
  };
  const handleDeleteAgent = async agentId => {
    if (confirm('确定要删除这个客服人员吗？')) {
      try {
        console.log('删除客服:', agentId);
        loadAgents();
      } catch (error) {
        console.error('删除客服失败:', error);
      }
    }
  };
  const handleTransferConversation = async (conversationId, agentId) => {
    try {
      console.log('转接对话:', conversationId, '到客服:', agentId);
      setShowTransferModal(false);
      loadConversations();
    } catch (error) {
      console.error('转接失败:', error);
    }
  };
  const handleTakeOverConversation = async conversationId => {
    try {
      console.log('接管对话:', conversationId);
      loadConversations();
    } catch (error) {
      console.error('接管失败:', error);
    }
  };
  const getStatusColor = status => {
    const colors = {
      'online': 'text-green-500',
      'busy': 'text-red-500',
      'offline': 'text-gray-500',
      'away': 'text-yellow-500'
    };
    return colors[status] || 'text-gray-500';
  };
  const getStatusText = status => {
    const texts = {
      'online': '在线',
      'busy': '忙碌',
      'offline': '离线',
      'away': '离开'
    };
    return texts[status] || '未知';
  };
  const getPriorityColor = priority => {
    const colors = {
      'high': 'text-red-500',
      'medium': 'text-yellow-500',
      'low': 'text-green-500'
    };
    return colors[priority] || 'text-gray-500';
  };
  const getConversationStatusColor = status => {
    const colors = {
      'active': 'text-blue-500',
      'waiting': 'text-yellow-500',
      'completed': 'text-green-500',
      'transferred': 'text-purple-500'
    };
    return colors[status] || 'text-gray-500';
  };
  const formatTime = date => {
    return date.toLocaleTimeString('zh-CN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  const formatDate = date => {
    return date.toLocaleDateString('zh-CN');
  };
  const calculateWorkingHours = agent => {
    const [start, end] = agent.workingHours.split('-');
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    const [startHour, startMin] = start.split(':').map(Number);
    const [endHour, endMin] = end.split(':').map(Number);
    const startTime = startHour * 60 + startMin;
    const endTime = endHour * 60 + endMin;
    return currentTime >= startTime && currentTime <= endTime;
  };
  return <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-yellow-500 mb-2">客服管理中心</h1>
            <p className="text-gray-400">管理客服团队、监控对话会话、分析绩效数据</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button onClick={() => loadAgents()} variant="outline" className="border-gray-700 text-gray-400">
              <RefreshCw className="w-4 h-4 mr-2" />
              刷新数据
            </Button>
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">
              <Download className="w-4 h-4 mr-2" />
              导出报表
            </Button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-8 bg-gray-900 rounded-lg p-1 border border-gray-800">
          {[{
          id: 'agents',
          label: '客服管理',
          icon: Users
        }, {
          id: 'conversations',
          label: '对话监控',
          icon: MessageCircle
        }, {
          id: 'performance',
          label: '绩效统计',
          icon: BarChart3
        }, {
          id: 'knowledge',
          label: '知识库',
          icon: Database
        }, {
          id: 'languages',
          label: '多语言',
          icon: Languages
        }, {
          id: 'settings',
          label: '系统设置',
          icon: Settings
        }].map(tab => <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${activeTab === tab.id ? 'bg-yellow-500 text-black' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}>
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>)}
        </div>

        {/* Tab Content */}
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
          {activeTab === 'agents' && <div className="space-y-6">
              {/* 客服管理头部 */}
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-white">客服人员管理</h3>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="搜索客服..." className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400" />
                  </div>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-32 bg-gray-800 border-gray-700">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">全部状态</SelectItem>
                      <SelectItem value="online">在线</SelectItem>
                      <SelectItem value="busy">忙碌</SelectItem>
                      <SelectItem value="offline">离线</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button onClick={handleAddAgent} className="bg-yellow-500 hover:bg-yellow-600 text-black">
                    <UserPlus className="w-4 h-4 mr-2" />
                    添加客服
                  </Button>
                </div>
              </div>

              {/* 客服列表 */}
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-700">
                      <TableHead className="text-gray-300">客服信息</TableHead>
                      <TableHead className="text-gray-300">状态</TableHead>
                      <TableHead className="text-gray-300">专业领域</TableHead>
                      <TableHead className="text-gray-300">语言</TableHead>
                      <TableHead className="text-gray-300">评分</TableHead>
                      <TableHead className="text-gray-300">当前对话</TableHead>
                      <TableHead className="text-gray-300">满意度</TableHead>
                      <TableHead className="text-gray-300">转化率</TableHead>
                      <TableHead className="text-gray-300">操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {agents.map(agent => <TableRow key={agent.id} className="border-gray-700">
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <img src={agent.avatar} alt={agent.name} className="w-10 h-10 rounded-full" />
                            <div>
                              <div className="font-medium text-white">{agent.name}</div>
                              <div className="text-sm text-gray-400">{agent.email}</div>
                              <div className="text-xs text-gray-500">{agent.department}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <div className={`w-2 h-2 rounded-full ${agent.status === 'online' ? 'bg-green-500' : agent.status === 'busy' ? 'bg-red-500' : 'bg-gray-500'}`}></div>
                            <span className={`text-sm ${getStatusColor(agent.status)}`}>{getStatusText(agent.status)}</span>
                          </div>
                          <div className="text-xs text-gray-400">
                            {calculateWorkingHours(agent) ? '工作中' : '休息中'}
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm text-gray-300">{agent.specialty}</span>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {agent.language.map(lang => <span key={lang} className="px-2 py-1 bg-gray-800 text-xs rounded">
                                {languageOptions.find(opt => opt.value === lang)?.flag || lang}
                              </span>)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="text-sm text-white">{agent.rating}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm text-white">
                            {agent.currentChats}/{agent.maxChats}
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
                            <div className={`h-2 rounded-full ${agent.currentChats / agent.maxChats > 0.8 ? 'bg-red-500' : agent.currentChats / agent.maxChats > 0.5 ? 'bg-yellow-500' : 'bg-green-500'}`} style={{
                        width: `${agent.currentChats / agent.maxChats * 100}%`
                      }}></div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <ThumbsUp className="w-4 h-4 text-green-500" />
                            <span className="text-sm text-white">{agent.satisfactionScore}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm text-white">{(agent.conversionRate * 100).toFixed(1)}%</span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button onClick={() => handleEditAgent(agent)} variant="outline" size="sm" className="border-gray-700 text-gray-400">
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button onClick={() => handleDeleteAgent(agent.id)} variant="outline" size="sm" className="border-red-500 text-red-500">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>)}
                  </TableBody>
                </Table>
              </div>
            </div>}

          {activeTab === 'conversations' && <div className="space-y-6">
              {/* 对话监控头部 */}
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-white">实时对话监控</h3>
                <div className="flex items-center space-x-4">
                  <Select value={dateRange} onValueChange={setDateRange}>
                    <SelectTrigger className="w-32 bg-gray-800 border-gray-700">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1h">最近1小时</SelectItem>
                      <SelectItem value="24h">最近24小时</SelectItem>
                      <SelectItem value="7d">最近7天</SelectItem>
                      <SelectItem value="30d">最近30天</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" className="border-gray-700 text-gray-400">
                    <Filter className="w-4 h-4 mr-2" />
                    筛选
                  </Button>
                </div>
              </div>

              {/* 对话列表 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {conversations.map(conv => <div key={conv.id} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <img src={conv.userAvatar} alt={conv.userName} className="w-10 h-10 rounded-full" />
                        <div>
                          <div className="font-medium text-white">{conv.userName}</div>
                          <div className="text-sm text-gray-400">ID: {conv.userId}</div>
                          <div className="flex items-center space-x-2 text-xs text-gray-500">
                            <span>{conv.language.toUpperCase()}</span>
                            <span>•</span>
                            <span>{conv.region.toUpperCase()}</span>
                            <span>•</span>
                            <span>{conv.source}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className={`px-2 py-1 rounded text-xs ${getConversationStatusColor(conv.status)} bg-opacity-20`}>
                          {conv.status === 'active' ? '进行中' : conv.status === 'waiting' ? '等待中' : conv.status === 'completed' ? '已完成' : '已转接'}
                        </div>
                        <div className={`px-2 py-1 rounded text-xs ${getPriorityColor(conv.priority)} bg-opacity-20`}>
                          {conv.priority === 'high' ? '高' : conv.priority === 'medium' ? '中' : '低'}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 mb-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">意图:</span>
                        <span className="text-sm text-white">{conv.intent}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">情绪:</span>
                        <div className="flex items-center space-x-1">
                          <div className={`w-2 h-2 rounded-full ${conv.emotion === 'positive' ? 'bg-green-500' : conv.emotion === 'negative' ? 'bg-red-500' : 'bg-gray-500'}`}></div>
                          <span className="text-sm text-white">{conv.emotion}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">客服:</span>
                        <span className="text-sm text-white">{conv.agentName || 'AI Assistant'}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">消息数:</span>
                        <span className="text-sm text-white">{conv.messageCount}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">开始时间:</span>
                        <span className="text-sm text-white">{formatTime(conv.startTime)}</span>
                      </div>
                    </div>

                    <div className="mb-3">
                      <div className="text-sm text-gray-400 mb-1">最后消息:</div>
                      <div className="text-sm text-gray-300 line-clamp-2">{conv.lastMessage}</div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {conv.tags.map(tag => <span key={tag} className="px-2 py-1 bg-gray-700 text-xs rounded">
                          {tag}
                        </span>)}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {conv.aiHandled && <span className="px-2 py-1 bg-blue-500/20 text-blue-500 text-xs rounded">AI处理</span>}
                        {conv.transferRequested && <span className="px-2 py-1 bg-yellow-500/20 text-yellow-500 text-xs rounded">请求转接</span>}
                      </div>
                      <div className="flex items-center space-x-2">
                        {conv.status === 'waiting' && <Button onClick={() => handleTakeOverConversation(conv.id)} size="sm" className="bg-green-500 hover:bg-green-600 text-white">
                            <HeadphonesIcon className="w-4 h-4 mr-1" />
                            接管
                          </Button>}
                        {conv.status === 'active' && <Button onClick={() => {
                    setSelectedConversation(conv);
                    setShowTransferModal(true);
                  }} size="sm" variant="outline" className="border-gray-700 text-gray-400">
                            <ArrowRight className="w-4 h-4 mr-1" />
                            转接
                          </Button>}
                        <Button size="sm" variant="outline" className="border-gray-700 text-gray-400">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>)}
              </div>
            </div>}

          {activeTab === 'performance' && <div className="space-y-6">
              {/* 绩效统计头部 */}
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-white">绩效统计分析</h3>
                <div className="flex items-center space-x-4">
                  <Select value={dateRange} onValueChange={setDateRange}>
                    <SelectTrigger className="w-32 bg-gray-800 border-gray-700">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="today">今天</SelectItem>
                      <SelectItem value="7d">最近7天</SelectItem>
                      <SelectItem value="30d">最近30天</SelectItem>
                      <SelectItem value="90d">最近90天</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" className="border-gray-700 text-gray-400">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    生成报告
                  </Button>
                </div>
              </div>

              {/* 绩效概览卡片 */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <Users className="w-8 h-8 text-blue-500" />
                    <span className="text-sm text-green-500">+12%</span>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{agents.length}</div>
                  <div className="text-sm text-gray-400">客服总数</div>
                </div>
                
                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <MessageCircle className="w-8 h-8 text-green-500" />
                    <span className="text-sm text-green-500">+8%</span>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{performanceData.reduce((sum, p) => sum + p.totalChats, 0)}</div>
                  <div className="text-sm text-gray-400">总对话数</div>
                </div>
                
                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <ThumbsUp className="w-8 h-8 text-yellow-500" />
                    <span className="text-sm text-green-500">+5%</span>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{(performanceData.reduce((sum, p) => sum + p.satisfactionScore, 0) / performanceData.length).toFixed(1)}</div>
                  <div className="text-sm text-gray-400">平均满意度</div>
                </div>
                
                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <Target className="w-8 h-8 text-purple-500" />
                    <span className="text-sm text-green-500">+15%</span>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{(performanceData.reduce((sum, p) => sum + p.conversionRate, 0) / performanceData.length * 100).toFixed(1)}%</div>
                  <div className="text-sm text-gray-400">平均转化率</div>
                </div>
              </div>

              {/* 绩效详细表格 */}
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-700">
                      <TableHead className="text-gray-300">客服姓名</TableHead>
                      <TableHead className="text-gray-300">对话数</TableHead>
                      <TableHead className="text-gray-300">响应时间</TableHead>
                      <TableHead className="text-gray-300">满意度</TableHead>
                      <TableHead className="text-gray-300">转化率</TableHead>
                      <TableHead className="text-gray-300">解决率</TableHead>
                      <TableHead className="text-gray-300">升级率</TableHead>
                      <TableHead className="text-gray-300">工作效率</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {performanceData.map(perf => <TableRow key={perf.agentId} className="border-gray-700">
                        <TableCell className="text-white">{perf.agentName}</TableCell>
                        <TableCell className="text-white">{perf.totalChats}</TableCell>
                        <TableCell className="text-white">{perf.avgResponseTime}s</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="text-white">{perf.satisfactionScore}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-white">{(perf.conversionRate * 100).toFixed(1)}%</TableCell>
                        <TableCell className="text-white">{(perf.resolvedChats / perf.totalChats * 100).toFixed(1)}%</TableCell>
                        <TableCell className="text-white">{(perf.escalatedChats / perf.totalChats * 100).toFixed(1)}%</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Activity className="w-4 h-4 text-blue-500" />
                            <span className="text-white">{perf.productivity}</span>
                          </div>
                        </TableCell>
                      </TableRow>)}
                  </TableBody>
                </Table>
              </div>
            </div>}

          {activeTab === 'knowledge' && <div className="space-y-6">
              {/* 知识库管理头部 */}
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-white">知识库管理</h3>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <input type="text" placeholder="搜索知识库..." className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400" />
                  </div>
                  <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">
                    <Plus className="w-4 h-4 mr-2" />
                    添加知识
                  </Button>
                </div>
              </div>

              {/* 知识库列表 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {knowledgeBase.map(item => <div key={item.id} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-white mb-1">{item.title}</h4>
                        <div className="flex items-center space-x-2 text-sm text-gray-400">
                          <span>{item.category}</span>
                          <span>•</span>
                          <span>{item.subcategory}</span>
                          <span>•</span>
                          <span>{item.language.toUpperCase()}</span>
                        </div>
                      </div>
                      <div className={`px-2 py-1 rounded text-xs ${item.status === 'published' ? 'bg-green-500/20 text-green-500' : 'bg-gray-500/20 text-gray-500'}`}>
                        {item.status === 'published' ? '已发布' : '草稿'}
                      </div>
                    </div>

                    <div className="mb-3">
                      <div className="text-sm text-gray-300 line-clamp-3">{item.content}</div>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <span>使用: {item.usageCount}</span>
                        <span>有效性: {((item.effectivenessScore || 0) * 100).toFixed(0)}%</span>
                      </div>
                      <div className="text-sm text-gray-400">
                        {formatDate(item.lastUpdated)}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {item.tags.map(tag => <span key={tag} className="px-2 py-1 bg-gray-700 text-xs rounded">
                          {tag}
                        </span>)}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-400">
                        作者: {item.author}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline" className="border-gray-700 text-gray-400">
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="border-gray-700 text-gray-400">
                          <Copy className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="border-gray-700 text-gray-400">
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>)}
              </div>
            </div>}

          {activeTab === 'languages' && <div className="space-y-6">
              {/* 多语言管理头部 */}
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-white">多语言内容管理</h3>
                <div className="flex items-center space-x-4">
                  <Select value="zh" onValueChange={() => {}}>
                    <SelectTrigger className="w-32 bg-gray-800 border-gray-700">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {languageOptions.map(lang => <SelectItem key={lang.value} value={lang.value}>
                          <div className="flex items-center space-x-2">
                            <span>{lang.flag}</span>
                            <span>{lang.label}</span>
                          </div>
                        </SelectItem>)}
                    </SelectContent>
                  </Select>
                  <Button onClick={() => {
                setEditingTemplate(null);
                setShowTemplateModal(true);
              }} className="bg-yellow-500 hover:bg-yellow-600 text-black">
                    <Plus className="w-4 h-4 mr-2" />
                    添加模板
                  </Button>
                </div>
              </div>

              {/* 语言模板列表 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {languageTemplates.map(template => <div key={template.id} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-white mb-1">{template.name}</h4>
                        <div className="flex items-center space-x-2 text-sm text-gray-400">
                          <span>{template.type}</span>
                          <span>•</span>
                          <span>{languageOptions.find(lang => lang.value === template.language)?.flag} {template.language.toUpperCase()}</span>
                          <span>•</span>
                          <span>{template.region.toUpperCase()}</span>
                        </div>
                      </div>
                      <div className={`px-2 py-1 rounded text-xs ${template.status === 'active' ? 'bg-green-500/20 text-green-500' : 'bg-gray-500/20 text-gray-500'}`}>
                        {template.status === 'active' ? '活跃' : '停用'}
                      </div>
                    </div>

                    <div className="mb-3">
                      <div className="text-sm text-gray-300 line-clamp-2">{template.content}</div>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <span>使用: {template.usageCount}</span>
                        <span>变量: {template.variables?.length || 0}</span>
                      </div>
                      <div className="text-sm text-gray-400">
                        {formatDate(template.lastUsed)}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-400">
                        作者: {template.author}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button onClick={() => {
                    setEditingTemplate(template);
                    setShowTemplateModal(true);
                  }} size="sm" variant="outline" className="border-gray-700 text-gray-400">
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="border-gray-700 text-gray-400">
                          <Copy className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="border-gray-700 text-gray-400">
                          <Globe className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>)}
              </div>
            </div>}

          {activeTab === 'settings' && <div className="space-y-6">
              <h3 className="text-lg font-medium text-white mb-4">系统设置</h3>
              <div className="text-gray-400">
                系统设置功能正在开发中...
              </div>
            </div>}
        </div>
      </div>

      {/* 客服编辑模态框 */}
      {showAgentModal && <AgentModal agent={selectedAgent} onSave={handleSaveAgent} onCancel={() => setShowAgentModal(false)} />}

      {/* 转接模态框 */}
      {showTransferModal && <TransferModal conversation={selectedConversation} agents={agents.filter(agent => agent.status === 'online')} onTransfer={handleTransferConversation} onCancel={() => setShowTransferModal(false)} />}

      {/* 语言模板编辑模态框 */}
      {showTemplateModal && <LanguageTemplateModal template={editingTemplate} languages={languageOptions} onSave={() => {
      setShowTemplateModal(false);
      loadLanguageTemplates();
    }} onCancel={() => setShowTemplateModal(false)} />}
    </div>;
}