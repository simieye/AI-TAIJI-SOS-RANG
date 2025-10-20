// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui';
// @ts-ignore;
import { ArrowLeft, User, Mail, Phone, Shield, Settings, LogOut, Edit2, CheckCircle, Clock, Activity, Award, Package, MessageCircle, History, Bell, Lock, Eye, EyeOff, Save, X, Search, Filter, Calendar, Download, RefreshCw } from 'lucide-react';

// @ts-ignore;
import { useForm } from 'react-hook-form';
// @ts-ignore;

import { Navigation } from '@/components/Navigation';
import { AuthGuard } from '@/components/AuthGuard';
export default function Profile(props) {
  const {
    $w
  } = props;
  const [activeTab, setActiveTab] = useState('personal');
  const [userInfo, setUserInfo] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [orders, setOrders] = useState([]);
  const [consultations, setConsultations] = useState([]);
  const [configurations, setConfigurations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigateTo = pageId => {
    $w.utils.navigateTo({
      pageId,
      params: {}
    });
  };
  const passwordForm = useForm();
  const {
    control: passwordControl,
    handleSubmit: handlePasswordSubmit,
    formState: {
      errors: passwordErrors
    },
    watch: watchPassword
  } = passwordForm;
  const newPassword = watchPassword('newPassword');
  useEffect(() => {
    loadUserInfo();
    if (activeTab === 'orders') {
      loadOrders();
    } else if (activeTab === 'consultations') {
      loadConsultations();
    } else if (activeTab === 'configurations') {
      loadConfigurations();
    }
  }, [activeTab]);
  const loadUserInfo = () => {
    const storedUser = localStorage.getItem('userInfo') || sessionStorage.getItem('userInfo');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserInfo(user);
      setEditForm(user);
    } else {
      navigateTo('login');
    }
  };
  const loadOrders = async () => {
    try {
      setLoading(true);
      // 模拟订单数据
      const mockOrders = [{
        order_id: 'ORDER_1234567890',
        product_name: 'AI太极·SOS RING 智能戒指',
        total_price: 399,
        order_status: 'completed',
        payment_status: 'paid',
        created_at: Date.now() - 1000 * 60 * 60 * 24 * 7,
        estimated_delivery: '2024-01-15',
        configuration: {
          size: 'medium',
          material: 'titanium',
          color: 'black'
        }
      }, {
        order_id: 'ORDER_1234567891',
        product_name: 'AI太极·SOS RING 智能戒指',
        total_price: 499,
        order_status: 'processing',
        payment_status: 'paid',
        created_at: Date.now() - 1000 * 60 * 60 * 24 * 3,
        estimated_delivery: '2024-01-20',
        configuration: {
          size: 'large',
          material: 'gold',
          color: 'rose'
        }
      }];
      setOrders(mockOrders);
    } catch (error) {
      console.error('加载订单失败:', error);
    } finally {
      setLoading(false);
    }
  };
  const loadConsultations = async () => {
    try {
      setLoading(true);
      // 模拟咨询数据
      const mockConsultations = [{
        consultation_id: 'CONS_1234567890',
        consultation_type: 'product',
        consultation_subject: '产品功能咨询',
        consultation_content: '请问AI太极戒指的电池续航时间是多久？',
        status: 'completed',
        consultation_time: Date.now() - 1000 * 60 * 60 * 24 * 2,
        consultant_name: '客服小李',
        message_count: 5
      }, {
        consultation_id: 'CONS_1234567891',
        consultation_type: 'technical',
        consultation_subject: '技术支持',
        consultation_content: '戒指无法连接手机，请问如何解决？',
        status: 'in-progress',
        consultation_time: Date.now() - 1000 * 60 * 60 * 24,
        consultant_name: '技术专家小王',
        message_count: 3
      }];
      setConsultations(mockConsultations);
    } catch (error) {
      console.error('加载咨询记录失败:', error);
    } finally {
      setLoading(false);
    }
  };
  const loadConfigurations = async () => {
    try {
      setLoading(true);
      // 模拟配置数据
      const mockConfigurations = [{
        order_id: 'CONFIG_1234567890',
        configuration: {
          size: 'medium',
          material: 'titanium',
          color: 'black',
          modules: {
            sleep: true,
            sos: true,
            health: false
          }
        },
        total_price: 299,
        created_at: Date.now() - 1000 * 60 * 60 * 24 * 14,
        status: 'saved'
      }, {
        order_id: 'CONFIG_1234567891',
        configuration: {
          size: 'large',
          material: 'ceramic',
          color: 'blue',
          modules: {
            sleep: true,
            sos: true,
            health: true
          }
        },
        total_price: 449,
        created_at: Date.now() - 1000 * 60 * 60 * 24 * 7,
        status: 'ordered'
      }];
      setConfigurations(mockConfigurations);
    } catch (error) {
      console.error('加载配置记录失败:', error);
    } finally {
      setLoading(false);
    }
  };
  const handleSaveProfile = async () => {
    try {
      // 模拟更新用户信息
      setUserInfo(editForm);
      localStorage.setItem('userInfo', JSON.stringify(editForm));
      setIsEditing(false);
      alert('个人信息更新成功');
    } catch (error) {
      console.error('更新失败:', error);
      alert('更新失败，请稍后重试');
    }
  };
  const handlePasswordChange = async data => {
    try {
      // 模拟密码修改
      console.log('密码修改:', data);
      setShowPasswordForm(false);
      passwordForm.reset();
      alert('密码修改成功');
    } catch (error) {
      console.error('密码修改失败:', error);
      alert('密码修改失败，请稍后重试');
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
  const tabs = [{
    id: 'personal',
    label: '个人信息',
    icon: User
  }, {
    id: 'orders',
    label: '订单历史',
    icon: Package
  }, {
    id: 'consultations',
    label: '咨询记录',
    icon: MessageCircle
  }, {
    id: 'configurations',
    label: '配置记录',
    icon: Settings
  }, {
    id: 'settings',
    label: '账户设置',
    icon: Lock
  }];
  if (!userInfo) {
    return <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
          <p className="text-gray-400">加载中...</p>
        </div>
      </div>;
  }
  return <AuthGuard $w={$w}>
      <div className="min-h-screen bg-black text-white">
        <Navigation currentPage="profile" $w={$w} />

        <div className="max-w-7xl mx-auto px-8 py-24">
          {/* Header */}
          <div className="mb-8">
            <button onClick={() => navigateTo('home')} className="flex items-center text-gray-400 hover:text-yellow-500 transition-colors mb-4">
              <ArrowLeft className="w-5 h-5 mr-2" />
              返回首页
            </button>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-yellow-500">个人中心</span>
            </h1>
            <p className="text-xl text-gray-300">
              管理您的账户信息和偏好设置
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-800 sticky top-8">
                {/* User Info */}
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="w-12 h-12 text-black" />
                  </div>
                  <h2 className="text-xl font-bold mb-2">{userInfo.name}</h2>
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${getUserTypeColor(userInfo.type)}`}>
                    {getUserTypeLabel(userInfo.type)}
                  </div>
                </div>

                {/* Navigation Tabs */}
                <nav className="space-y-2">
                  {tabs.map(tab => {
                  const Icon = tab.icon;
                  return <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${activeTab === tab.id ? 'bg-yellow-500 text-black' : 'text-gray-300 hover:bg-gray-800 hover:text-yellow-500'}`}>
                      <Icon className="w-5 h-5" />
                      <span>{tab.label}</span>
                    </button>;
                })}
                </nav>

                {/* Logout */}
                <div className="mt-6 pt-6 border-t border-gray-800">
                  <Button onClick={handleLogout} variant="outline" className="w-full border-red-500 text-red-500 hover:bg-red-500 hover:text-white">
                    <LogOut className="w-4 h-4 mr-2" />
                    退出登录
                  </Button>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Personal Information Tab */}
              {activeTab === 'personal' && <div className="space-y-6">
                  <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold text-yellow-500">个人信息</h3>
                      <Button onClick={() => setIsEditing(!isEditing)} variant="outline" className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black">
                        <Edit2 className="w-4 h-4 mr-2" />
                        {isEditing ? '取消编辑' : '编辑资料'}
                      </Button>
                    </div>

                    {isEditing ? <div className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">姓名</label>
                            <Input value={editForm.name || ''} onChange={e => setEditForm({
                        ...editForm,
                        name: e.target.value
                      })} className="bg-gray-800 border-gray-700 focus:border-yellow-500 text-white" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">邮箱</label>
                            <Input type="email" value={editForm.email || ''} onChange={e => setEditForm({
                        ...editForm,
                        email: e.target.value
                      })} className="bg-gray-800 border-gray-700 focus:border-yellow-500 text-white" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">手机</label>
                            <Input type="tel" value={editForm.phone || ''} onChange={e => setEditForm({
                        ...editForm,
                        phone: e.target.value
                      })} className="bg-gray-800 border-gray-700 focus:border-yellow-500 text-white" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">用户类型</label>
                            <Select value={editForm.type || 'user'} onValueChange={value => setEditForm({
                        ...editForm,
                        type: value
                      })}>
                              <SelectTrigger className="bg-gray-800 border-gray-700 focus:border-yellow-500 text-white">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="bg-gray-800 border-gray-700">
                                <SelectItem value="user" className="text-white">普通用户</SelectItem>
                                <SelectItem value="partner" className="text-white">合作伙伴</SelectItem>
                                <SelectItem value="developer" className="text-white">开发者</SelectItem>
                                <SelectItem value="investor" className="text-white">投资者</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="flex space-x-4">
                          <Button onClick={handleSaveProfile} className="bg-yellow-500 hover:bg-yellow-600 text-black">
                            <Save className="w-4 h-4 mr-2" />
                            保存
                          </Button>
                          <Button onClick={() => setIsEditing(false)} variant="outline" className="border-gray-700 text-gray-400 hover:border-gray-600 hover:text-white">
                            取消
                          </Button>
                        </div>
                      </div> : <div className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">姓名</label>
                            <p className="text-white">{userInfo.name}</p>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">邮箱</label>
                            <p className="text-white">{userInfo.email}</p>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">手机</label>
                            <p className="text-white">{userInfo.phone || '未设置'}</p>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">用户类型</label>
                            <p className="text-white">{getUserTypeLabel(userInfo.type)}</p>
                          </div>
                        </div>
                      </div>}
                  </div>

                  {/* Stats Cards */}
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                      <div className="flex items-center mb-4">
                        <Activity className="w-8 h-8 text-yellow-500 mr-3" />
                        <h3 className="font-bold">活跃度</h3>
                      </div>
                      <div className="text-3xl font-bold text-yellow-500 mb-2">85%</div>
                      <p className="text-sm text-gray-400">本月活跃度评分</p>
                    </div>
                    
                    <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                      <div className="flex items-center mb-4">
                        <Clock className="w-8 h-8 text-blue-500 mr-3" />
                        <h3 className="font-bold">注册时间</h3>
                      </div>
                      <div className="text-xl font-bold text-blue-500 mb-2">30天</div>
                      <p className="text-sm text-gray-400">成为AI太极用户</p>
                    </div>
                    
                    <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                      <div className="flex items-center mb-4">
                        <Award className="w-8 h-8 text-green-500 mr-3" />
                        <h3 className="font-bold">会员等级</h3>
                      </div>
                      <div className="text-xl font-bold text-green-500 mb-2">黄金</div>
                      <p className="text-sm text-gray-400">尊贵会员身份</p>
                    </div>
                  </div>
                </div>}

              {/* Orders History Tab */}
              {activeTab === 'orders' && <div className="space-y-6">
                  <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold text-yellow-500">订单历史</h3>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" className="border-gray-700 text-gray-400 hover:border-gray-600 hover:text-white">
                          <RefreshCw className="w-4 h-4 mr-2" />
                          刷新
                        </Button>
                        <Button variant="outline" size="sm" className="border-gray-700 text-gray-400 hover:border-gray-600 hover:text-white">
                          <Download className="w-4 h-4 mr-2" />
                          导出
                        </Button>
                      </div>
                    </div>

                    {loading ? <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500 mx-auto mb-4"></div>
                        <p className="text-gray-400">加载中...</p>
                      </div> : <div className="space-y-4">
                        {orders.map(order => <div key={order.order_id} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                            <div className="flex items-start justify-between mb-4">
                              <div>
                                <h4 className="font-bold text-lg mb-2">{order.product_name}</h4>
                                <p className="text-sm text-gray-400">订单号: {order.order_id}</p>
                              </div>
                              <div className="text-right">
                                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${getOrderStatusColor(order.order_status)}`}>
                                  {getOrderStatusLabel(order.order_status)}
                                </div>
                                <p className="text-lg font-bold text-yellow-500 mt-2">${order.total_price}</p>
                              </div>
                            </div>
                            <div className="grid md:grid-cols-4 gap-4 text-sm">
                              <div>
                                <span className="text-gray-400">下单时间:</span>
                                <p className="text-white">{formatDate(order.created_at)}</p>
                              </div>
                              <div>
                                <span className="text-gray-400">预计送达:</span>
                                <p className="text-white">{order.estimated_delivery}</p>
                              </div>
                              <div>
                                <span className="text-gray-400">尺寸:</span>
                                <p className="text-white">{order.configuration.size}</p>
                              </div>
                              <div>
                                <span className="text-gray-400">材质:</span>
                                <p className="text-white">{order.configuration.material}</p>
                              </div>
                            </div>
                            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-700">
                              <div className="flex items-center space-x-4 text-sm text-gray-400">
                                <span>支付状态: {order.payment_status === 'paid' ? '已支付' : '未支付'}</span>
                              </div>
                              <Button size="sm" className="bg-yellow-500 hover:bg-yellow-600 text-black">
                                查看详情
                              </Button>
                            </div>
                          </div>)}
                      </div>}

                    {orders.length === 0 && !loading && <div className="text-center py-8">
                        <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-xl text-gray-400">暂无订单记录</p>
                        <Button onClick={() => navigateTo('configurator')} className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-black">
                          立即订购
                        </Button>
                      </div>}
                  </div>
                </div>}

              {/* Consultations Tab */}
              {activeTab === 'consultations' && <div className="space-y-6">
                  <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold text-yellow-500">咨询记录</h3>
                      <Button onClick={() => navigateTo('consultation')} className="bg-yellow-500 hover:bg-yellow-600 text-black">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        新建咨询
                      </Button>
                    </div>

                    {loading ? <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500 mx-auto mb-4"></div>
                        <p className="text-gray-400">加载中...</p>
                      </div> : <div className="space-y-4">
                        {consultations.map(consultation => <div key={consultation.consultation_id} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                            <div className="flex items-start justify-between mb-4">
                              <div>
                                <h4 className="font-bold text-lg mb-2">{consultation.consultation_subject}</h4>
                                <p className="text-sm text-gray-400 mb-2">{consultation.consultation_content}</p>
                                <div className="flex items-center space-x-4 text-sm">
                                  <span className="text-gray-400">咨询类型: {getConsultationTypeLabel(consultation.consultation_type)}</span>
                                  <span className="text-gray-400">咨询师: {consultation.consultant_name}</span>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${consultation.status === 'completed' ? 'bg-green-500' : consultation.status === 'in-progress' ? 'bg-blue-500' : 'bg-yellow-500'}`}>
                                  {getConsultationStatusLabel(consultation.status)}
                                </div>
                                <p className="text-sm text-gray-400 mt-2">{formatTime(consultation.consultation_time)}</p>
                              </div>
                            </div>
                            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-700">
                              <div className="flex items-center space-x-4 text-sm text-gray-400">
                                <MessageCircle className="w-4 h-4" />
                                <span>{consultation.message_count} 条消息</span>
                              </div>
                              <div className="flex space-x-2">
                                {consultation.status !== 'completed' && <Button size="sm" onClick={() => navigateTo('consultation-chat')} className="bg-yellow-500 hover:bg-yellow-600 text-black">
                                    继续咨询
                                  </Button>}
                                <Button size="sm" variant="outline" className="border-gray-700 text-gray-400 hover:border-gray-600 hover:text-white">
                                  查看详情
                                </Button>
                              </div>
                            </div>
                          </div>)}
                      </div>}

                    {consultations.length === 0 && !loading && <div className="text-center py-8">
                        <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-xl text-gray-400">暂无咨询记录</p>
                        <Button onClick={() => navigateTo('consultation')} className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-black">
                          开始咨询
                        </Button>
                      </div>}
                  </div>
                </div>}

              {/* Configurations Tab */}
              {activeTab === 'configurations' && <div className="space-y-6">
                  <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold text-yellow-500">配置记录</h3>
                      <Button onClick={() => navigateTo('configurator')} className="bg-yellow-500 hover:bg-yellow-600 text-black">
                        <Settings className="w-4 h-4 mr-2" />
                        新建配置
                      </Button>
                    </div>

                    {loading ? <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500 mx-auto mb-4"></div>
                        <p className="text-gray-400">加载中...</p>
                      </div> : <div className="space-y-4">
                        {configurations.map(config => <div key={config.order_id} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                            <div className="flex items-start justify-between mb-4">
                              <div>
                                <h4 className="font-bold text-lg mb-2">AI太极·SOS RING 配置</h4>
                                <p className="text-sm text-gray-400">配置ID: {config.order_id}</p>
                              </div>
                              <div className="text-right">
                                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${config.status === 'ordered' ? 'bg-green-500' : 'bg-blue-500'}`}>
                                  {config.status === 'ordered' ? '已下单' : '已保存'}
                                </div>
                                <p className="text-lg font-bold text-yellow-500 mt-2">${config.total_price}</p>
                              </div>
                            </div>
                            <div className="grid md:grid-cols-4 gap-4 text-sm">
                              <div>
                                <span className="text-gray-400">尺寸:</span>
                                <p className="text-white">{config.configuration.size}</p>
                              </div>
                              <div>
                                <span className="text-gray-400">材质:</span>
                                <p className="text-white">{config.configuration.material}</p>
                              </div>
                              <div>
                                <span className="text-gray-400">颜色:</span>
                                <p className="text-white">{config.configuration.color}</p>
                              </div>
                              <div>
                                <span className="text-gray-400">功能模块:</span>
                                <p className="text-white">
                                  {Object.keys(config.configuration.modules).filter(key => config.configuration.modules[key]).join(', ')}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-700">
                              <div className="text-sm text-gray-400">
                                <Calendar className="w-4 h-4 inline mr-1" />
                                创建时间: {formatDate(config.created_at)}
                              </div>
                              <div className="flex space-x-2">
                                <Button size="sm" variant="outline" className="border-gray-700 text-gray-400 hover:border-gray-600 hover:text-white">
                                  重新配置
                                </Button>
                                {config.status === 'saved' && <Button size="sm" className="bg-yellow-500 hover:bg-yellow-600 text-black">
                                    下单购买
                                  </Button>}
                              </div>
                            </div>
                          </div>)}
                      </div>}

                    {configurations.length === 0 && !loading && <div className="text-center py-8">
                        <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-xl text-gray-400">暂无配置记录</p>
                        <Button onClick={() => navigateTo('configurator')} className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-black">
                          开始配置
                        </Button>
                      </div>}
                  </div>
                </div>}

              {/* Settings Tab */}
              {activeTab === 'settings' && <div className="space-y-6">
                  {/* Password Change */}
                  <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold text-yellow-500">密码设置</h3>
                      <Button onClick={() => setShowPasswordForm(!showPasswordForm)} variant="outline" className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black">
                        <Lock className="w-4 h-4 mr-2" />
                        修改密码
                      </Button>
                    </div>

                    {showPasswordForm && <Form {...passwordForm}>
                        <form onSubmit={handlePasswordSubmit(handlePasswordChange)} className="space-y-4">
                          <FormField control={passwordControl} name="currentPassword" rules={{
                      required: '请输入当前密码'
                    }} render={({
                      field
                    }) => <FormItem>
                            <FormLabel className="text-yellow-500">当前密码</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input type={showCurrentPassword ? 'text' : 'password'} placeholder="请输入当前密码" {...field} className="bg-gray-800 border-gray-700 focus:border-yellow-500 text-white pr-10" />
                                <button type="button" onClick={() => setShowCurrentPassword(!showCurrentPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-yellow-500">
                                  {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>} />

                          <FormField control={passwordControl} name="newPassword" rules={{
                      required: '请输入新密码',
                      minLength: {
                        value: 6,
                        message: '密码至少需要6个字符'
                      }
                    }} render={({
                      field
                    }) => <FormItem>
                            <FormLabel className="text-yellow-500">新密码</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input type={showNewPassword ? 'text' : 'password'} placeholder="请输入新密码" {...field} className="bg-gray-800 border-gray-700 focus:border-yellow-500 text-white pr-10" />
                                <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-yellow-500">
                                  {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>} />

                          <FormField control={passwordControl} name="confirmPassword" rules={{
                      required: '请确认新密码',
                      validate: value => value === newPassword || '两次输入的密码不一致'
                    }} render={({
                      field
                    }) => <FormItem>
                            <FormLabel className="text-yellow-500">确认新密码</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input type={showConfirmPassword ? 'text' : 'password'} placeholder="请再次输入新密码" {...field} className="bg-gray-800 border-gray-700 focus:border-yellow-500 text-white pr-10" />
                                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-yellow-500">
                                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>} />

                          <div className="flex space-x-4">
                            <Button type="submit" className="bg-yellow-500 hover:bg-yellow-600 text-black">
                              <Save className="w-4 h-4 mr-2" />
                              保存密码
                            </Button>
                            <Button type="button" onClick={() => {
                        setShowPasswordForm(false);
                        passwordForm.reset();
                      }} variant="outline" className="border-gray-700 text-gray-400 hover:border-gray-600 hover:text-white">
                              取消
                            </Button>
                          </div>
                        </form>
                      </Form>}
                  </div>

                  {/* Notification Settings */}
                  <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                    <h3 className="text-xl font-bold text-yellow-500 mb-6">通知设置</h3>
                    <div className="space-y-4">
                      <label className="flex items-center justify-between cursor-pointer">
                        <div>
                          <h4 className="font-medium">邮件通知</h4>
                          <p className="text-sm text-gray-400">接收订单状态、客服回复等重要邮件通知</p>
                        </div>
                        <input type="checkbox" defaultChecked className="w-5 h-5 text-yellow-500 bg-gray-800 border-gray-600 rounded focus:ring-yellow-500 focus:ring-2" />
                      </label>
                      <label className="flex items-center justify-between cursor-pointer">
                        <div>
                          <h4 className="font-medium">短信通知</h4>
                          <p className="text-sm text-gray-400">接收紧急通知和验证码短信</p>
                        </div>
                        <input type="checkbox" defaultChecked className="w-5 h-5 text-yellow-500 bg-gray-800 border-gray-600 rounded focus:ring-yellow-500 focus:ring-2" />
                      </label>
                      <label className="flex items-center justify-between cursor-pointer">
                        <div>
                          <h4 className="font-medium">推送通知</h4>
                          <p className="text-sm text-gray-400">接收浏览器推送通知</p>
                        </div>
                        <input type="checkbox" defaultChecked className="w-5 h-5 text-yellow-500 bg-gray-800 border-gray-600 rounded focus:ring-yellow-500 focus:ring-2" />
                      </label>
                    </div>
                  </div>

                  {/* Privacy Settings */}
                  <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                    <h3 className="text-xl font-bold text-yellow-500 mb-6">隐私设置</h3>
                    <div className="space-y-4">
                      <label className="flex items-center justify-between cursor-pointer">
                        <div>
                          <h4 className="font-medium">公开个人资料</h4>
                          <p className="text-sm text-gray-400">允许其他用户查看您的基本信息</p>
                        </div>
                        <input type="checkbox" className="w-5 h-5 text-yellow-500 bg-gray-800 border-gray-600 rounded focus:ring-yellow-500 focus:ring-2" />
                      </label>
                      <label className="flex items-center justify-between cursor-pointer">
                        <div>
                          <h4 className="font-medium">数据分析</h4>
                          <p className="text-sm text-gray-400">允许使用您的数据进行产品改进</p>
                        </div>
                        <input type="checkbox" defaultChecked className="w-5 h-5 text-yellow-500 bg-gray-800 border-gray-600 rounded focus:ring-yellow-500 focus:ring-2" />
                      </label>
                    </div>
                  </div>
                </div>}
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>;
}