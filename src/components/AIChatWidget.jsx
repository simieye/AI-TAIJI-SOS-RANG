// @ts-ignore;
import React, { useState, useEffect, useRef } from 'react';
// @ts-ignore;
import { Button, Input } from '@/components/ui';
// @ts-ignore;
import { MessageCircle, Send, X, Minimize2, Maximize2, Bot, User, Mic, Paperclip, Smile, ThumbsUp, ThumbsDown } from 'lucide-react';

export function AIChatWidget({
  position = 'bottom-right',
  theme = 'dark',
  primaryColor = '#EAB308',
  welcomeMessage = '您好！我是AI太极SOS Ring智能健康顾问，有什么可以帮助您的吗？',
  $w = null
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [conversationId, setConversationId] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // 位置样式
  const positionStyles = {
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4'
  };

  // 初始化对话
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      initializeConversation();
    }
  }, [isOpen]);

  // 自动滚动
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 聚焦输入框
  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);
  const initializeConversation = () => {
    const welcomeMsg = {
      id: Date.now(),
      type: 'ai',
      content: welcomeMessage,
      timestamp: new Date()
    };
    setMessages([welcomeMsg]);
    setConversationId(`widget_${Date.now()}`);
  };
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);
    try {
      // 调用AI服务
      const response = await callAIService(userMessage.content);
      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: response,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);

      // 保存对话记录
      await saveConversation(userMessage, aiMessage);
    } catch (error) {
      console.error('AI服务调用失败:', error);
      const errorMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: '抱歉，我现在遇到了一些技术问题。请稍后再试，或者直接联系我们的客服团队。',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };
  const callAIService = async message => {
    // 模拟AI服务调用
    await new Promise(resolve => setTimeout(resolve, 1500));

    // 简单的响应逻辑
    const responses = ['感谢您的提问！AI太极SOS Ring融合了先进的AI健康监测技术和传统太极养生理念，为用户提供全方位的健康守护。', '我很乐意为您介绍我们的产品。AI太极SOS Ring具备24小时健康监测、一键SOS求救和智能太极模式三大核心功能。', '关于合作，我们提供灵活的MOQ政策（起订量50件）和OEM定制服务，欢迎与我们详细沟通合作方案。', '在隐私保护方面，我们采用本地加密处理和符合国际标准的安全机制，确保您的健康数据完全安全。'];
    return responses[Math.floor(Math.random() * responses.length)];
  };
  const saveConversation = async (userMessage, aiMessage) => {
    try {
      if ($w) {
        await $w.cloud.callDataSource({
          dataSourceName: 'ai_conversation_record',
          methodName: 'wedaCreateV2',
          params: {
            data: {
              conversation_id: conversationId,
              user_message: userMessage.content,
              ai_response: aiMessage.content,
              source: 'widget',
              created_at: new Date().toISOString()
            }
          }
        });
      }
    } catch (error) {
      console.error('保存对话记录失败:', error);
    }
  };
  const handleKeyPress = e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  const formatTime = date => {
    return date.toLocaleTimeString('zh-CN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  const handleFeedback = async (messageId, feedback) => {
    try {
      if ($w) {
        await $w.cloud.callDataSource({
          dataSourceName: 'ai_feedback',
          methodName: 'wedaCreateV2',
          params: {
            data: {
              message_id: messageId,
              feedback: feedback,
              conversation_id: conversationId,
              created_at: new Date().toISOString()
            }
          }
        });
      }
    } catch (error) {
      console.error('保存反馈失败:', error);
    }
  };
  if (!isOpen) {
    return <div className={`fixed ${positionStyles[position]} z-50`}>
        <Button onClick={() => setIsOpen(true)} className="bg-yellow-500 hover:bg-yellow-600 text-black rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110" style={{
        backgroundColor: primaryColor
      }}>
          <MessageCircle className="w-6 h-6" />
        </Button>
        
        {/* 未读消息提示 */}
        {messages.length === 0 && <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
          1
        </div>}
      </div>;
  }
  return <div className={`fixed ${positionStyles[position]} z-50 ${isMinimized ? 'w-80' : 'w-96 h-[600px]'}`} style={{
    backgroundColor: theme === 'dark' ? '#1a1a1a' : '#ffffff'
  }}>
      {/* 聊天窗口 */}
      <div className={`h-full rounded-lg shadow-2xl border flex flex-col ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`} style={{
      backgroundColor: theme === 'dark' ? '#1a1a1a' : '#ffffff'
    }}>
        {/* 头部 */}
        <div className="flex items-center justify-between p-4 border-b" style={{
        borderColor: theme === 'dark' ? '#374151' : '#e5e7eb',
        backgroundColor: primaryColor
      }}>
          <div className="flex items-center space-x-2">
            <Bot className="w-5 h-5 text-white" />
            <span className="font-medium text-white">AI太极智能客服</span>
          </div>
          
          <div className="flex items-center space-x-1">
            <button onClick={() => setIsMinimized(!isMinimized)} className="text-white hover:bg-white/20 p-1 rounded">
              {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </button>
            <button onClick={() => setIsOpen(false)} className="text-white hover:bg-white/20 p-1 rounded">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {!isMinimized && <>
            {/* 消息区域 */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map(message => <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                    <div className={`flex items-end space-x-2 ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${message.type === 'user' ? 'bg-blue-500' : 'bg-yellow-500'}`}>
                        {message.type === 'user' ? <User className="w-3 h-3 text-white" /> : <Bot className="w-3 h-3 text-white" />}
                      </div>
                      <div>
                        <div className={`px-3 py-2 rounded-lg text-sm ${message.type === 'user' ? 'bg-blue-500 text-white' : theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'}`}>
                          {message.content}
                        </div>
                        <div className={`flex items-center space-x-2 mt-1 text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} ${message.type === 'user' ? 'justify-end' : ''}`}>
                          <span>{formatTime(message.timestamp)}</span>
                        </div>
                        {message.type === 'ai' && <div className="flex items-center space-x-2 mt-1">
                            <button onClick={() => handleFeedback(message.id, 'thumbsup')} className={`hover:text-green-500 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                              <ThumbsUp className="w-3 h-3" />
                            </button>
                            <button onClick={() => handleFeedback(message.id, 'thumbsdown')} className={`hover:text-red-500 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                              <ThumbsDown className="w-3 h-3" />
                            </button>
                          </div>}
                      </div>
                    </div>
                  </div>
                </div>)}
              
              {isTyping && <div className="flex justify-start">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center">
                      <Bot className="w-3 h-3 text-white" />
                    </div>
                    <div className={`px-3 py-2 rounded-lg text-sm ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
                      <div className="flex items-center space-x-1">
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{
                    animationDelay: '0.1s'
                  }}></div>
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{
                    animationDelay: '0.2s'
                  }}></div>
                      </div>
                    </div>
                  </div>
                </div>}
              <div ref={messagesEndRef} />
            </div>

            {/* 输入区域 */}
            <div className="p-4 border-t" style={{
          borderColor: theme === 'dark' ? '#374151' : '#e5e7eb'
        }}>
              <div className="flex items-end space-x-2">
                <button className={`p-2 rounded-lg ${theme === 'dark' ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}>
                  <Paperclip className="w-4 h-4" />
                </button>
                
                <div className="flex-1">
                  <input ref={inputRef} type="text" value={inputMessage} onChange={e => setInputMessage(e.target.value)} onKeyPress={handleKeyPress} placeholder="输入您的问题..." className={`w-full px-3 py-2 rounded-lg text-sm resize-none ${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'} border focus:outline-none focus:ring-2`} style={{
                '--tw-ring-color': primaryColor
              }} />
                </div>
                
                <button className={`p-2 rounded-lg ${theme === 'dark' ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}>
                  <Smile className="w-4 h-4" />
                </button>
                
                <Button onClick={handleSendMessage} disabled={!inputMessage.trim() || isTyping} className="p-2 rounded-lg" style={{
              backgroundColor: primaryColor
            }}>
                  <Send className="w-4 h-4 text-white" />
                </Button>
              </div>
            </div>
          </>}
      </div>
    </div>;
}