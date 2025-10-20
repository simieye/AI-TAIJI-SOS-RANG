// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';
// @ts-ignore;
import { User, Settings, LogOut, Edit2, Save, X, Camera, Mail, Phone, MapPin, Calendar, Shield, Bell, CreditCard, TrendingUp, BarChart3, Brain, Bot, DollarSign, Clock, Zap, Activity, PieChart, Download, RefreshCw, AlertCircle, CheckCircle, Star, Target, Award, Gift, MessageCircle, Package } from 'lucide-react';

import { Navigation } from '@/components/Navigation';
import { AuthGuard } from '@/components/AuthGuard';
export default function Profile(props) {
  const {
    $w
  } = props;
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userStats, setUserStats] = useState(null);
  const [aiUsageStats, setAiUsageStats] = useState(null);
  const [billingInfo, setBillingInfo] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    bio: ''
  });
  const navigateTo = pageId => {
    $w.utils.navigateTo({
      pageId,
      params: {}
    });
  };
  useEffect(() => {
    loadUserData();
    loadUserStats();
    loadAIUsageStats();
    loadBillingInfo();
    loadNotifications();
  }, []);
  const loadUserData = async () => {
    try {
      const currentUser = $w.auth.currentUser;
      if (currentUser) {
        setFormData({
          name: currentUser.nickName || currentUser.name || '',
          email: currentUser.email || '',
          phone: currentUser.phone || '',
          address: '',
          bio: ''
        });
      }
    } catch (error) {
      console.error('加载用户数据失败:', error);
    }
  };
  const loadUserStats = async () => {
    try {
      const currentUser = $w.auth.currentUser;
      if (!currentUser) return;

      // 模拟用户统计数据
      const mockStats = {
        totalConsultations: 12,
        completedConsultations: 10,
        pendingConsultations: 2,
        averageRating: 4.8,
        memberSince: new Date('2023-01-15'),
        lastLogin: new Date(),
        totalOrders: 3,
        totalSpent: 897
      };
      setUserStats(mockStats);
    } catch (error) {
      console.error('加载用户统计失败:', error);
    }
  };
  const loadAIUsageStats = async () => {
    try {
      const currentUser = $w.auth.currentUser;
      if (!currentUser) return;

      // 从数据源加载AI使用统计
      try {
        const result = await $w.cloud.callDataSource({
          dataSourceName: 'ai_usage_billing',
          methodName: 'wedaGetRecordsV2',
          params: {
            filter: {
              where: {
                user_id: {
                  $eq: currentUser.userId
                }
              }
            },
            select: {
              $master: true
            },
            orderBy: [{
              billing_period: 'desc'
            }],
            pageSize: 12
          }
        });
        if (result && result.records) {
          // 处理AI使用统计数据
          const stats = processAIUsageData(result.records);
          setAiUsageStats(stats);
        }
      } catch (error) {
        console.error('加载AI使用统计失败:', error);
        // 使用模拟数据
        const mockAIStats = {
          currentMonth: {
            totalRequests: 156,
            totalTokens: 12450,
            totalCost: 0.37,
            models: [{
              name: 'GPT-4',
              requests: 89,
              tokens: 7890,
              cost: 0.24
            }, {
              name: 'Claude-3',
              requests: 45,
              tokens: 3450,
              cost: 0.09
            }, {
              name: 'Qwen Max',
              requests: 22,
              tokens: 1110,
              cost: 0.04
            }],
            dailyUsage: Array.from({
              length: 30
            }, (_, i) => ({
              date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              requests: Math.floor(Math.random() * 10) + 1,
              tokens: Math.floor(Math.random() * 500) + 100,
              cost: Math.random() * 0.02
            }))
          },
          lastMonth: {
            totalRequests: 234,
            totalTokens: 18900,
            totalCost: 0.56
          },
          allTime: {
            totalRequests: 1256,
            totalTokens: 98700,
            totalCost: 2.96,
            firstUsage: new Date('2023-06-01'),
            favoriteModel: 'GPT-4',
            averageResponseTime: 1200
          },
          subscription: {
            plan: 'Free',
            quotaLimit: 1000,
            quotaUsed: 12450,
            quotaRemaining: -11450,
            nextBillingDate: null,
            autoRenewal: false
          }
        };
        setAiUsageStats(mockAIStats);
      }
    } catch (error) {
      console.error('加载AI使用统计失败:', error);
    }
  };
  const loadBillingInfo = async () => {
    try {
      const currentUser = $w.auth.currentUser;
      if (!currentUser) return;

      // 模拟计费信息
      const mockBilling = {
        currentBalance: 12.45,
        paymentMethod: '信用卡 ending in 4242',
        nextBillingDate: null,
        monthlySpend: 0.37,
        lastPaymentDate: new Date('2024-01-15'),
        invoices: [{
          id: 'INV-2024-001',
          date: new Date('2024-01-01'),
          amount: 0.56,
          status: 'paid'
        }, {
          id: 'INV-2023-012',
          date: new Date('2023-12-01'),
          amount: 0.43,
          status: 'paid'
        }]
      };
      setBillingInfo(mockBilling);
    } catch (error) {
      console.error('加载计费信息失败:', error);
    }
  };
  const loadNotifications = async () => {
    try {
      // 模拟通知数据
      const mockNotifications = [{
        id: 1,
        type: 'info',
        title: 'AI使用量提醒',
        message: '您本月的AI使用量已接近配额限制',
        time: new Date(Date.now() - 2 * 60 * 60 * 1000),
        read: false
      }, {
        id: 2,
        type: 'success',
        title: '咨询完成',
        message: '您的产品咨询已得到回复',
        time: new Date(Date.now() - 24 * 60 * 60 * 1000),
        read: true
      }];
      setNotifications(mockNotifications);
    } catch (error) {
      console.error('加载通知失败:', error);
    } finally {
      setLoading(false);
    }
  };
  const processAIUsageData = records => {
    // 处理从数据源获取的AI使用数据
    const currentMonth = new Date().toISOString().slice(0, 7);
    const lastMonth = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 7);
    const currentMonthData = records.filter(r => r.billing_period === currentMonth);
    const lastMonthData = records.filter(r => r.billing_period === lastMonth);
    const processMonthData = data => {
      return data.reduce((acc, record) => ({
        totalRequests: acc.totalRequests + (record.total_requests || 0),
        totalTokens: acc.totalTokens + (record.total_tokens || 0),
        totalCost: acc.totalCost + (record.total_cost || 0),
        models: [...acc.models, {
          name: record.ai_model_name,
          requests: record.total_requests || 0,
          tokens: record.total_tokens || 0,
          cost: record.total_cost || 0
        }]
      }), {
        totalRequests: 0,
        totalTokens: 0,
        totalCost: 0,
        models: []
      });
    };
    const currentMonthStats = processMonthData(currentMonthData);
    const lastMonthStats = processMonthData(lastMonthData);
    const allTimeStats = processMonthData(records);
    return {
      currentMonth: currentMonthStats,
      lastMonth: lastMonthStats,
      allTime: allTimeStats,
      subscription: {
        plan: 'Free',
        quotaLimit: 1000,
        quotaUsed: currentMonthStats.totalTokens,
        quotaRemaining: Math.max(0, 1000 - currentMonthStats.totalTokens),
        nextBillingDate: null,
        autoRenewal: false
      }
    };
  };
  const handleSaveProfile = async () => {
    try {
      // 这里可以添加保存用户信息的逻辑
      console.log('保存用户信息:', formData);
      setIsEditing(false);
    } catch (error) {
      console.error('保存用户信息失败:', error);
    }
  };
  const handleCancelEdit = () => {
    setIsEditing(false);
    loadUserData();
  };
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  const handleMarkNotificationRead = async notificationId => {
    setNotifications(prev => prev.map(notif => notif.id === notificationId ? {
      ...notif,
      read: true
    } : notif));
  };
  const formatCurrency = amount => {
    return new Intl.NumberFormat('zh-CN', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };
  const formatDate = date => {
    return new Date(date).toLocaleDateString('zh-CN');
  };
  const formatDateTime = date => {
    return new Date(date).toLocaleString('zh-CN');
  };
  const getUsagePercentage = (used, limit) => {
    return Math.min(100, used / limit * 100);
  };
  const getUsageColor = percentage => {
    if (percentage >= 90) return 'text-red-500';
    if (percentage >= 70) return 'text-yellow-500';
    return 'text-green-500';
  };
  if (loading) {
    return <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
          <p className="text-gray-400">加载个人信息中...</p>
        </div>
      </div>;
  }
  return <AuthGuard $w={$w}>
      <div className="min-h-screen bg-black text-white">
        <Navigation currentPage="profile" $w={$w} />

        <div className="max-w-7xl mx-auto px-8 py-24">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-yellow-500">个人中心</span>
            </h1>
            <p className="text-xl text-gray-300">
              管理您的个人信息、AI使用情况和账户设置
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-4 mb-8 border-b border-gray-800">
            <button onClick={() => setActiveTab('overview')} className={`pb-4 px-2 font-medium transition-colors ${activeTab === 'overview' ? 'text-yellow-500 border-b-2 border-yellow-500' : 'text-gray-400 hover:text-white'}`}>
              <div className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                概览
              </div>
            </button>
            <button onClick={() => setActiveTab('ai-usage')} className={`pb-4 px-2 font-medium transition-colors ${activeTab === 'ai-usage' ? 'text-yellow-500 border-b-2 border-yellow-500' : 'text-gray-400 hover:text-white'}`}>
              <div className="flex items-center">
                <Bot className="w-5 h-5 mr-2" />
                AI使用统计
              </div>
            </button>
            <button onClick={() => setActiveTab('billing')} className={`pb-4 px-2 font-medium transition-colors ${activeTab === 'billing' ? 'text-yellow-500 border-b-2 border-yellow-500' : 'text-gray-400 hover:text-white'}`}>
              <div className="flex items-center">
                <CreditCard className="w-5 h-5 mr-2" />
                计费信息
              </div>
            </button>
            <button onClick={() => setActiveTab('notifications')} className={`pb-4 px-2 font-medium transition-colors ${activeTab === 'notifications' ? 'text-yellow-500 border-b-2 border-yellow-500' : 'text-gray-400 hover:text-white'}`}>
              <div className="flex items-center">
                <Bell className="w-5 h-5 mr-2" />
                通知中心
              </div>
            </button>
            <button onClick={() => setActiveTab('settings')} className={`pb-4 px-2 font-medium transition-colors ${activeTab === 'settings' ? 'text-yellow-500 border-b-2 border-yellow-500' : 'text-gray-400 hover:text-white'}`}>
              <div className="flex items-center">
                <Settings className="w-5 h-5 mr-2" />
                账户设置
              </div>
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Profile Card */}
              <div className="lg:col-span-1">
                <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-yellow-500">个人信息</h2>
                    {!isEditing ? <Button onClick={() => setIsEditing(true)} variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                        <Edit2 className="w-4 h-4" />
                      </Button> : <div className="flex space-x-2">
                        <Button onClick={handleSaveProfile} size="sm" className="bg-yellow-500 hover:bg-yellow-600 text-black">
                          <Save className="w-4 h-4" />
                        </Button>
                        <Button onClick={handleCancelEdit} variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                          <X className="w-4 h-4" />
                        </Button>
                      </div>}
                  </div>
                  
                  <div className="text-center mb-6">
                    <div className="w-24 h-24 bg-gray-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <User className="w-12 h-12 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">{formData.name || '用户'}</h3>
                    <p className="text-gray-400">会员</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">姓名</label>
                      {isEditing ? <Input value={formData.name} onChange={e => handleInputChange('name', e.target.value)} className="bg-gray-800 border-gray-700 focus:border-yellow-500 text-white" /> : <p className="text-white">{formData.name || '未设置'}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">邮箱</label>
                      {isEditing ? <Input type="email" value={formData.email} onChange={e => handleInputChange('email', e.target.value)} className="bg-gray-800 border-gray-700 focus:border-yellow-500 text-white" /> : <div className="flex items-center">
                          <Mail className="w-4 h-4 mr-2 text-gray-400" />
                          <span>{formData.email || '未设置'}</span>
                        </div>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">电话</label>
                      {isEditing ? <Input value={formData.phone} onChange={e => handleInputChange('phone', e.target.value)} className="bg-gray-800 border-gray-700 focus:border-yellow-500 text-white" /> : <div className="flex items-center">
                          <Phone className="w-4 h-4 mr-2 text-gray-400" />
                          <span>{formData.phone || '未设置'}</span>
                        </div>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">地址</label>
                      {isEditing ? <Input value={formData.address} onChange={e => handleInputChange('address', e.target.value)} className="bg-gray-800 border-gray-700 focus:border-yellow-500 text-white" /> : <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                          <span>{formData.address || '未设置'}</span>
                        </div>}
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="lg:col-span-2 space-y-6">
                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
                    <div className="flex items-center justify-between mb-2">
                      <MessageCircle className="w-8 h-8 text-blue-500" />
                      <span className="text-2xl font-bold text-blue-500">{userStats?.totalConsultations || 0}</span>
                    </div>
                    <h3 className="font-bold mb-1">总咨询</h3>
                    <p className="text-sm text-gray-400">人工客服咨询次数</p>
                  </div>
                  
                  <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
                    <div className="flex items-center justify-between mb-2">
                      <Bot className="w-8 h-8 text-green-500" />
                      <span className="text-2xl font-bold text-green-500">{aiUsageStats?.currentMonth?.totalRequests || 0}</span>
                    </div>
                    <h3 className="font-bold mb-1">AI对话</h3>
                    <p className="text-sm text-gray-400">本月AI对话次数</p>
                  </div>
                  
                  <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
                    <div className="flex items-center justify-between mb-2">
                      <TrendingUp className="w-8 h-8 text-yellow-500" />
                      <span className="text-2xl font-bold text-yellow-500">{aiUsageStats?.currentMonth?.totalTokens || 0}</span>
                    </div>
                    <h3 className="font-bold mb-1">Token使用</h3>
                    <p className="text-sm text-gray-400">本月Token消耗量</p>
                  </div>
                  
                  <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
                    <div className="flex items-center justify-between mb-2">
                      <DollarSign className="w-8 h-8 text-purple-500" />
                      <span className="text-2xl font-bold text-purple-500">{formatCurrency(aiUsageStats?.currentMonth?.totalCost || 0)}</span>
                    </div>
                    <h3 className="font-bold mb-1">本月费用</h3>
                    <p className="text-sm text-gray-400">AI使用费用</p>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                  <h3 className="text-xl font-bold text-yellow-500 mb-4">最近活动</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                      <div className="flex items-center">
                        <Bot className="w-5 h-5 text-green-500 mr-3" />
                        <div>
                          <p className="font-medium">AI对话</p>
                          <p className="text-sm text-gray-400">使用GPT-4进行产品咨询</p>
                        </div>
                      </div>
                      <span className="text-sm text-gray-400">2小时前</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                      <div className="flex items-center">
                        <MessageCircle className="w-5 h-5 text-blue-500 mr-3" />
                        <div>
                          <p className="font-medium">人工客服</p>
                          <p className="text-sm text-gray-400">技术支持咨询</p>
                        </div>
                      </div>
                      <span className="text-sm text-gray-400">1天前</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                      <div className="flex items-center">
                        <Package className="w-5 h-5 text-yellow-500 mr-3" />
                        <div>
                          <p className="font-medium">订单完成</p>
                          <p className="text-sm text-gray-400">AI太极戒指订单</p>
                        </div>
                      </div>
                      <span className="text-sm text-gray-400">3天前</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>}

          {activeTab === 'ai-usage' && aiUsageStats && <div className="space-y-8">
              {/* Usage Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                  <div className="flex items-center justify-between mb-4">
                    <Zap className="w-8 h-8 text-yellow-500" />
                    <span className="text-2xl font-bold text-yellow-500">{aiUsageStats.currentMonth.totalRequests}</span>
                  </div>
                  <h3 className="font-bold mb-2">本月请求</h3>
                  <p className="text-sm text-gray-400 mb-4">AI对话总请求数</p>
                  <div className="flex items-center text-sm">
                    {aiUsageStats.lastMonth.totalRequests > 0 && <span className={aiUsageStats.currentMonth.totalRequests > aiUsageStats.lastMonth.totalRequests ? 'text-green-500' : 'text-red-500'}>
                        {aiUsageStats.currentMonth.totalRequests > aiUsageStats.lastMonth.totalRequests ? '+' : ''}{((aiUsageStats.currentMonth.totalRequests - aiUsageStats.lastMonth.totalRequests) / aiUsageStats.lastMonth.totalRequests * 100).toFixed(1)}%
                      </span>}
                    <span className="text-gray-400 ml-2">较上月</span>
                  </div>
                </div>
                
                <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                  <div className="flex items-center justify-between mb-4">
                    <Brain className="w-8 h-8 text-green-500" />
                    <span className="text-2xl font-bold text-green-500">{aiUsageStats.currentMonth.totalTokens.toLocaleString()}</span>
                  </div>
                  <h3 className="font-bold mb-2">Token消耗</h3>
                  <p className="text-sm text-gray-400 mb-4">本月Token总消耗量</p>
                  <div className="flex items-center text-sm">
                    {aiUsageStats.lastMonth.totalTokens > 0 && <span className={aiUsageStats.currentMonth.totalTokens > aiUsageStats.lastMonth.totalTokens ? 'text-green-500' : 'text-red-500'}>
                        {aiUsageStats.currentMonth.totalTokens > aiUsageStats.lastMonth.totalTokens ? '+' : ''}{((aiUsageStats.currentMonth.totalTokens - aiUsageStats.lastMonth.totalTokens) / aiUsageStats.lastMonth.totalTokens * 100).toFixed(1)}%
                      </span>}
                    <span className="text-gray-400 ml-2">较上月</span>
                  </div>
                </div>
                
                <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                  <div className="flex items-center justify-between mb-4">
                    <DollarSign className="w-8 h-8 text-purple-500" />
                    <span className="text-2xl font-bold text-purple-500">{formatCurrency(aiUsageStats.currentMonth.totalCost)}</span>
                  </div>
                  <h3 className="font-bold mb-2">本月费用</h3>
                  <p className="text-sm text-gray-400 mb-4">AI使用总费用</p>
                  <div className="flex items-center text-sm">
                    {aiUsageStats.lastMonth.totalCost > 0 && <span className={aiUsageStats.currentMonth.totalCost > aiUsageStats.lastMonth.totalCost ? 'text-red-500' : 'text-green-500'}>
                        {aiUsageStats.currentMonth.totalCost > aiUsageStats.lastMonth.totalCost ? '+' : ''}{((aiUsageStats.currentMonth.totalCost - aiUsageStats.lastMonth.totalCost) / aiUsageStats.lastMonth.totalCost * 100).toFixed(1)}%
                      </span>}
                    <span className="text-gray-400 ml-2">较上月</span>
                  </div>
                </div>
              </div>

              {/* Usage Quota */}
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-yellow-500">使用配额</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-400">当前计划:</span>
                    <span className="px-3 py-1 bg-yellow-500 text-black rounded-full text-sm font-medium">{aiUsageStats.subscription.plan}</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Token使用量</span>
                      <span className={`text-sm ${getUsageColor(getUsagePercentage(aiUsageStats.subscription.quotaUsed, aiUsageStats.subscription.quotaLimit))}`}>
                        {aiUsageStats.subscription.quotaUsed.toLocaleString()} / {aiUsageStats.subscription.quotaLimit.toLocaleString()}
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-3">
                      <div className={`h-3 rounded-full transition-all duration-300 ${getUsagePercentage(aiUsageStats.subscription.quotaUsed, aiUsageStats.subscription.quotaLimit) >= 90 ? 'bg-red-500' : getUsagePercentage(aiUsageStats.subscription.quotaUsed, aiUsageStats.subscription.quotaLimit) >= 70 ? 'bg-yellow-500' : 'bg-green-500'}`} style={{
                    width: `${getUsagePercentage(aiUsageStats.subscription.quotaUsed, aiUsageStats.subscription.quotaLimit)}%`
                  }}></div>
                    </div>
                  </div>
                  
                  {aiUsageStats.subscription.quotaUsed > aiUsageStats.subscription.quotaLimit && <div className="flex items-center p-3 bg-red-500/20 border border-red-500 rounded-lg">
                      <AlertCircle className="w-5 h-5 text-red-500 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-red-500">配额已超限</p>
                        <p className="text-xs text-red-400">您已超出免费配额，建议升级到付费计划</p>
                      </div>
                    </div>}
                </div>
              </div>

              {/* Model Usage Breakdown */}
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                <h3 className="text-xl font-bold text-yellow-500 mb-6">模型使用详情</h3>
                <div className="space-y-4">
                  {aiUsageStats.currentMonth.models.map((model, index) => <div key={index} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center mr-4">
                          <Bot className="w-5 h-5 text-gray-400" />
                        </div>
                        <div>
                          <p className="font-medium">{model.name}</p>
                          <p className="text-sm text-gray-400">{model.requests} 次请求</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{formatCurrency(model.cost)}</p>
                        <p className="text-sm text-gray-400">{model.tokens.toLocaleString()} tokens</p>
                      </div>
                    </div>)}
                </div>
              </div>

              {/* All Time Statistics */}
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                <h3 className="text-xl font-bold text-yellow-500 mb-6">历史统计</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div>
                    <p className="text-3xl font-bold text-yellow-500 mb-2">{aiUsageStats.allTime.totalRequests.toLocaleString()}</p>
                    <p className="text-sm text-gray-400">总请求数</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-green-500 mb-2">{aiUsageStats.allTime.totalTokens.toLocaleString()}</p>
                    <p className="text-sm text-gray-400">总Token消耗</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-purple-500 mb-2">{formatCurrency(aiUsageStats.allTime.totalCost)}</p>
                    <p className="text-sm text-gray-400">总费用</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-blue-500 mb-2">{aiUsageStats.allTime.favoriteModel}</p>
                    <p className="text-sm text-gray-400">最常用模型</p>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-gray-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">首次使用</p>
                      <p className="font-medium">{formatDate(aiUsageStats.allTime.firstUsage)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">平均响应时间</p>
                      <p className="font-medium">{aiUsageStats.allTime.averageResponseTime}ms</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>}

          {activeTab === 'billing' && billingInfo && <div className="space-y-8">
              {/* Current Balance */}
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                <h3 className="text-xl font-bold text-yellow-500 mb-6">账户余额</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-sm text-gray-400 mb-2">当前余额</p>
                    <p className="text-3xl font-bold text-green-500">{formatCurrency(billingInfo.currentBalance)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-2">本月消费</p>
                    <p className="text-3xl font-bold text-yellow-500">{formatCurrency(billingInfo.monthlySpend)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-2">支付方式</p>
                    <p className="text-lg font-medium">{billingInfo.paymentMethod}</p>
                  </div>
                </div>
              </div>

              {/* Billing History */}
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-yellow-500">账单历史</h3>
                  <Button variant="outline" className="border-gray-700 text-gray-400 hover:border-gray-600 hover:text-white">
                    <Download className="w-4 h-4 mr-2" />
                    下载账单
                  </Button>
                </div>
                <div className="space-y-4">
                  {billingInfo.invoices.map((invoice, index) => <div key={index} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                      <div>
                        <p className="font-medium">{invoice.id}</p>
                        <p className="text-sm text-gray-400">{formatDate(invoice.date)}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{formatCurrency(invoice.amount)}</p>
                        <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${invoice.status === 'paid' ? 'bg-green-500 text-white' : 'bg-yellow-500 text-black'}`}>
                          {invoice.status === 'paid' ? '已支付' : '待支付'}
                        </div>
                      </div>
                    </div>)}
                </div>
              </div>
            </div>}

          {activeTab === 'notifications' && <div className="space-y-6">
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-yellow-500">通知中心</h3>
                  <Button variant="outline" className="border-gray-700 text-gray-400 hover:border-gray-600 hover:text-white">
                    全部标记为已读
                  </Button>
                </div>
                <div className="space-y-4">
                  {notifications.map(notification => <div key={notification.id} className={`flex items-start justify-between p-4 rounded-lg border ${notification.read ? 'bg-gray-800 border-gray-700' : 'bg-yellow-500/10 border-yellow-500'}`}>
                      <div className="flex items-start">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${notification.type === 'info' ? 'bg-blue-500' : notification.type === 'success' ? 'bg-green-500' : 'bg-yellow-500'}`}>
                          {notification.type === 'info' && <AlertCircle className="w-5 h-5 text-white" />}
                          {notification.type === 'success' && <CheckCircle className="w-5 h-5 text-white" />}
                          {notification.type === 'warning' && <AlertCircle className="w-5 h-5 text-white" />}
                        </div>
                        <div>
                          <p className="font-medium mb-1">{notification.title}</p>
                          <p className="text-sm text-gray-400">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-2">{formatDateTime(notification.time)}</p>
                        </div>
                      </div>
                      {!notification.read && <Button onClick={() => handleMarkNotificationRead(notification.id)} variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                          标记已读
                        </Button>}
                    </div>)}
                </div>
              </div>
            </div>}

          {activeTab === 'settings' && <div className="space-y-8">
              {/* Account Settings */}
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                <h3 className="text-xl font-bold text-yellow-500 mb-6">账户设置</h3>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">双因素认证</p>
                      <p className="text-sm text-gray-400">增强账户安全性</p>
                    </div>
                    <Button variant="outline" className="border-gray-700 text-gray-400 hover:border-gray-600 hover:text-white">
                      启用
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">邮件通知</p>
                      <p className="text-sm text-gray-400">接收重要更新和通知</p>
                    </div>
                    <Button variant="outline" className="border-gray-700 text-gray-400 hover:border-gray-600 hover:text-white">
                      配置
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">隐私设置</p>
                      <p className="text-sm text-gray-400">管理数据隐私和共享</p>
                    </div>
                    <Button variant="outline" className="border-gray-700 text-gray-400 hover:border-gray-600 hover:text-white">
                      设置
                    </Button>
                  </div>
                </div>
              </div>

              {/* Danger Zone */}
              <div className="bg-gray-900 rounded-lg p-6 border border-red-500">
                <h3 className="text-xl font-bold text-red-500 mb-6">危险区域</h3>
                <div className="space-y-4">
                  <Button variant="outline" className="border-red-500 text-red-500 hover:border-red-400 hover:text-red-400">
                    删除账户
                  </Button>
                </div>
              </div>
            </div>}
        </div>
      </div>
    </AuthGuard>;
}