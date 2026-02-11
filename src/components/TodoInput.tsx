'use client';

import { useState, KeyboardEvent } from 'react';
import { Plus } from 'lucide-react';

interface TodoInputProps {
  onAdd: (text: string) => void;
  placeholder?: string;
}

export function TodoInput({ onAdd, placeholder = "添加新的待办事项..." }: TodoInputProps) {
  const [text, setText] = useState('');

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && text.trim()) {
      onAdd(text.trim());
      setText('');
    }
  };

  return (
    <div className="flex gap-2 mb-6">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder={placeholder}
        className="flex-1 px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/80 backdrop-blur-sm"
      />
      <button
        onClick={() => {
          if (text.trim()) {
            onAdd(text.trim());
            setText('');
          }
        }}
        disabled={!text.trim()}
        className="px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white rounded-lg transition-all duration-200 flex items-center gap-2 font-medium disabled:cursor-not-allowed"
      >
        <Plus size={18} />
        添加
      </button>
    </div>
  );
}