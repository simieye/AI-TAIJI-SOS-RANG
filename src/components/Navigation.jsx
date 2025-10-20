// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button } from '@/components/ui';
// @ts-ignore;
import { Menu, X, Home, Package, Users, MessageCircle, Settings, User, Brain, Bot, ChevronDown } from 'lucide-react';

export function Navigation({
  currentPage,
  $w
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAIChat, setShowAIChat] = useState(false);
  const navigateTo = pageId => {
    $w.utils.navigateTo({
      pageId,
      params: {}
    });
    setIsMobileMenuOpen(false);
  };
  const handleAIChat = () => {
    setShowAIChat(true);
    setIsMobileMenuOpen(false);
  };
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const menuItems = [{
    id: 'home',
    label: '首页',
    icon: Home
  }, {
    id: 'product',
    label: '产品',
    icon: Package
  }, {
    id: 'technology',
    label: '技术',
    icon: Brain
  }, {
    id: 'ecosystem',
    label: '生态',
    icon: Users
  }, {
    id: 'business',
    label: '合作',
    icon: Settings
  }, {
    id: 'consultation',
    label: '咨询',
    icon: MessageCircle
  }];
  return <>
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled ? 'bg-black/90 backdrop-blur-md border-b border-gray-800' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center cursor-pointer" onClick={() => navigateTo('home')}>
              <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center mr-3">
                <div className="w-4 h-4 bg-black rounded-sm"></div>
              </div>
              <span className="text-xl font-bold text-white">AI太极</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {menuItems.map(item => {
              const Icon = item.icon;
              return <button key={item.id} onClick={() => navigateTo(item.id)} className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${currentPage === item.id ? 'text-yellow-500 bg-yellow-500/10' : 'text-gray-300 hover:text-white hover:bg-white/10'}`}>
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>;
            })}
              
              {/* AI Assistant Button */}
              <Button onClick={handleAIChat} className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                <Bot className="w-4 h-4" />
                <span>AI助手</span>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-4">
              {/* AI Assistant Button Mobile */}
              <Button onClick={handleAIChat} size="sm" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white p-2">
                <Bot className="w-4 h-4" />
              </Button>
              
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-300 hover:text-white p-2">
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-gray-800">
            <div className="px-8 py-4 space-y-2">
              {menuItems.map(item => {
            const Icon = item.icon;
            return <button key={item.id} onClick={() => navigateTo(item.id)} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${currentPage === item.id ? 'text-yellow-500 bg-yellow-500/10' : 'text-gray-300 hover:text-white hover:bg-white/10'}`}>
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>;
          })}
            </div>
          </div>}
      </nav>

      {/* AI Chat Dialog */}
      {showAIChat && <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-xl border border-gray-800 w-full max-w-4xl max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-800">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-3">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-yellow-500">AI太极全能助手</h3>
                  <p className="text-sm text-gray-400">智能健康与商业生态顾问</p>
                </div>
              </div>
              <Button onClick={() => setShowAIChat(false)} variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="text-center py-12">
                <Bot className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-4">全能AI助手</h3>
                <p className="text-gray-400 mb-8">
                  集成国内外主流大模型，为您提供产品咨询、技术支持、健康建议、商业合作等全方位服务
                </p>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                  {['GPT-4', 'Claude-3', 'Gemini Pro', 'Qwen Max', 'Baichuan2', 'Yi Large'].map(model => <div key={model} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                      <div className="w-8 h-8 bg-yellow-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <Brain className="w-4 h-4 text-yellow-500" />
                      </div>
                      <p className="text-sm font-medium">{model}</p>
                    </div>)}
                </div>
                
                <Button onClick={() => {
              setShowAIChat(false);
              navigateTo('consultation-chat');
            }} className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-3 rounded-full font-semibold">
                  开始对话
                </Button>
              </div>
            </div>
          </div>
        </div>}
    </>;
}