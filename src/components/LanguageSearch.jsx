// @ts-ignore;
import React, { useState, useEffect, useCallback } from 'react';
// @ts-ignore;
import { Button, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Switch } from '@/components/ui';
// @ts-ignore;
import { Search, Globe, Filter, FileText, ExternalLink, Copy, Download, Eye, TrendingUp, Users, Clock, Target, Calendar, BarChart3, Star, ChevronLeft, ChevronRight, X, Settings, Zap, Hash, AlertCircle, CheckCircle, RefreshCw } from 'lucide-react';

export function LanguageSearch({
  languages,
  onSearch,
  searchResults,
  $w = null
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLanguage, setSearchLanguage] = useState('all');
  const [searchType, setSearchType] = useState('all');
  const [searchRegion, setSearchRegion] = useState('all');
  const [searchStatus, setSearchStatus] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');
  const [isSearching, setIsSearching] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [searchHistory, setSearchHistory] = useState([]);
  const [savedSearches, setSavedSearches] = useState([]);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [searchFilters, setSearchFilters] = useState({
    titleOnly: false,
    contentOnly: false,
    keywordsOnly: false,
    exactMatch: false,
    includeDrafts: false,
    dateRange: 'all',
    author: '',
    category: '',
    tags: [],
    minWordCount: 0,
    maxWordCount: 0,
    minQuality: 0,
    featuredOnly: false
  });
  const [searchStats, setSearchStats] = useState({
    totalSearches: 0,
    avgResults: 0,
    popularLanguages: [],
    popularTypes: [],
    recentSearches: []
  });

  // 搜索类型选项
  const searchTypes = [{
    value: 'all',
    label: '所有类型'
  }, {
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
  }];

  // 状态选项
  const statusOptions = [{
    value: 'all',
    label: '所有状态'
  }, {
    value: 'published',
    label: '已发布'
  }, {
    value: 'draft',
    label: '草稿'
  }, {
    value: 'review',
    label: '审核中'
  }, {
    value: 'archived',
    label: '已归档'
  }];

  // 排序选项
  const sortOptions = [{
    value: 'relevance',
    label: '相关性'
  }, {
    value: 'date',
    label: '发布时间'
  }, {
    value: 'updated',
    label: '更新时间'
  }, {
    value: 'views',
    label: '浏览量'
  }, {
    value: 'rating',
    label: '评分'
  }, {
    value: 'quality',
    label: '内容质量'
  }, {
    value: 'title',
    label: '标题'
  }];

  // 地区选项
  const regions = [{
    value: 'all',
    label: '所有地区'
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
    value: 'global',
    label: '全球'
  }];

  // 日期范围选项
  const dateRangeOptions = [{
    value: 'all',
    label: '所有时间'
  }, {
    value: 'today',
    label: '今天'
  }, {
    value: 'week',
    label: '本周'
  }, {
    value: 'month',
    label: '本月'
  }, {
    value: 'quarter',
    label: '本季度'
  }, {
    value: 'year',
    label: '今年'
  }, {
    value: 'custom',
    label: '自定义'
  }];

  // 加载搜索历史和统计
  useEffect(() => {
    loadSearchHistory();
    loadSearchStats();
  }, []);

  // 执行搜索
  const handleSearch = useCallback(async (page = 1) => {
    if (!searchQuery.trim() && !showAdvancedSearch) return;
    setIsSearching(true);
    setCurrentPage(page);
    try {
      if ($w) {
        // 构建搜索条件
        const searchConditions = buildSearchConditions();
        const result = await $w.cloud.callDataSource({
          dataSourceName: 'multilingual_content',
          methodName: 'wedaGetRecordsV2',
          params: {
            filter: {
              where: searchConditions
            },
            orderBy: buildSortOrder(),
            pageSize: 20,
            pageNumber: page,
            getCount: true
          }
        });
        if (result && result.records) {
          // 处理搜索结果
          const processedResults = processSearchResults(result.records, searchQuery);
          if (onSearch) {
            onSearch({
              query: searchQuery,
              results: processedResults,
              total: result.total,
              page: page,
              filters: {
                language: searchLanguage,
                type: searchType,
                region: searchRegion,
                status: searchStatus,
                ...searchFilters
              }
            });
          }
          setTotalResults(result.total || 0);
          setTotalPages(Math.ceil((result.total || 0) / 20));

          // 保存搜索历史
          saveSearchToHistory(searchQuery, result.records.length);
        }
      }
    } catch (error) {
      console.error('搜索失败:', error);
      alert('搜索失败，请重试');
    } finally {
      setIsSearching(false);
    }
  }, [searchQuery, searchLanguage, searchType, searchRegion, searchStatus, sortBy, searchFilters, showAdvancedSearch, $w, onSearch]);

  // 构建搜索条件
  const buildSearchConditions = () => {
    const conditions = {
      $and: []
    };

    // 语言筛选
    if (searchLanguage !== 'all') {
      conditions.$and.push({
        language_code: {
          $eq: searchLanguage
        }
      });
    }

    // 内容类型筛选
    if (searchType !== 'all') {
      conditions.$and.push({
        content_type: {
          $eq: searchType
        }
      });
    }

    // 状态筛选
    if (searchStatus !== 'all') {
      conditions.$and.push({
        status: {
          $eq: searchStatus
        }
      });
    } else if (!searchFilters.includeDrafts) {
      // 默认不包含草稿
      conditions.$and.push({
        status: {
          $ne: 'draft'
        }
      });
    }

    // 地区筛选
    if (searchRegion !== 'all') {
      conditions.$and.push({
        region: {
          $eq: searchRegion
        }
      });
    }

    // 精选内容筛选
    if (searchFilters.featuredOnly) {
      conditions.$and.push({
        is_featured: {
          $eq: true
        }
      });
    }

    // 作者筛选
    if (searchFilters.author) {
      conditions.$and.push({
        author: {
          $eq: searchFilters.author
        }
      });
    }

    // 分类筛选
    if (searchFilters.category) {
      conditions.$and.push({
        category: {
          $eq: searchFilters.category
        }
      });
    }

    // 标签筛选
    if (searchFilters.tags && searchFilters.tags.length > 0) {
      conditions.$and.push({
        tags: {
          $in: searchFilters.tags
        }
      });
    }

    // 字数范围筛选
    if (searchFilters.minWordCount > 0 || searchFilters.maxWordCount > 0) {
      const wordCountCondition = {};
      if (searchFilters.minWordCount > 0) {
        wordCountCondition.$gte = searchFilters.minWordCount;
      }
      if (searchFilters.maxWordCount > 0) {
        wordCountCondition.$lte = searchFilters.maxWordCount;
      }
      conditions.$and.push({
        word_count: wordCountCondition
      });
    }

    // 质量分数筛选
    if (searchFilters.minQuality > 0) {
      conditions.$and.push({
        content_quality: {
          $gte: searchFilters.minQuality
        }
      });
    }

    // 日期范围筛选
    if (searchFilters.dateRange !== 'all') {
      const dateCondition = getDateRangeCondition(searchFilters.dateRange);
      if (dateCondition) {
        conditions.$and.push(dateCondition);
      }
    }

    // 关键词搜索
    if (searchQuery.trim()) {
      const searchConditions = buildKeywordSearchConditions(searchQuery);
      if (searchConditions.length > 0) {
        conditions.$and.push({
          $or: searchConditions
        });
      }
    }
    return conditions.$and.length > 0 ? conditions : {};
  };

  // 构建关键词搜索条件
  const buildKeywordSearchConditions = query => {
    const conditions = [];
    const searchTerm = searchFilters.exactMatch ? query : `${query}*`;
    if (searchFilters.titleOnly) {
      conditions.push({
        title: {
          $search: searchTerm
        }
      });
    } else if (searchFilters.contentOnly) {
      conditions.push({
        content: {
          $search: searchTerm
        }
      });
    } else if (searchFilters.keywordsOnly) {
      conditions.push({
        keywords: {
          $search: searchTerm
        }
      });
    } else {
      // 默认搜索多个字段
      conditions.push({
        title: {
          $search: searchTerm
        }
      });
      conditions.push({
        content: {
          $search: searchTerm
        }
      });
      conditions.push({
        description: {
          $search: searchTerm
        }
      });
      conditions.push({
        keywords: {
          $search: searchTerm
        }
      });
      conditions.push({
        seo_title: {
          $search: searchTerm
        }
      });
      conditions.push({
        seo_description: {
          $search: searchTerm
        }
      });
    }
    return conditions;
  };

  // 构建排序条件
  const buildSortOrder = () => {
    switch (sortBy) {
      case 'date':
        return [{
          publish_date: 'desc'
        }];
      case 'updated':
        return [{
          updated_at: 'desc'
        }];
      case 'views':
        return [{
          view_count: 'desc'
        }];
      case 'rating':
        return [{
          engagement_score: 'desc'
        }];
      case 'quality':
        return [{
          content_quality: 'desc'
        }];
      case 'title':
        return [{
          title: 'asc'
        }];
      default:
        // 相关性排序 - 使用综合评分
        return [{
          content_quality: 'desc'
        }, {
          updated_at: 'desc'
        }];
    }
  };

  // 获取日期范围条件
  const getDateRangeCondition = range => {
    const now = new Date();
    let startDate;
    switch (range) {
      case 'today':
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        break;
      case 'week':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case 'month':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case 'quarter':
        const quarter = Math.floor(now.getMonth() / 3);
        startDate = new Date(now.getFullYear(), quarter * 3, 1);
        break;
      case 'year':
        startDate = new Date(now.getFullYear(), 0, 1);
        break;
      default:
        return null;
    }
    return {
      updated_at: {
        $gte: startDate.toISOString()
      }
    };
  };

  // 处理搜索结果
  const processSearchResults = (results, query) => {
    return results.map(result => {
      // 计算相关性分数
      const relevanceScore = calculateRelevanceScore(result, query);

      // 高亮关键词
      const highlightedResult = highlightKeywords(result, query);
      return {
        ...highlightedResult,
        relevanceScore,
        relevance: relevanceScore / 100 // 转换为0-1的范围
      };
    });
  };

  // 计算相关性分数
  const calculateRelevanceScore = (result, query) => {
    let score = 0;
    const queryLower = query.toLowerCase();

    // 标题匹配权重最高
    if (result.title && result.title.toLowerCase().includes(queryLower)) {
      score += 40;
    }

    // 内容匹配
    if (result.content && result.content.toLowerCase().includes(queryLower)) {
      score += 25;
    }

    // 描述匹配
    if (result.description && result.description.toLowerCase().includes(queryLower)) {
      score += 15;
    }

    // 关键词匹配
    if (result.keywords && result.keywords.some(keyword => keyword.toLowerCase().includes(queryLower))) {
      score += 20;
    }

    // SEO字段匹配
    if (result.seo_title && result.seo_title.toLowerCase().includes(queryLower)) {
      score += 10;
    }
    if (result.seo_description && result.seo_description.toLowerCase().includes(queryLower)) {
      score += 10;
    }

    // 内容质量加分
    if (result.content_quality) {
      score += result.content_quality * 0.1;
    }

    // 精选内容加分
    if (result.is_featured) {
      score += 5;
    }
    return Math.min(score, 100);
  };

  // 高亮关键词
  const highlightKeywords = (result, query) => {
    if (!query) return result;
    const highlightText = (text, query) => {
      if (!text || !query) return text;
      const regex = new RegExp(`(${query})`, 'gi');
      return text.replace(regex, '<mark class="bg-yellow-500 text-black px-1 rounded">$1</mark>');
    };
    return {
      ...result,
      title: highlightText(result.title, query),
      content: highlightText(result.content, query),
      description: highlightText(result.description, query),
      seo_title: highlightText(result.seo_title, query),
      seo_description: highlightText(result.seo_description, query)
    };
  };

  // 保存搜索历史
  const saveSearchToHistory = async (query, resultCount) => {
    if (!query.trim()) return;
    const historyItem = {
      query,
      resultCount,
      timestamp: new Date().toISOString(),
      filters: {
        language: searchLanguage,
        type: searchType,
        region: searchRegion,
        status: searchStatus
      }
    };

    // 更新本地状态
    setSearchHistory(prev => {
      const newHistory = [historyItem, ...prev.filter(item => item.query !== query)].slice(0, 10);
      return newHistory;
    });

    // 保存到数据库（可选）
    try {
      if ($w) {
        await $w.cloud.callDataSource({
          dataSourceName: 'search_history',
          methodName: 'wedaCreateV2',
          params: {
            data: historyItem
          }
        });
      }
    } catch (error) {
      console.error('保存搜索历史失败:', error);
    }
  };

  // 加载搜索历史
  const loadSearchHistory = async () => {
    try {
      if ($w) {
        const result = await $w.cloud.callDataSource({
          dataSourceName: 'search_history',
          methodName: 'wedaGetRecordsV2',
          params: {
            orderBy: [{
              timestamp: 'desc'
            }],
            pageSize: 10
          }
        });
        if (result && result.records) {
          setSearchHistory(result.records);
        }
      }
    } catch (error) {
      console.error('加载搜索历史失败:', error);
    }
  };

  // 加载搜索统计
  const loadSearchStats = async () => {
    try {
      if ($w) {
        // 这里可以实现更复杂的统计查询
        // 暂时使用模拟数据
        setSearchStats({
          totalSearches: 1250,
          avgResults: 15.5,
          popularLanguages: ['zh', 'en', 'ja'],
          popularTypes: ['product', 'blog', 'page'],
          recentSearches: ['AI太极', '智能戒指', 'SOS RING']
        });
      }
    } catch (error) {
      console.error('加载搜索统计失败:', error);
    }
  };

  // 保存搜索
  const saveSearch = async () => {
    if (!searchQuery.trim()) return;
    const savedSearch = {
      name: `${searchQuery} (${new Date().toLocaleDateString()})`,
      query: searchQuery,
      filters: {
        language: searchLanguage,
        type: searchType,
        region: searchRegion,
        status: searchStatus,
        ...searchFilters
      },
      created_at: new Date().toISOString()
    };
    try {
      if ($w) {
        await $w.cloud.callDataSource({
          dataSourceName: 'saved_searches',
          methodName: 'wedaCreateV2',
          params: {
            data: savedSearch
          }
        });
        setSavedSearches(prev => [savedSearch, ...prev]);
        alert('搜索已保存');
      }
    } catch (error) {
      console.error('保存搜索失败:', error);
      alert('保存失败，请重试');
    }
  };

  // 加载保存的搜索
  const loadSavedSearches = async () => {
    try {
      if ($w) {
        const result = await $w.cloud.callDataSource({
          dataSourceName: 'saved_searches',
          methodName: 'wedaGetRecordsV2',
          params: {
            orderBy: [{
              created_at: 'desc'
            }],
            pageSize: 20
          }
        });
        if (result && result.records) {
          setSavedSearches(result.records);
        }
      }
    } catch (error) {
      console.error('加载保存的搜索失败:', error);
    }
  };

  // 应用保存的搜索
  const applySavedSearch = savedSearch => {
    setSearchQuery(savedSearch.query);
    setSearchLanguage(savedSearch.filters.language || 'all');
    setSearchType(savedSearch.filters.type || 'all');
    setSearchRegion(savedSearch.filters.region || 'all');
    setSearchStatus(savedSearch.filters.status || 'all');
    setSearchFilters(savedSearch.filters);
  };

  // 导出搜索结果
  const exportResults = async () => {
    try {
      if ($w && searchResults.length > 0) {
        const exportData = searchResults.map(result => ({
          标题: result.title,
          语言: result.language_code,
          类型: result.content_type,
          状态: result.status,
          地区: result.region,
          更新时间: result.updated_at,
          浏览量: result.view_count,
          相关性: result.relevanceScore
        }));

        // 这里可以实现CSV导出功能
        const csv = convertToCSV(exportData);
        downloadCSV(csv, `search_results_${new Date().toISOString().split('T')[0]}.csv`);
        alert('搜索结果已导出');
      }
    } catch (error) {
      console.error('导出失败:', error);
      alert('导出失败，请重试');
    }
  };

  // 转换为CSV格式
  const convertToCSV = data => {
    if (data.length === 0) return '';
    const headers = Object.keys(data[0]);
    const csvHeaders = headers.join(',');
    const csvRows = data.map(row => headers.map(header => `"${row[header] || ''}"`).join(','));
    return [csvHeaders, ...csvRows].join('\n');
  };

  // 下载CSV文件
  const downloadCSV = (csv, filename) => {
    const blob = new Blob([csv], {
      type: 'text/csv;charset=utf-8;'
    });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 获取语言信息
  const getLanguageInfo = code => {
    return languages.find(lang => lang.code === code) || languages[0];
  };

  // 格式化日期
  const formatDate = dateString => {
    return new Date(dateString).toLocaleString('zh-CN');
  };

  // 重置搜索
  const resetSearch = () => {
    setSearchQuery('');
    setSearchLanguage('all');
    setSearchType('all');
    setSearchRegion('all');
    setSearchStatus('all');
    setSortBy('relevance');
    setSearchFilters({
      titleOnly: false,
      contentOnly: false,
      keywordsOnly: false,
      exactMatch: false,
      includeDrafts: false,
      dateRange: 'all',
      author: '',
      category: '',
      tags: [],
      minWordCount: 0,
      maxWordCount: 0,
      minQuality: 0,
      featuredOnly: false
    });
    setCurrentPage(1);
  };
  return <div className="space-y-6">
      {/* Search Interface */}
      <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-yellow-500 flex items-center">
            <Search className="w-6 h-6 mr-2" />
            多语言搜索
          </h3>
          <div className="flex items-center space-x-2">
            <Button onClick={() => setShowAdvancedSearch(!showAdvancedSearch)} variant="outline" size="sm" className="border-gray-700 text-gray-400">
              <Settings className="w-4 h-4 mr-2" />
              高级搜索
            </Button>
            <Button onClick={loadSavedSearches} variant="outline" size="sm" className="border-gray-700 text-gray-400">
              <RefreshCw className="w-4 h-4 mr-2" />
              刷新
            </Button>
          </div>
        </div>

        {/* Main Search Bar */}
        <div className="relative mb-6">
          <Search className="w-6 h-6 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
          <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleSearch(1)} placeholder="输入搜索关键词，支持多语言搜索..." className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-12 pr-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 text-lg" />
          <Button onClick={() => handleSearch(1)} disabled={isSearching || !searchQuery.trim() && !showAdvancedSearch} className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-yellow-500 hover:bg-yellow-600 text-black">
            {isSearching ? '搜索中...' : '搜索'}
          </Button>
        </div>

        {/* Search Filters */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">语言</label>
            <Select value={searchLanguage} onValueChange={setSearchLanguage}>
              <SelectTrigger className="bg-gray-800 border-gray-700">
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

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">内容类型</label>
            <Select value={searchType} onValueChange={setSearchType}>
              <SelectTrigger className="bg-gray-800 border-gray-700">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {searchTypes.map(type => <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">状态</label>
            <Select value={searchStatus} onValueChange={setSearchStatus}>
              <SelectTrigger className="bg-gray-800 border-gray-700">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map(status => <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">地区</label>
            <Select value={searchRegion} onValueChange={setSearchRegion}>
              <SelectTrigger className="bg-gray-800 border-gray-700">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {regions.map(region => <SelectItem key={region.value} value={region.value}>
                    {region.label}
                  </SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">排序方式</label>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="bg-gray-800 border-gray-700">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map(option => <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Advanced Search Options */}
        {showAdvancedSearch && <div className="border-t border-gray-700 pt-6">
            <h4 className="text-lg font-medium mb-4 text-yellow-500">高级搜索选项</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* 搜索范围 */}
              <div>
                <h5 className="text-sm font-medium text-gray-300 mb-3">搜索范围</h5>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <Switch checked={searchFilters.titleOnly} onCheckedChange={checked => setSearchFilters(prev => ({
                  ...prev,
                  titleOnly: checked
                }))} />
                    <span className="text-sm text-gray-300">仅搜索标题</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <Switch checked={searchFilters.contentOnly} onCheckedChange={checked => setSearchFilters(prev => ({
                  ...prev,
                  contentOnly: checked
                }))} />
                    <span className="text-sm text-gray-300">仅搜索内容</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <Switch checked={searchFilters.keywordsOnly} onCheckedChange={checked => setSearchFilters(prev => ({
                  ...prev,
                  keywordsOnly: checked
                }))} />
                    <span className="text-sm text-gray-300">仅搜索关键词</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <Switch checked={searchFilters.exactMatch} onCheckedChange={checked => setSearchFilters(prev => ({
                  ...prev,
                  exactMatch: checked
                }))} />
                    <span className="text-sm text-gray-300">精确匹配</span>
                  </label>
                </div>
              </div>

              {/* 内容筛选 */}
              <div>
                <h5 className="text-sm font-medium text-gray-300 mb-3">内容筛选</h5>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">作者</label>
                    <Input value={searchFilters.author} onChange={e => setSearchFilters(prev => ({
                  ...prev,
                  author: e.target.value
                }))} placeholder="输入作者名称" className="bg-gray-800 border-gray-700 text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">分类</label>
                    <Input value={searchFilters.category} onChange={e => setSearchFilters(prev => ({
                  ...prev,
                  category: e.target.value
                }))} placeholder="输入分类名称" className="bg-gray-800 border-gray-700 text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">日期范围</label>
                    <Select value={searchFilters.dateRange} onValueChange={value => setSearchFilters(prev => ({
                  ...prev,
                  dateRange: value
                }))}>
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {dateRangeOptions.map(option => <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* 质量筛选 */}
              <div>
                <h5 className="text-sm font-medium text-gray-300 mb-3">质量筛选</h5>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">最小字数</label>
                    <Input type="number" value={searchFilters.minWordCount} onChange={e => setSearchFilters(prev => ({
                  ...prev,
                  minWordCount: parseInt(e.target.value) || 0
                }))} placeholder="0" className="bg-gray-800 border-gray-700 text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">最大字数</label>
                    <Input type="number" value={searchFilters.maxWordCount} onChange={e => setSearchFilters(prev => ({
                  ...prev,
                  maxWordCount: parseInt(e.target.value) || 0
                }))} placeholder="0" className="bg-gray-800 border-gray-700 text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">最小质量分数</label>
                    <Input type="number" value={searchFilters.minQuality} onChange={e => setSearchFilters(prev => ({
                  ...prev,
                  minQuality: parseInt(e.target.value) || 0
                }))} placeholder="0" className="bg-gray-800 border-gray-700 text-sm" />
                  </div>
                  <label className="flex items-center space-x-2">
                    <Switch checked={searchFilters.featuredOnly} onCheckedChange={checked => setSearchFilters(prev => ({
                  ...prev,
                  featuredOnly: checked
                }))} />
                    <span className="text-sm text-gray-300">仅精选内容</span>
                  </label>
                </div>
              </div>
            </div>
          </div>}

        {/* Quick Actions */}
        <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-700">
          <div className="flex items-center space-x-3">
            <Button onClick={resetSearch} variant="outline" size="sm" className="border-gray-700 text-gray-400">
              <Filter className="w-4 h-4 mr-2" />
              重置筛选
            </Button>
            <Button onClick={saveSearch} variant="outline" size="sm" className="border-gray-700 text-gray-400">
              <Star className="w-4 h-4 mr-2" />
              保存搜索
            </Button>
            <Button onClick={exportResults} variant="outline" size="sm" className="border-gray-700 text-gray-400">
              <Download className="w-4 h-4 mr-2" />
              导出结果
            </Button>
          </div>
          
          <div className="text-sm text-gray-400">
            {totalResults > 0 && `找到 ${totalResults} 条结果`}
          </div>
        </div>
      </div>

      {/* Search History and Saved Searches */}
      {(searchHistory.length > 0 || savedSearches.length > 0) && <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Search History */}
          {searchHistory.length > 0 && <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
              <h4 className="text-sm font-medium text-gray-300 mb-3 flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                搜索历史
              </h4>
              <div className="space-y-2">
                {searchHistory.slice(0, 5).map((item, index) => <div key={index} className="flex items-center justify-between text-sm">
                    <button onClick={() => {
              setSearchQuery(item.query);
              setSearchLanguage(item.filters.language || 'all');
              setSearchType(item.filters.type || 'all');
              setSearchRegion(item.filters.region || 'all');
              setSearchStatus(item.filters.status || 'all');
            }} className="text-gray-300 hover:text-yellow-500 truncate flex-1 text-left">
                      {item.query}
                    </button>
                    <span className="text-gray-500 text-xs ml-2">
                      {item.resultCount} 结果
                    </span>
                  </div>)}
              </div>
            </div>}

          {/* Saved Searches */}
          {savedSearches.length > 0 && <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
              <h4 className="text-sm font-medium text-gray-300 mb-3 flex items-center">
                <Star className="w-4 h-4 mr-2" />
                保存的搜索
              </h4>
              <div className="space-y-2">
                {savedSearches.slice(0, 5).map((item, index) => <div key={index} className="flex items-center justify-between text-sm">
                    <button onClick={() => applySavedSearch(item)} className="text-gray-300 hover:text-yellow-500 truncate flex-1 text-left">
                      {item.name}
                    </button>
                    <span className="text-gray-500 text-xs ml-2">
                      {formatDate(item.created_at)}
                    </span>
                  </div>)}
              </div>
            </div>}
        </div>}

      {/* Search Results */}
      <div className="bg-gray-900 rounded-lg border border-gray-800">
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-medium text-white">
              搜索结果 
              {totalResults > 0 && <span className="ml-2 text-gray-400">({totalResults} 条)</span>}
            </h4>
            {totalResults > 0 && <div className="text-sm text-gray-400">
              第 {currentPage} 页，共 {totalPages} 页
            </div>}
          </div>
        </div>

        <div className="p-6">
          {isSearching ? <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500"></div>
              <span className="ml-3 text-gray-400">搜索中...</span>
            </div> : searchResults.length === 0 ? <div className="text-center py-12">
              <Search className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h4 className="text-lg font-medium text-gray-400 mb-2">暂无搜索结果</h4>
              <p className="text-gray-500">尝试使用不同的关键词或筛选条件</p>
            </div> : <div className="space-y-4">
              {searchResults.map((result, index) => {
            const langInfo = getLanguageInfo(result.language_code);
            const isRTL = langInfo.direction === 'rtl';
            return <div key={index} className="bg-gray-800 rounded-lg p-4 hover:bg-gray-750 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <span className="mr-2">{langInfo.flag}</span>
                          <h5 className="text-lg font-medium text-white mr-3" dangerouslySetInnerHTML={{
                      __html: result.title || ''
                    }} />
                          <span className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded">
                            {result.content_type}
                          </span>
                          {result.is_featured && <span className="ml-2 px-2 py-1 bg-yellow-500/20 text-yellow-500 text-xs rounded">
                              精选
                            </span>}
                          {result.relevanceScore && <span className="ml-2 px-2 py-1 bg-blue-500/20 text-blue-500 text-xs rounded">
                              {Math.round(result.relevanceScore)}% 相关
                            </span>}
                        </div>
                        
                        <p className="text-gray-300 mb-3 line-clamp-2" dangerouslySetInnerHTML={{
                    __html: result.description || result.content || ''
                  }} dir={isRTL ? 'rtl' : 'ltr'} />
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-400 mb-3">
                          <span className="flex items-center">
                            <Globe className="w-4 h-4 mr-1" />
                            {langInfo.name}
                          </span>
                          <span className="flex items-center">
                            <Target className="w-4 h-4 mr-1" />
                            {result.region}
                          </span>
                          <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {formatDate(result.updated_at)}
                          </span>
                          <span className="flex items-center">
                            <Eye className="w-4 h-4 mr-1" />
                            {result.view_count || 0}
                          </span>
                          <span className="flex items-center">
                            <TrendingUp className="w-4 h-4 mr-1" />
                            {result.engagement_score || 0}
                          </span>
                          {result.content_quality && <span className="flex items-center">
                              <BarChart3 className="w-4 h-4 mr-1" />
                              质量: {result.content_quality}
                            </span>}
                        </div>

                        {result.keywords && result.keywords.length > 0 && <div className="flex flex-wrap gap-2 mb-3">
                            {result.keywords.slice(0, 5).map((keyword, idx) => <span key={idx} className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded" dangerouslySetInnerHTML={{
                      __html: keyword
                    }} />)}
                          </div>}
                      </div>
                      
                      <div className="flex items-center space-x-2 ml-4">
                        <Button onClick={() => window.open(`/view/${result._id}`, '_blank')} variant="outline" size="sm" className="border-gray-700 text-gray-400 hover:border-gray-600 hover:text-white">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                        <Button onClick={() => navigator.clipboard.writeText(window.location.origin + `/view/${result._id}`)} variant="outline" size="sm" className="border-gray-700 text-gray-400 hover:border-gray-600 hover:text-white">
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>;
          })}
            </div>}
        </div>

        {/* Pagination */}
        {totalPages > 1 && <div className="flex items-center justify-center space-x-2 p-6 border-t border-gray-800">
            <Button onClick={() => handleSearch(Math.max(1, currentPage - 1))} disabled={currentPage === 1} variant="outline" className="border-gray-700 text-gray-400 hover:border-gray-600 hover:text-white">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            
            {[...Array(Math.min(5, totalPages))].map((_, index) => {
          const pageNum = index + 1;
          const isActive = currentPage === pageNum;
          return <Button key={pageNum} onClick={() => handleSearch(pageNum)} variant={isActive ? "default" : "outline"} className={isActive ? "bg-yellow-500 text-black" : "border-gray-700 text-gray-400 hover:border-gray-600 hover:text-white"}>
                {pageNum}
              </Button>;
        })}
            
            {totalPages > 5 && <span className="text-gray-400">...</span>}
            
            {totalPages > 5 && <Button onClick={() => handleSearch(totalPages)} variant={currentPage === totalPages ? "default" : "outline"} className={currentPage === totalPages ? "bg-yellow-500 text-black" : "border-gray-700 text-gray-400 hover:border-gray-600 hover:text-white"}>
              {totalPages}
            </Button>}
            
            <Button onClick={() => handleSearch(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages} variant="outline" className="border-gray-700 text-gray-400 hover:border-gray-600 hover:text-white">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>}
      </div>

      {/* Search Statistics */}
      {searchResults.length > 0 && <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
          <h4 className="text-lg font-medium mb-4 text-yellow-500">搜索统计</h4>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{totalResults}</div>
              <div className="text-sm text-gray-400">总结果数</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">
                {new Set(searchResults.map(r => r.language_code)).size}
              </div>
              <div className="text-sm text-gray-400">涉及语言</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">
                {Math.round(searchResults.reduce((sum, r) => sum + (r.relevanceScore || 0), 0) / searchResults.length)}%
              </div>
              <div className="text-sm text-gray-400">平均相关度</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">
                {searchResults.reduce((sum, r) => sum + (r.view_count || 0), 0).toLocaleString()}
              </div>
              <div className="text-sm text-gray-400">总浏览量</div>
            </div>
          </div>
        </div>}
    </div>;
}