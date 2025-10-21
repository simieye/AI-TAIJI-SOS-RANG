
// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Textarea, Switch, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui';
// @ts-ignore;
import { Bot, MessageCircle, Users, BarChart3, Database, Settings, TrendingUp, Activity, Zap, Brain, Heart, AlertCircle, CheckCircle, XCircle, Clock, Globe, Languages, FileText, Download, Upload, RefreshCw, Search, Filter, Plus, Edit2, Trash2, Eye, Copy, Share2, Bell, Target, Award, Calendar, MapPin, Tag, Cpu, Wifi, Battery, ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

import { Navigation } from '@/components/Navigation';
// 统计卡片组件
function StatsCard({
  title,
  value,
  change,
  changeType,
  icon,
  color
}) {
  return <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-full ${color} bg-opacity-20`}>
          <div className={color}>
            {icon}
          </div>
        </div>
        <div className={`text-sm font-medium ${changeType === 'positive' ? 'text-green-500' : changeType === 'negative' ? 'text-red-500' : 'text-gray-500'}`}>
          {changeType === 'positive' && '+'}
          {change}
        </div>
      </div>
      <div className="text-2xl font-bold text-white mb-1">{value}</div>
      <div className="text-sm text-gray-400">{title}</div>
    </div>;
}

// AI模型卡片组件
function AIModelCard({
  model,
  onEdit,
  onDelete,
  onToggle
}) {
  const getStatusColor = (status) => {
    const colors = {
      'active': 'text-green-500',
      'inactive': 'text-gray-500',
      'error': 'text-red-500',
      'maintenance': 'text-yellow-500'
    };
    return colors[status] || 'text-gray-500';
  };

  const getStatusText = (status) => {
    const texts = {
      'active': '运行中',
      'inactive': '已停用',
      'error': '错误',
      'maintenance': '维护中'
    };
    return texts[status] || '未知';
  };

  return <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-yellow-500 bg-opacity-20 flex items-center justify-center">
            <Bot className="w-5 h-5 text-yellow-500" />
          </div>
          <div>
            <h4 className="font-medium text-white">{model.name}</h4>
            <div className="text-sm text-gray-400">{model.provider}</div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`text-sm ${getStatusColor(model.status)}`}>
            {getStatusText(model.status)}
          </div>
          <Switch checked={model.status === 'active'} onCheckedChange={() => onToggle(model.id)} />
        </div>
      </div>

      <div className="space-y-2 mb-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">API调用</span>
          <span className="text-white">{model.apiCalls || 0}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">成功率</span>
          <span className="text-white">{(model.successRate || 0).toFixed(1)}%</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">平均响应时间</span>
          <span className="text-white">{(model.avgResponseTime || 0).toFixed(2)}s</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">成本</span>
          <span className="text-white">${(model.cost || 0).toFixed(4)}</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-xs text-gray-400">
          更新时间: {model.lastUpdated ? new Date(model.lastUpdated).toLocaleString('zh-CN') : '未知'}
        </div>
        <div className="flex items-center space-x-2">
          <Button onClick={() => onEdit(model)} variant="outline" size="sm" className="border-gray-700 text-gray-400">
            <Edit2 className="w-4 h-4" />
          </Button>
          <Button onClick={() => onDelete(model.id)} variant="outline" size="sm" className="border-red-500 text-red-500">
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>;
}

// 对话记录组件
function ConversationRecord({
  conversation,
  onView,
  onDelete
}) {
  const getEmotionColor = (emotion) => {
    const colors = {
      'positive': 'text-green-500',
      'negative': 'text-red-500',
      'neutral': 'text-gray-500',
      'concerned': 'text-yellow-500',
      'confused': 'text-blue-500'
    };
    return colors[emotion] || 'text-gray-500';
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleString('zh-CN');
  };

  return <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-sm font-medium text-white">{conversation.user_id}</span>
            <span className="text-xs text-gray-400">•</span>
            <span className="text-xs text-gray-400">{formatTime(conversation.created_at)}</span>
            <span className="text-xs text-gray-400">•</span>
            <span className="text-xs text-gray-400">{conversation.language}</span>
          </div>
          
          <div className="text-sm text-gray-300 mb-2 line-clamp-2">
            {conversation.user_message || conversation.ai_response}
          </div>
          
          <div className="flex items-center space-x-4 text-xs text-gray-400">
            <span>意图: {conversation.intent}</span>
            <span>情绪: <span className={getEmotionColor(conversation.emotion)}>{conversation.emotion}</span></span>
            <span>模型: {conversation.model_used}</span>
            <span>置信度: {(conversation.confidence || 0).toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {conversation.feedback && conversation.feedback.helpful && <CheckCircle className="w-4 h-4 text-green-500" />}
          {conversation.feedback && !conversation.feedback.helpful && <XCircle className="w-4 h-4 text-red-500" />}
        </div>
        <div className="flex items-center space-x-2">
          <Button onClick={() => onView(conversation)} variant="outline" size="sm" className="border-gray-700 text-gray-400">
            <Eye className="w-4 h-4" />
          </Button>
          <Button onClick={() => onDelete(conversation._id)} variant="outline" size="sm" className="border-red-500 text-red-500">
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>;
}
export default function AIAdminDashboard(props) {
  const {
    $w
  } = props;
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState('7d');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // 数据状态
  const [stats, setStats] = useState({
    totalConversations: 0,
    activeUsers: 0,
    avgResponseTime: 0,
    satisfactionScore: 0,
    knowledgeBaseUsage: 0,
    emotionDistribution: {},
    modelUsage: {},
    costAnalysis: {}
  });
  const [models, setModels] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [emotions, setEmotions] = useState([]);
  const [knowledgeBase, setKnowledgeBase] = useState([]);

  // 加载统计数据
  const loadStats = async () => {
    try {
      if ($w) {
        // 加载对话记录统计
        const conversationResult = await $w.cloud.callDataSource({
          dataSourceName: 'ai_conversation_record',
          methodName: 'wedaGetRecordsV2',
          params: {
            orderBy: [{
              created_at: 'desc'
            }],
            pageSize: 1000
          }
        });

        if (conversationResult && conversationResult.records) {
          const records = conversationResult.records;
          const totalConversations = records.length;
          const avgResponseTime = records.reduce((sum, r) => sum + (r.response_time || 0), 0) / records.length;
          const satisfactionScore = records.reduce((sum, r) => sum + (r.satisfaction_score || 0), 0) / records.filter(r => r.satisfaction_score).length;
          
          // 情绪分布统计
          const emotionDistribution = {};
          records.forEach(r => {
            if (r.emotion) {
              emotionDistribution[r.emotion] = (emotionDistribution[r.emotion] || 0) + 1;
            }
          });

          // 模型使用统计
          const modelUsage = {};
          records.forEach(r => {
            if (r.model_used) {
              modelUsage[r.model_used] = (modelUsage[r.model_used] || 0) + 1;
            }
          });

          setStats({
            totalConversations,
            activeUsers: new Set(records.map(r => r.user_id)).size,
            avgResponseTime: avgResponseTime.toFixed(2),
            satisfactionScore: satisfactionScore.toFixed(1),
            knowledgeBaseUsage: records.filter(r => r.tools_called && r.tools_called.includes('knowledge_retrieval')).length,
            emotionDistribution,
            modelUsage
          });
        }

        // 加载情绪分析数据
        const emotionResult = await $w.cloud.callDataSource({
          dataSourceName: 'ai_emotion_analysis',
          methodName: 'wedaGetRecordsV2',
          params: {
            orderBy: [{
              created_at: 'desc'
            }],
            pageSize: 100
          }
        });

        if (emotionResult && emotionResult.records) {
          setEmotions(emotionResult.records);
        }
      }
    } catch (error) {
      console.error('加载统计数据失败:', error);
    }
  };

  // 加载AI模型配置
  const loadModels = async () => {
    try {
      if ($w) {
        const result = await $w.cloud.callDataSource({
          dataSourceName: 'ai_model_config',
          methodName: 'wedaGetRecordsV2',
          params: {
            orderBy: [{
              created_at: 'desc'
            }],
            pageSize: 50
          }
        });

        if (result && result.records) {
          setModels(result.records);
        }
      }
    } catch (error) {
      console.error('加载AI模型配置失败:', error);
    }
  };

  // 加载对话记录
  const loadConversations = async () => {
    try {
      if ($w) {
        const result = await $w.cloud.callDataSource({
          dataSourceName: 'ai_conversation_record',
          methodName: 'wedaGetRecordsV2',
          params: {
            orderBy: [{
              created_at: 'desc'
            }],
            pageSize: 20,
            pageNumber: currentPage
          }
        });

        if (result && result.records) {
          setConversations(result.records);
          setTotalPages(Math.ceil(result.total / 20));
        }
      }
    } catch (error) {
      console.error('加载对话记录失败:', error);
    }
  };

  // 加载知识库
  const loadKnowledgeBase = async () => {
    try {
      if ($w) {
        const result = await $w.cloud.callDataSource({
          dataSourceName: 'ai_knowledge_base',
          methodName: 'wedaGetRecordsV2',
          params: {
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

  // 初始化数据
  useEffect(() => {
    loadStats();
    loadModels();
    loadConversations();
    loadKnowledgeBase();
  }, [currentPage, dateRange]);

  // 处理模型切换
  const handleToggleModel = async (modelId) => {
    try {
      const model = models.find(m => m.id === modelId);
      if (model) {
        await $w.cloud.callDataSource({
          dataSourceName: 'ai_model_config',
          methodName: 'wedaUpdateV2',
          params: {
            data: {
              status: model.status === 'active' ? 'inactive' : 'active',
              updated_at: new Date().toISOString()
            },
            filter: {
              where: {
                _id: {
                  $eq: modelId
                }
              }
            }
          }
        });
        loadModels();
      }
    } catch (error) {
      console.error('切换模型状态失败:', error);
    }
  };

  // 删除对话记录
  const handleDeleteConversation = async (conversationId) => {
    if (confirm('确定要删除这条对话记录吗？')) {
      try {
        await $w.cloud.callDataSource({
          dataSourceName: 'ai_conversation_record',
          methodName: 'wedaDeleteV2',
          params: {
            filter: {
              where: {
                _id: {
                  $eq: conversationId
                }
              }
            }
          }
        });
        loadConversations();
        loadStats();
      } catch (error) {
        console.error('删除对话记录失败:', error);
      }
    }
  };

  return <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-yellow-500 mb-2">AI管理控制台</h1>
            <p className="text-gray-400">监控AI系统状态、管理模型配置、分析对话数据</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button onClick={() => {
            loadStats();
            loadModels();
            loadConversations();
            loadKnowledgeBase();
          }} variant="outline" className="border-gray-700 text-gray-400">
              <RefreshCw className="w-4 h-4 mr-2" />
              刷新数据
            </Button>
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">
              <Download className="w-4 h-4 mr-2" />
              导出报告
            </Button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-8 bg-gray-900 rounded-lg p-1 border border-gray-800">
          {[{
          id: 'overview',
          label: '概览',
          icon: BarChart3
        }, {
          id: 'models',
          label: 'AI模型',
          icon: Bot
        }, {
          id: 'conversations',
          label: '对话记录',
          icon: MessageCircle
        }, {
          id: 'emotions',
          label: '情绪分析',
          icon: Heart
        }, {
          id: 'knowledge',
          label: '知识库',
          icon: Database
        }, {
          id: 'settings',
          label: '系统设置',
          icon: Settings
        }].map(tab => <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${activeTab === tab.id ? 'bg-yellow-500 text-black' : 'text-gray-400 hover:text-white hover:bg-gray-800'}>
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>)}
        </div>

        {/* Tab Content */}
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
          {activeTab === 'overview' && <div className="space-y-6">
              {/* 统计卡片 */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard title="总对话数" value={stats.totalConversations} change="+12%" changeType="positive" icon={<MessageCircle className="w-6 h-6" />} color="text-blue-500" />
                <StatsCard title="活跃用户" value={stats.activeUsers} change="+8%" changeType="positive" icon={<Users className="w-6 h-6" />} color="text-green-500" />
                <StatsCard title="平均响应时间" value={`${stats.avgResponseTime}s`} change="-15%" changeType="positive" icon={<Clock className="w-6 h-6" />} color="text-yellow-500" />
                <StatsCard title="满意度评分" value={stats.satisfactionScore} change="+5%" changeType="positive" icon={<TrendingUp className="w-6 h-6" />} color="text-purple-500" />
              </div>

              {/* 图表区域 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <h3 className="text-lg font-medium text-white mb-4">情绪分布</h3>
                  <div className="space-y-3">
                    {Object.entries(stats.emotionDistribution).map(([emotion, count]) => <div key={emotion} className="flex items-center justify-between">
                        <span className="text-sm text-gray-300">{emotion}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-32 bg-gray-700 rounded-full h-2">
                            <div className="bg-yellow-500 h-2 rounded-full" style={{
                        width: `${count / stats.totalConversations * 100}%`
                      }}></div>
                          </div>
                          <span className="text-sm text-white">{count}</span>
                        </div>
                      </div>)}
                  </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <h3 className="text-lg font-medium text-white mb-4">模型使用情况</h3>
                  <div className="space-y-3">
                    {Object.entries(stats.modelUsage).map(([model, count]) => <div key={model} className="flex items-center justify-between">
                        <span className="text-sm text-gray-300">{model}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-32 bg-gray-700 rounded-full h-2">
                            <div className="bg-blue-500 h-2 rounded-full" style={{
                        width: `${count / stats.totalConversations * 100}%`
                      }}></div>
                          </div>
                          <span className="text-sm text-white">{count}</span>
                        </div>
                      </div>)}
                  </div>
                </div>
              </div>
            </div>}

          {activeTab === 'models' && <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-white">AI模型管理</h3>
                <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">
                  <Plus className="w-4 h-4 mr-2" />
                  添加模型
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {models.map(model => <AIModelCard key={model.id} model={model} onEdit={(model) => console.log('Edit model:', model)} onDelete={(id) => console.log('Delete model:', id)} onToggle={handleToggleModel} />)}
              </div>
            </div>}

          {activeTab === 'conversations' && <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-white">对话记录</h3>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="搜索对话..." className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400" />
                  </div>
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
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {conversations.map(conversation => <ConversationRecord key={conversation._id} conversation={conversation} onView={(conv) => console.log('View conversation:', conv)} onDelete={handleDeleteConversation} />)}
              </div>

              {/* 分页 */}
              {totalPages > 1 && <div className="flex items-center justify-center space-x-2">
                  <Button onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))} disabled={currentPage === 1} variant="outline" className="border-gray-700 text-gray-400">
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <span className="text-sm text-gray-400">
                    第 {currentPage} 页，共 {totalPages} 页
                  </span>
                  <Button onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))} disabled={currentPage === totalPages} variant="outline" className="border-gray-700 text-gray-400">
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>}
            </div>}

          {activeTab === 'emotions' && <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-white">情绪分析</h3>
                <Button variant="outline" className="border-gray-700 text-gray-400">
                  <Download className="w-4 h-4 mr-2" />
                  导出数据
                </Button>
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-700">
                      <TableHead className="text-gray-300">时间</TableHead>
                      <TableHead className="text-gray-300">用户</TableHead>
                      <TableHead className="text-gray-300">情绪类型</TableHead>
                      <TableHead className="text-gray-300">强度</TableHead>
                      <TableHead className="text-gray-300">情感分数</TableHead>
                      <TableHead className="text-gray-300">关键词</TableHead>
                      <TableHead className="text-gray-300">风险等级</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {emotions.map(emotion => <TableRow key={emotion._id} className="border-gray-700">
                        <TableCell className="text-white">{new Date(emotion.created_at).toLocaleString('zh-CN')}</TableCell>
                        <TableCell className="text-white">{emotion.user_id}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded text-xs ${
                      emotion.emotion_type === 'positive' ? 'bg-green-500/20 text-green-500' :
                      emotion.emotion_type === 'negative' ? 'bg-red-500/20 text-red-500' :
                      'bg-gray-500/20 text-gray-500'
                    }`}>
                            {emotion.emotion_type}
                          </span>
                        </TableCell>
                        <TableCell className="text-white">{(emotion.emotion_intensity || 0).toFixed(2)}</TableCell>
                        <TableCell className="text-white">{(emotion.sentiment_score || 0).toFixed(2)}</TableCell>
                        <TableCell className="text-white">
                          <div className="flex flex-wrap gap-1">
                            {(emotion.keywords || []).slice(0, 3).map((keyword, index) => <span key={index} className="px-2 py-1 bg-gray-700 text-xs rounded">
                                {keyword}
                              </span>)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded text-xs ${
                      emotion.risk_level === 'high' ? 'bg-red-500/20 text-red-500' :
                      emotion.risk_level === 'medium' ? 'bg-yellow-500/20 text-yellow-500' :
                      'bg-green-500/20 text-green-500'
                    }`}>
                            {emotion.risk_level}
                          </span>
                        </TableCell>
                      </TableRow>)}
                  </TableBody>
                </Table>
              </div>
            </div>}

          {activeTab === 'knowledge' && <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-white">知识库管理</h3>
                <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">
                  <Plus className="w-4 h-4 mr-2" />
                  添加知识
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {knowledgeBase.map(item => <div key={item.knowledge_id} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-white mb-1">{item.title}</h4>
                        <div className="flex items-center space-x-2 text-sm text-gray-400">
                          <span>{item.category}</span>
                          <span>•</span>
                          <span>{item.subcategory}</span>
                          <span>•</span>
                          <span>{item.language}</span>
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
                        <span>使用: {item.usage_frequency || 0}</span>
                        <span>有效性: {((item.effectiveness_score || 0) * 100).toFixed(0)}%</span>
                      </div>
                      <div className="text-sm text-gray-400">
                        {new Date(item.last_updated).toLocaleDateString('zh-CN')}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-400">
                        作者: {item.author}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" className="border-gray-700 text-gray-400">
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="border-gray-700 text-gray-400">
                          <Copy className="w-4 h-4" />
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
    </div>;
}
