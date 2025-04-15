
import React, { useState } from 'react';
import { Search, X, Filter, ArrowDown, ArrowUp, Minus, Plus } from 'lucide-react';
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
      const { name: inputName, value: rawValue } = e.target;
      let processedValue: string | number | null = rawValue;

      if (inputName === 'minCopies') {
        const numericValue = parseInt(rawValue, 10);
        if (rawValue === '') {
          processedValue = null;
        } else if (!isNaN(numericValue) && numericValue >= 0) {
          processedValue = numericValue;
        } else if (criteria.minCopies !== null) {
          // If input is invalid but we had a valid number, keep the valid number
          // This prevents typing letters from clearing a valid number
          processedValue = criteria.minCopies;
        } else {
          // Otherwise, if input is invalid and current state is null, reset to null
          processedValue = null;
        }
      }

      setCriteria(prev => ({
        ...prev,
        [inputName]: processedValue,
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

    const handleMinCopiesChange = (amount: number) => {
      setCriteria(prev => {
        const currentVal = prev.minCopies ?? 0;
        const newValue = Math.max(0, currentVal + amount); // Ensure value doesn't go below 0
        return {
          ...prev,
          minCopies: newValue,
        };
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

            {/* Refined Min Copies Input with Internal Buttons */}
            <div className="space-y-1.5">
              <Label htmlFor="min-copies-input" className="text-xs font-medium text-muted-foreground">Minimum Copies</Label>
              <div className="relative">
                <Input
                  id="min-copies-input"
                  type="text"
                  name="minCopies"
                  value={criteria.minCopies ?? ''}
                  onChange={handleChange}
                  placeholder="e.g., 100"
                  className="w-full text-sm pr-16" // Increased right padding for horizontal buttons
                  inputMode="numeric"
                  pattern="[0-9]*"
                  aria-label="Minimum copies value"
                />
                <div className="absolute inset-y-0 right-0 flex flex-row items-center pr-1"> {/* Changed to flex-row, added padding */}
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-muted-foreground hover:text-foreground" // Slightly larger touch target
                    onClick={() => handleMinCopiesChange(1)}
                    aria-label="Increment minimum copies"
                  >
                    <Plus className="h-3 w-3" /> {/* Smaller icon */}
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-muted-foreground hover:text-foreground" // Slightly larger touch target
                    onClick={() => handleMinCopiesChange(-1)}
                    disabled={criteria.minCopies === 0 || criteria.minCopies === null} // Disable if 0 or null
                    aria-label="Decrement minimum copies"
                  >
                    <Minus className="h-3 w-3" /> {/* Smaller icon */}
                  </Button>
                </div>
              </div>
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
