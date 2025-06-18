
import { useState } from 'react';
import { Task } from '../services/api';
import { useTasks } from '../hooks/useTasks';
import { useFilteredTasks, FilterType } from '../hooks/useFilteredTasks';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import FilterBar from '../components/FilterBar';
import { Card, CardContent } from '@/components/ui/card';

const Dashboard = () => {
  const { tasks, loading, error, addTask, updateTask, deleteTask, toggleTask } = useTasks();
  const [filter, setFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [formLoading, setFormLoading] = useState(false);

  const { filteredTasks, taskStats } = useFilteredTasks(tasks, filter, searchQuery);

  const handleAddTask = async (taskData: { todo: string; completed: boolean }) => {
    setFormLoading(true);
    try {
      await addTask(taskData);
    } finally {
      setFormLoading(false);
    }
  };

  const handleEditTask = async (taskData: { todo: string; completed: boolean }) => {
    if (!editingTask) return;
    
    setFormLoading(true);
    try {
      await updateTask(editingTask.id, taskData);
      setEditingTask(null);
    } finally {
      setFormLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  if (loading && tasks.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading your tasks...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error && tasks.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-red-600 mb-4">Error: {error}</p>
              <p className="text-gray-600">Please try refreshing the page.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Task Dashboard</h1>
          <p className="text-gray-600">
            Manage your tasks efficiently with our intuitive interface
          </p>
        </div>

        <TaskForm
          onSubmit={editingTask ? handleEditTask : handleAddTask}
          editingTask={editingTask}
          onCancel={handleCancelEdit}
          loading={formLoading}
        />

        <FilterBar
          filter={filter}
          onFilterChange={setFilter}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          taskStats={taskStats}
        />

        {filteredTasks.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-gray-500 text-lg">
                {tasks.length === 0 
                  ? "No tasks yet. Add your first task above!" 
                  : "No tasks match your current filter."}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onToggle={toggleTask}
                onDelete={deleteTask}
                onEdit={setEditingTask}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
