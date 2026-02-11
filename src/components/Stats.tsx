'use client';

import { BarChart3, Calendar, Target } from 'lucide-react';

interface StatsProps {
  total: number;
  active: number;
  completed: number;
}

export function Stats({ total, active, completed }: StatsProps) {
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <BarChart3 size={20} className="text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">总计</p>
            <p className="text-2xl font-bold text-gray-800">{total}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-yellow-100 rounded-lg">
            <Target size={20} className="text-yellow-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">进行中</p>
            <p className="text-2xl font-bold text-gray-800">{active}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-100 rounded-lg">
            <Calendar size={20} className="text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">完成率</p>
            <p className="text-2xl font-bold text-gray-800">{completionRate}%</p>
          </div>
        </div>
      </div>
    </div>
  );
}