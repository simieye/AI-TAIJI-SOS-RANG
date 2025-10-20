// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button } from '@/components/ui';
// @ts-ignore;
import { ChevronRight, Shield, Moon, Activity, Cpu, Database, Globe, Zap, Lock, Download, FileText, Calendar, User, Mail, CheckCircle, Eye, Globe2, Loader, Clock, BookOpen, Languages, ExternalLink, X, Share2, Facebook, Twitter, Linkedin, Link2, Package, CheckSquare, Square } from 'lucide-react';

import { Navigation } from '@/components/Navigation';
export default function Product(props) {
  const {
    $w
  } = props;
  const [activeLayer, setActiveLayer] = useState(0);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [showBatchDownloadModal, setShowBatchDownloadModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [downloadStarted, setDownloadStarted] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [batchDownloads, setBatchDownloads] = useState({});
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('zh');
  const [selectedVersion, setSelectedVersion] = useState('v1.0');
  const [previewPage, setPreviewPage] = useState(1);
  const [isGeneratingPreview, setIsGeneratingPreview] = useState(false);
  const [selectedLanguages, setSelectedLanguages] = useState(['zh']);
  const [selectedVersions, setSelectedVersions] = useState(['v1.0']);
  const [shareUrl, setShareUrl] = useState('');
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);
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

  // 多语言白皮书内容
  const whitepaperContent = {
    zh: {
      title: 'AI太极·SOS RING 智能戒指产品白皮书（v1.0）',
      content: `AI太极·SOS RING 智能戒指产品白皮书（v1.0）

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
 官网：www.aitaiji.com ｜ 联系：sleep@aitaiji.com`
    },
    en: {
      title: 'AI Taiji·SOS RING Smart Ring Whitepaper (v1.0)',
      content: `AI Taiji·SOS RING Smart Ring Whitepaper (v1.0)

Cover Page
AI Taiji·SOS RING Smart Ring Whitepaper
 Sovereign AI × Sleep Optimization × Safety Protection
 ©2025 AI Taiji Co., Ltd. – Shenzhen | info@aitaiji.com

1. Product Vision and Mission
AI Taiji is committed to building "human-AI symbiotic nodes in the era of sovereign AI".
 SOS Ring is not just a wearable device, but also a Personal AI Node in the AI Taiji ecosystem.
 It integrates AI algorithms, sensor science, and edge intelligence with the philosophy of "yin-yang balance" to achieve perception, understanding, and protection of human body states.
Core Mission:
Enable every user to have their own sovereign AI health entity, achieving "better sleep and safer living".

2. Market Background and Industry Opportunities
Global Smart Ring Market Trends
The global smart ring market is expected to reach $4.2 billion in 2025 (CAGR 28%).

Health + safety dual-function product demand is rapidly rising, especially in sleep health, women's health, and elderly safety fields.

User needs are shifting from "passive monitoring" to "AI active intervention and prediction".

Technology Turning Points
Edge AI chip power consumption reduced by 50%, supporting local inference;

Multimodal sensors can integrate heart rate, body temperature, and motion signals within 5mm space;

IoA protocol (Internet of Agents) makes agent interconnection a reality.

3. Product Definition and Core Value
Product Definition
AI Taiji·SOS RING is a smart ring that integrates AI sleep optimization, health monitoring, emergency protection, and sovereign AI computing.
 It can independently complete physiological perception, AI algorithm inference, and secure data transmission, forming a key edge node of AI Taiji OS.
Core Value
Module
User Value
Technical Value
Sleep Optimization
Deep sleep ratio ↑20%, fatigue prediction
Multimodal AI fusion (PPG+EDA+IMU)
Safety Protection
Automatic SOS trigger, zero-delay response
Edge AI detection + sovereign encrypted channel
Data Sovereignty
User complete control
Web3 data ownership + private edge storage
Intelligent Collaboration
IoA ecosystem interconnection
Real-time synchronization with AI Taiji OS agents

4. System Overview (System Architecture Diagram)
┌────────────────────────────────────┐
│           AI Taiji·SOS RING System Overview Diagram        │
├────────────────────────────────────┤
│ ① Sensor Layer: PPG / EDA / Body Temp / IMU / GSR        │
│ ② Edge AI Layer: Small Large Model Edge Version + TaijiOS Light Node │
│ ③ Communication Layer: BLE 5.2 + Web3 Secure Channel + NFC Interface │
│ ④ Sovereign Data Layer: Local Database + IPFS Decentralized Backup │
│ ⑤ Application Layer: AI Taiji App / Medical API / Enterprise Health Console │
└────────────────────────────────────┘

5. Functional Layers and Algorithm Flow
Functional Layers
Perception Layer: Real-time collection of HR, SpO₂, skin temperature, EDA, motion.

Computing Layer: AI Taiji Edge OS executes lightweight models (CNN-LSTM), offline sleep stage determination.

Decision Layer: AI agent judges state → triggers prompts or SOS.

Linkage Layer: Synchronizes to AI Taiji OS ecosystem, collaborates with smart home or medical systems.

Algorithm Flow (Pseudo Code Overview)
if HRV < threshold and EDA↑:
    sleep_stage = 'Deep'
elif motion↑ and HRV irregular:
    sleep_stage = 'REM'
if abnormal(HR < 40 or >120):
    trigger_SOS()

6. Hardware Architecture and Innovation Points
Module
Specification
Innovation
Main Chip
RISC-V + NPU AI Acceleration
Support local inference and learning
Sensor Array
PPG+EDA+Temp+IMU
5-in-1 low-power array design
Communication Interface
BLE 5.2 / NFC / USB-C Dock
Dual-mode energy-saving connection
Battery Life
7–10 days
Dynamic sampling energy-saving strategy
Material Design
Titanium alloy + ceramic inner ring
Balances thermal conductivity and hypoallergenic performance
Charging System
Wireless Qi standard
30-minute fast charging

7. AI Architecture and Sovereign Data Flow
AI Taiji·SOS RING AI Architecture Diagram (Text Version)
Input: Multimodal signals → Feature extraction (HRV, SpO₂, Temp, Motion)
    ↓
Edge AI Model (CNN+LSTM)
    ↓
Output 1: Sleep stage prediction (Wake/Light/Deep/REM)
Output 2: Stress and anomaly detection (EDA mode)
    ↓
Agent Decision: Trigger prompt or SOS link
    ↓
Data Reporting: Encrypted signature → User App → AI Taiji Sovereign Node

8. Application Ecosystem and Industry Scenarios
Industry
Scenario
Integration Method
Medical
Sleep disorder monitoring
Connect with hospital AI Taiji nodes
Enterprise
Employee health management
Health dashboard + data anonymization
Sports
Recovery and training AI optimization
Sync with fitness agents
Smart Home
Smart bedroom linkage
Communicate with lighting/AC systems
Government & Elderly Care
Automatic SOS alarm
Anonymous health monitoring gateway

9. Data Security and Sovereign AI Mechanism
End-to-end encryption (AES-256 + IPFS Hash)

Zero-trust access control

Web3 sovereign credentials (NFT health records)

AI Taiji privacy governance protocol (Taiji Privacy Loop)

Data residency optional: local / cloud / DAO nodes

10. Business Model and Roadmap
Phase
Goal
Core Tasks
Q4 2025
MVP Testing
Prototype + algorithm validation
H1 2026
Medical Certification & Crowd Testing
Data integration + ecosystem cooperation
H2 2026
Small Batch Production
Enterprise/hospital customized versions
2027
Global Marketization
B2C flagship + B2B cooperation

Business Model:
B2C: Hardware + AI Taiji App subscription ($9/month)

B2B: Enterprise health management + medical API authorization

Web3 Ecosystem: NFT health credentials and DAO profit-sharing model

Back Cover
AI Taiji·SOS RING
 "With the balance of Taiji, guard the awakening of AI."
 Website: www.aitaiji.com  | Contact: sleep@aitaiji.com`
    }
  };

  // 版本信息
  const versions = [{
    id: 'v1.0',
    name: 'v1.0',
    date: '2025-01-15',
    status: 'current'
  }, {
    id: 'v0.9',
    name: 'v0.9',
    date: '2024-12-01',
    status: 'previous'
  }];

  // 语言选项
  const languages = [{
    code: 'zh',
    name: '中文',
    flag: '🇨🇳'
  }, {
    code: 'en',
    name: 'English',
    flag: '🇺🇸'
  }];

  // 预览页面内容
  const getPreviewContent = (page, language) => {
    const content = whitepaperContent[language].content;
    const pages = content.split('\n\n');
    return pages[page - 1] || '';
  };
  useEffect(() => {
    // 生成分享链接
    const currentUrl = window.location.href;
    setShareUrl(`${currentUrl}#whitepaper`);
  }, []);
  const handleDownloadWhitepaper = () => {
    setShowDownloadModal(true);
  };
  const handleBatchDownload = () => {
    setShowBatchDownloadModal(true);
  };
  const handleShareWhitepaper = () => {
    setShowShareModal(true);
  };
  const handlePreviewWhitepaper = () => {
    setShowPreviewModal(true);
    setIsGeneratingPreview(true);
    // 模拟生成预览
    setTimeout(() => {
      setIsGeneratingPreview(false);
    }, 1000);
  };
  const handleDirectDownload = async () => {
    setDownloadStarted(true);
    setDownloadProgress(0);

    // 模拟下载进度
    const progressInterval = setInterval(() => {
      setDownloadProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    // 创建PDF内容
    const content = whitepaperContent[selectedLanguage].content;
    const blob = new Blob([content], {
      type: 'text/plain;charset=utf-8'
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `AI太极_SOS_RING_产品白皮书_${selectedLanguage}_${selectedVersion}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    // 下载完成后重置状态
    setTimeout(() => {
      setDownloadStarted(false);
      setDownloadProgress(0);
      setShowDownloadModal(false);
    }, 3000);
  };
  const handleBatchDownloadStart = async () => {
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
              position: '批量下载技术白皮书',
              phone: '',
              message: `批量下载AI太极SOS RING产品白皮书 - ${selectedLanguages.join(', ')} - ${selectedVersions.join(', ')}`,
              cooperation_type: '批量下载',
              status: 'pending',
              created_at: new Date().toISOString()
            }
          }
        });
      }

      // 开始批量下载
      const downloads = {};
      for (const version of selectedVersions) {
        for (const language of selectedLanguages) {
          const key = `${version}_${language}`;
          downloads[key] = {
            version,
            language,
            status: 'pending',
            progress: 0
          };
        }
      }
      setBatchDownloads(downloads);

      // 模拟批量下载
      for (const key in downloads) {
        const item = downloads[key];
        setBatchDownloads(prev => ({
          ...prev,
          [key]: {
            ...prev[key],
            status: 'downloading',
            progress: 0
          }
        }));

        // 模拟下载进度
        for (let i = 0; i <= 100; i += 20) {
          await new Promise(resolve => setTimeout(resolve, 300));
          setBatchDownloads(prev => ({
            ...prev,
            [key]: {
              ...prev[key],
              progress: i
            }
          }));
        }

        // 创建下载
        const content = whitepaperContent[item.language].content;
        const blob = new Blob([content], {
          type: 'text/plain;charset=utf-8'
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `AI太极_SOS_RING_产品白皮书_${item.language}_${item.version}.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        setBatchDownloads(prev => ({
          ...prev,
          [key]: {
            ...prev[key],
            status: 'completed',
            progress: 100
          }
        }));
      }
    } catch (error) {
      console.error('批量下载失败:', error);
    } finally {
      setIsSubmitting(false);
    }
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
              message: `下载AI太极SOS RING产品白皮书 - ${selectedLanguage} - ${selectedVersion}`,
              cooperation_type: '技术白皮书',
              status: 'pending',
              created_at: new Date().toISOString()
            }
          }
        });
      }

      // 开始下载
      await handleDirectDownload();
    } catch (error) {
      console.error('保存用户信息失败:', error);
      // 即使保存失败也允许下载
      await handleDirectDownload();
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleLanguageToggle = language => {
    setSelectedLanguages(prev => prev.includes(language) ? prev.filter(l => l !== language) : [...prev, language]);
  };
  const handleVersionToggle = version => {
    setSelectedVersions(prev => prev.includes(version) ? prev.filter(v => v !== version) : [...prev, version]);
  };
  const handleSocialShare = platform => {
    const url = encodeURIComponent(shareUrl);
    const title = encodeURIComponent('AI太极·SOS RING 智能戒指产品白皮书');
    const text = encodeURIComponent('了解AI太极·SOS RING智能戒指的最新技术白皮书，探索主权AI时代的健康守护节点。');
    let shareLink = '';
    switch (platform) {
      case 'facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case 'twitter':
        shareLink = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
        break;
      case 'linkedin':
        shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        break;
      default:
        return;
    }
    window.open(shareLink, '_blank', 'width=600,height=400');
  };
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopiedToClipboard(true);
      setTimeout(() => setCopiedToClipboard(false), 2000);
    } catch (error) {
      console.error('复制链接失败:', error);
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 justify-center">
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-6 py-4 text-sm">
              立即预订
            </Button>
            <Button onClick={handleDownloadWhitepaper} className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black px-6 py-4 text-sm flex items-center justify-center">
              <Download className="w-4 h-4 mr-2" />
              单个下载
            </Button>
            <Button onClick={handleBatchDownload} className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-6 py-4 text-sm flex items-center justify-center">
              <Package className="w-4 h-4 mr-2" />
              批量下载
            </Button>
            <Button onClick={handleShareWhitepaper} className="border-green-500 text-green-500 hover:bg-green-500 hover:text-white px-6 py-4 text-sm flex items-center justify-center">
              <Share2 className="w-4 h-4 mr-2" />
              分享白皮书
            </Button>
          </div>
          <div className="mt-6">
            <Button onClick={handlePreviewWhitepaper} className="border-gray-500 text-gray-400 hover:bg-gray-800 hover:text-white px-8 py-4 text-lg flex items-center">
              <Eye className="w-5 h-5 mr-2" />
              预览白皮书
            </Button>
          </div>
        </div>
      </section>

      {/* Single Download Modal */}
      {showDownloadModal && <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-xl border border-gray-800 w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center mr-4">
                    <FileText className="w-6 h-6 text-yellow-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-yellow-500">下载技术白皮书</h3>
                    <p className="text-sm text-gray-400">AI太极·SOS RING 智能戒指产品白皮书</p>
                  </div>
                </div>
                <button onClick={() => setShowDownloadModal(false)} className="text-gray-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {!downloadStarted ? <>
                  {/* Language and Version Selection */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        <Languages className="w-4 h-4 inline mr-2" />
                        语言版本
                      </label>
                      <select value={selectedLanguage} onChange={e => setSelectedLanguage(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-500">
                        {languages.map(lang => <option key={lang.code} value={lang.code}>
                            {lang.flag} {lang.name}
                          </option>)}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        <Clock className="w-4 h-4 inline mr-2" />
                        版本
                      </label>
                      <select value={selectedVersion} onChange={e => setSelectedVersion(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-500">
                        {versions.map(version => <option key={version.id} value={version.id}>
                            {version.name} ({version.date})
                          </option>)}
                      </select>
                    </div>
                  </div>

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
                    {downloadProgress < 100 ? <Loader className="w-8 h-8 text-green-500 animate-spin" /> : <CheckCircle className="w-8 h-8 text-green-500" />}
                  </div>
                  <h4 className="text-lg font-bold text-green-500 mb-2">
                    {downloadProgress < 100 ? `下载中... ${downloadProgress}%` : '下载完成！'}
                  </h4>
                  <p className="text-sm text-gray-400">
                    {downloadProgress < 100 ? '白皮书正在下载到您的设备' : '白皮书已保存到您的设备'}
                  </p>
                  {downloadProgress < 100 && <div className="w-full bg-gray-700 rounded-full h-2 mt-4">
                      <div className="bg-green-500 h-2 rounded-full transition-all duration-300" style={{
                width: `${downloadProgress}%`
              }}></div>
                    </div>}
                </div>}
            </div>
          </div>
        </div>}

      {/* Batch Download Modal */}
      {showBatchDownloadModal && <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-xl border border-gray-800 w-full max-w-2xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mr-4">
                    <Package className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-blue-500">批量下载技术白皮书</h3>
                    <p className="text-sm text-gray-400">选择多个语言版本和版本进行批量下载</p>
                  </div>
                </div>
                <button onClick={() => setShowBatchDownloadModal(false)} className="text-gray-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {Object.keys(batchDownloads).length === 0 ? <>
                  {/* Language Selection */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      <Languages className="w-4 h-4 inline mr-2" />
                      选择语言版本
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {languages.map(lang => <button key={lang.code} onClick={() => handleLanguageToggle(lang.code)} className={`p-3 rounded-lg border-2 transition-all ${selectedLanguages.includes(lang.code) ? 'border-blue-500 bg-blue-500/20' : 'border-gray-700 hover:border-gray-600'}`}>
                          <div className="flex items-center">
                            {selectedLanguages.includes(lang.code) ? <CheckSquare className="w-5 h-5 text-blue-500 mr-3" /> : <Square className="w-5 h-5 text-gray-400 mr-3" />}
                            <span className="text-lg mr-2">{lang.flag}</span>
                            <span className="text-white">{lang.name}</span>
                          </div>
                        </button>)}
                    </div>
                  </div>

                  {/* Version Selection */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      <Clock className="w-4 h-4 inline mr-2" />
                      选择版本
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {versions.map(version => <button key={version.id} onClick={() => handleVersionToggle(version.id)} className={`p-3 rounded-lg border-2 transition-all ${selectedVersions.includes(version.id) ? 'border-blue-500 bg-blue-500/20' : 'border-gray-700 hover:border-gray-600'}`}>
                          <div className="flex items-center">
                            {selectedVersions.includes(version.id) ? <CheckSquare className="w-5 h-5 text-blue-500 mr-3" /> : <Square className="w-5 h-5 text-gray-400 mr-3" />}
                            <div className="text-left">
                              <div className="text-white font-medium">{version.name}</div>
                              <div className="text-gray-400 text-sm">{version.date}</div>
                            </div>
                          </div>
                        </button>)}
                    </div>
                  </div>

                  {/* User Information */}
                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        <User className="w-4 h-4 inline mr-2" />
                        姓名
                      </label>
                      <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500" placeholder="请输入您的姓名" />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        <Mail className="w-4 h-4 inline mr-2" />
                        邮箱
                      </label>
                      <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500" placeholder="请输入您的邮箱" />
                    </div>

                    <div className="flex items-start">
                      <input type="checkbox" id="batch-terms" checked={agreedToTerms} onChange={e => setAgreedToTerms(e.target.checked)} className="mt-1 mr-3" />
                      <label htmlFor="batch-terms" className="text-sm text-gray-300">
                        我同意接收AI太极的产品更新和技术资讯
                      </label>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <Button onClick={() => setShowBatchDownloadModal(false)} variant="outline" className="flex-1 border-gray-700 text-gray-400 hover:border-gray-600 hover:text-white">
                      取消
                    </Button>
                    <Button onClick={handleBatchDownloadStart} disabled={isSubmitting || !name || !email || !agreedToTerms || selectedLanguages.length === 0 || selectedVersions.length === 0} className="flex-1 bg-blue-500 hover:bg-blue-600 text-white">
                      {isSubmitting ? '提交中...' : `开始批量下载 (${selectedLanguages.length * selectedVersions.length} 个文件)`}
                    </Button>
                  </div>
                </> : <>
                  {/* Download Progress */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-bold text-blue-500 mb-4">下载进度</h4>
                    {Object.entries(batchDownloads).map(([key, item]) => {
                const lang = languages.find(l => l.code === item.language);
                const version = versions.find(v => v.id === item.version);
                return <div key={key} className="bg-gray-800 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <span className="mr-2">{lang?.flag}</span>
                            <span className="text-white font-medium">{lang?.name} - {version?.name}</span>
                          </div>
                          <div className="flex items-center">
                            {item.status === 'completed' ? <CheckCircle className="w-5 h-5 text-green-500" /> : item.status === 'downloading' ? <Loader className="w-5 h-5 text-blue-500 animate-spin" /> : <Clock className="w-5 h-5 text-gray-400" />}
                            <span className="ml-2 text-sm text-gray-400">{item.progress}%</span>
                          </div>
                        </div>
                        {item.status === 'downloading' && <div className="w-full bg-gray-700 rounded-full h-2">
                            <div className="bg-blue-500 h-2 rounded-full transition-all duration-300" style={{
                      width: `${item.progress}%`
                    }}></div>
                          </div>}
                      </div>;
              })}
                  </div>
                  
                  {Object.values(batchDownloads).every(item => item.status === 'completed') && <div className="mt-6 text-center">
                      <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8 text-green-500" />
                      </div>
                      <h4 className="text-lg font-bold text-green-500 mb-2">批量下载完成！</h4>
                      <p className="text-sm text-gray-400 mb-4">所有选定的白皮书已下载到您的设备</p>
                      <Button onClick={() => {
                setShowBatchDownloadModal(false);
                setBatchDownloads({});
              }} className="bg-green-500 hover:bg-green-600 text-white">
                        完成
                      </Button>
                    </div>}
                </>}
            </div>
          </div>
        </div>}

      {/* Share Modal */}
      {showShareModal && <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-xl border border-gray-800 w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mr-4">
                    <Share2 className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-green-500">分享技术白皮书</h3>
                    <p className="text-sm text-gray-400">分享AI太极·SOS RING产品白皮书</p>
                  </div>
                </div>
                <button onClick={() => setShowShareModal(false)} className="text-gray-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Social Media Share */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-300 mb-3">社交媒体分享</h4>
                <div className="grid grid-cols-3 gap-3">
                  <button onClick={() => handleSocialShare('facebook')} className="p-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
                    <Facebook className="w-6 h-6 text-white mx-auto" />
                    <span className="text-xs text-white mt-1 block">Facebook</span>
                  </button>
                  <button onClick={() => handleSocialShare('twitter')} className="p-3 bg-sky-500 hover:bg-sky-600 rounded-lg transition-colors">
                    <Twitter className="w-6 h-6 text-white mx-auto" />
                    <span className="text-xs text-white mt-1 block">Twitter</span>
                  </button>
                  <button onClick={() => handleSocialShare('linkedin')} className="p-3 bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors">
                    <Linkedin className="w-6 h-6 text-white mx-auto" />
                    <span className="text-xs text-white mt-1 block">LinkedIn</span>
                  </button>
                </div>
              </div>

              {/* Link Share */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-300 mb-3">链接分享</h4>
                <div className="flex space-x-2">
                  <input type="text" value={shareUrl} readOnly className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white text-sm" />
                  <Button onClick={handleCopyLink} className="bg-green-500 hover:bg-green-600 text-white px-4 py-3">
                    {copiedToClipboard ? <CheckCircle className="w-5 h-5" /> : <Link2 className="w-5 h-5" />}
                  </Button>
                </div>
                {copiedToClipboard && <p className="text-sm text-green-500 mt-2">链接已复制到剪贴板</p>}
              </div>

              {/* QR Code */}
              <div className="text-center">
                <div className="w-32 h-32 bg-white rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <div className="text-black text-center">
                    <div className="w-24 h-24 bg-gray-200 rounded mx-auto mb-2"></div>
                    <p className="text-xs">QR Code</p>
                  </div>
                </div>
                <p className="text-sm text-gray-400">扫描二维码访问白皮书</p>
              </div>
            </div>
          </div>
        </div>}

      {/* Preview Modal */}
      {showPreviewModal && <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-xl border border-gray-800 w-full max-w-4xl max-h-[90vh] flex flex-col">
            <div className="p-6 border-b border-gray-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center mr-4">
                    <BookOpen className="w-6 h-6 text-yellow-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-yellow-500">白皮书预览</h3>
                    <p className="text-sm text-gray-400">{whitepaperContent[selectedLanguage].title}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  {/* Language Selector */}
                  <select value={selectedLanguage} onChange={e => setSelectedLanguage(e.target.value)} className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-yellow-500">
                    {languages.map(lang => <option key={lang.code} value={lang.code}>
                        {lang.flag} {lang.name}
                      </option>)}
                  </select>
                  
                  <button onClick={() => setShowPreviewModal(false)} className="text-gray-400 hover:text-white">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-hidden">
              {isGeneratingPreview ? <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <Loader className="w-12 h-12 text-yellow-500 animate-spin mx-auto mb-4" />
                    <p className="text-gray-400">正在生成预览...</p>
                  </div>
                </div> : <div className="flex h-full">
                  {/* Page Navigation */}
                  <div className="w-48 bg-gray-800 p-4 border-r border-gray-700">
                    <h4 className="text-sm font-medium text-gray-400 mb-4">页面导航</h4>
                    <div className="space-y-2">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(page => <button key={page} onClick={() => setPreviewPage(page)} className={`w-full text-left p-2 rounded text-sm ${previewPage === page ? 'bg-yellow-500/20 text-yellow-500' : 'text-gray-400 hover:text-white hover:bg-gray-700'}`}>
                          第 {page} 页
                        </button>)}
                    </div>
                  </div>

                  {/* Preview Content */}
                  <div className="flex-1 p-8 overflow-y-auto">
                    <div className="bg-white text-black rounded-lg p-8 min-h-full">
                      <div className="max-w-4xl mx-auto">
                        <div className="text-sm text-gray-600 mb-4">第 {previewPage} 页</div>
                        <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                          {getPreviewContent(previewPage, selectedLanguage)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>}
            </div>

            <div className="p-6 border-t border-gray-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Button onClick={() => setPreviewPage(Math.max(1, previewPage - 1))} disabled={previewPage === 1} variant="outline" className="border-gray-700 text-gray-400 hover:border-gray-600 hover:text-white">
                    上一页
                  </Button>
                  <span className="text-sm text-gray-400">
                    第 {previewPage} 页，共 10 页
                  </span>
                  <Button onClick={() => setPreviewPage(Math.min(10, previewPage + 1))} disabled={previewPage === 10} variant="outline" className="border-gray-700 text-gray-400 hover:border-gray-600 hover:text-white">
                    下一页
                  </Button>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Button onClick={() => {
                setShowPreviewModal(false);
                handleDownloadWhitepaper();
              }} className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black">
                    <Download className="w-4 h-4 mr-2" />
                    下载完整版
                  </Button>
                  <Button onClick={() => {
                setShowPreviewModal(false);
                handleShareWhitepaper();
              }} className="border-green-500 text-green-500 hover:bg-green-500 hover:text-white">
                    <Share2 className="w-4 h-4 mr-2" />
                    分享白皮书
                  </Button>
                  <Button onClick={() => window.open('https://www.aitaiji.com', '_blank')} className="bg-yellow-500 hover:bg-yellow-600 text-black">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    访问官网
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>}
    </div>;
}