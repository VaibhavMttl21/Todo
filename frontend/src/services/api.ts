import type { Task, TaskStats, CreateTaskData, UpdateTaskData, TaskStatus, Priority } from '../types/task';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

class ApiError extends Error {
  public status: number;
  
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.name = 'ApiError';
  }
}

async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(response.status, errorData.error || `HTTP ${response.status}`);
    }

    if (response.status === 204) {
      return null as T;
    }

    return await response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new Error('Network error or server unavailable');
  }
}

export const taskApi = {
  // Get all tasks with optional filters
  getTasks: async (filters?: {
    status?: TaskStatus;
    priority?: Priority;
    sortBy?: string;
    order?: 'asc' | 'desc';
  }): Promise<Task[]> => {
    const params = new URLSearchParams();
    if (filters?.status) params.append('status', filters.status);
    if (filters?.priority) params.append('priority', filters.priority);
    if (filters?.sortBy) params.append('sortBy', filters.sortBy);
    if (filters?.order) params.append('order', filters.order);

    const query = params.toString();
    return fetchApi<Task[]>(`/tasks${query ? `?${query}` : ''}`);
  },

  // Get task by ID
  getTask: async (id: string): Promise<Task> => {
    return fetchApi<Task>(`/tasks/${id}`);
  },

  // Create new task
  createTask: async (data: CreateTaskData): Promise<Task> => {
    return fetchApi<Task>('/tasks', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Update task
  updateTask: async (id: string, data: UpdateTaskData): Promise<Task> => {
    return fetchApi<Task>(`/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  // Toggle task status
  toggleTaskStatus: async (id: string): Promise<Task> => {
    return fetchApi<Task>(`/tasks/${id}/toggle`, {
      method: 'PATCH',
    });
  },

  // Delete task
  deleteTask: async (id: string): Promise<void> => {
    return fetchApi<void>(`/tasks/${id}`, {
      method: 'DELETE',
    });
  },

  // Get task statistics
  getTaskStats: async (): Promise<TaskStats> => {
    return fetchApi<TaskStats>('/tasks/stats/overview');
  },
};

export { ApiError };