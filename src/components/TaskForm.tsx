
import { useState, useEffect } from 'react';
import { Task } from '../services/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';

interface TaskFormProps {
  onSubmit: (taskData: { todo: string; completed: boolean }) => void;
  editingTask?: Task | null;
  onCancel?: () => void;
  loading?: boolean;
}

const TaskForm = ({ onSubmit, editingTask, onCancel, loading }: TaskFormProps) => {
  const [todo, setTodo] = useState('');
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (editingTask) {
      setTodo(editingTask.todo);
      setCompleted(editingTask.completed);
    } else {
      setTodo('');
      setCompleted(false);
    }
    setError('');
  }, [editingTask]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!todo.trim()) {
      setError('Task name is required');
      return;
    }

    try {
      await onSubmit({ todo: todo.trim(), completed });
      if (!editingTask) {
        setTodo('');
        setCompleted(false);
      }
      setError('');
    } catch (err) {
      setError('Failed to save task');
    }
  };

  const handleCancel = () => {
    setTodo('');
    setCompleted(false);
    setError('');
    onCancel?.();
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-lg">
          {editingTask ? 'Edit Task' : 'Add New Task'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="todo">Task Description</Label>
            <Input
              id="todo"
              type="text"
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
              placeholder="Enter task description..."
              className={error ? 'border-red-500' : ''}
              disabled={loading}
            />
            {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
          </div>

          {editingTask && (
            <div className="flex items-center space-x-2">
              <Checkbox
                id="completed"
                checked={completed}
                onCheckedChange={(checked) => setCompleted(checked as boolean)}
                disabled={loading}
              />
              <Label htmlFor="completed">Mark as completed</Label>
            </div>
          )}

          <div className="flex space-x-2">
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? 'Saving...' : editingTask ? 'Update Task' : 'Add Task'}
            </Button>
            {editingTask && (
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={loading}
              >
                Cancel
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default TaskForm;
