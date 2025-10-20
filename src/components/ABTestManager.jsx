// @ts-ignore;
import React, { useState, useEffect, useCallback } from 'react';
// @ts-ignore;
import { Button, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Textarea, Switch } from '@/components/ui';
// @ts-ignore;
import { BarChart3, TestTube, Users, Target, TrendingUp, Clock, Calendar, Settings, Play, Pause, Square, CheckCircle, XCircle, AlertCircle, Plus, Edit2, Trash2, Copy, Download, Eye, RefreshCw, Zap, Award, Filter, ChevronLeft, ChevronRight, X, Save, Globe, Flag, BarChart, PieChart, Activity, Database, FileText, Link, ExternalLink, Share2, MessageSquare, ThumbsUp, ThumbsDown, Star, ArrowUp, ArrowDown, Minus, Archive, Search } from 'lucide-react';

export function ABTestManager({
  abTests = [],
  languages,
  onRefresh,
  $w = null
}) {
  const [tests, setTests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showResultsModal, setShowResultsModal] = useState(false);
  const [selectedTest, setSelectedTest] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [testData, setTestData] = useState({
    name: '',
    description: '',
    type: 'content',
    status: 'planned',
    start_date: '',
    end_date: '',
    target_audience: 'all',
    traffic_allocation: 50,
    variants: [],
    success_metrics: [],
    hypothesis: '',
    confidence_level: 95,
    minimum_sample_size: 1000,
    test_duration: 14,
    language: 'zh',
    region: 'global',
    tags: [],
    notes: ''
  });

  // 测试类型选项
  const testTypes = [{
    value: 'content',
    label: '内容测试'
  }, {
    value: 'design',
    label: '设计测试'
  }, {
    value: 'feature',
    label: '功能测试'
  }, {
    value: 'pricing',
    label: '价格测试'
  }, {
    value: 'layout',
    label: '布局测试'
  }, {
    value: 'copy',
    label: '文案测试'
  }, {
    value: 'cta',
    label: '行动号召测试'
  }, {
    value: 'navigation',
    label: '导航测试'
  }];

  // 状态选项
  const statusOptions = [{
    value: 'all',
    label: '所有状态'
  }, {
    value: 'planned',
    label: '计划中'
  }, {
    value: 'running',
    label: '运行中'
  }, {
    value: 'paused',
    label: '已暂停'
  }, {
    value: 'completed',
    label: '已完成'
  }, {
    value: 'archived',
    label: '已归档'
  }];

  // 目标受众选项
  const audienceOptions = [{
    value: 'all',
    label: '所有用户'
  }, {
    value: 'new_users',
    label: '新用户'
  }, {
    value: 'returning_users',
    label: '回访用户'
  }, {
    value: 'premium_users',
    label: '付费用户'
  }, {
    value: 'free_users',
    label: '免费用户'
  }, {
    value: 'mobile_users',
    label: '移动用户'
  }, {
    value: 'desktop_users',
    label: '桌面用户'
  }];

  // 成功指标选项
  const metricOptions = [{
    value: 'conversion_rate',
    label: '转化率'
  }, {
    value: 'click_through_rate',
    label: '点击率'
  }, {
    value: 'engagement_rate',
    label: '参与度'
  }, {
    value: 'bounce_rate',
    label: '跳出率'
  }, {
    value: 'time_on_page',
    label: '页面停留时间'
  }, {
    value: 'revenue_per_user',
    label: '每用户收入'
  }, {
    value: 'sign_up_rate',
    label: '注册率'
  }, {
    value: 'purchase_rate',
    label: '购买率'
  }];

  // 加载A/B测试数据
  useEffect(() => {
    loadTests();
  }, [currentPage, filterStatus, filterType]);
  const loadTests = async () => {
    setIsLoading(true);
    try {
      if ($w) {
        const result = await $w.cloud.callDataSource({
          dataSourceName: 'ab_test',
          methodName: 'wedaGetRecordsV2',
          params: {
            filter: {
              where: {
                $and: [filterStatus !== 'all' ? {
                  status: {
                    $eq: filterStatus
                  }
                } : {}, filterType !== 'all' ? {
                  type: {
                    $eq: filterType
                  }
                } : {}].filter(condition => Object.keys(condition).length > 0)
              }
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
          setTests(result.records);
          setTotalPages(Math.ceil((result.total || 0) / 20));
        }
      }
    } catch (error) {
      console.error('加载A/B测试失败:', error);
      // 使用示例数据
      const sampleTests = [{
        _id: 'test-1',
        name: '首页标题A/B测试',
        description: '测试不同标题对用户转化的影响',
        type: 'content',
        status: 'running',
        start_date: '2025-01-15T00:00:00Z',
        end_date: '2025-01-29T00:00:00Z',
        target_audience: 'all',
        traffic_allocation: 50,
        variants: [{
          id: 'control',
          name: '控制组',
          description: '原始标题',
          traffic_percentage: 50,
          conversion_rate: 3.2,
          sample_size: 1250,
          confidence_interval: [2.8, 3.6]
        }, {
          id: 'variant_a',
          name: '变体A',
          description: '新标题版本',
          traffic_percentage: 50,
          conversion_rate: 4.1,
          sample_size: 1275,
          confidence_interval: [3.7, 4.5]
        }],
        success_metrics: ['conversion_rate', 'click_through_rate'],
        hypothesis: '更具吸引力的标题将提高转化率',
        confidence_level: 95,
        minimum_sample_size: 1000,
        test_duration: 14,
        language: 'zh',
        region: 'global',
        tags: ['首页', '标题', '转化'],
        notes: '测试进行中，初步结果显示积极趋势',
        statistical_significance: 92.5,
        winner: 'variant_a',
        improvement: 28.1,
        created_at: '2025-01-15T10:00:00Z',
        updated_at: '2025-01-20T15:30:00Z'
      }];
      setTests(sampleTests);
    } finally {
      setIsLoading(false);
    }
  };

  // 创建A/B测试
  const handleCreateTest = () => {
    setTestData({
      name: '',
      description: '',
      type: 'content',
      status: 'planned',
      start_date: '',
      end_date: '',
      target_audience: 'all',
      traffic_allocation: 50,
      variants: [{
        id: 'control',
        name: '控制组',
        description: '原始版本',
        traffic_percentage: 50
      }, {
        id: 'variant_a',
        name: '变体A',
        description: '测试版本',
        traffic_percentage: 50
      }],
      success_metrics: ['conversion_rate'],
      hypothesis: '',
      confidence_level: 95,
      minimum_sample_size: 1000,
      test_duration: 14,
      language: 'zh',
      region: 'global',
      tags: [],
      notes: ''
    });
    setShowCreateModal(true);
  };

  // 编辑A/B测试
  const handleEditTest = test => {
    setSelectedTest(test);
    setTestData({
      name: test.name || '',
      description: test.description || '',
      type: test.type || 'content',
      status: test.status || 'planned',
      start_date: test.start_date || '',
      end_date: test.end_date || '',
      target_audience: test.target_audience || 'all',
      traffic_allocation: test.traffic_allocation || 50,
      variants: test.variants || [],
      success_metrics: test.success_metrics || [],
      hypothesis: test.hypothesis || '',
      confidence_level: test.confidence_level || 95,
      minimum_sample_size: test.minimum_sample_size || 1000,
      test_duration: test.test_duration || 14,
      language: test.language || 'zh',
      region: test.region || 'global',
      tags: test.tags || [],
      notes: test.notes || ''
    });
    setShowEditModal(true);
  };

  // 保存A/B测试
  const handleSaveTest = async () => {
    try {
      const currentUser = $w?.auth?.currentUser;
      const now = new Date().toISOString();
      const saveData = {
        ...testData,
        updated_at: now,
        updated_by: currentUser?.email || 'admin'
      };
      if (showEditModal && selectedTest) {
        // 更新现有测试
        await $w.cloud.callDataSource({
          dataSourceName: 'ab_test',
          methodName: 'wedaUpdateV2',
          params: {
            data: saveData,
            filter: {
              where: {
                _id: {
                  $eq: selectedTest._id
                }
              }
            }
          }
        });
      } else {
        // 创建新测试
        await $w.cloud.callDataSource({
          dataSourceName: 'ab_test',
          methodName: 'wedaCreateV2',
          params: {
            data: {
              ...saveData,
              created_at: now,
              created_by: currentUser?.email || 'admin'
            }
          }
        });
      }
      setShowCreateModal(false);
      setShowEditModal(false);
      loadTests();
    } catch (error) {
      console.error('保存A/B测试失败:', error);
      alert('保存失败，请重试');
    }
  };

  // 删除A/B测试
  const handleDeleteTest = async id => {
    if (confirm('确定要删除这个A/B测试吗？')) {
      try {
        await $w.cloud.callDataSource({
          dataSourceName: 'ab_test',
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
        loadTests();
      } catch (error) {
        console.error('删除A/B测试失败:', error);
        alert('删除失败，请重试');
      }
    }
  };

  // 启动/暂停/停止测试
  const handleTestAction = async (testId, action) => {
    try {
      const statusMap = {
        'start': 'running',
        'pause': 'paused',
        'stop': 'completed',
        'archive': 'archived'
      };
      await $w.cloud.callDataSource({
        dataSourceName: 'ab_test',
        methodName: 'wedaUpdateV2',
        params: {
          data: {
            status: statusMap[action],
            updated_at: new Date().toISOString()
          },
          filter: {
            where: {
              _id: {
                $eq: testId
              }
            }
          }
        }
      });
      loadTests();
    } catch (error) {
      console.error('操作失败:', error);
      alert('操作失败，请重试');
    }
  };

  // 添加变体
  const addVariant = () => {
    const newVariant = {
      id: `variant_${Date.now()}`,
      name: `变体${String.fromCharCode(65 + testData.variants.length - 1)}`,
      description: '',
      traffic_percentage: 0
    };
    setTestData({
      ...testData,
      variants: [...testData.variants, newVariant]
    });
  };

  // 删除变体
  const removeVariant = index => {
    const newVariants = testData.variants.filter((_, i) => i !== index);
    setTestData({
      ...testData,
      variants: newVariants
    });
  };

  // 更新变体
  const updateVariant = (index, field, value) => {
    const newVariants = [...testData.variants];
    newVariants[index] = {
      ...newVariants[index],
      [field]: value
    };
    setTestData({
      ...testData,
      variants: newVariants
    });
  };

  // 计算统计显著性
  const calculateStatisticalSignificance = (control, variant) => {
    // 简化的统计显著性计算
    const controlRate = control.conversion_rate || 0;
    const variantRate = variant.conversion_rate || 0;
    const controlSize = control.sample_size || 1;
    const variantSize = variant.sample_size || 1;
    const pooledRate = (controlRate * controlSize + variantRate * variantSize) / (controlSize + variantSize);
    const standardError = Math.sqrt(pooledRate * (1 - pooledRate) * (1 / controlSize + 1 / variantSize));
    const zScore = Math.abs(variantRate - controlRate) / standardError;
    const significance = (1 - normalCDF(zScore)) * 2 * 100; // 双尾检验

    return Math.min(99.9, Math.max(0, 100 - significance));
  };

  // 正态分布累积分布函数
  const normalCDF = x => {
    const a1 = 0.254829592;
    const a2 = -0.284496736;
    const a3 = 1.421413741;
    const a4 = -1.453152027;
    const a5 = 1.061405429;
    const p = 0.3275911;
    const sign = x < 0 ? -1 : 1;
    x = Math.abs(x) / Math.sqrt(2.0);
    const t = 1.0 / (1.0 + p * x);
    const y = 1.0 - ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
    return 0.5 * (1.0 + sign * y);
  };

  // 获取状态图标
  const getStatusIcon = status => {
    switch (status) {
      case 'running':
        return <Play className="w-5 h-5 text-green-500" />;
      case 'paused':
        return <Pause className="w-5 h-5 text-yellow-500" />;
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-blue-500" />;
      case 'archived':
        return <Archive className="w-5 h-5 text-gray-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  // 获取状态文本
  const getStatusText = status => {
    const statusMap = {
      'planned': '计划中',
      'running': '运行中',
      'paused': '已暂停',
      'completed': '已完成',
      'archived': '已归档'
    };
    return statusMap[status] || status;
  };

  // 格式化日期
  const formatDate = dateString => {
    return new Date(dateString).toLocaleString('zh-CN');
  };

  // 过滤测试
  const filteredTests = tests.filter(test => {
    const matchesSearch = !searchTerm || test.name.toLowerCase().includes(searchTerm.toLowerCase()) || test.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });
  return <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-yellow-500 flex items-center">
          <TestTube className="w-6 h-6 mr-2" />
          A/B测试管理
        </h3>
        <div className="flex items-center space-x-3">
          <Button onClick={loadTests} variant="outline" size="sm" className="border-gray-700 text-gray-400">
            <RefreshCw className="w-4 h-4 mr-2" />
            刷新
          </Button>
          <Button onClick={handleCreateTest} className="bg-yellow-500 hover:bg-yellow-600 text-black">
            <Plus className="w-4 h-4 mr-2" />
            创建测试
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="搜索测试..." className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500" />
          </div>
          
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="bg-gray-800 border-gray-700">
              <SelectValue placeholder="选择状态" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map(option => <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>)}
            </SelectContent>
          </Select>
          
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="bg-gray-800 border-gray-700">
              <SelectValue placeholder="选择类型" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">所有类型</SelectItem>
              {testTypes.map(type => <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>)}
            </SelectContent>
          </Select>
          
          <Button onClick={() => {
          setSearchTerm('');
          setFilterStatus('all');
          setFilterType('all');
        }} variant="outline" className="border-gray-700 text-gray-400">
            <Filter className="w-4 h-4 mr-2" />
            重置
          </Button>
        </div>
      </div>

      {/* Tests List */}
      <div className="space-y-4">
        {isLoading ? <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500"></div>
            <span className="ml-3 text-gray-400">加载中...</span>
          </div> : filteredTests.length === 0 ? <div className="text-center py-12">
            <TestTube className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-gray-400 mb-2">暂无A/B测试</h4>
            <p className="text-gray-500">创建您的第一个A/B测试来开始优化</p>
          </div> : filteredTests.map(test => {
        const isRunning = test.status === 'running';
        const hasWinner = test.winner;
        const improvement = test.improvement || 0;
        return <div key={test._id} className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      {getStatusIcon(test.status)}
                      <h4 className="text-lg font-medium text-white ml-2">{test.name}</h4>
                      <span className="ml-3 px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded">
                        {testTypes.find(t => t.value === test.type)?.label}
                      </span>
                      {hasWinner && <span className="ml-2 px-2 py-1 bg-green-500/20 text-green-500 text-xs rounded">
                          有胜者
                        </span>}
                    </div>
                    
                    <p className="text-gray-300 mb-4">{test.description}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <div className="text-sm text-gray-400">状态</div>
                        <div className="font-medium text-white">{getStatusText(test.status)}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">开始时间</div>
                        <div className="font-medium text-white">{formatDate(test.start_date)}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">流量分配</div>
                        <div className="font-medium text-white">{test.traffic_allocation}%</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">变体数量</div>
                        <div className="font-medium text-white">{test.variants?.length || 0}</div>
                      </div>
                    </div>

                    {/* Variants Performance */}
                    {test.variants && test.variants.length > 0 && <div className="mb-4">
                        <h5 className="text-sm font-medium text-gray-300 mb-2">变体表现</h5>
                        <div className="space-y-2">
                          {test.variants.map((variant, index) => {
                    const isWinner = test.winner === variant.id;
                    const conversionRate = variant.conversion_rate || 0;
                    return <div key={variant.id} className="flex items-center justify-between p-2 bg-gray-800 rounded">
                                <div className="flex items-center">
                                  <span className="font-medium text-white mr-2">{variant.name}</span>
                                  {isWinner && <Award className="w-4 h-4 text-yellow-500 mr-2" />}
                                  <span className="text-sm text-gray-400">{variant.description}</span>
                                </div>
                                <div className="flex items-center space-x-4">
                                  <span className="text-sm text-gray-400">{variant.traffic_percentage}% 流量</span>
                                  <span className="font-medium text-white">{conversionRate}% 转化率</span>
                                  {variant.sample_size && <span className="text-sm text-gray-400">{variant.sample_size} 样本</span>}
                                </div>
                              </div>;
                  })}
                        </div>
                      </div>}

                    {/* Test Results */}
                    {test.status === 'completed' && <div className="mb-4">
                        <div className="flex items-center justify-between p-3 bg-gray-800 rounded">
                          <div>
                            <div className="text-sm text-gray-400">统计显著性</div>
                            <div className="font-medium text-white">{test.statistical_significance || 0}%</div>
                          </div>
                          {improvement !== 0 && <div>
                            <div className="text-sm text-gray-400">改进幅度</div>
                            <div className={`font-medium ${improvement > 0 ? 'text-green-500' : 'text-red-500'}`}>
                              {improvement > 0 ? '+' : ''}{improvement.toFixed(1)}%
                            </div>
                          </div>}
                        </div>
                      </div>}
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <Button onClick={() => handleEditTest(test)} variant="outline" size="sm" className="border-gray-700 text-gray-400">
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button onClick={() => setShowResultsModal(true)} variant="outline" size="sm" className="border-gray-700 text-gray-400">
                      <BarChart3 className="w-4 h-4" />
                    </Button>
                    {isRunning && <Button onClick={() => handleTestAction(test._id, 'pause')} variant="outline" size="sm" className="border-yellow-700 text-yellow-400">
                        <Pause className="w-4 h-4" />
                      </Button>}
                    {test.status === 'paused' && <Button onClick={() => handleTestAction(test._id, 'start')} variant="outline" size="sm" className="border-green-700 text-green-400">
                        <Play className="w-4 h-4" />
                      </Button>}
                    {test.status === 'planned' && <Button onClick={() => handleTestAction(test._id, 'start')} variant="outline" size="sm" className="border-green-700 text-green-400">
                        <Play className="w-4 h-4" />
                      </Button>}
                    <Button onClick={() => handleDeleteTest(test._id)} variant="outline" size="sm" className="border-red-500 text-red-500">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>;
      })}
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

      {/* Create/Edit Modal */}
      {(showCreateModal || showEditModal) && <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-xl border border-gray-800 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-yellow-500">
                  {showCreateModal ? '创建A/B测试' : '编辑A/B测试'}
                </h3>
                <button onClick={() => {
              setShowCreateModal(false);
              setShowEditModal(false);
            }} className="text-gray-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">测试名称</label>
                    <Input value={testData.name} onChange={e => setTestData({
                  ...testData,
                  name: e.target.value
                })} placeholder="输入测试名称" className="bg-gray-800 border-gray-700" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">测试类型</label>
                    <Select value={testData.type} onValueChange={value => setTestData({
                  ...testData,
                  type: value
                })}>
                      <SelectTrigger className="bg-gray-800 border-gray-700">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {testTypes.map(type => <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">测试描述</label>
                  <Textarea value={testData.description} onChange={e => setTestData({
                ...testData,
                description: e.target.value
              })} placeholder="描述测试目标和背景" rows={3} className="bg-gray-800 border-gray-700" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">假设</label>
                  <Textarea value={testData.hypothesis} onChange={e => setTestData({
                ...testData,
                hypothesis: e.target.value
              })} placeholder="描述您的测试假设" rows={2} className="bg-gray-800 border-gray-700" />
                </div>

                {/* Test Configuration */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">开始日期</label>
                    <Input type="datetime-local" value={testData.start_date} onChange={e => setTestData({
                  ...testData,
                  start_date: e.target.value
                })} className="bg-gray-800 border-gray-700" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">结束日期</label>
                    <Input type="datetime-local" value={testData.end_date} onChange={e => setTestData({
                  ...testData,
                  end_date: e.target.value
                })} className="bg-gray-800 border-gray-700" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">目标受众</label>
                    <Select value={testData.target_audience} onValueChange={value => setTestData({
                  ...testData,
                  target_audience: value
                })}>
                      <SelectTrigger className="bg-gray-800 border-gray-700">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {audienceOptions.map(option => <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Variants */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-medium text-gray-300">测试变体</label>
                    <Button onClick={addVariant} variant="outline" size="sm" className="border-gray-700 text-gray-400">
                      <Plus className="w-4 h-4 mr-2" />
                      添加变体
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {testData.variants.map((variant, index) => <div key={variant.id} className="p-4 bg-gray-800 rounded-lg border border-gray-700">
                        <div className="flex items-center justify-between mb-3">
                          <Input value={variant.name} onChange={e => updateVariant(index, 'name', e.target.value)} placeholder="变体名称" className="bg-gray-700 border-gray-600 flex-1 mr-2" />
                          {testData.variants.length > 2 && <Button onClick={() => removeVariant(index)} variant="outline" size="sm" className="border-red-500 text-red-500">
                              <Trash2 className="w-4 h-4" />
                            </Button>}
                        </div>
                        <Textarea value={variant.description} onChange={e => updateVariant(index, 'description', e.target.value)} placeholder="变体描述" rows={2} className="bg-gray-700 border-gray-600 mb-3" />
                        <div className="flex items-center space-x-4">
                          <div className="flex-1">
                            <label className="block text-xs text-gray-400 mb-1">流量分配 (%)</label>
                            <Input type="number" value={variant.traffic_percentage} onChange={e => updateVariant(index, 'traffic_percentage', parseInt(e.target.value) || 0)} min="0" max="100" className="bg-gray-700 border-gray-600" />
                          </div>
                        </div>
                      </div>)}
                  </div>
                </div>

                {/* Success Metrics */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">成功指标</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {metricOptions.map(metric => <label key={metric.value} className="flex items-center space-x-2">
                        <input type="checkbox" checked={testData.success_metrics.includes(metric.value)} onChange={e => {
                    if (e.target.checked) {
                      setTestData({
                        ...testData,
                        success_metrics: [...testData.success_metrics, metric.value]
                      });
                    } else {
                      setTestData({
                        ...testData,
                        success_metrics: testData.success_metrics.filter(m => m !== metric.value)
                      });
                    }
                  }} className="rounded" />
                        <span className="text-sm text-gray-300">{metric.label}</span>
                      </label>)}
                  </div>
                </div>

                {/* Statistical Settings */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">置信水平 (%)</label>
                    <Select value={testData.confidence_level.toString()} onValueChange={value => setTestData({
                  ...testData,
                  confidence_level: parseInt(value)
                })}>
                      <SelectTrigger className="bg-gray-800 border-gray-700">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="90">90%</SelectItem>
                        <SelectItem value="95">95%</SelectItem>
                        <SelectItem value="99">99%</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">最小样本量</label>
                    <Input type="number" value={testData.minimum_sample_size} onChange={e => setTestData({
                  ...testData,
                  minimum_sample_size: parseInt(e.target.value) || 1000
                })} min="100" className="bg-gray-800 border-gray-700" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">测试天数</label>
                    <Input type="number" value={testData.test_duration} onChange={e => setTestData({
                  ...testData,
                  test_duration: parseInt(e.target.value) || 14
                })} min="1" className="bg-gray-800 border-gray-700" />
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">备注</label>
                  <Textarea value={testData.notes} onChange={e => setTestData({
                ...testData,
                notes: e.target.value
              })} placeholder="添加备注信息..." rows={3} className="bg-gray-800 border-gray-700" />
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <Button onClick={() => {
              setShowCreateModal(false);
              setShowEditModal(false);
            }} variant="outline" className="flex-1 border-gray-700 text-gray-400">
                  取消
                </Button>
                <Button onClick={handleSaveTest} className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black">
                  <Save className="w-4 h-4 mr-2" />
                  保存
                </Button>
              </div>
            </div>
          </div>
        </div>}

      {/* Results Modal */}
      {showResultsModal && <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-xl border border-gray-800 w-full max-w-6xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-yellow-500">测试结果分析</h3>
                <button onClick={() => setShowResultsModal(false)} className="text-gray-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Results content would go here */}
              <div className="text-center py-12">
                <BarChart3 className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-400 mb-2">结果分析功能</h4>
                <p className="text-gray-500">详细的测试结果分析图表正在开发中</p>
              </div>
            </div>
          </div>
        </div>}
    </div>;
}