
import React, { useState } from 'react';
import { Search, X, Filter, ArrowDown, ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AdvancedSearchProps {
  onSearch: (criteria: SearchCriteria) => void;
}

interface SearchCriteria {
  query: string;
  category: string;
  sortBy: 'popular' | 'recent' | 'trending';
  minCopies: number | null;
}

const AdvancedSearch: React.FC<AdvancedSearchProps> = ({ onSearch }) => {
  const [expanded, setExpanded] = useState(false);
  const [criteria, setCriteria] = useState<SearchCriteria>({
    query: '',
    category: 'all',
    sortBy: 'popular',
    minCopies: null,
  });

  const categories = ['Development', 'Data Analysis', 'Creative Writing', 'Documentation', 'Testing'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCriteria(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(criteria);
  };

  const resetSearch = () => {
    setCriteria({
      query: '',
      category: 'all',
      sortBy: 'popular',
      minCopies: null,
    });
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className={cn(
        "search-input rounded-xl transition-all duration-300",
        expanded ? "shadow-lg" : "shadow-sm"
      )}>
        <div className="px-4 py-3 flex items-center gap-3">
          <Search className="w-5 h-5 text-muted-foreground flex-shrink-0" />
          
          <form onSubmit={handleSearch} className="flex-1 flex items-center gap-2">
            <input
              type="text"
              name="query"
              value={criteria.query}
              onChange={handleChange}
              placeholder="Search for the perfect prompt..."
              className="bg-transparent w-full outline-none text-base"
            />
            
            {criteria.query && (
              <button
                type="button"
                onClick={() => setCriteria(prev => ({ ...prev, query: '' }))}
                className="text-muted-foreground hover:text-foreground rounded-full p-1"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </form>
          
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className={cn(
              "flex items-center gap-1 text-sm font-medium px-3 py-1.5 rounded-full transition-colors",
              expanded 
                ? "bg-primary/10 text-primary" 
                : "bg-secondary text-foreground hover:bg-secondary/80"
            )}
          >
            <Filter className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Filters</span>
            {expanded ? <ArrowUp className="w-3.5 h-3.5" /> : <ArrowDown className="w-3.5 h-3.5" />}
          </button>
        </div>
        
        {expanded && (
          <div className="px-4 pb-4 pt-1 border-t border-border/40 grid grid-cols-1 sm:grid-cols-3 gap-4 animate-fade-in">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">Category</label>
              <select
                name="category"
                value={criteria.category}
                onChange={handleChange}
                className="w-full bg-background border border-border/50 rounded-lg px-3 py-2 text-sm"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">Sort By</label>
              <select
                name="sortBy"
                value={criteria.sortBy}
                onChange={handleChange}
                className="w-full bg-background border border-border/50 rounded-lg px-3 py-2 text-sm"
              >
                <option value="popular">Most Copied</option>
                <option value="trending">Trending</option>
                <option value="recent">Newest</option>
              </select>
            </div>
            
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">Minimum Copies</label>
              <input
                type="number"
                name="minCopies"
                value={criteria.minCopies || ''}
                onChange={handleChange}
                placeholder="No minimum"
                className="w-full bg-background border border-border/50 rounded-lg px-3 py-2 text-sm"
              />
            </div>
            
            <div className="sm:col-span-3 flex justify-end gap-2">
              <button
                type="button"
                onClick={resetSearch}
                className="px-4 py-2 text-sm rounded-lg border border-border/50 hover:bg-secondary transition-colors"
              >
                Reset
              </button>
              
              <button
                type="submit"
                onClick={handleSearch}
                className="px-4 py-2 text-sm rounded-lg bg-primary text-primary-foreground hover:brightness-110 transition-all"
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdvancedSearch;
