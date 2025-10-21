// @ts-ignore;
import React, { useState, useEffect, useRef } from 'react';
// @ts-ignore;
import { Button } from '@/components/ui';
// @ts-ignore;
import { X, Bell, CheckCircle, AlertCircle, Info, AlertTriangle, Zap, MessageSquare, User, Settings, ChevronDown, ChevronUp, ExternalLink, Copy, Trash2 } from 'lucide-react';

// 单个通知组件
function NotificationItem({
  notification,
  onDismiss,
  onMarkAsRead,
  onCopy,
  onDelete,
  allowDismiss
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const notificationRef = useRef(null);

  // 通知类型配置
  const notificationTypes = {
    info: {
      icon: <Info className="w-5 h-5" />,
      bgColor: 'bg-blue-500',
      borderColor: 'border-blue-500',
      titleColor: 'text-blue-500'
    },
    success: {
      icon: <CheckCircle className="w-5 h-5" />,
      bgColor: 'bg-green-500',
      borderColor: 'border-green-500',
      titleColor: 'text-green-500'
    },
    warning: {
      icon: <AlertTriangle className="w-5 h-5" />,
      bgColor: 'bg-yellow-500',
      borderColor: 'border-yellow-500',
      titleColor: 'text-yellow-500'
    },
    error: {
      icon: <AlertCircle className="w-5 h-5" />,
      bgColor: 'bg-red-500',
      borderColor: 'border-red-500',
      titleColor: 'text-red-500'
    },
    message: {
      icon: <MessageSquare className="w-5 h-5" />,
      bgColor: 'bg-purple-500',
      borderColor: 'border-purple-500',
      titleColor: 'text-purple-500'
    },
    system: {
      icon: <Settings className="w-5 h-5" />,
      bgColor: 'bg-gray-500',
      borderColor: 'border-gray-500',
      titleColor: 'text-gray-500'
    }
  };
  const config = notificationTypes[notification.type] || notificationTypes.info;

  // 格式化时间
  const formatTime = timestamp => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    if (diff < 60000) {
      return '刚刚';
    } else if (diff < 3600000) {
      return `${Math.floor(diff / 60000)}分钟前`;
    } else if (diff < 86400000) {
      return `${Math.floor(diff / 3600000)}小时前`;
    } else {
      return date.toLocaleDateString('zh-CN');
    }
  };
  return <div ref={notificationRef} className={`bg-gray-900 border ${config.borderColor} rounded-lg shadow-lg p-4 mb-3 transform transition-all duration-300 hover:scale-105 ${notification.read ? 'opacity-75' : ''}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          <div className={`p-2 rounded-full ${config.bgColor} bg-opacity-20`}>
            <div className={config.titleColor}>
              {config.icon}
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h4 className={`text-sm font-medium ${notification.read ? 'text-gray-400' : 'text-white'}`}>
                {notification.title}
              </h4>
              <span className="text-xs text-gray-500">
                {formatTime(notification.timestamp)}
              </span>
            </div>
            
            <p className={`text-sm ${notification.read ? 'text-gray-500' : 'text-gray-300'} mb-2`}>
              {notification.message}
            </p>
            
            {notification.actions && notification.actions.length > 0 && <div className="flex flex-wrap gap-2 mb-2">
                {notification.actions.map((action, index) => <Button key={index} onClick={action.onClick} variant="outline" size="sm" className="border-gray-700 text-gray-400 text-xs">
                    {action.label}
                  </Button>)}
              </div>}
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {!notification.read && <button onClick={() => onMarkAsRead(notification.id)} className="text-xs text-blue-500 hover:text-blue-400">
                    标为已读
                  </button>}
                <button onClick={() => onCopy(notification)} className="text-xs text-gray-500 hover:text-gray-400">
                  复制
                </button>
                {notification.link && <a href={notification.link} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-500 hover:text-blue-400 flex items-center">
                    查看详情
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </a>}
              </div>
              
              <div className="flex items-center space-x-1">
                {notification.message && notification.message.length > 100 && <button onClick={() => setIsExpanded(!isExpanded)} className="text-xs text-gray-500 hover:text-gray-400">
                    {isExpanded ? '收起' : '展开'}
                  </button>}
                {allowDismiss && <button onClick={() => onDismiss(notification.id)} className="text-xs text-gray-500 hover:text-red-400">
                  关闭
                </button>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
}

// 通知容器组件
function NotificationContainer({
  notifications,
  position,
  maxVisible,
  allowDismiss,
  onDismiss,
  onMarkAsRead,
  onCopy,
  onDelete
}) {
  const [expanded, setExpanded] = useState(false);
  const getPositionClasses = () => {
    const positions = {
      'top-right': 'top-4 right-4',
      'top-left': 'top-4 left-4',
      'bottom-right': 'bottom-4 right-4',
      'bottom-left': 'bottom-4 left-4',
      'top-center': 'top-4 left-1/2 transform -translate-x-1/2',
      'bottom-center': 'bottom-4 left-1/2 transform -translate-x-1/2'
    };
    return positions[position] || positions['top-right'];
  };
  const visibleNotifications = expanded ? notifications : notifications.slice(0, maxVisible);
  const unreadCount = notifications.filter(n => !n.read).length;
  return <div className={`fixed ${getPositionClasses()} z-50 w-96 max-w-[90vw]`}>
      {/* 通知列表 */}
      <div className="space-y-2">
        {visibleNotifications.map(notification => <NotificationItem key={notification.id} notification={notification} onDismiss={onDismiss} onMarkAsRead={onMarkAsRead} onCopy={onCopy} onDelete={onDelete} allowDismiss={allowDismiss} />)}
      </div>
      
      {/* 展开/收起按钮 */}
      {notifications.length > maxVisible && <div className="mt-2 text-center">
          <Button onClick={() => setExpanded(!expanded)} variant="outline" size="sm" className="border-gray-700 text-gray-400">
            {expanded ? <ChevronUp className="w-4 h-4 mr-1" /> : <ChevronDown className="w-4 h-4 mr-1" />}
            {expanded ? '收起' : `查看更多 (${notifications.length - maxVisible})`}
          </Button>
        </div>}
      
      {/* 批量操作 */}
      {notifications.length > 1 && <div className="mt-3 pt-3 border-t border-gray-700 flex justify-between items-center">
          <div className="text-sm text-gray-400">
            {unreadCount > 0 && `${unreadCount} 条未读`}
          </div>
          <div className="flex space-x-2">
            {unreadCount > 0 && <Button onClick={() => notifications.forEach(n => !n.read && onMarkAsRead(n.id))} variant="outline" size="sm" className="border-gray-700 text-gray-400">
                全部已读
              </Button>}
            <Button onClick={() => notifications.forEach(n => onDismiss(n.id))} variant="outline" size="sm" className="border-gray-700 text-gray-400">
              清除全部
            </Button>
          </div>
        </div>}
    </div>;
}
export default function NotificationSystem(props) {
  const {
    notifications = [],
    maxVisible = 5,
    autoHideDelay = 5000,
    position = 'top-right',
    showSound = true,
    allowDismiss = true
  } = props;
  const [visibleNotifications, setVisibleNotifications] = useState([]);
  const [soundEnabled, setSoundEnabled] = useState(showSound);
  const audioRef = useRef(null);

  // 初始化音频
  useEffect(() => {
    if (typeof window !== 'undefined' && soundEnabled) {
      audioRef.current = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT');
      audioRef.current.volume = 0.3;
    }
  }, [soundEnabled]);

  // 监听通知变化
  useEffect(() => {
    if (notifications && notifications.length > 0) {
      const newNotifications = notifications.filter(notification => !visibleNotifications.find(visible => visible.id === notification.id));
      if (newNotifications.length > 0) {
        addNotifications(newNotifications);
      }
    }
  }, [notifications]);

  // 添加通知
  const addNotifications = newNotifications => {
    const updatedNotifications = [...visibleNotifications];
    newNotifications.forEach(notification => {
      // 限制最大显示数量
      if (updatedNotifications.length >= maxVisible) {
        const oldestNotification = updatedNotifications.shift();
        removeNotification(oldestNotification.id);
      }
      updatedNotifications.push({
        ...notification,
        id: notification.id || Date.now() + Math.random(),
        timestamp: notification.timestamp || new Date(),
        type: notification.type || 'info',
        read: notification.read || false,
        autoHide: notification.autoHide !== false
      });

      // 播放声音
      if (soundEnabled && audioRef.current) {
        audioRef.current.play().catch(e => console.log('Audio play failed:', e));
      }
    });
    setVisibleNotifications(updatedNotifications);

    // 自动隐藏
    newNotifications.forEach(notification => {
      if (notification.autoHide !== false) {
        setTimeout(() => {
          removeNotification(notification.id);
        }, notification.autoHideDelay || autoHideDelay);
      }
    });
  };

  // 移除通知
  const removeNotification = id => {
    setVisibleNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  // 标记为已读
  const markAsRead = async id => {
    try {
      // 更新本地状态
      setVisibleNotifications(prev => prev.map(notification => notification.id === id ? {
        ...notification,
        read: true
      } : notification));

      // 如果有云开发实例，同步到数据库
      if (typeof window !== 'undefined' && window.$w) {
        await window.$w.cloud.callDataSource({
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
                  $eq: id
                }
              }
            }
          }
        });
      }
    } catch (error) {
      console.error('标记通知为已读失败:', error);
    }
  };

  // 复制通知内容
  const copyNotification = notification => {
    const text = `${notification.title}\n${notification.message}`;
    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        // 显示复制成功提示
        addNotifications([{
          type: 'success',
          title: '复制成功',
          message: '通知内容已复制到剪贴板',
          autoHide: true,
          autoHideDelay: 2000
        }]);
      });
    }
  };

  // 删除通知
  const deleteNotification = async id => {
    try {
      removeNotification(id);

      // 如果有云开发实例，从数据库删除
      if (typeof window !== 'undefined' && window.$w) {
        await window.$w.cloud.callDataSource({
          dataSourceName: 'notifications',
          methodName: 'wedaDeleteV2',
          params: {
            filter: {
              where: {
                _id: {
                  $eq: id
                }
              }
            }
          }
        });
      }
    } catch (error) {
      console.error('删除通知失败:', error);
    }
  };
  if (visibleNotifications.length === 0) {
    return null;
  }
  return <NotificationContainer notifications={visibleNotifications} position={position} maxVisible={maxVisible} allowDismiss={allowDismiss} onDismiss={removeNotification} onMarkAsRead={markAsRead} onCopy={copyNotification} onDelete={deleteNotification} />;
}