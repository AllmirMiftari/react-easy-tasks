
import { useState } from 'react';
import { Task } from '../services/api';
import { Trash2, Edit, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';

interface TaskCardProps {
  task: Task;
  onToggle: (id: number, completed: boolean) => void;
  onDelete: (id: number) => void;
  onEdit: (task: Task) => void;
}

const TaskCard = ({ task, onToggle, onDelete, onEdit }: TaskCardProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = async () => {
    setIsLoading(true);
    try {
      await onToggle(task.id, !task.completed);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await onDelete(task.id);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="group hover:shadow-md transition-all duration-200 hover:-translate-y-1">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3 flex-1">
            <Checkbox
              checked={task.completed}
              onCheckedChange={handleToggle}
              disabled={isLoading}
              className="mt-1"
            />
            <div className="flex-1 min-w-0">
              <p
                className={`text-sm ${
                  task.completed
                    ? 'line-through text-gray-500'
                    : 'text-gray-900'
                } break-words`}
              >
                {task.todo}
              </p>
              <div className="flex items-center mt-2 text-xs text-gray-500">
                <span className={`px-2 py-1 rounded-full ${
                  task.completed
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {task.completed ? 'Completed' : 'Pending'}
                </span>
                <span className="ml-2">ID: {task.id}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(task)}
              disabled={isLoading}
              className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDelete}
              disabled={isLoading}
              className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
