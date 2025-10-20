// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from '@/components/ui';
// @ts-ignore;
import { ArrowLeft, Eye, EyeOff, User, Lock, Mail, Shield } from 'lucide-react';

// @ts-ignore;
import { useForm } from 'react-hook-form';
// @ts-ignore;

import { Navigation } from '@/components/Navigation';
export default function Login(props) {
  const {
    $w
  } = props;
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const form = useForm();
  const {
    control,
    handleSubmit,
    formState: {
      errors
    }
  } = form;
  const navigateTo = pageId => {
    $w.utils.navigateTo({
      pageId,
      params: {}
    });
  };
  const onSubmit = async data => {
    setIsSubmitting(true);
    try {
      // 模拟登录验证
      await new Promise(resolve => setTimeout(resolve, 1500));

      // 这里应该调用实际的登录API
      // const result = await $w.cloud.callFunction({
      //   name: 'userLogin',
      //   data: { email: data.email, password: data.password }
      // });

      // 模拟登录成功
      const mockUser = {
        userId: 'user_' + Date.now(),
        email: data.email,
        name: 'AI太极用户',
        type: 'user',
        avatarUrl: '',
        permissions: ['read', 'write']
      };

      // 保存登录状态
      if (rememberMe) {
        localStorage.setItem('userToken', 'mock_token_' + Date.now());
        localStorage.setItem('userInfo', JSON.stringify(mockUser));
      } else {
        sessionStorage.setItem('userToken', 'mock_token_' + Date.now());
        sessionStorage.setItem('userInfo', JSON.stringify(mockUser));
      }

      // 跳转到首页
      navigateTo('home');
    } catch (error) {
      console.error('登录失败:', error);
      alert('登录失败，请检查用户名和密码');
    } finally {
      setIsSubmitting(false);
    }
  };
  return <div className="min-h-screen bg-black text-white flex flex-col">
      <Navigation currentPage="login" $w={$w} />

      <div className="flex-1 flex items-center justify-center px-8 py-24">
        <div className="max-w-md w-full">
          {/* Logo and Title */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-12 h-12 text-black" />
            </div>
            <h1 className="text-4xl font-bold mb-4">
              <span className="text-yellow-500">欢迎回来</span>
            </h1>
            <p className="text-xl text-gray-300">
              登录您的AI太极账户
            </p>
          </div>

          {/* Login Form */}
          <div className="bg-gray-900 rounded-lg p-8 border border-gray-800">
            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <FormField control={control} name="email" rules={{
                required: '请输入邮箱地址',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: '请输入有效的邮箱地址'
                }
              }} render={({
                field
              }) => <FormItem>
                    <FormLabel className="text-yellow-500">
                      <Mail className="w-4 h-4 inline mr-2" />
                      邮箱地址
                    </FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="请输入邮箱地址" {...field} className="bg-gray-800 border-gray-700 focus:border-yellow-500 text-white placeholder-gray-500" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>} />

                <FormField control={control} name="password" rules={{
                required: '请输入密码',
                minLength: {
                  value: 6,
                  message: '密码至少需要6个字符'
                }
              }} render={({
                field
              }) => <FormItem>
                    <FormLabel className="text-yellow-500">
                      <Lock className="w-4 h-4 inline mr-2" />
                      密码
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input type={showPassword ? 'text' : 'password'} placeholder="请输入密码" {...field} className="bg-gray-800 border-gray-700 focus:border-yellow-500 text-white placeholder-gray-500 pr-10" />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-yellow-500">
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>} />

                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} className="w-4 h-4 text-yellow-500 bg-gray-800 border-gray-600 rounded focus:ring-yellow-500 focus:ring-2" />
                    <span className="text-sm text-gray-300">记住我</span>
                  </label>
                  <button type="button" className="text-sm text-yellow-500 hover:text-yellow-400">
                    忘记密码？
                  </button>
                </div>

                <Button type="submit" disabled={isSubmitting} className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-4 text-lg">
                  {isSubmitting ? '登录中...' : '登录'}
                </Button>
              </form>
            </Form>

            <div className="mt-8 text-center">
              <p className="text-gray-400 mb-4">
                还没有账户？
              </p>
              <Button onClick={() => navigateTo('register')} variant="outline" className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black w-full">
                立即注册
              </Button>
            </div>
          </div>

          {/* Quick Access */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 mb-4">
              或使用以下方式快速访问
            </p>
            <div className="flex justify-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => navigateTo('home')} className="text-gray-400 hover:text-yellow-500">
                <User className="w-4 h-4 mr-2" />
                访客模式
              </Button>
              <Button variant="ghost" size="sm" onClick={() => navigateTo('consultation')} className="text-gray-400 hover:text-yellow-500">
                <Mail className="w-4 h-4 mr-2" />
                在线咨询
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>;
}