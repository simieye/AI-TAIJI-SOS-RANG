
// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Button, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';
// @ts-ignore;
import { BarChart3, Plus, Edit2, Trash2, Play, Pause, Eye, Users, Target, TrendingUp, Clock, CheckCircle, XCircle, AlertCircle, Settings, Download, Copy } from 'lucide-react';

export function ABTestManager({
  abTests,
  languages,
  onRefresh
}) {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedTest, setSelectedTest] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    targetLanguage: 'all',
    targetRegion: 'all',
    trafficSplit: 50,
    variants: [
      { name: '版本A', content: '', weight: 50 },
      { name: '版本B', content: '', weight: 50 }
    ],
    status: 'draft',
    startDate: '',
    endDate: '',
    successMetric: 'conversion',
    minSampleSize: 1000
  });

  const testStatuses = [
    { value: 'draft', label: '草稿', icon: FileText, color: 'text-gray-500' },
    { value: 'running', label: '运行中', icon: Play, color: 'text-green-500' },
    { value: 'paused', label: '已暂停', icon: Pause, color: 'text-yellow-500' },
    { value: 'completed', label: '已完成', icon: CheckCircle, color: 'text-blue-500' },
    { value: 'failed', label: '失败', icon: XCircle, color: 'text-red-500' }
  ];

  const successMetrics = [
    { value: 'conversion', label: '转化率' },
    { value: 'clicks', label: '点击率' },
    { value: 'engagement', label: '互动率' },
    { value: 'time_on_page', label: '页面停留时间' },
    { value: 'bounce_rate', label: '跳出率' }
  ];

  const regions = [
    { value: 'all', label: '全球' },
    { value: 'cn', label: '中国大陆' },
    { value: 'us', label: '美国' },
    { value: 'eu', label: '欧洲' },
    { value: 'jp', label: '日本' },
    { value: 'kr', label: '韩国' }
  ];

  const handleCreateTest = () => {
    setFormData({
      name: '',
      description: '',
      targetLanguage: 'all',
      targetRegion: 'all',
      trafficSplit: 50,
      variants: [
        { name: '版本A', content: '', weight: 50 },
        { name: '版本B', content: '', weight: 50 }
      ],
      status: 'draft',
      startDate: '',
      endDate: '',
      successMetric: 'conversion',
      minSampleSize: 1000
    });
    setShowCreateModal(true);
  };

  const handleEditTest = (test) => {
    setSelectedTest(test);
    setFormData({
      name: test.name || '',
      description: test.description || '',
      targetLanguage: test.target_language || 'all',
      targetRegion: test.target_region || 'all',
      trafficSplit: test.traffic_split || 50,
      variants: test.variants || [
        { name: '版本A', content: '', weight: 50 },
        { name: '版本B', content: '', weight: 50 }
      ],
      status: test.status || 'draft',
      startDate: test.start_date || '',
      endDate: test.end_date || '',
      successMetric: test.success_metric || 'conversion',
      minSampleSize: test.min_sample_size || 1000
    });
    setShowCreateModal(true);
  };

  const handleSaveTest = async () => {
    try {
      console.log('保存A/B测试:', formData);
      setShowCreateModal(false);
      onRefresh();
    } catch (error) {
      console.error('保存测试失败:', error);
      alert('保存失败，请重试');
    }
  };

  const handleStartTest = async (testId) => {
    try {
      console.log('启动测试:', testId);
      onRefresh();
    } catch (error) {
      console.error('启动测试失败:', error);
    }
  };

  const handlePauseTest = async (testId) => {
    try {
      console.log('暂停测试:', testId);
      onRefresh();
    } catch (error) {
      console.error('暂停测试失败:', error);
    }
  };

  const handleDeleteTest = async (testId) => {
    if (confirm('确定要删除这个A/B测试吗？')) {
      try {
        console.log('删除测试:', testId);
        onRefresh();
      } catch (error) {
        console.error('删除测试失败:', error);
      }
    }
  };

  const getStatusInfo = (status) => {
    return testStatuses.find(s => s.value === status) || testStatuses[0];
  };

  const getLanguageInfo = (code) => {
    return languages.find(lang => lang.code === code) || languages[0];
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('zh-CN');
  };

  const calculateConfidence = (variant) => {
    if (!variant.conversions || !variant.visitors) return 0;
    const rate = variant.conversions / variant.visitors;
    return Math.min(99, Math.round(rate * 100));
  };

  const getWinner = (test) => {
    if (!test.variants || test.variants.length < 2) return null;
    return test.variants.reduce((best, current) => 
      (current.conversion_rate || 0) > (best.conversion_rate || 0) ? current : best
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-yellow-500 flex items-center">
          <BarChart3 className="w-6 h-6 mr-2" />
          A/B测试管理
        </h3>
        <Button onClick={handleCreateTest} className="bg-yellow-500 hover:bg-yellow-600 text-black">
          <Plus className="w-4 h-4 mr-2" />
          创建测试
        </Button>
      </div>

      {/* Test List */}
      <div className="space-y-4">
        {abTests.length === 0 ? (
          <div className="bg-gray-900 rounded-lg p-12 border border-gray-800 text-center">
            <BarChart3 className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-gray-400 mb-2">暂无A/B测试</h4>
            <p className="text-gray-500 mb-6">创建您的第一个多语言A/B测试来优化转化率</p>
            <Button onClick={handleCreateTest} className="bg-yellow-500 hover:bg-yellow-600 text-black">
              <Plus className="w-4 h-4 mr-2" />
              创建测试
            </Button>
          </div>
        ) : (
          abTests.map(test => {
            const statusInfo = getStatusInfo(test.status);
            const StatusIcon = statusInfo.icon;
            const winner = getWinner(test);
            const langInfo = getLanguageInfo(test.target_language);
            
            return (
              <div key={test._id} className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <StatusIcon className={`w-5 h-5 mr-2 ${statusInfo.color}`} />
                      <h4 className="text-lg font-medium text-white mr-3">{test.name}</h4>
                      <span className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded">
                        {statusInfo.label}
                      </span>
                      {winner && (
                        <span className="ml-2 px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded">
                          获胜版本: {winner.name}
                        </span>
                      )}
                    </div>
                    
                    <p className="text-gray-300 mb-4">{test.description}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">目标语言:</span>
                        <div className="flex items-center mt-1">
                          <span className="mr-2">{langInfo.flag}</span>
                          <span className="text-white">
                            {test.target_language === 'all' ? '所有语言' : langInfo.name}
                          </span>
                        </div>
                      </div>
                      
                      <div>
                        <span className="text-gray-400">目标地区:</span>
                        <div className="text-white mt-1">
                          {regions.find(r => r.value === test.target_region)?.label || '全球'}
                        </div>
                      </div>
                      
                      <div>
                        <span className="text-gray-400">流量分配:</span>
                        <div className="text-white mt-1">{test.traffic_split}% / {100 - test.traffic_split}%</div>
                      </div>
                      
                      <div>
                        <span className="text-gray-400">成功指标:</span>
                        <div className="text-white mt-1">
                          {successMetrics.find(m => m.value === test.success_metric)?.label}
                        </div>
                      </div>
                    </div>

                    {test.start_date && (
                      <div className="flex items-center text-sm text-gray-400 mt-3">
                        <Clock className="w-4 h-4 mr-1" />
                        开始: {formatDate(test.start_date)}
                        {test.end_date && ` | 结束: ${formatDate(test.end_date)}`}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    {test.status === 'draft' && (
                      <Button
                        onClick={() => handleStartTest(test._id)}
                        size="sm"
                        className="bg-green-500 hover:bg-green-600 text-white"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        启动
                      </Button>
                    )}
                    
                    {test.status === 'running' && (
                      <Button
                        onClick={() => handlePauseTest(test._id)}
                        size="sm"
                        variant="outline"
                        className="border-yellow-500 text-yellow-500 hover:border-yellow-400 hover:text-yellow-400"
                      >
                        <Pause className="w-4 h-4 mr-2" />
                        暂停
                      </Button>
                    )}
                    
                    <Button
                      onClick={() => handleEditTest(test)}
                      variant="outline"
                      size="sm"
                      className="border-gray-700 text-gray-400 hover:border-gray-600 hover:text-white"
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    
                    <Button
                      onClick={() => handleDeleteTest(test._id)}
                      variant="outline"
                      size="sm"
                      className="border-red-500 text-red-500 hover:border-red-400 hover:text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Test Results */}
                {test.variants && test.variants.length > 0 && (
                  <div className="border-t border-gray-700 pt-4 mt-4">
                    <h5 className="text-sm font-medium text-gray-300 mb-3">测试结果</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {test.variants.map((variant, index) => (
                        <div key={index} className="bg-gray-800 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h6 className="font-medium text-white">{variant.name}</h6>
                            {winner === variant && (
                              <CheckCircle className="w-5 h-5 text-green-500" />
                            )}
                          </div>
                          
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-400">访问量:</span>
                              <span className="text-white">{variant.visitors || 0}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">转化量:</span>
                              <span className="text-white">{variant.conversions || 0}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">转化率:</span>
                              <span className="text-white">
                                {((variant.conversions || 0) / (variant.visitors || 1) * 100).toFixed(2)}%
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">置信度:</span>
                              <span className="text-white">{calculateConfidence(variant)}%</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Create/Edit Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-xl border border-gray-800 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-yellow-500">
                  {selectedTest ? '编辑A/B测试' : '创建A/B测试'}
                </h3>
                <button 
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">测试名称</label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="输入测试名称"
                      className="bg-gray-800 border-gray-700"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">状态</label>
                    <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                      <SelectTrigger className="bg-gray-800 border-gray-700">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {testStatuses.map(status => (
                          <SelectItem key={status.value} value={status.value}>
                            {status.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">测试描述</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="描述测试目标和假设..."
                    rows={3}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500"
                  />
                </div>

                {/* Target Settings */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">目标语言</label>
                    <Select value={formData.targetLanguage} onValueChange={(value) => setFormData({ ...formData, targetLanguage: value })}>
                      <SelectTrigger className="bg-gray-800 border-gray-700">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">所有语言</SelectItem>
                        {languages.map(lang => (
                          <SelectItem key={lang.code} value={lang.code}>
                            <div className="flex items-center">
                              <span className="mr