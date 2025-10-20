// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button } from '@/components/ui';
// @ts-ignore;
import { ArrowLeft, RotateCw, Save, Share2, ShoppingCart, Check, Info, Ruler, Palette, Cpu, Heart, Shield, Activity, CheckCircle } from 'lucide-react';

import { Navigation } from '@/components/Navigation';
export default function Configurator(props) {
  const {
    $w
  } = props;
  const [currentStep, setCurrentStep] = useState(0);
  const [configuration, setConfiguration] = useState({
    size: 'medium',
    material: 'titanium',
    color: 'black',
    modules: {
      sleep: true,
      sos: true,
      health: false
    }
  });
  const [totalPrice, setTotalPrice] = useState(299);
  const [isRotating, setIsRotating] = useState(true);
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);
  const [orderId, setOrderId] = useState('');
  const navigateTo = pageId => {
    $w.utils.navigateTo({
      pageId,
      params: {}
    });
  };
  const sizes = [{
    id: 'small',
    label: '小号',
    diameter: '16-18mm',
    circumference: '50-57mm',
    price: 0
  }, {
    id: 'medium',
    label: '中号',
    diameter: '18-20mm',
    circumference: '57-64mm',
    price: 0
  }, {
    id: 'large',
    label: '大号',
    diameter: '20-22mm',
    circumference: '64-71mm',
    price: 0
  }, {
    id: 'xlarge',
    label: '特大号',
    diameter: '22-24mm',
    circumference: '71-78mm',
    price: 50
  }];
  const materials = [{
    id: 'titanium',
    label: '钛合金',
    description: '轻量化，防过敏，适合日常佩戴',
    price: 0,
    color: '#C0C0C0'
  }, {
    id: 'ceramic',
    label: '精密陶瓷',
    description: '高端质感，耐磨耐用',
    price: 100,
    color: '#F5F5F5'
  }, {
    id: 'gold',
    label: '18K黄金',
    description: '奢华材质，保值收藏',
    price: 500,
    color: '#FFD700'
  }, {
    id: 'platinum',
    label: '铂金',
    description: '稀有金属，永恒经典',
    price: 800,
    color: '#E5E4E2'
  }];
  const colors = [{
    id: 'black',
    label: '经典黑',
    description: '深邃神秘，科技感十足',
    price: 0,
    bg: 'bg-black'
  }, {
    id: 'silver',
    label: '太空银',
    description: '未来科技，简约时尚',
    price: 0,
    bg: 'bg-gray-400'
  }, {
    id: 'rose',
    label: '玫瑰金',
    description: '优雅浪漫，温暖时尚',
    price: 50,
    bg: 'bg-rose-400'
  }, {
    id: 'blue',
    label: '深空蓝',
    description: '深邃如海，沉稳大气',
    price: 50,
    bg: 'bg-blue-600'
  }];
  const modules = [{
    id: 'sleep',
    label: '睡眠优化',
    description: 'CNN+LSTM睡眠监测，智能睡眠分析',
    icon: Heart,
    price: 0,
    included: true
  }, {
    id: 'sos',
    label: 'SOS守护',
    description: '紧急呼叫，压力监测，安全守护',
    icon: Shield,
    price: 0,
    included: true
  }, {
    id: 'health',
    label: '健康监测',
    description: '心率血氧，运动追踪，健康报告',
    icon: Activity,
    price: 100,
    included: false
  }];
  const steps = [{
    id: 'size',
    title: '选择尺寸',
    icon: Ruler
  }, {
    id: 'material',
    title: '材质颜色',
    icon: Palette
  }, {
    id: 'modules',
    title: '功能模块',
    icon: Cpu
  }, {
    id: 'preview',
    title: '预览确认',
    icon: Check
  }];
  useEffect(() => {
    calculatePrice();
  }, [configuration]);
  const calculatePrice = () => {
    let price = 299; // 基础价格
    // 尺寸加价
    const sizePrice = sizes.find(s => s.id === configuration.size)?.price || 0;
    price += sizePrice;
    // 材质加价
    const materialPrice = materials.find(m => m.id === configuration.material)?.price || 0;
    price += materialPrice;
    // 颜色加价
    const colorPrice = colors.find(c => c.id === configuration.color)?.price || 0;
    price += colorPrice;
    // 模块加价
    Object.keys(configuration.modules).forEach(moduleId => {
      if (configuration.modules[moduleId]) {
        const modulePrice = modules.find(m => m.id === moduleId)?.price || 0;
        price += modulePrice;
      }
    });
    setTotalPrice(price);
  };
  const updateConfiguration = (key, value) => {
    setConfiguration(prev => ({
      ...prev,
      [key]: value
    }));
  };
  const updateModule = (moduleId, enabled) => {
    setConfiguration(prev => ({
      ...prev,
      modules: {
        ...prev.modules,
        [moduleId]: enabled
      }
    }));
  };
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  const generateOrderId = () => {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substr(2, 8).toUpperCase();
    return `ORDER_${timestamp}_${random}`;
  };
  const generateConfigurationHash = () => {
    const configString = JSON.stringify(configuration);
    let hash = 0;
    for (let i = 0; i < configString.length; i++) {
      const char = configString.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash).toString(16);
  };
  const handleSave = () => {
    localStorage.setItem('ringConfiguration', JSON.stringify(configuration));
    alert('配置已保存！');
  };
  const handleShare = () => {
    const configString = btoa(JSON.stringify(configuration));
    const shareUrl = `${window.location.origin}/configurator?config=${configString}`;
    navigator.clipboard.writeText(shareUrl);
    alert('配置链接已复制到剪贴板！');
  };
  const handleCreateOrder = async () => {
    setIsCreatingOrder(true);
    try {
      // 生成订单ID和配置哈希
      const newOrderId = generateOrderId();
      const configHash = generateConfigurationHash();
      setOrderId(newOrderId);

      // 获取当前用户信息
      const currentUser = $w.auth.currentUser;
      const userId = currentUser?.userId || 'anonymous';
      const userName = currentUser?.nickName || '匿名用户';

      // 获取选中的配置详情
      const selectedSize = sizes.find(s => s.id === configuration.size);
      const selectedMaterial = materials.find(m => m.id === configuration.material);
      const selectedColor = colors.find(c => c.id === configuration.color);
      const selectedModules = modules.filter(m => configuration.modules[m.id]);

      // 计算价格明细
      const basePrice = 299;
      const sizePrice = selectedSize?.price || 0;
      const materialPrice = selectedMaterial?.price || 0;
      const colorPrice = selectedColor?.price || 0;
      const modulesPrice = selectedModules.reduce((sum, m) => sum + (m.price || 0), 0);

      // 准备订单数据
      const orderData = {
        order_id: newOrderId,
        user_id: userId,
        user_name: userName,
        user_phone: currentUser?.phone || '',
        user_email: currentUser?.email || '',
        product_name: 'AI太极·SOS RING 智能戒指',
        configuration: configuration,
        size_info: {
          id: selectedSize?.id,
          label: selectedSize?.label,
          diameter: selectedSize?.diameter,
          circumference: selectedSize?.circumference,
          price: sizePrice
        },
        material_info: {
          id: selectedMaterial?.id,
          label: selectedMaterial?.label,
          description: selectedMaterial?.description,
          price: materialPrice,
          color: selectedMaterial?.color
        },
        color_info: {
          id: selectedColor?.id,
          label: selectedColor?.label,
          description: selectedColor?.description,
          price: colorPrice,
          bg: selectedColor?.bg
        },
        modules_info: selectedModules.map(m => ({
          id: m.id,
          label: m.label,
          description: m.description,
          price: m.price,
          included: m.included
        })),
        base_price: basePrice,
        size_price: sizePrice,
        material_price: materialPrice,
        color_price: colorPrice,
        modules_price: modulesPrice,
        total_price: totalPrice,
        currency: 'USD',
        order_status: 'pending',
        payment_status: 'pending',
        payment_method: '',
        shipping_address: {},
        billing_address: {},
        estimated_delivery: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        // 14天后
        production_days: 10,
        configuration_hash: configHash,
        notes: '',
        source: 'configurator'
      };

      // 调用数据源创建订单
      const result = await $w.cloud.callDataSource({
        dataSourceName: 'product_configuration_order',
        methodName: 'wedaCreateV2',
        params: {
          data: orderData
        }
      });
      console.log('订单创建成功:', result);

      // 跳转到订单确认页面
      navigateTo('order-confirmation');
    } catch (error) {
      console.error('创建订单失败:', error);
      alert('创建订单失败，请稍后重试');
    } finally {
      setIsCreatingOrder(false);
    }
  };
  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <div className="space-y-6">
            <h3 className="text-2xl font-bold text-yellow-500 mb-6">选择戒指尺寸</h3>
            <div className="bg-gray-800 rounded-lg p-6 mb-6">
              <h4 className="font-bold mb-4">如何测量尺寸？</h4>
              <ol className="space-y-2 text-gray-300">
                <li>1. 使用软尺测量手指周长</li>
                <li>2. 或用细线绕手指一圈后测量长度</li>
                <li>3. 对照下方尺寸表选择合适尺寸</li>
              </ol>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {sizes.map(size => <div key={size.id} onClick={() => updateConfiguration('size', size.id)} className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${configuration.size === size.id ? 'border-yellow-500 bg-yellow-500/10' : 'border-gray-700 hover:border-gray-600'}`}>
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-bold text-lg">{size.label}</h4>
                    {configuration.size === size.id && <Check className="w-6 h-6 text-yellow-500" />}
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="text-gray-400">直径: {size.diameter}</div>
                    <div className="text-gray-400">周长: {size.circumference}</div>
                    {size.price > 0 && <div className="text-yellow-500">+${size.price}</div>}
                  </div>
                </div>)}
            </div>
          </div>;
      case 1:
        return <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-yellow-500 mb-6">选择材质</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {materials.map(material => <div key={material.id} onClick={() => updateConfiguration('material', material.id)} className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${configuration.material === material.id ? 'border-yellow-500 bg-yellow-500/10' : 'border-gray-700 hover:border-gray-600'}`}>
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-bold text-lg">{material.label}</h4>
                      {configuration.material === material.id && <Check className="w-6 h-6 text-yellow-500" />}
                    </div>
                    <p className="text-gray-300 text-sm mb-3">{material.description}</p>
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded-full mr-2" style={{
                    backgroundColor: material.color
                  }} />
                      {material.price > 0 ? <span className="text-yellow-500">+${material.price}</span> : <span className="text-gray-400">标准配置</span>}
                    </div>
                  </div>)}
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-yellow-500 mb-6">选择颜色</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {colors.map(color => {
                const isSelected = configuration.color === color.id;
                const cardClass = `p-6 rounded-lg border-2 cursor-pointer transition-all ${isSelected ? 'border-yellow-500 bg-yellow-500/10' : 'border-gray-700 hover:border-gray-600'}`;
                return <div key={color.id} onClick={() => updateConfiguration('color', color.id)} className={cardClass}>
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-bold text-lg">{color.label}</h4>
                      {isSelected && <Check className="w-6 h-6 text-yellow-500" />}
                    </div>
                    <p className="text-gray-300 text-sm mb-3">{color.description}</p>
                    <div className="flex items-center">
                      <div className={`w-6 h-6 rounded-full mr-2 ${color.bg}`} />
                      {color.price > 0 ? <span className="text-yellow-500">+${color.price}</span> : <span className="text-gray-400">标准配置</span>}
                    </div>
                  </div>;
              })}
              </div>
            </div>
          </div>;
      case 2:
        return <div className="space-y-6">
            <h3 className="text-2xl font-bold text-yellow-500 mb-6">选择功能模块</h3>
            <div className="space-y-4">
              {modules.map(module => {
              const Icon = module.icon;
              const isEnabled = configuration.modules[module.id];
              return <div key={module.id} onClick={() => !module.included && updateModule(module.id, !isEnabled)} className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${isEnabled ? 'border-yellow-500 bg-yellow-500/10' : 'border-gray-700 hover:border-gray-600'} ${module.included ? 'opacity-75' : ''}`}>
                  <div className="flex items-start">
                    <Icon className="w-8 h-8 text-yellow-500 mr-4 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-lg">{module.label}</h4>
                        <div className="flex items-center">
                          {module.included && <span className="text-xs bg-green-500 text-black px-2 py-1 rounded mr-2">标配</span>}
                          {isEnabled && <Check className="w-6 h-6 text-yellow-500" />}
                        </div>
                      </div>
                      <p className="text-gray-300 text-sm mb-2">{module.description}</p>
                      <div>
                        {module.price > 0 ? <span className="text-yellow-500">+${module.price}</span> : <span className="text-gray-400">包含在基础价格中</span>}
                      </div>
                    </div>
                  </div>
                </div>;
            })}
            </div>
            <div className="bg-gray-800 rounded-lg p-6">
              <h4 className="font-bold mb-3 flex items-center">
                <Info className="w-5 h-5 text-yellow-500 mr-2" />
                功能说明
              </h4>
              <div className="space-y-2 text-sm text-gray-300">
                <p>• <strong>睡眠优化：</strong>采用CNN+LSTM算法，睡眠识别准确率98.7%</p>
                <p>• <strong>SOS守护：</strong>EDA压力检测，一键紧急呼叫，24小时安全守护</p>
                <p>• <strong>健康监测：</strong>实时心率血氧监测，运动数据追踪，AI健康报告</p>
              </div>
            </div>
          </div>;
      case 3:
        return <div className="space-y-8">
            <h3 className="text-2xl font-bold text-yellow-500 mb-6">配置确认</h3>
            <div className="bg-gray-900 rounded-lg p-8 border border-gray-800">
              <h4 className="font-bold mb-6">您的配置</h4>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">尺寸</span>
                  <span>{sizes.find(s => s.id === configuration.size)?.label}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">材质</span>
                  <span>{materials.find(m => m.id === configuration.material)?.label}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">颜色</span>
                  <span>{colors.find(c => c.id === configuration.color)?.label}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">功能模块</span>
                  <span>{Object.keys(configuration.modules).filter(id => configuration.modules[id]).map(id => modules.find(m => m.id === id)?.label).join(', ')}</span>
                </div>
              </div>
            </div>
            <div className="bg-gray-900 rounded-lg p-8 border border-gray-800">
              <h4 className="font-bold mb-6">价格明细</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">基础价格</span>
                  <span>$299</span>
                </div>
                {sizes.find(s => s.id === configuration.size)?.price > 0 && <div className="flex justify-between">
                    <span className="text-gray-400">尺寸加价</span>
                    <span className="text-yellow-500">+${sizes.find(s => s.id === configuration.size)?.price}</span>
                  </div>}
                {materials.find(m => m.id === configuration.material)?.price > 0 && <div className="flex justify-between">
                    <span className="text-gray-400">材质加价</span>
                    <span className="text-yellow-500">+${materials.find(m => m.id === configuration.material)?.price}</span>
                  </div>}
                {colors.find(c => c.id === configuration.color)?.price > 0 && <div className="flex justify-between">
                    <span className="text-gray-400">颜色加价</span>
                    <span className="text-yellow-500">+${colors.find(c => c.id === configuration.color)?.price}</span>
                  </div>}
                {Object.keys(configuration.modules).filter(id => configuration.modules[id]).map(id => {
                const module = modules.find(m => m.id === id);
                return module && module.price > 0 ? <div key={id} className="flex justify-between">
                      <span className="text-gray-400">{module.label}</span>
                      <span className="text-yellow-500">+${module.price}</span>
                    </div> : null;
              })}
                <div className="border-t border-gray-700 pt-3">
                  <div className="flex justify-between text-xl font-bold">
                    <span className="text-yellow-500">总计</span>
                    <span className="text-yellow-500">${totalPrice}</span>
                  </div>
                </div>
              </div>
            </div>
            {orderId && <div className="bg-green-900/20 border border-green-500/50 rounded-lg p-4">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  <span className="text-green-500">订单已创建，订单号：{orderId}</span>
                </div>
              </div>}
          </div>;
      default:
        return null;
    }
  };
  return <div className="min-h-screen bg-black text-white">
      <Navigation currentPage="configurator" $w={$w} />

      <div className="max-w-7xl mx-auto px-8 py-24">
        {/* Header */}
        <div className="mb-8">
          <button onClick={() => navigateTo('product')} className="flex items-center text-gray-400 hover:text-yellow-500 transition-colors mb-4">
            <ArrowLeft className="w-5 h-5 mr-2" />
            返回产品页
          </button>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-yellow-500">AI太极·SOS RING</span>
            <br />
            <span className="text-white">产品配置器</span>
          </h1>
          <p className="text-xl text-gray-300">
            定制您的专属智能戒指，打造个性化健康守护
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;
            return <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all ${isActive ? 'border-yellow-500 bg-yellow-500 text-black' : isCompleted ? 'border-green-500 bg-green-500 text-black' : 'border-gray-700 text-gray-500'}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="ml-3">
                  <div className={`font-medium ${isActive ? 'text-yellow-500' : isCompleted ? 'text-green-500' : 'text-gray-500'}`}>
                    {step.title}
                  </div>
                </div>
                {index < steps.length - 1 && <div className={`flex-1 h-1 mx-4 ${isCompleted ? 'bg-green-500' : 'bg-gray-700'}`} />}
              </div>;
          })}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Configuration Panel */}
          <div>
            <div className="bg-gray-900 rounded-lg p-8 border border-gray-800">
              {renderStepContent()}
            </div>
          </div>

          {/* 3D Preview Panel */}
          <div>
            <div className="bg-gray-900 rounded-lg p-8 border border-gray-800 sticky top-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-yellow-500">3D预览</h3>
                <button onClick={() => setIsRotating(!isRotating)} className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                  <RotateCw className={`w-5 h-5 text-yellow-500 ${isRotating ? 'animate-spin' : ''}`} />
                </button>
              </div>
              
              {/* 3D Ring Preview */}
              <div className="relative h-80 flex items-center justify-center mb-6">
                <div className="relative">
                  {/* Ring Shadow */}
                  <div className="absolute inset-0 w-48 h-48 bg-yellow-500/20 rounded-full blur-xl" />
                  
                  {/* Ring Body */}
                  <div className={`relative w-48 h-48 rounded-full border-8 ${configuration.color === 'black' ? 'border-black' : configuration.color === 'silver' ? 'border-gray-400' : configuration.color === 'rose' ? 'border-rose-400' : 'border-blue-600'} ${isRotating ? 'animate-spin' : ''}`} style={{
                  animationDuration: '10s',
                  boxShadow: `0 0 30px ${configuration.color === 'black' ? '#000000' : configuration.color === 'silver' ? '#9CA3AF' : configuration.color === 'rose' ? '#F87171' : '#2563EB'}40`
                }}>
                    {/* Inner Ring */}
                    <div className="absolute inset-4 rounded-full border-4 border-gray-800" />
                    
                    {/* Center Gem */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full shadow-lg shadow-yellow-500/50" />
                    </div>
                    
                    {/* Material Effect */}
                    {configuration.material === 'gold' && <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-600/30 to-transparent" />}
                    {configuration.material === 'platinum' && <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-300/30 to-transparent" />}
                    {configuration.material === 'ceramic' && <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent" />}
                  </div>
                </div>
              </div>

              {/* Configuration Summary */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">尺寸</span>
                  <span>{sizes.find(s => s.id === configuration.size)?.label}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">材质</span>
                  <span>{materials.find(m => m.id === configuration.material)?.label}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">颜色</span>
                  <span>{colors.find(c => c.id === configuration.color)?.label}</span>
                </div>
              </div>

              {/* Price Display */}
              <div className="bg-gray-800 rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">总价</span>
                  <span className="text-3xl font-bold text-yellow-500">${totalPrice}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <Button onClick={handleSave} variant="outline" className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black">
                    <Save className="w-4 h-4 mr-2" />
                    保存配置
                  </Button>
                  <Button onClick={handleShare} variant="outline" className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black">
                    <Share2 className="w-4 h-4 mr-2" />
                    分享
                  </Button>
                </div>
                {currentStep === steps.length - 1 ? <Button onClick={handleCreateOrder} disabled={isCreatingOrder} className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold">
                    {isCreatingOrder ? '创建订单中...' : orderId ? '查看订单' : '立即购买'}
                    <ShoppingCart className="w-5 h-5 ml-2" />
                  </Button> : <div className="grid grid-cols-2 gap-3">
                    <Button onClick={handlePrevious} disabled={currentStep === 0} variant="outline" className="border-gray-700 text-gray-400 hover:border-gray-600 hover:text-white">
                      上一步
                    </Button>
                    <Button onClick={handleNext} className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold">
                      下一步
                    </Button>
                  </div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
}