'use client';

import { TodoInput } from '@/components/TodoInput';
import { TodoItem } from '@/components/TodoItem';
import { TodoFilter } from '@/components/TodoFilter';
import { Stats } from '@/components/Stats';
import { useTodos } from '@/hooks/useTodos';
import { CheckCircle, Circle, List } from 'lucide-react';

export default function Home() {
  const {
    todos,
    filteredTodos,
    filter,
    setFilter,
    newTodoText,
    setNewTodoText,
    addTodo,
    deleteTodo,
    toggleTodo,
    updateTodo,
    clearCompleted,
    getActiveCount,
    getCompletedCount,
  } = useTodos();

  const handleClearCompleted = () => {
    clearCompleted();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <List size={32} className="text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-800">Todo List</h1>
          </div>
          <p className="text-gray-600 text-lg">高效管理你的日常任务</p>
        </div>

        {/* Stats */}
        <Stats 
          total={todos.length}
          active={getActiveCount()}
          completed={getCompletedCount()}
        />

        {/* Todo Input */}
        <TodoInput 
          onAdd={addTodo}
          placeholder="添加新的待办事项..."
        />

        {/* Todo Filter */}
        <TodoFilter
          currentFilter={filter}
          onFilterChange={setFilter}
          activeCount={getActiveCount()}
          completedCount={getCompletedCount()}
          onClearCompleted={handleClearCompleted}
        />

        {/* Todo List */}
        <div className="space-y-3">
          {filteredTodos.length === 0 ? (
            <div className="text-center py-8">
              {todos.length === 0 ? (
                <div className="text-gray-500">
                  <Circle size={48} className="mx-auto mb-4 text-gray-300" />
                  <p className="text-lg">暂无待办事项</p>
                  <p className="text-sm">添加你的第一个任务吧！</p>
                </div>
              ) : (
                <div className="text-gray-500">
                  {filter === 'active' ? (
                    <>
                      <CheckCircle size={48} className="mx-auto mb-4 text-green-300" />
                      <p className="text-lg">太棒了！</p>
                      <p className="text-sm">所有任务都已完成 🎉</p>
                    </>
                  ) : (
                    <>
                      <Circle size={48} className="mx-auto mb-4 text-gray-300" />
                      <p className="text-lg">没有符合条件的任务</p>
                      <p className="text-sm">尝试切换其他过滤器</p>
                    </>
                  )}
                </div>
              )}
            </div>
          ) : (
            filteredTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onUpdate={updateTodo}
              />
            ))
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
          <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
            <span>总计: {todos.length}</span>
            <span>•</span>
            <span>进行中: {getActiveCount()}</span>
            <span>•</span>
            <span>已完成: {getCompletedCount()}</span>
          </div>
          {getCompletedCount() > 0 && (
            <button
              onClick={handleClearCompleted}
              className="mt-3 text-sm text-red-600 hover:text-red-700 transition-colors"
            >
              清除已完成的任务
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
