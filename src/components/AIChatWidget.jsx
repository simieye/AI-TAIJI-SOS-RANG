// @ts-ignore;
import React, { useState, useEffect, useRef } from 'react';
// @ts-ignore;
import { Button } from '@/components/ui';
// @ts-ignore;
import { MessageCircle, X, Send, Bot, User, Minimize2, Maximize2, Bell, Settings, HeadphonesIcon, ThumbsUp, ThumbsDown, Copy, Mic, Paperclip, Smile } from 'lucide-react';

import { AIChatDialog } from '@/components/AIChatDialog';
import { NotificationSystem } from '@/components/NotificationSystem';
export default function AIChatWidget(props) {
  const {
    $w,
    language = 'zh',
    position = 'bottom-right',
    showNotification = true,
    autoOpen = false,
    welcomeMessage = ''
  } = props;
  const [isOpen, setIsOpen] = useState(autoOpen);
  const [isMinimized, setIsMinimized] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [currentLanguage, setCurrentLanguage] = useState(language);
  const [userProfile, setUserProfile] = useState({
    name: '',
    email: '',
    language: language,
    region: 'cn'
  });
  const [isTyping, setIsTyping] = useState(false);
  const [showNotificationBadge, setShowNotificationBadge] = useState(true);
  const widgetRef = useRef(null);

  // 语言选项
  const languageOptions = [{
    value: 'zh',
    label: '中文',
    flag: '🇨🇳'
  }, {
    value: 'en',
    label: 'English',
    flag: '🇺🇸'
  }, {
    value: 'ja',
    label: '日本語',
    flag: '🇯🇵'
  }, {
    value: 'ko',
    label: '한국어',
    flag: '🇰🇷'
  }];

  // 获取用户信息
  useEffect(() => {
    if ($w && $w.auth && $w.auth.currentUser) {
      const currentUser = $w.auth.currentUser;
      setUserProfile(prev => ({
        ...prev,
        name: currentUser.nickName || currentUser.name || '用户',
        email: currentUser.email || '',
        userId: currentUser.userId || 'anonymous'
      }));
    }
  }, [$w]);

  // 加载通知
  useEffect(() => {
    loadNotifications();

    // 设置定时检查新通知
    const notificationInterval = setInterval(() => {
      checkNewNotifications();
    }, 30000); // 30秒检查一次

    return () => clearInterval(notificationInterval);
  }, []);

  // 监听窗口大小变化
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsMinimized(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 监听页面可见性变化
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && isOpen) {
        setUnreadCount(0);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [isOpen]);
  const loadNotifications = async () => {
    try {
      if ($w) {
        const result = await $w.cloud.callDataSource({
          dataSourceName: 'notifications',
          methodName: 'wedaGetRecordsV2',
          params: {
            filter: {
              where: {
                recipient_id: {
                  $eq: userProfile.userId || 'anonymous'
                },
                read: {
                  $eq: false
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
          setNotifications(result.records);
          setUnreadCount(result.records.length);
        }
      }
    } catch (error) {
      console.error('加载通知失败:', error);
      // 使用模拟数据作为后备
      const mockNotifications = [{
        id: 'notif_001',
        type: 'info',
        title: currentLanguage === 'zh' ? '新消息' : 'New Message',
        message: currentLanguage === 'zh' ? '您有新的客服消息' : 'You have a new customer service message',
        timestamp: new Date(),
        read: false
      }];
      setNotifications(mockNotifications);
      setUnreadCount(mockNotifications.length);
    }
  };
  const checkNewNotifications = async () => {
    try {
      if ($w && !isOpen) {
        const result = await $w.cloud.callDataSource({
          dataSourceName: 'notifications',
          methodName: 'wedaGetRecordsV2',
          params: {
            filter: {
              where: {
                recipient_id: {
                  $eq: userProfile.userId || 'anonymous'
                },
                read: {
                  $eq: false
                },
                created_at: {
                  $gt: new Date(Date.now() - 60000).toISOString() // 最近1分钟
                }
              }
            },
            pageSize: 1
          }
        });
        if (result && result.records && result.records.length > 0) {
          setUnreadCount(prev => prev + result.records.length);
          // 显示浏览器通知
          if (showNotification && Notification.permission === 'granted') {
            new Notification(currentLanguage === 'zh' ? 'AI太极客服' : 'AI Taiji Assistant', {
              body: currentLanguage === 'zh' ? '您有新的消息' : 'You have a new message',
              icon: '/favicon.ico'
            });
          }
        }
      }
    } catch (error) {
      console.error('检查新通知失败:', error);
    }
  };
  const handleOpenChat = () => {
    setIsOpen(true);
    setIsMinimized(false);
    setUnreadCount(0);

    // 标记通知为已读
    markNotificationsAsRead();
  };
  const handleCloseChat = () => {
    setIsOpen(false);
    setIsMinimized(false);
  };
  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
  };
  const handleLanguageChange = newLanguage => {
    setCurrentLanguage(newLanguage);
    setUserProfile(prev => ({
      ...prev,
      language: newLanguage
    }));

    // 保存用户语言偏好
    saveUserLanguagePreference(newLanguage);
  };
  const saveUserLanguagePreference = async language => {
    try {
      if ($w && userProfile.userId) {
        await $w.cloud.callDataSource({
          dataSourceName: 'user_preferences',
          methodName: 'wedaUpdateV2',
          params: {
            data: {
              language: language,
              updated_at: new Date().toISOString()
            },
            filter: {
              where: {
                user_id: {
                  $eq: userProfile.userId
                }
              }
            }
          }
        });
      }
    } catch (error) {
      console.error('保存语言偏好失败:', error);
    }
  };
  const markNotificationsAsRead = async () => {
    try {
      if ($w && notifications.length > 0) {
        const unreadNotifications = notifications.filter(n => !n.read);
        for (const notification of unreadNotifications) {
          await $w.cloud.callDataSource({
            dataSourceName: 'notifications',
            methodName: 'wedaUpdateV2',
            params: {
              data: {
                read: true,
                read_at: new Date().toISOString()
              },
              filter: {
                where: {
                  _id: {
                    $eq: notification._id
                  }
                }
              }
            }
          });
        }
        setNotifications(prev => prev.map(n => ({
          ...n,
          read: true
        })));
      }
    } catch (error) {
      console.error('标记通知为已读失败:', error);
    }
  };
  const getPositionClasses = () => {
    const positions = {
      'bottom-right': 'bottom-4 right-4',
      'bottom-left': 'bottom-4 left-4',
      'top-right': 'top-4 right-4',
      'top-left': 'top-4 left-4'
    };
    return positions[position] || positions['bottom-right'];
  };
  const getWidgetText = () => {
    const texts = {
      zh: {
        chat: '智能客服',
        message: '有什么可以帮助您？',
        typing: '正在输入...',
        online: '在线',
        offline: '离线'
      },
      en: {
        chat: 'Smart Assistant',
        message: 'How can I help you?',
        typing: 'Typing...',
        online: 'Online',
        offline: 'Offline'
      },
      ja: {
        chat: 'スマートアシスタント',
        message: 'どのようにお手伝いできますか？',
        typing: '入力中...',
        online: 'オンライン',
        offline: 'オフライン'
      },
      ko: {
        chat: '스마트 어시스턴트',
        message: '어떻게 도와드릴까요?',
        typing: '입력 중...',
        online: '온라인',
        offline: '오프라인'
      }
    };
    return texts[currentLanguage] || texts.zh;
  };
  const widgetText = getWidgetText();
  if (isOpen && !isMinimized) {
    return <AIChatDialog isOpen={isOpen} onClose={handleCloseChat} language={currentLanguage} initialMessage={welcomeMessage} />;
  }
  return <div ref={widgetRef} className={`fixed ${getPositionClasses()} z-40`}>
      {/* Floating Widget Button */}
      {!isOpen && <div className="relative">
          <Button onClick={handleOpenChat} className="w-14 h-14 rounded-full bg-yellow-500 hover:bg-yellow-600 text-black shadow-lg hover:shadow-xl transition-all duration-300 relative group">
            <MessageCircle className="w-6 h-6" />
            
            {/* Notification Badge */}
            {showNotificationBadge && unreadCount > 0 && <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                {unreadCount > 99 ? '99+' : unreadCount}
              </div>}
            
            {/* Hover Tooltip */}
            <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
              {widgetText.chat}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
            </div>
          </Button>
          
          {/* Quick Actions */}
          <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {/* Language Selector */}
            <div className="bg-gray-800 rounded-lg p-1 shadow-lg">
              {languageOptions.map(lang => <button key={lang.value} onClick={() => handleLanguageChange(lang.value)} className={`flex items-center space-x-2 px-3 py-2 rounded text-sm transition-colors ${currentLanguage === lang.value ? 'bg-yellow-500 text-black' : 'text-gray-300 hover:text-white hover:bg-gray-700'}`}>
                  <span>{lang.flag}</span>
                  <span>{lang.label}</span>
                </button>)}
            </div>
          </div>
        </div>}

      {/* Minimized Widget */}
      {isOpen && isMinimized && <div className="bg-gray-900 rounded-lg border border-gray-800 shadow-lg p-3 min-w-80">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center">
                <Bot className="w-4 h-4 text-black" />
              </div>
              <div>
                <div className="text-sm font-medium text-white">{widgetText.chat}</div>
                <div className="text-xs text-gray-400 flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                  {widgetText.online}
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {/* Notification Badge */}
              {showNotificationBadge && unreadCount > 0 && <div className="bg-red-500 text-white text-xs rounded-full px-2 py-1">
                  {unreadCount}
                </div>}
              
              <Button onClick={handleMinimize} variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                <Maximize2 className="w-4 h-4" />
              </Button>
              
              <Button onClick={handleCloseChat} variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          {/* Quick Reply */}
          <div className="mt-3 pt-3 border-t border-gray-700">
            <div className="text-xs text-gray-400 mb-2">{widgetText.message}</div>
            <div className="flex space-x-2">
              <Button onClick={() => {
            setIsOpen(true);
            setIsMinimized(false);
          }} size="sm" className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black">
                <Send className="w-3 h-3 mr-1" />
                {currentLanguage === 'zh' ? '回复' : 'Reply'}
              </Button>
              <Button onClick={() => {
            setIsOpen(true);
            setIsMinimized(false);
          }} variant="outline" size="sm" className="border-gray-700 text-gray-400">
                <HeadphonesIcon className="w-3 h-3 mr-1" />
                {currentLanguage === 'zh' ? '转人工' : 'Transfer'}
              </Button>
            </div>
          </div>
        </div>}

      {/* Notification System */}
      <NotificationSystem notifications={notifications} />
    </div>;
}