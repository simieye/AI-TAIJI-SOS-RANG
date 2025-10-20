// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Textarea } from '@/components/ui';
// @ts-ignore;
import { ArrowLeft, Send, Phone, Mail, User, FileText, CheckCircle } from 'lucide-react';

// @ts-ignore;
import { useForm } from 'react-hook-form';
// @ts-ignore;

import { Navigation } from '@/components/Navigation';
export default function ConsultationForm(props) {
  const {
    $w
  } = props;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [consultationId, setConsultationId] = useState('');
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
  const consultationTypes = [{
    value: 'product',
    label: '产品咨询'
  }, {
    value: 'technical',
    label: '技术支持'
  }, {
    value: 'health',
    label: '健康咨询'
  }, {
    value: 'partnership',
    label: '合作洽谈'
  }, {
    value: 'other',
    label: '其他咨询'
  }];
  const generateConsultationId = () => {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substr(2, 6);
    return `CONS_${timestamp}_${random}`;
  };
  const onSubmit = async data => {
    setIsSubmitting(true);
    try {
      // 生成咨询ID
      const newConsultationId = generateConsultationId();
      setConsultationId(newConsultationId);

      // 获取当前用户信息
      const currentUser = $w.auth.currentUser;
      const userId = currentUser?.userId || 'anonymous';
      const userName = data.name || currentUser?.nickName || '匿名用户';

      // 准备咨询记录数据
      const consultationData = {
        consultation_id: newConsultationId,
        user_id: userId,
        user_name: userName,
        user_phone: data.contact,
        user_email: data.email || '',
        consultation_type: data.type,
        consultation_subject: data.subject,
        consultation_content: data.description,
        consultation_channel: 'form',
        status: 'pending',
        priority: 'normal',
        consultant_id: '',
        consultant_name: '',
        consultation_time: new Date().getTime(),
        response_time: null,
        completion_time: null,
        message_count: 1,
        satisfaction_rating: null,
        feedback: '',
        tags: [data.type],
        internal_notes: '',
        source: 'website'
      };

      // 调用数据源创建咨询记录
      const result = await $w.cloud.callDataSource({
        dataSourceName: 'consultation_record',
        methodName: 'wedaCreateV2',
        params: {
          data: consultationData
        }
      });
      console.log('咨询记录创建成功:', result);
      setIsSubmitted(true);
    } catch (error) {
      console.error('提交失败:', error);
      alert('提交失败，请稍后重试');
    } finally {
      setIsSubmitting(false);
    }
  };
  if (isSubmitted) {
    return <div className="min-h-screen bg-black text-white">
        <Navigation currentPage="consultation" $w={$w} />
        <div className="max-w-2xl mx-auto px-8 py-24">
          <div className="bg-gray-900 rounded-lg p-12 border border-gray-800 text-center">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-black" />
            </div>
            <h2 className="text-3xl font-bold mb-4 text-yellow-500">提交成功</h2>
            <p className="text-gray-300 mb-4">
              感谢您的咨询！我们已收到您的信息，将在24小时内回复您。
            </p>
            <p className="text-sm text-gray-400 mb-8">
              咨询编号：{consultationId}
            </p>
            <div className="space-y-4">
              <Button onClick={() => navigateTo('consultation')} className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-4 text-lg w-full">
                返回咨询中心
              </Button>
              <Button variant="outline" onClick={() => navigateTo('consultation-chat')} className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black px-8 py-4 text-lg w-full">
                开始实时聊天
              </Button>
            </div>
          </div>
        </div>
      </div>;
  }
  return <div className="min-h-screen bg-black text-white">
      <Navigation currentPage="consultation" $w={$w} />

      <div className="max-w-4xl mx-auto px-8 py-24">
        {/* Header */}
        <div className="mb-8">
          <button onClick={() => navigateTo('consultation')} className="flex items-center text-gray-400 hover:text-yellow-500 transition-colors mb-4">
            <ArrowLeft className="w-5 h-5 mr-2" />
            返回咨询中心
          </button>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-yellow-500">在线咨询表单</span>
          </h1>
          <p className="text-xl text-gray-300">
            请详细填写您的咨询信息，我们将为您提供专业的解答
          </p>
        </div>

        {/* Quick Contact */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <div className="flex items-center mb-4">
              <Phone className="w-6 h-6 text-yellow-500 mr-3" />
              <h3 className="font-bold">电话咨询</h3>
            </div>
            <p className="text-gray-300 mb-2">400-888-9999</p>
            <p className="text-sm text-gray-400">工作时间：9:00-21:00</p>
          </div>
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <div className="flex items-center mb-4">
              <Mail className="w-6 h-6 text-yellow-500 mr-3" />
              <h3 className="font-bold">邮件咨询</h3>
            </div>
            <p className="text-gray-300 mb-2">support@aitaiji.com</p>
            <p className="text-sm text-gray-400">24小时内回复</p>
          </div>
        </div>

        {/* Consultation Form */}
        <div className="bg-gray-900 rounded-lg p-8 border border-gray-800">
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <FormField control={control} name="name" rules={{
                required: '请输入您的姓名'
              }} render={({
                field
              }) => <FormItem>
                    <FormLabel className="text-yellow-500">
                      <User className="w-4 h-4 inline mr-2" />
                      姓名 *
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="请输入您的姓名" {...field} className="bg-gray-800 border-gray-700 focus:border-yellow-500 text-white placeholder-gray-500" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>} />

                <FormField control={control} name="contact" rules={{
                required: '请输入联系方式',
                pattern: {
                  value: /^1[3-9]\d{9}$/,
                  message: '请输入有效的手机号码'
                }
              }} render={({
                field
              }) => <FormItem>
                    <FormLabel className="text-yellow-500">
                      <Phone className="w-4 h-4 inline mr-2" />
                      联系方式 *
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="请输入手机号码" {...field} className="bg-gray-800 border-gray-700 focus:border-yellow-500 text-white placeholder-gray-500" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>} />
              </div>

              <FormField control={control} name="email" rules={{
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
                    <Input placeholder="请输入邮箱地址（选填）" {...field} className="bg-gray-800 border-gray-700 focus:border-yellow-500 text-white placeholder-gray-500" />
                  </FormControl>
                  <FormMessage />
                </FormItem>} />

              <FormField control={control} name="type" rules={{
              required: '请选择咨询类型'
            }} render={({
              field
            }) => <FormItem>
                  <FormLabel className="text-yellow-500">
                    <FileText className="w-4 h-4 inline mr-2" />
                    咨询类型 *
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-gray-800 border-gray-700 focus:border-yellow-500 text-white">
                        <SelectValue placeholder="请选择咨询类型" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      {consultationTypes.map(type => <SelectItem key={type.value} value={type.value} className="text-white hover:bg-gray-700">
                          {type.label}
                        </SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>} />

              <FormField control={control} name="subject" rules={{
              required: '请输入咨询主题'
            }} render={({
              field
            }) => <FormItem>
                  <FormLabel className="text-yellow-500">咨询主题 *</FormLabel>
                  <FormControl>
                    <Input placeholder="请简要描述您的咨询主题" {...field} className="bg-gray-800 border-gray-700 focus:border-yellow-500 text-white placeholder-gray-500" />
                  </FormControl>
                  <FormMessage />
                </FormItem>} />

              <FormField control={control} name="description" rules={{
              required: '请详细描述您的问题',
              minLength: {
                value: 10,
                message: '问题描述至少需要10个字符'
              }
            }} render={({
              field
            }) => <FormItem>
                  <FormLabel className="text-yellow-500">问题描述 *</FormLabel>
                  <FormControl>
                    <Textarea placeholder="请详细描述您遇到的问题或需要咨询的内容..." {...field} className="bg-gray-800 border-gray-700 focus:border-yellow-500 text-white placeholder-gray-500 min-h-[120px]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>} />

              <div className="flex gap-4 pt-6">
                <Button type="submit" disabled={isSubmitting} className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-4 text-lg flex-1">
                  {isSubmitting ? '提交中...' : '提交咨询'}
                  <Send className="ml-2 w-5 h-5" />
                </Button>
                <Button type="button" variant="outline" onClick={() => navigateTo('consultation-chat')} className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black px-8 py-4 text-lg">
                  实时聊天
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>;
}