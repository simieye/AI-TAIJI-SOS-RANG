// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Button } from '@/components/ui';
// @ts-ignore;
import { X, Bot, ChevronDown } from 'lucide-react';

export function AIChatHeader({
  currentModel,
  onClose,
  onModelSelectorToggle,
  showModelSelector
}) {
  const ModelIcon = getIconComponent(currentModel?.icon || 'Bot');
  return <div className="flex items-center justify-between p-6 border-b border-gray-800">
      <div className="flex items-center">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${currentModel?.color}`}>
          <ModelIcon className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-yellow-500">AI太极全能助手</h3>
          <p className="text-sm text-gray-400">智能健康与商业生态顾问</p>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        {/* 模型选择器按钮 */}
        <Button onClick={onModelSelectorToggle} variant="outline" size="sm" className="border-gray-700 text-gray-300 hover:border-gray-600 hover:text-white">
          <ModelIcon className={`w-4 h-4 mr-2 ${currentModel?.color}`} />
          {currentModel?.name}
          <ChevronDown className="w-4 h-4 ml-2" />
        </Button>
        
        <Button onClick={onClose} variant="ghost" size="sm" className="text-gray-400 hover:text-white">
          <X className="w-5 h-5" />
        </Button>
      </div>
    </div>;
}

// 图标组件映射函数
function getIconComponent(iconName) {
  const icons = {
    'Brain': () => require('lucide-react').Brain,
    'Shield': () => require('lucide-react').Shield,
    'Sparkles': () => require('lucide-react').Sparkles,
    'Globe': () => require('lucide-react').Globe,
    'Cpu': () => require('lucide-react').Cpu,
    'Zap': () => require('lucide-react').Zap,
    'Bot': () => require('lucide-react').Bot
  };
  return icons[iconName] || icons.Bot;
}