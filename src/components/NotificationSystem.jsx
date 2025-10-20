// @ts-ignore;
import React, { useState, useEffect, createContext, useContext } from 'react';
// @ts-ignore;
import { Bell, X, CheckCircle, MessageCircle, Settings, Package, Star } from 'lucide-react';

// 创建通知上下文
const NotificationContext = createContext();
export const useNotifications = () => useContext(NotificationContext);
export const NotificationProvider = props => {
  const {
    children
  } = props;
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotificationPanel, setShowNotificationPanel] = useState(false);
  useEffect(() => {
    // 初始化通知
    initializeNotifications();
    // 模拟实时通知
    const interval = setInterval(() => {
      simulateNotification();
    }, 45000); // 每45秒模拟一个通知
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    // 更新未读数量
    const unread = notifications.filter(n => !n.read).length;
    setUnreadCount(unread);
  }, [notifications]);
  const initializeNotifications = () => {
    const initialNotifications = [{
      id: 1,
      type: 'system',
      title: '欢迎来到AI太极',
      content: '感谢您注册AI太极账户，开始您的智能健康之旅',
      timestamp: Date.now() - 1000 * 60 * 5,
      read: false,
      priority: 'normal'
    }];
    setNotifications(initialNotifications);
  };
  const simulateNotification = () => {
    const types = ['system', 'customer_service', 'order', 'promotion'];
    const type = types[Math.floor(Math.random() * types.length)];
    const notificationData = {
      system: {
        title: '系统更新',
        content: 'AI太极系统已更新到最新版本，新增多项功能',
        icon: Settings
      },
      customer_service: {
        title: '客服消息',
        content: '您有一条新的客服回复，请及时查看',
        icon: MessageCircle
      },
      order: {
        title: '订单状态',
        content: '您的订单状态已更新，点击查看详情',
        icon: Package
      },
      promotion: {
        title: '限时优惠',
        content: 'AI太极产品限时优惠中，立减100美元',
        icon: Star
      }
    };
    const data = notificationData[type];
    const newNotification = {
      id: Date.now(),
      type,
      title: data.title,
      content: data.content,
      timestamp: Date.now(),
      read: false,
      priority: Math.random() > 0.7 ? 'high' : 'normal',
      icon: data.icon
    };
    addNotification(newNotification);
  };
  const addNotification = notification => {
    setNotifications(prev => [notification, ...prev]);
    // 显示浏览器通知
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(notification.title, {
        body: notification.content,
        icon: '/favicon.ico'
      });
    }
  };
  const markAsRead = notificationId => {
    setNotifications(prev => prev.map(n => n.id === notificationId ? {
      ...n,
      read: true
    } : n));
  };
  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({
      ...n,
      read: true
    })));
  };
  const removeNotification = notificationId => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  };
  const clearAll = () => {
    setNotifications([]);
  };
  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }
    return false;
  };
  useEffect(() => {
    // 请求通知权限
    requestNotificationPermission();
  }, []);
  const value = {
    notifications,
    unreadCount,
    showNotificationPanel,
    setShowNotificationPanel,
    addNotification,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAll
  };
  return <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>;
};

