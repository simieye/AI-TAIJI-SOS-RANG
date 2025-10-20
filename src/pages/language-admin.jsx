// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Textarea } from '@/components/ui';
// @ts-ignore;
import { Globe, Plus, Edit2, Trash2, Search, Filter, Copy, Eye, CheckCircle, XCircle, Clock, BarChart3, Languages, FileText, Upload, Download, RefreshCw, Save, X, ChevronLeft, ChevronRight, Flag, Users, Target, TrendingUp } from 'lucide-react';

import { Navigation } from '@/components/Navigation';
import { LanguageContentEditor } from '@/components/LanguageContentEditor';
import { LanguageSearch } from '@/components/LanguageSearch';
import { ABTestManager } from '@/components/ABTestManager';
import { RegionalLandingPage } from '@/components/RegionalLandingPage';
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
  const [landingPages, setLandingPages] = useState([]);
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
    title: '',
    content: '',
    language: 'zh',
    type: 'page',
    status: 'draft',
    seoTitle: '',
    seoDescription: '',
    keywords: [],
    region: 'global',
    priority: 1
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
  }, {
    code: 'id',
    name: 'Bahasa Indonesia',
    flag: '🇮🇩',
    direction: 'ltr',
    region: 'id'
  }, {
    code: 'ms',
    name: 'Bahasa Melayu',
    flag: '🇲🇾',
    direction: 'ltr',
    region: 'my'
  }, {
    code: 'tr',
    name: 'Türkçe',
    flag: '🇹🇷',
    direction: 'ltr',
    region: 'tr'
  }, {
    code: 'pl',
    name: 'Polski',
    flag: '🇵🇱',
    direction: 'ltr',
    region: 'pl'
  }, {
    code: 'nl',
    name: 'Nederlands',
    flag: '🇳🇱',
    direction: 'ltr',
    region: 'nl'
  }, {
    code: 'sv',
    name: 'Svenska',
    flag: '🇸🇪',
    direction: 'ltr',
    region: 'se'
  }, {
    code: 'da',
    name: 'Dansk',
    flag: '🇩🇰',
    direction: 'ltr',
    region: 'dk'
  }, {
    code: 'no',
    name: 'Norsk',
    flag: '🇳🇴',
    direction: 'ltr',
    region: 'no'
  }, {
    code: 'fi',
    name: 'Suomi',
    flag: '🇫🇮',
    direction: 'ltr',
    region: 'fi'
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
    value: 'news',
    label: '新闻资讯'
  }, {
    value: 'faq',
    label: '常见问题'
  }, {
    value: 'legal',
    label: '法律条款'
  }, {
    value: 'marketing',
    label: '营销文案'
  }, {
    value: 'email',
    label: '邮件模板'
  }, {
    value: 'social',
    label: '社交媒体'
  }, {
    value: 'notification',
    label: '通知消息'
  }];

  // 状态选项
  const statusOptions = [{
    value: 'all',
    label: '全部状态'
  }, {
    value: 'draft',
    label: '草稿'
  }, {
    value: 'review',
    label: '审核中'
  }, {
    value: 'published',
    label: '已发布'
  }, {
    value: 'archived',
    label: '已归档'
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
    value: 'mo',
    label: '澳门地区'
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
    value: 'me',
    label: '中东'
  }, {
    value: 'af',
    label: '非洲'
  }, {
    value: 'la',
    label: '拉丁美洲'
  }, {
    value: 'oc',
    label: '大洋洲'
  }];
  useEffect(() => {
    loadData();
  }, [selectedLanguage, currentPage, filterStatus, filterType]);
  const loadData = async () => {
    setIsLoading(true);
    try {
      await Promise.all([loadContentItems(), loadTranslations(), loadABTests(), loadLandingPages()]);
    } catch (error) {
      console.error('加载数据失败:', error);
    } finally {
      setIsLoading(false);
    }
  };
  const loadContentItems = async () => {
    try {
      const result = await $w.cloud.callDataSource({
        dataSourceName: 'multilingual_content',
        methodName: 'wedaGetRecordsV2',
        params: {
          filter: {
            where: {
              $and: [{
                language: {
                  $eq: selectedLanguage
                }
              }, filterStatus !== 'all' ? {
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
            updated_at: 'desc'
          }],
          pageSize: 20,
          pageNumber: currentPage
        }
      });
      if (result && result.records) {
        setContentItems(result.records);
        setTotalPages(Math.ceil((result.total || 0) / 20));
      }
    } catch (error) {
      console.error('加载内容失败:', error);
      // 使用示例数据
      const sampleContent = [{
        _id: 'sample-1',
        title: 'AI太极 SOS RING 智能戒指',
        content: '革命性的智能戒指产品，融合主权AI技术与传统太极哲学...',
        language: 'zh',
        type: 'product',
        status: 'published',
        seo_title: 'AI太极 SOS RING - 智能戒指产品介绍',
        seo_description: '了解AI太极SOS RING智能戒指的创新功能和健康守护能力',
        keywords: ['智能戒指', 'AI太极', '健康守护', '主权AI'],
        region: 'global',
        priority: 1,
        created_at: '2025-01-20T10:00:00Z',
        updated_at: '2025-01-20T10:00:00Z'
      }];
      setContentItems(sampleContent);
    }
  };
  const loadTranslations = async () => {
    try {
      const result = await $w.cloud.callDataSource({
        dataSourceName: 'content_translations',
        methodName: 'wedaGetRecordsV2',
        params: {
          orderBy: [{
            updated_at: 'desc'
          }],
          pageSize: 100
        }
      });
      if (result && result.records) {
        setTranslations(result.records);
      }
    } catch (error) {
      console.error('加载翻译失败:', error);
      setTranslations([]);
    }
  };
  const loadABTests = async () => {
    try {
      const result = await $w.cloud.callDataSource({
        dataSourceName: 'multilingual_ab_tests',
        methodName: 'wedaGetRecordsV2',
        params: {
          orderBy: [{
            created_at: 'desc'
          }],
          pageSize: 50
        }
      });
      if (result && result.records) {
        setAbTests(result.records);
      }
    } catch (error) {
      console.error('加载A/B测试失败:', error);
      setAbTests([]);
    }
  };
  const loadLandingPages = async () => {
    try {
      const result = await $w.cloud.callDataSource({
        dataSourceName: 'regional_landing_pages',
        methodName: 'wedaGetRecordsV2',
        params: {
          orderBy: [{
            created_at: 'desc'
          }],
          pageSize: 50
        }
      });
      if (result && result.records) {
        setLandingPages(result.records);
      }
    } catch (error) {
      console.error('加载落地页失败:', error);
      setLandingPages([]);
    }
  };
  const handleCreateContent = () => {
    setFormData({
      title: '',
      content: '',
      language: selectedLanguage,
      type: 'page',
      status: 'draft',
      seoTitle: '',
      seoDescription: '',
      keywords: [],
      region: 'global',
      priority: 1
    });
    setShowCreateModal(true);
  };
  const handleEditContent = content => {
    setSelectedContent(content);
    setFormData({
      title: content.title || '',
      content: content.content || '',
      language: content.language || selectedLanguage,
      type: content.type || 'page',
      status: content.status || 'draft',
      seoTitle: content.seo_title || '',
      seoDescription: content.seo_description || '',
      keywords: content.keywords || [],
      region: content.region || 'global',
      priority: content.priority || 1
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
        language: formData.language,
        type: formData.type,
        status: formData.status,
        seo_title: formData.seoTitle,
        seo_description: formData.seoDescription,
        keywords: formData.keywords,
        region: formData.region,
        priority: formData.priority,
        updated_at: now,
        updated_by: currentUser?.email || 'admin'
      };
      if (showEditModal && selectedContent) {
        // 更新现有内容
        await $w.cloud.callDataSource({
          dataSourceName: 'multilingual_content',
          methodName: 'wedaUpdateV2',
          params: {
            data: contentData,
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
              ...contentData,
              created_at: now,
              created_by: currentUser?.email || 'admin'
            }
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
        loadData();
      } catch (error) {
        console.error('删除内容失败:', error);
        alert('删除失败，请重试');
      }
    }
  };
  const handleTranslateContent = async (contentId, targetLanguage) => {
    try {
      // 调用翻译API
      const translationResult = await $w.cloud.callFunction({
        name: 'translate-content',
        data: {
          contentId,
          targetLanguage,
          sourceLanguage: selectedLanguage
        }
      });
      if (translationResult.success) {
        alert('翻译完成');
        loadData();
      } else {
        alert('翻译失败: ' + translationResult.error);
      }
    } catch (error) {
      console.error('翻译失败:', error);
      alert('翻译失败，请重试');
    }
  };
  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }
    try {
      const result = await $w.cloud.callFunction({
        name: 'multilingual-search',
        data: {
          query: searchTerm,
          language: selectedLanguage,
          filters: {
            status: filterStatus !== 'all' ? filterStatus : undefined,
            type: filterType !== 'all' ? filterType : undefined
          }
        }
      });
      if (result.success) {
        setSearchResults(result.results || []);
      }
    } catch (error) {
      console.error('搜索失败:', error);
      alert('搜索失败，请重试');
    }
  };
  const getLanguageInfo = code => {
    return supportedLanguages.find(lang => lang.code === code) || supportedLanguages[0];
  };
  const getStatusIcon = status => {
    switch (status) {
      case 'published':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'review':
        return <Clock className="w-5 h-5 text-blue-500" />;
      case 'draft':
        return <FileText className="w-5 h-5 text-gray-500" />;
      case 'archived':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <FileText className="w-5 h-5 text-gray-500" />;
    }
  };
  const getStatusText = status => {
    const statusMap = {
      'published': '已发布',
      'review': '审核中',
      'draft': '草稿',
      'archived': '已归档'
    };
    return statusMap[status] || status;
  };
  const formatDate = dateString => {
    return new Date(dateString).toLocaleString('zh-CN');
  };
  const filteredContent = contentItems.filter(content => {
    const matchesSearch = !searchTerm || content.title.toLowerCase().includes(searchTerm.toLowerCase()) || content.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });
  return <div className="min-h-screen bg-black text-white">
      <Navigation currentPage="language-admin" $w={$w} />

      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-yellow-500">多语言内容管理</h1>
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

        {/* Language Selector */}
        <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Globe className="w-6 h-6 text-yellow-500" />
              <span className="text-lg font-medium">选择语言:</span>
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger className="w-64 bg-gray-800 border-gray-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {supportedLanguages.map(lang => <SelectItem key={lang.code} value={lang.code}>
                      <div className="flex items-center">
                        <span className="mr-2">{lang.flag}</span>
                        <span>{lang.name}</span>
                      </div>
                    </SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="text-sm text-gray-400">
              共 {contentItems.length} 条内容
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-8 mb-8 border-b border-gray-800">
          <button onClick={() => setActiveTab('content')} className={`pb-4 px-2 font-medium transition-colors ${activeTab === 'content' ? 'text-yellow-500 border-b-2 border-yellow-500' : 'text-gray-400 hover:text-white'}`}>
            <FileText className="w-5 h-5 inline mr-2" />
            内容管理
          </button>
          <button onClick={() => setActiveTab('search')} className={`pb-4 px-2 font-medium transition-colors ${activeTab === 'search' ? 'text-yellow-500 border-b-2 border-yellow-500' : 'text-gray-400 hover:text-white'}`}>
            <Search className="w-5 h-5 inline mr-2" />
            多语言搜索
          </button>
          <button onClick={() => setActiveTab('abtest')} className={`pb-4 px-2 font-medium transition-colors ${activeTab === 'abtest' ? 'text-yellow-500 border-b-2 border-yellow-500' : 'text-gray-400 hover:text-white'}`}>
            <BarChart3 className="w-5 h-5 inline mr-2" />
            A/B测试
          </button>
          <button onClick={() => setActiveTab('landing')} className={`pb-4 px-2 font-medium transition-colors ${activeTab === 'landing' ? 'text-yellow-500 border-b-2 border-yellow-500' : 'text-gray-400 hover:text-white'}`}>
            <Target className="w-5 h-5 inline mr-2" />
            营销落地页
          </button>
        </div>

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
                
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="bg-gray-800 border-gray-700">
                    <SelectValue placeholder="选择类型" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">所有类型</SelectItem>
                    {contentTypeOptions.map(option => <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>)}
                  </SelectContent>
                </Select>
                
                <Button onClick={() => {
              setSearchTerm('');
              setFilterStatus('all');
              setFilterType('all');
            }} variant="outline" className="border-gray-700 text-gray-400 hover:border-gray-600 hover:text-white">
                  <Filter className="w-4 h-4 mr-2" />
                  重置筛选
                </Button>
              </div>
            </div>

            {/* Content List */}
            <div className="space-y-4">
              {filteredContent.map(content => {
            const langInfo = getLanguageInfo(content.language);
            return <div key={content._id} className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-3">
                          <span className="mr-3">{langInfo.flag}</span>
                          <h3 className="text-lg font-medium mr-3">{content.title}</h3>
                          {getStatusIcon(content.status)}
                          <span className="ml-2 text-sm text-gray-400">{getStatusText(content.status)}</span>
                          <span className="ml-4 px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded">
                            {contentTypeOptions.find(opt => opt.value === content.type)?.label}
                          </span>
                        </div>
                        
                        <p className="text-gray-300 mb-4 line-clamp-2">{content.content}</p>
                        
                        <div className="flex items-center space-x-6 text-sm text-gray-400 mb-4">
                          <span className="flex items-center">
                            <Globe className="w-4 h-4 mr-1" />
                            {langInfo.name}
                          </span>
                          <span className="flex items-center">
                            <Flag className="w-4 h-4 mr-1" />
                            {regionOptions.find(opt => opt.value === content.region)?.label}
                          </span>
                          <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {formatDate(content.updated_at)}
                          </span>
                          <span>优先级: {content.priority}</span>
                        </div>
                        
                        {content.keywords && content.keywords.length > 0 && <div className="flex flex-wrap gap-2 mb-4">
                            {content.keywords.map((keyword, index) => <span key={index} className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded">
                                {keyword}
                              </span>)}
                          </div>}
                      </div>
                      
                      <div className="flex items-center space-x-2 ml-4">
                        <Select onValueChange={value => handleTranslateContent(content._id, value)}>
                          <SelectTrigger className="w-32 border-gray-700 text-gray-400">
                            <SelectValue placeholder="翻译" />
                          </SelectTrigger>
                          <SelectContent>
                            {supportedLanguages.filter(lang => lang.code !== content.language).map(lang => <SelectItem key={lang.code} value={lang.code}>
                                  <div className="flex items-center">
                                    <span className="mr-2">{lang.flag}</span>
                                    <span>{lang.name}</span>
                                  </div>
                                </SelectItem>)}
                          </SelectContent>
                        </Select>
                        
                        <Button onClick={() => handleEditContent(content)} variant="outline" size="sm" className="border-gray-700 text-gray-400 hover:border-gray-600 hover:text-white">
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button onClick={() => handleDeleteContent(content._id)} variant="outline" size="sm" className="border-red-500 text-red-500 hover:border-red-400 hover:text-red-400">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>;
          })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && <div className="flex items-center justify-center space-x-2 mt-8">
                <Button onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} disabled={currentPage === 1} variant="outline" className="border-gray-700 text-gray-400 hover:border-gray-600 hover:text-white">
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                
                {[...Array(totalPages)].map((_, index) => <Button key={index + 1} onClick={() => setCurrentPage(index + 1)} variant={currentPage === index + 1 ? "default" : "outline"} className={currentPage === index + 1 ? "bg-yellow-500 text-black" : "border-gray-700 text-gray-400 hover:border-gray-600 hover:text-white"}>
                    {index + 1}
                  </Button>)}
                
                <Button onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages} variant="outline" className="border-gray-700 text-gray-400 hover:border-gray-600 hover:text-white">
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>}
          </div>}

        {/* Search Tab */}
        {activeTab === 'search' && <LanguageSearch languages={supportedLanguages} onSearch={handleSearch} searchResults={searchResults} />}

        {/* A/B Test Tab */}
        {activeTab === 'abtest' && <ABTestManager abTests={abTests} languages={supportedLanguages} onRefresh={loadABTests} />}

        {/* Landing Page Tab */}
        {activeTab === 'landing' && <RegionalLandingPage landingPages={landingPages} languages={supportedLanguages} regions={regionOptions} onRefresh={loadLandingPages} />}
      </div>

      {/* Create/Edit Modal */}
      {(showCreateModal || showEditModal) && <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-xl border border-gray-800 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
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

              <LanguageContentEditor formData={formData} setFormData={setFormData} languages={supportedLanguages} contentTypeOptions={contentTypeOptions} regionOptions={regionOptions} />

              <div className="flex space-x-3 mt-6">
                <Button onClick={() => {
              setShowCreateModal(false);
              setShowEditModal(false);
            }} variant="outline" className="flex-1 border-gray-700 text-gray-400 hover:border-gray-600 hover:text-white">
                  取消
                </Button>
                <Button onClick={handleSaveContent} className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black">
                  <Save className="w-4 h-4 mr-2" />
                  保存
                </Button>
              </div>
            </div>
          </div>
        </div>}
    </div>;
}