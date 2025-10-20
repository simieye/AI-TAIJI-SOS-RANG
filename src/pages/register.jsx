// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';
// @ts-ignore;
import { ArrowLeft, Eye, EyeOff, User, Lock, Mail, Shield, CheckCircle } from 'lucide-react';

// @ts-ignore;
import { useForm } from 'react-hook-form';
// @ts-ignore;

import { Navigation } from '@/components/Navigation';
export default function Register(props) {
  const {
    $w
  } = props;
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const form = useForm();
  const {
    control,
    handleSubmit,
    formState: {
      errors
    },
    watch
  } = form;
  const password = watch('password');
  const navigateTo = pageId => {
    $w.utils.navigateTo({
      pageId,
      params: {}
    });
  };
  const userTypes = [{
    value: 'user',
    label: '普通用户',
    description: '购买产品，享受健康服务'
  }, {
    value: 'partner',
    label: '合作伙伴',
    description: '渠道合作，商业推广'
  }, {
    value: 'developer',
    label: '开发者',
    description: '技术集成，API接入'
  }, {
    value: 'investor',
    label: '投资者',
    description: '投资合作，项目洽谈'
  }];
  const onSubmit = async data => {
    if (!agreedToTerms) {
      alert('请同意服务条款和隐私政策');
      return;
    }
    setIsSubmitting(true);
    try {
      // 模拟注册验证
      await new Promise(resolve => setTimeout(resolve, 2000));

      // 这里应该调用实际的注册API
      // const result = await $w.cloud.callFunction({
      //   name: 'userRegister',
      //   data: { 
      //     email: data.email,
      //     password: data.password,
      //     name: data.name,
      //     phone: data.phone,
      //     type: data.type
      //   }
      // });

      // 模拟注册成功
      const mockUser = {
        userId: 'user_' + Date.now(),
        email: data.email,
        name: data.name,
        phone: data.phone,
        type: data.type,
        avatarUrl: '',
        permissions: data.type === 'partner' ? ['read', 'write', 'admin'] : ['read', 'write'],
        createdAt: new Date().toISOString()
      };

      // 保存用户信息
      localStorage.setItem('userToken', 'mock_token_' + Date.now());
      localStorage.setItem('userInfo', JSON.stringify(mockUser));

      // 跳转到首页
      navigateTo('home');
    } catch (error) {
      console.error('注册失败:', error);
      alert('注册失败，请稍后重试');
    } finally {
      setIsSubmitting(false);
    }
  };
  return <div className="min-h-screen bg-black text-white flex flex-col">
      <Navigation currentPage="register" $w={$w} />

      <div className="flex-1 flex items-center justify-center px-8 py-24">
        <div className="max-w-md w-full">
          {/* Logo and Title */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <User className="w-12 h-12 text-black" />
            </div>
            <h1 className="text-4xl font-bold mb-4">
              <span className="text-yellow-500">创建账户</span>
            </h1>
            <p className="text-xl text-gray-300">
              加入AI太极，开启智能健康生活
            </p>
          </div>

          {/* Register Form */}
          <div className="bg-gray-900 rounded-lg p-8 border border-gray-800">
            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <FormField control={control} name="name" rules={{
                required: '请输入姓名',
                minLength: {
                  value: 2,
                  message: '姓名至少需要2个字符'
                }
              }} render={({
                field
              }) => <FormItem>
                    <FormLabel className="text-yellow-500">
                      <User className="w-4 h-4 inline mr-2" />
                      姓名
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="请输入您的姓名" {...field} className="bg-gray-800 border-gray-700 focus:border-yellow-500 text-white placeholder-gray-500" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>} />

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

                <FormField control={control} name="phone" rules={{
                required: '请输入手机号码',
                pattern: {
                  value: /^1[3-9]\d{9}$/,
                  message: '请输入有效的手机号码'
                }
              }} render={({
                field
              }) => <FormItem>
                    <FormLabel className="text-yellow-500">
                      <Shield className="w-4 h-4 inline mr-2" />
                      手机号码
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="请输入手机号码" {...field} className="bg-gray-800 border-gray-700 focus:border-yellow-500 text-white placeholder-gray-500" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>} />

                <FormField control={control} name="type" rules={{
                required: '请选择用户类型'
              }} render={({
                field
              }) => <FormItem>
                    <FormLabel className="text-yellow-500">
                      <Shield className="w-4 h-4 inline mr-2" />
                      用户类型
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-gray-800 border-gray-700 focus:border-yellow-500 text-white">
                          <SelectValue placeholder="请选择用户类型" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        {userTypes.map(type => <SelectItem key={type.value} value={type.value} className="text-white hover:bg-gray-700">
                            <div>
                              <div className="font-medium">{type.label}</div>
                              <div className="text-xs text-gray-400">{type.description}</div>
                            </div>
                          </SelectItem>)}
                      </SelectContent>
                    </Select>
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

                <FormField control={control} name="confirmPassword" rules={{
                required: '请确认密码',
                validate: value => value === password || '两次输入的密码不一致'
              }} render={({
                field
              }) => <FormItem>
                    <FormLabel className="text-yellow-500">
                      <Lock className="w-4 h-4 inline mr-2" />
                      确认密码
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input type={showConfirmPassword ? 'text' : 'password'} placeholder="请再次输入密码" {...field} className="bg-gray-800 border-gray-700 focus:border-yellow-500 text-white placeholder-gray-500 pr-10" />
                        <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-yellow-500">
                          {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>} />

                <div className="space-y-4">
                  <label className="flex items-start space-x-2 cursor-pointer">
                    <input type="checkbox" checked={agreedToTerms} onChange={e => setAgreedToTerms(e.target.checked)} className="w-4 h-4 text-yellow-500 bg-gray-800 border-gray-600 rounded focus:ring-yellow-500 focus:ring-2 mt-1" />
                    <span className="text-sm text-gray-300">
                      我已阅读并同意
                      <button type="button" className="text-yellow-500 hover:text-yellow-400 mx-1">
                        服务条款
                      </button>
                      和
                      <button type="button" className="text-yellow-500 hover:text-yellow-400 mx-1">
                        隐私政策
                      </button>
                    </span>
                  </label>
                </div>

                <Button type="submit" disabled={isSubmitting} className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-4 text-lg">
                  {isSubmitting ? '注册中...' : '创建账户'}
                </Button>
              </form>
            </Form>

            <div className="mt-8 text-center">
              <p className="text-gray-400 mb-4">
                已有账户？
              </p>
              <Button onClick={() => navigateTo('login')} variant="outline" className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black w-full">
                立即登录
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>;
}