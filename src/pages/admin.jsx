// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';
// @ts-ignore;
import { ArrowLeft, Users, Package, MessageCircle, Settings, BarChart3, Home, LogOut, Search, Filter, Download, RefreshCw, Eye, Edit, Trash2, CheckCircle, XCircle, Clock, TrendingUp, TrendingDown, DollarSign, Activity, Shield, Bell, Menu } from 'lucide-react';

import { Navigation } from '@/components/Navigation';
import { AuthGuard } from '@/components/AuthGuard';
export default function AdminDashboard(props) {
  const {
    $w
  } = props;
  const [activeTab, setActiveTab] = useState('dashboard');
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [consultations, setConsultations] = useState([]);
  const [configurations, setConfigurations] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const navigateTo = pageId => {
    $w.utils.navigateTo({
      pageId,
      params: {}
    });
  };
  useEffect(() => {
    loadDashboardData();
    if (activeTab === 'users') {
      loadUsers();
    } else if (activeTab === 'orders') {
      loadOrders();
    } else if (activeTab === 'consultations') {
      loadConsultations();
    } else if (activeTab === 'configurations') {
      loadConfigurations();
    }
  }, [activeTab]);
  const loadDashboardData = async () => {
    try {
      setLoading(true);
      // 模拟统计数据
      const mockStats = {
        totalUsers: 1250,
        activeUsers: 890,
        totalOrders: 3420,
        totalRevenue: 1250000,
        pendingOrders: 23,
        pendingConsultations: 15,
        monthlyGrowth: 12.5,
        satisfactionRate: 94.2
      };
      setStats(mockStats);
    } catch (error) {
      console.error('加载统计数据失败:', error);
    } finally {
      setLoading(false);
    }
  };
  const loadUsers = async () => {
    try {
      setLoading(true);
      // 模拟用户数据
      const mockUsers = [{
        user_id: 'user_001',
        name: '张三',
        email: 'zhangsan@example.com',
        phone: '13800138001',
        type: 'user',
        status: 'active',
        created_at: Date.now() - 1000 * 60 * 60 * 24 * 30,
        last_login: Date.now() - 1000 * 60 * 60 * 24 * 2
      }, {
        user_id: 'user_002',
        name: '李四',
        email: 'lisi@example.com',
        phone: '13800138002',
        type: 'partner',
        status: 'active',
        created_at: Date.now() - 1000 * 60 * 60 * 24 * 60,
        last_login: Date.now() - 1000 * 60 * 60 * 24 * 1
      }, {
        user_id: 'user_003',
        name: '王五',
        email: 'wangwu@example.com',
        phone: '13800138003',
        type: 'developer',
        status: 'inactive',
        created_at: Date.now() - 1000 * 60 * 60 * 24 * 90,
        last_login: Date.now() - 1000 * 60 * 60 * 24 * 30
      }];
      setUsers(mockUsers);
    } catch (error) {
      console.error('加载用户数据失败:', error);
    } finally {
      setLoading(false);
    }
  };
  const loadOrders = async () => {
    try {
      setLoading(true);
      // 模拟订单数据
      const mockOrders = [{
        order_id: 'ORDER_001',
        user_name: '张三',
        user_email: 'zhangsan@example.com',
        product_name: 'AI太极·SOS RING',
        total_price: 399,
        order_status: 'pending',
        payment_status: 'paid',
        created_at: Date.now() - 1000 * 60 * 60 * 24 * 1
      }, {
        order_id: 'ORDER_002',
        user_name: '李四',
        user_email: 'lisi@example.com',
        product_name: 'AI太极·SOS RING',
        total_price: 499,
        order_status: 'processing',
        payment_status: 'paid',
        created_at: Date.now() - 1000 * 60 * 60 * 24 * 2
      }, {
        order_id: 'ORDER_003',
        user_name: '王五',
        user_email: 'wangwu@example.com',
        product_name: 'AI太极·SOS RING',
        total_price: 299,
        order_status: 'completed',
        payment_status: 'paid',
        created_at: Date.now() - 1000 * 60 * 60 * 24 * 3
      }];
      setOrders(mockOrders);
    } catch (error) {
      console.error('加载订单数据失败:', error);
    } finally {
      setLoading(false);
    }
  };
  const loadConsultations = async () => {
    try {
      setLoading(true);
      // 模拟咨询数据
      const mockConsultations = [{
        consultation_id: 'CONS_001',
        user_name: '张三',
        user_email: 'zhangsan@example.com',
        consultation_type: 'product',
        consultation_subject: '产品功能咨询',
        status: 'pending',
        consultant_name: '',
        created_at: Date.now() - 1000 * 60 * 60 * 24 * 1
      }, {
        consultation_id: 'CONS_002',
        user_name: '李四',
        user_email: 'lisi@example.com',
        consultation_type: 'technical',
        consultation_subject: '技术支持',
        status: 'in-progress',
        consultant_name: '客服小李',
        created_at: Date.now() - 1000 * 60 * 60 * 24 * 2
      }, {
        consultation_id: 'CONS_003',
        user_name: '王五',
        user_email: 'wangwu@example.com',
        consultation_type: 'health',
        consultation_subject: '健康咨询',
        status: 'completed',
        consultant_name: '健康专家小王',
        created_at: Date.now() - 1000 * 60 * 60 * 24 * 3
      }];
      setConsultations(mockConsultations);
    } catch (error) {
      console.error('加载咨询数据失败:', error);
    } finally {
      setLoading(false);
    }
  };
  const loadConfigurations = async () => {
    try {
      setLoading(true);
      // 模拟配置数据
      const mockConfigurations = [{
        order_id: 'CONFIG_001',
        user_name: '张三',
        user_email: 'zhangsan@example.com',
        configuration: {
          size: 'medium',
          material: 'titanium',
          color: 'black'
        },
        total_price: 299,
        status: 'saved',
        created_at: Date.now() - 1000 * 60 * 60 * 24 * 7
      }, {
        order_id: 'CONFIG_002',
        user_name: '李四',
        user_email: 'lisi@example.com',
        configuration: {
          size: 'large',
          material: 'gold',
          color: 'rose'
        },
        total_price: 499,
        status: 'ordered',
        created_at: Date.now() - 1000 * 60 * 60 * 24 * 14
      }];
      setConfigurations(mockConfigurations);
    } catch (error) {
      console.error('加载配置数据失败:', error);
    } finally {
      setLoading(false);
    }
  };
  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userInfo');
    sessionStorage.removeItem('userToken');
    sessionStorage.removeItem('userInfo');
    navigateTo('login');
  };
  const getUserTypeLabel = type => {
    const typeMap = {
      user: '普通用户',
      partner: '合作伙伴',
      developer: '开发者',
      investor: '投资者',
      admin: '管理员'
    };
    return typeMap[type] || '未知';
  };
  const getUserTypeColor = type => {
    const colorMap = {
      user: 'bg-blue-500',
      partner: 'bg-green-500',
      developer: 'bg-purple-500',
      investor: 'bg-yellow-500',
      admin: 'bg-red-500'
    };
    return colorMap[type] || 'bg-gray-500';
  };
  const getOrderStatusLabel = status => {
    const statusMap = {
      pending: '待处理',
      processing: '处理中',
      shipped: '已发货',
      delivered: '已送达',
      completed: '已完成',
      cancelled: '已取消'
    };
    return statusMap[status] || '未知';
  };
  const getOrderStatusColor = status => {
    const colorMap = {
      pending: 'bg-yellow-500',
      processing: 'bg-blue-500',
      shipped: 'bg-purple-500',
      delivered: 'bg-green-500',
      completed: 'bg-green-600',
      cancelled: 'bg-red-500'
    };
    return colorMap[status] || 'bg-gray-500';
  };
  const getConsultationStatusLabel = status => {
    const statusMap = {
      pending: '待回复',
      'in-progress': '处理中',
      completed: '已完成'
    };
    return statusMap[status] || '未知';
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
  const formatTime = timestamp => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  const formatDate = timestamp => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('zh-CN');
  };
  const formatCurrency = amount => {
    return new Intl.NumberFormat('zh-CN', {
      style: 'currency',
      currency: 'CNY'
    }).format(amount);
  };
  const adminTabs = [{
    id: 'dashboard',
    label: '仪表板',
    icon: BarChart3
  }, {
    id: 'users',
    label: '用户管理',
    icon: Users
  }, {
    id: 'orders',
    label: '订单管理',
    icon: Package
  }, {
    id: 'consultations',
    label: '咨询管理',
    icon: MessageCircle
  }, {
    id: 'configurations',
    label: '配置管理',
    icon: Settings
  }];
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesFilter;
  });
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.user_name.toLowerCase().includes(searchTerm.toLowerCase()) || order.order_id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || order.order_status === filterStatus;
    return matchesSearch && matchesFilter;
  });
  const filteredConsultations = consultations.filter(consultation => {
    const matchesSearch = consultation.user_name.toLowerCase().includes(searchTerm.toLowerCase()) || consultation.consultation_subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || consultation.status === filterStatus;
    return matchesSearch && matchesFilter;
  });
  return <AuthGuard $w={$w} requiredPermissions={['admin']}>
      <div className="min-h-screen bg-black text-white">
        <Navigation currentPage="admin" $w={$w} />

        <div className="flex">
          {/* Sidebar */}
          <div className="w-64 bg-gray-900 min-h-screen border-r border-gray-800">
            <div className="p-6">
              <h2 className="text-xl font-bold text-yellow-500 mb-6">管理后台</h2>
              <nav className="space-y-2">
                {adminTabs.map(tab => {
                const Icon = tab.icon;
                return <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${activeTab === tab.id ? 'bg-yellow-500 text-black' : 'text-gray-300 hover:bg-gray-800 hover:text-yellow-500'}`}>
                    <Icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </button>;
              })}
              </nav>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-800">
              <Button onClick={() => navigateTo('home')} variant="outline" className="w-full border-gray-700 text-gray-400 hover:border-gray-600 hover:text-white mb-2">
                <Home className="w-4 h-4 mr-2" />
                返回前台
              </Button>
              <Button onClick={handleLogout} variant="outline" className="w-full border-red-500 text-red-500 hover:bg-red-500 hover:text-white">
                <LogOut className="w-4 h-4 mr-2" />
                退出登录
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-8">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-yellow-500 mb-2">
                {adminTabs.find(tab => tab.id === activeTab)?.label}
              </h1>
              <p className="text-gray-400">
                管理和监控系统运行状态
              </p>
            </div>

            {/* Dashboard Tab */}
            {activeTab === 'dashboard' && <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                    <div className="flex items-center justify-between mb-4">
                      <Users className="w-8 h-8 text-blue-500" />
                      <div className="flex items-center text-green-500 text-sm">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        {stats.monthlyGrowth}%
                      </div>
                    </div>
                    <div className="text-2xl font-bold mb-2">{stats.totalUsers}</div>
                    <div className="text-gray-400 text-sm">总用户数</div>
                  </div>
                  
                  <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                    <div className="flex items-center justify-between mb-4">
                      <Package className="w-8 h-8 text-yellow-500" />
                      <div className="flex items-center text-red-500 text-sm">
                        <TrendingDown className="w-4 h-4 mr-1" />
                        5.2%
                      </div>
                    </div>
                    <div className="text-2xl font-bold mb-2">{stats.totalOrders}</div>
                    <div className="text-gray-400 text-sm">总订单数</div>
                  </div>
                  
                  <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                    <div className="flex items-center justify-between mb-4">
                      <DollarSign className="w-8 h-8 text-green-500" />
                      <div className="flex items-center text-green-500 text-sm">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        18.3%
                      </div>
                    </div>
                    <div className="text-2xl font-bold mb-2">{formatCurrency(stats.totalRevenue)}</div>
                    <div className="text-gray-400 text-sm">总收入</div>
                  </div>
                  
                  <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                    <div className="flex items-center justify-between mb-4">
                      <Activity className="w-8 h-8 text-purple-500" />
                      <div className="flex items-center text-green-500 text-sm">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        2.1%
                      </div>
                    </div>
                    <div className="text-2xl font-bold mb-2">{stats.satisfactionRate}%</div>
                    <div className="text-gray-400 text-sm">满意度</div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                    <div className="flex items-center mb-4">
                      <Clock className="w-6 h-6 text-yellow-500 mr-3" />
                      <h3 className="font-bold">待处理订单</h3>
                    </div>
                    <div className="text-3xl font-bold text-yellow-500 mb-4">{stats.pendingOrders}</div>
                    <Button onClick={() => setActiveTab('orders')} className="w-full bg-yellow-500 hover:bg-yellow-600 text-black">
                      查看详情
                    </Button>
                  </div>
                  
                  <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                    <div className="flex items-center mb-4">
                      <MessageCircle className="w-6 h-6 text-blue-500 mr-3" />
                      <h3 className="font-bold">待回复咨询</h3>
                    </div>
                    <div className="text-3xl font-bold text-blue-500 mb-4">{stats.pendingConsultations}</div>
                    <Button onClick={() => setActiveTab('consultations')} className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                      查看详情
                    </Button>
                  </div>
                  
                  <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                    <div className="flex items-center mb-4">
                      <Users className="w-6 h-6 text-green-500 mr-3" />
                      <h3 className="font-bold">活跃用户</h3>
                    </div>
                    <div className="text-3xl font-bold text-green-500 mb-4">{stats.activeUsers}</div>
                    <Button onClick={() => setActiveTab('users')} className="w-full bg-green-500 hover:bg-green-600 text-white">
                      查看详情
                    </Button>
                  </div>
                  
                  <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                    <div className="flex items-center mb-4">
                      <Shield className="w-6 h-6 text-purple-500 mr-3" />
                      <h3 className="font-bold">系统状态</h3>
                    </div>
                    <div className="text-3xl font-bold text-green-500 mb-4">正常</div>
                    <Button variant="outline" className="w-full border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white">
                      系统监控
                    </Button>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                  <h3 className="text-xl font-bold text-yellow-500 mb-6">最近活动</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                        <div>
                          <p className="font-medium">新用户注册</p>
                          <p className="text-sm text-gray-400">用户 "赵六" 完成注册</p>
                        </div>
                      </div>
                      <span className="text-sm text-gray-400">5分钟前</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                        <div>
                          <p className="font-medium">新订单</p>
                          <p className="text-sm text-gray-400">订单 "ORDER_004" 需要处理</p>
                        </div>
                      </div>
                      <span className="text-sm text-gray-400">15分钟前</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                        <div>
                          <p className="font-medium">咨询回复</p>
                          <p className="text-sm text-gray-400">客服 "小李" 回复了咨询</p>
                        </div>
                      </div>
                      <span className="text-sm text-gray-400">30分钟前</span>
                    </div>
                  </div>
                </div>
              </div>}

            {/* Users Management Tab */}
            {activeTab === 'users' && <div className="space-y-6">
                {/* Filters */}
                <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-yellow-500">用户管理</h3>
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="搜索用户..." className="pl-10 bg-gray-800 border-gray-700 focus:border-yellow-500 text-white placeholder-gray-500" />
                      </div>
                      <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="bg-gray-800 border-gray-700 focus:border-yellow-500 text-white rounded-lg px-4 py-2">
                        <option value="all">全部状态</option>
                        <option value="active">活跃</option>
                        <option value="inactive">非活跃</option>
                      </select>
                      <Button variant="outline" className="border-gray-700 text-gray-400 hover:border-gray-600 hover:text-white">
                        <Download className="w-4 h-4 mr-2" />
                        导出
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Users Table */}
                <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-800">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">用户信息</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">类型</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">状态</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">注册时间</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">最后登录</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">操作</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-700">
                        {filteredUsers.map(user => <tr key={user.user_id} className="hover:bg-gray-800">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div>
                                <div className="text-sm font-medium text-white">{user.name}</div>
                                <div className="text-sm text-gray-400">{user.email}</div>
                                <div className="text-sm text-gray-400">{user.phone}</div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${getUserTypeColor(user.type)}`}>
                                {getUserTypeLabel(user.type)}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${user.status === 'active' ? 'bg-green-500' : 'bg-gray-500'}`}>
                                {user.status === 'active' ? '活跃' : '非活跃'}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                              {formatDate(user.created_at)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                              {formatDate(user.last_login)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex items-center space-x-2">
                                <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300">
                                  <Eye className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="sm" className="text-yellow-400 hover:text-yellow-300">
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300">
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>)}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>}

            {/* Orders Management Tab */}
            {activeTab === 'orders' && <div className="space-y-6">
                {/* Filters */}
                <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-yellow-500">订单管理</h3>
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="搜索订单..." className="pl-10 bg-gray-800 border-gray-700 focus:border-yellow-500 text-white placeholder-gray-500" />
                      </div>
                      <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="bg-gray-800 border-gray-700 focus:border-yellow-500 text-white rounded-lg px-4 py-2">
                        <option value="all">全部状态</option>
                        <option value="pending">待处理</option>
                        <option value="processing">处理中</option>
                        <option value="completed">已完成</option>
                      </select>
                      <Button variant="outline" className="border-gray-700 text-gray-400 hover:border-gray-600 hover:text-white">
                        <Download className="w-4 h-4 mr-2" />
                        导出
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Orders Table */}
                <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-800">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">订单信息</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">用户信息</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">产品</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">金额</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">状态</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">创建时间</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">操作</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-700">
                        {filteredOrders.map(order => <tr key={order.order_id} className="hover:bg-gray-800">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-white">{order.order_id}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div>
                                <div className="text-sm font-medium text-white">{order.user_name}</div>
                                <div className="text-sm text-gray-400">{order.user_email}</div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-white">{order.product_name}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-yellow-500">${order.total_price}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${getOrderStatusColor(order.order_status)}`}>
                                {getOrderStatusLabel(order.order_status)}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                              {formatDate(order.created_at)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex items-center space-x-2">
                                <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300">
                                  <Eye className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="sm" className="text-yellow-400 hover:text-yellow-300">
                                  <Edit className="w-4 h-4" />
                                </Button>
                                {order.order_status === 'pending' && <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white">
                                    处理
                                  </Button>}
                              </div>
                            </td>
                          </tr>)}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>}

            {/* Consultations Management Tab */}
            {activeTab === 'consultations' && <div className="space-y-6">
                {/* Filters */}
                <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-yellow-500">咨询管理</h3>
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="搜索咨询..." className="pl-10 bg-gray-800 border-gray-700 focus:border-yellow-500 text-white placeholder-gray-500" />
                      </div>
                      <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="bg-gray-800 border-gray-700 focus:border-yellow-500 text-white rounded-lg px-4 py-2">
                        <option value="all">全部状态</option>
                        <option value="pending">待回复</option>
                        <option value="in-progress">处理中</option>
                        <option value="completed">已完成</option>
                      </select>
                      <Button variant="outline" className="border-gray-700 text-gray-400 hover:border-gray-600 hover:text-white">
                        <Download className="w-4 h-4 mr-2" />
                        导出
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Consultations Table */}
                <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-800">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">咨询信息</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">用户信息</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">类型</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">咨询师</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">状态</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">创建时间</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">操作</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-700">
                        {filteredConsultations.map(consultation => <tr key={consultation.consultation_id} className="hover:bg-gray-800">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div>
                                <div className="text-sm font-medium text-white">{consultation.consultation_id}</div>
                                <div className="text-sm text-gray-400">{consultation.consultation_subject}</div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div>
                                <div className="text-sm font-medium text-white">{consultation.user_name}</div>
                                <div className="text-sm text-gray-400">{consultation.user_email}</div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-white">{getConsultationTypeLabel(consultation.consultation_type)}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-white">{consultation.consultant_name || '未分配'}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${consultation.status === 'completed' ? 'bg-green-500' : consultation.status === 'in-progress' ? 'bg-blue-500' : 'bg-yellow-500'}`}>
                                {getConsultationStatusLabel(consultation.status)}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                              {formatDate(consultation.created_at)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex items-center space-x-2">
                                <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300">
                                  <Eye className="w-4 h-4" />
                                </Button>
                                {consultation.status === 'pending' && <Button size="sm" className="bg-yellow-500 hover:bg-yellow-600 text-black">
                                    回复
                                  </Button>}
                              </div>
                            </td>
                          </tr>)}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>}

            {/* Configurations Management Tab */}
            {activeTab === 'configurations' && <div className="space-y-6">
                {/* Filters */}
                <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-yellow-500">配置管理</h3>
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="搜索配置..." className="pl-10 bg-gray-800 border-gray-700 focus:border-yellow-500 text-white placeholder-gray-500" />
                      </div>
                      <Button variant="outline" className="border-gray-700 text-gray-400 hover:border-gray-600 hover:text-white">
                        <Download className="w-4 h-4 mr-2" />
                        导出
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Configurations Table */}
                <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-800">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">配置信息</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">用户信息</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">配置详情</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">价格</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">状态</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">创建时间</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">操作</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-700">
                        {configurations.map(config => <tr key={config.order_id} className="hover:bg-gray-800">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-white">{config.order_id}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div>
                                <div className="text-sm font-medium text-white">{config.user_name}</div>
                                <div className="text-sm text-gray-400">{config.user_email}</div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-white">
                                {config.configuration.size} / {config.configuration.material} / {config.configuration.color}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-yellow-500">${config.total_price}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${config.status === 'ordered' ? 'bg-green-500' : 'bg-blue-500'}`}>
                                {config.status === 'ordered' ? '已下单' : '已保存'}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                              {formatDate(config.created_at)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex items-center space-x-2">
                                <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300">
                                  <Eye className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="sm" className="text-yellow-400 hover:text-yellow-300">
                                  <Edit className="w-4 h-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>)}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>}
          </div>
        </div>
      </div>
    </AuthGuard>;
}