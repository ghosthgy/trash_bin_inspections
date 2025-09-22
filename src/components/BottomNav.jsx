// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Button } from '@/components/ui';
// @ts-ignore;
import { Home, Trash2, FileText, User } from 'lucide-react';

export function BottomNav({
  activeTab,
  onTabChange
}) {
  const navItems = [{
    id: 'home',
    label: '首页',
    icon: Home
  }, {
    id: 'bins',
    label: '垃圾桶',
    icon: Trash2
  }, {
    id: 'report',
    label: '上报',
    icon: FileText
  }, {
    id: 'profile',
    label: '我的',
    icon: User
  }];
  return <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="flex justify-around items-center h-16">
        {navItems.map(item => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return <button key={item.id} onClick={() => onTabChange(item.id)} className={`flex flex-col items-center justify-center flex-1 py-2 ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
              <Icon className={`h-5 w-5 mb-1 ${isActive ? 'fill-current' : ''}`} />
              <span className="text-xs">{item.label}</span>
            </button>;
      })}
      </div>
    </div>;
}