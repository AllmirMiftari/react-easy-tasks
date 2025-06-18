
import { useState, useEffect } from 'react';
import { taskAPI, Task, AddTaskRequest, UpdateTaskRequest } from '../services/api';
import { toast } from '@/hooks/use-toast';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all tasks
  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await taskAPI.getAllTasks();
      setTasks(response.todos);
      console.log('Tasks fetched successfully:', response.todos.length);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch tasks';
      setError(errorMessage);
      console.error('Error fetching tasks:', err);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Add new task
  const addTask = async (taskData: Omit<AddTaskRequest, 'userId'>) => {
    try {
      const newTaskRequest: AddTaskRequest = {
        ...taskData,
        userId: 1, // Hardcoded user ID as per requirements
      };
      const newTask = await taskAPI.addTask(newTaskRequest);
      setTasks(prev => [newTask, ...prev]);
      console.log('Task added successfully:', newTask);
      toast({
        title: "Success",
        description: "Task added successfully!",
      });
      return newTask;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to add task';
      console.error('Error adding task:', err);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      throw err;
    }
  };

  // Update task
  const updateTask = async (id: number, updates: UpdateTaskRequest) => {
    try {
      const updatedTask = await taskAPI.updateTask(id, updates);
      setTasks(prev => prev.map(task => task.id === id ? updatedTask : task));
      console.log('Task updated successfully:', updatedTask);
      toast({
        title: "Success",
        description: "Task updated successfully!",
      });
      return updatedTask;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update task';
      console.error('Error updating task:', err);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      throw err;
    }
  };

  // Delete task
  const deleteTask = async (id: number) => {
    try {
      await taskAPI.deleteTask(id);
      setTasks(prev => prev.filter(task => task.id !== id));
      console.log('Task deleted successfully:', id);
      toast({
        title: "Success",
        description: "Task deleted successfully!",
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete task';
      console.error('Error deleting task:', err);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      throw err;
    }
  };

  // Toggle task completion
  const toggleTask = async (id: number, completed: boolean) => {
    await updateTask(id, { completed });
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return {
    tasks,
    loading,
    error,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
    refetch: fetchTasks,
  };
};
