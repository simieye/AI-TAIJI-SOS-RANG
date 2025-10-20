// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button } from '@/components/ui';
// @ts-ignore;
import { Menu, X, Home, Package, Cpu, Users, Handshake, User, LogOut, Shield } from 'lucide-react';

import { NotificationBell } from '@/components/NotificationSystem';
export const Navigation = props => {
  const {
    currentPage,
    $w
  } = props;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    // 获取用户信息
    const storedUser = localStorage.getItem('userInfo') || sessionStorage.getItem('userInfo');
    if (storedUser) {
      setUserInfo(JSON.parse(storedUser));
    }
  }, []);
  const navigateTo = pageId => {
    $w.utils.navigateTo({
      pageId,
      params: {}
    });
    setIsMobileMenuOpen(false);
  };
  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userInfo');
    sessionStorage.removeItem('userToken');
    sessionStorage.removeItem('userInfo');
    setUserInfo(null);
    navigateTo('login');
  };
  const navItems = [{
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
    icon: Cpu
  }, {
    id: 'ecosystem',
    label: '生态',
    icon: Users
  }, {
    id: 'business',
    label: '商务',
    icon: Handshake
  }];
  const isActive = pageId => currentPage === pageId;
  return <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button onClick={() => navigateTo('home')} className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-black rounded-full" />
              </div>
              <span className="text-xl font-bold text-white">AI太极</span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map(item => {
            const Icon = item.icon;
            return <button key={item.id} onClick={() => navigateTo(item.id)} className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${isActive(item.id) ? 'bg-yellow-500 text-black' : 'text-gray-300 hover:text-yellow-500'}`}>
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>;
          })}
          </nav>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {userInfo ? <>
                {/* Additional nav items for logged in users */}
                <button onClick={() => navigateTo('configurator')} className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${isActive('configurator') ? 'bg-yellow-500 text-black' : 'text-gray-300 hover:text-yellow-500'}`}>
                  <Package className="w-4 h-4" />
                  <span>配置器</span>
                </button>
                <button onClick={() => navigateTo('consultation')} className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${isActive('consultation') ? 'bg-yellow-500 text-black' : 'text-gray-300 hover:text-yellow-500'}`}>
                  <Users className="w-4 h-4" />
                  <span>咨询</span>
                </button>
                
                {/* 通知铃铛 */}
                <NotificationBell $w={$w} />
                
                {/* User dropdown */}
                <div className="relative group">
                  <button className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-300 hover:text-yellow-500">
                    <User className="w-4 h-4" />
                    <span>{userInfo.name}</span>
                  </button>
                  
                  {/* Dropdown menu */}
                  <div className="absolute right-0 mt-2 w-48 bg-gray-900 border border-gray-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <button onClick={() => navigateTo('profile')} className="w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-yellow-500">
                      <User className="w-4 h-4 inline mr-2" />
                      个人中心
                    </button>
                    <button onClick={() => navigateTo('notifications')} className="w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-yellow-500">
                      <Shield className="w-4 h-4 inline mr-2" />
                      消息中心
                    </button>
                    <button onClick={() => navigateTo('consultation-history')} className="w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-yellow-500">
                      <Shield className="w-4 h-4 inline mr-2" />
                      咨询历史
                    </button>
                    <hr className="border-gray-700 my-1" />
                    <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-red-400 hover:bg-gray-800 hover:text-red-300">
                      <LogOut className="w-4 h-4 inline mr-2" />
                      退出登录
                    </button>
                  </div>
                </div>
              </> : <>
                <Button onClick={() => navigateTo('login')} variant="outline" className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black">
                  登录
                </Button>
                <Button onClick={() => navigateTo('register')} className="bg-yellow-500 hover:bg-yellow-600 text-black">
                  注册
                </Button>
              </>}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-300 hover:text-yellow-500">
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && <div className="md:hidden border-t border-gray-800">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map(item => {
            const Icon = item.icon;
            return <button key={item.id} onClick={() => navigateTo(item.id)} className={`flex items-center space-x-2 w-full px-3 py-2 rounded-lg transition-all ${isActive(item.id) ? 'bg-yellow-500 text-black' : 'text-gray-300 hover:text-yellow-500'}`}>
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>;
          })}
              
              {userInfo && <>
                  <button onClick={() => navigateTo('configurator')} className={`flex items-center space-x-2 w-full px-3 py-2 rounded-lg transition-all ${isActive('configurator') ? 'bg-yellow-500 text-black' : 'text-gray-300 hover:text-yellow-500'}`}>
                    <Package className="w-4 h-4" />
                    <span>配置器</span>
                  </button>
                  <button onClick={() => navigateTo('consultation')} className={`flex items-center space-x-2 w-full px-3 py-2 rounded-lg transition-all ${isActive('consultation') ? 'bg-yellow-500 text-black' : 'text-gray-300 hover:text-yellow-500'}`}>
                    <Users className="w-4 h-4" />
                    <span>咨询</span>
                  </button>
                  <button onClick={() => navigateTo('notifications')} className={`flex items-center space-x-2 w-full px-3 py-2 rounded-lg transition-all ${isActive('notifications') ? 'bg-yellow-500 text-black' : 'text-gray-300 hover:text-yellow-500'}`}>
                    <Shield className="w-4 h-4" />
                    <span>消息中心</span>
                  </button>
                  <button onClick={() => navigateTo('profile')} className={`flex items-center space-x-2 w-full px-3 py-2 rounded-lg transition-all ${isActive('profile') ? 'bg-yellow-500 text-black' : 'text-gray-300 hover:text-yellow-500'}`}>
                    <User className="w-4 h-4" />
                    <span>个人中心</span>
                  </button>
                </>}
              
              {!userInfo ? <>
                  <div className="pt-4 pb-2 border-t border-gray-800">
                    <Button onClick={() => navigateTo('login')} variant="outline" className="w-full border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black mb-2">
                      登录
                    </Button>
                    <Button onClick={() => navigateTo('register')} className="w-full bg-yellow-500 hover:bg-yellow-600 text-black">
                      注册
                    </Button>
                  </div>
                </> : <div className="pt-4 pb-2 border-t border-gray-800">
                  <button onClick={handleLogout} className="w-full text-left px-3 py-2 text-red-400 hover:bg-gray-800 hover:text-red-300 rounded-lg">
                    <LogOut className="w-4 h-4 inline mr-2" />
                    退出登录
                  </button>
                </div>}
            </div>
          </div>}
      </div>
    </header>;
};