// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Button, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';
// @ts-ignore;
import { Search, Globe, Filter, FileText, ExternalLink, Copy, Download, Eye, TrendingUp, Users, Clock, Target } from 'lucide-react';

export function LanguageSearch({
  languages,
  onSearch,
  searchResults
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLanguage, setSearchLanguage] = useState('all');
  const [searchType, setSearchType] = useState('all');
  const [searchRegion, setSearchRegion] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');
  const [isSearching, setIsSearching] = useState(false);
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
  }];
  const sortOptions = [{
    value: 'relevance',
    label: '相关性'
  }, {
    value: 'date',
    label: '发布时间'
  }, {
    value: 'views',
    label: '浏览量'
  }, {
    value: 'rating',
    label: '评分'
  }];
  const regions = [{
    value: 'all',
    label: '所有地区'
  }, {
    value: 'cn',
    label: '中国大陆'
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
  }];
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    try {
      await onSearch({
        query: searchQuery,
        language: searchLanguage,
        type: searchType,
        region: searchRegion,
        sortBy
      });
    } finally {
      setIsSearching(false);
    }
  };
  const getLanguageInfo = code => {
    return languages.find(lang => lang.code === code) || languages[0];
  };
  const highlightText = (text, query) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark class="bg-yellow-500 text-black px-1 rounded">$1</mark>');
  };
  const formatDate = dateString => {
    return new Date(dateString).toLocaleString('zh-CN');
  };
  return <div className="space-y-6">
      {/* Search Interface */}
      <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
        <h3 className="text-xl font-bold mb-6 text-yellow-500 flex items-center">
          <Search className="w-6 h-6 mr-2" />
          多语言搜索
        </h3>

        {/* Main Search Bar */}
        <div className="relative mb-6">
          <Search className="w-6 h-6 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
          <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleSearch()} placeholder="输入搜索关键词，支持多语言搜索..." className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-12 pr-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 text-lg" />
          <Button onClick={handleSearch} disabled={isSearching || !searchQuery.trim()} className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-yellow-500 hover:bg-yellow-600 text-black">
            {isSearching ? '搜索中...' : '搜索'}
          </Button>
        </div>

        {/* Search Filters */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
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

          <div className="flex items-end">
            <Button onClick={() => {
            setSearchQuery('');
            setSearchLanguage('all');
            setSearchType('all');
            setSearchRegion('all');
            setSortBy('relevance');
          }} variant="outline" className="w-full border-gray-700 text-gray-400 hover:border-gray-600 hover:text-white">
              <Filter className="w-4 h-4 mr-2" />
              重置
            </Button>
          </div>
        </div>
      </div>

      {/* Search Results */}
      <div className="bg-gray-900 rounded-lg border border-gray-800">
        <div className="p-6 border-b border-gray-800">
          <h4 className="text-lg font-medium text-white">
            搜索结果 
            {searchResults.length > 0 && <span className="ml-2 text-gray-400">({searchResults.length} 条)</span>}
          </h4>
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
            const langInfo = getLanguageInfo(result.language);
            const isRTL = langInfo.direction === 'rtl';
            return <div key={index} className="bg-gray-800 rounded-lg p-4 hover:bg-gray-750 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <span className="mr-2">{langInfo.flag}</span>
                          <h5 className="text-lg font-medium text-white mr-3" dangerouslySetInnerHTML={{
                      __html: highlightText(result.title, searchQuery)
                    }} />
                          <span className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded">
                            {result.type}
                          </span>
                        </div>
                        
                        <p className="text-gray-300 mb-3 line-clamp-2" dangerouslySetInnerHTML={{
                    __html: highlightText(result.content, searchQuery)
                  }} dir={isRTL ? 'rtl' : 'ltr'} />
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
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
                            {result.views || 0} 浏览
                          </span>
                          <span className="flex items-center">
                            <TrendingUp className="w-4 h-4 mr-1" />
                            相关度: {Math.round(result.relevance * 100)}%
                          </span>
                        </div>

                        {result.keywords && result.keywords.length > 0 && <div className="flex flex-wrap gap-2 mt-3">
                            {result.keywords.slice(0, 5).map((keyword, idx) => <span key={idx} className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded" dangerouslySetInnerHTML={{
                      __html: highlightText(keyword, searchQuery)
                    }} />)}
                          </div>}
                      </div>
                      
                      <div className="flex items-center space-x-2 ml-4">
                        <Button onClick={() => window.open(`/view/${result.id}`, '_blank')} variant="outline" size="sm" className="border-gray-700 text-gray-400 hover:border-gray-600 hover:text-white">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                        <Button onClick={() => navigator.clipboard.writeText(window.location.origin + `/view/${result.id}`)} variant="outline" size="sm" className="border-gray-700 text-gray-400 hover:border-gray-600 hover:text-white">
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>;
          })}
            </div>}
        </div>
      </div>

      {/* Search Statistics */}
      {searchResults.length > 0 && <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
          <h4 className="text-lg font-medium mb-4 text-yellow-500">搜索统计</h4>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{searchResults.length}</div>
              <div className="text-sm text-gray-400">总结果数</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">
                {new Set(searchResults.map(r => r.language)).size}
              </div>
              <div className="text-sm text-gray-400">涉及语言</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">
                {Math.round(searchResults.reduce((sum, r) => sum + (r.relevance || 0), 0) / searchResults.length * 100)}%
              </div>
              <div className="text-sm text-gray-400">平均相关度</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">
                {searchResults.reduce((sum, r) => sum + (r.views || 0), 0).toLocaleString()}
              </div>
              <div className="text-sm text-gray-400">总浏览量</div>
            </div>
          </div>
        </div>}
    </div>;
}