
const BASE_URL = 'https://dummyjson.com/todos';

export interface Task {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

export interface AddTaskRequest {
  todo: string;
  completed: boolean;
  userId: number;
}

export interface UpdateTaskRequest {
  todo?: string;
  completed?: boolean;
}

export const taskAPI = {
  // GET all tasks
  getAllTasks: async (): Promise<{ todos: Task[]; total: number; skip: number; limit: number }> => {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch tasks');
    }
    return response.json();
  },

  // GET tasks by user (optional)
  getTasksByUser: async (userId: number): Promise<{ todos: Task[]; total: number; skip: number; limit: number }> => {
    const response = await fetch(`${BASE_URL}/user/${userId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch user tasks');
    }
    return response.json();
  },

  // ADD task
  addTask: async (task: AddTaskRequest): Promise<Task> => {
    const response = await fetch(`${BASE_URL}/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
    if (!response.ok) {
      throw new Error('Failed to add task');
    }
    return response.json();
  },

  // UPDATE task
  updateTask: async (id: number, updates: UpdateTaskRequest): Promise<Task> => {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });
    if (!response.ok) {
      throw new Error('Failed to update task');
    }
    return response.json();
  },

  // DELETE task
  deleteTask: async (id: number): Promise<{ id: number; todo: string; completed: boolean; isDeleted: boolean }> => {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete task');
    }
    return response.json();
  },
};
