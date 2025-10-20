// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button } from '@/components/ui';
// @ts-ignore;
import { ArrowRight, Play, Shield, Heart, Activity, Brain, Zap, MessageCircle, Star, Users, TrendingUp, Award, ChevronRight, Sparkles, Bot } from 'lucide-react';

import { Navigation } from '@/components/Navigation';
import { AuthGuard } from '@/components/AuthGuard';
import { AIChatDialog } from '@/components/AIChatDialog';
export default function Home(props) {
  const {
    $w
  } = props;
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const [stats, setStats] = useState({
    users: '100,000+',
    accuracy: '99.9%',
    response: '< 1s',
    satisfaction: '4.9/5'
  });
  const navigateTo = pageId => {
    $w.utils.navigateTo({
      pageId,
      params: {}
    });
  };
  const handleAIChatOpen = () => {
    setIsAIChatOpen(true);
  };
  const handleAIChatClose = () => {
    setIsAIChatOpen(false);
  };
  return <AuthGuard $w={$w}>
      <div className="min-h-screen bg-black text-white">
        <Navigation currentPage="home" $w={$w} />
        
        {/* AI Chat Dialog */}
        <AIChatDialog isOpen={isAIChatOpen} onClose={handleAIChatClose} $w={$w} />

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-black to-blue-500/10"></div>
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-8 text-center">
            <div className="mb-8">
              <div className="inline-flex items-center px-4 py-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full mb-6">
                <Sparkles className="w-5 h-5 text-yellow-500 mr-2" />
                <span className="text-yellow-500 font-medium">AI驱动的智能健康生态</span>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
              AI太极·SOS RING
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              新一代智能健康守护戒指，融合尖端AI技术与传统太极理念，
              为您提供24/7全天候健康监测与紧急救助服务
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <Button onClick={() => navigateTo('product')} className="bg-yellow-500 hover:bg-yellow-600 text-black text-lg px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105">
                了解产品
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              
              <Button onClick={handleAIChatOpen} className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-lg px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 flex items-center">
                <Bot className="mr-2 w-5 h-5" />
                全能AI助手
                <MessageCircle className="ml-2 w-5 h-5" />
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-yellow-500 mb-2">{stats.users}</div>
                <div className="text-gray-400">全球用户</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-green-500 mb-2">{stats.accuracy}</div>
                <div className="text-gray-400">监测精度</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-500 mb-2">{stats.response}</div>
                <div className="text-gray-400">响应时间</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-purple-500 mb-2">{stats.satisfaction}</div>
                <div className="text-gray-400">用户满意度</div>
              </div>
            </div>
          </div>

          {/* Floating Elements */}
          <div className="absolute top-20 right-10 w-20 h-20 bg-yellow-500/20 rounded-full blur-xl animate-float"></div>
          <div className="absolute bottom-20 left-10 w-32 h-32 bg-blue-500/20 rounded-full blur-xl animate-float-delay"></div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="text-yellow-500">核心功能</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                集成多项尖端技术，为您提供全方位的健康守护
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 hover:border-yellow-500/50 transition-all duration-300 group">
                <div className="w-16 h-16 bg-yellow-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-yellow-500/30 transition-colors">
                  <Heart className="w-8 h-8 text-yellow-500" />
                </div>
                <h3 className="text-2xl font-bold mb-4">健康监测</h3>
                <p className="text-gray-400 leading-relaxed">
                  24小时连续监测心率、血氧、睡眠质量等关键健康指标，
                  通过AI算法分析健康状况，提供个性化健康建议
                </p>
              </div>

              <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 hover:border-yellow-500/50 transition-all duration-300 group">
                <div className="w-16 h-16 bg-red-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-red-500/30 transition-colors">
                  <Shield className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="text-2xl font-bold mb-4">SOS紧急救助</h3>
                <p className="text-gray-400 leading-relaxed">
                  一键触发紧急求助，自动联系预设联系人并发送位置信息，
                  确保在紧急情况下能够及时获得帮助
                </p>
              </div>

              <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 hover:border-yellow-500/50 transition-all duration-300 group">
                <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-500/30 transition-colors">
                  <Brain className="w-8 h-8 text-blue-500" />
                </div>
                <h3 className="text-2xl font-bold mb-4">AI健康分析</h3>
                <p className="text-gray-400 leading-relaxed">
                  基于深度学习的健康数据分析，识别健康趋势，
                  预测潜在风险，提供专业的健康管理方案
                </p>
              </div>

              <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 hover:border-yellow-500/50 transition-all duration-300 group">
                <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-500/30 transition-colors">
                  <Activity className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold mb-4">运动追踪</h3>
                <p className="text-gray-400 leading-relaxed">
                  精确记录日常运动数据，包括步数、卡路里消耗、运动轨迹等，
                  帮助您养成健康的生活习惯
                </p>
              </div>

              <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 hover:border-yellow-500/50 transition-all duration-300 group">
                <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-500/30 transition-colors">
                  <Zap className="w-8 h-8 text-purple-500" />
                </div>
                <h3 className="text-2xl font-bold mb-4">智能提醒</h3>
                <p className="text-gray-400 leading-relaxed">
                  根据您的健康状况和作息习惯，提供个性化的健康提醒，
                  包括用药提醒、运动建议、作息调整等
                </p>
              </div>

              <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 hover:border-yellow-500/50 transition-all duration-300 group">
                <div className="w-16 h-16 bg-cyan-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-cyan-500/30 transition-colors">
                  <Users className="w-8 h-8 text-cyan-500" />
                </div>
                <h3 className="text-2xl font-bold mb-4">家庭共享</h3>
                <p className="text-gray-400 leading-relaxed">
                  支持家庭成员健康数据共享，让家人随时了解您的健康状况，
                  特别适合关爱老人和儿童的健康管理
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Technology Section */}
        <section className="py-20 px-8 bg-gradient-to-b from-black to-gray-900">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="text-yellow-500">技术优势</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                融合传统太极智慧与现代AI技术，开创智能健康新纪元
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="space-y-8">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Brain className="w-6 h-6 text-yellow-500" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">AI深度学习算法</h3>
                      <p className="text-gray-400">
                        采用最新的深度学习技术，通过海量健康数据训练，
                        实现精准的健康状态识别和风险预测
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Shield className="w-6 h-6 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">医疗级传感器</h3>
                      <p className="text-gray-400">
                        配备高精度生物传感器，达到医疗级监测标准，
                        确保数据的准确性和可靠性
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Zap className="w-6 h-6 text-green-500" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">超低功耗设计</h3>
                      <p className="text-gray-400">
                        采用先进的低功耗技术，一次充电可使用7天，
                        让您无需频繁充电，持续守护健康
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="bg-gradient-to-br from-yellow-500/20 to-blue-500/20 rounded-3xl p-8 border border-yellow-500/30">
                  <div className="aspect-square bg-gray-800 rounded-2xl flex items-center justify-center">
                    <div className="text-center">
                      <Brain className="w-24 h-24 text-yellow-500 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold mb-2">太极AI引擎</h3>
                      <p className="text-gray-400">
                        融合传统太极哲学与现代AI技术<br />
                        打造独特的健康管理系统
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-yellow-500/30 rounded-full blur-xl"></div>
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-500/30 rounded-full blur-xl"></div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-r from-yellow-500/20 to-blue-500/20 rounded-3xl p-12 border border-yellow-500/30">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                开启您的智能健康之旅
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                立即体验AI太极·SOS RING，让科技守护您的健康
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button onClick={() => navigateTo('product')} className="bg-yellow-500 hover:bg-yellow-600 text-black text-lg px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105">
                  立即购买
                  <ChevronRight className="ml-2 w-5 h-5" />
                </Button>
                
                <Button onClick={handleAIChatOpen} className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-lg px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 flex items-center">
                  <Bot className="mr-2 w-5 h-5" />
                  AI咨询
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </AuthGuard>;
}