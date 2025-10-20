// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Input } from '@/components/ui';
// @ts-ignore;
import { ArrowLeft, Clock, MessageCircle, User, CheckCircle, AlertCircle, Search, Filter, Calendar } from 'lucide-react';

import { Navigation } from '@/components/Navigation';
export default function ConsultationHistory(props) {
  const {
    $w
  } = props;
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigateTo = pageId => {
    $w.utils.navigateTo({
      pageId,
      params: {}
    });
  };
  // 获取当前用户信息
  const currentUser = $w.auth.currentUser;
  const userId = currentUser?.userId;
  useEffect(() => {
    if (userId) {
      loadConsultations();
    } else {
      setLoading(false);
    }
  }, [userId]);
  const loadConsultations = async () => {
    try {
      setLoading(true);
      // 从数据源获取用户的咨询记录
      const result = await $w.cloud.callDataSource({
        dataSourceName: 'consultation_record',
        methodName: 'wedaGetRecordsV2',
        params: {
          filter: {
            where: {
              $and: [{
                user_id: {
                  $eq: userId
                }
              }]
            }
          },
          select: {
            $master: true
          },
          orderBy: [{
            consultation_time: 'desc'
          }],
          getCount: true,
          pageSize: 50
        }
      });
      if (result && result.records) {
        setConsultations(result.records);
      }
    } catch (error) {
      console.error('加载咨询记录失败:', error);
    } finally {
      setLoading(false);
    }
  };
  const getTypeLabel = type => {
    const typeMap = {
      product: '产品咨询',
      technical: '技术支持',
      health: '健康咨询',
      partnership: '合作洽谈',
      other: '其他咨询'
    };
    return typeMap[type] || '其他';
  };
  const getTypeColor = type => {
    const colorMap = {
      product: 'bg-yellow-500',
      technical: 'bg-blue-500',
      health: 'bg-green-500',
      partnership: 'bg-purple-500',
      other: 'bg-gray-500'
    };
    return colorMap[type] || 'bg-gray-500';
  };
  const getStatusIcon = status => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'in-progress':
        return <AlertCircle className="w-5 h-5 text-blue-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };
  const getStatusLabel = status => {
    const statusMap = {
      completed: '已完成',
      pending: '待回复',
      'in-progress': '处理中'
    };
    return statusMap[status] || '未知';
  };
  const formatTime = timestamp => {
    if (!timestamp) return '-';
    const date = new Date(timestamp);
    return date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  const calculateResponseTime = consultation => {
    if (!consultation.response_time || !consultation.consultation_time) return '-';
    const responseTime = new Date(consultation.response_time);
    const consultationTime = new Date(consultation.consultation_time);
    const diffMinutes = Math.round((responseTime - consultationTime) / (1000 * 60));
    return `${diffMinutes}分钟`;
  };
  const filteredConsultations = consultations.filter(item => {
    const matchesSearch = item.consultation_subject?.toLowerCase().includes(searchTerm.toLowerCase()) || item.consultation_content?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
  if (loading) {
    return <div className="min-h-screen bg-black text-white">
        <Navigation currentPage="consultation" $w={$w} />
        <div className="max-w-6xl mx-auto px-8 py-24">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
            <p className="text-gray-400">加载中...</p>
          </div>
        </div>
      </div>;
  }
  if (!userId) {
    return <div className="min-h-screen bg-black text-white">
        <Navigation currentPage="consultation" $w={$w} />
        <div className="max-w-6xl mx-auto px-8 py-24">
          <div className="text-center">
            <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">请先登录</h2>
            <p className="text-gray-400 mb-8">登录后即可查看您的咨询历史记录</p>
            <Button onClick={() => navigateTo('consultation')} className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-4 text-lg">
              返回咨询中心
            </Button>
          </div>
        </div>
      </div>;
  }
  return <div className="min-h-screen bg-black text-white">
      <Navigation currentPage="consultation" $w={$w} />

      <div className="max-w-6xl mx-auto px-8 py-24">
        {/* Header */}
        <div className="mb-8">
          <button onClick={() => navigateTo('consultation')} className="flex items-center text-gray-400 hover:text-yellow-500 transition-colors mb-4">
            <ArrowLeft className="w-5 h-5 mr-2" />
            返回咨询中心
          </button>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-yellow-500">咨询历史</span>
          </h1>
          <p className="text-xl text-gray-300">
            查看您的所有咨询记录和回复详情
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <div className="text-3xl font-bold text-yellow-500 mb-2">{consultations.length}</div>
            <div className="text-gray-400">总咨询数</div>
          </div>
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <div className="text-3xl font-bold text-green-500 mb-2">{consultations.filter(item => item.status === 'completed').length}</div>
            <div className="text-gray-400">已完成</div>
          </div>
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <div className="text-3xl font-bold text-blue-500 mb-2">{consultations.filter(item => item.status === 'in-progress').length}</div>
            <div className="text-gray-400">处理中</div>
          </div>
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <div className="text-3xl font-bold text-yellow-500 mb-2">2.3分钟</div>
            <div className="text-gray-400">平均响应</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-gray-900 rounded-lg p-6 border border-gray-800 mb-8">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="搜索咨询记录..." className="pl-10 bg-gray-800 border-gray-700 focus:border-yellow-500 text-white placeholder-gray-500" />
            </div>
            <div className="flex items-center space-x-4">
              <Filter className="w-5 h-5 text-gray-400" />
              <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="flex-1 bg-gray-800 border-gray-700 focus:border-yellow-500 text-white rounded-lg px-4 py-2">
                <option value="all">全部状态</option>
                <option value="completed">已完成</option>
                <option value="in-progress">处理中</option>
                <option value="pending">待回复</option>
              </select>
            </div>
          </div>
        </div>

        {/* History List */}
        <div className="space-y-4">
          {filteredConsultations.map(item => <div key={item.consultation_id} className="bg-gray-900 rounded-lg p-6 border border-gray-800 hover:border-yellow-500/50 transition-all cursor-pointer">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full ${getTypeColor(item.consultation_type)} mr-3`} />
                  <div>
                    <h3 className="text-lg font-bold mb-1">{item.consultation_subject}</h3>
                    <p className="text-gray-400 text-sm">{item.consultation_content?.substring(0, 100)}...</p>
                  </div>
                </div>
                {getStatusIcon(item.status)}
              </div>

              <div className="grid md:grid-cols-5 gap-4 text-sm">
                <div>
                  <div className="text-gray-500 mb-1">类型</div>
                  <div className="text-yellow-500">{getTypeLabel(item.consultation_type)}</div>
                </div>
                <div>
                  <div className="text-gray-500 mb-1">咨询师</div>
                  <div className="text-white">{item.consultant_name || '待分配'}</div>
                </div>
                <div>
                  <div className="text-gray-500 mb-1">时间</div>
                  <div className="text-white">{formatTime(item.consultation_time)}</div>
                </div>
                <div>
                  <div className="text-gray-500 mb-1">响应时间</div>
                  <div className="text-white">{calculateResponseTime(item)}</div>
                </div>
                <div>
                  <div className="text-gray-500 mb-1">状态</div>
                  <div className="text-white">{getStatusLabel(item.status)}</div>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-800">
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <div className="flex items-center">
                    <MessageCircle className="w-4 h-4 mr-1" />
                    {item.message_count || 1} 条消息
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(item.consultation_time).toLocaleDateString()}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black">
                    查看详情
                  </Button>
                  {item.status === 'pending' && <Button size="sm" onClick={() => navigateTo('consultation-chat')} className="bg-yellow-500 hover:bg-yellow-600 text-black">
                      继续咨询
                    </Button>}
                </div>
              </div>
            </div>)}
        </div>

        {filteredConsultations.length === 0 && <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Clock className="w-16 h-16 mx-auto mb-4" />
              <p className="text-xl">暂无咨询记录</p>
              <p className="text-sm mt-2">开始您的第一次咨询吧</p>
            </div>
            <Button onClick={() => navigateTo('consultation')} className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-4 text-lg">
              开始咨询
            </Button>
          </div>}
      </div>
    </div>;
}