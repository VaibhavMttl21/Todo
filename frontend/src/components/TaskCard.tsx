import React, { useState } from 'react';
import type { Task, Priority } from '../types/task';
import { 
  CheckCircle2, 
  Circle, 
  Calendar, 
  Clock, 
  Edit3, 
  Trash2,
  AlertCircle,
  Flag
} from 'lucide-react';
import { format, isAfter, isBefore, startOfDay } from 'date-fns';

interface TaskCardProps {
  task: Task;
  onToggleStatus: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const priorityColors: Record<Priority, string> = {
  LOW: 'text-green-600 bg-green-50 border-green-200',
  MEDIUM: 'text-yellow-600 bg-yellow-50 border-yellow-200',
  HIGH: 'text-red-600 bg-red-50 border-red-200',
};

const priorityIcons: Record<Priority, React.ReactNode> = {
  LOW: <Flag className="w-3 h-3" />,
  MEDIUM: <Flag className="w-3 h-3" />,
  HIGH: <Flag className="w-3 h-3" />,
};

export function TaskCard({ task, onToggleStatus, onEdit, onDelete }: TaskCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const isCompleted = task.status === 'COMPLETED';
  const isOverdue = task.dueDate && !isCompleted && 
    isBefore(new Date(task.dueDate), startOfDay(new Date()));
  const isDueSoon = task.dueDate && !isCompleted && !isOverdue &&
    isBefore(new Date(task.dueDate), new Date(Date.now() + 24 * 60 * 60 * 1000));

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setIsDeleting(true);
      onDelete(task.id);
    }
  };

  return (
    <div className={`
      bg-white rounded-lg border-2 p-4 transition-all duration-200 hover:shadow-md
      ${isCompleted ? 'border-green-200 bg-green-50/30' : 'border-gray-200'}
      ${isOverdue ? 'border-red-200 bg-red-50/30' : ''}
      ${isDeleting ? 'opacity-50 pointer-events-none' : ''}
    `}>
      <div className="flex items-start gap-3">
        {/* Status Toggle */}
        <button
          onClick={() => onToggleStatus(task.id)}
          className={`
            mt-1 transition-colors duration-200 hover:scale-110
            ${isCompleted ? 'text-green-600' : 'text-gray-400 hover:text-green-600'}
          `}
        >
          {isCompleted ? (
            <CheckCircle2 className="w-5 h-5" />
          ) : (
            <Circle className="w-5 h-5" />
          )}
        </button>

        {/* Task Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className={`
              font-medium text-gray-900 leading-tight
              ${isCompleted ? 'line-through text-gray-500' : ''}
            `}>
              {task.title}
            </h3>
            
            {/* Priority Badge */}
            <div className={`
              inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border
              ${priorityColors[task.priority]}
            `}>
              {priorityIcons[task.priority]}
              {task.priority}
            </div>
          </div>

          {/* Description */}
          {task.description && (
            <p className={`
              mt-2 text-sm text-gray-600 leading-relaxed
              ${isCompleted ? 'line-through text-gray-400' : ''}
            `}>
              {task.description}
            </p>
          )}

          {/* Due Date */}
          {task.dueDate && (
            <div className={`
              mt-3 inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full
              ${isOverdue 
                ? 'text-red-700 bg-red-100 border border-red-200' 
                : isDueSoon
                ? 'text-orange-700 bg-orange-100 border border-orange-200'
                : 'text-gray-600 bg-gray-100 border border-gray-200'
              }
            `}>
              {isOverdue ? (
                <AlertCircle className="w-3 h-3" />
              ) : (
                <Calendar className="w-3 h-3" />
              )}
              <span>
                {isOverdue ? 'Overdue: ' : 'Due: '}
                {format(new Date(task.dueDate), 'MMM d, yyyy')}
              </span>
            </div>
          )}

          {/* Created Date */}
          <div className="mt-3 flex items-center gap-1 text-xs text-gray-400">
            <Clock className="w-3 h-3" />
            Created {format(new Date(task.createdAt), 'MMM d, yyyy')}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1 ml-2">
          <button
            onClick={() => onEdit(task)}
            className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors duration-200"
            title="Edit task"
          >
            <Edit3 className="w-4 h-4" />
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors duration-200 disabled:opacity-50"
            title="Delete task"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}