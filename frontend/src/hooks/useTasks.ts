import { useState, useEffect, useCallback } from 'react';
import type { Task, TaskStats, CreateTaskData, UpdateTaskData, TaskStatus, Priority } from '../types/task';
import { taskApi, ApiError } from '../services/api';

interface UseTasksOptions {
  status?: TaskStatus;
  priority?: Priority;
  sortBy?: string;
  order?: 'asc' | 'desc';
}

export function useTasks(options: UseTasksOptions = {}) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [stats, setStats] = useState<TaskStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const [tasksData, statsData] = await Promise.all([
        taskApi.getTasks(options),
        taskApi.getTaskStats()
      ]);
      setTasks(tasksData);
      setStats(statsData);
    } catch (err) {
      const errorMessage = err instanceof ApiError 
        ? err.message 
        : 'Failed to fetch tasks';
      setError(errorMessage);
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  }, [options.status, options.priority, options.sortBy, options.order]);

  const createTask = useCallback(async (data: CreateTaskData): Promise<Task | null> => {
    try {
      setError(null);
      const newTask = await taskApi.createTask(data);
      setTasks(prev => [newTask, ...prev]);
      
      // Refresh stats
      const newStats = await taskApi.getTaskStats();
      setStats(newStats);
      
      return newTask;
    } catch (err) {
      const errorMessage = err instanceof ApiError 
        ? err.message 
        : 'Failed to create task';
      setError(errorMessage);
      console.error('Error creating task:', err);
      return null;
    }
  }, []);

  const updateTask = useCallback(async (id: string, data: UpdateTaskData): Promise<Task | null> => {
    try {
      setError(null);
      const updatedTask = await taskApi.updateTask(id, data);
      setTasks(prev => prev.map(task => 
        task.id === id ? updatedTask : task
      ));
      
      // Refresh stats if status changed
      if (data.status !== undefined) {
        const newStats = await taskApi.getTaskStats();
        setStats(newStats);
      }
      
      return updatedTask;
    } catch (err) {
      const errorMessage = err instanceof ApiError 
        ? err.message 
        : 'Failed to update task';
      setError(errorMessage);
      console.error('Error updating task:', err);
      return null;
    }
  }, []);

  const toggleTaskStatus = useCallback(async (id: string): Promise<Task | null> => {
    try {
      setError(null);
      const updatedTask = await taskApi.toggleTaskStatus(id);
      setTasks(prev => prev.map(task => 
        task.id === id ? updatedTask : task
      ));
      
      // Refresh stats
      const newStats = await taskApi.getTaskStats();
      setStats(newStats);
      
      return updatedTask;
    } catch (err) {
      const errorMessage = err instanceof ApiError 
        ? err.message 
        : 'Failed to toggle task status';
      setError(errorMessage);
      console.error('Error toggling task status:', err);
      return null;
    }
  }, []);

  const deleteTask = useCallback(async (id: string): Promise<boolean> => {
    try {
      setError(null);
      await taskApi.deleteTask(id);
      setTasks(prev => prev.filter(task => task.id !== id));
      
      // Refresh stats
      const newStats = await taskApi.getTaskStats();
      setStats(newStats);
      
      return true;
    } catch (err) {
      const errorMessage = err instanceof ApiError 
        ? err.message 
        : 'Failed to delete task';
      setError(errorMessage);
      console.error('Error deleting task:', err);
      return false;
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return {
    tasks,
    stats,
    loading,
    error,
    refetch: fetchTasks,
    createTask,
    updateTask,
    toggleTaskStatus,
    deleteTask,
  };
}