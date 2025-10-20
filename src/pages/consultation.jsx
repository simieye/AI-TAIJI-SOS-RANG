// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button } from '@/components/ui';
// @ts-ignore;
import { MessageCircle, FileText, Clock, Users, Send, Phone, Mail, ChevronRight } from 'lucide-react';

import { Navigation } from '@/components/Navigation';
export default function Consultation(props) {
  const {
    $w
  } = props;
  const [activeTab, setActiveTab] = useState('overview');
  const navigateTo = pageId => {
    $w.utils.navigateTo({
      pageId,
      params: {}
    });
  };
  const consultationTypes = [{
    id: 'product',
    title: '产品咨询',
    description: 'SOS RING功能、使用、购买相关问题',
    icon: '📱',
    color: 'from-yellow-400 to-yellow-600'
  }, {
    id: 'technical',
    title: '技术支持',
    description: '设备故障、连接、同步等技术问题',
    icon: '🔧',
    color: 'from-blue-400 to-blue-600'
  }, {
    id: 'health',
    title: '健康咨询',
    description: '睡眠分析、健康数据、AI报告解读',
    icon: '🏥',
    color: 'from-green-400 to-green-600'
  }, {
    id: 'partnership',
    title: '合作洽谈',
    description: '商业合作、渠道代理、投资洽谈',
    icon: '🤝',
    color: 'from-purple-400 to-purple-600'
  }];
  const stats = [{
    label: '今日咨询',
    value: '128',
    change: '+12%'
  }, {
    label: '平均响应',
    value: '2.3分钟',
    change: '-18%'
  }, {
    label: '满意度',
    value: '98.5%',
    change: '+2.1%'
  }, {
    label: '在线咨询师',
    value: '12',
    change: '+3'
  }];
  return <div className="min-h-screen bg-black text-white">
      <Navigation currentPage="consultation" $w={$w} />

      {/* Hero Section */}
      <section className="py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-center mb-8">
            <span className="text-yellow-500">AI太极在线咨询</span>
            <br />
            <span className="text-white">专业服务，即时响应</span>
          </h1>
          <p className="text-xl text-gray-300 text-center mb-16 max-w-4xl mx-auto">
            7×24小时专业咨询服务，为您提供产品、技术、健康全方位支持
          </p>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => <div key={index} className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-gray-400">{stat.label}</span>
                  <span className={`text-sm ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                    {stat.change}
                  </span>
                </div>
                <div className="text-3xl font-bold text-yellow-500">{stat.value}</div>
              </div>)}
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-4 mb-12 justify-center">
            <button onClick={() => setActiveTab('overview')} className={`px-6 py-3 rounded-lg font-medium transition-all ${activeTab === 'overview' ? 'bg-yellow-500 text-black' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}>
              服务概览
            </button>
            <button onClick={() => setActiveTab('form')} className={`px-6 py-3 rounded-lg font-medium transition-all ${activeTab === 'form' ? 'bg-yellow-500 text-black' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}>
              表单咨询
            </button>
            <button onClick={() => setActiveTab('chat')} className={`px-6 py-3 rounded-lg font-medium transition-all ${activeTab === 'chat' ? 'bg-yellow-500 text-black' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}>
              实时聊天
            </button>
            <button onClick={() => setActiveTab('history')} className={`px-6 py-3 rounded-lg font-medium transition-all ${activeTab === 'history' ? 'bg-yellow-500 text-black' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}>
              咨询历史
            </button>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="px-8 pb-24">
        <div className="max-w-7xl mx-auto">
          {activeTab === 'overview' && <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-900 rounded-lg p-8 border border-gray-800">
                <h2 className="text-2xl font-bold mb-6 text-yellow-500">咨询类型</h2>
                <div className="space-y-4">
                  {consultationTypes.map((type, index) => <div key={index} className="flex items-center p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer" onClick={() => navigateTo('consultation-form')}>
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${type.color} flex items-center justify-center text-2xl mr-4`}>
                        {type.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold mb-1">{type.title}</h3>
                        <p className="text-sm text-gray-400">{type.description}</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>)}
                </div>
              </div>

              <div className="space-y-8">
                <div className="bg-gray-900 rounded-lg p-8 border border-gray-800">
                  <h2 className="text-2xl font-bold mb-6 text-yellow-500">快速联系</h2>
                  <div className="space-y-4">
                    <button onClick={() => navigateTo('consultation-chat')} className="w-full flex items-center p-4 bg-yellow-500 hover:bg-yellow-600 text-black rounded-lg transition-colors">
                      <MessageCircle className="w-6 h-6 mr-3" />
                      <span className="font-bold">开始实时聊天</span>
                    </button>
                    <button onClick={() => navigateTo('consultation-form')} className="w-full flex items-center p-4 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
                      <FileText className="w-6 h-6 mr-3 text-yellow-500" />
                      <span>提交咨询表单</span>
                    </button>
                    <div className="flex items-center p-4 bg-gray-800 rounded-lg">
                      <Phone className="w-6 h-6 mr-3 text-yellow-500" />
                      <div>
                        <div className="font-bold">热线电话</div>
                        <div className="text-sm text-gray-400">400-888-9999</div>
                      </div>
                    </div>
                    <div className="flex items-center p-4 bg-gray-800 rounded-lg">
                      <Mail className="w-6 h-6 mr-3 text-yellow-500" />
                      <div>
                        <div className="font-bold">邮箱支持</div>
                        <div className="text-sm text-gray-400">support@aitaiji.com</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900 rounded-lg p-8 border border-gray-800">
                  <h2 className="text-2xl font-bold mb-6 text-yellow-500">服务时间</h2>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">实时聊天</span>
                      <span className="text-yellow-500">7×24小时</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">电话支持</span>
                      <span className="text-yellow-500">9:00-21:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">邮件回复</span>
                      <span className="text-yellow-500">24小时内</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>}

          {activeTab === 'form' && <div className="bg-gray-900 rounded-lg p-8 border border-gray-800">
              <h2 className="text-2xl font-bold mb-6 text-yellow-500">表单咨询</h2>
              <p className="text-gray-300 mb-8">
                请填写以下信息，我们将在24小时内回复您的咨询
              </p>
              <div className="text-center py-12">
                <Button onClick={() => navigateTo('consultation-form')} className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-4 text-lg">
                  前往咨询表单
                  <ChevronRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </div>}

          {activeTab === 'chat' && <div className="bg-gray-900 rounded-lg p-8 border border-gray-800">
              <h2 className="text-2xl font-bold mb-6 text-yellow-500">实时聊天</h2>
              <p className="text-gray-300 mb-8">
                与专业咨询师实时对话，获得即时帮助
              </p>
              <div className="text-center py-12">
                <Button onClick={() => navigateTo('consultation-chat')} className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-4 text-lg">
                  开始聊天
                  <MessageCircle className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </div>}

          {activeTab === 'history' && <div className="bg-gray-900 rounded-lg p-8 border border-gray-800">
              <h2 className="text-2xl font-bold mb-6 text-yellow-500">咨询历史</h2>
              <p className="text-gray-300 mb-8">
                查看您的咨询记录和回复详情
              </p>
              <div className="text-center py-12">
                <Button onClick={() => navigateTo('consultation-history')} className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-4 text-lg">
                  查看历史记录
                  <Clock className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </div>}
        </div>
      </section>
    </div>;
}