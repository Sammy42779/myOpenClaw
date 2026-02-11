'use client';

import { TodoFilter } from '@/types/todo';

interface TodoFilterProps {
  currentFilter: TodoFilter;
  onFilterChange: (filter: TodoFilter) => void;
  activeCount: number;
  completedCount: number;
}

const filters: { key: TodoFilter; label: string; count?: number }[] = [
  { key: 'all', label: '全部' },
  { key: 'active', label: '进行中', count: undefined },
  { key: 'completed', label: '已完成', count: undefined },
];

export function TodoFilter({ 
  currentFilter, 
  onFilterChange, 
  activeCount, 
  completedCount 
}: TodoFilterProps) {
  const updatedFilters = filters.map(filter => ({
    ...filter,
    count: filter.key === 'active' ? activeCount : 
           filter.key === 'completed' ? completedCount : undefined
  }));

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex gap-2 bg-gray-100 rounded-lg p-1">
        {updatedFilters.map((filter) => (
          <button
            key={filter.key}
            onClick={() => onFilterChange(filter.key)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              currentFilter === filter.key
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            {filter.label}
            {filter.count !== undefined && (
              <span className={`ml-2 px-1.5 py-0.5 rounded text-xs ${
                currentFilter === filter.key
                  ? 'bg-blue-100 text-blue-600'
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {filter.count}
              </span>
            )}
          </button>
        ))}
      </div>
      
      <button
        onClick={() => {}}
        className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
      >
        清除已完成
      </button>
    </div>
  );
}