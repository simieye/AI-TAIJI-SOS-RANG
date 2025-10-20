// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Textarea, Button } from '@/components/ui';
// @ts-ignore;
import { FileText, Globe, Target, Hash, Eye, Settings, Upload, Download, Copy, CheckCircle } from 'lucide-react';

export function LanguageContentEditor({
  formData,
  setFormData,
  languages,
  contentTypeOptions,
  regionOptions
}) {
  const handleKeywordAdd = keyword => {
    if (keyword && !formData.keywords.includes(keyword)) {
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
  const getLanguageInfo = code => {
    return languages.find(lang => lang.code === code) || languages[0];
  };
  const currentLangInfo = getLanguageInfo(formData.language);
  const isRTL = currentLangInfo.direction === 'rtl';
  return <div className="space-y-6">
      {/* Basic Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            <FileText className="w-4 h-4 inline mr-2" />
            标题
          </label>
          <Input value={formData.title} onChange={e => setFormData({
          ...formData,
          title: e.target.value
        })} placeholder="输入内容标题" className="bg-gray-800 border-gray-700" dir={isRTL ? 'rtl' : 'ltr'} />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            <Globe className="w-4 h-4 inline mr-2" />
            语言
          </label>
          <Select value={formData.language} onValueChange={value => setFormData({
          ...formData,
          language: value
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
        </label>
        <Textarea value={formData.content} onChange={e => setFormData({
        ...formData,
        content: e.target.value
      })} placeholder="输入内容正文" rows={8} className="bg-gray-800 border-gray-700" dir={isRTL ? 'rtl' : 'ltr'} />
        <div className="mt-2 text-sm text-gray-400">
          字符数: {formData.content.length} | 
          预计阅读时间: {Math.max(1, Math.ceil(formData.content.length / 500))} 分钟
        </div>
      </div>

      {/* Content Type and Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            <Settings className="w-4 h-4 inline mr-2" />
            内容类型
          </label>
          <Select value={formData.type} onValueChange={value => setFormData({
          ...formData,
          type: value
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
            </label>
            <Input value={formData.seoTitle} onChange={e => setFormData({
            ...formData,
            seoTitle: e.target.value
          })} placeholder="输入SEO标题（建议50-60字符）" className="bg-gray-800 border-gray-700" dir={isRTL ? 'rtl' : 'ltr'} />
            <div className="mt-1 text-sm text-gray-400">
              长度: {formData.seoTitle.length}/60 字符
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              SEO 描述
            </label>
            <Textarea value={formData.seoDescription} onChange={e => setFormData({
            ...formData,
            seoDescription: e.target.value
          })} placeholder="输入SEO描述（建议150-160字符）" rows={3} className="bg-gray-800 border-gray-700" dir={isRTL ? 'rtl' : 'ltr'} />
            <div className="mt-1 text-sm text-gray-400">
              长度: {formData.seoDescription.length}/160 字符
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
              
              {formData.keywords.length > 0 && <div className="flex flex-wrap gap-2">
                  {formData.keywords.map((keyword, index) => <span key={index} className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-full flex items-center">
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

      {/* Priority and Additional Settings */}
      <div className="border-t border-gray-700 pt-6">
        <h4 className="text-lg font-medium mb-4 text-yellow-500">其他设置</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              优先级
            </label>
            <Select value={formData.priority.toString()} onValueChange={value => setFormData({
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

          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input type="checkbox" checked={formData.autoTranslate || false} onChange={e => setFormData({
              ...formData,
              autoTranslate: e.target.checked
            })} className="mr-2" />
              <span className="text-sm text-gray-300">启用自动翻译</span>
            </label>
            
            <label className="flex items-center">
              <input type="checkbox" checked={formData.isFeatured || false} onChange={e => setFormData({
              ...formData,
              isFeatured: e.target.checked
            })} className="mr-2" />
              <span className="text-sm text-gray-300">设为精选内容</span>
            </label>
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="border-t border-gray-700 pt-6">
        <h4 className="text-lg font-medium mb-4 text-yellow-500">预览</h4>
        
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center mb-2">
            <span className="mr-2">{currentLangInfo.flag}</span>
            <h5 className="font-medium text-white">{formData.title || '标题预览'}</h5>
          </div>
          <p className="text-gray-300 text-sm mb-2">
            {formData.content ? formData.content.substring(0, 150) + '...' : '内容预览...'}
          </p>
          <div className="flex items-center text-xs text-gray-400">
            <span>{currentLangInfo.name}</span>
            <span className="mx-2">•</span>
            <span>{contentTypeOptions.find(opt => opt.value === formData.type)?.label}</span>
            <span className="mx-2">•</span>
            <span>{regionOptions.find(opt => opt.value === formData.region)?.label}</span>
          </div>
        </div>
      </div>
    </div>;
}