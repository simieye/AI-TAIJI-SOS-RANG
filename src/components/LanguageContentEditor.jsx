// @ts-ignore;
import React, { useState, useEffect, useCallback } from 'react';
// @ts-ignore;
import { Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Textarea, Button, Switch } from '@/components/ui';
// @ts-ignore;
import { FileText, Globe, Target, Hash, Eye, Settings, Upload, Download, Copy, CheckCircle, Save, Clock, Users, BarChart3, AlertCircle, RefreshCw, History, Zap, Shield, Star, Archive, Send, Calendar, Timer, TrendingUp, Award, Lock, Unlock, X } from 'lucide-react';

export function LanguageContentEditor({
  formData,
  setFormData,
  languages,
  contentTypeOptions,
  regionOptions,
  onSave,
  onCancel,
  isLoading = false,
  contentId = null,
  $w = null
}) {
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const [lastSavedTime, setLastSavedTime] = useState(null);
  const [versions, setVersions] = useState([]);
  const [showVersionHistory, setShowVersionHistory] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [readingTime, setReadingTime] = useState(0);
  const [seoScore, setSeoScore] = useState(0);
  const [contentQuality, setContentQuality] = useState(0);
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);
  const [previewMode, setPreviewMode] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [isTranslating, setIsTranslating] = useState(false);

  // 自动保存定时器
  useEffect(() => {
    if (!autoSaveEnabled || !contentId) return;
    const autoSaveTimer = setInterval(async () => {
      await handleAutoSave();
    }, 30000); // 每30秒自动保存

    return () => clearInterval(autoSaveTimer);
  }, [autoSaveEnabled, formData, contentId]);

  // 计算内容统计
  useEffect(() => {
    const text = formData.content || '';
    const words = text.trim().split(/\s+/).filter(word => word.length > 0).length;
    const chars = text.length;
    setWordCount(words);
    setReadingTime(Math.max(1, Math.ceil(words / 200))); // 假设每分钟阅读200词

    // 计算SEO分数
    calculateSeoScore();

    // 计算内容质量分数
    calculateContentQuality();
  }, [formData.content, formData.title, formData.seoTitle, formData.seoDescription, formData.keywords]);

  // 验证表单
  useEffect(() => {
    validateForm();
  }, [formData]);
  const calculateSeoScore = () => {
    let score = 0;
    const maxScore = 100;

    // 标题长度检查 (20-60字符最佳)
    if (formData.seoTitle && formData.seoTitle.length >= 20 && formData.seoTitle.length <= 60) {
      score += 20;
    } else if (formData.seoTitle && formData.seoTitle.length > 0) {
      score += 10;
    }

    // 描述长度检查 (120-160字符最佳)
    if (formData.seoDescription && formData.seoDescription.length >= 120 && formData.seoDescription.length <= 160) {
      score += 20;
    } else if (formData.seoDescription && formData.seoDescription.length > 0) {
      score += 10;
    }

    // 关键词检查
    if (formData.keywords && formData.keywords.length >= 3 && formData.keywords.length <= 8) {
      score += 20;
    } else if (formData.keywords && formData.keywords.length > 0) {
      score += 10;
    }

    // 内容长度检查
    if (formData.content && formData.content.length >= 300) {
      score += 20;
    } else if (formData.content && formData.content.length >= 100) {
      score += 10;
    }

    // 图片alt文本检查（如果有图片）
    score += 20; // 基础分

    setSeoScore(Math.min(score, maxScore));
  };
  const calculateContentQuality = () => {
    let score = 0;
    const maxScore = 100;

    // 内容长度
    if (formData.content && formData.content.length >= 500) {
      score += 25;
    } else if (formData.content && formData.content.length >= 200) {
      score += 15;
    }

    // 标题质量
    if (formData.title && formData.title.length >= 10 && formData.title.length <= 60) {
      score += 20;
    }

    // 结构化内容（包含段落、列表等）
    if (formData.content && (formData.content.includes('\n\n') || formData.content.includes('•') || formData.content.includes('-'))) {
      score += 15;
    }

    // 关键词密度
    if (formData.keywords && formData.keywords.length > 0) {
      const keywordDensity = calculateKeywordDensity();
      if (keywordDensity >= 1 && keywordDensity <= 3) {
        score += 20;
      } else if (keywordDensity > 0) {
        score += 10;
      }
    }

    // 可读性
    if (formData.content) {
      const sentences = formData.content.split(/[.!?]+/).filter(s => s.trim().length > 0);
      const avgSentenceLength = formData.content.length / sentences.length;
      if (avgSentenceLength >= 15 && avgSentenceLength <= 25) {
        score += 20;
      }
    }
    setContentQuality(Math.min(score, maxScore));
  };
  const calculateKeywordDensity = () => {
    if (!formData.content || !formData.keywords || formData.keywords.length === 0) return 0;
    const words = formData.content.toLowerCase().split(/\s+/);
    const totalWords = words.length;
    let keywordCount = 0;
    formData.keywords.forEach(keyword => {
      const keywordWords = keyword.toLowerCase().split(/\s+/);
      keywordWords.forEach(kw => {
        keywordCount += words.filter(word => word.includes(kw)).length;
      });
    });
    return keywordCount / totalWords * 100;
  };
  const validateForm = () => {
    const errors = {};
    if (!formData.title || formData.title.trim().length === 0) {
      errors.title = '标题不能为空';
    } else if (formData.title.length > 200) {
      errors.title = '标题不能超过200字符';
    }
    if (!formData.content || formData.content.trim().length === 0) {
      errors.content = '内容不能为空';
    } else if (formData.content.length < 50) {
      errors.content = '内容至少需要50字符';
    }
    if (!formData.language_code) {
      errors.language_code = '请选择语言';
    }
    if (!formData.content_type) {
      errors.content_type = '请选择内容类型';
    }
    if (formData.seoTitle && formData.seoTitle.length > 60) {
      errors.seoTitle = 'SEO标题不能超过60字符';
    }
    if (formData.seoDescription && formData.seoDescription.length > 160) {
      errors.seoDescription = 'SEO描述不能超过160字符';
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const handleAutoSave = useCallback(async () => {
    if (!contentId || !validateForm()) return;
    setIsAutoSaving(true);
    try {
      if ($w) {
        await $w.cloud.callDataSource({
          dataSourceName: 'multilingual_content',
          methodName: 'wedaUpdateV2',
          params: {
            data: {
              ...formData,
              updated_at: new Date().toISOString(),
              auto_saved: true
            },
            filter: {
              where: {
                _id: {
                  $eq: contentId
                }
              }
            }
          }
        });
        setLastSavedTime(new Date());
      }
    } catch (error) {
      console.error('自动保存失败:', error);
    } finally {
      setIsAutoSaving(false);
    }
  }, [formData, contentId, $w]);
  const handleSave = async (status = null) => {
    if (!validateForm()) {
      alert('请修正表单错误后再保存');
      return;
    }
    const saveData = {
      ...formData,
      status: status || formData.status,
      updated_at: new Date().toISOString(),
      word_count: wordCount,
      reading_time: readingTime,
      seo_score: seoScore,
      content_quality: contentQuality
    };
    if (onSave) {
      await onSave(saveData);
    }
  };
  const handleTranslate = async targetLanguage => {
    if (!formData.content || !formData.title) {
      alert('请先填写标题和内容');
      return;
    }
    setIsTranslating(true);
    try {
      if ($w) {
        const result = await $w.cloud.callFunction({
          name: 'translate-content',
          data: {
            title: formData.title,
            content: formData.content,
            description: formData.description,
            targetLanguage,
            sourceLanguage: formData.language_code
          }
        });
        if (result.success) {
          setFormData({
            ...formData,
            title: result.translatedTitle,
            content: result.translatedContent,
            description: result.translatedDescription,
            language_code: targetLanguage,
            translation_status: 'translated',
            auto_translated: true,
            human_reviewed: false
          });
          alert('翻译完成');
        } else {
          alert('翻译失败: ' + result.error);
        }
      }
    } catch (error) {
      console.error('翻译失败:', error);
      alert('翻译失败，请重试');
    } finally {
      setIsTranslating(false);
    }
  };
  const handleKeywordAdd = keyword => {
    if (keyword && !formData.keywords.includes(keyword) && formData.keywords.length < 10) {
      setFormData({
        ...formData,
        keywords: [...formData.keywords, keyword]
      });
    }
  };
  const handleKeywordRemove = indexToRemove => {
    setFormData({
      ...formData,
      keywords: formData.keywords.filter((_, index) => index !== indexToRemove)
    });
  };
  const handleCreateVersion = async () => {
    try {
      if ($w && contentId) {
        const versionData = {
          content_id: contentId,
          version: (parseFloat(formData.version) + 0.1).toFixed(1),
          title: formData.title,
          content: formData.content,
          description: formData.description,
          created_at: new Date().toISOString(),
          created_by: formData.author || 'admin',
          change_summary: '手动创建版本'
        };
        await $w.cloud.callDataSource({
          dataSourceName: 'content_version',
          methodName: 'wedaCreateV2',
          params: {
            data: versionData
          }
        });
        setFormData({
          ...formData,
          version: versionData.version
        });
        alert('版本创建成功');
        loadVersions();
      }
    } catch (error) {
      console.error('创建版本失败:', error);
      alert('创建版本失败，请重试');
    }
  };
  const loadVersions = async () => {
    try {
      if ($w && contentId) {
        const result = await $w.cloud.callDataSource({
          dataSourceName: 'content_version',
          methodName: 'wedaGetRecordsV2',
          params: {
            filter: {
              where: {
                content_id: {
                  $eq: contentId
                }
              }
            },
            orderBy: [{
              created_at: 'desc'
            }],
            pageSize: 10
          }
        });
        if (result && result.records) {
          setVersions(result.records);
        }
      }
    } catch (error) {
      console.error('加载版本历史失败:', error);
    }
  };
  const handleRestoreVersion = async version => {
    if (confirm(`确定要恢复到版本 ${version.version} 吗？`)) {
      try {
        setFormData({
          ...formData,
          title: version.title,
          content: version.content,
          description: version.description,
          version: (parseFloat(formData.version) + 0.1).toFixed(1)
        });
        alert('版本已恢复，请保存更改');
      } catch (error) {
        console.error('恢复版本失败:', error);
        alert('恢复版本失败，请重试');
      }
    }
  };
  const getLanguageInfo = code => {
    return languages.find(lang => lang.code === code) || languages[0];
  };
  const currentLangInfo = getLanguageInfo(formData.language_code);
  const isRTL = currentLangInfo.direction === 'rtl';
  const getStatusColor = status => {
    const colors = {
      'draft': 'text-gray-500',
      'review': 'text-blue-500',
      'published': 'text-green-500',
      'archived': 'text-red-500'
    };
    return colors[status] || 'text-gray-500';
  };
  const getQualityColor = score => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };
  return <div className="space-y-6">
      {/* Header with Status and Actions */}
      <div className="flex items-center justify-between bg-gray-800 rounded-lg p-4 border border-gray-700">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <span className="mr-2">{currentLangInfo.flag}</span>
            <span className="font-medium">{currentLangInfo.name}</span>
          </div>
          <div className="flex items-center">
            <Clock className={`w-4 h-4 mr-1 ${getStatusColor(formData.status)}`} />
            <span className={`text-sm ${getStatusColor(formData.status)}`}>
              {formData.status === 'draft' ? '草稿' : formData.status === 'review' ? '审核中' : formData.status === 'published' ? '已发布' : '已归档'}
            </span>
          </div>
          {lastSavedTime && <div className="flex items-center text-sm text-gray-400">
              <CheckCircle className="w-4 h-4 mr-1" />
              已保存于 {lastSavedTime.toLocaleTimeString()}
            </div>}
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2">
            <Switch checked={autoSaveEnabled} onCheckedChange={setAutoSaveEnabled} />
            <span className="text-sm text-gray-400">自动保存</span>
          </div>
          <Button onClick={() => setPreviewMode(!previewMode)} variant="outline" size="sm" className="border-gray-700 text-gray-400">
            <Eye className="w-4 h-4 mr-2" />
            {previewMode ? '编辑' : '预览'}
          </Button>
          <Button onClick={handleCreateVersion} variant="outline" size="sm" className="border-gray-700 text-gray-400">
            <History className="w-4 h-4 mr-2" />
            版本
          </Button>
        </div>
      </div>

      {/* Content Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">字数</span>
            <FileText className="w-4 h-4 text-gray-500" />
          </div>
          <div className="text-2xl font-bold text-white mt-1">{wordCount}</div>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">阅读时间</span>
            <Clock className="w-4 h-4 text-gray-500" />
          </div>
          <div className="text-2xl font-bold text-white mt-1">{readingTime}分钟</div>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">SEO分数</span>
            <BarChart3 className="w-4 h-4 text-gray-500" />
          </div>
          <div className={`text-2xl font-bold mt-1 ${getQualityColor(seoScore)}`}>{seoScore}</div>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">内容质量</span>
            <Award className="w-4 h-4 text-gray-500" />
          </div>
          <div className={`text-2xl font-bold mt-1 ${getQualityColor(contentQuality)}`}>{contentQuality}</div>
        </div>
      </div>

      {previewMode ? <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-4">{formData.title || '标题预览'}</h2>
          <div className="prose prose-invert max-w-none">
            <div className="text-gray-300 whitespace-pre-wrap">{formData.content || '内容预览...'}</div>
          </div>
        </div> : <div className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <FileText className="w-4 h-4 inline mr-2" />
                标题
                {validationErrors.title && <span className="text-red-500 ml-2">{validationErrors.title}</span>}
              </label>
              <Input value={formData.title} onChange={e => setFormData({
            ...formData,
            title: e.target.value
          })} placeholder="输入内容标题" className={`bg-gray-800 border-gray-700 ${validationErrors.title ? 'border-red-500' : ''}`} dir={isRTL ? 'rtl' : 'ltr'} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <Globe className="w-4 h-4 inline mr-2" />
                语言
                {validationErrors.language_code && <span className="text-red-500 ml-2">{validationErrors.language_code}</span>}
              </label>
              <Select value={formData.language_code} onValueChange={value => setFormData({
            ...formData,
            language_code: value
          })}>
                <SelectTrigger className="bg-gray-800 border-gray-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {languages.map(lang => <SelectItem key={lang.code} value={lang.code}>
                      <div className="flex items-center">
                        <span className="mr-2">{lang.flag}</span>
                        <span>{lang.name}</span>
                      </div>
                    </SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <FileText className="w-4 h-4 inline mr-2" />
              内容
              {validationErrors.content && <span className="text-red-500 ml-2">{validationErrors.content}</span>}
            </label>
            <Textarea value={formData.content} onChange={e => setFormData({
          ...formData,
          content: e.target.value
        })} placeholder="输入内容正文" rows={8} className={`bg-gray-800 border-gray-700 ${validationErrors.content ? 'border-red-500' : ''}`} dir={isRTL ? 'rtl' : 'ltr'} />
            <div className="mt-2 text-sm text-gray-400">
              字符数: {formData.content.length} | 字数: {wordCount} | 预计阅读时间: {readingTime} 分钟
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <FileText className="w-4 h-4 inline mr-2" />
              描述
            </label>
            <Textarea value={formData.description} onChange={e => setFormData({
          ...formData,
          description: e.target.value
        })} placeholder="输入内容描述（可选）" rows={3} className="bg-gray-800 border-gray-700" dir={isRTL ? 'rtl' : 'ltr'} />
          </div>

          {/* Content Type and Status */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <Settings className="w-4 h-4 inline mr-2" />
                内容类型
                {validationErrors.content_type && <span className="text-red-500 ml-2">{validationErrors.content_type}</span>}
              </label>
              <Select value={formData.content_type} onValueChange={value => setFormData({
            ...formData,
            content_type: value
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

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <Eye className="w-4 h-4 inline mr-2" />
                状态
              </label>
              <Select value={formData.status} onValueChange={value => setFormData({
            ...formData,
            status: value
          })}>
                <SelectTrigger className="bg-gray-800 border-gray-700">
                  <SelectValue placeholder="选择状态" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">草稿</SelectItem>
                  <SelectItem value="review">审核中</SelectItem>
                  <SelectItem value="published">已发布</SelectItem>
                  <SelectItem value="archived">已归档</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <Target className="w-4 h-4 inline mr-2" />
                目标地区
              </label>
              <Select value={formData.region} onValueChange={value => setFormData({
            ...formData,
            region: value
          })}>
                <SelectTrigger className="bg-gray-800 border-gray-700">
                  <SelectValue placeholder="选择地区" />
                </SelectTrigger>
                <SelectContent>
                  {regionOptions.map(option => <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* SEO Information */}
          <div className="border-t border-gray-700 pt-6">
            <h4 className="text-lg font-medium mb-4 text-yellow-500">SEO 优化</h4>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  SEO 标题
                  {validationErrors.seoTitle && <span className="text-red-500 ml-2">{validationErrors.seoTitle}</span>}
                </label>
                <Input value={formData.seo_title} onChange={e => setFormData({
              ...formData,
              seo_title: e.target.value
            })} placeholder="输入SEO标题（建议50-60字符）" className={`bg-gray-800 border-gray-700 ${validationErrors.seoTitle ? 'border-red-500' : ''}`} dir={isRTL ? 'rtl' : 'ltr'} />
                <div className="mt-1 text-sm text-gray-400">
                  长度: {formData.seo_title?.length || 0}/60 字符
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  SEO 描述
                  {validationErrors.seoDescription && <span className="text-red-500 ml-2">{validationErrors.seoDescription}</span>}
                </label>
                <Textarea value={formData.seo_description} onChange={e => setFormData({
              ...formData,
              seo_description: e.target.value
            })} placeholder="输入SEO描述（建议150-160字符）" rows={3} className={`bg-gray-800 border-gray-700 ${validationErrors.seoDescription ? 'border-red-500' : ''}`} dir={isRTL ? 'rtl' : 'ltr'} />
                <div className="mt-1 text-sm text-gray-400">
                  长度: {formData.seo_description?.length || 0}/160 字符
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <Hash className="w-4 h-4 inline mr-2" />
                  关键词
                </label>
                <div className="space-y-2">
                  <div className="flex space-x-2">
                    <Input placeholder="输入关键词后按回车添加" className="bg-gray-800 border-gray-700" onKeyPress={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleKeywordAdd(e.target.value);
                    e.target.value = '';
                  }
                }} />
                    <Button onClick={e => {
                  const input = e.target.previousElementSibling;
                  handleKeywordAdd(input.value);
                  input.value = '';
                }} variant="outline" className="border-gray-700 text-gray-400 hover:border-gray-600 hover:text-white">
                      添加
                    </Button>
                  </div>
                  
                  {formData.keywords && formData.keywords.length > 0 && <div className="flex flex-wrap gap-2">
                      {formData.keywords.map((keyword, index) => <span key={index} className="px-3 py-1 bg-gray-700 text-gray-300 text-sm rounded-full flex items-center">
                          {keyword}
                          <button onClick={() => handleKeywordRemove(index)} className="ml-2 text-gray-500 hover:text-red-400">
                            ×
                          </button>
                        </span>)}
                    </div>}
                </div>
              </div>
            </div>
          </div>

          {/* Advanced Settings */}
          <div className="border-t border-gray-700 pt-6">
            <h4 className="text-lg font-medium mb-4 text-yellow-500">高级设置</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">优先级</label>
                  <Select value={formData.priority?.toString()} onValueChange={value => setFormData({
                ...formData,
                priority: parseInt(value)
              })}>
                    <SelectTrigger className="bg-gray-800 border-gray-700">
                      <SelectValue placeholder="选择优先级" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">高优先级</SelectItem>
                      <SelectItem value="2">中优先级</SelectItem>
                      <SelectItem value="3">低优先级</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">URL别名</label>
                  <Input value={formData.slug} onChange={e => setFormData({
                ...formData,
                slug: e.target.value
              })} placeholder="url-slug" className="bg-gray-800 border-gray-700" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">分类</label>
                  <Input value={formData.category} onChange={e => setFormData({
                ...formData,
                category: e.target.value
              })} placeholder="内容分类" className="bg-gray-800 border-gray-700" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">目标受众</label>
                  <Input value={formData.target_audience} onChange={e => setFormData({
                ...formData,
                target_audience: e.target.value
              })} placeholder="目标受众" className="bg-gray-800 border-gray-700" />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">难度等级</label>
                  <Select value={formData.difficulty_level} onValueChange={value => setFormData({
                ...formData,
                difficulty_level: value
              })}>
                    <SelectTrigger className="bg-gray-800 border-gray-700">
                      <SelectValue placeholder="选择难度" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">初级</SelectItem>
                      <SelectItem value="intermediate">中级</SelectItem>
                      <SelectItem value="advanced">高级</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">行动号召</label>
                  <Input value={formData.call_to_action} onChange={e => setFormData({
                ...formData,
                call_to_action: e.target.value
              })} placeholder="行动号召文本" className="bg-gray-800 border-gray-700" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">版本</label>
                  <Input value={formData.version} onChange={e => setFormData({
                ...formData,
                version: e.target.value
              })} placeholder="1.0" className="bg-gray-800 border-gray-700" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">可见性</label>
                  <Select value={formData.visibility} onValueChange={value => setFormData({
                ...formData,
                visibility: value
              })}>
                    <SelectTrigger className="bg-gray-800 border-gray-700">
                      <SelectValue placeholder="选择可见性" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">公开</SelectItem>
                      <SelectItem value="private">私有</SelectItem>
                      <SelectItem value="restricted">受限</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Toggle Options */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <label className="flex items-center space-x-2">
                <Switch checked={formData.is_featured || false} onCheckedChange={checked => setFormData({
              ...formData,
              is_featured: checked
            })} />
                <span className="text-sm text-gray-300">精选内容</span>
              </label>
              
              <label className="flex items-center space-x-2">
                <Switch checked={formData.human_reviewed || false} onCheckedChange={checked => setFormData({
              ...formData,
              human_reviewed: checked
            })} />
                <span className="text-sm text-gray-300">人工审核</span>
              </label>
              
              <label className="flex items-center space-x-2">
                <Switch checked={formData.cache_enabled !== false} onCheckedChange={checked => setFormData({
              ...formData,
              cache_enabled: checked
            })} />
                <span className="text-sm text-gray-300">启用缓存</span>
              </label>
              
              <label className="flex items-center space-x-2">
                <Switch checked={formData.search_indexed !== false} onCheckedChange={checked => setFormData({
              ...formData,
              search_indexed: checked
            })} />
                <span className="text-sm text-gray-300">搜索索引</span>
              </label>
            </div>
          </div>

          {/* Translation Tools */}
          <div className="border-t border-gray-700 pt-6">
            <h4 className="text-lg font-medium mb-4 text-yellow-500">翻译工具</h4>
            
            <div className="flex items-center space-x-4">
              <Select onValueChange={handleTranslate}>
                <SelectTrigger className="w-48 bg-gray-800 border-gray-700">
                  <SelectValue placeholder="翻译到..." />
                </SelectTrigger>
                <SelectContent>
                  {languages.filter(lang => lang.code !== formData.language_code).map(lang => <SelectItem key={lang.code} value={lang.code}>
                      <div className="flex items-center">
                        <span className="mr-2">{lang.flag}</span>
                        <span>{lang.name}</span>
                      </div>
                    </SelectItem>)}
                </SelectContent>
              </Select>
              
              {isTranslating && <div className="flex items-center text-blue-500">
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                翻译中...
              </div>}
            </div>
          </div>

          {/* Notes */}
          <div className="border-t border-gray-700 pt-6">
            <h4 className="text-lg font-medium mb-4 text-yellow-500">备注</h4>
            <Textarea value={formData.notes} onChange={e => setFormData({
          ...formData,
          notes: e.target.value
        })} placeholder="添加备注信息..." rows={3} className="bg-gray-800 border-gray-700" />
          </div>
        </div>}

      {/* Action Buttons */}
      <div className="flex items-center justify-between border-t border-gray-700 pt-6">
        <div className="flex items-center space-x-4">
          {isAutoSaving && <div className="flex items-center text-blue-500">
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              自动保存中...
            </div>}
        </div>
        
        <div className="flex items-center space-x-3">
          {onCancel && <Button onClick={onCancel} variant="outline" className="border-gray-700 text-gray-400 hover:border-gray-600 hover:text-white">
              取消
            </Button>}
          
          <Button onClick={() => handleSave('draft')} variant="outline" className="border-gray-700 text-gray-400 hover:border-gray-600 hover:text-white">
            <Save className="w-4 h-4 mr-2" />
            保存草稿
          </Button>
          
          <Button onClick={() => handleSave('review')} variant="outline" className="border-blue-700 text-blue-400 hover:border-blue-600 hover:text-blue-300">
            <Send className="w-4 h-4 mr-2" />
            提交审核
          </Button>
          
          <Button onClick={() => handleSave('published')} className="bg-green-500 hover:bg-green-600 text-black">
            <CheckCircle className="w-4 h-4 mr-2" />
            发布
          </Button>
        </div>
      </div>

      {/* Version History Modal */}
      {showVersionHistory && <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-xl border border-gray-800 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-yellow-500">版本历史</h3>
                <button onClick={() => setShowVersionHistory(false)} className="text-gray-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                {versions.map((version, index) => <div key={index} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <span className="font-medium text-white">版本 {version.version}</span>
                        <span className="ml-3 text-sm text-gray-400">{formatDate(version.created_at)}</span>
                      </div>
                      <Button onClick={() => handleRestoreVersion(version)} variant="outline" size="sm" className="border-gray-700 text-gray-400">
                        恢复
                      </Button>
                    </div>
                    <p className="text-gray-300 text-sm mb-2">{version.title}</p>
                    <p className="text-gray-400 text-xs">{version.change_summary}</p>
                  </div>)}
              </div>
            </div>
          </div>
        </div>}
    </div>;
}
function formatDate(dateString) {
  return new Date(dateString).toLocaleString('zh-CN');
}