'use client';

import { useState } from 'react';
import { Edit, Trash2, Check, X } from 'lucide-react';
import { Todo } from '@/types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, text: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete, onUpdate }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEdit = () => {
    if (editText.trim()) {
      onUpdate(todo.id, editText.trim());
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleEdit();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <div className={`group bg-white rounded-lg border transition-all duration-200 hover:shadow-md ${
      todo.completed 
        ? 'border-green-200 bg-green-50' 
        : 'border-gray-200'
    }`}>
      {isEditing ? (
        <div className="flex items-center gap-2 p-4">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyPress={handleKeyPress}
            autoFocus
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-200"
          />
          <button
            onClick={handleEdit}
            className="p-2 text-green-600 hover:bg-green-100 rounded-md transition-colors"
          >
            <Check size={18} />
          </button>
          <button
            onClick={handleCancel}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
          >
            <X size={18} />
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3 flex-1">
            <button
              onClick={() => onToggle(todo.id)}
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                todo.completed
                  ? 'bg-green-500 border-green-500 text-white'
                  : 'border-gray-300 hover:border-green-400'
              }`}
            >
              {todo.completed && <Check size={14} />}
            </button>
            <span className={`flex-1 ${
              todo.completed 
                ? 'line-through text-gray-500' 
                : 'text-gray-800'
            }`}>
              {todo.text}
            </span>
          </div>
          
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 text-blue-600 hover:bg-blue-100 rounded-md transition-colors"
            >
              <Edit size={16} />
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className="p-2 text-red-600 hover:bg-red-100 rounded-md transition-colors"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}