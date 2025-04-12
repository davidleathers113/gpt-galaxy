
import React, { useState } from 'react';
import { Search, X, Filter, ArrowDown, ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input'; // Added
import { Button } from '@/components/ui/button'; // Added
import { Label } from '@/components/ui/label'; // Added
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; // Added

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

  // Updated handleChange to handle both Input events and Select onValueChange
  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | string, name?: string) => {
    if (typeof e === 'string') {
      // Handle Select onValueChange (value, name)
      const value = e;
      setCriteria(prev => ({
        ...prev,
        [name!]: value,
      }));
    } else {
      // Handle Input onChange (event)
      const { name: inputName, value: inputValue } = e.target;
      setCriteria(prev => ({
        ...prev,
        [inputName]: inputName === 'minCopies' ? (inputValue === '' ? null : Number(inputValue)) : inputValue,
      }));
    }
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
            <Input
              id="main-search" // Added id for potential label association if needed later
              type="text"
              name="query"
              value={criteria.query}
              onChange={handleChange}
              placeholder="Search for the perfect prompt..."
              className="bg-transparent w-full outline-none text-base border-none focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none pl-0" // Adjusted styles
              aria-label="Search query" // Added aria-label
            />

            {criteria.query && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => handleChange('', 'query')} // Use handleChange for consistency
                className="text-muted-foreground hover:text-foreground h-6 w-6" // Adjusted size
                aria-label="Clear search query" // Added aria-label
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </form>

          <Button
            type="button"
            variant={expanded ? "secondary" : "outline"} // Use variants
            size="sm" // Use size prop
            onClick={() => setExpanded(!expanded)}
            className={cn(
              "flex items-center gap-1 rounded-full", // Simplified classes
               expanded && "bg-primary/10 text-primary hover:bg-primary/20" // Specific style for expanded
            )}
            aria-expanded={expanded} // Added aria-expanded
          >
            <Filter className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Filters</span>
            {expanded ? <ArrowUp className="w-3.5 h-3.5" /> : <ArrowDown className="w-3.5 h-3.5" />}
          </Button>
        </div>

        {expanded && (
          <div className="px-4 pb-4 pt-1 border-t border-border/40 grid grid-cols-1 sm:grid-cols-3 gap-4 animate-fade-in">
            <div className="space-y-1.5">
              <Label htmlFor="category-select" className="text-xs font-medium text-muted-foreground">Category</Label>
              <Select
                name="category"
                value={criteria.category}
                onValueChange={(value) => handleChange(value, 'category')} // Use onValueChange
              >
                <SelectTrigger id="category-select" className="w-full text-sm">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="sortby-select" className="text-xs font-medium text-muted-foreground">Sort By</Label>
              <Select
                name="sortBy"
                value={criteria.sortBy}
                onValueChange={(value) => handleChange(value, 'sortBy')} // Use onValueChange
              >
                <SelectTrigger id="sortby-select" className="w-full text-sm">
                  <SelectValue placeholder="Select sorting" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most Copied</SelectItem>
                  <SelectItem value="trending">Trending</SelectItem>
                  <SelectItem value="recent">Newest</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="min-copies-input" className="text-xs font-medium text-muted-foreground">Minimum Copies</Label>
              <Input
                id="min-copies-input"
                type="number"
                name="minCopies"
                value={criteria.minCopies ?? ''} // Use nullish coalescing
                onChange={handleChange}
                placeholder="e.g., 100" // Improved placeholder
                className="w-full text-sm"
                min="0" // Added min attribute
              />
            </div>

            <div className="sm:col-span-3 flex justify-end gap-2">
              <Button
                type="button"
                variant="outline" // Use variant
                size="sm" // Use size
                onClick={resetSearch}
              >
                Reset
              </Button>

              <Button
                type="submit" // Keep type submit for form
                size="sm" // Use size
                onClick={handleSearch} // Keep onClick for direct trigger if needed, though form onSubmit should work
              >
                Apply Filters
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdvancedSearch;
