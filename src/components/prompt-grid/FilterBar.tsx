
import React from 'react';
import { SlidersHorizontal, ArrowDownUp } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; // Added

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
        <Select value={categoryFilter} onValueChange={onCategoryChange}>
          <SelectTrigger className="w-auto min-w-[180px] rounded-full text-sm h-auto py-1.5 px-3 gap-2 border bg-secondary/80">
            <SlidersHorizontal className="w-4 h-4" />
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map(category => (
              <SelectItem key={category.id} value={category.id}>{category.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger className="w-auto min-w-[180px] rounded-full text-sm h-auto py-1.5 px-3 gap-2 border bg-secondary/80">
            <ArrowDownUp className="w-4 h-4" />
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="popular">Most Used</SelectItem>
            <SelectItem value="trending">Highest Rated</SelectItem>
            <SelectItem value="recent">Newest Additions</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
