// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Textarea } from '@/components/ui';
// @ts-ignore;
import { BarChart3, Brain, MessageCircle, Users, TrendingUp, Settings, Database, FileText, Download, Upload, RefreshCw, Play, Pause, Square, CheckCircle, AlertCircle, X, Search, Filter, ChevronLeft, ChevronRight, Eye, Edit2, Trash2, Plus, Save, Zap, Shield, Globe, Clock, Target, Hash, Languages, Map, Code, Bot, Heart, Star } from 'lucide-react';

import { Navigation } from '@/components/Navigation';
import { AIModelCard } from '@/components/AIModelCard';
import { PromptEditor } from '@/components/PromptEditor';
export default function AIAdminDashboard(props) {
  const {
    $w
  } = props;
  const [activeTab, setActiveTab] = useState('overview');
  const [conversations, setConversations] = useState([]);
  const [analytics, setAnalytics] = useState({
    totalConversations: 0,
    averageResponseTime: 0,
    satisfactionScore: 0,
    conversionRate: 0,
    activeUsers: 0,
    topIntents: [],
    emotionDistribution: {},
    modelPerformance: {},
    dailyStats: []
  });
  const [prompts, setPrompts] = useState([]);
  const [knowledgeBase, setKnowledgeBase] = useState([]);
  const [models, setModels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const [showPromptEditor, setShowPromptEditor] = useState(false);
  const [selectedModel, setSelectedModel] = useState(null);
  const [showModelEditor, setShowModelEditor] = useState(false);

  // 加载数据
  useEffect(() => {
    loadDashboardData();
  }, [currentPage, filterStatus]);
  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      await Promise.all([loadConversations(), loadAnalytics(), loadPrompts(), loadKnowledgeBase(), loadModels()]);
    } catch (error) {
      console.error('加载数据失败:', error);
    } finally {
      setIsLoading(false);
    }
  };
  const loadConversations = async () => {
    try {
      if ($w) {
        const result = await $w.cloud.callDataSource({
          dataSourceName: 'ai_conversation_record',
          methodName: 'wedaGetRecordsV2',
          params: {
            filter: {
              where: filterStatus !== 'all' ? {
                status: {
                  $eq: filterStatus
                }
              } : {}
            },
            orderBy: [{
              created_at: 'desc'
            }],
            pageSize: 20,
            pageNumber: currentPage,
            getCount: true
          }
        });
        if (result && result.records) {
          setConversations(result.records);
          setTotalPages(Math.ceil((result.total || 0) / 20));
        }
      }
    } catch (error) {
      console.error('加载对话记录失败:', error);
    }
  };
  const loadAnalytics = async () => {
    try {
      if ($w) {
        // 模拟分析数据
        setAnalytics({
          totalConversations: 1250,
          averageResponseTime: 1.2,
          satisfactionScore: 4.5,
          conversionRate: 0.35,
          activeUsers: 89,
          topIntents: ['产品咨询', '合作询问', '技术问题', '售后服务'],
          emotionDistribution: {
            neutral: 45,
            positive: 35,
            concerned: 15,
            confused: 5
          },
          modelPerformance: {
            'gpt-4o': {
              accuracy: 0.92,
              speed: 1.1,
              cost: 0.05
            },
            'claude-3-opus': {
              accuracy: 0.89,
              speed: 1.3,
              cost: 0.04
            },
            'qwen-max': {
              accuracy: 0.87,
              speed: 0.9,
              cost: 0.03
            }
          },
          dailyStats: [{
            date: '2025-01-20',
            conversations: 45,
            satisfaction: 4.6
          }, {
            date: '2025-01-19',
            conversations: 52,
            satisfaction: 4.4
          }, {
            date: '2025-01-18',
            conversations: 38,
            satisfaction: 4.7
          }, {
            date: '2025-01-17',
            conversations: 41,
            satisfaction: 4.5
          }, {
            date: '2025-01-16',
            conversations: 48,
            satisfaction: 4.3
          }]
        });
      }
    } catch (error) {
      console.error('加载分析数据失败:', error);
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
              updated_at: 'desc'
            }],
            pageSize: 50
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
            pageSize: 100
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
  const loadModels = async () => {
    try {
      if ($w) {
        const result = await $w.cloud.callDataSource({
          dataSourceName: 'ai_model_config',
          methodName: 'wedaGetRecordsV2',
          params: {
            orderBy: [{
              updated_at: 'desc'
            }],
            pageSize: 20
          }
        });
        if (result && result.records) {
          setModels(result.records);
        }
      }
    } catch (error) {
      console.error('加载模型配置失败:', error);
    }
  };
  const handleSavePrompt = async promptData => {
    try {
      if ($w) {
        if (selectedPrompt) {
          // 更新现有Prompt
          await $w.cloud.callDataSource({
            dataSourceName: 'ai_prompt_templates',
            methodName: 'wedaUpdateV2',
            params: {
              data: {
                ...promptData,
                updated_at: new Date().toISOString()
              },
              filter: {
                where: {
                  _id: {
                    $eq: selectedPrompt._id
                  }
                }
              }
            }
          });
        } else {
          // 创建新Prompt
          await $w.cloud.callDataSource({
            dataSourceName: 'ai_prompt_templates',
            methodName: 'wedaCreateV2',
            params: {
              data: {
                ...promptData,
                created_at: new Date().toISOString()
              }
            }
          });
        }
        setShowPromptEditor(false);
        setSelectedPrompt(null);
        loadPrompts();
      }
    } catch (error) {
      console.error('保存Prompt失败:', error);
      alert('保存失败，请重试');
    }
  };
  const handleDeletePrompt = async id => {
    if (confirm('确定要删除这个Prompt模板吗？')) {
      try {
        if ($w) {
          await $w.cloud.callDataSource({
            dataSourceName: 'ai_prompt_templates',
            methodName: 'wedaDeleteV2',
            params: {
              filter: {
                where: {
                  _id: {
                    $eq: id
                  }
                }
              }
            }
          });
          loadPrompts();
        }
      } catch (error) {
        console.error('删除Prompt失败:', error);
        alert('删除失败，请重试');
      }
    }
  };
  const handleToggleModel = async (modelId, newStatus) => {
    try {
      if ($w) {
        await $w.cloud.callDataSource({
          dataSourceName: 'ai_model_config',
          methodName: 'wedaUpdateV2',
          params: {
            data: {
              status: newStatus,
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
      alert('操作失败，请重试');
    }
  };
  const handleDeleteModel = async id => {
    if (confirm('确定要删除这个AI模型配置吗？')) {
      try {
        if ($w) {
          await $w.cloud.callDataSource({
            dataSourceName: 'ai_model_config',
            methodName: 'wedaDeleteV2',
            params: {
              filter: {
                where: {
                  _id: {
                    $eq: id
                  }
                }
              }
            }
          });
          loadModels();
        }
      } catch (error) {
        console.error('删除模型失败:', error);
        alert('删除失败，请重试');
      }
    }
  };
  const formatDate = dateString => {
    return new Date(dateString).toLocaleString('zh-CN');
  };
  const getStatusColor = status => {
    const colors = {
      'active': 'text-green-500',
      'inactive': 'text-gray-500',
      'error': 'text-red-500',
      'testing': 'text-yellow-500'
    };
    return colors[status] || 'text-gray-500';
  };
  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = !searchTerm || conv.user_message?.toLowerCase().includes(searchTerm.toLowerCase()) || conv.ai_response?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });
  return <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-yellow-500 mb-2">AI客服管理后台</h1>
            <p className="text-gray-400">智能客服系统监控、配置和优化</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button onClick={loadDashboardData} variant="outline" className="border-gray-700 text-gray-400">
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
          label: '总览',
          icon: BarChart3
        }, {
          id: 'conversations',
          label: '对话记录',
          icon: MessageCircle
        }, {
          id: 'prompts',
          label: 'Prompt管理',
          icon: FileText
        }, {
          id: 'knowledge',
          label: '知识库',
          icon: Database
        }, {
          id: 'models',
          label: '模型配置',
          icon: Brain
        }, {
          id: 'analytics',
          label: '数据分析',
          icon: TrendingUp
        }].map(tab => <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${activeTab === tab.id ? 'bg-yellow-500 text-black' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}>
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>)}
        </div>

        {/* Tab Content */}
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
          {activeTab === 'overview' && <div className="space-y-6">
              {/* KPI Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <MessageCircle className="w-8 h-8 text-yellow-500" />
                    <span className="text-sm text-green-500">+12%</span>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{analytics.totalConversations}</div>
                  <div className="text-sm text-gray-400">总对话数</div>
                </div>
                
                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <Clock className="w-8 h-8 text-blue-500" />
                    <span className="text-sm text-green-500">-8%</span>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{analytics.averageResponseTime}s</div>
                  <div className="text-sm text-gray-400">平均响应时间</div>
                </div>
                
                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <Heart className="w-8 h-8 text-green-500" />
                    <span className="text-sm text-green-500">+5%</span>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{analytics.satisfactionScore}/5</div>
                  <div className="text-sm text-gray-400">满意度评分</div>
                </div>
                
                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <Target className="w-8 h-8 text-purple-500" />
                    <span className="text-sm text-green-500">+18%</span>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{(analytics.conversionRate * 100).toFixed(1)}%</div>
                  <div className="text-sm text-gray-400">转化率</div>
                </div>
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <h3 className="text-lg font-medium text-white mb-4">每日对话趋势</h3>
                  <div className="h-64 flex items-center justify-center text-gray-400">
                    <BarChart3 className="w-16 h-16" />
                    <span className="ml-2">图表组件待集成</span>
                  </div>
                </div>
                
                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <h3 className="text-lg font-medium text-white mb-4">情绪分布</h3>
                  <div className="space-y-3">
                    {Object.entries(analytics.emotionDistribution).map(([emotion, percentage]) => <div key={emotion} className="flex items-center justify-between">
                        <span className="text-gray-300">{emotion}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-32 bg-gray-700 rounded-full h-2">
                            <div className="bg-yellow-500 h-2 rounded-full" style={{
                        width: `${percentage}%`
                      }}></div>
                          </div>
                          <span className="text-sm text-gray-400">{percentage}%</span>
                        </div>
                      </div>)}
                  </div>
                </div>
              </div>

              {/* Top Intents */}
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h3 className="text-lg font-medium text-white mb-4">热门意图</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {analytics.topIntents.map((intent, index) => <div key={index} className="bg-gray-700 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-yellow-500 mb-1">#{index + 1}</div>
                      <div className="text-sm text-gray-300">{intent}</div>
                    </div>)}
                </div>
              </div>
            </div>}

          {activeTab === 'conversations' && <div className="space-y-6">
              {/* Filters */}
              <div className="flex items-center space-x-4">
                <div className="relative flex-1">
                  <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="搜索对话内容..." className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400" />
                </div>
                
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-40 bg-gray-800 border-gray-700">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">所有状态</SelectItem>
                    <SelectItem value="active">活跃</SelectItem>
                    <SelectItem value="completed">已完成</SelectItem>
                    <SelectItem value="error">错误</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Conversation List */}
              <div className="space-y-4">
                {isLoading ? <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500"></div>
                    <span className="ml-3 text-gray-400">加载中...</span>
                  </div> : filteredConversations.length === 0 ? <div className="text-center py-12">
                    <MessageCircle className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <h4 className="text-lg font-medium text-gray-400 mb-2">暂无对话记录</h4>
                    <p className="text-gray-500">还没有用户与AI客服进行对话</p>
                  </div> : filteredConversations.map(conv => <div key={conv._id} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-sm text-gray-400">{formatDate(conv.created_at)}</span>
                          <span className={`text-sm ${getStatusColor(conv.status)}`}>{conv.status}</span>
                          <span className="text-sm text-gray-400">模型: {conv.model}</span>
                        </div>
                        <div className="mb-2">
                          <div className="text-sm text-blue-400 mb-1">用户:</div>
                          <div className="text-gray-300 line-clamp-2">{conv.user_message}</div>
                        </div>
                        <div>
                          <div className="text-sm text-yellow-400 mb-1">AI:</div>
                          <div className="text-gray-300 line-clamp-2">{conv.ai_response}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <Button variant="outline" size="sm" className="border-gray-700 text-gray-400">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="border-gray-700 text-gray-400">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    {conv.intent && <div className="flex items-center space-x-4 text-sm text-gray-400 pt-3 border-t border-gray-700">
                        <span>意图: {conv.intent}</span>
                        <span>情绪: {conv.emotion}</span>
                        <span>置信度: {(conv.confidence * 100).toFixed(1)}%</span>
                        <span>响应时间: {conv.response_time}s</span>
                      </div>}
                  </div>)}
              </div>

              {/* Pagination */}
              {totalPages > 1 && <div className="flex items-center justify-center space-x-2">
                  <Button onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} disabled={currentPage === 1} variant="outline" className="border-gray-700 text-gray-400">
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  
                  {[...Array(totalPages)].map((_, index) => <Button key={index + 1} onClick={() => setCurrentPage(index + 1)} variant={currentPage === index + 1 ? "default" : "outline"} className={currentPage === index + 1 ? "bg-yellow-500 text-black" : "border-gray-700 text-gray-400"}>
                      {index + 1}
                    </Button>)}
                  
                  <Button onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages} variant="outline" className="border-gray-700 text-gray-400">
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>}
            </div>}

          {activeTab === 'prompts' && <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-white">Prompt模板管理</h3>
                <Button onClick={() => {
              setSelectedPrompt(null);
              setShowPromptEditor(true);
            }} className="bg-yellow-500 hover:bg-yellow-600 text-black">
                  <Plus className="w-4 h-4 mr-2" />
                  新建Prompt
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {prompts.map(prompt => <div key={prompt._id} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-white mb-1">{prompt.name}</h4>
                        <p className="text-sm text-gray-400 mb-2">{prompt.description}</p>
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <span>模块: {prompt.module}</span>
                          <span>•</span>
                          <span>版本: {prompt.version}</span>
                        </div>
                      </div>
                      <div className={`w-3 h-3 rounded-full ${prompt.enabled ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className={`text-xs px-2 py-1 rounded ${prompt.enabled ? 'bg-green-500/20 text-green-500' : 'bg-gray-500/20 text-gray-500'}`}>
                          {prompt.enabled ? '已启用' : '已禁用'}
                        </span>
                        <span className="text-xs text-gray-400">使用次数: {prompt.usage_count || 0}</span>
                      </div>
                      
                      <div className="flex items-center space-x-1">
                        <Button onClick={() => {
                    setSelectedPrompt(prompt);
                    setShowPromptEditor(true);
                  }} variant="outline" size="sm" className="border-gray-700 text-gray-400">
                          <Edit2 className="w-3 h-3" />
                        </Button>
                        <Button onClick={() => handleDeletePrompt(prompt._id)} variant="outline" size="sm" className="border-red-500 text-red-500">
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>)}
              </div>
            </div>}

          {activeTab === 'knowledge' && <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-white">知识库管理</h3>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" className="border-gray-700 text-gray-400">
                    <Upload className="w-4 h-4 mr-2" />
                    批量导入
                  </Button>
                  <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">
                    <Plus className="w-4 h-4 mr-2" />
                    添加知识
                  </Button>
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">标题</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">分类</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">类型</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">更新时间</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">操作</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {knowledgeBase.map(item => <tr key={item._id}>
                        <td className="px-4 py-3 text-sm text-white">{item.title}</td>
                        <td className="px-4 py-3 text-sm text-gray-300">{item.category}</td>
                        <td className="px-4 py-3 text-sm text-gray-300">{item.type}</td>
                        <td className="px-4 py-3 text-sm text-gray-300">{formatDate(item.updated_at)}</td>
                        <td className="px-4 py-3 text-sm">
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm" className="border-gray-700 text-gray-400">
                              <Edit2 className="w-3 h-3" />
                            </Button>
                            <Button variant="outline" size="sm" className="border-gray-700 text-gray-400">
                              <Eye className="w-3 h-3" />
                            </Button>
                          </div>
                        </td>
                      </tr>)}
                  </tbody>
                </table>
              </div>
            </div>}

          {activeTab === 'models' && <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-white">AI模型配置</h3>
                <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">
                  <Plus className="w-4 h-4 mr-2" />
                  添加模型
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {models.map(model => <AIModelCard key={model._id} model={model} onEdit={model => {
              setSelectedModel(model);
              setShowModelEditor(true);
            }} onDelete={handleDeleteModel} onToggle={handleToggleModel} $w={$w} />)}
              </div>
            </div>}

          {activeTab === 'analytics' && <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-white">数据分析</h3>
                <div className="flex items-center space-x-2">
                  <Select defaultValue="7d">
                    <SelectTrigger className="w-32 bg-gray-800 border-gray-700">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="24h">24小时</SelectItem>
                      <SelectItem value="7d">7天</SelectItem>
                      <SelectItem value="30d">30天</SelectItem>
                      <SelectItem value="90d">90天</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" className="border-gray-700 text-gray-400">
                    <Download className="w-4 h-4 mr-2" />
                    导出数据
                  </Button>
                </div>
              </div>

              {/* Performance Charts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <h3 className="text-lg font-medium text-white mb-4">模型性能对比</h3>
                  <div className="space-y-4">
                    {Object.entries(analytics.modelPerformance).map(([model, performance]) => <div key={model} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                        <div>
                          <div className="font-medium text-white">{model}</div>
                          <div className="text-sm text-gray-400">准确率: {(performance.accuracy * 100).toFixed(1)}%</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-blue-500">{performance.speed}s</div>
                          <div className="text-sm text-yellow-500">${performance.cost}/调用</div>
                        </div>
                      </div>)}
                  </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <h3 className="text-lg font-medium text-white mb-4">用户满意度趋势</h3>
                  <div className="h-64 flex items-center justify-center text-gray-400">
                    <TrendingUp className="w-16 h-16" />
                    <span className="ml-2">图表组件待集成</span>
                  </div>
                </div>
              </div>

              {/* Detailed Stats */}
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h3 className="text-lg font-medium text-white mb-4">详细统计</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-300 mb-3">对话质量</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-400">平均对话长度</span>
                        <span className="text-sm text-white">8.5 消息</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-400">解决率</span>
                        <span className="text-sm text-green-500">87.3%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-400">转人工率</span>
                        <span className="text-sm text-yellow-500">12.7%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-300 mb-3">用户行为</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-400">平均会话时长</span>
                        <span className="text-sm text-white">4m 32s</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-400">回访率</span>
                        <span className="text-sm text-blue-500">23.5%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-400">反馈率</span>
                        <span className="text-sm text-purple-500">8.9%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-300 mb-3">系统性能</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-400">API调用成功率</span>
                        <span className="text-sm text-green-500">99.2%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-400">平均延迟</span>
                        <span className="text-sm text-white">1.2s</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-400">错误率</span>
                        <span className="text-sm text-red-500">0.8%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>}
        </div>
      </div>

      {/* Prompt Editor Modal */}
      {showPromptEditor && <PromptEditor prompt={selectedPrompt} onSave={handleSavePrompt} onCancel={() => {
      setShowPromptEditor(false);
      setSelectedPrompt(null);
    }} $w={$w} />}
    </div>;
}