import React from 'react';
import type { TaskStatus, Priority } from '../types/task';
import { Filter, SortAsc, SortDesc } from 'lucide-react';

interface TaskFiltersProps {
  status?: TaskStatus;
  priority?: Priority;
  sortBy: string;
  order: 'asc' | 'desc';
  onStatusChange: (status?: TaskStatus) => void;
  onPriorityChange: (priority?: Priority) => void;
  onSortChange: (sortBy: string, order: 'asc' | 'desc') => void;
}

export function TaskFilters({
  status,
  priority,
  sortBy,
  order,
  onStatusChange,
  onPriorityChange,
  onSortChange,
}: TaskFiltersProps) {
  const handleSortToggle = () => {
    onSortChange(sortBy, order === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5 text-gray-600" />
        <h3 className="font-medium text-gray-900">Filters & Sorting</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <select
            value={status || ''}
            onChange={(e) => onStatusChange(e.target.value as TaskStatus || undefined)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
          >
            <option value="">All Status</option>
            <option value="PENDING">Pending</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </div>

        {/* Priority Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Priority
          </label>
          <select
            value={priority || ''}
            onChange={(e) => onPriorityChange(e.target.value as Priority || undefined)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
          >
            <option value="">All Priorities</option>
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>
        </div>

        {/* Sort By */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sort By
          </label>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value, order)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
          >
            <option value="createdAt">Created Date</option>
            <option value="updatedAt">Updated Date</option>
            <option value="dueDate">Due Date</option>
            <option value="priority">Priority</option>
            <option value="title">Title</option>
          </select>
        </div>

        {/* Sort Order */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Order
          </label>
          <button
            onClick={handleSortToggle}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
          >
            {order === 'desc' ? (
              <>
                <SortDesc className="w-4 h-4" />
                Descending
              </>
            ) : (
              <>
                <SortAsc className="w-4 h-4" />
                Ascending
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}