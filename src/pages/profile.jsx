// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button } from '@/components/ui';
// @ts-ignore;
import { User, Mail, Phone, Calendar, MapPin, Download, History, FileText, Clock, Globe, CheckCircle, ExternalLink, Trash2, RefreshCw, Filter, Search, X } from 'lucide-react';

import { Navigation } from '@/components/Navigation';
export default function Profile(props) {
  const {
    $w
  } = props;
  const [activeTab, setActiveTab] = useState('personal');
  const [downloadHistory, setDownloadHistory] = useState([]);
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLanguage, setFilterLanguage] = useState('all');
  const [filterVersion, setFilterVersion] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const currentUser = $w.auth.currentUser;

  // 语言选项
  const languages = [{
    code: 'zh',
    name: '中文',
    flag: '🇨🇳'
  }, {
    code: 'en',
    name: 'English',
    flag: '🇺🇸'
  }];

  // 版本选项
  const versions = [{
    id: 'v1.0',
    name: 'v1.0',
    date: '2025-01-15'
  }, {
    id: 'v0.9',
    name: 'v0.9',
    date: '2024-12-01'
  }];

  // 模拟下载历史数据
  const mockDownloadHistory = [{
    id: '1',
    fileName: 'AI太极_SOS_RING_产品白皮书_zh_v1.0.txt',
    title: 'AI太极·SOS RING 智能戒指产品白皮书',
    language: 'zh',
    version: 'v1.0',
    downloadTime: '2025-01-20T10:30:00Z',
    fileSize: '2.5MB',
    downloadCount: 1,
    status: 'completed'
  }, {
    id: '2',
    fileName: 'AI太极_SOS_RING_产品白皮书_en_v1.0.txt',
    title: 'AI Taiji·SOS RING Smart Ring Whitepaper',
    language: 'en',
    version: 'v1.0',
    downloadTime: '2025-01-20T10:35:00Z',
    fileSize: '2.3MB',
    downloadCount: 1,
    status: 'completed'
  }, {
    id: '3',
    fileName: 'AI太极_SOS_RING_产品白皮书_zh_v0.9.txt',
    title: 'AI太极·SOS RING 智能戒指产品白皮书',
    language: 'zh',
    version: 'v0.9',
    downloadTime: '2025-01-18T14:20:00Z',
    fileSize: '2.4MB',
    downloadCount: 2,
    status: 'completed'
  }, {
    id: '4',
    fileName: 'AI太极_SOS_RING_产品白皮书_en_v0.9.txt',
    title: 'AI Taiji·SOS RING Smart Ring Whitepaper',
    language: 'en',
    version: 'v0.9',
    downloadTime: '2025-01-18T14:25:00Z',
    fileSize: '2.2MB',
    downloadCount: 1,
    status: 'completed'
  }, {
    id: '5',
    fileName: 'AI太极_SOS_RING_产品白皮书_zh_v1.0.txt',
    title: 'AI太极·SOS RING 智能戒指产品白皮书',
    language: 'zh',
    version: 'v1.0',
    downloadTime: '2025-01-15T09:15:00Z',
    fileSize: '2.5MB',
    downloadCount: 3,
    status: 'completed'
  }];
  useEffect(() => {
    loadDownloadHistory();
  }, []);
  useEffect(() => {
    filterAndSortHistory();
  }, [downloadHistory, searchTerm, filterLanguage, filterVersion, sortBy]);
  const loadDownloadHistory = async () => {
    setIsLoading(true);
    try {
      // 从数据库加载下载历史
      if (currentUser) {
        try {
          const result = await $w.cloud.callDataSource({
            dataSourceName: 'partner_info',
            methodName: 'wedaGetRecordsV2',
            params: {
              filter: {
                where: {
                  $and: [{
                    cooperation_type: {
                      $in: ['技术白皮书', '批量下载']
                    }
                  }, {
                    email: {
                      $eq: currentUser.email || ''
                    }
                  }]
                }
              },
              orderBy: [{
                created_at: 'desc'
              }],
              pageSize: 50
            }
          });
          if (result && result.records) {
            const history = result.records.map(record => ({
              id: record._id,
              fileName: `AI太极_SOS_RING_产品白皮书_${record.message.includes('zh') ? 'zh' : 'en'}_${record.message.includes('v1.0') ? 'v1.0' : 'v0.9'}.txt`,
              title: record.message.includes('en') ? 'AI Taiji·SOS RING Smart Ring Whitepaper' : 'AI太极·SOS RING 智能戒指产品白皮书',
              language: record.message.includes('zh') ? 'zh' : 'en',
              version: record.message.includes('v1.0') ? 'v1.0' : 'v0.9',
              downloadTime: record.created_at,
              fileSize: '2.5MB',
              downloadCount: 1,
              status: 'completed'
            }));
            setDownloadHistory(history);
          } else {
            // 使用模拟数据
            setDownloadHistory(mockDownloadHistory);
          }
        } catch (error) {
          console.error('加载下载历史失败:', error);
          // 使用模拟数据
          setDownloadHistory(mockDownloadHistory);
        }
      }
    } catch (error) {
      console.error('加载下载历史失败:', error);
    } finally {
      setIsLoading(false);
    }
  };
  const filterAndSortHistory = () => {
    let filtered = [...downloadHistory];

    // 搜索过滤
    if (searchTerm) {
      filtered = filtered.filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase()) || item.fileName.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    // 语言过滤
    if (filterLanguage !== 'all') {
      filtered = filtered.filter(item => item.language === filterLanguage);
    }

    // 版本过滤
    if (filterVersion !== 'all') {
      filtered = filtered.filter(item => item.version === filterVersion);
    }

    // 排序
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.downloadTime) - new Date(a.downloadTime);
        case 'name':
          return a.title.localeCompare(b.title);
        case 'language':
          return a.language.localeCompare(b.language);
        case 'version':
          return b.version.localeCompare(a.version);
        default:
          return 0;
      }
    });
    setFilteredHistory(filtered);
  };
  const handleRedownload = item => {
    // 重新下载文件
    const link = document.createElement('a');
    link.href = '#';
    link.download = item.fileName;
    link.click();

    // 更新下载次数
    setDownloadHistory(prev => prev.map(h => h.id === item.id ? {
      ...h,
      downloadCount: h.downloadCount + 1
    } : h));
  };
  const handleDeleteItem = async item => {
    setSelectedItem(item);
    setShowDeleteConfirm(true);
  };
  const confirmDelete = async () => {
    if (!selectedItem) return;
    try {
      // 从数据库删除记录
      if (currentUser) {
        await $w.cloud.callDataSource({
          dataSourceName: 'partner_info',
          methodName: 'wedaDeleteV2',
          params: {
            filter: {
              where: {
                _id: {
                  $eq: selectedItem.id
                }
              }
            }
          }
        });
      }

      // 从本地状态删除
      setDownloadHistory(prev => prev.filter(item => item.id !== selectedItem.id));
      setShowDeleteConfirm(false);
      setSelectedItem(null);
    } catch (error) {
      console.error('删除记录失败:', error);
    }
  };
  const handleClearAll = async () => {
    if (!currentUser) return;
    try {
      // 删除所有白皮书下载记录
      await $w.cloud.callDataSource({
        dataSourceName: 'partner_info',
        methodName: 'wedaBatchDeleteV2',
        params: {
          filter: {
            where: {
              $and: [{
                cooperation_type: {
                  $in: ['技术白皮书', '批量下载']
                }
              }, {
                email: {
                  $eq: currentUser.email || ''
                }
              }]
            }
          }
        }
      });

      // 清空本地状态
      setDownloadHistory([]);
      setShowDeleteConfirm(false);
      setSelectedItem(null);
    } catch (error) {
      console.error('清空历史记录失败:', error);
    }
  };
  const formatDate = dateString => {
    const date = new Date(dateString);
    return date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  const getLanguageInfo = code => {
    return languages.find(lang => lang.code === code) || languages[0];
  };
  const getVersionInfo = id => {
    return versions.find(v => v.id === id) || versions[0];
  };
  if (!currentUser) {
    return <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">请先登录</h1>
          <Button onClick={() => $w.utils.navigateTo({
          pageId: 'login',
          params: {}
        })} className="bg-yellow-500 hover:bg-yellow-600 text-black">
            前往登录
          </Button>
        </div>
      </div>;
  }
  return <div className="min-h-screen bg-black text-white">
      <Navigation currentPage="profile" $w={$w} />

      <div className="max-w-7xl mx-auto px-8 py-12">
        <h1 className="text-4xl font-bold mb-8 text-yellow-500">个人中心</h1>

        {/* Tab Navigation */}
        <div className="flex space-x-8 mb-8 border-b border-gray-800">
          <button onClick={() => setActiveTab('personal')} className={`pb-4 px-2 font-medium transition-colors ${activeTab === 'personal' ? 'text-yellow-500 border-b-2 border-yellow-500' : 'text-gray-400 hover:text-white'}`}>
            个人信息
          </button>
          <button onClick={() => setActiveTab('downloads')} className={`pb-4 px-2 font-medium transition-colors ${activeTab === 'downloads' ? 'text-yellow-500 border-b-2 border-yellow-500' : 'text-gray-400 hover:text-white'}`}>
            下载历史
          </button>
        </div>

        {/* Personal Information Tab */}
        {activeTab === 'personal' && <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                <div className="text-center">
                  <div className="w-24 h-24 bg-yellow-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <User className="w-12 h-12 text-black" />
                  </div>
                  <h2 className="text-xl font-bold mb-2">{currentUser.nickName || currentUser.name || '用户'}</h2>
                  <p className="text-gray-400">{currentUser.email}</p>
                </div>
              </div>
            </div>

            <div className="md:col-span-2">
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                <h3 className="text-xl font-bold mb-6">基本信息</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <User className="w-5 h-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-400">姓名</p>
                      <p className="font-medium">{currentUser.nickName || currentUser.name || '未设置'}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-400">邮箱</p>
                      <p className="font-medium">{currentUser.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-400">注册时间</p>
                      <p className="font-medium">2025-01-01</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>}

        {/* Download History Tab */}
        {activeTab === 'downloads' && <div>
            <div className="bg-gray-900 rounded-lg border border-gray-800">
              {/* Header */}
              <div className="p-6 border-b border-gray-800">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold flex items-center">
                    <History className="w-6 h-6 text-yellow-500 mr-2" />
                    下载历史记录
                  </h3>
                  <div className="flex items-center space-x-3">
                    <Button onClick={loadDownloadHistory} variant="outline" size="sm" className="border-gray-700 text-gray-400 hover:border-gray-600 hover:text-white">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      刷新
                    </Button>
                    {downloadHistory.length > 0 && <Button onClick={() => {
                  setSelectedItem('all');
                  setShowDeleteConfirm(true);
                }} variant="outline" size="sm" className="border-red-500 text-red-500 hover:border-red-400 hover:text-red-400">
                      <Trash2 className="w-4 h-4 mr-2" />
                      清空历史
                    </Button>}
                  </div>
                </div>

                {/* Filters */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="relative">
                    <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="搜索文件名或标题..." className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500" />
                  </div>
                  
                  <select value={filterLanguage} onChange={e => setFilterLanguage(e.target.value)} className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-yellow-500">
                    <option value="all">所有语言</option>
                    {languages.map(lang => <option key={lang.code} value={lang.code}>
                        {lang.flag} {lang.name}
                      </option>)}
                  </select>
                  
                  <select value={filterVersion} onChange={e => setFilterVersion(e.target.value)} className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-yellow-500">
                    <option value="all">所有版本</option>
                    {versions.map(version => <option key={version.id} value={version.id}>
                        {version.name}
                      </option>)}
                  </select>
                  
                  <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-yellow-500">
                    <option value="date">按日期排序</option>
                    <option value="name">按名称排序</option>
                    <option value="language">按语言排序</option>
                    <option value="version">按版本排序</option>
                  </select>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {isLoading ? <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500"></div>
                    <span className="ml-3 text-gray-400">加载中...</span>
                  </div> : filteredHistory.length === 0 ? <div className="text-center py-12">
                    <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <h4 className="text-lg font-medium text-gray-400 mb-2">暂无下载记录</h4>
                    <p className="text-gray-500 mb-6">您还没有下载过任何白皮书</p>
                    <Button onClick={() => $w.utils.navigateTo({
                pageId: 'product',
                params: {}
              })} className="bg-yellow-500 hover:bg-yellow-600 text-black">
                      前往下载
                    </Button>
                  </div> : <div className="space-y-4">
                    {filteredHistory.map(item => {
                const langInfo = getLanguageInfo(item.language);
                const versionInfo = getVersionInfo(item.version);
                return <div key={item.id} className="bg-gray-800 rounded-lg p-4 hover:bg-gray-750 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                              <FileText className="w-6 h-6 text-yellow-500" />
                            </div>
                            <div>
                              <h4 className="font-medium text-white mb-1">{item.title}</h4>
                              <div className="flex items-center space-x-4 text-sm text-gray-400">
                                <span className="flex items-center">
                                  <Globe className="w-4 h-4 mr-1" />
                                  {langInfo.flag} {langInfo.name}
                                </span>
                                <span className="flex items-center">
                                  <Clock className="w-4 h-4 mr-1" />
                                  {versionInfo.name}
                                </span>
                                <span className="flex items-center">
                                  <Calendar className="w-4 h-4 mr-1" />
                                  {formatDate(item.downloadTime)}
                                </span>
                                <span>{item.fileSize}</span>
                                <span>下载 {item.downloadCount} 次</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button onClick={() => handleRedownload(item)} size="sm" className="bg-yellow-500 hover:bg-yellow-600 text-black">
                              <Download className="w-4 h-4 mr-2" />
                              重新下载
                            </Button>
                            <Button onClick={() => handleDeleteItem(item)} variant="outline" size="sm" className="border-red-500 text-red-500 hover:border-red-400 hover:text-red-400">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>;
              })}
                  </div>}
              </div>
            </div>
          </div>}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-xl border border-gray-800 w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center mr-4">
                  <Trash2 className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-red-500">确认删除</h3>
                  <p className="text-sm text-gray-400">
                    {selectedItem === 'all' ? '确定要清空所有下载历史记录吗？此操作不可恢复。' : `确定要删除"${selectedItem?.title}"的下载记录吗？此操作不可恢复。`}
                  </p>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <Button onClick={() => {
              setShowDeleteConfirm(false);
              setSelectedItem(null);
            }} variant="outline" className="flex-1 border-gray-700 text-gray-400 hover:border-gray-600 hover:text-white">
                  取消
                </Button>
                <Button onClick={selectedItem === 'all' ? handleClearAll : confirmDelete} className="flex-1 bg-red-500 hover:bg-red-600 text-white">
                  确认删除
                </Button>
              </div>
            </div>
          </div>
        </div>}
    </div>;
}