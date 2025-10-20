// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Input } from '@/components/ui';
// @ts-ignore;
import { ArrowLeft, Bell, MessageCircle, CheckCircle, Clock, Search, Filter, Trash2, Archive, Star, User, Settings, X, Send, Paperclip, Smile } from 'lucide-react';

import { Navigation } from '@/components/Navigation';
import { AuthGuard } from '@/components/AuthGuard';
export default function Notifications(props) {
  const {
    $w
  } = props;
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [loading, setLoading] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const navigateTo = pageId => {
    $w.utils.navigateTo({
      pageId,
      params: {}
    });
  };
  useEffect(() => {
    loadMessages();
    // 模拟实时消息推送
    const interval = setInterval(() => {
      simulateNewMessage();
    }, 30000); // 每30秒模拟一条新消息
    return () => clearInterval(interval);
  }, []);
  const loadMessages = async () => {
    try {
      setLoading(true);
      // 模拟加载消息数据
      const mockMessages = [{
        id: 1,
        type: 'system',
        title: '系统通知',
        content: '您的产品配置已保存成功',
        timestamp: Date.now() - 1000 * 60 * 5,
        read: false,
        priority: 'normal',
        sender: {
          name: 'AI太极系统',
          avatar: ''
        },
        action: {
          type: 'navigate',
          target: 'configurator'
        }
      }, {
        id: 2,
        type: 'customer_service',
        title: '客服回复',
        content: '您好，关于您咨询的产品功能问题，我们的技术专家已经为您准备了详细的解答...',
        timestamp: Date.now() - 1000 * 60 * 30,
        read: true,
        priority: 'high',
        sender: {
          name: '客服小助手',
          avatar: ''
        },
        action: {
          type: 'chat',
          target: 'consultation-chat'
        }
      }, {
        id: 3,
        type: 'order',
        title: '订单更新',
        content: '您的订单 ORDER_1234567890 已确认，预计3个工作日内发货',
        timestamp: Date.now() - 1000 * 60 * 60 * 2,
        read: true,
        priority: 'normal',
        sender: {
          name: '订单系统',
          avatar: ''
        },
        action: {
          type: 'navigate',
          target: 'order-detail'
        }
      }, {
        id: 4,
        type: 'promotion',
        title: '限时优惠',
        content: 'AI太极智能戒指限时优惠中，立减100美元，快来抢购吧！',
        timestamp: Date.now() - 1000 * 60 * 60 * 24,
        read: false,
        priority: 'low',
        sender: {
          name: '营销中心',
          avatar: ''
        },
        action: {
          type: 'navigate',
          target: 'product'
        }
      }];
      setMessages(mockMessages);
    } catch (error) {
      console.error('加载消息失败:', error);
    } finally {
      setLoading(false);
    }
  };
  const simulateNewMessage = () => {
    const newMessage = {
      id: Date.now(),
      type: 'customer_service',
      title: '新消息',
      content: '您有一条新的客服消息，请及时查看',
      timestamp: Date.now(),
      read: false,
      priority: 'normal',
      sender: {
        name: '客服小助手',
        avatar: ''
      },
      action: {
        type: 'chat',
        target: 'consultation-chat'
      }
    };
    setMessages(prev => [newMessage, ...prev]);
  };
  const handleMessageClick = message => {
    setSelectedMessage(message);
    if (!message.read) {
      markAsRead(message.id);
    }
  };
  const markAsRead = messageId => {
    setMessages(prev => prev.map(msg => msg.id === messageId ? {
      ...msg,
      read: true
    } : msg));
  };
  const markAllAsRead = () => {
    setMessages(prev => prev.map(msg => ({
      ...msg,
      read: true
    })));
  };
  const deleteMessage = messageId => {
    setMessages(prev => prev.filter(msg => msg.id !== messageId));
    if (selectedMessage?.id === messageId) {
      setSelectedMessage(null);
    }
  };
  const archiveMessage = messageId => {
    setMessages(prev => prev.map(msg => msg.id === messageId ? {
      ...msg,
      archived: true
    } : msg));
  };
  const handleAction = action => {
    if (action.type === 'navigate') {
      navigateTo(action.target);
    } else if (action.type === 'chat') {
      setShowChat(true);
    }
  };
  const sendChatMessage = () => {
    if (!chatMessage.trim()) return;
    const newMessage = {
      id: Date.now(),
      type: 'user',
      content: chatMessage,
      timestamp: Date.now(),
      read: true,
      sender: {
        name: '我',
        avatar: ''
      }
    };
    setMessages(prev => [...prev, newMessage]);
    setChatMessage('');
    // 模拟客服回复
    setTimeout(() => {
      const replyMessage = {
        id: Date.now() + 1,
        type: 'customer_service',
        title: '客服回复',
        content: '感谢您的消息，我们的客服人员会尽快为您回复。',
        timestamp: Date.now(),
        read: false,
        priority: 'normal',
        sender: {
          name: '客服小助手',
          avatar: ''
        }
      };
      setMessages(prev => [...prev, replyMessage]);
    }, 2000);
  };
  const formatTime = timestamp => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (minutes < 1) return '刚刚';
    if (minutes < 60) return `${minutes}分钟前`;
    if (hours < 24) return `${hours}小时前`;
    if (days < 7) return `${days}天前`;
    return new Date(timestamp).toLocaleDateString();
  };
  const getTypeIcon = type => {
    switch (type) {
      case 'system':
        return <Settings className="w-5 h-5 text-blue-500" />;
      case 'customer_service':
        return <MessageCircle className="w-5 h-5 text-green-500" />;
      case 'order':
        return <CheckCircle className="w-5 h-5 text-yellow-500" />;
      case 'promotion':
        return <Star className="w-5 h-5 text-purple-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };
  const getTypeLabel = type => {
    const typeMap = {
      system: '系统通知',
      customer_service: '客服消息',
      order: '订单通知',
      promotion: '促销活动'
    };
    return typeMap[type] || '其他';
  };
  const filteredMessages = messages.filter(msg => {
    const matchesSearch = msg.title.toLowerCase().includes(searchTerm.toLowerCase()) || msg.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || msg.type === filterType;
    return matchesSearch && matchesFilter && !msg.archived;
  });
  const unreadCount = filteredMessages.filter(msg => !msg.read).length;
  return <AuthGuard $w={$w}>
      <div className="min-h-screen bg-black text-white">
        <Navigation currentPage="notifications" $w={$w} />

        <div className="max-w-7xl mx-auto px-8 py-24">
          {/* Header */}
          <div className="mb-8">
            <button onClick={() => navigateTo('home')} className="flex items-center text-gray-400 hover:text-yellow-500 transition-colors mb-4">
              <ArrowLeft className="w-5 h-5 mr-2" />
              返回首页
            </button>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-yellow-500">消息中心</span>
            </h1>
            <p className="text-xl text-gray-300">
              查看您的所有通知和消息
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Message List */}
            <div className="lg:col-span-2">
              {/* Filters */}
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-800 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="搜索消息..." className="pl-10 bg-gray-800 border-gray-700 focus:border-yellow-500 text-white placeholder-gray-500" />
                    </div>
                    <select value={filterType} onChange={e => setFilterType(e.target.value)} className="bg-gray-800 border-gray-700 focus:border-yellow-500 text-white rounded-lg px-4 py-2">
                      <option value="all">全部类型</option>
                      <option value="system">系统通知</option>
                      <option value="customer_service">客服消息</option>
                      <option value="order">订单通知</option>
                      <option value="promotion">促销活动</option>
                    </select>
                  </div>
                  <div className="flex items-center space-x-2">
                    {unreadCount > 0 && <Button onClick={markAllAsRead} variant="outline" size="sm" className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black">
                        全部已读
                      </Button>}
                  </div>
                </div>
              </div>

              {/* Message List */}
              <div className="space-y-4">
                {filteredMessages.map(message => <div key={message.id} onClick={() => handleMessageClick(message)} className={`bg-gray-900 rounded-lg p-6 border cursor-pointer transition-all ${!message.read ? 'border-yellow-500 bg-yellow-500/5' : 'border-gray-800 hover:border-gray-700'}`}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center">
                        {getTypeIcon(message.type)}
                        <div className="ml-3">
                          <h3 className="font-bold text-lg">{message.title}</h3>
                          <p className="text-sm text-gray-400">{getTypeLabel(message.type)}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {!message.read && <div className="w-2 h-2 bg-yellow-500 rounded-full" />}
                        <span className="text-sm text-gray-400">{formatTime(message.timestamp)}</span>
                      </div>
                    </div>
                    <p className="text-gray-300 mb-4 line-clamp-2">{message.content}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-1" />
                          {message.sender.name}
                        </div>
                        {message.priority === 'high' && <span className="text-red-400">重要</span>}
                      </div>
                      <div className="flex items-center space-x-2">
                        {message.action && <Button onClick={e => {
                      e.stopPropagation();
                      handleAction(message.action);
                    }} size="sm" className="bg-yellow-500 hover:bg-yellow-600 text-black">
                            查看
                          </Button>}
                        <Button onClick={e => {
                      e.stopPropagation();
                      archiveMessage(message.id);
                    }} variant="ghost" size="sm" className="text-gray-400 hover:text-yellow-500">
                          <Archive className="w-4 h-4" />
                        </Button>
                        <Button onClick={e => {
                      e.stopPropagation();
                      deleteMessage(message.id);
                    }} variant="ghost" size="sm" className="text-gray-400 hover:text-red-500">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>)}
              </div>

              {filteredMessages.length === 0 && <div className="text-center py-12">
                  <Bell className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-xl text-gray-400">暂无消息</p>
                </div>}
            </div>

            {/* Message Detail / Chat */}
            <div className="lg:col-span-1">
              {selectedMessage ? <div className="bg-gray-900 rounded-lg border border-gray-800 sticky top-8">
                  <div className="p-6 border-b border-gray-800">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        {getTypeIcon(selectedMessage.type)}
                        <h3 className="font-bold text-lg ml-3">{selectedMessage.title}</h3>
                      </div>
                      <Button onClick={() => setSelectedMessage(null)} variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="text-sm text-gray-400">
                      {selectedMessage.sender.name} • {formatTime(selectedMessage.timestamp)}
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-300 mb-6">{selectedMessage.content}</p>
                    {selectedMessage.action && <div className="space-y-3">
                        <Button onClick={() => handleAction(selectedMessage.action)} className="w-full bg-yellow-500 hover:bg-yellow-600 text-black">
                          {selectedMessage.action.type === 'navigate' ? '查看详情' : '开始聊天'}
                        </Button>
                      </div>}
                  </div>
                </div> : <div className="bg-gray-900 rounded-lg p-8 border border-gray-800 text-center">
                  <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">选择一条消息</h3>
                  <p className="text-gray-400">点击左侧消息查看详情</p>
                </div>}

              {/* Quick Actions */}
              <div className="mt-6 bg-gray-900 rounded-lg p-6 border border-gray-800">
                <h3 className="font-bold mb-4">快速操作</h3>
                <div className="space-y-3">
                  <Button onClick={() => navigateTo('consultation-chat')} className="w-full bg-yellow-500 hover:bg-yellow-600 text-black">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    在线客服
                  </Button>
                  <Button onClick={() => navigateTo('consultation-form')} variant="outline" className="w-full border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black">
                    <Send className="w-4 h-4 mr-2" />
                    提交咨询
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Modal */}
        {showChat && <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-gray-900 rounded-lg w-full max-w-2xl h-[600px] flex flex-col border border-gray-800">
              <div className="p-4 border-b border-gray-800 flex items-center justify-between">
                <div className="flex items-center">
                  <MessageCircle className="w-5 h-5 text-green-500 mr-2" />
                  <h3 className="font-bold">在线客服</h3>
                </div>
                <Button onClick={() => setShowChat(false)} variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex-1 p-4 overflow-y-auto">
                <div className="space-y-4">
                  {messages.filter(msg => msg.type === 'customer_service' || msg.type === 'user').map(message => <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[70%] ${message.type === 'user' ? 'order-2' : ''}`}>
                        <div className={`rounded-lg px-4 py-2 ${message.type === 'user' ? 'bg-yellow-500 text-black' : 'bg-gray-800 text-white'}`}>
                          {message.content}
                        </div>
                        <div className={`text-xs text-gray-500 mt-1 ${message.type === 'user' ? 'text-right' : ''}`}>
                          {formatTime(message.timestamp)}
                        </div>
                      </div>
                    </div>)}
                </div>
              </div>
              <div className="p-4 border-t border-gray-800">
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-yellow-500">
                    <Paperclip className="w-4 h-4" />
                  </Button>
                  <Input value={chatMessage} onChange={e => setChatMessage(e.target.value)} onKeyPress={e => {
                if (e.key === 'Enter') {
                  sendChatMessage();
                }
              }} placeholder="输入消息..." className="flex-1 bg-gray-800 border-gray-700 focus:border-yellow-500 text-white placeholder-gray-500" />
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-yellow-500">
                    <Smile className="w-4 h-4" />
                  </Button>
                  <Button onClick={sendChatMessage} className="bg-yellow-500 hover:bg-yellow-600 text-black">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>}
      </div>
    </AuthGuard>;
}