// 通知组件
export const NotificationBell = props => {
  const {
    $w
  } = props;
  const {
    notifications,
    unreadCount,
    showNotificationPanel,
    setShowNotificationPanel,
    markAsRead,
    markAllAsRead,
    removeNotification
  } = useNotifications();
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
  const handleNotificationClick = notification => {
    markAsRead(notification.id);
    // 根据通知类型跳转到相应页面
    switch (notification.type) {
      case 'customer_service':
        $w.utils.navigateTo({
          pageId: 'consultation-chat',
          params: {}
        });
        break;
      case 'order':
        $w.utils.navigateTo({
          pageId: 'profile',
          params: {}
        });
        break;
      case 'system':
        $w.utils.navigateTo({
          pageId: 'notifications',
          params: {}
        });
        break;
      default:
        $w.utils.navigateTo({
          pageId: 'notifications',
          params: {}
        });
    }
    setShowNotificationPanel(false);
  };
  return <div className="relative">
      {/* 通知铃铛 */}
      <button onClick={() => setShowNotificationPanel(!showNotificationPanel)} className="relative p-2 text-gray-300 hover:text-yellow-500 transition-colors">
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>}
      </button>

      {/* 通知面板 */}
      {showNotificationPanel && <div className="absolute right-0 mt-2 w-80 bg-gray-900 border border-gray-800 rounded-lg shadow-lg z-50">
          <div className="p-4 border-b border-gray-800 flex items-center justify-between">
            <h3 className="font-bold">通知</h3>
            <div className="flex items-center space-x-2">
              {unreadCount > 0 && <button onClick={markAllAsRead} className="text-sm text-yellow-500 hover:text-yellow-400">
                  全部已读
                </button>}
              <button onClick={() => setShowNotificationPanel(false)} className="text-gray-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? <div className="p-8 text-center text-gray-400">
                <Bell className="w-8 h-8 mx-auto mb-2" />
                <p>暂无通知</p>
              </div> : <div className="divide-y divide-gray-800">
                {notifications.slice(0, 10).map(notification => {
            const Icon = notification.icon || Bell;
            return <div key={notification.id} onClick={() => handleNotificationClick(notification)} className={`p-4 hover:bg-gray-800 cursor-pointer transition-colors ${!notification.read ? 'bg-yellow-500/10' : ''}`}>
                    <div className="flex items-start">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${!notification.read ? 'bg-yellow-500 text-black' : 'bg-gray-700 text-gray-300'}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium text-sm truncate">{notification.title}</h4>
                          {!notification.read && <div className="w-2 h-2 bg-yellow-500 rounded-full" />}
                        </div>
                        <p className="text-xs text-gray-400 mb-1 line-clamp-2">{notification.content}</p>
                        <p className="text-xs text-gray-500">{formatTime(notification.timestamp)}</p>
                      </div>
                      <button onClick={e => {
                  e.stopPropagation();
                  removeNotification(notification.id);
                }} className="ml-2 text-gray-400 hover:text-red-500">
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  </div>;
          })}
              </div>}
          </div>
          
          {notifications.length > 0 && <div className="p-4 border-t border-gray-800">
              <button onClick={() => {
          $w.utils.navigateTo({
            pageId: 'notifications',
            params: {}
          });
          setShowNotificationPanel(false);
        }} className="w-full text-center text-sm text-yellow-500 hover:text-yellow-400">
                查看全部通知
              </button>
            </div>}
        </div>}
    </div>;
};

// Toast 通知组件
export const ToastNotification = props => {
  const {
    notification,
    onClose
  } = props;
  const [isVisible, setIsVisible] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, 5000); // 5秒后自动消失
    return () => clearTimeout(timer);
  }, [onClose]);
  const getIcon = type => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <X className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <Bell className="w-5 h-5 text-yellow-500" />;
      default:
        return <MessageCircle className="w-5 h-5 text-blue-500" />;
    }
  };
  return <div className={`fixed top-4 right-4 bg-gray-900 border border-gray-800 rounded-lg shadow-lg p-4 min-w-[300px] z-50 transition-all transform ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
      <div className="flex items-start">
        <div className="mr-3">
          {getIcon(notification.type)}
        </div>
        <div className="flex-1">
          <h4 className="font-medium text-sm mb-1">{notification.title}</h4>
          <p className="text-xs text-gray-400">{notification.content}</p>
        </div>
        <button onClick={() => {
        setIsVisible(false);
        setTimeout(onClose, 300);
      }} className="ml-3 text-gray-400 hover:text-white">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>;
};

// Toast 容器组件
export const ToastContainer = () => {
  const [toasts, setToasts] = useState([]);
  const addToast = notification => {
    const id = Date.now();
    setToasts(prev => [...prev, {
      ...notification,
      id
    }]);
  };
  const removeToast = id => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };
  // 暴露添加toast的方法到全局
  useEffect(() => {
    window.showToast = addToast;
  }, []);
  return <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map(toast => <ToastNotification key={toast.id} notification={toast} onClose={() => removeToast(toast.id)} />)}
    </div>;
};