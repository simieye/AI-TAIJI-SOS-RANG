// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button } from '@/components/ui';
// @ts-ignore;
import { ChevronRight, Shield, Moon, Activity, Cpu, Database, Globe, Zap, Lock, Download, FileText, Calendar, User, Mail, CheckCircle } from 'lucide-react';

import { Navigation } from '@/components/Navigation';
export default function Product(props) {
  const {
    $w
  } = props;
  const [activeLayer, setActiveLayer] = useState(0);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [downloadStarted, setDownloadStarted] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  // 白皮书内容
  const whitepaperContent = `AI太极·SOS RING 智能戒指产品白皮书（v1.0）

封面页
AI太极·SOS RING 智能戒指白皮书
 主权AI × 睡眠优化 × 安全守护
 ©2025 AI Taiji Co., Ltd. – Shenzhen | info@aitaiji.com

1. 产品愿景与使命
AI太极致力于打造"主权AI时代的人机共生节点"。
 SOS Ring 不仅是可穿戴设备，更是 AI 太极生态的 个人智能体终端（Personal AI Node）。
 它以"阴阳平衡"的哲学，融合 AI算法、传感科学与边缘智能，实现对人体状态的感知、理解与守护。
核心使命：
让每个用户都能拥有属于自己的主权AI健康体，实现"睡得更好、活得更安全"。

2. 市场背景与行业机遇
全球智能戒指市场趋势
2025年全球智能戒指市场规模预计达 42亿美元（CAGR 28%）。

健康+安全双功能产品需求迅速上升，尤其在睡眠健康、女性健康与老年安全领域。

用户需求从"被动监测"转向"AI主动干预与预测"。

技术转折点
边缘AI芯片功耗降低50%，支持本地推理；

多模态传感器可在5mm空间内整合心率、体温与运动信号；

IoA协议（Internet of Agents）使智能体互联成为现实。

3. 产品定义与核心价值
产品定义
AI太极·SOS RING 是一款融合 AI 睡眠优化、健康监测、应急守护与主权AI计算 的智能戒指。
 它可独立完成生理感知、AI算法推理与数据安全传输，构成AI太极OS的关键边缘节点。
核心价值
模块
用户价值
技术价值
睡眠优化
深睡比例↑20%，疲劳预测
多模态AI融合（PPG+EDA+IMU）
安全守护
自动SOS触发，零延迟响应
边缘AI检测+主权加密信道
数据主权
用户完全掌控
Web3数据所有权 + 私域边缘存储
智能协作
IoA生态互联
与AI太极OS智能体实时同步

4. 系统总览（系统架构图）
┌────────────────────────────────────┐
│           AI太极·SOS RING 系统总览图                │
├────────────────────────────────────┤
│ ① 传感器层：PPG / EDA / 体温 / IMU / GSR          │
│ ② 边缘AI层：小可大模型Edge版 + TaijiOS轻节点         │
│ ③ 通信层：BLE 5.2 + Web3安全信道 + NFC接口           │
│ ④ 主权数据层：本地数据库 + IPFS去中心化备份          │
│ ⑤ 应用层：AI太极App / 医疗API / 企业健康控制台        │
└────────────────────────────────────┘

5. 功能分层与算法流程
功能分层
感知层：实时采集 HR、SpO₂、皮肤温度、EDA、运动。

计算层：AI太极Edge OS执行轻量模型（CNN-LSTM），离线判定睡眠分期。

决策层：AI智能体判断状态 → 触发提示或SOS。

联动层：同步至AI太极OS生态，与智能家居或医疗系统协作。

算法流程（伪代码概览）
if HRV < threshold and EDA↑:
    sleep_stage = 'Deep'
elif motion↑ and HRV irregular:
    sleep_stage = 'REM'
if abnormal(HR < 40 or >120):
    trigger_SOS()

6. 硬件架构与创新点
模块
规格
创新
主芯片
RISC-V + NPU AI加速
支持本地推理与学习
传感器阵列
PPG+EDA+温度+IMU
5合1低功耗阵列设计
通信接口
BLE 5.2 / NFC / USB-C Dock
双模节能连接
电池续航
7–10天
动态采样节能策略
材质设计
钛合金+陶瓷内环
兼顾导热与抗敏性能
充电系统
无线Qi标准
30分钟快充

7. AI架构与主权数据流
AI太极·SOS RING AI架构图（文字版）
输入：多模态信号 → 特征提取（HRV, SpO₂, Temp, Motion）
    ↓
边缘AI模型（CNN+LSTM）
    ↓
输出1：睡眠分期预测（Wake/Light/Deep/REM）
输出2：压力与异常检测（EDA模式）
    ↓
Agent决策：触发提示或SOS链路
    ↓
数据上报：加密签名 → 用户App → AI太极主权节点

8. 应用生态与行业场景
行业
场景
集成方式
医疗
睡眠障碍监测
与医院AI太极节点对接
企业
员工健康管理
健康仪表盘 + 数据脱敏
运动
恢复与训练AI优化
同步至健身Agent
家居
智能卧室联动
与灯光/空调系统通信
政府与养老
SOS自动报警
匿名健康监控网关

9. 数据安全与主权AI机制
端到端加密 (AES-256 + IPFS Hash)

零信任访问控制

Web3主权凭证（NFT健康档案）

AI太极隐私治理协议 (Taiji Privacy Loop)

数据驻留可选：本地 / 云端 / DAO节点

10. 商业化模型与路线图
阶段
目标
核心任务
Q4 2025
MVP测试
样机+算法验证
H1 2026
医疗认证 & 众测
数据集成+生态合作
H2 2026
小批量量产
企业/医院定制版
2027
全球市场化
B2C旗舰+B2B合作

商业模式：
B2C：硬件 + AI太极App订阅（$9/月）

B2B：企业健康管理 + 医疗API授权

Web3生态：NFT健康凭证与DAO分润模型

封底
AI太极·SOS RING
 "以太极之平衡，守护AI之觉醒。"
 官网：www.aitaiji.com ｜ 联系：sleep@aitaiji.com`;
  const handleDownloadWhitepaper = () => {
    setShowDownloadModal(true);
  };
  const handleDirectDownload = () => {
    // 创建PDF内容
    const blob = new Blob([whitepaperContent], {
      type: 'text/plain;charset=utf-8'
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'AI太极_SOS_RING_产品白皮书_v1.0.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setDownloadStarted(true);
    setTimeout(() => {
      setDownloadStarted(false);
      setShowDownloadModal(false);
    }, 2000);
  };
  const handleSubmitDownload = async () => {
    if (!name || !email || !agreedToTerms) {
      alert('请填写完整信息并同意条款');
      return;
    }
    setIsSubmitting(true);
    try {
      // 保存用户信息到数据库
      const currentUser = $w.auth.currentUser;
      if (currentUser) {
        await $w.cloud.callDataSource({
          dataSourceName: 'partner_info',
          methodName: 'wedaCreateV2',
          params: {
            data: {
              name: name,
              email: email,
              company: '个人用户',
              position: '技术白皮书下载',
              phone: '',
              message: '下载AI太极SOS RING产品白皮书',
              cooperation_type: '技术白皮书',
              status: 'pending',
              created_at: new Date().toISOString()
            }
          }
        });
      }

      // 开始下载
      handleDirectDownload();
    } catch (error) {
      console.error('保存用户信息失败:', error);
      // 即使保存失败也允许下载
      handleDirectDownload();
    } finally {
      setIsSubmitting(false);
    }
  };
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
            <Button onClick={handleDownloadWhitepaper} className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black px-8 py-4 text-lg flex items-center">
              <Download className="w-5 h-5 mr-2" />
              下载技术白皮书
            </Button>
          </div>
        </div>
      </section>

      {/* Download Modal */}
      {showDownloadModal && <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-xl border border-gray-800 w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center mr-4">
                  <FileText className="w-6 h-6 text-yellow-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-yellow-500">下载技术白皮书</h3>
                  <p className="text-sm text-gray-400">AI太极·SOS RING 智能戒指产品白皮书（v1.0）</p>
                </div>
              </div>

              {!downloadStarted ? <>
                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        <User className="w-4 h-4 inline mr-2" />
                        姓名
                      </label>
                      <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500" placeholder="请输入您的姓名" />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        <Mail className="w-4 h-4 inline mr-2" />
                        邮箱
                      </label>
                      <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500" placeholder="请输入您的邮箱" />
                    </div>

                    <div className="flex items-start">
                      <input type="checkbox" id="terms" checked={agreedToTerms} onChange={e => setAgreedToTerms(e.target.checked)} className="mt-1 mr-3" />
                      <label htmlFor="terms" className="text-sm text-gray-300">
                        我同意接收AI太极的产品更新和技术资讯
                      </label>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <Button onClick={() => setShowDownloadModal(false)} variant="outline" className="flex-1 border-gray-700 text-gray-400 hover:border-gray-600 hover:text-white">
                      取消
                    </Button>
                    <Button onClick={handleSubmitDownload} disabled={isSubmitting || !name || !email || !agreedToTerms} className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black">
                      {isSubmitting ? '提交中...' : '下载白皮书'}
                    </Button>
                  </div>
                </> : <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                  <h4 className="text-lg font-bold text-green-500 mb-2">下载已开始！</h4>
                  <p className="text-sm text-gray-400">白皮书正在下载到您的设备</p>
                </div>}
            </div>
          </div>
        </div>}
    </div>;
}