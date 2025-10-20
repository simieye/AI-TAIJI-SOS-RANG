// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Button } from '@/components/ui';
// @ts-ignore;
import { Handshake, Users, Building, Home, Globe, TrendingUp, ArrowRight } from 'lucide-react';

import { Navigation } from '@/components/Navigation';
export default function Business(props) {
  const {
    $w
  } = props;
  const partnershipTypes = [{
    icon: Building,
    title: '医疗机构',
    description: '睡眠障碍治疗、术后康复监测',
    benefits: ['临床数据支持', '专业医疗对接', '患者管理工具', '科研合作机会']
  }, {
    icon: Users,
    title: '企业客户',
    description: '员工健康福利、生产力提升',
    benefits: ['群体健康分析', '定制化报告', 'API集成', '专属客服']
  }, {
    icon: Home,
    title: '智能家居',
    description: '健康数据联动、智能环境调节',
    benefits: ['设备联动协议', '场景自动化', '用户行为分析', '生态合作']
  }, {
    icon: Globe,
    title: 'Web3联盟',
    description: '去中心化健康、数据主权',
    benefits: ['DAO治理参与', '代币经济模型', 'NFT健康凭证', '节点分润']
  }];
  return <div className="min-h-screen bg-black text-white">
      <Navigation currentPage="business" $w={$w} />

      {/* Hero Section */}
      <section className="py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-center mb-8">
            <span className="text-yellow-500">从深圳到全球</span>
            <br />
            <span className="text-white">构建主权AI健康新文明</span>
          </h1>
          <p className="text-xl text-gray-300 text-center mb-16 max-w-4xl mx-auto">
            携手全球合作伙伴，共同开创AI健康产业新纪元
          </p>
        </div>
      </section>

      {/* Partnership Types */}
      <section className="py-24 px-8 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            <span className="text-yellow-500">合作类型</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {partnershipTypes.map((partner, index) => {
            const Icon = partner.icon;
            return <div key={index} className="bg-gray-900 rounded-lg p-8 border border-gray-800 hover:border-yellow-500/50 transition-all">
                  <div className="flex items-start mb-6">
                    <Icon className="w-12 h-12 text-yellow-500 mr-4 flex-shrink-0" />
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{partner.title}</h3>
                      <p className="text-gray-300">{partner.description}</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold mb-3 text-yellow-500">合作权益</h4>
                    <ul className="space-y-2">
                      {partner.benefits.map((benefit, idx) => <li key={idx} className="text-sm text-gray-400 flex items-center">
                          <ArrowRight className="w-4 h-4 text-yellow-500 mr-2" />
                          {benefit}
                        </li>)}
                    </ul>
                  </div>
                </div>;
          })}
          </div>
        </div>
      </section>

      {/* Business Model */}
      <section className="py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            <span className="text-yellow-500">商业模型</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-900 rounded-lg p-8 border border-gray-800 text-center">
              <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-black">硬件</span>
              </div>
              <h3 className="text-xl font-bold mb-4">硬件销售</h3>
              <p className="text-gray-300 mb-4">SOS RING智能戒指</p>
              <p className="text-3xl font-bold text-yellow-500">$299</p>
              <p className="text-sm text-gray-400">起售价</p>
            </div>

            <div className="bg-gray-900 rounded-lg p-8 border border-gray-800 text-center">
              <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-black">AI</span>
              </div>
              <h3 className="text-xl font-bold mb-4">AI订阅</h3>
              <p className="text-gray-300 mb-4">高级AI分析服务</p>
              <p className="text-3xl font-bold text-yellow-500">$19</p>
              <p className="text-sm text-gray-400">每月</p>
            </div>

            <div className="bg-gray-900 rounded-lg p-8 border border-gray-800 text-center">
              <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-black">生态</span>
              </div>
              <h3 className="text-xl font-bold mb-4">主权生态</h3>
              <p className="text-gray-300 mb-4">API与数据服务</p>
              <p className="text-3xl font-bold text-yellow-500">$99</p>
              <p className="text-sm text-gray-400">每月</p>
            </div>
          </div>
        </div>
      </section>

      {/* Funding Roadmap */}
      <section className="py-24 px-8 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            <span className="text-yellow-500">融资规划</span>
          </h2>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-yellow-500/30" />
            
            <div className="space-y-12">
              <div className="flex items-center">
                <div className="flex-1 text-right pr-8">
                  <h3 className="text-2xl font-bold text-yellow-500">Seed轮</h3>
                  <p className="text-gray-300">产品研发与团队建设</p>
                </div>
                <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center z-10">
                  <span className="text-black font-bold">$3M</span>
                </div>
                <div className="flex-1 pl-8">
                  <p className="text-gray-400">已完成</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="flex-1 text-right pr-8">
                  <h3 className="text-2xl font-bold text-yellow-500">Series A</h3>
                  <p className="text-gray-300">市场拓展与生态建设</p>
                </div>
                <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center z-10">
                  <span className="text-black font-bold">$10M</span>
                </div>
                <div className="flex-1 pl-8">
                  <p className="text-gray-400">进行中</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            <span className="text-yellow-500">成为合作伙伴</span>
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            加入AI太极生态，共同构建主权AI健康未来
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-4 text-lg">
              成为合作伙伴
            </Button>
            <Button variant="outline" className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black px-8 py-4 text-lg">
              下载 Pitch Deck
            </Button>
          </div>
        </div>
      </section>
    </div>;
}