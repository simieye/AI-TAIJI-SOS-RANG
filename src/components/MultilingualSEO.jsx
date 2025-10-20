// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Textarea, Switch } from '@/components/ui';
// @ts-ignore;
import { Globe, Search, Code, FileText, Settings, CheckCircle, AlertCircle, Copy, Download, RefreshCw, Eye, Link, ExternalLink, BarChart3, Zap, Shield, Star, Clock, Target, Hash, Languages, Map, Router, Tag, Image, Video, Music, BookOpen, Newspaper, Megaphone, Share2, MessageSquare, ThumbsUp, TrendingUp, Award, Filter, ChevronLeft, ChevronRight, X, Save, Plus, Edit2, Trash2 } from 'lucide-react';

export function MultilingualSEO({
  content,
  languages,
  onSave,
  $w = null
}) {
  const [seoData, setSeoData] = useState({
    title: '',
    description: '',
    keywords: [],
    canonical_url: '',
    hreflang_tags: [],
    structured_data: {},
    open_graph: {
      title: '',
      description: '',
      image: '',
      url: '',
      type: 'website',
      site_name: 'AI太极',
      locale: 'zh_CN'
    },
    twitter_card: {
      card: 'summary_large_image',
      site: '@aitaiji',
      creator: '@aitaiji',
      title: '',
      description: '',
      image: ''
    },
    meta_tags: [],
    json_ld: {},
    sitemap_priority: 0.5,
    sitemap_changefreq: 'weekly',
    robots: 'index,follow',
    language_alternates: []
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [seoScore, setSeoScore] = useState(0);
  const [recommendations, setRecommendations] = useState([]);

  // 初始化SEO数据
  useEffect(() => {
    if (content) {
      initializeSEOData();
    }
  }, [content]);

  // 计算SEO分数
  useEffect(() => {
    calculateSEOScore();
    generateRecommendations();
  }, [seoData]);
  const initializeSEOData = () => {
    const language = content.language_code || 'zh';
    const langInfo = languages.find(lang => lang.code === language) || languages[0];
    setSeoData({
      title: content.seo_title || content.title || '',
      description: content.seo_description || content.description || '',
      keywords: content.keywords || [],
      canonical_url: content.slug ? `https://aitaiji.com/${language}/${content.slug}` : '',
      hreflang_tags: generateHreflangTags(content, languages),
      structured_data: generateStructuredData(content, language),
      open_graph: {
        title: content.seo_title || content.title || '',
        description: content.seo_description || content.description || '',
        image: content.featured_image || '',
        url: content.slug ? `https://aitaiji.com/${language}/${content.slug}` : '',
        type: 'website',
        site_name: 'AI太极',
        locale: `${language}_${langInfo.region?.toUpperCase() || 'CN'}`
      },
      twitter_card: {
        card: 'summary_large_image',
        site: '@aitaiji',
        creator: '@aitaiji',
        title: content.seo_title || content.title || '',
        description: content.seo_description || content.description || '',
        image: content.featured_image || ''
      },
      meta_tags: generateMetaTags(content),
      json_ld: generateStructuredData(content, language),
      sitemap_priority: content.is_featured ? 0.8 : 0.5,
      sitemap_changefreq: 'weekly',
      robots: content.visibility === 'public' ? 'index,follow' : 'noindex,nofollow',
      language_alternates: generateLanguageAlternates(content, languages)
    });
  };
  const generateHreflangTags = (content, languages) => {
    const tags = [];

    // 为每种语言生成hreflang标签
    languages.forEach(lang => {
      if (lang.code === content.language_code) {
        tags.push({
          rel: 'alternate',
          hreflang: lang.code,
          href: `https://aitaiji.com/${lang.code}/${content.slug || content._id}`
        });
      } else {
        // 查找该语言版本的翻译内容
        tags.push({
          rel: 'alternate',
          hreflang: lang.code,
          href: `https://aitaiji.com/${lang.code}/${content.slug || content._id}`
        });
      }
    });

    // 添加x-default标签
    tags.push({
      rel: 'alternate',
      hreflang: 'x-default',
      href: `https://aitaiji.com/${content.language_code || 'zh'}/${content.slug || content._id}`
    });
    return tags;
  };
  const generateStructuredData = (content, language) => {
    const baseData = {
      '@context': 'https://schema.org',
      '@type': getContentSchemaType(content.content_type),
      name: content.title,
      description: content.description || content.content?.substring(0, 160),
      url: `https://aitaiji.com/${language}/${content.slug || content._id}`,
      datePublished: content.publish_date || content.created_at,
      dateModified: content.updated_at,
      author: {
        '@type': 'Organization',
        name: 'AI太极',
        url: 'https://aitaiji.com'
      },
      publisher: {
        '@type': 'Organization',
        name: 'AI太极',
        logo: {
          '@type': 'ImageObject',
          url: 'https://aitaiji.com/logo.png'
        }
      },
      inLanguage: language,
      isPartOf: {
        '@type': 'WebSite',
        name: 'AI太极',
        url: 'https://aitaiji.com'
      }
    };

    // 根据内容类型添加特定字段
    switch (content.content_type) {
      case 'product':
        return {
          ...baseData,
          '@type': 'Product',
          brand: {
            '@type': 'Brand',
            name: 'AI太极'
          },
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'CNY',
            availability: 'https://schema.org/InStock'
          }
        };
      case 'blog':
        return {
          ...baseData,
          '@type': 'BlogPosting',
          headline: content.title,
          articleBody: content.content?.substring(0, 200),
          wordCount: content.word_count || 0
        };
      case 'news':
        return {
          ...baseData,
          '@type': 'NewsArticle',
          headline: content.title,
          articleBody: content.content?.substring(0, 200),
          dateline: content.publish_date || content.created_at
        };
      default:
        return baseData;
    }
  };
  const getContentSchemaType = contentType => {
    const typeMap = {
      'product': 'Product',
      'blog': 'BlogPosting',
      'news': 'NewsArticle',
      'faq': 'FAQPage',
      'page': 'WebPage',
      'marketing': 'WebPage',
      'legal': 'WebPage'
    };
    return typeMap[contentType] || 'WebPage';
  };
  const generateMetaTags = content => {
    const tags = [];

    // 基础meta标签
    if (content.author) {
      tags.push({
        name: 'author',
        content: content.author
      });
    }
    if (content.category) {
      tags.push({
        name: 'category',
        content: content.category
      });
    }
    if (content.tags && content.tags.length > 0) {
      tags.push({
        name: 'tags',
        content: content.tags.join(', ')
      });
    }

    // 视口和主题
    tags.push({
      name: 'viewport',
      content: 'width=device-width, initial-scale=1.0'
    });
    tags.push({
      name: 'theme-color',
      content: '#000000'
    });

    // 语言和地区
    tags.push({
      name: 'language',
      content: content.language_code || 'zh'
    });
    tags.push({
      name: 'geo.region',
      content: content.region || 'CN'
    });

    // 内容相关
    tags.push({
      name: 'content-type',
      content: content.content_type || 'page'
    });
    tags.push({
      name: 'content-length',
      content: content.content?.length.toString() || '0'
    });

    // 日期
    if (content.publish_date) {
      tags.push({
        name: 'article:published_time',
        content: content.publish_date
      });
    }
    if (content.updated_at) {
      tags.push({
        name: 'article:modified_time',
        content: content.updated_at
      });
    }
    return tags;
  };
  const generateLanguageAlternates = (content, languages) => {
    const alternates = [];
    languages.forEach(lang => {
      alternates.push({
        language: lang.code,
        language_name: lang.name,
        flag: lang.flag,
        url: `https://aitaiji.com/${lang.code}/${content.slug || content._id}`,
        available: true // 这里可以检查该语言版本是否真的存在
      });
    });
    return alternates;
  };
  const calculateSEOScore = () => {
    let score = 0;
    const maxScore = 100;

    // 标题优化 (25分)
    if (seoData.title && seoData.title.length >= 30 && seoData.title.length <= 60) {
      score += 25;
    } else if (seoData.title && seoData.title.length > 0) {
      score += 15;
    }

    // 描述优化 (20分)
    if (seoData.description && seoData.description.length >= 120 && seoData.description.length <= 160) {
      score += 20;
    } else if (seoData.description && seoData.description.length > 0) {
      score += 10;
    }

    // 关键词优化 (15分)
    if (seoData.keywords && seoData.keywords.length >= 3 && seoData.keywords.length <= 8) {
      score += 15;
    } else if (seoData.keywords && seoData.keywords.length > 0) {
      score += 8;
    }

    // 结构化数据 (15分)
    if (seoData.json_ld && Object.keys(seoData.json_ld).length > 0) {
      score += 15;
    }

    // Open Graph (10分)
    if (seoData.open_graph.title && seoData.open_graph.description && seoData.open_graph.image) {
      score += 10;
    } else if (seoData.open_graph.title || seoData.open_graph.description) {
      score += 5;
    }

    // Twitter Card (10分)
    if (seoData.twitter_card.title && seoData.twitter_card.description && seoData.twitter_card.image) {
      score += 10;
    } else if (seoData.twitter_card.title || seoData.twitter_card.description) {
      score += 5;
    }

    // Hreflang标签 (5分)
    if (seoData.hreflang_tags && seoData.hreflang_tags.length > 0) {
      score += 5;
    }
    setSeoScore(Math.min(score, maxScore));
  };
  const generateRecommendations = () => {
    const recommendations = [];

    // 标题建议
    if (!seoData.title) {
      recommendations.push({
        type: 'error',
        message: '缺少页面标题',
        suggestion: '添加一个描述性的标题，建议长度30-60字符'
      });
    } else if (seoData.title.length < 30) {
      recommendations.push({
        type: 'warning',
        message: '标题过短',
        suggestion: '标题长度建议30-60字符，当前长度：' + seoData.title.length
      });
    } else if (seoData.title.length > 60) {
      recommendations.push({
        type: 'warning',
        message: '标题过长',
        suggestion: '标题长度建议30-60字符，当前长度：' + seoData.title.length
      });
    }

    // 描述建议
    if (!seoData.description) {
      recommendations.push({
        type: 'error',
        message: '缺少页面描述',
        suggestion: '添加一个吸引人的描述，建议长度120-160字符'
      });
    } else if (seoData.description.length < 120) {
      recommendations.push({
        type: 'warning',
        message: '描述过短',
        suggestion: '描述长度建议120-160字符，当前长度：' + seoData.description.length
      });
    } else if (seoData.description.length > 160) {
      recommendations.push({
        type: 'warning',
        message: '描述过长',
        suggestion: '描述长度建议120-160字符，当前长度：' + seoData.description.length
      });
    }

    // 关键词建议
    if (!seoData.keywords || seoData.keywords.length === 0) {
      recommendations.push({
        type: 'warning',
        message: '缺少关键词',
        suggestion: '添加3-8个相关关键词，有助于搜索引擎理解内容'
      });
    } else if (seoData.keywords.length > 8) {
      recommendations.push({
        type: 'info',
        message: '关键词过多',
        suggestion: '建议关键词数量不超过8个，当前数量：' + seoData.keywords.length
      });
    }

    // 图片建议
    if (!seoData.open_graph.image) {
      recommendations.push({
        type: 'warning',
        message: '缺少分享图片',
        suggestion: '添加Open Graph图片，提高社交媒体分享效果'
      });
    }

    // 结构化数据建议
    if (!seoData.json_ld || Object.keys(seoData.json_ld).length === 0) {
      recommendations.push({
        type: 'info',
        message: '缺少结构化数据',
        suggestion: '添加JSON-LD结构化数据，有助于搜索引擎理解内容结构'
      });
    }
    setRecommendations(recommendations);
  };
  const handleAutoGenerate = async () => {
    setIsGenerating(true);
    try {
      // 模拟AI生成SEO数据
      await new Promise(resolve => setTimeout(resolve, 2000));
      const generatedData = {
        title: content.title || '',
        description: content.description || content.content?.substring(0, 160) || '',
        keywords: content.keywords || [],
        open_graph: {
          ...seoData.open_graph,
          title: content.title || '',
          description: content.description || content.content?.substring(0, 160) || ''
        },
        twitter_card: {
          ...seoData.twitter_card,
          title: content.title || '',
          description: content.description || content.content?.substring(0, 160) || ''
        }
      };
      setSeoData(prev => ({
        ...prev,
        ...generatedData
      }));
      alert('SEO数据已自动生成');
    } catch (error) {
      console.error('自动生成失败:', error);
      alert('自动生成失败，请重试');
    } finally {
      setIsGenerating(false);
    }
  };
  const handleSave = async () => {
    try {
      if (onSave) {
        await onSave(seoData);
      }
      alert('SEO设置已保存');
    } catch (error) {
      console.error('保存失败:', error);
      alert('保存失败，请重试');
    }
  };
  const handleCopyCode = (code, type) => {
    navigator.clipboard.writeText(code);
    alert(`${type}代码已复制到剪贴板`);
  };
  const generateHTMLHead = () => {
    let html = '';

    // 基础meta标签
    html += `<title>${seoData.title}</title>\n`;
    html += `<meta name="description" content="${seoData.description}">\n`;
    html += `<meta name="keywords" content="${seoData.keywords.join(', ')}">\n`;
    html += `<meta name="robots" content="${seoData.robots}">\n`;
    html += `<link rel="canonical" href="${seoData.canonical_url}">\n`;

    // Hreflang标签
    seoData.hreflang_tags.forEach(tag => {
      html += `<link rel="${tag.rel}" hreflang="${tag.hreflang}" href="${tag.href}">\n`;
    });

    // Open Graph标签
    html += `<!-- Open Graph -->\n`;
    html += `<meta property="og:title" content="${seoData.open_graph.title}">\n`;
    html += `<meta property="og:description" content="${seoData.open_graph.description}">\n`;
    html += `<meta property="og:image" content="${seoData.open_graph.image}">\n`;
    html += `<meta property="og:url" content="${seoData.open_graph.url}">\n`;
    html += `<meta property="og:type" content="${seoData.open_graph.type}">\n`;
    html += `<meta property="og:site_name" content="${seoData.open_graph.site_name}">\n`;
    html += `<meta property="og:locale" content="${seoData.open_graph.locale}">\n`;

    // Twitter Card标签
    html += `<!-- Twitter Card -->\n`;
    html += `<meta name="twitter:card" content="${seoData.twitter_card.card}">\n`;
    html += `<meta name="twitter:site" content="${seoData.twitter_card.site}">\n`;
    html += `<meta name="twitter:creator" content="${seoData.twitter_card.creator}">\n`;
    html += `<meta name="twitter:title" content="${seoData.twitter_card.title}">\n`;
    html += `<meta name="twitter:description" content="${seoData.twitter_card.description}">\n`;
    html += `<meta name="twitter:image" content="${seoData.twitter_card.image}">\n`;

    // 其他meta标签
    seoData.meta_tags.forEach(tag => {
      html += `<meta name="${tag.name}" content="${tag.content}">\n`;
    });

    // JSON-LD结构化数据
    if (seoData.json_ld && Object.keys(seoData.json_ld).length > 0) {
      html += `<!-- JSON-LD Structured Data -->\n`;
      html += `<script type="application/ld+json">\n`;
      html += JSON.stringify(seoData.json_ld, null, 2);
      html += `\n</script>\n`;
    }
    return html;
  };
  const generateSitemapEntry = () => {
    const entry = {
      url: seoData.canonical_url,
      lastmod: content.updated_at,
      changefreq: seoData.sitemap_changefreq,
      priority: seoData.sitemap_priority
    };

    // 添加语言替代页面
    if (seoData.language_alternates.length > 0) {
      entry['xhtml:link'] = seoData.language_alternates.map(alt => ({
        rel: 'alternate',
        hreflang: alt.language,
        href: alt.url
      }));
    }
    return entry;
  };
  const getScoreColor = score => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };
  const getRecommendationIcon = type => {
    switch (type) {
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'warning':
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      default:
        return <CheckCircle className="w-4 h-4 text-blue-500" />;
    }
  };
  return <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-yellow-500 flex items-center">
          <Globe className="w-6 h-6 mr-2" />
          多语言SEO优化
        </h3>
        <div className="flex items-center space-x-3">
          <Button onClick={handleAutoGenerate} disabled={isGenerating} variant="outline" className="border-gray-700 text-gray-400">
            <Zap className="w-4 h-4 mr-2" />
            {isGenerating ? '生成中...' : 'AI生成'}
          </Button>
          <Button onClick={() => setPreviewMode(!previewMode)} variant="outline" className="border-gray-700 text-gray-400">
            <Eye className="w-4 h-4 mr-2" />
            {previewMode ? '编辑' : '预览'}
          </Button>
          <Button onClick={handleSave} className="bg-yellow-500 hover:bg-yellow-600 text-black">
            <Save className="w-4 h-4 mr-2" />
            保存设置
          </Button>
        </div>
      </div>

      {/* SEO Score */}
      <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-medium text-white">SEO优化分数</h4>
          <div className={`text-3xl font-bold ${getScoreColor(seoScore)}`}>
            {seoScore}/100
          </div>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div className={`h-2 rounded-full transition-all duration-300 ${seoScore >= 80 ? 'bg-green-500' : seoScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{
          width: `${seoScore}%`
        }}></div>
        </div>
      </div>

      {/* Recommendations */}
      {recommendations.length > 0 && <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
          <h4 className="text-lg font-medium text-white mb-4">优化建议</h4>
          <div className="space-y-3">
            {recommendations.map((rec, index) => <div key={index} className="flex items-start space-x-3">
                {getRecommendationIcon(rec.type)}
                <div className="flex-1">
                  <div className="font-medium text-white">{rec.message}</div>
                  <div className="text-sm text-gray-400">{rec.suggestion}</div>
                </div>
              </div>)}
          </div>
        </div>}

      {previewMode ? <div className="space-y-6">
          {/* HTML Head Preview */}
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-medium text-white">HTML Head 代码</h4>
              <Button onClick={() => handleCopyCode(generateHTMLHead(), 'HTML Head')} variant="outline" size="sm" className="border-gray-700 text-gray-400">
                <Copy className="w-4 h-4 mr-2" />
                复制代码
              </Button>
            </div>
            <pre className="bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm text-gray-300">
              <code>{generateHTMLHead()}</code>
            </pre>
          </div>

          {/* Sitemap Entry Preview */}
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-medium text-white">Sitemap 条目</h4>
              <Button onClick={() => handleCopyCode(JSON.stringify(generateSitemapEntry(), null, 2), 'Sitemap')} variant="outline" size="sm" className="border-gray-700 text-gray-400">
                <Copy className="w-4 h-4 mr-2" />
                复制代码
              </Button>
            </div>
            <pre className="bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm text-gray-300">
              <code>{JSON.stringify(generateSitemapEntry(), null, 2)}</code>
            </pre>
          </div>

          {/* Structured Data Preview */}
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-medium text-white">JSON-LD 结构化数据</h4>
              <Button onClick={() => handleCopyCode(JSON.stringify(seoData.json_ld, null, 2), 'JSON-LD')} variant="outline" size="sm" className="border-gray-700 text-gray-400">
                <Copy className="w-4 h-4 mr-2" />
                复制代码
              </Button>
            </div>
            <pre className="bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm text-gray-300">
              <code>{JSON.stringify(seoData.json_ld, null, 2)}</code>
            </pre>
          </div>
        </div> : <div className="space-y-6">
          {/* Basic SEO Settings */}
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <h4 className="text-lg font-medium text-white mb-4">基础SEO设置</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">页面标题</label>
                <Input value={seoData.title} onChange={e => setSeoData(prev => ({
              ...prev,
              title: e.target.value
            }))} placeholder="输入页面标题（建议30-60字符）" className="bg-gray-800 border-gray-700" />
                <div className="mt-1 text-sm text-gray-400">
                  长度: {seoData.title.length}/60 字符
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">页面描述</label>
                <Textarea value={seoData.description} onChange={e => setSeoData(prev => ({
              ...prev,
              description: e.target.value
            }))} placeholder="输入页面描述（建议120-160字符）" rows={3} className="bg-gray-800 border-gray-700" />
                <div className="mt-1 text-sm text-gray-400">
                  长度: {seoData.description.length}/160 字符
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">关键词</label>
                <div className="space-y-2">
                  <div className="flex space-x-2">
                    <Input placeholder="输入关键词后按回车添加" className="bg-gray-800 border-gray-700" onKeyPress={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    const keyword = e.target.value.trim();
                    if (keyword && !seoData.keywords.includes(keyword)) {
                      setSeoData(prev => ({
                        ...prev,
                        keywords: [...prev.keywords, keyword]
                      }));
                    }
                    e.target.value = '';
                  }
                }} />
                    <Button onClick={() => {
                  const input = document.querySelector('input[placeholder*="关键词"]');
                  const keyword = input.value.trim();
                  if (keyword && !seoData.keywords.includes(keyword)) {
                    setSeoData(prev => ({
                      ...prev,
                      keywords: [...prev.keywords, keyword]
                    }));
                  }
                  input.value = '';
                }} variant="outline" className="border-gray-700 text-gray-400">
                      添加
                    </Button>
                  </div>
                  
                  {seoData.keywords.length > 0 && <div className="flex flex-wrap gap-2">
                      {seoData.keywords.map((keyword, index) => <span key={index} className="px-3 py-1 bg-gray-700 text-gray-300 text-sm rounded-full flex items-center">
                          {keyword}
                          <button onClick={() => setSeoData(prev => ({
                    ...prev,
                    keywords: prev.keywords.filter((_, i) => i !== index)
                  }))} className="ml-2 text-gray-500 hover:text-red-400">
                            ×
                          </button>
                        </span>)}
                    </div>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">规范URL</label>
                <Input value={seoData.canonical_url} onChange={e => setSeoData(prev => ({
              ...prev,
              canonical_url: e.target.value
            }))} placeholder="https://example.com/page" className="bg-gray-800 border-gray-700" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Robots标签</label>
                <Select value={seoData.robots} onValueChange={value => setSeoData(prev => ({
              ...prev,
              robots: value
            }))}>
                  <SelectTrigger className="bg-gray-800 border-gray-700">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="index,follow">index,follow</SelectItem>
                    <SelectItem value="noindex,follow">noindex,follow</SelectItem>
                    <SelectItem value="index,nofollow">index,nofollow</SelectItem>
                    <SelectItem value="noindex,nofollow">noindex,nofollow</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Open Graph Settings */}
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <h4 className="text-lg font-medium text-white mb-4">Open Graph 设置</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">OG标题</label>
                <Input value={seoData.open_graph.title} onChange={e => setSeoData(prev => ({
              ...prev,
              open_graph: {
                ...prev.open_graph,
                title: e.target.value
              }
            }))} placeholder="社交媒体分享标题" className="bg-gray-800 border-gray-700" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">OG类型</label>
                <Select value={seoData.open_graph.type} onValueChange={value => setSeoData(prev => ({
              ...prev,
              open_graph: {
                ...prev.open_graph,
                type: value
              }
            }))}>
                  <SelectTrigger className="bg-gray-800 border-gray-700">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="website">Website</SelectItem>
                    <SelectItem value="article">Article</SelectItem>
                    <SelectItem value="product">Product</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">OG描述</label>
                <Textarea value={seoData.open_graph.description} onChange={e => setSeoData(prev => ({
              ...prev,
              open_graph: {
                ...prev.open_graph,
                description: e.target.value
              }
            }))} placeholder="社交媒体分享描述" rows={2} className="bg-gray-800 border-gray-700" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">OG图片</label>
                <Input value={seoData.open_graph.image} onChange={e => setSeoData(prev => ({
              ...prev,
              open_graph: {
                ...prev.open_graph,
                image: e.target.value
              }
            }))} placeholder="https://example.com/image.jpg" className="bg-gray-800 border-gray-700" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">OG URL</label>
                <Input value={seoData.open_graph.url} onChange={e => setSeoData(prev => ({
              ...prev,
              open_graph: {
                ...prev.open_graph,
                url: e.target.value
              }
            }))} placeholder="https://example.com/page" className="bg-gray-800 border-gray-700" />
              </div>
            </div>
          </div>

          {/* Twitter Card Settings */}
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <h4 className="text-lg font-medium text-white mb-4">Twitter Card 设置</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Card类型</label>
                <Select value={seoData.twitter_card.card} onValueChange={value => setSeoData(prev => ({
              ...prev,
              twitter_card: {
                ...prev.twitter_card,
                card: value
              }
            }))}>
                  <SelectTrigger className="bg-gray-800 border-gray-700">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="summary">Summary</SelectItem>
                    <SelectItem value="summary_large_image">Summary Large Image</SelectItem>
                    <SelectItem value="app">App</SelectItem>
                    <SelectItem value="player">Player</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Twitter账号</label>
                <Input value={seoData.twitter_card.site} onChange={e => setSeoData(prev => ({
              ...prev,
              twitter_card: {
                ...prev.twitter_card,
                site: e.target.value
              }
            }))} placeholder="@username" className="bg-gray-800 border-gray-700" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">Twitter标题</label>
                <Input value={seoData.twitter_card.title} onChange={e => setSeoData(prev => ({
              ...prev,
              twitter_card: {
                ...prev.twitter_card,
                title: e.target.value
              }
            }))} placeholder="Twitter分享标题" className="bg-gray-800 border-gray-700" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">Twitter描述</label>
                <Textarea value={seoData.twitter_card.description} onChange={e => setSeoData(prev => ({
              ...prev,
              twitter_card: {
                ...prev.twitter_card,
                description: e.target.value
              }
            }))} placeholder="Twitter分享描述" rows={2} className="bg-gray-800 border-gray-700" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">Twitter图片</label>
                <Input value={seoData.twitter_card.image} onChange={e => setSeoData(prev => ({
              ...prev,
              twitter_card: {
                ...prev.twitter_card,
                image: e.target.value
              }
            }))} placeholder="https://example.com/image.jpg" className="bg-gray-800 border-gray-700" />
              </div>
            </div>
          </div>

          {/* Hreflang Settings */}
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <h4 className="text-lg font-medium text-white mb-4">Hreflang 标签</h4>
            <div className="space-y-3">
              {seoData.hreflang_tags.map((tag, index) => <div key={index} className="flex items-center space-x-4 p-3 bg-gray-800 rounded-lg">
                  <Globe className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-300">hreflang="{tag.hreflang}"</span>
                  <span className="text-sm text-gray-400">href="{tag.href}"</span>
                  <span className="text-xs text-gray-500">{tag.rel}</span>
                </div>)}
            </div>
          </div>

          {/* Sitemap Settings */}
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <h4 className="text-lg font-medium text-white mb-4">Sitemap 设置</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">优先级</label>
                <Select value={seoData.sitemap_priority.toString()} onValueChange={value => setSeoData(prev => ({
              ...prev,
              sitemap_priority: parseFloat(value)
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
                <label className="block text-sm font-medium text-gray-300 mb-2">更新频率</label>
                <Select value={seoData.sitemap_changefreq} onValueChange={value => setSeoData(prev => ({
              ...prev,
              sitemap_changefreq: value
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
            </div>
          </div>
        </div>}
    </div>;
}