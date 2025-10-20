// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Switch } from '@/components/ui';
// @ts-ignore;
import { Map, Globe, Download, Upload, RefreshCw, Settings, FileText, Code, Eye, Copy, Save, Plus, Edit2, Trash2, Search, Filter, ChevronLeft, ChevronRight, X, CheckCircle, AlertCircle, Clock, Calendar, BarChart3, Zap, Languages, Link, ExternalLink, Database, Server, Cloud } from 'lucide-react';

export function SitemapGenerator({
  languages,
  $w = null
}) {
  const [sitemapData, setSitemapData] = useState({
    urls: [],
    lastGenerated: null,
    totalUrls: 0,
    indexedUrls: 0,
    errorCount: 0
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [filterLanguage, setFilterLanguage] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [settings, setSettings] = useState({
    includeImages: false,
    includeVideos: false,
    includeNews: false,
    maxDepth: 3,
    changeFrequency: 'weekly',
    defaultPriority: 0.5,
    excludePatterns: ['admin', 'api', 'private'],
    customFields: []
  });

  // 加载sitemap数据
  useEffect(() => {
    loadSitemapData();
  }, []);
  const loadSitemapData = async () => {
    try {
      if ($w) {
        // 从数据库加载已生成的sitemap数据
        const result = await $w.cloud.callDataSource({
          dataSourceName: 'sitemap_cache',
          methodName: 'wedaGetRecordsV2',
          params: {
            orderBy: [{
              generated_at: 'desc'
            }],
            pageSize: 1
          }
        });
        if (result && result.records.length > 0) {
          const cachedData = result.records[0];
          setSitemapData({
            urls: JSON.parse(cachedData.sitemap_content || '[]'),
            lastGenerated: cachedData.generated_at,
            totalUrls: cachedData.total_urls || 0,
            indexedUrls: cachedData.indexed_urls || 0,
            errorCount: cachedData.error_count || 0
          });
        } else {
          // 生成示例数据
          generateSampleSitemap();
        }
      }
    } catch (error) {
      console.error('加载sitemap数据失败:', error);
      generateSampleSitemap();
    }
  };
  const generateSampleSitemap = () => {
    const sampleUrls = [{
      loc: 'https://aitaiji.com/zh',
      lastmod: new Date().toISOString(),
      changefreq: 'daily',
      priority: 1.0,
      alternates: [{
        hreflang: 'en',
        href: 'https://aitaiji.com/en'
      }, {
        hreflang: 'ja',
        href: 'https://aitaiji.com/ja'
      }]
    }, {
      loc: 'https://aitaiji.com/zh/products',
      lastmod: new Date().toISOString(),
      changefreq: 'weekly',
      priority: 0.8,
      alternates: [{
        hreflang: 'en',
        href: 'https://aitaiji.com/en/products'
      }, {
        hreflang: 'ja',
        href: 'https://aitaiji.com/ja/products'
      }]
    }, {
      loc: 'https://aitaiji.com/zh/ai-taiji-sos-ring',
      lastmod: new Date().toISOString(),
      changefreq: 'monthly',
      priority: 0.9,
      alternates: [{
        hreflang: 'en',
        href: 'https://aitaiji.com/en/ai-taiji-sos-ring'
      }, {
        hreflang: 'ja',
        href: 'https://aitaiji.com/ja/ai-taiji-sos-ring'
      }]
    }];
    setSitemapData({
      urls: sampleUrls,
      lastGenerated: new Date().toISOString(),
      totalUrls: sampleUrls.length,
      indexedUrls: sampleUrls.length,
      errorCount: 0
    });
  };
  const generateSitemap = async () => {
    setIsGenerating(true);
    try {
      if ($w) {
        // 获取所有已发布的多语言内容
        const contentResult = await $w.cloud.callDataSource({
          dataSourceName: 'multilingual_content',
          methodName: 'wedaGetRecordsV2',
          params: {
            filter: {
              where: {
                status: {
                  $eq: 'published'
                }
              }
            },
            orderBy: [{
              updated_at: 'desc'
            }],
            pageSize: 1000
          }
        });
        if (contentResult && contentResult.records) {
          const sitemapUrls = generateSitemapUrls(contentResult.records);

          // 保存sitemap到数据库
          await $w.cloud.callDataSource({
            dataSourceName: 'sitemap_cache',
            methodName: 'wedaCreateV2',
            params: {
              data: {
                sitemap_content: JSON.stringify(sitemapUrls),
                total_urls: sitemapUrls.length,
                indexed_urls: sitemapUrls.length,
                error_count: 0,
                generated_at: new Date().toISOString(),
                settings: settings
              }
            }
          });
          setSitemapData({
            urls: sitemapUrls,
            lastGenerated: new Date().toISOString(),
            totalUrls: sitemapUrls.length,
            indexedUrls: sitemapUrls.length,
            errorCount: 0
          });
          alert(`Sitemap已生成，包含 ${sitemapUrls.length} 个URL`);
        }
      }
    } catch (error) {
      console.error('生成sitemap失败:', error);
      alert('生成失败，请重试');
    } finally {
      setIsGenerating(false);
    }
  };
  const generateSitemapUrls = contents => {
    const urls = [];
    const languageGroups = {};

    // 按语言分组内容
    contents.forEach(content => {
      const lang = content.language_code || 'zh';
      if (!languageGroups[lang]) {
        languageGroups[lang] = [];
      }
      languageGroups[lang].push(content);
    });

    // 为每种语言生成URL
    Object.keys(languageGroups).forEach(lang => {
      languageGroups[lang].forEach(content => {
        const url = {
          loc: `https://aitaiji.com/${lang}/${content.slug || content._id}`,
          lastmod: content.updated_at,
          changefreq: getChangeFrequency(content.content_type),
          priority: getPriority(content),
          alternates: generateAlternatives(content, languages)
        };

        // 添加图片信息
        if (settings.includeImages && content.featured_image) {
          url['image:image'] = {
            'image:loc': content.featured_image,
            'image:title': content.title,
            'image:caption': content.description
          };
        }

        // 添加视频信息
        if (settings.includeVideos && content.video_url) {
          url['video:video'] = {
            'video:thumbnail_loc': content.video_thumbnail,
            'video:title': content.title,
            'video:description': content.description
          };
        }
        urls.push(url);
      });
    });
    return urls;
  };
  const getChangeFrequency = contentType => {
    const frequencyMap = {
      'news': 'daily',
      'blog': 'weekly',
      'product': 'monthly',
      'page': 'monthly',
      'marketing': 'weekly'
    };
    return frequencyMap[contentType] || settings.changeFrequency;
  };
  const getPriority = content => {
    if (content.is_featured) return 0.9;
    if (content.priority === 1) return 0.8;
    if (content.priority === 2) return 0.6;
    return settings.defaultPriority;
  };
  const generateAlternatives = (content, languages) => {
    const alternates = [];
    languages.forEach(lang => {
      if (lang.code !== content.language_code) {
        alternates.push({
          hreflang: lang.code,
          href: `https://aitaiji.com/${lang.code}/${content.slug || content._id}`
        });
      }
    });
    return alternates;
  };
  const generateXMLSitemap = () => {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
    xml += '        xmlns:xhtml="http://www.w3.org/1999/xhtml"\n';
    xml += '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"\n';
    xml += '        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">\n';
    sitemapData.urls.forEach(url => {
      xml += '  <url>\n';
      xml += `    <loc>${url.loc}</loc>\n`;
      xml += `    <lastmod>${url.lastmod}</lastmod>\n`;
      xml += `    <changefreq>${url.changefreq}</changefreq>\n`;
      xml += `    <priority>${url.priority}</priority>\n`;

      // 添加语言替代
      if (url.alternates && url.alternates.length > 0) {
        url.alternates.forEach(alt => {
          xml += `    <xhtml:link rel="alternate" hreflang="${alt.hreflang}" href="${alt.href}"/>\n`;
        });
      }

      // 添加图片信息
      if (url['image:image']) {
        xml += '    <image:image>\n';
        xml += `      <image:loc>${url['image:image']['image:loc']}</image:loc>\n`;
        xml += `      <image:title>${url['image:image']['image:title']}</image:title>\n`;
        xml += `      <image:caption>${url['image:image']['image:caption']}</image:caption>\n`;
        xml += '    </image:image>\n';
      }

      // 添加视频信息
      if (url['video:video']) {
        xml += '    <video:video>\n';
        xml += `      <video:thumbnail_loc>${url['video:video']['video:thumbnail_loc']}</video:thumbnail_loc>\n`;
        xml += `      <video:title>${url['video:video']['video:title']}</video:title>\n`;
        xml += `      <video:description>${url['video:video']['video:description']}</video:description>\n`;
        xml += '    </video:video>\n';
      }
      xml += '  </url>\n';
    });
    xml += '</urlset>';
    return xml;
  };
  const generateSitemapIndex = () => {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    // 主sitemap
    xml += '  <sitemap>\n';
    xml += `    <loc>https://aitaiji.com/sitemap.xml</loc>\n`;
    xml += `    <lastmod>${new Date().toISOString()}</lastmod>\n`;
    xml += '  </sitemap>\n';

    // 为每种语言生成单独的sitemap
    languages.forEach(lang => {
      xml += '  <sitemap>\n';
      xml += `    <loc>https://aitaiji.com/sitemap-${lang.code}.xml</loc>\n`;
      xml += `    <lastmod>${new Date().toISOString()}</lastmod>\n`;
      xml += '  </sitemap>\n';
    });

    // 图片sitemap
    if (settings.includeImages) {
      xml += '  <sitemap>\n';
      xml += '    <loc>https://aitaiji.com/sitemap-images.xml</loc>\n';
      xml += `    <lastmod>${new Date().toISOString()}</lastmod>\n`;
      xml += '  </sitemap>\n';
    }

    // 视频sitemap
    if (settings.includeVideos) {
      xml += '  <sitemap>\n';
      xml += '    <loc>https://aitaiji.com/sitemap-videos.xml</loc>\n';
      xml += `    <lastmod>${new Date().toISOString()}</lastmod>\n`;
      xml += '  </sitemap>\n';
    }
    xml += '</sitemapindex>';
    return xml;
  };
  const downloadSitemap = format => {
    let content, filename;
    switch (format) {
      case 'xml':
        content = generateXMLSitemap();
        filename = 'sitemap.xml';
        break;
      case 'index':
        content = generateSitemapIndex();
        filename = 'sitemap-index.xml';
        break;
      case 'json':
        content = JSON.stringify(sitemapData.urls, null, 2);
        filename = 'sitemap.json';
        break;
      default:
        return;
    }
    const blob = new Blob([content], {
      type: 'text/xml'
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  const copyToClipboard = text => {
    navigator.clipboard.writeText(text);
    alert('已复制到剪贴板');
  };
  const filteredUrls = sitemapData.urls.filter(url => {
    const matchesSearch = !searchTerm || url.loc.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLanguage = filterLanguage === 'all' || url.loc.includes(`/${filterLanguage}/`);
    return matchesSearch && matchesLanguage;
  });
  const formatDate = dateString => {
    return new Date(dateString).toLocaleString('zh-CN');
  };
  return <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-yellow-500 flex items-center">
          <Map className="w-6 h-6 mr-2" />
          多语言Sitemap生成器
        </h3>
        <div className="flex items-center space-x-3">
          <Button onClick={generateSitemap} disabled={isGenerating} className="bg-yellow-500 hover:bg-yellow-600 text-black">
            <RefreshCw className={`w-4 h-4 mr-2 ${isGenerating ? 'animate-spin' : ''}`} />
            {isGenerating ? '生成中...' : '生成Sitemap'}
          </Button>
          <Button onClick={() => setPreviewMode(!previewMode)} variant="outline" className="border-gray-700 text-gray-400">
            <Eye className="w-4 h-4 mr-2" />
            {previewMode ? '设置' : '预览'}
          </Button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">总URL数</span>
            <FileText className="w-4 h-4 text-gray-500" />
          </div>
          <div className="text-2xl font-bold text-white mt-1">{sitemapData.totalUrls}</div>
        </div>
        
        <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">已索引</span>
            <CheckCircle className="w-4 h-4 text-gray-500" />
          </div>
          <div className="text-2xl font-bold text-white mt-1">{sitemapData.indexedUrls}</div>
        </div>
        
        <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">错误数</span>
            <AlertCircle className="w-4 h-4 text-gray-500" />
          </div>
          <div className="text-2xl font-bold text-white mt-1">{sitemapData.errorCount}</div>
        </div>
        
        <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">最后生成</span>
            <Clock className="w-4 h-4 text-gray-500" />
          </div>
          <div className="text-sm font-medium text-white mt-1">
            {sitemapData.lastGenerated ? formatDate(sitemapData.lastGenerated) : '未生成'}
          </div>
        </div>
      </div>

      {previewMode ? <div className="space-y-6">
          {/* XML Sitemap Preview */}
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-medium text-white">XML Sitemap</h4>
              <div className="flex items-center space-x-2">
                <Button onClick={() => copyToClipboard(generateXMLSitemap())} variant="outline" size="sm" className="border-gray-700 text-gray-400">
                  <Copy className="w-4 h-4 mr-2" />
                  复制
                </Button>
                <Button onClick={() => downloadSitemap('xml')} variant="outline" size="sm" className="border-gray-700 text-gray-400">
                  <Download className="w-4 h-4 mr-2" />
                  下载
                </Button>
              </div>
            </div>
            <pre className="bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm text-gray-300 max-h-96">
              <code>{generateXMLSitemap()}</code>
            </pre>
          </div>

          {/* Sitemap Index Preview */}
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-medium text-white">Sitemap Index</h4>
              <div className="flex items-center space-x-2">
                <Button onClick={() => copyToClipboard(generateSitemapIndex())} variant="outline" size="sm" className="border-gray-700 text-gray-400">
                  <Copy className="w-4 h-4 mr-2" />
                  复制
                </Button>
                <Button onClick={() => downloadSitemap('index')} variant="outline" size="sm" className="border-gray-700 text-gray-400">
                  <Download className="w-4 h-4 mr-2" />
                  下载
                </Button>
              </div>
            </div>
            <pre className="bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm text-gray-300 max-h-96">
              <code>{generateSitemapIndex()}</code>
            </pre>
          </div>

          {/* URL List */}
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-medium text-white">URL列表</h4>
              <Button onClick={() => downloadSitemap('json')} variant="outline" size="sm" className="border-gray-700 text-gray-400">
                <Download className="w-4 h-4 mr-2" />
                下载JSON
              </Button>
            </div>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredUrls.map((url, index) => <div key={index} className="p-3 bg-gray-800 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="text-sm font-medium text-white mb-1">{url.loc}</div>
                      <div className="flex items-center space-x-4 text-xs text-gray-400">
                        <span>优先级: {url.priority}</span>
                        <span>更新频率: {url.changefreq}</span>
                        <span>最后修改: {formatDate(url.lastmod)}</span>
                      </div>
                      {url.alternates && url.alternates.length > 0 && <div className="flex items-center space-x-2 mt-2">
                          <Globe className="w-3 h-3 text-gray-500" />
                          {url.alternates.map((alt, i) => <span key={i} className="text-xs text-gray-500">
                              {alt.hreflang}
                            </span>)}
                        </div>}
                    </div>
                  </div>
                </div>)}
            </div>
          </div>
        </div> : <div className="space-y-6">
          {/* Settings */}
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <h4 className="text-lg font-medium text-white mb-4">生成设置</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">默认更新频率</label>
                  <Select value={settings.changeFrequency} onValueChange={value => setSettings(prev => ({
                ...prev,
                changeFrequency: value
              }))}>
                    <SelectTrigger className="bg-gray-800 border-gray-700">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="always">Always</SelectItem>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="yearly">Yearly</SelectItem>
                      <SelectItem value="never">Never</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">默认优先级</label>
                  <Select value={settings.defaultPriority.toString()} onValueChange={value => setSettings(prev => ({
                ...prev,
                defaultPriority: parseFloat(value)
              }))}>
                    <SelectTrigger className="bg-gray-800 border-gray-700">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1.0">1.0 (最高)</SelectItem>
                      <SelectItem value="0.9">0.9</SelectItem>
                      <SelectItem value="0.8">0.8</SelectItem>
                      <SelectItem value="0.7">0.7</SelectItem>
                      <SelectItem value="0.6">0.6</SelectItem>
                      <SelectItem value="0.5">0.5 (默认)</SelectItem>
                      <SelectItem value="0.4">0.4</SelectItem>
                      <SelectItem value="0.3">0.3</SelectItem>
                      <SelectItem value="0.2">0.2</SelectItem>
                      <SelectItem value="0.1">0.1 (最低)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">最大深度</label>
                  <Input type="number" value={settings.maxDepth} onChange={e => setSettings(prev => ({
                ...prev,
                maxDepth: parseInt(e.target.value) || 3
              }))} min="1" max="10" className="bg-gray-800 border-gray-700" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-3">
                  <label className="flex items-center space-x-2">
                    <Switch checked={settings.includeImages} onCheckedChange={checked => setSettings(prev => ({
                  ...prev,
                  includeImages: checked
                }))} />
                    <span className="text-sm text-gray-300">包含图片</span>
                  </label>

                  <label className="flex items-center space-x-2">
                    <Switch checked={settings.includeVideos} onCheckedChange={checked => setSettings(prev => ({
                  ...prev,
                  includeVideos: checked
                }))} />
                    <span className="text-sm text-gray-300">包含视频</span>
                  </label>

                  <label className="flex items-center space-x-2">
                    <Switch checked={settings.includeNews} onCheckedChange={checked => setSettings(prev => ({
                  ...prev,
                  includeNews: checked
                }))} />
                    <span className="text-sm text-gray-300">包含新闻</span>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">排除模式</label>
                  <div className="space-y-2">
                    {settings.excludePatterns.map((pattern, index) => <div key={index} className="flex items-center space-x-2">
                        <Input value={pattern} onChange={e => {
                    const newPatterns = [...settings.excludePatterns];
                    newPatterns[index] = e.target.value;
                    setSettings(prev => ({
                      ...prev,
                      excludePatterns: newPatterns
                    }));
                  }} className="bg-gray-800 border-gray-700 flex-1" />
                        <Button onClick={() => {
                    setSettings(prev => ({
                      ...prev,
                      excludePatterns: prev.excludePatterns.filter((_, i) => i !== index)
                    }));
                  }} variant="outline" size="sm" className="border-red-500 text-red-500">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>)}
                    <Button onClick={() => setSettings(prev => ({
                  ...prev,
                  excludePatterns: [...prev.excludePatterns, '']
                }))} variant="outline" size="sm" className="border-gray-700 text-gray-400">
                      <Plus className="w-4 h-4 mr-2" />
                      添加模式
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* URL List */}
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-medium text-white">URL列表</h4>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="搜索URL..." className="bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 text-sm" />
                </div>
                <Select value={filterLanguage} onValueChange={setFilterLanguage}>
                  <SelectTrigger className="bg-gray-800 border-gray-700">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">所有语言</SelectItem>
                    {languages.map(lang => <SelectItem key={lang.code} value={lang.code}>
                        {lang.name}
                      </SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredUrls.map((url, index) => <div key={index} className="p-3 bg-gray-800 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="text-sm font-medium text-white mb-1">{url.loc}</div>
                      <div className="flex items-center space-x-4 text-xs text-gray-400">
                        <span>优先级: {url.priority}</span>
                        <span>更新频率: {url.changefreq}</span>
                        <span>最后修改: {formatDate(url.lastmod)}</span>
                      </div>
                      {url.alternates && url.alternates.length > 0 && <div className="flex items-center space-x-2 mt-2">
                          <Globe className="w-3 h-3 text-gray-500" />
                          {url.alternates.map((alt, i) => <span key={i} className="text-xs text-gray-500">
                              {alt.hreflang}
                            </span>)}
                        </div>}
                    </div>
                  </div>
                </div>)}
            </div>
          </div>
        </div>}
    </div>;
}