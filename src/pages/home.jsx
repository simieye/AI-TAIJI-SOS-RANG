// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button } from '@/components/ui';
// @ts-ignore;
import { ArrowRight, Play, Shield, Activity, Brain, Heart, Star, ChevronRight, Menu, X, Zap, Users, Award } from 'lucide-react';

import { Navigation } from '@/components/Navigation';
import { NotificationProvider, ToastContainer } from '@/components/NotificationSystem';
export default function Home(props) {
  const {
    $w
  } = props;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const navigateTo = pageId => {
    $w.utils.navigateTo({
      pageId,
      params: {}
    });
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  const features = [{
    icon: Shield,
    title: 'SOS紧急守护',
    description: 'EDA压力检测，一键紧急呼叫，24小时安全守护',
    color: 'from-blue-500 to-blue-600'
  }, {
    icon: Brain,
    title: 'AI睡眠分析',
    description: 'CNN+LSTM算法，睡眠识别准确率98.7%',
    color: 'from-purple-500 to-purple-600'
  }, {
    icon: Activity,
    title: '健康监测',
    description: '实时心率血氧监测，运动数据追踪，AI健康报告',
    color: 'from-green-500 to-green-600'
  }, {
    icon: Heart,
    title: '智能提醒',
    description: '久坐提醒，用药提醒，个性化健康建议',
    color: 'from-red-500 to-red-600'
  }];
  const testimonials = [{
    name: '张先生',
    role: '65岁退休教师',
    content: 'AI太极戒指救了我的命！心脏病突发时自动报警，医生说再晚几分钟就危险了。现在全家人都放心了。',
    rating: 5
  }, {
    name: '李女士',
    role: '42岁企业高管',
    content: '睡眠分析功能太棒了！按照AI建议调整作息，睡眠质量提升了80%，工作效率也明显改善。',
    rating: 5
  }, {
    name: '王工程师',
    role: '35岁程序员',
    content: '久坐提醒功能很实用，避免了腰椎问题。健康报告让我对自己的身体状况有了清晰了解。',
    rating: 5
  }];
  const stats = [{
    value: '98.7%',
    label: '睡眠识别准确率',
    icon: Brain
  }, {
    value: '24/7',
    label: '全天候守护',
    icon: Shield
  }, {
    value: '30天',
    label: '超长续航',
    icon: Zap
  }, {
    value: '5万+',
    label: '用户信赖',
    icon: Users
  }];
  return <NotificationProvider>
      <div className="min-h-screen bg-black text-white overflow-hidden">
        <Navigation currentPage="home" $w={$w} />
        <ToastContainer />

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-transparent to-blue-500/10" />
          <div className="relative z-10 max-w-6xl mx-auto text-center">
            <div className="mb-8">
              <div className="inline-flex items-center bg-yellow-500/10 border border-yellow-500/30 rounded-full px-4 py-2 mb-6">
                <Shield className="w-4 h-4 text-yellow-500 mr-2" />
                <span className="text-yellow-500 text-sm">2024年度最佳智能穿戴设备</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="text-yellow-500">AI太极·SOS RING</span>
                <br />
                <span className="text-white">您的智能健康守护者</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
                融合东方太极智慧与西方AI科技，为您的健康保驾护航。
                紧急救援、睡眠监测、健康分析，一枚戒指，全方位守护。
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button onClick={() => navigateTo('configurator')} className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-4 text-lg">
                立即定制
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button onClick={() => navigateTo('product')} variant="outline" className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black px-8 py-4 text-lg">
                <Play className="mr-2 w-5 h-5" />
                观看演示
              </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => {
              const Icon = stat.icon;
              return <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-yellow-500" />
                  </div>
                  <div className="text-3xl font-bold text-yellow-500 mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>;
            })}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="text-yellow-500">核心功能</span>
              </h2>
              <p className="text-xl text-gray-300">
                先进的AI技术，贴心的健康守护
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => {
              const Icon = feature.icon;
              return <div key={index} className="bg-gray-900 rounded-lg p-6 border border-gray-800 hover:border-yellow-500/50 transition-all">
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-full flex items-center justify-center mb-6`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </div>;
            })}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 px-4 bg-gray-900/50">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="text-yellow-500">用户真实反馈</span>
              </h2>
              <p className="text-xl text-gray-300">
                来自全球用户的真实体验分享
              </p>
            </div>
            <div className="bg-gray-900 rounded-lg p-8 border border-gray-800">
              <div className="flex items-center mb-6">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />)}
              </div>
              <p className="text-xl text-gray-300 mb-8 italic">
                "{testimonials[currentTestimonial].content}"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-black font-bold">
                    {testimonials[currentTestimonial].name[0]}
                  </span>
                </div>
                <div>
                  <div className="font-bold">{testimonials[currentTestimonial].name}</div>
                  <div className="text-gray-400">{testimonials[currentTestimonial].role}</div>
                </div>
              </div>
              <div className="flex justify-center mt-8 space-x-2">
                {testimonials.map((_, index) => <button key={index} onClick={() => setCurrentTestimonial(index)} className={`w-2 h-2 rounded-full transition-all ${index === currentTestimonial ? 'bg-yellow-500 w-8' : 'bg-gray-600'}`} />)}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-r from-yellow-500/20 to-blue-500/20 rounded-lg p-12 border border-yellow-500/30">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="text-yellow-500">开启您的智能健康之旅</span>
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                现在订购，享受限时优惠和专业健康咨询服务
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={() => navigateTo('configurator')} className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-4 text-lg">
                  立即定制
                  <ChevronRight className="ml-2 w-5 h-5" />
                </Button>
                <Button onClick={() => navigateTo('consultation')} variant="outline" className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black px-8 py-4 text-lg">
                  免费咨询
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </NotificationProvider>;
}