// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Button } from '@/components/ui';
// @ts-ignore;
import { Brain, Settings, BarChart3, Zap, Shield, CheckCircle, XCircle, AlertCircle, Edit2, Trash2, Play, Pause } from 'lucide-react';

export function AIModelCard({
  model,
  onEdit,
  onDelete,
  onToggle,
  $w = null
}) {
  const getStatusIcon = status => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'inactive':
        return <XCircle className="w-4 h-4 text-gray-500" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
    }
  };
  const getStatusText = status => {
    const statusMap = {
      'active': '运行中',
      'inactive': '已停止',
      'error': '错误',
      'testing': '测试中'
    };
    return statusMap[status] || status;
  };
  return <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <Brain className="w-6 h-6 text-yellow-500" />
            <h3 className="text-lg font-medium text-white">{model.name}</h3>
            {getStatusIcon(model.status)}
          </div>
          
          <div className="text-sm text-gray-400 mb-3">
            {model.description}
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-400">模型类型:</span>
              <span className="ml-2 text-white">{model.type}</span>
            </div>
            <div>
              <span className="text-gray-400">版本:</span>
              <span className="ml-2 text-white">{model.version}</span>
            </div>
            <div>
              <span className="text-gray-400">准确率:</span>
              <span className="ml-2 text-green-500">{(model.accuracy * 100).toFixed(1)}%</span>
            </div>
            <div>
              <span className="text-gray-400">响应时间:</span>
              <span className="ml-2 text-blue-500">{model.response_time}s</span>
            </div>
            <div>
              <span className="text-gray-400">日调用量:</span>
              <span className="ml-2 text-purple-500">{model.daily_usage?.toLocaleString() || 0}</span>
            </div>
            <div>
              <span className="text-gray-400">成本:</span>
              <span className="ml-2 text-yellow-500">${model.cost_per_call?.toFixed(4) || 0}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button onClick={() => onToggle(model._id, model.status === 'active' ? 'inactive' : 'active')} variant="outline" size="sm" className={`border ${model.status === 'active' ? 'border-red-500 text-red-500 hover:bg-red-500/10' : 'border-green-500 text-green-500 hover:bg-green-500/10'}`}>
            {model.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button>
          
          <Button onClick={() => onEdit(model)} variant="outline" size="sm" className="border-gray-700 text-gray-400">
            <Edit2 className="w-4 h-4" />
          </Button>
          
          <Button onClick={() => onDelete(model._id)} variant="outline" size="sm" className="border-red-500 text-red-500">
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      {/* 性能指标 */}
      <div className="mt-4 pt-4 border-t border-gray-700">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-400">性能指标</span>
          <span className="text-xs text-gray-500">最近7天</span>
        </div>
        
        <div className="grid grid-cols-4 gap-2">
          <div className="text-center">
            <div className="text-lg font-bold text-green-500">{(model.satisfaction_score * 20).toFixed(0)}%</div>
            <div className="text-xs text-gray-400">满意度</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-blue-500">{model.error_rate?.toFixed(1) || 0}%</div>
            <div className="text-xs text-gray-400">错误率</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-purple-500">{model.conversion_rate?.toFixed(1) || 0}%</div>
            <div className="text-xs text-gray-400">转化率</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-yellow-500">{model.total_conversations?.toLocaleString() || 0}</div>
            <div className="text-xs text-gray-400">总对话</div>
          </div>
        </div>
      </div>
      
      {/* 配置信息 */}
      <div className="mt-4 pt-4 border-t border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-xs text-gray-400">
            <span>温度: {model.temperature}</span>
            <span>最大Token: {model.max_tokens}</span>
            <span>最后更新: {new Date(model.updated_at).toLocaleDateString()}</span>
          </div>
          
          <div className="flex items-center space-x-1">
            <Shield className="w-3 h-3 text-green-500" />
            <span className="text-xs text-green-500">已验证</span>
          </div>
        </div>
      </div>
    </div>;
}