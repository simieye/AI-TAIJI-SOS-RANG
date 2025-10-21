// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Textarea, Switch, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui';
// @ts-ignore;
import { Menu, X, ChevronRight, Star, Users, MessageCircle, Shield, Zap, Heart, Brain, Activity, Globe, Cpu, Wifi, Battery, ArrowRight, CheckCircle, AlertCircle, Clock, TrendingUp, BarChart, Target, Award, Phone, Mail, MapPin, Calendar, Tag, Languages, Database, Search, Filter, Download, Upload, RefreshCw, Settings, Eye, Edit2, Trash2, Plus, Edit, Copy, Share2, Bell, Headphones, UserCheck, ChevronDown, ChevronUp, ThumbsUp, ThumbsDown, MoreHorizontal, Play, Pause, Square, TrendingDown, User } from 'lucide-react';

import { Navigation } from '@/components/Navigation';
import { AIChatWidget } from '@/components/AIChatWidget';
export default function Home(props) {
  const {
    $w,
    style
  } = props;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const handleNavigation = sectionId => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  return <div style={style} className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Navigation */}
      <Navigation />
      
      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-500 rounded-full mb-6">
                <Brain className="w-12 h-12 text-black" />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
              AI太极SOS Ring
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              融合传统太极养生智慧与现代AI技术，为您的健康保驾护航
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button onClick={() => $w.utils.navigateTo({
              pageId: 'product',
              params: {}
            })} className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-4 text-lg font-semibold rounded-lg transition-all transform hover:scale-105">
                了解产品
                <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
              
              <Button onClick={() => $w.utils.navigateTo({
              pageId: 'consultation',
              params: {}
            })} variant="outline" className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black px-8 py-4 text-lg font-semibold rounded-lg transition-all">
                预约咨询
                <MessageCircle className="ml-2 w-5 h-5" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <Shield className="w-8 h-8 text-yellow-500" />
                </div>
                <h3 className="text-lg font-semibold mb-2">24/7 健康监测</h3>
                <p className="text-gray-400">全天候守护您的健康状态</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <Zap className="w-8 h-8 text-yellow-500" />
                </div>
                <h3 className="text-lg font-semibold mb-2">AI 智能分析</h3>
                <p className="text-gray-400">深度学习算法精准分析</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <Heart className="w-8 h-8 text-yellow-500" />
                </div>
                <h3 className="text-lg font-semibold mb-2">SOS 紧急救援</h3>
                <p className="text-gray-400">一键求助，快速响应</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-yellow-500" />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              核心功能
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              集成多项先进技术，为您提供全方位的健康管理体验
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[{
            icon: Brain,
            title: 'AI 健康分析',
            description: '基于深度学习的健康状态分析，实时监测身体指标变化',
            features: ['智能算法', '实时监测', '精准分析']
          }, {
            icon: Heart,
            title: '心率监测',
            description: '24小时连续心率监测，异常情况及时预警',
            features: ['连续监测', '异常预警', '健康报告']
          }, {
            icon: Activity,
            title: '运动追踪',
            description: '记录日常运动数据，科学分析运动效果',
            features: ['步数统计', '卡路里消耗', '运动建议']
          }, {
            icon: Shield,
            title: 'SOS 紧急求助',
            description: '一键发送求助信号，自动联系紧急联系人',
            features: ['一键求助', '自动定位', '多渠道通知']
          }, {
            icon: Brain,
            title: '睡眠分析',
            description: '深度分析睡眠质量，提供改善建议',
            features: ['睡眠监测', '质量分析', '改善建议']
          }, {
            icon: Battery,
            title: '长续航设计',
            description: '低功耗设计，一次充电可使用7天',
            features: ['7天续航', '快充技术', '电量提醒']
          }].map((feature, index) => <div key={index} className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-yellow-500 transition-all hover:transform hover:scale-105">
                <div className="flex items-center justify-center w-16 h-16 bg-yellow-500 rounded-full mb-4">
                  <feature.icon className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-yellow-500">{feature.title}</h3>
                <p className="text-gray-300 mb-4">{feature.description}</p>
                <div className="flex flex-wrap gap-2">
                  {feature.features.map((feat, idx) => <span key={idx} className="px-3 py-1 bg-gray-700 text-xs rounded-full text-gray-300">
                      {feat}
                    </span>)}
                </div>
              </div>)}
          </div>
        </div>
      </section>

      {/* Product Showcase */}
      <section id="product" className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                精工设计
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                采用医用级材料，结合人体工学设计，佩戴舒适，防水防尘，适合各种场合使用。
              </p>
              
              <div className="space-y-6">
                {[{
                label: '材质',
                value: '医用级钛合金'
              }, {
                label: '防水等级',
                value: 'IP68'
              }, {
                label: '电池续航',
                value: '7天'
              }, {
                label: '重量',
                value: '仅15克'
              }, {
                label: '适配尺寸',
                value: '可调节'
              }].map((spec, index) => <div key={index} className="flex items-center justify-between bg-gray-900 rounded-lg p-4">
                    <span className="text-gray-400">{spec.label}</span>
                    <span className="text-yellow-500 font-semibold">{spec.value}</span>
                  </div>)}
              </div>
              
              <Button onClick={() => $w.utils.navigateTo({
              pageId: 'product',
              params: {}
            })} className="mt-8 bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 font-semibold rounded-lg">
                查看详情
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
            
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl flex items-center justify-center">
                <div className="w-32 h-32 bg-black rounded-full flex items-center justify-center">
                  <Brain className="w-16 h-16 text-yellow-500" />
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-500 rounded-full flex items-center justify-center">
                <Zap className="w-12 h-12 text-black" />
              </div>
              <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center">
                <Heart className="w-10 h-10 text-black" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              数据说话
            </h2>
            <p className="text-xl text-gray-300">
              真实用户反馈，见证产品价值
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[{
            number: '100,000+',
            label: '全球用户'
          }, {
            number: '99.9%',
            label: '准确率'
          }, {
            number: '24/7',
            label: '全天候服务'
          }, {
            number: '4.8/5',
            label: '用户评分'
          }].map((stat, index) => <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-yellow-500 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-300 text-lg">{stat.label}</div>
              </div>)}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              用户评价
            </h2>
            <p className="text-xl text-gray-300">
              听听他们怎么说
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[{
            name: '张先生',
            role: '退休教师',
            content: '这个戒指真的很棒，特别是SOS功能让我很安心。孩子们也放心了。',
            rating: 5
          }, {
            name: '李女士',
            role: '企业高管',
            content: '作为忙碌的职场人，健康监测功能帮我及时了解身体状况。',
            rating: 5
          }, {
            name: '王先生',
            role: '运动爱好者',
            content: '运动追踪功能很准确，帮助我更好地管理训练计划。',
            rating: 4
          }].map((testimonial, index) => <div key={index} className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-black" />
                  </div>
                  <div className="ml-4">
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-gray-400 text-sm">{testimonial.role}</div>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />)}
                </div>
                <p className="text-gray-300">{testimonial.content}</p>
              </div>)}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-yellow-400 to-yellow-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black">
            准备好体验未来健康科技了吗？
          </h2>
          <p className="text-xl text-black mb-8 opacity-80">
            立即预约咨询，开启您的智能健康生活
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => $w.utils.navigateTo({
            pageId: 'consultation',
            params: {}
          })} className="bg-black hover:bg-gray-800 text-yellow-500 px-8 py-4 text-lg font-semibold rounded-lg">
              预约咨询
              <MessageCircle className="ml-2 w-5 h-5" />
            </Button>
            <Button onClick={() => $w.utils.navigateTo({
            pageId: 'product',
            params: {}
          })} variant="outline" className="border-black text-black hover:bg-black hover:text-yellow-500 px-8 py-4 text-lg font-semibold rounded-lg">
              了解更多
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                  <Brain className="w-6 h-6 text-black" />
                </div>
                <span className="ml-2 text-xl font-bold text-yellow-500">AI太极</span>
              </div>
              <p className="text-gray-400">
                融合传统智慧与现代科技，守护您的健康
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-yellow-500">产品</h3>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={() => $w.utils.navigateTo({
                  pageId: 'product',
                  params: {}
                })} className="hover:text-yellow-500">产品介绍</button></li>
                <li><button onClick={() => $w.utils.navigateTo({
                  pageId: 'technology',
                  params: {}
                })} className="hover:text-yellow-500">技术原理</button></li>
                <li><button onClick={() => $w.utils.navigateTo({
                  pageId: 'configurator',
                  params: {}
                })} className="hover:text-yellow-500">定制配置</button></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-yellow-500">服务</h3>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={() => $w.utils.navigateTo({
                  pageId: 'consultation',
                  params: {}
                })} className="hover:text-yellow-500">预约咨询</button></li>
                <li><button onClick={() => $w.utils.navigateTo({
                  pageId: 'business',
                  params: {}
                })} className="hover:text-yellow-500">商务合作</button></li>
                <li><button onClick={() => $w.utils.navigateTo({
                  pageId: 'ai-customer-service',
                  params: {}
                })} className="hover:text-yellow-500">AI客服</button></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-yellow-500">关于</h3>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={() => $w.utils.navigateTo({
                  pageId: 'about',
                  params: {}
                })} className="hover:text-yellow-500">关于我们</button></li>
                <li><button onClick={() => $w.utils.navigateTo({
                  pageId: 'ecosystem',
                  params: {}
                })} className="hover:text-yellow-500">生态系统</button></li>
                <li><button onClick={() => $w.utils.navigateTo({
                  pageId: 'profile',
                  params: {}
                })} className="hover:text-yellow-500">个人中心</button></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; 2025 AI太极SOS Ring. 保留所有权利.</p>
          </div>
        </div>
      </footer>

      {/* AI Chat Widget */}
      <AIChatWidget />
    </div>;
}