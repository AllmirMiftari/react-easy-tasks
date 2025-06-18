
import { useMemo } from 'react';
import { Task } from '../services/api';

export type FilterType = 'all' | 'completed' | 'pending';

export const useFilteredTasks = (tasks: Task[], filter: FilterType, searchQuery: string = '') => {
  const filteredTasks = useMemo(() => {
    let filtered = tasks;

    // Filter by completion status
    if (filter === 'completed') {
      filtered = filtered.filter(task => task.completed);
    } else if (filter === 'pending') {
      filtered = filtered.filter(task => !task.completed);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(task =>
        task.todo.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [tasks, filter, searchQuery]);

  const taskStats = useMemo(() => ({
    total: tasks.length,
    completed: tasks.filter(task => task.completed).length,
    pending: tasks.filter(task => !task.completed).length,
  }), [tasks]);

  return {
    filteredTasks,
    taskStats,
  };
};
