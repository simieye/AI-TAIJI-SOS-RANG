// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Button, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Textarea, Switch } from '@/components/ui';
// @ts-ignore;
import { X, Save, Brain, Zap, Shield, Globe, Heart, Target, Code, FileText, Settings } from 'lucide-react';

export function PromptEditor({
  prompt = null,
  onSave,
  onCancel,
  $w = null
}) {
  const [formData, setFormData] = useState({
    name: prompt?.name || '',
    description: prompt?.description || '',
    module: prompt?.module || 'intent-recognition',
    type: prompt?.type || 'system',
    content: prompt?.content || '',
    version: prompt?.version || '1.0',
    temperature: prompt?.temperature || 0.7,
    max_tokens: prompt?.max_tokens || 2000,
    enabled: prompt?.enabled ?? true,
    tags: prompt?.tags || [],
    variables: prompt?.variables || [],
    examples: prompt?.examples || [],
    metadata: prompt?.metadata || {}
  });
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState(null);
  const moduleOptions = [{
    value: 'intent-recognition',
    label: '意图识别',
    icon: Brain
  }, {
    value: 'emotion-analysis',
    label: '情绪分析',
    icon: Heart
  }, {
    value: 'partner-inquiry',
    label: '合作伙伴咨询',
    icon: Globe
  }, {
    value: 'health-analysis',
    label: '健康分析',
    icon: Shield
  }, {
    value: 'tech-explanation',
    label: '技术讲解',
    icon: Code
  }, {
    value: 'brand-story',
    label: '品牌故事',
    icon: FileText
  }, {
    value: 'dao-governance',
    label: 'DAO治理',
    icon: Settings
  }];
  const typeOptions = [{
    value: 'system',
    label: '系统消息'
  }, {
    value: 'user',
    label: '用户示例'
  }, {
    value: 'assistant',
    label: '助手响应'
  }, {
    value: 'function',
    label: '函数调用'
  }];
  const handleSave = () => {
    if (!formData.name.trim() || !formData.content.trim()) {
      alert('请填写必要字段');
      return;
    }
    const saveData = {
      ...formData,
      updated_at: new Date().toISOString(),
      ...(prompt ? {} : {
        created_at: new Date().toISOString()
      })
    };
    onSave(saveData);
  };
  const handleTest = async () => {
    if (!formData.content.trim()) {
      alert('请输入Prompt内容');
      return;
    }
    setIsTesting(true);
    try {
      // 模拟测试
      await new Promise(resolve => setTimeout(resolve, 2000));
      setTestResult({
        success: true,
        response: '测试响应成功！这是一个模拟的AI响应结果。',
        tokens_used: 156,
        response_time: 1.2,
        confidence: 0.92
      });
    } catch (error) {
      setTestResult({
        success: false,
        error: '测试失败：' + error.message
      });
    } finally {
      setIsTesting(false);
    }
  };
  const addVariable = () => {
    setFormData(prev => ({
      ...prev,
      variables: [...prev.variables, {
        name: '',
        description: '',
        type: 'string',
        required: false
      }]
    }));
  };
  const updateVariable = (index, field, value) => {
    const newVariables = [...formData.variables];
    newVariables[index] = {
      ...newVariables[index],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      variables: newVariables
    }));
  };
  const removeVariable = index => {
    setFormData(prev => ({
      ...prev,
      variables: prev.variables.filter((_, i) => i !== index)
    }));
  };
  const addExample = () => {
    setFormData(prev => ({
      ...prev,
      examples: [...prev.examples, {
        input: '',
        output: '',
        context: ''
      }]
    }));
  };
  const updateExample = (index, field, value) => {
    const newExamples = [...formData.examples];
    newExamples[index] = {
      ...newExamples[index],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      examples: newExamples
    }));
  };
  const removeExample = index => {
    setFormData(prev => ({
      ...prev,
      examples: prev.examples.filter((_, i) => i !== index)
    }));
  };
  return <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-xl border border-gray-800 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-yellow-500">
              {prompt ? '编辑Prompt模板' : '新建Prompt模板'}
            </h3>
            <button onClick={onCancel} className="text-gray-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Basic Information */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">模板名称</label>
                <Input value={formData.name} onChange={e => setFormData(prev => ({
                ...prev,
                name: e.target.value
              }))} placeholder="输入模板名称" className="bg-gray-800 border-gray-700" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">所属模块</label>
                <Select value={formData.module} onValueChange={value => setFormData(prev => ({
                ...prev,
                module: value
              }))}>
                  <SelectTrigger className="bg-gray-800 border-gray-700">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {moduleOptions.map(option => <SelectItem key={option.value} value={option.value}>
                        <div className="flex items-center">
                          <option.icon className="w-4 h-4 mr-2" />
                          {option.label}
                        </div>
                      </SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">描述</label>
              <Textarea value={formData.description} onChange={e => setFormData(prev => ({
              ...prev,
              description: e.target.value
            }))} placeholder="描述这个Prompt的用途和功能" rows={2} className="bg-gray-800 border-gray-700" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">类型</label>
                <Select value={formData.type} onValueChange={value => setFormData(prev => ({
                ...prev,
                type: value
              }))}>
                  <SelectTrigger className="bg-gray-800 border-gray-700">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {typeOptions.map(option => <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">版本</label>
                <Input value={formData.version} onChange={e => setFormData(prev => ({
                ...prev,
                version: e.target.value
              }))} placeholder="1.0" className="bg-gray-800 border-gray-700" />
              </div>
              
              <div className="flex items-center space-x-3">
                <Switch checked={formData.enabled} onCheckedChange={checked => setFormData(prev => ({
                ...prev,
                enabled: checked
              }))} />
                <label className="text-sm text-gray-300">启用状态</label>
              </div>
            </div>

            {/* Prompt Content */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-300">Prompt内容</label>
                <Button onClick={handleTest} disabled={isTesting} variant="outline" size="sm" className="border-gray-700 text-gray-400">
                  <Zap className="w-4 h-4 mr-2" />
                  {isTesting ? '测试中...' : '测试'}
                </Button>
              </div>
              <Textarea value={formData.content} onChange={e => setFormData(prev => ({
              ...prev,
              content: e.target.value
            }))} placeholder="输入Prompt内容..." rows={8} className="bg-gray-800 border-gray-700 font-mono text-sm" />
            </div>

            {/* Test Result */}
            {testResult && <div className={`p-4 rounded-lg border ${testResult.success ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className={`font-medium ${testResult.success ? 'text-green-500' : 'text-red-500'}`}>
                    {testResult.success ? '测试成功' : '测试失败'}
                  </span>
                  <button onClick={() => setTestResult(null)} className="text-gray-400 hover:text-white">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                {testResult.success ? <div className="space-y-2 text-sm">
                    <div className="text-gray-300">{testResult.response}</div>
                    <div className="flex items-center space-x-4 text-xs text-gray-400">
                      <span>Token使用: {testResult.tokens_used}</span>
                      <span>响应时间: {testResult.response_time}s</span>
                      <span>置信度: {(testResult.confidence * 100).toFixed(1)}%</span>
                    </div>
                  </div> : <div className="text-red-400 text-sm">{testResult.error}</div>}
              </div>}

            {/* Parameters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">温度 (创造性)</label>
                <input type="range" min="0" max="1" step="0.1" value={formData.temperature} onChange={e => setFormData(prev => ({
                ...prev,
                temperature: parseFloat(e.target.value)
              }))} className="w-full" />
                <div className="text-xs text-gray-400 mt-1">当前值: {formData.temperature}</div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">最大Token数</label>
                <Input type="number" value={formData.max_tokens} onChange={e => setFormData(prev => ({
                ...prev,
                max_tokens: parseInt(e.target.value) || 2000
              }))} min="100" max="8000" className="bg-gray-800 border-gray-700" />
              </div>
            </div>

            {/* Variables */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-medium text-gray-300">变量定义</label>
                <Button onClick={addVariable} variant="outline" size="sm" className="border-gray-700 text-gray-400">
                  添加变量
                </Button>
              </div>
              <div className="space-y-2">
                {formData.variables.map((variable, index) => <div key={index} className="flex items-center space-x-2 p-3 bg-gray-800 rounded-lg">
                    <Input value={variable.name} onChange={e => updateVariable(index, 'name', e.target.value)} placeholder="变量名" className="bg-gray-700 border-gray-600 flex-1" />
                    <Input value={variable.description} onChange={e => updateVariable(index, 'description', e.target.value)} placeholder="描述" className="bg-gray-700 border-gray-600 flex-1" />
                    <Select value={variable.type} onValueChange={value => updateVariable(index, 'type', value)}>
                      <SelectTrigger className="bg-gray-700 border-gray-600 w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="string">字符串</SelectItem>
                        <SelectItem value="number">数字</SelectItem>
                        <SelectItem value="boolean">布尔值</SelectItem>
                        <SelectItem value="array">数组</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button onClick={() => removeVariable(index)} variant="outline" size="sm" className="border-red-500 text-red-500">
                      <X className="w-4 h-4" />
                    </Button>
                  </div>)}
              </div>
            </div>

            {/* Examples */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-medium text-gray-300">示例对话</label>
                <Button onClick={addExample} variant="outline" size="sm" className="border-gray-700 text-gray-400">
                  添加示例
                </Button>
              </div>
              <div className="space-y-3">
                {formData.examples.map((example, index) => <div key={index} className="p-4 bg-gray-800 rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-300">示例 {index + 1}</span>
                      <Button onClick={() => removeExample(index)} variant="outline" size="sm" className="border-red-500 text-red-500">
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                    <Textarea value={example.input} onChange={e => updateExample(index, 'input', e.target.value)} placeholder="用户输入示例" rows={2} className="bg-gray-700 border-gray-600" />
                    <Textarea value={example.output} onChange={e => updateExample(index, 'output', e.target.value)} placeholder="期望输出示例" rows={2} className="bg-gray-700 border-gray-600" />
                  </div>)}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-3 mt-6">
            <Button onClick={onCancel} variant="outline" className="flex-1 border-gray-700 text-gray-400">
              取消
            </Button>
            <Button onClick={handleSave} className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black">
              <Save className="w-4 h-4 mr-2" />
              保存
            </Button>
          </div>
        </div>
      </div>
    </div>;
}