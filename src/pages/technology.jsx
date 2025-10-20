// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Button } from '@/components/ui';
// @ts-ignore;
import { Cpu, Database, Shield, Zap, Lock, Globe, Activity, Brain } from 'lucide-react';

import { Navigation } from '@/components/Navigation';
export default function Technology(props) {
  const {
    $w
  } = props;
  return <div className="min-h-screen bg-black text-white">
      <Navigation currentPage="technology" $w={$w} />

      {/* Hero Section */}
      <section className="py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-center mb-8">
            <span className="text-yellow-500">从「监测设备」到「AI智能体」</span>
          </h1>
          <p className="text-xl text-gray-300 text-center mb-16 max-w-4xl mx-auto">
            技术的目的，是让智能回归身体
          </p>
        </div>
      </section>

      {/* Edge AI Architecture */}
      <section className="py-24 px-8 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            <span className="text-yellow-500">Edge AI 架构图</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="bg-gray-900 rounded-lg p-8 border border-gray-800">
              <Brain className="w-16 h-16 text-yellow-500 mb-6" />
              <h3 className="text-2xl font-bold mb-4">CNN+LSTM 睡眠识别</h3>
              <p className="text-gray-300 mb-6">
                卷积神经网络提取时频特征，长短期记忆网络建模时间序列，实现精准睡眠阶段识别
              </p>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">准确率</span>
                  <span className="text-yellow-500 font-bold">98.7%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">延迟</span>
                  <span className="text-yellow-500 font-bold">&lt;100ms</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">功耗</span>
                  <span className="text-yellow-500 font-bold">0.5mW</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 rounded-lg p-8 border border-gray-800">
              <Activity className="w-16 h-16 text-yellow-500 mb-6" />
              <h3 className="text-2xl font-bold mb-4">EDA 压力检测</h3>
              <p className="text-gray-300 mb-6">
                电皮层活动监测，实时分析压力水平，结合心率变异性评估心理状态
              </p>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">采样率</span>
                  <span className="text-yellow-500 font-bold">1000Hz</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">分辨率</span>
                  <span className="text-yellow-500 font-bold">24-bit</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">噪声</span>
                  <span className="text-yellow-500 font-bold">&lt;1μV</span>
                </div>
              </div>
            </div>
          </div>

          {/* Architecture Flow */}
          <div className="bg-gray-900 rounded-lg p-8 border border-gray-800">
            <h3 className="text-2xl font-bold mb-8 text-center">数据处理流程</h3>
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4">
              <div className="text-center">
                <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center mb-2">
                  <Activity className="w-10 h-10 text-black" />
                </div>
                <p className="text-sm">传感器采集</p>
              </div>
              <div className="text-yellow-500">→</div>
              <div className="text-center">
                <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center mb-2">
                  <Cpu className="w-10 h-10 text-black" />
                </div>
                <p className="text-sm">边缘计算</p>
              </div>
              <div className="text-yellow-500">→</div>
              <div className="text-center">
                <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center mb-2">
                  <Brain className="w-10 h-10 text-black" />
                </div>
                <p className="text-sm">AI分析</p>
              </div>
              <div className="text-yellow-500">→</div>
              <div className="text-center">
                <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center mb-2">
                  <Zap className="w-10 h-10 text-black" />
                </div>
                <p className="text-sm">智能决策</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sovereign AI Data Flow */}
      <section className="py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            <span className="text-yellow-500">主权AI数据流</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-900 rounded-lg p-8 border border-gray-800">
              <Lock className="w-16 h-16 text-yellow-500 mb-6" />
              <h3 className="text-2xl font-bold mb-4">端到端加密</h3>
              <p className="text-gray-300 mb-6">
                采用AES-256加密算法，从传感器到云端全程加密保护
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>• 军用级加密标准</li>
                <li>• 零知识证明验证</li>
                <li>• 密钥本地管理</li>
              </ul>
            </div>

            <div className="bg-gray-900 rounded-lg p-8 border border-gray-800">
              <Cpu className="w-16 h-16 text-yellow-500 mb-6" />
              <h3 className="text-2xl font-bold mb-4">本地决策</h3>
              <p className="text-gray-300 mb-6">
                AI模型在设备端运行，敏感数据无需上传云端，保护隐私
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>• 边缘AI推理</li>
                <li>• 实时响应</li>
                <li>• 离线工作</li>
              </ul>
            </div>

            <div className="bg-gray-900 rounded-lg p-8 border border-gray-800">
              <Database className="w-16 h-16 text-yellow-500 mb-6" />
              <h3 className="text-2xl font-bold mb-4">IPFS备份</h3>
              <p className="text-gray-300 mb-6">
                分布式文件系统备份，数据永久保存，抗审查抗删除
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>• 分布式存储</li>
                <li>• 内容寻址</li>
                <li>• 版本控制</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* AI Chip System */}
      <section className="py-24 px-8 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            <span className="text-yellow-500">AI芯片系统图</span>
          </h2>

          <div className="bg-gray-900 rounded-lg p-8 border border-gray-800">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-32 h-32 mx-auto bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center mb-4">
                  <Cpu className="w-16 h-16 text-black" />
                </div>
                <h3 className="text-xl font-bold mb-2">RISC-V 处理器</h3>
                <p className="text-gray-400 text-sm">开源指令集，低功耗设计</p>
              </div>
              <div className="text-center">
                <div className="w-32 h-32 mx-auto bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center mb-4">
                  <Brain className="w-16 h-16 text-black" />
                </div>
                <h3 className="text-xl font-bold mb-2">AI NPU</h3>
                <p className="text-gray-400 text-sm">神经网络处理单元</p>
              </div>
              <div className="text-center">
                <div className="w-32 h-32 mx-auto bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center mb-4">
                  <Activity className="w-16 h-16 text-black" />
                </div>
                <h3 className="text-xl font-bold mb-2">传感矩阵</h3>
                <p className="text-gray-400 text-sm">多模态生物传感器</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            <span className="text-yellow-500">探索技术细节</span>
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            下载完整技术文档，深入了解AI太极的技术架构
          </p>
          <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-4 text-lg">
            下载技术白皮书
          </Button>
        </div>
      </section>
    </div>;
}