// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';
// @ts-ignore;
import { ArrowLeft, TrendingUp, TrendingDown, Users, Package, Settings, MessageCircle, BarChart3, Download, Calendar, Filter, RefreshCw, Eye, DollarSign, Activity, Target, PieChart, LineChart, BarChart } from 'lucide-react';

import { Navigation } from '@/components/Navigation';
import { AuthGuard } from '@/components/AuthGuard';
export default function Analytics(props) {
  const {
    $w
  } = props;
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('30d');
  const [loading, setLoading] = useState(true);
  const [analyticsData, setAnalyticsData] = useState({});
  const navigateTo = pageId => {
    $w.utils.navigateTo({
      pageId,
      params: {}
    });
  };
  useEffect(() => {
    loadAnalyticsData();
  }, [activeTab, timeRange]);
  const loadAnalyticsData = async () => {
    try {
      setLoading(true);
      // 模拟加载分析数据
      const mockData = {
        overview: {
          totalUsers: 1250,
          newUsers: 89,
          activeUsers: 890,
          totalOrders: 3420,
          totalRevenue: 1250000,
          avgOrderValue: 365.5,
          conversionRate: 12.3,
          satisfactionRate: 94.2
        },
        userGrowth: [{
          date: '2024-01-01',
          users: 980,
          newUsers: 12,
          activeUsers: 720
        }, {
          date: '2024-01-02',
          users: 992,
          newUsers: 15,
          activeUsers: 735
        }, {
          date: '2024-01-03',
          users: 1007,
          newUsers: 18,
          activeUsers: 748
        }, {
          date: '2024-01-04',
          users: 1025,
          newUsers: 22,
          activeUsers: 762
        }, {
          date: '2024-01-05',
          users: 1047,
          newUsers: 25,
          activeUsers: 780
        }, {
          date: '2024-01-06',
          users: 1072,
          newUsers: 28,
          activeUsers: 795
        }, {
          date: '2024-01-07',
          users: 1100,
          newUsers: 32,
          activeUsers: 810
        }],
        orderAnalysis: {
          dailyOrders: [{
            date: '2024-01-01',
            orders: 45,
            revenue: 16425
          }, {
            date: '2024-01-02',
            orders: 52,
            revenue: 18980
          }, {
            date: '2024-01-03',
            orders: 48,
            revenue: 17520
          }, {
            date: '2024-01-04',
            orders: 61,
            revenue: 22265
          }, {
            date: '2024-01-05',
            orders: 58,
            revenue: 21170
          }, {
            date: '2024-01-06',
            orders: 67,
            revenue: 24455
          }, {
            date: '2024-01-07',
            orders: 72,
            revenue: 26280
          }],
          productSales: [{
            product: 'AI太极·SOS RING 基础版',
            sales: 1250,
            revenue: 374750
          }, {
            product: 'AI太极·SOS RING 专业版',
            sales: 890,
            revenue: 355600
          }, {
            product: 'AI太极·SOS RING 尊享版',
            sales: 450,
            revenue: 224550
          }]
        },
        configurationStats: {
          sizeDistribution: [{
            size: '小号',
            count: 320,
            percentage: 25.6
          }, {
            size: '中号',
            count: 580,
            percentage: 46.4
          }, {
            size: '大号',
            count: 280,
            percentage: 22.4
          }, {
            size: '特大号',
            count: 70,
            percentage: 5.6
          }],
          materialDistribution: [{
            material: '钛合金',
            count: 750,
            percentage: 60.0
          }, {
            material: '精密陶瓷',
            count: 320,
            percentage: 25.6
          }, {
            material: '18K黄金',
            count: 150,
            percentage: 12.0
          }, {
            material: '铂金',
            count: 30,
            percentage: 2.4
          }],
          moduleUsage: [{
            module: '睡眠优化',
            usage: 1120,
            percentage: 89.6
          }, {
            module: 'SOS守护',
            usage: 1180,
            percentage: 94.4
          }, {
            module: '健康监测',
            usage: 680,
            percentage: 54.4
          }]
        },
        consultationAnalytics: {
          typeDistribution: [{
            type: '产品咨询',
            count: 450,
            percentage: 36.0
          }, {
            type: '技术支持',
            count: 320,
            percentage: 25.6
          }, {
            type: '健康咨询',
            count: 280,
            percentage: 22.4
          }, {
            type: '合作洽谈',
            count: 150,
            percentage: 12.0
          }, {
            type: '其他咨询',
            count: 50,
            percentage: 4.0
          }],
          responseTime: [{
            date: '2024-01-01',
            avgTime: 15,
            satisfaction: 92
          }, {
            date: '2024-01-02',
            avgTime: 12,
            satisfaction: 94
          }, {
            date: '2024-01-03',
            avgTime: 18,
            satisfaction: 89
          }, {
            date: '2024-01-04',
            avgTime: 10,
            satisfaction: 96
          }, {
            date: '2024-01-05',
            avgTime: 14,
            satisfaction: 93
          }, {
            date: '2024-01-06',
            avgTime: 11,
            satisfaction: 95
          }, {
            date: '2024-01-07',
            avgTime: 13,
            satisfaction: 94
          }]
        }
      };
      setAnalyticsData(mockData);
    } catch (error) {
      console.error('加载分析数据失败:', error);
    } finally {
      setLoading(false);
    }
  };
  const formatCurrency = amount => {
    return new Intl.NumberFormat('zh-CN', {
      style: 'currency',
      currency: 'CNY'
    }).format(amount);
  };
  const formatPercentage = value => {
    return `${value.toFixed(1)}%`;
  };
  const analyticsTabs = [{
    id: 'overview',
    label: '数据概览',
    icon: BarChart3
  }, {
    id: 'users',
    label: '用户分析',
    icon: Users
  }, {
    id: 'orders',
    label: '订单分析',
    icon: Package
  }, {
    id: 'configurations',
    label: '配置分析',
    icon: Settings
  }, {
    id: 'consultations',
    label: '咨询分析',
    icon: MessageCircle
  }];
  const timeRanges = [{
    value: '7d',
    label: '最近7天'
  }, {
    value: '30d',
    label: '最近30天'
  }, {
    value: '90d',
    label: '最近90天'
  }, {
    value: '1y',
    label: '最近1年'
  }];
  // 简化的图表组件
  const SimpleLineChart = ({
    data,
    dataKey,
    color = '#EAB308'
  }) => {
    const maxValue = Math.max(...data.map(d => d[dataKey]));
    const minValue = Math.min(...data.map(d => d[dataKey]));
    const range = maxValue - minValue;
    return <div className="h-64 flex items-end justify-between space-x-1">
        {data.map((point, index) => {
        const height = range > 0 ? (point[dataKey] - minValue) / range * 100 : 50;
        return <div key={index} className="flex-1 flex flex-col items-center">
            <div className="w-full bg-gray-700 rounded-t relative" style={{
            height: '200px'
          }}>
              <div className="absolute bottom-0 w-full bg-yellow-500 rounded-t transition-all duration-300" style={{
              height: `${height}%`
            }} />
            </div>
            <div className="text-xs text-gray-400 mt-1">
              {new Date(point.date).getDate()}
            </div>
          </div>;
      })}
      </div>;
  };
  const SimpleBarChart = ({
    data,
    dataKey,
    color = '#EAB308'
  }) => {
    const maxValue = Math.max(...data.map(d => d[dataKey]));
    return <div className="h-64 flex items-end justify-between space-x-2">
        {data.map((item, index) => {
        const height = maxValue > 0 ? item[dataKey] / maxValue * 100 : 50;
        return <div key={index} className="flex-1 flex flex-col items-center">
            <div className="w-full bg-gray-700 rounded-t relative" style={{
            height: '200px'
          }}>
              <div className="absolute bottom-0 w-full bg-yellow-500 rounded-t transition-all duration-300" style={{
              height: `${height}%`
            }} />
            </div>
            <div className="text-xs text-gray-400 mt-1 truncate w-full text-center">
              {item.product?.substring(0, 8) || item.type?.substring(0, 8)}
            </div>
          </div>;
      })}
      </div>;
  };
  const SimplePieChart = ({
    data
  }) => {
    const total = data.reduce((sum, item) => sum + item.count, 0);
    let currentAngle = 0;
    const colors = ['#EAB308', '#3B82F6', '#10B981', '#EF4444', '#8B5CF6'];
    return <div className="h-64 flex items-center justify-center">
        <div className="relative">
          <div className="w-48 h-48 rounded-full border-8 border-gray-700">
            {data.map((item, index) => {
            const percentage = item.count / total * 100;
            const angle = percentage / 100 * 360;
            const startAngle = currentAngle;
            const endAngle = currentAngle + angle;
            currentAngle += angle;
            return <div key={index} className="absolute inset-0 rounded-full" style={{
              background: `conic-gradient(${colors[index]} ${startAngle}deg ${endAngle}deg, transparent ${endAngle}deg)`
            }} />;
          })}
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-500">{total}</div>
              <div className="text-sm text-gray-400">总计</div>
            </div>
          </div>
        </div>
      </div>;
  };
  if (loading) {
    return <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
          <p className="text-gray-400">加载分析数据中...</p>
        </div>
      </div>;
  }
  return <AuthGuard $w={$w} requiredPermissions={['admin']}>
      <div className="min-h-screen bg-black text-white">
        <Navigation currentPage="analytics" $w={$w} />

        <div className="max-w-7xl mx-auto px-8 py-24">
          {/* Header */}
          <div className="mb-8">
            <button onClick={() => navigateTo('admin')} className="flex items-center text-gray-400 hover:text-yellow-500 transition-colors mb-4">
              <ArrowLeft className="w-5 h-5 mr-2" />
              返回管理后台
            </button>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-yellow-500">数据分析</span>
            </h1>
            <p className="text-xl text-gray-300">
              全面的业务数据洞察和趋势分析
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-gray-400" />
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger className="bg-gray-900 border-gray-700 text-white w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-700">
                    {timeRanges.map(range => <SelectItem key={range.value} value={range.value} className="text-white">
                        {range.label}
                      </SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="border-gray-700 text-gray-400 hover:border-gray-600 hover:text-white">
                <RefreshCw className="w-4 h-4 mr-2" />
                刷新数据
              </Button>
              <Button variant="outline" className="border-gray-700 text-gray-400 hover:border-gray-600 hover:text-white">
                <Download className="w-4 h-4 mr-2" />
                导出报表
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 mb-8 bg-gray-900 rounded-lg p-1 border border-gray-800">
            {analyticsTabs.map(tab => {
            const Icon = tab.icon;
            return <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${activeTab === tab.id ? 'bg-yellow-500 text-black' : 'text-gray-400 hover:text-yellow-500'}`}>
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>;
          })}
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && <div className="space-y-8">
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                  <div className="flex items-center justify-between mb-4">
                    <Users className="w-8 h-8 text-blue-500" />
                    <div className="flex items-center text-green-500 text-sm">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      12.5%
                    </div>
                  </div>
                  <div className="text-2xl font-bold mb-2">{analyticsData.overview?.totalUsers.toLocaleString()}</div>
                  <div className="text-gray-400 text-sm">总用户数</div>
                </div>
                
                <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                  <div className="flex items-center justify-between mb-4">
                    <Package className="w-8 h-8 text-yellow-500" />
                    <div className="flex items-center text-green-500 text-sm">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      8.3%
                    </div>
                  </div>
                  <div className="text-2xl font-bold mb-2">{analyticsData.overview?.totalOrders.toLocaleString()}</div>
                  <div className="text-gray-400 text-sm">总订单数</div>
                </div>
                
                <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                  <div className="flex items-center justify-between mb-4">
                    <DollarSign className="w-8 h-8 text-green-500" />
                    <div className="flex items-center text-green-500 text-sm">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      15.2%
                    </div>
                  </div>
                  <div className="text-2xl font-bold mb-2">{formatCurrency(analyticsData.overview?.totalRevenue)}</div>
                  <div className="text-gray-400 text-sm">总收入</div>
                </div>
                
                <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                  <div className="flex items-center justify-between mb-4">
                    <Target className="w-8 h-8 text-purple-500" />
                    <div className="flex items-center text-red-500 text-sm">
                      <TrendingDown className="w-4 h-4 mr-1" />
                      2.1%
                    </div>
                  </div>
                  <div className="text-2xl font-bold mb-2">{formatPercentage(analyticsData.overview?.conversionRate)}</div>
                  <div className="text-gray-400 text-sm">转化率</div>
                </div>
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                  <h3 className="text-xl font-bold text-yellow-500 mb-6">用户增长趋势</h3>
                  <SimpleLineChart data={analyticsData.userGrowth} dataKey="newUsers" />
                </div>
                
                <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                  <h3 className="text-xl font-bold text-yellow-500 mb-6">订单趋势</h3>
                  <SimpleLineChart data={analyticsData.orderAnalysis?.dailyOrders} dataKey="orders" color="#3B82F6" />
                </div>
              </div>
            </div>}

          {/* Users Analysis Tab */}
          {activeTab === 'users' && <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                  <h3 className="text-lg font-bold text-yellow-500 mb-4">新增用户</h3>
                  <div className="text-3xl font-bold text-blue-500 mb-2">{analyticsData.overview?.newUsers}</div>
                  <div className="text-sm text-gray-400">本期新增</div>
                </div>
                
                <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                  <h3 className="text-lg font-bold text-yellow-500 mb-4">活跃用户</h3>
                  <div className="text-3xl font-bold text-green-500 mb-2">{analyticsData.overview?.activeUsers}</div>
                  <div className="text-sm text-gray-400">当前活跃</div>
                </div>
                
                <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                  <h3 className="text-lg font-bold text-yellow-500 mb-4">活跃率</h3>
                  <div className="text-3xl font-bold text-purple-500 mb-2">
                    {formatPercentage(analyticsData.overview?.activeUsers / analyticsData.overview?.totalUsers * 100)}
                  </div>
                  <div className="text-sm text-gray-400">用户活跃度</div>
                </div>
              </div>

              <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                <h3 className="text-xl font-bold text-yellow-500 mb-6">用户增长趋势</h3>
                <SimpleLineChart data={analyticsData.userGrowth} dataKey="users" />
              </div>
            </div>}

          {/* Orders Analysis Tab */}
          {activeTab === 'orders' && <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                  <h3 className="text-lg font-bold text-yellow-500 mb-4">总订单数</h3>
                  <div className="text-3xl font-bold text-yellow-500 mb-2">{analyticsData.overview?.totalOrders.toLocaleString()}</div>
                  <div className="text-sm text-gray-400">累计订单</div>
                </div>
                
                <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                  <h3 className="text-lg font-bold text-yellow-500 mb-4">平均订单价值</h3>
                  <div className="text-3xl font-bold text-green-500 mb-2">{formatCurrency(analyticsData.overview?.avgOrderValue)}</div>
                  <div className="text-sm text-gray-400">客单价</div>
                </div>
                
                <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                  <h3 className="text-lg font-bold text-yellow-500 mb-4">总收入</h3>
                  <div className="text-3xl font-bold text-blue-500 mb-2">{formatCurrency(analyticsData.overview?.totalRevenue)}</div>
                  <div className="text-sm text-gray-400">累计收入</div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                  <h3 className="text-xl font-bold text-yellow-500 mb-6">每日订单趋势</h3>
                  <SimpleLineChart data={analyticsData.orderAnalysis?.dailyOrders} dataKey="orders" />
                </div>
                
                <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                  <h3 className="text-xl font-bold text-yellow-500 mb-6">产品销售分布</h3>
                  <SimpleBarChart data={analyticsData.orderAnalysis?.productSales} dataKey="sales" color="#10B981" />
                </div>
              </div>
            </div>}

          {/* Configurations Analysis Tab */}
          {activeTab === 'configurations' && <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                  <h3 className="text-xl font-bold text-yellow-500 mb-6">尺寸分布</h3>
                  <SimplePieChart data={analyticsData.configurationStats?.sizeDistribution} />
                  <div className="mt-4 space-y-2">
                    {analyticsData.configurationStats?.sizeDistribution.map((item, index) => <div key={index} className="flex justify-between text-sm">
                        <span className="text-gray-400">{item.size}</span>
                        <span className="text-white">{item.count} ({formatPercentage(item.percentage)})</span>
                      </div>)}
                  </div>
                </div>
                
                <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                  <h3 className="text-xl font-bold text-yellow-500 mb-6">材质分布</h3>
                  <SimplePieChart data={analyticsData.configurationStats?.materialDistribution} />
                  <div className="mt-4 space-y-2">
                    {analyticsData.configurationStats?.materialDistribution.map((item, index) => <div key={index} className="flex justify-between text-sm">
                        <span className="text-gray-400">{item.material}</span>
                        <span className="text-white">{item.count} ({formatPercentage(item.percentage)})</span>
                      </div>)}
                  </div>
                </div>
                
                <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                  <h3 className="text-xl font-bold text-yellow-500 mb-6">功能模块使用率</h3>
                  <div className="space-y-4">
                    {analyticsData.configurationStats?.moduleUsage.map((module, index) => <div key={index}>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-400">{module.module}</span>
                          <span className="text-white">{formatPercentage(module.percentage)}</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div className="bg-yellow-500 h-2 rounded-full transition-all duration-300" style={{
                      width: `${module.percentage}%`
                    }} />
                        </div>
                      </div>)}
                  </div>
                </div>
              </div>
            </div>}

          {/* Consultations Analysis Tab */}
          {activeTab === 'consultations' && <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                  <h3 className="text-xl font-bold text-yellow-500 mb-6">咨询类型分布</h3>
                  <SimplePieChart data={analyticsData.consultationAnalytics?.typeDistribution} />
                  <div className="mt-4 space-y-2">
                    {analyticsData.consultationAnalytics?.typeDistribution.map((item, index) => <div key={index} className="flex justify-between text-sm">
                        <span className="text-gray-400">{item.type}</span>
                        <span className="text-white">{item.count} ({formatPercentage(item.percentage)})</span>
                      </div>)}
                  </div>
                </div>
                
                <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                  <h3 className="text-xl font-bold text-yellow-500 mb-6">响应时间与满意度</h3>
                  <div className="space-y-4">
                    {analyticsData.consultationAnalytics?.responseTime.map((item, index) => <div key={index} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                        <div>
                          <div className="text-sm text-gray-400">{new Date(item.date).toLocaleDateString()}</div>
                          <div className="text-lg font-medium text-white">平均响应: {item.avgTime}分钟</div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-green-500">{item.satisfaction}%</div>
                          <div className="text-sm text-gray-400">满意度</div>
                        </div>
                      </div>)}
                  </div>
                </div>
              </div>
            </div>}
        </div>
      </div>
    </AuthGuard>;
}