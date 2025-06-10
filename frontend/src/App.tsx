import { useState } from 'react';
import type { Task, TaskStatus, Priority, CreateTaskData, UpdateTaskData } from './types/task';
import { useTasks } from './hooks/useTasks';
import { TaskCard } from './components/TaskCard';
import { TaskForm } from './components/TaskForm';
import { TaskStats } from './components/TaskStats';
import { TaskFilters } from './components/TaskFilters';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { Plus, CheckSquare } from 'lucide-react';

function App() {
  const [filters, setFilters] = useState({
    status: undefined as TaskStatus | undefined,
    priority: undefined as Priority | undefined,
    sortBy: 'createdAt',
    order: 'desc' as 'asc' | 'desc',
  });

  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    tasks,
    stats,
    loading,
    error,
    refetch,
    createTask,
    updateTask,
    toggleTaskStatus,
    deleteTask,
  } = useTasks(filters);

  const handleSubmitTask = async (data: CreateTaskData | UpdateTaskData) => {
    setIsSubmitting(true);
    let success;
    
    if (editingTask) {
      success = await updateTask(editingTask.id, data as UpdateTaskData);
      if (success) {
        setEditingTask(null);
      }
    } else {
      success = await createTask(data as CreateTaskData);
      if (success) {
        setShowForm(false);
      }
    }
    
    setIsSubmitting(false);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
  };

  const handleDeleteTask = async (id: string) => {
    await deleteTask(id);
  };

  const handleToggleStatus = async (id: string) => {
    await toggleTaskStatus(id);
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  const handleStatusFilter = (status?: TaskStatus) => {
    setFilters(prev => ({ ...prev, status }));
  };

  const handlePriorityFilter = (priority?: Priority) => {
    setFilters(prev => ({ ...prev, priority }));
  };

  const handleSortChange = (sortBy: string, order: 'asc' | 'desc') => {
    setFilters(prev => ({ ...prev, sortBy, order }));
  };

  if (loading && !tasks.length) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-600">Loading tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <CheckSquare className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Task Manager</h1>
                <p className="text-gray-600">Organize your tasks efficiently</p>
              </div>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-sm hover:shadow-md"
            >
              <Plus className="w-5 h-5" />
              Add Task
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error Message */}
        {error && (
          <div className="mb-6">
            <ErrorMessage message={error} onRetry={refetch} />
          </div>
        )}

        {/* Stats */}
        {stats && <TaskStats stats={stats} />}

        {/* Filters */}
        <TaskFilters
          status={filters.status}
          priority={filters.priority}
          sortBy={filters.sortBy}
          order={filters.order}
          onStatusChange={handleStatusFilter}
          onPriorityChange={handlePriorityFilter}
          onSortChange={handleSortChange}
        />

        {/* Task List */}
        <div className="space-y-4">
          {loading && tasks.length > 0 && (
            <div className="flex items-center justify-center py-4">
              <LoadingSpinner />
              <span className="ml-2 text-gray-600">Updating tasks...</span>
            </div>
          )}

          {tasks.length === 0 && !loading ? (
            <div className="text-center py-12">
              <CheckSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
              <p className="text-gray-600 mb-6">
                {filters.status || filters.priority 
                  ? 'No tasks match your current filters. Try adjusting your search criteria.'
                  : 'Get started by creating your first task!'
                }
              </p>
              {!filters.status && !filters.priority && (
                <button
                  onClick={() => setShowForm(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  <Plus className="w-5 h-5" />
                  Create Your First Task
                </button>
              )}
            </div>
          ) : (
            tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onToggleStatus={handleToggleStatus}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
              />
            ))
          )}
        </div>
      </main>

      {/* Task Form Modal */}
      {(showForm || editingTask) && (
        <TaskForm
          task={editingTask || undefined}
          onSubmit={handleSubmitTask}
          onCancel={handleFormCancel}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  );
}

export default App;