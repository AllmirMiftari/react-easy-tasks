
import { useState } from 'react';
import { FilterType } from '../hooks/useFilteredTasks';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

interface FilterBarProps {
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  taskStats: {
    total: number;
    completed: number;
    pending: number;
  };
}

const FilterBar = ({ 
  filter, 
  onFilterChange, 
  searchQuery, 
  onSearchChange, 
  taskStats 
}: FilterBarProps) => {
  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-2">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              onClick={() => onFilterChange('all')}
              size="sm"
              className="transition-all"
            >
              All ({taskStats.total})
            </Button>
            <Button
              variant={filter === 'pending' ? 'default' : 'outline'}
              onClick={() => onFilterChange('pending')}
              size="sm"
              className="transition-all"
            >
              Pending ({taskStats.pending})
            </Button>
            <Button
              variant={filter === 'completed' ? 'default' : 'outline'}
              onClick={() => onFilterChange('completed')}
              size="sm"
              className="transition-all"
            >
              Completed ({taskStats.completed})
            </Button>
          </div>
          
          <div className="w-full sm:w-64">
            <Input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FilterBar;
