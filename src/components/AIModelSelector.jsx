// @ts-ignore;
import React from 'react';

export function AIModelSelector({
  models,
  selectedModel,
  onModelChange,
  onClose
}) {
  const getIconComponent = iconName => {
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
  };
  return <div className="absolute top-full left-0 right-0 mt-2 w-80 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-10 max-h-96 overflow-y-auto">
      {models.map(model => {
      const Icon = getIconComponent(model.icon);
      return <button key={model.id} onClick={() => onModelChange(model.id)} className={`w-full p-3 text-left hover:bg-gray-700 border-b border-gray-700 last:border-b-0 ${selectedModel === model.id ? 'bg-gray-700' : ''}`}>
            <div className="flex items-center">
              <Icon className={`w-5 h-5 mr-3 ${model.color}`} />
              <div className="flex-1">
                <div className="font-medium">{model.name}</div>
                <div className="text-sm text-gray-400">{model.provider}</div>
              </div>
              {model.status === 'available' && <div className="w-2 h-2 bg-green-500 rounded-full"></div>}
            </div>
            <div className="text-xs text-gray-400 mt-1">{model.description}</div>
            {model.capabilities && <div className="flex flex-wrap gap-1 mt-2">
                {model.capabilities.slice(0, 3).map((cap, index) => <span key={index} className="text-xs bg-gray-700 px-2 py-1 rounded">
                    {cap}
                  </span>)}
              </div>}
          </button>;
    })}
    </div>;
}