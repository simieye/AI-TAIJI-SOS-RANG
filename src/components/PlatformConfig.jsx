// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Button, Input } from '@/components/ui';
// @ts-ignore;
import { Plus, Edit2, Trash2, Eye, EyeOff, CheckCircle, XCircle, Zap } from 'lucide-react';

export function PlatformConfig({
  platformConfigs,
  platforms,
  onTestPlatform,
  onSaveConfig,
  onDeleteConfig
}) {
  const [editingConfig, setEditingConfig] = useState(null);
  const [showPassword, setShowPassword] = useState({});
  const getPlatformInfo = platformId => {
    return platforms.find(p => p.id === platformId) || platforms[0];
  };
  const handleEditConfig = config => {
    setEditingConfig({
      ...config
    });
  };
  const handleSaveConfig = () => {
    if (editingConfig) {
      onSaveConfig(editingConfig);
      setEditingConfig(null);
    }
  };
  const handleTogglePassword = field => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };
  const maskSecret = secret => {
    return secret ? secret.substring(0, 3) + '***' : '';
  };
  return <div className="space-y-6">
      {platformConfigs.map(config => {
      const platformInfo = getPlatformInfo(config.platform);
      const isEditing = editingConfig && editingConfig.id === config.id;
      return <div key={config.id} className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 ${platformInfo.color} bg-opacity-20`}>
                <platformInfo.icon className={`w-5 h-5 ${platformInfo.color}`} />
              </div>
              <div>
                <h3 className="text-lg font-medium text-white">{config.name}</h3>
                <p className="text-sm text-gray-400">{platformInfo.name}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full mr-2 ${config.isActive ? 'bg-green-500' : 'bg-gray-500'}`}></div>
              <span className="text-sm text-gray-400">{config.isActive ? '启用' : '禁用'}</span>
              
              {!isEditing && <Button onClick={() => handleEditConfig(config)} variant="outline" size="sm" className="border-gray-700 text-gray-400 hover:border-gray-600 hover:text-white">
                  <Edit2 className="w-4 h-4" />
                </Button>}
              
              <Button onClick={() => onTestPlatform(config.id)} size="sm" variant="outline" className="border-gray-700 text-gray-400 hover:border-gray-600 hover:text-white">
                <Zap className="w-4 h-4 mr-2" />
                测试
              </Button>
            </div>
          </div>

          {isEditing ? <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">App ID</label>
                  <Input value={editingConfig.config.appId} onChange={e => setEditingConfig({
                ...editingConfig,
                config: {
                  ...editingConfig.config,
                  appId: e.target.value
                }
              })} className="bg-gray-900 border-gray-700" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">App Secret</label>
                  <div className="relative">
                    <Input type={showPassword.appSecret ? 'text' : 'password'} value={editingConfig.config.appSecret} onChange={e => setEditingConfig({
                  ...editingConfig,
                  config: {
                    ...editingConfig.config,
                    appSecret: e.target.value
                  }
                })} className="bg-gray-900 border-gray-700 pr-10" />
                    <button onClick={() => handleTogglePassword('appSecret')} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white">
                      {showPassword.appSecret ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Access Token</label>
                  <div className="relative">
                    <Input type={showPassword.accessToken ? 'text' : 'password'} value={editingConfig.config.accessToken} onChange={e => setEditingConfig({
                  ...editingConfig,
                  config: {
                    ...editingConfig.config,
                    accessToken: e.target.value
                  }
                })} className="bg-gray-900 border-gray-700 pr-10" />
                    <button onClick={() => handleTogglePassword('accessToken')} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white">
                      {showPassword.accessToken ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">API URL</label>
                  <Input value={editingConfig.config.apiUrl} onChange={e => setEditingConfig({
                ...editingConfig,
                config: {
                  ...editingConfig.config,
                  apiUrl: e.target.value
                }
              })} className="bg-gray-900 border-gray-700" />
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input type="checkbox" checked={editingConfig.isActive} onChange={e => setEditingConfig({
                ...editingConfig,
                isActive: e.target.checked
              })} className="mr-2" />
                  <span className="text-sm text-gray-300">启用此平台</span>
                </label>
              </div>
              
              <div className="flex space-x-3">
                <Button onClick={() => setEditingConfig(null)} variant="outline" className="border-gray-700 text-gray-400 hover:border-gray-600 hover:text-white">
                  取消
                </Button>
                <Button onClick={handleSaveConfig} className="bg-yellow-500 hover:bg-yellow-600 text-black">
                  保存配置
                </Button>
              </div>
            </div> : <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">App ID:</span>
                  <span className="ml-2 text-white font-mono">{config.config.appId}</span>
                </div>
                <div>
                  <span className="text-gray-400">App Secret:</span>
                  <span className="ml-2 text-white font-mono">{maskSecret(config.config.appSecret)}</span>
                </div>
                <div>
                  <span className="text-gray-400">Access Token:</span>
                  <span className="ml-2 text-white font-mono">{maskSecret(config.config.accessToken)}</span>
                </div>
                <div>
                  <span className="text-gray-400">API URL:</span>
                  <span className="ml-2 text-white font-mono text-xs">{config.config.apiUrl}</span>
                </div>
              </div>
              
              <div>
                <span className="text-gray-400 text-sm">功能:</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {config.features.map((feature, index) => <span key={index} className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded">
                      {feature}
                    </span>)}
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                <div className="text-xs text-gray-400">
                  最后测试: {new Date(config.lastTest).toLocaleString('zh-CN')}
                </div>
                <div className="flex items-center">
                  {config.testStatus === 'success' ? <CheckCircle className="w-4 h-4 text-green-500 mr-2" /> : <XCircle className="w-4 h-4 text-red-500 mr-2" />}
                  <span className="text-xs text-gray-400">{config.testStatus === 'success' ? '连接正常' : '连接失败'}</span>
                </div>
              </div>
            </div>}
        </div>;
    })}
      
      <div className="text-center">
        <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">
          <Plus className="w-4 h-4 mr-2" />
          添加平台配置
        </Button>
      </div>
    </div>;
}