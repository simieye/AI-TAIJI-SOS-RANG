// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { User, X } from 'lucide-react';

export function AIChatMessages({
  messages,
  isTyping,
  currentModel,
  messagesEndRef
}) {
  const handleCopyMessage = content => {
    navigator.clipboard.writeText(content);
  };
  const ModelIcon = getIconComponent(currentModel?.icon || 'Bot');
  return <div className="flex-1 overflow-y-auto p-6 space-y-4">
      {messages.map(message => <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
          <div className={`max-w-2xl ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
            <div className={`flex items-start space-x-3 ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${message.type === 'user' ? 'bg-yellow-500' : message.type === 'error' ? 'bg-red-500' : 'bg-gray-700'}`}>
                {message.type === 'user' ? <User className="w-4 h-4 text-black" /> : message.type === 'error' ? <X className="w-4 h-4 text-white" /> : <ModelIcon className={`w-4 h-4 ${currentModel?.color}`} />}
              </div>
              <div className={`rounded-lg p-4 max-w-xl ${message.type === 'user' ? 'bg-yellow-500 text-black' : message.type === 'error' ? 'bg-red-500 text-white' : 'bg-gray-800 text-white'}`}>
                <div className="whitespace-pre-wrap">{message.content}</div>
                <div className={`flex items-center justify-between mt-2 text-xs ${message.type === 'user' ? 'text-black/70' : 'text-gray-400'}`}>
                  <span>{new Date(message.timestamp).toLocaleTimeString()}</span>
                  {message.model && <span>{message.model}</span>}
                  {message.usage && <span>{message.usage.totalTokens} tokens</span>}
                  <div className="flex items-center space-x-2">
                    <button onClick={() => handleCopyMessage(message.content)} className="hover:text-yellow-500">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>)}
      
      {isTyping && <div className="flex justify-start">
          <div className="flex items-center space-x-2 text-gray-400">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-500"></div>
            <span className="text-sm">AI正在思考...</span>
          </div>
        </div>}
      
      <div ref={messagesEndRef} />
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