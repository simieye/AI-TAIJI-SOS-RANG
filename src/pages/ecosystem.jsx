// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Button } from '@/components/ui';
// @ts-ignore;
import { Globe, Users, Heart, Home, Shield, Zap, MapPin } from 'lucide-react';

import { Navigation } from '@/components/Navigation';
export default function Ecosystem(props) {
  const {
    $w
  } = props;
  const ecosystemItems = [{
    icon: Heart,
    title: '医疗健康',
    description: '睡眠障碍监测、术后恢复 API',
    features: ['睡眠质量分析', '康复进度跟踪', '健康数据API', '医疗数据对接']
  }, {
    icon: Users,
    title: '企业健康',
    description: '匿名群体分析 + 健康报告',
    features: ['员工健康监测', '群体数据分析', '健康报告生成', '隐私保护机制']
  }, {
    icon: Zap,
    title: '运动健身',
    description: 'AI 教练 Agent 恢复优化',
    features: ['运动状态监测', '恢复建议', '个性化训练', '成绩分析']
  }, {
    icon: Home,
    title: '智能家居',
    description: '睡眠浅时触发灯光/温度调节',
    features: ['环境联动', '智能调节', '场景自动化', '能耗优化']
  }, {
    icon: Shield,
    title: 'Web3 生态',
    description: 'NFT 健康凭证、DAO 节点分润',
    features: ['健康NFT', 'DAO治理', '代币经济', '去中心化存储']
  }];
  const locations = [{
    city: '深圳',
    coords: '22.5431° N, 114.0579° E'
  }, {
    city: '硅谷',
    coords: '37.7749° N, 122.4194° W'
  }, {
    city: '柏林',
    coords: '52.5200° N, 13.4050° E'
  }, {
    city: '迪拜',
    coords: '25.2048° N, 55.2708° E'
  }];
  return <div className="min-h-screen bg-black text-white">
      <Navigation currentPage="ecosystem" $w={$w} />

      {/* Hero Section */}
      <section className="py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-center mb-8">
            <span className="text-yellow-500">连接 AI 太极多智能体系统</span>
          </h1>
          <p className="text-xl text-gray-300 text-center mb-16 max-w-4xl mx-auto">
            AI Taiji OS - 构建主权AI时代的健康生态系统
          </p>
        </div>
      </section>

      {/* Ecosystem Grid */}
      <section className="py-24 px-8 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ecosystemItems.map((item, index) => {
            const Icon = item.icon;
            return <div key={index} className="bg-gray-900 rounded-lg p-8 border border-gray-800 hover:border-yellow-500/50 transition-all hover:transform hover:scale-105">
                  <Icon className="w-16 h-16 text-yellow-500 mb-6" />
                  <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                  <p className="text-gray-300 mb-6">{item.description}</p>
                  <ul className="space-y-2">
                    {item.features.map((feature, idx) => <li key={idx} className="text-sm text-gray-400 flex items-center">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2" />
                        {feature}
                      </li>)}
                  </ul>
                </div>;
          })}
          </div>
        </div>
      </section>

      {/* Global Network */}
      <section className="py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            <span className="text-yellow-500">全球网络布局</span>
          </h2>

          <div className="bg-gray-900 rounded-lg p-8 border border-gray-800 mb-12">
            <div className="relative h-96">
              {/* World Map Background */}
              <div className="absolute inset-0 opacity-20">
                <div className="w-full h-full bg-gradient-to-br from-yellow-500/20 to-transparent rounded-lg" />
              </div>
              
              {/* Connection Lines */}
              <svg className="absolute inset-0 w-full h-full">
                <line x1="20%" y1="60%" x2="10%" y2="30%" stroke="#FFD700" strokeWidth="2" opacity="0.5" />
                <line x1="20%" y1="60%" x2="50%" y2="20%" stroke="#FFD700" strokeWidth="2" opacity="0.5" />
                <line x1="20%" y1="60%" x2="70%" y2="40%" stroke="#FFD700" strokeWidth="2" opacity="0.5" />
                <line x1="20%" y1="60%" x2="80%" y2="70%" stroke="#FFD700" strokeWidth="2" opacity="0.5" />
              </svg>

              {/* Location Points */}
              {locations.map((location, index) => <div key={index} className="absolute transform -translate-x-1/2 -translate-y-1/2" style={{
              left: index === 0 ? '20%' : index === 1 ? '10%' : index === 2 ? '50%' : '80%',
              top: index === 0 ? '60%' : index === 1 ? '30%' : index === 2 ? '20%' : '70%'
            }}>
                  <div className="relative">
                    <div className="w-4 h-4 bg-yellow-500 rounded-full animate-pulse" />
                    <div className="absolute inset-0 w-4 h-4 bg-yellow-500 rounded-full animate-ping" />
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                      <p className="text-yellow-500 font-bold">{location.city}</p>
                      <p className="text-xs text-gray-400">{location.coords}</p>
                    </div>
                  </div>
                </div>)}
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {locations.map((location, index) => <div key={index} className="text-center">
                <MapPin className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                <h3 className="font-bold mb-1">{location.city}</h3>
                <p className="text-sm text-gray-400">{location.coords}</p>
              </div>)}
          </div>
        </div>
      </section>

      {/* Developer Section */}
      <section className="py-24 px-8 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            <span className="text-yellow-500">开发者生态</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6">开放API</h3>
              <p className="text-gray-300 mb-6">
                提供完整的RESTful API和SDK，支持多种编程语言，快速集成AI太极健康数据
              </p>
              <ul className="space-y-3 text-gray-400">
                <li>• 实时数据流API</li>
                <li>• 历史数据查询API</li>
                <li>• AI分析结果API</li>
                <li>• 设备管理API</li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-6">SDK支持</h3>
              <p className="text-gray-300 mb-6">
                多平台SDK支持，包括JavaScript、Python、iOS、Android等主流开发平台
              </p>
              <ul className="space-y-3 text-gray-400">
                <li>• JavaScript/TypeScript</li>
                <li>• Python</li>
                <li>• iOS (Swift)</li>
                <li>• Android (Kotlin)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            <span className="text-yellow-500">加入AI太极生态</span>
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            成为生态合作伙伴，共同构建主权AI健康未来
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-4 text-lg">
              申请开发者账号
            </Button>
            <Button variant="outline" className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black px-8 py-4 text-lg">
              下载SDK
            </Button>
          </div>
        </div>
      </section>
    </div>;
}