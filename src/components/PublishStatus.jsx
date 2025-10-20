// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Button } from '@/components/ui';
// @ts-ignore;
import { CheckCircle, XCircle, AlertCircle, Clock, Zap, RefreshCw, Pause } from 'lucide-react';

export function PublishStatus({
  publishStatus,
  onTestPlatform,
  onRefresh
}) {
  const getStatusIcon = status => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'inactive':
        return <Pause className="w-5 h-5 text-yellow-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-500" />;
    }
  };
  const getStatusText = status => {
    switch (status) {
      case 'active':
        return '正常';
      case 'error':
        return '错误';
      case 'inactive':
        return '未激活';
      default:
        return '未知';
    }
  };
  const formatDate = dateString => {
    return new Date(dateString).toLocaleString('zh-CN');
  };
  return <div className="space-y-4">
      {publishStatus.map(status => <div key={status.platform} className="bg-gray-800 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              {getStatusIcon(status.status)}
              <span className="ml-3 font-medium text-white">{status.platform}</span>
              <span className="ml-2 text-sm text-gray-400">({getStatusText(status.status)})</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button onClick={() => onTestPlatform(status.platform)} size="sm" variant="outline" className="border-gray-700 text-gray-400 hover:border-gray-600 hover:text-white">
                <Zap className="w-4 h-4 mr-2" />
                测试
              </Button>
              <Button onClick={onRefresh} size="sm" variant="outline" className="border-gray-700 text-gray-400 hover:border-gray-600 hover:text-white">
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-gray-400">总发布:</span>
              <span className="ml-2 text-white font-medium">{status.totalPosts}</span>
            </div>
            <div>
              <span className="text-gray-400">计划中:</span>
              <span className="ml-2 text-blue-400 font-medium">{status.scheduledPosts}</span>
            </div>
            <div>
              <span className="text-gray-400">失败:</span>
              <span className="ml-2 text-red-400 font-medium">{status.failedPosts}</span>
            </div>
            <div>
              <span className="text-gray-400">平均互动:</span>
              <span className="ml-2 text-green-400 font-medium">{status.avgEngagement}</span>
            </div>
          </div>
          
          <div className="mt-3 text-xs text-gray-400">
            最后同步: {formatDate(status.lastSync)}
          </div>
        </div>)}
    </div>;
}