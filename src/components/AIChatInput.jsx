// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Button } from '@/components/ui';
// @ts-ignore;
import { Send, Mic, MicOff, Paperclip } from 'lucide-react';

export function AIChatInput({
  inputMessage,
  setInputMessage,
  isLoading,
  isRecording,
  onSendMessage,
  onVoiceToggle,
  onKeyPress,
  inputRef,
  currentModel
}) {
  return <div className="p-6 border-t border-gray-800">
      <div className="flex items-end space-x-4">
        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
          <Paperclip className="w-5 h-5" />
        </Button>
        
        <div className="flex-1">
          <textarea ref={inputRef} value={inputMessage} onChange={e => setInputMessage(e.target.value)} onKeyPress={onKeyPress} placeholder="输入您的问题..." className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 resize-none" rows={1} style={{
          minHeight: '48px',
          maxHeight: '120px'
        }} />
        </div>
        
        <Button onClick={onVoiceToggle} variant="ghost" size="sm" className={`${isRecording ? 'text-red-500' : 'text-gray-400'} hover:text-white`}>
          {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
        </Button>
        
        <Button onClick={onSendMessage} disabled={!inputMessage.trim() || isLoading} className="bg-yellow-500 hover:bg-yellow-600 text-black disabled:opacity-50">
          <Send className="w-5 h-5" />
        </Button>
      </div>
      
      <div className="flex items-center justify-between mt-2 text-xs text-gray-400">
        <span>按 Enter 发送，Shift + Enter 换行</span>
        <span>当前模型: {currentModel?.name}</span>
      </div>
    </div>;
}