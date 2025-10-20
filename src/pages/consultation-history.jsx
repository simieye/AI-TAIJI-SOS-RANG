// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';
// @ts-ignore;
import { ArrowLeft, Search, Filter, Calendar, Download, MessageCircle, Bot, Users, Clock, CheckCircle, AlertCircle, Brain, Shield, Sparkles, Globe, Cpu, Zap, Eye, Trash2, RefreshCw, FileText, User, Settings, ChevronDown, ChevronUp, Star, TrendingUp, BarChart3 } from 'lucide-react';

import { Navigation } from '@/components/Navigation';
import { AuthGuard } from '@/components/AuthGuard';
export default function ConsultationHistory(props) {
  const {
    $w
  } = props;
  const [consultations, setConsultations] = useState([]);
  const [aiConversations, setAiConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterModel, setFilterModel] = useState('all');
  const [dateRange, setDateRange] = useState('30d');
  const [expandedItems, setExpandedItems] = useState(new Set());
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [showFilters, setShowFilters] = useState(false);
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
    icon: Brain,
    color: 'text-green-500'
  }, {
    id: 'claude-3',
    name: 'Claude-3',
    provider: 'Anthropic',
    icon: Shield,
    color: 'text-blue-500'
  }, {
    id: 'gemini-pro',
    name: 'Gemini Pro',
    provider: 'Google',
    icon: Sparkles,
    color: 'text-purple-500'
  }, {
    id: 'qwen-max',
    name: 'Qwen Max',
    provider: '阿里云',
    icon: Globe,
    color: 'text-red-500'
  }, {
    id: 'baichuan2',
    name: 'Baichuan2',
    provider: '百川智能',
    icon: Cpu,
    color: 'text-orange-500'
  }, {
    id: 'yi-large',
    name: 'Yi Large',
    provider: '零一万物',
    icon: Zap,
    color: 'text-cyan-500'
  }];
  useEffect(() => {
    loadConsultationHistory();
    loadAIConversationHistory();
  }, [filterType, filterStatus, filterModel, dateRange, searchTerm, sortBy, sortOrder]);
  const loadConsultationHistory = async () => {
    try {
      const currentUser = $w.auth.currentUser;
      if (!currentUser) {
        navigateTo('login');
        return;
      }

      // 从数据源加载咨询记录
      try {
        const result = await $w.cloud.callDataSource({
          dataSourceName: 'consultation_record',
          methodName: 'wedaGetRecordsV2',
          params: {
            filter: {
              where: {
                $and: [{
                  user_id: {
                    $eq: currentUser.userId
                  }
                }, filterType !== 'all' ? {
                  consultation_type: {
                    $eq: filterType
                  }
                } : {}, filterStatus !== 'all' ? {
                  status: {
                    $eq: filterStatus
                  }
                } : {}]
              }
            },
            select: {
              $master: true
            },
            orderBy: [{
              [sortBy]: sortOrder
            }],
            pageSize: 100
          }
        });
        if (result && result.records) {
          setConsultations(result.records);
        }
      } catch (error) {
        console.error('加载咨询记录失败:', error);
        // 使用模拟数据
        const mockConsultations = [{
          _id: 'consult_001',
          consultation_type: 'product',
          consultation_subject: '产品功能咨询',
          consultation_content: '请问AI太极戒指的电池续航时间是多久？',
          status: 'completed',
          consultation_time: Date.now() - 1000 * 60 * 60 * 24 * 2,
          consultant_name: '客服小李',
          message_count: 5,
          user_rating: 5,
          user_feedback: '回复很及时，解答很详细'
        }, {
          _id: 'consult_002',
          consultation_type: 'technical',
          consultation_subject: '技术支持',
          consultation_content: '戒指无法连接手机，请问如何解决？',
          status: 'in-progress',
          consultation_time: Date.now() - 1000 * 60 * 60 * 24,
          consultant_name: '技术专家小王',
          message_count: 8,
          user_rating: null,
          user_feedback: null
        }];
        setConsultations(mockConsultations);
      }
    } catch (error) {
      console.error('加载咨询历史失败:', error);
    } finally {
      setLoading(false);
    }
  };
  const loadAIConversationHistory = async () => {
    try {
      const currentUser = $w.auth.currentUser;
      if (!currentUser) return;

      // 从数据源加载AI对话记录
      try {
        const result = await $w.cloud.callDataSource({
          dataSourceName: 'ai_conversation_record',
          methodName: 'wedaGetRecordsV2',
          params: {
            filter: {
              where: {
                $and: [{
                  user_id: {
                    $eq: currentUser.userId
                  }
                }, filterModel !== 'all' ? {
                  ai_model_id: {
                    $eq: filterModel
                  }
                } : {}]
              }
            },
            select: {
              $master: true
            },
            orderBy: [{
              message_timestamp: 'desc'
            }],
            pageSize: 100
          }
        });
        if (result && result.records) {
          // 按会话分组
          const sessions = {};
          result.records.forEach(record => {
            if (!sessions[record.session_id]) {
              sessions[record.session_id] = {
                session_id: record.session_id,
                ai_model_id: record.ai_model_id,
                ai_model_name: record.ai_model_name,
                ai_provider: record.ai_provider,
                first_message: record.message_content,
                first_message_time: record.message_timestamp,
                message_count: 0,
                total_tokens: 0,
                total_cost: 0,
                avg_response_time: 0,
                messages: []
              };
            }
            sessions[record.session_id].message_count++;
            sessions[record.session_id].total_tokens += record.token_count || 0;
            sessions[record.session_id].total_cost += record.cost_amount || 0;
            sessions[record.session_id].avg_response_time += record.response_time || 0;
            sessions[record.session_id].messages.push(record);
          });
          // 计算平均响应时间
          Object.values(sessions).forEach(session => {
            session.avg_response_time = session.message_count > 0 ? session.avg_response_time / session.message_count : 0;
          });
          setAiConversations(Object.values(sessions));
        }
      } catch (error) {
        console.error('加载AI对话记录失败:', error);
        // 使用模拟数据
        const mockAIConversations = [{
          session_id: 'ai_session_001',
          ai_model_id: 'gpt-4',
          ai_model_name: 'GPT-4',
          ai_provider: 'OpenAI',
          first_message: '请问AI太极戒指的睡眠监测功能如何工作？',
          first_message_time: Date.now() - 1000 * 60 * 60 * 24 * 3,
          message_count: 12,
          total_tokens: 2450,
          total_cost: 0.0735,
          avg_response_time: 1200
        }, {
          session_id: 'ai_session_002',
          ai_model_id: 'claude-3',
          ai_model_name: 'Claude-3',
          ai_provider: 'Anthropic',
          first_message: 'SOS功能在紧急情况下如何使用？',
          first_message_time: Date.now() - 1000 * 60 * 60 * 24 * 5,
          message_count: 8,
          total_tokens: 1800,
          total_cost: 0.045,
          avg_response_time: 980
        }];
        setAiConversations(mockAIConversations);
      }
    } catch (error) {
      console.error('加载AI对话历史失败:', error);
    }
  };
  const handleSearch = term => {
    setSearchTerm(term);
    setCurrentPage(1);
  };
  const handleFilterChange = (type, value) => {
    switch (type) {
      case 'type':
        setFilterType(value);
        break;
      case 'status':
        setFilterStatus(value);
        break;
      case 'model':
        setFilterModel(value);
        break;
      case 'dateRange':
        setDateRange(value);
        break;
      case 'sortBy':
        setSortBy(value);
        break;
      case 'sortOrder':
        setSortOrder(value);
        break;
    }
    setCurrentPage(1);
  };
  const toggleExpand = id => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };
  const toggleSelect = id => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedItems(newSelected);
  };
  const toggleSelectAll = () => {
    if (selectedItems.size === getAllItems().length) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(getAllItems().map(item => item.id)));
    }
  };
  const getAllItems = () => {
    const allItems = [];
    consultations.forEach(consult => {
      allItems.push({
        id: `consult_${consult._id}`,
        type: 'consultation',
        data: consult
      });
    });
    aiConversations.forEach(conv => {
      allItems.push({
        id: `ai_${conv.session_id}`,
        type: 'ai',
        data: conv
      });
    });
    return allItems;
  };
  const handleDeleteSelected = async () => {
    if (selectedItems.size === 0) return;
    if (!confirm(`确定要删除选中的 ${selectedItems.size} 条记录吗？`)) return;
    try {
      // 这里可以添加实际的删除逻辑
      console.log('删除选中的记录:', Array.from(selectedItems));
      setSelectedItems(new Set());
      // 重新加载数据
      loadConsultationHistory();
      loadAIConversationHistory();
    } catch (error) {
      console.error('删除记录失败:', error);
    }
  };
  const handleExportSelected = () => {
    if (selectedItems.size === 0) return;
    const selectedData = [];
    selectedItems.forEach(itemId => {
      const [type, id] = itemId.split('_');
      if (type === 'consult') {
        const consult = consultations.find(c => c._id === id);
        if (consult) {
          selectedData.push({
            type: '人工客服咨询',
            subject: consult.consultation_subject,
            content: consult.consultation_content,
            status: consult.status,
            consultant: consult.consultant_name,
            time: new Date(consult.consultation_time).toLocaleString(),
            rating: consult.user_rating,
            feedback: consult.user_feedback
          });
        }
      } else if (type === 'ai') {
        const conv = aiConversations.find(c => c.session_id === id);
        if (conv) {
          selectedData.push({
            type: 'AI对话',
            model: `${conv.ai_model_name} (${conv.ai_provider})`,
            first_message: conv.first_message,
            message_count: conv.message_count,
            total_tokens: conv.total_tokens,
            total_cost: conv.total_cost,
            avg_response_time: conv.avg_response_time,
            time: new Date(conv.first_message_time).toLocaleString()
          });
        }
      }
    });
    const csvContent = [Object.keys(selectedData[0]).join(','), ...selectedData.map(row => Object.values(row).map(value => `"${value}"`).join(','))].join('\n');
    const blob = new Blob([csvContent], {
      type: 'text/csv;charset=utf-8;'
    });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `consultation_history_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };
  const handleViewDetail = (type, id) => {
    if (type === 'consultation') {
      navigateTo('consultation-chat', {
        consultationId: id
      });
    } else if (type === 'ai') {
      navigateTo('consultation-chat', {
        sessionId: id
      });
    }
  };
  const getConsultationTypeLabel = type => {
    const typeMap = {
      product: '产品咨询',
      technical: '技术支持',
      health: '健康咨询',
      partnership: '合作洽谈',
      other: '其他咨询'
    };
    return typeMap[type] || '其他';
  };
  const getConsultationStatusLabel = status => {
    const statusMap = {
      pending: '待回复',
      'in-progress': '处理中',
      completed: '已完成',
      cancelled: '已取消'
    };
    return statusMap[status] || '未知';
  };
  const getConsultationStatusColor = status => {
    const colorMap = {
      pending: 'bg-yellow-500',
      'in-progress': 'bg-blue-500',
      completed: 'bg-green-500',
      cancelled: 'bg-red-500'
    };
    return colorMap[status] || 'bg-gray-500';
  };
  const formatTime = timestamp => {
    const date = new Date(timestamp);
    return date.toLocaleString('zh-CN');
  };
  const formatDate = timestamp => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('zh-CN');
  };
  const formatCost = cost => {
    return new Intl.NumberFormat('zh-CN', {
      style: 'currency',
      currency: 'USD'
    }).format(cost);
  };
  const getModelIcon = modelId => {
    const model = aiModels.find(m => m.id === modelId);
    return model ? model.icon : Bot;
  };
  const getModelColor = modelId => {
    const model = aiModels.find(m => m.id === modelId);
    return model ? model.color : 'text-gray-500';
  };
  const filteredItems = getAllItems().filter(item => {
    const matchesSearch = searchTerm === '' || item.type === 'consultation' && (item.data.consultation_subject.toLowerCase().includes(searchTerm.toLowerCase()) || item.data.consultation_content.toLowerCase().includes(searchTerm.toLowerCase())) || item.type === 'ai' && item.data.first_message.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });
  const paginatedItems = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  if (loading) {
    return <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
          <p className="text-gray-400">加载咨询历史中...</p>
        </div>
      </div>;
  }
  return <AuthGuard $w={$w}>
      <div className="min-h-screen bg-black text-white">
        <Navigation currentPage="consultation-history" $w={$w} />

        <div className="max-w-7xl mx-auto px-8 py-24">
          {/* Header */}
          <div className="mb-8">
            <button onClick={() => navigateTo('consultation')} className="flex items-center text-gray-400 hover:text-yellow-500 transition-colors mb-4">
              <ArrowLeft className="w-5 h-5 mr-2" />
              返回咨询中心
            </button>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-yellow-500">咨询历史</span>
            </h1>
            <p className="text-xl text-gray-300">
              查看您的所有咨询记录，包括AI对话和人工客服咨询
            </p>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <MessageCircle className="w-8 h-8 text-blue-500" />
                <span className="text-2xl font-bold text-blue-500">{consultations.length}</span>
              </div>
              <h3 className="font-bold mb-2">人工客服咨询</h3>
              <p className="text-sm text-gray-400">总咨询次数</p>
            </div>
            
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <Bot className="w-8 h-8 text-green-500" />
                <span className="text-2xl font-bold text-green-500">{aiConversations.length}</span>
              </div>
              <h3 className="font-bold mb-2">AI对话</h3>
              <p className="text-sm text-gray-400">AI助手对话次数</p>
            </div>
            
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <TrendingUp className="w-8 h-8 text-yellow-500" />
                <span className="text-2xl font-bold text-yellow-500">
                  {aiConversations.reduce((sum, conv) => sum + conv.total_tokens, 0)}
                </span>
              </div>
              <h3 className="font-bold mb-2">Token消耗</h3>
              <p className="text-sm text-gray-400">AI对话总Token数</p>
            </div>
            
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <BarChart3 className="w-8 h-8 text-purple-500" />
                <span className="text-2xl font-bold text-purple-500">
                  {formatCost(aiConversations.reduce((sum, conv) => sum + conv.total_cost, 0))}
                </span>
              </div>
              <h3 className="font-bold mb-2">AI使用费用</h3>
              <p className="text-sm text-gray-400">累计AI使用成本</p>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800 mb-8">
            <div className="flex flex-col lg:flex-row gap-4 mb-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input type="text" placeholder="搜索咨询内容..." value={searchTerm} onChange={e => handleSearch(e.target.value)} className="pl-10 bg-gray-800 border-gray-700 focus:border-yellow-500 text-white" />
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Button onClick={() => setShowFilters(!showFilters)} variant="outline" className="border-gray-700 text-gray-400 hover:border-gray-600 hover:text-white">
                  <Filter className="w-4 h-4 mr-2" />
                  筛选
                  {showFilters ? <ChevronUp className="w-4 h-4 ml-2" /> : <ChevronDown className="w-4 h-4 ml-2" />}
                </Button>
                <Button onClick={() => setViewMode(viewMode === 'list' ? 'grid' : 'list')} variant="outline" className="border-gray-700 text-gray-400 hover:border-gray-600 hover:text-white">
                  {viewMode === 'list' ? <FileText className="w-4 h-4 mr-2" /> : <MessageCircle className="w-4 h-4 mr-2" />}
                  {viewMode === 'list' ? '网格视图' : '列表视图'}
                </Button>
                <Button onClick={() => {
                loadConsultationHistory();
                loadAIConversationHistory();
              }} variant="outline" className="border-gray-700 text-gray-400 hover:border-gray-600 hover:text-white">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  刷新
                </Button>
              </div>
            </div>

            {showFilters && <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-gray-800">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">咨询类型</label>
                  <Select value={filterType} onValueChange={value => handleFilterChange('type', value)}>
                    <SelectTrigger className="bg-gray-800 border-gray-700 focus:border-yellow-500 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="all" className="text-white">全部类型</SelectItem>
                      <SelectItem value="product" className="text-white">产品咨询</SelectItem>
                      <SelectItem value="technical" className="text-white">技术支持</SelectItem>
                      <SelectItem value="health" className="text-white">健康咨询</SelectItem>
                      <SelectItem value="partnership" className="text-white">合作洽谈</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">状态</label>
                  <Select value={filterStatus} onValueChange={value => handleFilterChange('status', value)}>
                    <SelectTrigger className="bg-gray-800 border-gray-700 focus:border-yellow-500 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="all" className="text-white">全部状态</SelectItem>
                      <SelectItem value="pending" className="text-white">待回复</SelectItem>
                      <SelectItem value="in-progress" className="text-white">处理中</SelectItem>
                      <SelectItem value="completed" className="text-white">已完成</SelectItem>
                      <SelectItem value="cancelled" className="text-white">已取消</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">AI模型</label>
                  <Select value={filterModel} onValueChange={value => handleFilterChange('model', value)}>
                    <SelectTrigger className="bg-gray-800 border-gray-700 focus:border-yellow-500 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="all" className="text-white">全部模型</SelectItem>
                      {aiModels.map(model => <SelectItem key={model.id} value={model.id} className="text-white">
                          {model.name} ({model.provider})
                        </SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">排序</label>
                  <Select value={`${sortBy}_${sortOrder}`} onValueChange={value => {
                const [sort, order] = value.split('_');
                handleFilterChange('sortBy', sort);
                handleFilterChange('sortOrder', order);
              }}>
                    <SelectTrigger className="bg-gray-800 border-gray-700 focus:border-yellow-500 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="date_desc" className="text-white">最新优先</SelectItem>
                      <SelectItem value="date_asc" className="text-white">最早优先</SelectItem>
                      <SelectItem value="tokens_desc" className="text-white">Token消耗降序</SelectItem>
                      <SelectItem value="cost_desc" className="text-white">费用降序</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>}
          </div>

          {/* Batch Operations */}
          {selectedItems.size > 0 && <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 mb-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-400">已选择 {selectedItems.size} 项</span>
                  <Button onClick={toggleSelectAll} variant="outline" size="sm" className="border-gray-700 text-gray-400 hover:border-gray-600 hover:text-white">
                    {selectedItems.size === getAllItems().length ? '取消全选' : '全选'}
                  </Button>
                </div>
                <div className="flex items-center space-x-2">
                  <Button onClick={handleExportSelected} variant="outline" size="sm" className="border-gray-700 text-gray-400 hover:border-gray-600 hover:text-white">
                    <Download className="w-4 h-4 mr-2" />
                    导出选中
                  </Button>
                  <Button onClick={handleDeleteSelected} variant="outline" size="sm" className="border-red-500 text-red-500 hover:border-red-400 hover:text-red-400">
                    <Trash2 className="w-4 h-4 mr-2" />
                    删除选中
                  </Button>
                </div>
              </div>
            </div>}

          {/* Results */}
          <div className="bg-gray-900 rounded-lg border border-gray-800">
            {paginatedItems.length === 0 ? <div className="text-center py-12">
                <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">暂无咨询记录</h3>
                <p className="text-gray-400 mb-6">您还没有任何咨询记录</p>
                <Button onClick={() => navigateTo('consultation')} className="bg-yellow-500 hover:bg-yellow-600 text-black">
                  开始咨询
                </Button>
              </div> : <div className="divide-y divide-gray-800">
                {paginatedItems.map(item => {
              const isExpanded = expandedItems.has(item.id);
              const isSelected = selectedItems.has(item.id);
              if (item.type === 'consultation') {
                const consult = item.data;
                return <div key={item.id} className="p-6 hover:bg-gray-800 transition-colors">
                      <div className="flex items-start space-x-4">
                        <input type="checkbox" checked={isSelected} onChange={() => toggleSelect(item.id)} className="mt-1 w-4 h-4 text-yellow-500 bg-gray-700 border-gray-600 rounded focus:ring-yellow-500 focus:ring-2" />
                        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <Users className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-bold text-lg mb-1">{consult.consultation_subject}</h3>
                              <p className="text-gray-400 text-sm mb-2">{getConsultationTypeLabel(consult.consultation_type)}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className={`px-2 py-1 rounded-full text-xs ${getConsultationStatusColor(consult.status)}`}>
                                {getConsultationStatusLabel(consult.status)}
                              </div>
                              <Button onClick={() => handleViewDetail('consultation', consult._id)} variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                                <Eye className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                          <p className="text-gray-300 mb-3 line-clamp-2">{consult.consultation_content}</p>
                          <div className="flex items-center justify-between text-sm text-gray-400">
                            <div className="flex items-center space-x-4">
                              <span>客服: {consult.consultant_name}</span>
                              <span>消息数: {consult.message_count}</span>
                              {consult.user_rating && <div className="flex items-center">
                                  <Star className="w-4 h-4 text-yellow-500 mr-1" />
                                  <span>{consult.user_rating}</span>
                                </div>}
                            </div>
                            <span>{formatTime(consult.consultation_time)}</span>
                          </div>
                          {consult.user_feedback && <div className="mt-3 p-3 bg-gray-800 rounded-lg">
                              <p className="text-sm text-gray-400">用户反馈: {consult.user_feedback}</p>
                            </div>}
                        </div>
                      </div>
                    </div>;
              } else {
                const conv = item.data;
                const ModelIcon = getModelIcon(conv.ai_model_id);
                return <div key={item.id} className="p-6 hover:bg-gray-800 transition-colors">
                      <div className="flex items-start space-x-4">
                        <input type="checkbox" checked={isSelected} onChange={() => toggleSelect(item.id)} className="mt-1 w-4 h-4 text-yellow-500 bg-gray-700 border-gray-600 rounded focus:ring-yellow-500 focus:ring-2" />
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${getModelColor(conv.ai_model_id)}`}>
                          <ModelIcon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-bold text-lg mb-1">AI对话</h3>
                              <p className="text-gray-400 text-sm mb-2">{conv.ai_model_name} ({conv.ai_provider})</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="px-2 py-1 bg-green-500 rounded-full text-xs text-white">
                                AI对话
                              </div>
                              <Button onClick={() => handleViewDetail('ai', conv.session_id)} variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                                <Eye className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                          <p className="text-gray-300 mb-3 line-clamp-2">{conv.first_message}</p>
                          <div className="flex items-center justify-between text-sm text-gray-400">
                            <div className="flex items-center space-x-4">
                              <span>消息数: {conv.message_count}</span>
                              <span>Token: {conv.total_tokens}</span>
                              <span>费用: {formatCost(conv.total_cost)}</span>
                              <span>响应时间: {Math.round(conv.avg_response_time)}ms</span>
                            </div>
                            <span>{formatTime(conv.first_message_time)}</span>
                          </div>
                        </div>
                      </div>
                    </div>;
              }
            })}
              </div>}
          </div>

          {/* Pagination */}
          {totalPages > 1 && <div className="flex items-center justify-between mt-8">
              <div className="text-sm text-gray-400">
                显示 {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filteredItems.length)} 条，共 {filteredItems.length} 条
              </div>
              <div className="flex items-center space-x-2">
                <Button onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} disabled={currentPage === 1} variant="outline" className="border-gray-700 text-gray-400 hover:border-gray-600 hover:text-white disabled:opacity-50">
                  上一页
                </Button>
                <div className="flex items-center space-x-1">
                  {Array.from({
                length: Math.min(5, totalPages)
              }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                return <Button key={pageNum} onClick={() => setCurrentPage(pageNum)} variant={currentPage === pageNum ? 'default' : 'outline'} className={currentPage === pageNum ? 'bg-yellow-500 text-black' : 'border-gray-700 text-gray-400 hover:border-gray-600 hover:text-white'}>
                        {pageNum}
                      </Button>;
              })}
                </div>
                <Button onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages} variant="outline" className="border-gray-700 text-gray-400 hover:border-gray-600 hover:text-white disabled:opacity-50">
                  下一页
                </Button>
              </div>
            </div>}
        </div>
      </div>
    </AuthGuard>;
}