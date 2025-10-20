// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button } from '@/components/ui';
// @ts-ignore;
import { ArrowLeft, CheckCircle, Package, Truck, Shield, CreditCard, Download, Home, User, Phone, Mail, MapPin, Calendar, Clock, DollarSign } from 'lucide-react';

import { Navigation } from '@/components/Navigation';
export default function OrderConfirmation(props) {
  const {
    $w
  } = props;
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigateTo = pageId => {
    $w.utils.navigateTo({
      pageId,
      params: {}
    });
  };
  useEffect(() => {
    loadOrderData();
  }, []);
  const loadOrderData = async () => {
    try {
      // 获取当前用户信息
      const currentUser = $w.auth.currentUser;
      const userId = currentUser?.userId;
      if (!userId) {
        navigateTo('login');
        return;
      }

      // 从数据源获取最新的订单记录
      const result = await $w.cloud.callDataSource({
        dataSourceName: 'product_configuration_order',
        methodName: 'wedaGetRecordsV2',
        params: {
          filter: {
            where: {
              $and: [{
                user_id: {
                  $eq: userId
                }
              }, {
                order_status: {
                  $eq: 'pending'
                }
              }]
            }
          },
          select: {
            $master: true
          },
          orderBy: [{
            order_id: 'desc'
          }],
          pageSize: 1
        }
      });
      if (result && result.records && result.records.length > 0) {
        setOrderData(result.records[0]);
      } else {
        // 如果没有找到订单，使用模拟数据
        const mockOrderData = {
          order_id: `ORDER_${Date.now()}`,
          user_name: currentUser?.nickName || '用户',
          user_phone: currentUser?.phone || '',
          user_email: currentUser?.email || '',
          product_name: 'AI太极·SOS RING 智能戒指',
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
          currency: 'USD',
          order_status: 'pending',
          payment_status: 'pending',
          estimated_delivery: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          production_days: 10,
          order_date: new Date().toISOString().split('T')[0]
        };
        setOrderData(mockOrderData);
      }
    } catch (error) {
      console.error('加载订单数据失败:', error);
    } finally {
      setLoading(false);
    }
  };
  const formatPrice = price => {
    return new Intl.NumberFormat('zh-CN', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };
  const formatDate = dateString => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  const handlePayment = () => {
    // 模拟支付流程
    alert('支付功能正在开发中，敬请期待！');
  };
  const handleDownloadInvoice = () => {
    // 模拟下载发票
    alert('发票下载功能正在开发中！');
  };
  const getSizeLabel = size => {
    const sizeMap = {
      small: '小号',
      medium: '中号',
      large: '大号',
      xlarge: '特大号'
    };
    return sizeMap[size] || size;
  };
  const getMaterialLabel = material => {
    const materialMap = {
      titanium: '钛合金',
      ceramic: '精密陶瓷',
      gold: '18K黄金',
      platinum: '铂金'
    };
    return materialMap[material] || material;
  };
  const getColorLabel = color => {
    const colorMap = {
      black: '经典黑',
      silver: '太空银',
      rose: '玫瑰金',
      blue: '深空蓝'
    };
    return colorMap[color] || color;
  };
  const getModuleLabel = moduleId => {
    const moduleMap = {
      sleep: '睡眠优化',
      sos: 'SOS守护',
      health: '健康监测'
    };
    return moduleMap[moduleId] || moduleId;
  };
  if (loading) {
    return <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
          <p className="text-gray-400">加载订单信息中...</p>
        </div>
      </div>;
  }
  if (!orderData) {
    return <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">订单未找到</h2>
          <p className="text-gray-400 mb-8">无法找到您的订单信息</p>
          <Button onClick={() => navigateTo('configurator')} className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-4 text-lg">
            重新配置
          </Button>
        </div>
      </div>;
  }
  return <div className="min-h-screen bg-black text-white">
      <Navigation currentPage="order-confirmation" $w={$w} />

      <div className="max-w-4xl mx-auto px-8 py-24">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-black" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-yellow-500">订单确认成功</span>
          </h1>
          <p className="text-xl text-gray-300">
            感谢您选择AI太极，您的订单已成功创建
          </p>
        </div>

        {/* Order Info Card */}
        <div className="bg-gray-900 rounded-lg p-8 border border-gray-800 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-yellow-500">订单信息</h2>
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={handleDownloadInvoice} className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black">
                <Download className="w-4 h-4 mr-2" />
                下载发票
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold mb-3 text-yellow-500">订单详情</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">订单编号</span>
                    <span className="font-mono">{orderData.order_id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">下单时间</span>
                    <span>{formatDate(orderData.order_date)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">订单状态</span>
                    <span className="text-yellow-500">待支付</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">支付状态</span>
                    <span className="text-orange-500">待支付</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-3 text-yellow-500">客户信息</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <User className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="text-gray-400">姓名：</span>
                    <span className="ml-2">{orderData.user_name}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="text-gray-400">电话：</span>
                    <span className="ml-2">{orderData.user_phone || '未填写'}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="text-gray-400">邮箱：</span>
                    <span className="ml-2">{orderData.user_email || '未填写'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold mb-3 text-yellow-500">产品配置</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">产品</span>
                    <span>{orderData.product_name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">尺寸</span>
                    <span>{getSizeLabel(orderData.configuration?.size)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">材质</span>
                    <span>{getMaterialLabel(orderData.configuration?.material)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">颜色</span>
                    <span>{getColorLabel(orderData.configuration?.color)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">功能模块</span>
                    <span>
                      {Object.keys(orderData.configuration?.modules || {}).filter(key => orderData.configuration.modules[key]).map(key => getModuleLabel(key)).join(', ')}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-3 text-yellow-500">配送信息</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Truck className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="text-gray-400">预计送达：</span>
                    <span className="ml-2">{formatDate(orderData.estimated_delivery)}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="text-gray-400">生产周期：</span>
                    <span className="ml-2">{orderData.production_days || 10}个工作日</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Price Summary */}
        <div className="bg-gray-900 rounded-lg p-8 border border-gray-800 mb-8">
          <h3 className="text-xl font-bold mb-6 text-yellow-500">价格明细</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">基础价格</span>
              <span>$299</span>
            </div>
            {orderData.size_price > 0 && <div className="flex justify-between">
                <span className="text-gray-400">尺寸加价</span>
                <span className="text-yellow-500">+${orderData.size_price}</span>
              </div>}
            {orderData.material_price > 0 && <div className="flex justify-between">
                <span className="text-gray-400">材质加价</span>
                <span className="text-yellow-500">+${orderData.material_price}</span>
              </div>}
            {orderData.color_price > 0 && <div className="flex justify-between">
                <span className="text-gray-400">颜色加价</span>
                <span className="text-yellow-500">+${orderData.color_price}</span>
              </div>}
            {orderData.modules_price > 0 && <div className="flex justify-between">
                <span className="text-gray-400">功能模块</span>
                <span className="text-yellow-500">+${orderData.modules_price}</span>
              </div>}
            <div className="border-t border-gray-700 pt-3">
              <div className="flex justify-between text-xl font-bold">
                <span className="text-yellow-500">总计</span>
                <span className="text-yellow-500">{formatPrice(orderData.total_price)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Button onClick={handlePayment} className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-4 text-lg">
            <CreditCard className="w-5 h-5 mr-2" />
            立即支付
          </Button>
          <div className="grid md:grid-cols-2 gap-4">
            <Button variant="outline" onClick={() => navigateTo('profile')} className="border-gray-700 text-gray-400 hover:border-gray-600 hover:text-white">
              <User className="w-4 h-4 mr-2" />
              查看订单历史
            </Button>
            <Button variant="outline" onClick={() => navigateTo('home')} className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black">
              <Home className="w-4 h-4 mr-2" />
              返回首页
            </Button>
          </div>
        </div>

        {/* Service Promise */}
        <div className="mt-12 bg-gray-900 rounded-lg p-8 border border-gray-800">
          <h3 className="text-xl font-bold mb-6 text-yellow-500">服务承诺</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <Shield className="w-12 h-12 text-yellow-500 mx-auto mb-3" />
              <h4 className="font-bold mb-2">品质保证</h4>
              <p className="text-sm text-gray-400">严格质检，品质无忧</p>
            </div>
            <div className="text-center">
              <Truck className="w-12 h-12 text-yellow-500 mx-auto mb-3" />
              <h4 className="font-bold mb-2">快速配送</h4>
              <p className="text-sm text-gray-400">全球配送，安全快捷</p>
            </div>
            <div className="text-center">
              <Package className="w-12 h-12 text-yellow-500 mx-auto mb-3" />
              <h4 className="font-bold mb-2">售后保障</h4>
              <p className="text-sm text-gray-400">1年质保，终身维护</p>
            </div>
          </div>
        </div>
      </div>
    </div>;
}