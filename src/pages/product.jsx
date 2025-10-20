// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button } from '@/components/ui';
// @ts-ignore;
import { ChevronRight, Shield, Moon, Activity, Cpu, Database, Globe, Zap, Lock } from 'lucide-react';

import { Navigation } from '@/components/Navigation';
export default function Product(props) {
  const {
    $w
  } = props;
  const [activeLayer, setActiveLayer] = useState(0);
  const layers = [{
    name: '传感层',
    icon: Activity,
    description: '多模态生物传感器矩阵'
  }, {
    name: 'AI Edge 计算层',
    icon: Cpu,
    description: 'RISC-V + AI NPU 边缘计算'
  }, {
    name: '决策层',
    icon: Zap,
    description: 'CNN+LSTM 智能决策引擎'
  }, {
    name: '主权数据层',
    icon: Lock,
    description: '端到端加密 + IPFS备份'
  }, {
    name: '生态应用层',
    icon: Globe,
    description: 'IoA 多智能体互联'
  }];
  return <div className="min-h-screen bg-black text-white">
      <Navigation currentPage="product" $w={$w} />

      {/* Hero Section */}
      <section className="py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-center mb-8">
            <span className="text-yellow-500">主权AI × 睡眠优化 × 安全守护</span>
          </h1>
          <p className="text-xl text-gray-300 text-center mb-16 max-w-4xl mx-auto">
            AI太极·SOS RING 智能戒指，融合东方哲学与前沿科技，打造主权AI时代的健康守护节点
          </p>

          {/* Ring 3D Visualization */}
          <div className="relative h-96 mb-16">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <div className="w-64 h-64 rounded-full border-4 border-yellow-500 opacity-30 animate-pulse" />
                <div className="absolute inset-8 rounded-full border-2 border-yellow-400 opacity-50" />
                <div className="absolute inset-16 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-2xl shadow-yellow-500/50" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 bg-black rounded-full flex items-center justify-center">
                    <div className="w-12 h-12 bg-yellow-500 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5-Layer Architecture */}
      <section className="py-24 px-8 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            <span className="text-yellow-500">五层架构</span>
            <br />
            <span className="text-white">从传感到生态的完整技术栈</span>
          </h2>

          <div className="grid md:grid-cols-5 gap-4 mb-16">
            {layers.map((layer, index) => {
            const Icon = layer.icon;
            return <div key={index} className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${activeLayer === index ? 'border-yellow-500 bg-yellow-500/10' : 'border-gray-700 hover:border-yellow-500/50'}`} onClick={() => setActiveLayer(index)}>
                  <Icon className="w-12 h-12 text-yellow-500 mb-4" />
                  <h3 className="text-lg font-bold mb-2">{layer.name}</h3>
                  <p className="text-sm text-gray-400">{layer.description}</p>
                </div>;
          })}
          </div>

          {/* Active Layer Detail */}
          <div className="bg-gray-900 rounded-lg p-8 border border-yellow-500/30">
            <div className="flex items-center mb-6">
              {React.createElement(layers[activeLayer].icon, {
              className: "w-16 h-16 text-yellow-500 mr-6"
            })}
              <div>
                <h3 className="text-3xl font-bold text-yellow-500">{layers[activeLayer].name}</h3>
                <p className="text-gray-300">{layers[activeLayer].description}</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-bold mb-4">核心特性</h4>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center"><ChevronRight className="w-4 h-4 text-yellow-500 mr-2" /> 边缘计算处理</li>
                  <li className="flex items-center"><ChevronRight className="w-4 h-4 text-yellow-500 mr-2" /> 实时数据流</li>
                  <li className="flex items-center"><ChevronRight className="w-4 h-4 text-yellow-500 mr-2" /> 低功耗设计</li>
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-bold mb-4">技术指标</h4>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center"><ChevronRight className="w-4 h-4 text-yellow-500 mr-2" /> 处理速度: 1ms</li>
                  <li className="flex items-center"><ChevronRight className="w-4 h-4 text-yellow-500 mr-2" /> 功耗: &lt;1mW</li>
                  <li className="flex items-center"><ChevronRight className="w-4 h-4 text-yellow-500 mr-2" /> 精度: 99.5%</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Systems */}
      <section className="py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            <span className="text-yellow-500">核心系统</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-900 rounded-lg p-8 border border-gray-800 hover:border-yellow-500/50 transition-colors">
              <Moon className="w-16 h-16 text-yellow-500 mb-6" />
              <h3 className="text-2xl font-bold mb-4">Taiji Sleep Intelligence</h3>
              <p className="text-gray-300 mb-6">
                基于CNN+LSTM深度学习算法，实时分析睡眠周期，智能调节睡眠环境
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>• 睡眠阶段识别准确率 98.7%</li>
                <li>• 实时睡眠质量评分</li>
                <li>• 个性化睡眠建议</li>
                <li>• 智能环境联动控制</li>
              </ul>
            </div>

            <div className="bg-gray-900 rounded-lg p-8 border border-gray-800 hover:border-yellow-500/50 transition-colors">
              <Shield className="w-16 h-16 text-yellow-500 mb-6" />
              <h3 className="text-2xl font-bold mb-4">Taiji Safety Loop</h3>
              <p className="text-gray-300 mb-6">
                EDA压力检测与SOS紧急响应系统，24小时全方位安全守护
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>• 压力水平实时监测</li>
                <li>• 异常状态自动预警</li>
                <li>• 一键SOS紧急呼叫</li>
                <li>• 位置信息精准定位</li>
              </ul>
            </div>

            <div className="bg-gray-900 rounded-lg p-8 border border-gray-800 hover:border-yellow-500/50 transition-colors">
              <Database className="w-16 h-16 text-yellow-500 mb-6" />
              <h3 className="text-2xl font-bold mb-4">Sovereign AI Protocol</h3>
              <p className="text-gray-300 mb-6">
                端到端加密，本地决策，IPFS备份，完全掌控个人健康数据
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>• 军用级端到端加密</li>
                <li>• 本地AI决策引擎</li>
                <li>• IPFS分布式备份</li>
                <li>• 数据主权完全掌控</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-8 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            <span className="text-yellow-500">体验主权AI健康</span>
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            立即预订AI太极·SOS RING，开启智能健康新纪元
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-4 text-lg">
              立即预订
            </Button>
            <Button variant="outline" className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black px-8 py-4 text-lg">
              下载技术白皮书
            </Button>
          </div>
        </div>
      </section>
    </div>;
}