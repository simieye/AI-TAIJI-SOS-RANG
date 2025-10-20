// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Textarea } from '@/components/ui';
// @ts-ignore;
import { Globe, Plus, Edit2, Trash2, Search, Filter, Copy, Eye, CheckCircle, XCircle, Clock, BarChart3, Languages, FileText, Upload, Download, RefreshCw, Save, X, ChevronLeft, ChevronRight, Flag, Users, Target, TrendingUp, Map, Settings, Code, Zap } from 'lucide-react';

import { Navigation } from '@/components/Navigation';
import { LanguageContentEditor } from '@/components/LanguageContentEditor';
import { LanguageSearch } from '@/components/LanguageSearch';
import { ABTestManager } from '@/components/ABTestManager';
import { MultilingualSEO } from '@/components/MultilingualSEO';
import { SitemapGenerator } from '@/components/SitemapGenerator';
export default function LanguageAdmin(props) {
  const {
    $w
  } = props;
  const [activeTab, setActiveTab] = useState('content');
  const [languages, setLanguages] = useState([]);
  const [contentItems, setContentItems] = useState([]);
  const [translations, setTranslations] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [abTests, setAbTests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('zh');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedContent, setSelectedContent] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [formData, setFormData] = useState({
    content_id: '',
    title: '',
    content: '',
    description: '',
    language_code: 'zh',
    content_type: 'page',
    status: 'draft',
    seo_title: '',
    seo_description: '',
    keywords: [],
    region: 'global',
    priority: 1,
    slug: '',
    category: '',
    tags: [],
    author: 'admin',
    translator: '',
    translation_status: 'original',
    translation_quality: 100,
    original_content_id: '',
    translation_source: '',
    auto_translated: false,
    human_reviewed: false,
    publish_date: '',
    expiry_date: '',
    view_count: 0,
    engagement_score: 0,
    conversion_rate: 0,
    reading_time: 0,
    difficulty_level: 'beginner',
    target_audience: '',
    call_to_action: '',
    related_content: [],
    version: '1.0',
    workflow_status: 'draft',
    approval_status: 'pending',
    approved_by: '',
    approval_date: '',
    scheduled_publish: false,
    scheduled_date: '',
    is_featured: false,
    is_archived: false,
    visibility: 'public',
    access_level: 'all',
    cache_enabled: true,
    cache_duration: 3600,
    search_indexed: true,
    last_sync_date: '',
    sync_status: 'pending',
    metadata: {},
    custom_fields: {},
    notes: ''
  });

  // 支持的语言列表
  const supportedLanguages = [{
    code: 'zh',
    name: '简体中文',
    flag: '🇨🇳',
    direction: 'ltr',
    region: 'cn'
  }, {
    code: 'zh-TW',
    name: '繁體中文',
    flag: '🇹🇼',
    direction: 'ltr',
    region: 'tw'
  }, {
    code: 'en',
    name: 'English',
    flag: '🇺🇸',
    direction: 'ltr',
    region: 'us'
  }, {
    code: 'ja',
    name: '日本語',
    flag: '🇯🇵',
    direction: 'ltr',
    region: 'jp'
  }, {
    code: 'ko',
    name: '한국어',
    flag: '🇰🇷',
    direction: 'ltr',
    region: 'kr'
  }, {
    code: 'es',
    name: 'Español',
    flag: '🇪🇸',
    direction: 'ltr',
    region: 'es'
  }, {
    code: 'fr',
    name: 'Français',
    flag: '🇫🇷',
    direction: 'ltr',
    region: 'fr'
  }, {
    code: 'de',
    name: 'Deutsch',
    flag: '🇩🇪',
    direction: 'ltr',
    region: 'de'
  }, {
    code: 'it',
    name: 'Italiano',
    flag: '🇮🇹',
    direction: 'ltr',
    region: 'it'
  }, {
    code: 'pt',
    name: 'Português',
    flag: '🇵🇹',
    direction: 'ltr',
    region: 'pt'
  }, {
    code: 'ru',
    name: 'Русский',
    flag: '🇷🇺',
    direction: 'ltr',
    region: 'ru'
  }, {
    code: 'ar',
    name: 'العربية',
    flag: '🇸🇦',
    direction: 'rtl',
    region: 'sa'
  }, {
    code: 'hi',
    name: 'हिन्दी',
    flag: '🇮🇳',
    direction: 'ltr',
    region: 'in'
  }, {
    code: 'th',
    name: 'ไทย',
    flag: '🇹🇭',
    direction: 'ltr',
    region: 'th'
  }, {
    code: 'vi',
    name: 'Tiếng Việt',
    flag: '🇻🇳',
    direction: 'ltr',
    region: 'vn'
  }];

  // 内容类型选项
  const contentTypeOptions = [{
    value: 'page',
    label: '页面内容'
  }, {
    value: 'product',
    label: '产品描述'
  }, {
    value: 'blog',
    label: '博客文章'
  }, {
    value: 'faq',
    label: '常见问题'
  }, {
    value: 'news',
    label: '新闻资讯'
  }, {
    value: 'marketing',
    label: '营销文案'
  }, {
    value: 'legal',
    label: '法律条款'
  }, {
    value: 'help',
    label: '帮助文档'
  }, {
    value: 'tutorial',
    label: '教程指南'
  }, {
    value: 'announcement',
    label: '公告通知'
  }];

  // 地区选项
  const regionOptions = [{
    value: 'global',
    label: '全球'
  }, {
    value: 'cn',
    label: '中国大陆'
  }, {
    value: 'tw',
    label: '台湾地区'
  }, {
    value: 'hk',
    label: '香港地区'
  }, {
    value: 'us',
    label: '美国'
  }, {
    value: 'eu',
    label: '欧洲'
  }, {
    value: 'jp',
    label: '日本'
  }, {
    value: 'kr',
    label: '韩国'
  }, {
    value: 'sea',
    label: '东南亚'
  }, {
    value: 'in',
    label: '印度'
  }, {
    value: 'au',
    label: '澳大利亚'
  }, {
    value: 'ca',
    label: '加拿大'
  }, {
    value: 'uk',
    label: '英国'
  }, {
    value: 'br',
    label: '巴西'
  }, {
    value: 'mx',
    label: '墨西哥'
  }];

  // 初始化数据
  useEffect(() => {
    loadLanguages();
    loadContent();
    loadTranslations();
    loadABTests();
  }, [currentPage, filterStatus, filterType, selectedLanguage]);

  // 加载语言数据
  const loadLanguages = async () => {
    try {
      setLanguages(supportedLanguages);
    } catch (error) {
      console.error('加载语言数据失败:', error);
    }
  };

  // 加载内容数据
  const loadContent = async () => {
    setIsLoading(true);
    try {
      if ($w) {
        const result = await $w.cloud.callDataSource({
          dataSourceName: 'multilingual_content',
          methodName: 'wedaGetRecordsV2',
          params: {
            filter: {
              where: {
                $and: [selectedLanguage !== 'all' ? {
                  language_code: {
                    $eq: selectedLanguage
                  }
                } : {}, filterStatus !== 'all' ? {
                  status: {
                    $eq: filterStatus
                  }
                } : {}, filterType !== 'all' ? {
                  content_type: {
                    $eq: filterType
                  }
                } : {}].filter(condition => Object.keys(condition).length > 0)
              }
            },
            orderBy: [{
              updated_at: 'desc'
            }],
            pageSize: 20,
            pageNumber: currentPage,
            getCount: true
          }
        });
        if (result && result.records) {
          setContentItems(result.records);
          setTotalPages(Math.ceil((result.total || 0) / 20));
        }
      }
    } catch (error) {
      console.error('加载内容失败:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 加载翻译数据
  const loadTranslations = async () => {
    try {
      if ($w) {
        const result = await $w.cloud.callDataSource({
          dataSourceName: 'content_translation',
          methodName: 'wedaGetRecordsV2',
          params: {
            orderBy: [{
              created_at: 'desc'
            }],
            pageSize: 50
          }
        });
        if (result && result.records) {
          setTranslations(result.records);
        }
      }
    } catch (error) {
      console.error('加载翻译数据失败:', error);
    }
  };

  // 加载A/B测试数据
  const loadABTests = async () => {
    try {
      if ($w) {
        const result = await $w.cloud.callDataSource({
          dataSourceName: 'ab_test',
          methodName: 'wedaGetRecordsV2',
          params: {
            orderBy: [{
              created_at: 'desc'
            }],
            pageSize: 20
          }
        });
        if (result && result.records) {
          setAbTests(result.records);
        }
      }
    } catch (error) {
      console.error('加载A/B测试失败:', error);
    }
  };

  // 创建新内容
  const handleCreateContent = () => {
    setFormData({
      content_id: '',
      title: '',
      content: '',
      description: '',
      language_code: selectedLanguage,
      content_type: 'page',
      status: 'draft',
      seo_title: '',
      seo_description: '',
      keywords: [],
      region: 'global',
      priority: 1,
      slug: '',
      category: '',
      tags: [],
      author: 'admin',
      translator: '',
      translation_status: 'original',
      translation_quality: 100,
      original_content_id: '',
      translation_source: '',
      auto_translated: false,
      human_reviewed: false,
      publish_date: '',
      expiry_date: '',
      view_count: 0,
      engagement_score: 0,
      conversion_rate: 0,
      reading_time: 0,
      difficulty_level: 'beginner',
      target_audience: '',
      call_to_action: '',
      related_content: [],
      version: '1.0',
      workflow_status: 'draft',
      approval_status: 'pending',
      approved_by: '',
      approval_date: '',
      scheduled_publish: false,
      scheduled_date: '',
      is_featured: false,
      is_archived: false,
      visibility: 'public',
      access_level: 'all',
      cache_enabled: true,
      cache_duration: 3600,
      search_indexed: true,
      last_sync_date: '',
      sync_status: 'pending',
      metadata: {},
      custom_fields: {},
      notes: ''
    });
    setShowCreateModal(true);
  };

  // 编辑内容
  const handleEditContent = content => {
    setSelectedContent(content);
    setFormData(content);
    setShowEditModal(true);
  };

  // 保存内容
  const handleSaveContent = async data => {
    try {
      const currentUser = $w?.auth?.currentUser;
      const now = new Date().toISOString();
      const saveData = {
        ...data,
        updated_at: now,
        updated_by: currentUser?.email || 'admin'
      };
      if (showEditModal && selectedContent) {
        // 更新现有内容
        await $w.cloud.callDataSource({
          dataSourceName: 'multilingual_content',
          methodName: 'wedaUpdateV2',
          params: {
            data: saveData,
            filter: {
              where: {
                _id: {
                  $eq: selectedContent._id
                }
              }
            }
          }
        });
      } else {
        // 创建新内容
        await $w.cloud.callDataSource({
          dataSourceName: 'multilingual_content',
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
      loadContent();
    } catch (error) {
      console.error('保存内容失败:', error);
      alert('保存失败，请重试');
    }
  };

  // 删除内容
  const handleDeleteContent = async id => {
    if (confirm('确定要删除这个内容吗？')) {
      try {
        await $w.cloud.callDataSource({
          dataSourceName: 'multilingual_content',
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
        loadContent();
      } catch (error) {
        console.error('删除内容失败:', error);
        alert('删除失败，请重试');
      }
    }
  };

  // 处理搜索
  const handleSearch = searchData => {
    setSearchResults(searchData.results);
  };

  // 获取语言信息
  const getLanguageInfo = code => {
    return languages.find(lang => lang.code === code) || languages[0];
  };

  // 获取状态颜色
  const getStatusColor = status => {
    const colors = {
      'draft': 'text-gray-500',
      'review': 'text-blue-500',
      'published': 'text-green-500',
      'archived': 'text-red-500'
    };
    return colors[status] || 'text-gray-500';
  };

  // 获取状态文本
  const getStatusText = status => {
    const statusMap = {
      'draft': '草稿',
      'review': '审核中',
      'published': '已发布',
      'archived': '已归档'
    };
    return statusMap[status] || status;
  };

  // 格式化日期
  const formatDate = dateString => {
    return new Date(dateString).toLocaleString('zh-CN');
  };

  // 过滤内容
  const filteredContent = contentItems.filter(item => {
    const matchesSearch = !searchTerm || item.title.toLowerCase().includes(searchTerm.toLowerCase()) || item.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });
  return <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-yellow-500 mb-2">多语言内容管理</h1>
            <p className="text-gray-400">管理多语言内容、翻译、SEO优化和A/B测试</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button onClick={loadContent} variant="outline" className="border-gray-700 text-gray-400">
              <RefreshCw className="w-4 h-4 mr-2" />
              刷新
            </Button>
            <Button onClick={handleCreateContent} className="bg-yellow-500 hover:bg-yellow-600 text-black">
              <Plus className="w-4 h-4 mr-2" />
              创建内容
            </Button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-8 bg-gray-900 rounded-lg p-1 border border-gray-800">
          {[{
          id: 'content',
          label: '内容管理',
          icon: FileText
        }, {
          id: 'search',
          label: '内容搜索',
          icon: Search
        }, {
          id: 'seo',
          label: 'SEO优化',
          icon: Globe
        }, {
          id: 'sitemap',
          label: 'Sitemap',
          icon: Map
        }, {
          id: 'abtest',
          label: 'A/B测试',
          icon: BarChart3
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
          {activeTab === 'content' && <div className="space-y-6">
              {/* Filters */}
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2">
                  <Globe className="w-4 h-4 text-gray-400" />
                  <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                    <SelectTrigger className="w-40 bg-gray-800 border-gray-700">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">所有语言</SelectItem>
                      {languages.map(lang => <SelectItem key={lang.code} value={lang.code}>
                          <div className="flex items-center">
                            <span className="mr-2">{lang.flag}</span>
                            <span>{lang.name}</span>
                          </div>
                        </SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Filter className="w-4 h-4 text-gray-400" />
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-32 bg-gray-800 border-gray-700">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">所有状态</SelectItem>
                      <SelectItem value="draft">草稿</SelectItem>
                      <SelectItem value="review">审核中</SelectItem>
                      <SelectItem value="published">已发布</SelectItem>
                      <SelectItem value="archived">已归档</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <FileText className="w-4 h-4 text-gray-400" />
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="w-32 bg-gray-800 border-gray-700">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">所有类型</SelectItem>
                      {contentTypeOptions.map(option => <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex-1 relative">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="搜索内容..." className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400" />
                </div>
              </div>

              {/* Content List */}
              <div className="space-y-4">
                {isLoading ? <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500"></div>
                    <span className="ml-3 text-gray-400">加载中...</span>
                  </div> : filteredContent.length === 0 ? <div className="text-center py-12">
                    <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <h4 className="text-lg font-medium text-gray-400 mb-2">暂无内容</h4>
                    <p className="text-gray-500">创建您的第一个多语言内容</p>
                  </div> : filteredContent.map(item => {
              const langInfo = getLanguageInfo(item.language_code);
              return <div key={item._id} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center mb-2">
                              <span className="mr-2">{langInfo.flag}</span>
                              <h4 className="text-lg font-medium text-white mr-3">{item.title}</h4>
                              <span className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded">
                                {contentTypeOptions.find(opt => opt.value === item.content_type)?.label}
                              </span>
                              <span className={`ml-2 px-2 py-1 text-xs rounded ${getStatusColor(item.status)}`}>
                                {getStatusText(item.status)}
                              </span>
                              {item.is_featured && <span className="ml-2 px-2 py-1 bg-yellow-500/20 text-yellow-500 text-xs rounded">
                                  精选
                                </span>}
                            </div>
                            
                            <p className="text-gray-300 mb-3 line-clamp-2">{item.description}</p>
                            
                            <div className="flex items-center space-x-4 text-sm text-gray-400">
                              <span className="flex items-center">
                                <Globe className="w-4 h-4 mr-1" />
                                {langInfo.name}
                              </span>
                              <span className="flex items-center">
                                <Clock className="w-4 h-4 mr-1" />
                                {formatDate(item.updated_at)}
                              </span>
                              <span className="flex items-center">
                                <Eye className="w-4 h-4 mr-1" />
                                {item.view_count || 0}
                              </span>
                              {item.translation_status && <span className="flex items-center">
                                  <Languages className="w-4 h-4 mr-1" />
                                  {item.translation_status}
                                </span>}
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2 ml-4">
                            <Button onClick={() => handleEditContent(item)} variant="outline" size="sm" className="border-gray-700 text-gray-400">
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button onClick={() => handleDeleteContent(item._id)} variant="outline" size="sm" className="border-red-500 text-red-500">
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
            </div>}

          {activeTab === 'search' && <LanguageSearch languages={languages} onSearch={handleSearch} searchResults={searchResults} $w={$w} />}

          {activeTab === 'seo' && <MultilingualSEO content={selectedContent} languages={languages} onSave={handleSaveContent} $w={$w} />}

          {activeTab === 'sitemap' && <SitemapGenerator languages={languages} $w={$w} />}

          {activeTab === 'abtest' && <ABTestManager abTests={abTests} languages={languages} onRefresh={loadABTests} $w={$w} />}

          {activeTab === 'analytics' && <div className="text-center py-12">
              <BarChart3 className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h4 className="text-lg font-medium text-gray-400 mb-2">数据分析</h4>
              <p className="text-gray-500">多语言内容数据分析功能正在开发中</p>
            </div>}
        </div>
      </div>

      {/* Create/Edit Modal */}
      {(showCreateModal || showEditModal) && <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-xl border border-gray-800 w-full max-w-6xl max-h-[90vh] overflow-y-auto">
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

              <LanguageContentEditor formData={formData} setFormData={setFormData} languages={languages} contentTypeOptions={contentTypeOptions} regionOptions={regionOptions} onSave={handleSaveContent} onCancel={() => {
            setShowCreateModal(false);
            setShowEditModal(false);
          }} contentId={selectedContent?._id} $w={$w} />
            </div>
          </div>
        </div>}
    </div>;
}