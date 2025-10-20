// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Button } from '@/components/ui';
// @ts-ignore;
import { Calendar as CalendarIcon, Clock, Edit2, Plus, ChevronLeft, ChevronRight, MessageSquare } from 'lucide-react';

export function ContentCalendar({
  contentPlans,
  platforms,
  onEditContent
}) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('month'); // 'month' or 'week'

  const getDaysInMonth = date => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    const days = [];

    // Add empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };
  const getContentForDate = date => {
    if (!date) return [];
    const dateStr = date.toISOString().split('T')[0];
    return contentPlans.filter(content => {
      const contentDate = new Date(content.publishTime).toISOString().split('T')[0];
      return contentDate === dateStr;
    });
  };
  const getPlatformInfo = platformId => {
    return platforms.find(p => p.id === platformId) || platforms[0];
  };
  const navigateMonth = direction => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };
  const formatMonth = date => {
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long'
    });
  };
  const formatDay = date => {
    return date.getDate();
  };
  const isToday = date => {
    if (!date) return false;
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };
  const days = getDaysInMonth(currentDate);
  const weekDays = ['日', '一', '二', '三', '四', '五', '六'];
  return <div className="bg-gray-900 rounded-lg border border-gray-800">
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-yellow-500">发布日历</h3>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Button onClick={() => navigateMonth('prev')} variant="outline" size="sm" className="border-gray-700 text-gray-400 hover:border-gray-600 hover:text-white">
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="text-white font-medium min-w-[120px] text-center">
                {formatMonth(currentDate)}
              </span>
              <Button onClick={() => navigateMonth('next')} variant="outline" size="sm" className="border-gray-700 text-gray-400 hover:border-gray-600 hover:text-white">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
            
            <Button onClick={() => setCurrentDate(new Date())} variant="outline" size="sm" className="border-gray-700 text-gray-400 hover:border-gray-600 hover:text-white">
              今天
            </Button>
          </div>
        </div>

        {/* Week days header */}
        <div className="grid grid-cols-7 gap-2 mb-2">
          {weekDays.map(day => <div key={day} className="text-center text-sm font-medium text-gray-400 py-2">
              {day}
            </div>)}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-2">
          {days.map((date, index) => {
          const dayContent = getContentForDate(date);
          const hasContent = dayContent.length > 0;
          return <div key={index} className={`min-h-[100px] border rounded-lg p-2 ${!date ? 'border-transparent' : isToday(date) ? 'border-yellow-500 bg-yellow-500/10' : 'border-gray-700'} ${date ? 'hover:border-gray-600' : ''}`}>
              {date && <div className="h-full flex flex-col">
                  <div className={`text-sm font-medium mb-1 ${isToday(date) ? 'text-yellow-500' : 'text-gray-300'}`}>
                    {formatDay(date)}
                  </div>
                  
                  <div className="flex-1 space-y-1">
                    {dayContent.slice(0, 3).map((content, contentIndex) => {
                  const platformInfo = getPlatformInfo(content.platform);
                  const PlatformIcon = platformInfo.icon;
                  return <div key={contentIndex} className="bg-gray-800 rounded p-1 text-xs cursor-pointer hover:bg-gray-700" onClick={() => onEditContent(content)}>
                        <div className="flex items-center mb-1">
                          <PlatformIcon className={`w-3 h-3 mr-1 ${platformInfo.color}`} />
                          <span className="text-gray-300 truncate">{content.title}</span>
                        </div>
                        <div className="text-gray-500 text-xs">
                          {new Date(content.publishTime).toLocaleTimeString('zh-CN', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                        </div>
                      </div>;
                })}
                    
                    {dayContent.length > 3 && <div className="text-xs text-gray-500 text-center">
                      +{dayContent.length - 3} 更多
                    </div>}
                  </div>
                </div>}
            </div>;
        })}
        </div>
      </div>

      {/* Legend */}
      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-400">平台标识:</span>
            {platforms.map(platform => {
            const PlatformIcon = platform.icon;
            return <div key={platform.id} className="flex items-center">
                <PlatformIcon className={`w-4 h-4 mr-1 ${platform.color}`} />
                <span className="text-xs text-gray-400">{platform.name}</span>
              </div>;
          })}
          </div>
          
          <div className="text-sm text-gray-400">
            共 {contentPlans.length} 个内容计划
          </div>
        </div>
      </div>
    </div>;
}