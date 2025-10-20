// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Button } from '@/components/ui';
// @ts-ignore;
import { Target, Users, Globe, Heart, ArrowRight } from 'lucide-react';

import { Navigation } from '@/components/Navigation';
export default function About(props) {
  const {
    $w
  } = props;
  const values = [{
    icon: Heart,
    title: '以人为本',
    description: '将人的健康与隐私放在首位，技术为人服务'
  }, {
    icon: Target,
    title: '创新驱动',
    description: '持续突破技术边界，引领AI健康产业发展'
  }, {
    icon: Users,
    title: '开放合作',
    description: '构建开放生态，与全球伙伴共同成长'
  }, {
    icon: Globe,
    title: '全球视野',
    description: '立足中国，服务全球，构建人类健康共同体'
  }];
  return <div className="min-h-screen bg-black text-white">
      <Navigation currentPage="about" $w={$w} />

      {/* Hero Section */}
      <section className="py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-center mb-8">
            <span className="text-yellow-500">AI太极</span>
            <br />
            <span className="text-white">主权AI时代的人机共生节点</span>
          </h1>
          <p className="text-xl text-gray-300 text-center mb-16 max-w-4xl mx-auto">
            让每个人都能拥有属于自己的主权AI健康体，实现"睡得更好、活得更安全"
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 px-8 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            <span className="text-yellow-500">使命宣言</span>
          </h2>
          <div className="bg-gray-900 rounded-lg p-12 border border-yellow-500/30">
            <p className="text-2xl text-gray-300 leading-relaxed">
              "让每个人都能拥有属于自己的主权AI健康体，<br />
              实现睡得更好、活得更安全。"
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            <span className="text-yellow-500">核心价值观</span>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
            const Icon = value.icon;
            return <div key={index} className="text-center">
                  <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-10 h-10 text-black" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                  <p className="text-gray-300 text-sm">{value.description}</p>
                </div>;
          })}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-24 px-8 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            <span className="text-yellow-500">愿景展望</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-900 rounded-lg p-8 border border-gray-800">
              <h3 className="text-2xl font-bold mb-4 text-yellow-500">短期目标</h3>
              <ul className="space-y-3 text-gray-300">
                <li>• 完成SOS RING量产</li>
                <li>• 建立核心用户群体</li>
                <li>• 完善AI算法模型</li>
                <li>• 拓展医疗合作</li>
              </ul>
            </div>

            <div className="bg-gray-900 rounded-lg p-8 border border-gray-800">
              <h3 className="text-2xl font-bold mb-4 text-yellow-500">中期规划</h3>
              <ul className="space-y-3 text-gray-300">
                <li>• 全球市场拓展</li>
                <li>• 生态系统建设</li>
                <li>• 技术标准制定</li>
                <li>• IPO准备</li>
              </ul>
            </div>

            <div className="bg-gray-900 rounded-lg p-8 border border-gray-800">
              <h3 className="text-2xl font-bold mb-4 text-yellow-500">长期愿景</h3>
              <ul className="space-y-3 text-gray-300">
                <li>• 成为行业标准</li>
                <li>• 构建健康元宇宙</li>
                <li>• 全球健康网络</li>
                <li>• 人类健康守护</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            <span className="text-yellow-500">核心团队</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-700 rounded-full mx-auto mb-6" />
              <h3 className="text-xl font-bold mb-2">创始人</h3>
              <p className="text-gray-400 mb-2">AI & 健康科技专家</p>
              <p className="text-sm text-gray-500">前Google AI研究员</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-700 rounded-full mx-auto mb-6" />
              <h3 className="text-xl font-bold mb-2">CTO</h3>
              <p className="text-gray-400 mb-2">硬件架构专家</p>
              <p className="text-sm text-gray-500">前Apple硬件工程师</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-700 rounded-full mx-auto mb-6" />
              <h3 className="text-xl font-bold mb-2">CMO</h3>
              <p className="text-gray-400 mb-2">市场营销专家</p>
              <p className="text-sm text-gray-500">前华为市场总监</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-8 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            <span className="text-yellow-500">加入我们</span>
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            一起构建主权AI健康未来，改变世界健康格局
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-4 text-lg">
              查看职位
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button variant="outline" className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black px-8 py-4 text-lg">
              联系我们
            </Button>
          </div>
        </div>
      </section>
    </div>;
}