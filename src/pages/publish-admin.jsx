// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';
// @ts-ignore;
import { Calendar, Clock, FileText, Settings, BarChart3, Plus, Edit2, Trash2, Eye, Play, Pause, RefreshCw, CheckCircle, XCircle, AlertCircle, Globe, Zap, Target, TrendingUp, Users, MessageSquare, Share2, Filter, Search, Download, Upload, X } from 'lucide-react';

import { Navigation } from '@/components/Navigation';
import { ContentCalendar } from '@/components/ContentCalendar';
import { PublishStatus } from '@/components/PublishStatus';
import { PlatformConfig } from '@/components/PlatformConfig';
export default function PublishAdmin(props) {
  const {
    $w
  } = props;
  const [activeTab, setActiveTab] = useState('dashboard');
  const [contentPlans, setContentPlans] = useState([]);
  const [publishStatus, setPublishStatus] = useState([]);
  const [platformConfigs, setPlatformConfigs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPlatform, setFilterPlatform] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedContent, setSelectedContent] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    platform: '',
    publishTime: '',
    status: 'draft',
    tags: []
  });

  // 平台配置
  const platforms = [{
    id: 'wechat',
    name: '微信公众号',
    icon: MessageSquare,
    color: 'text-green-500'
  }, {
    id: 'weibo',
    name: '新浪微博',
    icon: MessageSquare,
    color: 'text-red-500'
  }, {
    id: 'xiaohongshu',
    name: '小红书',
    icon: MessageSquare,
    color: 'text-pink-500'
  }, {
    id: 'zhihu',
    name: '知乎',
    icon: MessageSquare,
    color: 'text-blue-500'
  }, {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: MessageSquare,
    color: 'text-indigo-500'
  }];

  // 状态选项
  const statusOptions = [{
    value: 'all',
    label: '全部状态'
  }, {
    value: 'draft',
    label: '草稿'
  }, {
    value: 'scheduled',
    label: '已计划'
  }, {
    value: 'published',
    label: '已发布'
  }, {
    value: 'failed',
    label: '发布失败'
  }];

  // 内容类型选项
  const contentTypeOptions = [{
    value: 'article',
    label: '文章'
  }, {
    value: 'video',
    label: '视频'
  }, {
    value: 'image',
    label: '图片'
  }, {
    value: 'short_text',
    label: '短文本'
  }, {
    value: 'announcement',
    label: '公告'
  }, {
    value: 'promotion',
    label: '推广'
  }];

  // 平台配置数据
  const mockPlatformConfigs = [{
    id: '1',
    platform: 'wechat',
    name: '微信公众号',
    isActive: true,
    config: {
      appId: 'wx1234567890',
      appSecret: '***',
      accessToken: '***',
      apiUrl: 'https://api.weixin.qq.com'
    },
    features: ['autoPublish', 'scheduledPost', 'analytics', 'replyManagement'],
    lastTest: '2025-01-20T10:00:00Z',
    testStatus: 'success'
  }, {
    id: '2',
    platform: 'weibo',
    name: '新浪微博',
    isActive: true,
    config: {
      appKey: 'wb1234567890',
      appSecret: '***',
      accessToken: '***',
      apiUrl: 'https://api.weibo.com'
    },
    features: ['autoPublish', 'scheduledPost', 'analytics'],
    lastTest: '2025-01-20T09:30:00Z',
    testStatus: 'success'
  }, {
    id: '3',
    platform: 'xiaohongshu',
    name: '小红书',
    isActive: false,
    config: {
      appId: 'xhs1234567890',
      appSecret: '***',
      accessToken: '***',
      apiUrl: 'https://api.xiaohongshu.com'
    },
    features: ['autoPublish', 'scheduledPost', 'analytics'],
    lastTest: '2025-01-19T16:00:00Z',
    testStatus: 'failed'
  }];
  useEffect(() => {
    loadData();
  }, []);
  const loadData = async () => {
    setIsLoading(true);
    try {
      // 加载内容计划数据
      await loadContentPlans();

      // 加载发布状态监控数据
      await loadPublishStatus();

      // 设置平台配置数据（暂时使用mock数据）
      setPlatformConfigs(mockPlatformConfigs);
    } catch (error) {
      console.error('加载数据失败:', error);
    } finally {
      setIsLoading(false);
    }
  };
  const loadContentPlans = async () => {
    try {
      const result = await $w.cloud.callDataSource({
        dataSourceName: 'content_plan',
        methodName: 'wedaGetRecordsV2',
        params: {
          orderBy: [{
            publish_time: 'desc'
          }],
          pageSize: 100
        }
      });
      if (result && result.records) {
        const formattedData = result.records.map(record => ({
          id: record._id,
          title: record.title,
          content: record.content,
          platform: record.platform,
          publishTime: record.publish_time,
          status: record.status,
          tags: record.tags || [],
          contentType: record.content_type,
          weekNumber: record.week_number,
          year: record.year,
          priority: record.priority,
          targetAudience: record.target_audience,
          contentPurpose: record.content_purpose,
          estimatedEngagement: record.estimated_engagement,
          actualEngagement: record.actual_engagement || {
            views: 0,
            likes: 0,
            shares: 0,
            comments: 0
          },
          publishResult: record.publish_result,
          errorMessage: record.error_message,
          retryCount: record.retry_count || 0,
          autoPublishEnabled: record.auto_publish_enabled,
          scheduledPublish: record.scheduled_publish,
          approvalStatus: record.approval_status,
          createdBy: record.created_by,
          assignedTo: record.assigned_to,
          campaignId: record.campaign_id,
          language: record.language,
          region: record.region,
          visibility: record.visibility,
          createdAt: record.created_at
        }));
        setContentPlans(formattedData);
      }
    } catch (error) {
      console.error('加载内容计划失败:', error);
      // 如果数据库为空，使用示例数据
      const sampleData = [{
        id: 'sample-1',
        title: 'AI太极SOS RING产品发布会预告',
        content: '我们即将发布革命性的AI太极SOS RING智能戒指，融合主权AI技术与传统太极哲学...',
        platform: 'wechat',
        publishTime: '2025-01-25T10:00:00Z',
        status: 'scheduled',
        tags: ['产品发布', '智能戒指', 'AI技术'],
        contentType: 'announcement',
        weekNumber: 4,
        year: 2025,
        priority: 1,
        targetAudience: 'tech_enthusiasts',
        contentPurpose: 'product_launch',
        estimatedEngagement: 5000,
        actualEngagement: {
          views: 0,
          likes: 0,
          shares: 0,
          comments: 0
        },
        autoPublishEnabled: true,
        scheduledPublish: true,
        approvalStatus: 'approved',
        createdBy: 'admin',
        assignedTo: 'content_team',
        campaignId: 'launch_2025',
        language: 'zh',
        region: 'cn',
        visibility: 'public',
        createdAt: '2025-01-20T08:00:00Z'
      }];
      setContentPlans(sampleData);
    }
  };
  const loadPublishStatus = async () => {
    try {
      const result = await $w.cloud.callDataSource({
        dataSourceName: 'publish_status_monitor',
        methodName: 'wedaGetRecordsV2',
        params: {
          orderBy: [{
            actual_publish_time: 'desc'
          }],
          pageSize: 100
        }
      });
      if (result && result.records) {
        // 按平台分组统计数据
        const platformStats = {};
        result.records.forEach(record => {
          const platform = record.platform;
          if (!platformStats[platform]) {
            platformStats[platform] = {
              platform: platform,
              platformName: record.platform_name || platform,
              status: 'active',
              lastSync: record.actual_publish_time || record.scheduled_time,
              totalPosts: 0,
              scheduledPosts: 0,
              failedPosts: 0,
              avgEngagement: 0,
              totalEngagement: 0
            };
          }
          platformStats[platform].totalPosts++;
          if (record.publish_status === 'scheduled') {
            platformStats[platform].scheduledPosts++;
          } else if (record.publish_status === 'failed' || !record.success) {
            platformStats[platform].failedPosts++;
          }

          // 计算互动量
          if (record.platform_response && record.platform_response.engagement) {
            const engagement = record.platform_response.engagement;
            const totalEngagement = (engagement.views || 0) + (engagement.likes || 0) + (engagement.shares || 0) + (engagement.comments || 0);
            platformStats[platform].totalEngagement += totalEngagement;
          }
        });

        // 计算平均互动量
        Object.values(platformStats).forEach(stat => {
          if (stat.totalPosts > 0) {
            stat.avgEngagement = Math.round(stat.totalEngagement / stat.totalPosts);
          }
        });
        setPublishStatus(Object.values(platformStats));
      }
    } catch (error) {
      console.error('加载发布状态失败:', error);
      // 使用示例数据
      const sampleStatus = [{
        platform: 'wechat',
        platformName: '微信公众号',
        status: 'active',
        lastSync: '2025-01-20T10:30:00Z',
        totalPosts: 45,
        scheduledPosts: 8,
        failedPosts: 2,
        avgEngagement: 234
      }, {
        platform: 'weibo',
        platformName: '新浪微博',
        status: 'active',
        lastSync: '2025-01-20T10:25:00Z',
        totalPosts: 32,
        scheduledPosts: 5,
        failedPosts: 1,
        avgEngagement: 189
      }];
      setPublishStatus(sampleStatus);
    }
  };
  const handleCreateContent = () => {
    setFormData({
      title: '',
      content: '',
      platform: '',
      publishTime: '',
      status: 'draft',
      tags: [],
      contentType: 'article',
      weekNumber: Math.ceil((new Date().getDate() + new Date().getDay()) / 7),
      year: new Date().getFullYear(),
      priority: 1,
      targetAudience: '',
      contentPurpose: '',
      estimatedEngagement: 0,
      autoPublishEnabled: true,
      scheduledPublish: false,
      approvalStatus: 'pending',
      createdBy: 'admin',
      assignedTo: '',
      campaignId: '',
      language: 'zh',
      region: 'cn',
      visibility: 'public'
    });
    setShowCreateModal(true);
  };
  const handleEditContent = content => {
    setSelectedContent(content);
    setFormData({
      title: content.title,
      content: content.content,
      platform: content.platform,
      publishTime: content.publishTime,
      status: content.status,
      tags: content.tags || [],
      contentType: content.contentType || 'article',
      weekNumber: content.weekNumber || Math.ceil((new Date().getDate() + new Date().getDay()) / 7),
      year: content.year || new Date().getFullYear(),
      priority: content.priority || 1,
      targetAudience: content.targetAudience || '',
      contentPurpose: content.contentPurpose || '',
      estimatedEngagement: content.estimatedEngagement || 0,
      autoPublishEnabled: content.autoPublishEnabled !== false,
      scheduledPublish: content.scheduledPublish || false,
      approvalStatus: content.approvalStatus || 'pending',
      createdBy: content.createdBy || 'admin',
      assignedTo: content.assignedTo || '',
      campaignId: content.campaignId || '',
      language: content.language || 'zh',
      region: content.region || 'cn',
      visibility: content.visibility || 'public'
    });
    setShowEditModal(true);
  };
  const handleSaveContent = async () => {
    try {
      const currentUser = $w.auth.currentUser;
      const now = new Date().toISOString();
      const contentData = {
        title: formData.title,
        content: formData.content,
        platform: formData.platform,
        publish_time: formData.publishTime,
        status: formData.status,
        tags: formData.tags,
        content_type: formData.contentType,
        week_number: formData.weekNumber,
        year: formData.year,
        priority: formData.priority,
        target_audience: formData.targetAudience,
        content_purpose: formData.contentPurpose,
        estimated_engagement: formData.estimatedEngagement,
        auto_publish_enabled: formData.autoPublishEnabled,
        scheduled_publish: formData.scheduledPublish,
        approval_status: formData.approvalStatus,
        created_by: formData.createdBy || (currentUser ? currentUser.email : 'admin'),
        assigned_to: formData.assignedTo,
        campaign_id: formData.campaignId,
        language: formData.language,
        region: formData.region,
        visibility: formData.visibility,
        created_at: now,
        updated_at: now
      };
      if (showEditModal && selectedContent) {
        // 更新现有内容
        await $w.cloud.callDataSource({
          dataSourceName: 'content_plan',
          methodName: 'wedaUpdateV2',
          params: {
            data: contentData,
            filter: {
              where: {
                _id: {
                  $eq: selectedContent.id
                }
              }
            }
          }
        });
      } else {
        // 创建新内容
        await $w.cloud.callDataSource({
          dataSourceName: 'content_plan',
          methodName: 'wedaCreateV2',
          params: {
            data: contentData
          }
        });
      }
      setShowCreateModal(false);
      setShowEditModal(false);
      loadData();
    } catch (error) {
      console.error('保存内容失败:', error);
      alert('保存失败，请重试');
    }
  };
  const handleDeleteContent = async id => {
    if (confirm('确定要删除这个内容吗？')) {
      try {
        await $w.cloud.callDataSource({
          dataSourceName: 'content_plan',
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
        loadData();
      } catch (error) {
        console.error('删除内容失败:', error);
        alert('删除失败，请重试');
      }
    }
  };
  const handlePublishNow = async id => {
    try {
      // 创建发布状态监控记录
      const publishData = {
        content_plan_id: id,
        platform: 'wechat',
        // 默认平台，实际应该从内容中获取
        platform_name: '微信公众号',
        publish_type: 'immediate',
        publish_status: 'pending',
        scheduled_time: new Date().toISOString(),
        success: false,
        retry_count: 0,
        max_retries: 3,
        retry_interval: 300,
        api_endpoint: 'https://api.weixin.qq.com/cgi-bin/draft/add',
        api_method: 'POST',
        queue_status: 'pending',
        processing_priority: 1,
        trigger_type: 'manual',
        trigger_source: 'admin_panel',
        notification_sent: false,
        monitoring_enabled: true,
        version: '1.0',
        environment: 'production',
        debug_mode: false,
        log_level: 'info',
        created_at: new Date().toISOString()
      };
      await $w.cloud.callDataSource({
        dataSourceName: 'publish_status_monitor',
        methodName: 'wedaCreateV2',
        params: {
          data: publishData
        }
      });

      // 更新内容状态
      await $w.cloud.callDataSource({
        dataSourceName: 'content_plan',
        methodName: 'wedaUpdateV2',
        params: {
          data: {
            status: 'published',
            actual_publish_time: new Date().toISOString()
          },
          filter: {
            where: {
              _id: {
                $eq: id
              }
            }
          }
        }
      });
      loadData();
    } catch (error) {
      console.error('发布失败:', error);
      alert('发布失败，请重试');
    }
  };
  const handleTestPlatform = async platformId => {
    try {
      // 创建平台测试记录
      const testData = {
        platform: platformId,
        platform_name: platforms.find(p => p.id === platformId)?.name || platformId,
        publish_type: 'test',
        publish_status: 'testing',
        scheduled_time: new Date().toISOString(),
        success: false,
        retry_count: 0,
        max_retries: 1,
        api_endpoint: `https://api.${platformId}.com/test`,
        api_method: 'GET',
        queue_status: 'testing',
        trigger_type: 'manual_test',
        trigger_source: 'admin_panel',
        notification_sent: false,
        monitoring_enabled: true,
        version: '1.0',
        environment: 'production',
        debug_mode: true,
        log_level: 'debug',
        created_at: new Date().toISOString()
      };
      await $w.cloud.callDataSource({
        dataSourceName: 'publish_status_monitor',
        methodName: 'wedaCreateV2',
        params: {
          data: testData
        }
      });

      // 模拟测试结果
      setTimeout(() => {
        alert(`平台 ${platformId} 测试完成`);
        loadData();
      }, 2000);
    } catch (error) {
      console.error('测试失败:', error);
      alert('测试失败，请重试');
    }
  };
  const getPlatformInfo = platformId => {
    return platforms.find(p => p.id === platformId) || platforms[0];
  };
  const getStatusIcon = status => {
    switch (status) {
      case 'published':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'scheduled':
        return <Clock className="w-5 h-5 text-blue-500" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'draft':
        return <FileText className="w-5 h-5 text-gray-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
    }
  };
  const getStatusText = status => {
    switch (status) {
      case 'published':
        return '已发布';
      case 'scheduled':
        return '已计划';
      case 'failed':
        return '发布失败';
      case 'draft':
        return '草稿';
      default:
        return '未知';
    }
  };
  const formatDate = dateString => {
    return new Date(dateString).toLocaleString('zh-CN');
  };
  const filteredContent = contentPlans.filter(content => {
    const matchesSearch = content.title.toLowerCase().includes(searchTerm.toLowerCase()) || content.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || content.status === filterStatus;
    const matchesPlatform = filterPlatform === 'all' || content.platform === filterPlatform;
    return matchesSearch && matchesStatus && matchesPlatform;
  });
  const totalEngagement = contentPlans.reduce((sum, content) => {
    return sum + (content.actualEngagement?.views || 0) + (content.actualEngagement?.likes || 0) + (content.actualEngagement?.shares || 0) + (content.actualEngagement?.comments || 0);
  }, 0);
  const publishedCount = contentPlans.filter(content => content.status === 'published').length;
  const scheduledCount = contentPlans.filter(content => content.status === 'scheduled').length;
  const failedCount = contentPlans.filter(content => content.status === 'failed').length;
  return <div className="min-h-screen bg-black text-white">
      <Navigation currentPage="publish-admin" $w={$w} />

      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-yellow-500">自动发布系统</h1>
          <div className="flex items-center space-x-4">
            <Button onClick={loadData} variant="outline" className="border-gray-700 text-gray-400 hover:border-gray-600 hover:text-white">
              <RefreshCw className="w-4 h-4 mr-2" />
              刷新数据
            </Button>
            <Button onClick={handleCreateContent} className="bg-yellow-500 hover:bg-yellow-600 text-black">
              <Plus className="w-4 h-4 mr-2" />
              创建内容
            </Button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-8 mb-8 border-b border-gray-800">
          <button onClick={() => setActiveTab('dashboard')} className={`pb-4 px-2 font-medium transition-colors ${activeTab === 'dashboard' ? 'text-yellow-500 border-b-2 border-yellow-500' : 'text-gray-400 hover:text-white'}`}>
            <BarChart3 className="w-5 h-5 inline mr-2" />
            数据概览
          </button>
          <button onClick={() => setActiveTab('content')} className={`pb-4 px-2 font-medium transition-colors ${activeTab === 'content' ? 'text-yellow-500 border-b-2 border-yellow-500' : 'text-gray-400 hover:text-white'}`}>
            <FileText className="w-5 h-5 inline mr-2" />
            内容管理
          </button>
          <button onClick={() => setActiveTab('calendar')} className={`pb-4 px-2 font-medium transition-colors ${activeTab === 'calendar' ? 'text-yellow-500 border-b-2 border-yellow-500' : 'text-gray-400 hover:text-white'}`}>
            <Calendar className="w-5 h-5 inline mr-2" />
            发布计划
          </button>
          <button onClick={() => setActiveTab('status')} className={`pb-4 px-2 font-medium transition-colors ${activeTab === 'status' ? 'text-yellow-500 border-b-2 border-yellow-500' : 'text-gray-400 hover:text-white'}`}>
            <Settings className="w-5 h-5 inline mr-2" />
            平台配置
          </button>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <FileText className="w-8 h-8 text-blue-500" />
                <span className="text-2xl font-bold">{contentPlans.length}</span>
              </div>
              <h3 className="text-lg font-medium mb-1">总内容数</h3>
              <p className="text-sm text-gray-400">所有平台内容</p>
            </div>
            
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <CheckCircle className="w-8 h-8 text-green-500" />
                <span className="text-2xl font-bold">{publishedCount}</span>
              </div>
              <h3 className="text-lg font-medium mb-1">已发布</h3>
              <p className="text-sm text-gray-400">成功发布的内容</p>
            </div>
            
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <Clock className="w-8 h-8 text-blue-500" />
                <span className="text-2xl font-bold">{scheduledCount}</span>
              </div>
              <h3 className="text-lg font-medium mb-1">计划中</h3>
              <p className="text-sm text-gray-400">待发布的内容</p>
            </div>
            
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <TrendingUp className="w-8 h-8 text-yellow-500" />
                <span className="text-2xl font-bold">{totalEngagement.toLocaleString()}</span>
              </div>
              <h3 className="text-lg font-medium mb-1">总互动量</h3>
              <p className="text-sm text-gray-400">浏览、点赞、分享、评论</p>
            </div>
          </div>}

        {/* Content Management Tab */}
        {activeTab === 'content' && <div>
            {/* Filters */}
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="搜索内容..." className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500" />
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
                
                <Select value={filterPlatform} onValueChange={setFilterPlatform}>
                  <SelectTrigger className="bg-gray-800 border-gray-700">
                    <SelectValue placeholder="选择平台" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">所有平台</SelectItem>
                    {platforms.map(platform => <SelectItem key={platform.id} value={platform.id}>
                        {platform.name}
                      </SelectItem>)}
                  </SelectContent>
                </Select>
                
                <Button onClick={() => {
              setSearchTerm('');
              setFilterStatus('all');
              setFilterPlatform('all');
            }} variant="outline" className="border-gray-700 text-gray-400 hover:border-gray-600 hover:text-white">
                  <Filter className="w-4 h-4 mr-2" />
                  重置筛选
                </Button>
              </div>
            </div>

            {/* Content List */}
            <div className="space-y-4">
              {filteredContent.map(content => {
            const platformInfo = getPlatformInfo(content.platform);
            const PlatformIcon = platformInfo.icon;
            return <div key={content.id} className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-3">
                          <PlatformIcon className={`w-5 h-5 mr-3 ${platformInfo.color}`} />
                          <h3 className="text-lg font-medium mr-3">{content.title}</h3>
                          {getStatusIcon(content.status)}
                          <span className="ml-2 text-sm text-gray-400">{getStatusText(content.status)}</span>
                        </div>
                        
                        <p className="text-gray-300 mb-4 line-clamp-2">{content.content}</p>
                        
                        <div className="flex items-center space-x-6 text-sm text-gray-400 mb-4">
                          <span className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {formatDate(content.publishTime)}
                          </span>
                          <span className="flex items-center">
                            <Eye className="w-4 h-4 mr-1" />
                            {content.actualEngagement?.views || 0}
                          </span>
                          <span className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {content.actualEngagement?.likes || 0}
                          </span>
                          <span className="flex items-center">
                            <Share2 className="w-4 h-4 mr-1" />
                            {content.actualEngagement?.shares || 0}
                          </span>
                          <span className="flex items-center">
                            <MessageSquare className="w-4 h-4 mr-1" />
                            {content.actualEngagement?.comments || 0}
                          </span>
                        </div>
                        
                        {content.tags && content.tags.length > 0 && <div className="flex flex-wrap gap-2 mb-4">
                            {content.tags.map((tag, index) => <span key={index} className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded">
                                {tag}
                              </span>)}
                          </div>}
                        
                        {content.errorMessage && <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 mb-4">
                            <p className="text-red-400 text-sm">错误: {content.errorMessage}</p>
                          </div>}
                      </div>
                      
                      <div className="flex items-center space-x-2 ml-4">
                        {content.status === 'draft' && <Button onClick={() => handlePublishNow(content.id)} size="sm" className="bg-green-500 hover:bg-green-600 text-white">
                            <Play className="w-4 h-4 mr-2" />
                            立即发布
                          </Button>}
                        <Button onClick={() => handleEditContent(content)} variant="outline" size="sm" className="border-gray-700 text-gray-400 hover:border-gray-600 hover:text-white">
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button onClick={() => handleDeleteContent(content.id)} variant="outline" size="sm" className="border-red-500 text-red-500 hover:border-red-400 hover:text-red-400">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>;
          })}
            </div>
          </div>}

        {/* Calendar Tab */}
        {activeTab === 'calendar' && <ContentCalendar contentPlans={contentPlans} platforms={platforms} onEditContent={handleEditContent} />}

        {/* Status Tab */}
        {activeTab === 'status' && <div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Platform Status */}
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <Settings className="w-6 h-6 text-yellow-500 mr-2" />
                  平台状态
                </h3>
                <div className="space-y-4">
                  {publishStatus.map(status => {
                const platformInfo = getPlatformInfo(status.platform);
                const PlatformIcon = platformInfo.icon;
                return <div key={status.platform} className="bg-gray-800 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center">
                            <PlatformIcon className={`w-5 h-5 mr-3 ${platformInfo.color}`} />
                            <span className="font-medium">{status.platformName || platformInfo.name}</span>
                          </div>
                          <div className="flex items-center">
                            {status.status === 'active' ? <CheckCircle className="w-5 h-5 text-green-500" /> : status.status === 'error' ? <XCircle className="w-5 h-5 text-red-500" /> : <Pause className="w-5 h-5 text-yellow-500" />}
                            <span className="ml-2 text-sm text-gray-400">{status.status}</span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-400">总发布数:</span>
                            <span className="ml-2 text-white">{status.totalPosts}</span>
                          </div>
                          <div>
                            <span className="text-gray-400">计划中:</span>
                            <span className="ml-2 text-white">{status.scheduledPosts}</span>
                          </div>
                          <div>
                            <span className="text-gray-400">失败数:</span>
                            <span className="ml-2 text-white">{status.failedPosts}</span>
                          </div>
                          <div>
                            <span className="text-gray-400">平均互动:</span>
                            <span className="ml-2 text-white">{status.avgEngagement}</span>
                          </div>
                        </div>
                        
                        <div className="mt-3 text-xs text-gray-400">
                          最后同步: {formatDate(status.lastSync)}
                        </div>
                      </div>;
              })}
                </div>
              </div>

              {/* Platform Configuration */}
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <Globe className="w-6 h-6 text-yellow-500 mr-2" />
                  平台配置
                </h3>
                <div className="space-y-4">
                  {platformConfigs.map(config => {
                const platformInfo = getPlatformInfo(config.platform);
                const PlatformIcon = platformInfo.icon;
                return <div key={config.id} className="bg-gray-800 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center">
                            <PlatformIcon className={`w-5 h-5 mr-3 ${platformInfo.color}`} />
                            <span className="font-medium">{config.name}</span>
                          </div>
                          <div className="flex items-center">
                            <div className={`w-2 h-2 rounded-full mr-2 ${config.isActive ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                            <span className="text-sm text-gray-400">{config.isActive ? '启用' : '禁用'}</span>
                          </div>
                        </div>
                        
                        <div className="mb-3">
                          <div className="text-sm text-gray-400 mb-1">API配置:</div>
                          <div className="text-xs text-gray-500 font-mono bg-gray-900 p-2 rounded">
                            {config.config.apiUrl}
                          </div>
                        </div>
                        
                        <div className="mb-3">
                          <div className="text-sm text-gray-400 mb-1">功能:</div>
                          <div className="flex flex-wrap gap-1">
                            {config.features.map((feature, index) => <span key={index} className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded">
                                {feature}
                              </span>)}
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-gray-400">
                            最后测试: {formatDate(config.lastTest)}
                          </div>
                          <Button onClick={() => handleTestPlatform(config.platform)} size="sm" variant="outline" className="border-gray-700 text-gray-400 hover:border-gray-600 hover:text-white">
                            <Zap className="w-4 h-4 mr-2" />
                            测试连接
                          </Button>
                        </div>
                      </div>;
              })}
                </div>
              </div>
            </div>
          </div>}
      </div>

      {/* Create/Edit Modal */}
      {(showCreateModal || showEditModal) && <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-xl border border-gray-800 w-full max-w-2xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-yellow-500">
                  {showCreateModal ? '创建内容' : '编辑内容'}
                </h3>
                <button onClick={() => {
              setShowCreateModal(false);
              setShowEditModal(false);
            }} className="text-gray-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">标题</label>
                  <Input value={formData.title} onChange={e => setFormData({
                ...formData,
                title: e.target.value
              })} placeholder="输入内容标题" className="bg-gray-800 border-gray-700" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">内容</label>
                  <textarea value={formData.content} onChange={e => setFormData({
                ...formData,
                content: e.target.value
              })} placeholder="输入内容正文" rows={6} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">发布平台</label>
                    <Select value={formData.platform} onValueChange={value => setFormData({
                  ...formData,
                  platform: value
                })}>
                      <SelectTrigger className="bg-gray-800 border-gray-700">
                        <SelectValue placeholder="选择平台" />
                      </SelectTrigger>
                      <SelectContent>
                        {platforms.map(platform => <SelectItem key={platform.id} value={platform.id}>
                            {platform.name}
                          </SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">内容类型</label>
                    <Select value={formData.contentType} onValueChange={value => setFormData({
                  ...formData,
                  contentType: value
                })}>
                      <SelectTrigger className="bg-gray-800 border-gray-700">
                        <SelectValue placeholder="选择类型" />
                      </SelectTrigger>
                      <SelectContent>
                        {contentTypeOptions.map(option => <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">发布时间</label>
                    <Input type="datetime-local" value={formData.publishTime} onChange={e => setFormData({
                  ...formData,
                  publishTime: e.target.value
                })} className="bg-gray-800 border-gray-700" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">状态</label>
                    <Select value={formData.status} onValueChange={value => setFormData({
                  ...formData,
                  status: value
                })}>
                      <SelectTrigger className="bg-gray-800 border-gray-700">
                        <SelectValue placeholder="选择状态" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">草稿</SelectItem>
                        <SelectItem value="scheduled">计划发布</SelectItem>
                        <SelectItem value="published">立即发布</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">优先级</label>
                    <Select value={formData.priority.toString()} onValueChange={value => setFormData({
                  ...formData,
                  priority: parseInt(value)
                })}>
                      <SelectTrigger className="bg-gray-800 border-gray-700">
                        <SelectValue placeholder="选择优先级" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">高</SelectItem>
                        <SelectItem value="2">中</SelectItem>
                        <SelectItem value="3">低</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">目标受众</label>
                    <Input value={formData.targetAudience} onChange={e => setFormData({
                  ...formData,
                  targetAudience: e.target.value
                })} placeholder="输入目标受众" className="bg-gray-800 border-gray-700" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">预期互动量</label>
                    <Input type="number" value={formData.estimatedEngagement} onChange={e => setFormData({
                  ...formData,
                  estimatedEngagement: parseInt(e.target.value) || 0
                })} placeholder="输入预期互动量" className="bg-gray-800 border-gray-700" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">活动ID</label>
                    <Input value={formData.campaignId} onChange={e => setFormData({
                  ...formData,
                  campaignId: e.target.value
                })} placeholder="输入活动ID" className="bg-gray-800 border-gray-700" />
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input type="checkbox" checked={formData.autoPublishEnabled} onChange={e => setFormData({
                  ...formData,
                  autoPublishEnabled: e.target.checked
                })} className="mr-2" />
                    <span className="text-sm text-gray-300">启用自动发布</span>
                  </label>
                  
                  <label className="flex items-center">
                    <input type="checkbox" checked={formData.scheduledPublish} onChange={e => setFormData({
                  ...formData,
                  scheduledPublish: e.target.checked
                })} className="mr-2" />
                    <span className="text-sm text-gray-300">计划发布</span>
                  </label>
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <Button onClick={() => {
              setShowCreateModal(false);
              setShowEditModal(false);
            }} variant="outline" className="flex-1 border-gray-700 text-gray-400 hover:border-gray-600 hover:text-white">
                  取消
                </Button>
                <Button onClick={handleSaveContent} className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black">
                  保存
                </Button>
              </div>
            </div>
          </div>
        </div>}
    </div>;
}