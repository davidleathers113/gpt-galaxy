
import React from 'react';
import { SlidersHorizontal, ArrowDownUp } from 'lucide-react';

interface FilterBarProps {
  sortBy: string;
  categoryFilter: string;
  onSortChange: (sort: string) => void;
  onCategoryChange: (category: string) => void;
}

export default function FilterBar({ 
  sortBy, 
  categoryFilter, 
  onSortChange, 
  onCategoryChange 
}: FilterBarProps) {
  const categories = [
    { id: 'Development', label: 'Development', description: 'Code-focused prompts for building software' },
    { id: 'Data Analysis', label: 'Data Analysis', description: 'Extract insights from data sets' },
    { id: 'Creative Writing', label: 'Creative Writing', description: 'Generate documentation and content' },
    { id: 'Documentation', label: 'Documentation', description: 'Create structured technical docs' },
    { id: 'Testing', label: 'Testing', description: 'QA and test case generation' }
  ];

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
      <h2 className="text-2xl font-bold">
        Find Your <span className="gradient-text">Perfect Prompt</span>
      </h2>
      
      <div className="flex flex-wrap gap-3">
        <div className="inline-flex items-center rounded-full bg-secondary/80 px-3 py-1.5 gap-2 border border-border">
          <SlidersHorizontal className="w-4 h-4" />
          <select 
            value={categoryFilter}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="bg-transparent text-sm font-medium outline-none"
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.label}</option>
            ))}
          </select>
        </div>
        
        <div className="inline-flex items-center rounded-full bg-secondary/80 px-3 py-1.5 gap-2 border border-border">
          <ArrowDownUp className="w-4 h-4" />
          <select 
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="bg-transparent text-sm font-medium outline-none"
          >
            <option value="popular">Most Used</option>
            <option value="trending">Highest Rated</option>
            <option value="recent">Newest Additions</option>
          </select>
        </div>
      </div>
    </div>
  );
}
