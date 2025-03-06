
import React, { useState } from 'react';
import { SlidersHorizontal, Star, ArrowDownUp } from 'lucide-react';
import PromptCard from './PromptCard';
import { mockPrompts } from '@/data/mockData';

type SortOption = 'popular' | 'recent' | 'trending';
type CategoryFilter = 'all' | string;

const PromptGrid = () => {
  const [sortBy, setSortBy] = useState<SortOption>('popular');
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
  
  const categories = ['Development', 'Data Analysis', 'Creative Writing', 'Documentation', 'Testing'];
  
  const filteredPrompts = mockPrompts.filter(prompt => 
    categoryFilter === 'all' || prompt.category === categoryFilter
  );
  
  const sortedPrompts = [...filteredPrompts].sort((a, b) => {
    if (sortBy === 'popular') return b.copyCount - a.copyCount;
    if (sortBy === 'trending') {
      const aTotalReactions = Object.values(a.reactions).reduce((sum, count) => sum + count, 0);
      const bTotalReactions = Object.values(b.reactions).reduce((sum, count) => sum + count, 0);
      return bTotalReactions - aTotalReactions;
    }
    // For 'recent', we'd normally use dates, but we'll just use the id for this demo
    return parseInt(b.id) - parseInt(a.id);
  });
  
  // Divide prompts into three columns
  const promptColumns = [
    sortedPrompts.filter((_, i) => i % 3 === 0),
    sortedPrompts.filter((_, i) => i % 3 === 1),
    sortedPrompts.filter((_, i) => i % 3 === 2),
  ];

  return (
    <section className="px-6 md:px-10 py-12">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
          <h2 className="text-2xl font-bold">
            Discover <span className="gradient-text">Prompts</span>
          </h2>
          
          <div className="flex flex-wrap gap-3">
            <div className="inline-flex items-center rounded-full bg-secondary px-3 py-1.5 gap-2">
              <SlidersHorizontal className="w-4 h-4" />
              <select 
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="bg-transparent text-sm font-medium outline-none"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            <div className="inline-flex items-center rounded-full bg-secondary px-3 py-1.5 gap-2">
              <ArrowDownUp className="w-4 h-4" />
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="bg-transparent text-sm font-medium outline-none"
              >
                <option value="popular">Most Copied</option>
                <option value="trending">Trending</option>
                <option value="recent">Newest</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {promptColumns.map((column, columnIndex) => (
            <div key={columnIndex} className="flex flex-col gap-6">
              {column.map(prompt => (
                <PromptCard 
                  key={prompt.id}
                  {...prompt}
                />
              ))}
            </div>
          ))}
        </div>
        
        <div className="flex justify-center mt-16">
          <button className="group relative overflow-hidden rounded-full bg-secondary px-6 py-3 font-medium transition-all hover:shadow-md hover:bg-secondary/80">
            <span className="relative z-10">Load More Prompts</span>
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/20 to-primary/0 opacity-0 transition-opacity group-hover:opacity-100"></div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default PromptGrid;
