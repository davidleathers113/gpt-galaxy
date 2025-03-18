
import React, { useState, useEffect } from 'react';
import PromptList from './PromptList';
import FilterBar from './FilterBar';
import { usePrompts } from './hooks/usePrompts';
import { LoadingState } from './LoadingState';
import { ErrorState } from './ErrorState';
import { EmptyState } from './EmptyState';
import { Button } from '@/components/ui/button';

export function PromptGrid() {
  const [sortBy, setSortBy] = useState('popular');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [page, setPage] = useState(1);
  
  const { 
    promptsData, 
    promptColumns, 
    isLoading, 
    error, 
    refetch 
  } = usePrompts(categoryFilter, sortBy, page);
  
  useEffect(() => {
    // Reset to page 1 when filters change
    setPage(1);
  }, [categoryFilter, sortBy]);
  
  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  return (
    <section className="px-6 md:px-10 py-16">
      <div className="container mx-auto max-w-7xl">
        <FilterBar 
          sortBy={sortBy}
          categoryFilter={categoryFilter}
          onSortChange={setSortBy}
          onCategoryChange={setCategoryFilter}
        />
        
        {isLoading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState errorMessage={(error as Error).message} onRetry={refetch} />
        ) : promptsData?.length === 0 ? (
          <EmptyState onRetry={refetch} />
        ) : (
          <PromptList promptColumns={promptColumns} />
        )}
        
        {promptsData && promptsData.length > 0 && promptsData.length >= 9 && (
          <div className="flex justify-center mt-16">
            <Button 
              variant="outline" 
              className="gap-2 rounded-full"
              onClick={handleLoadMore}
              disabled={isLoading}
            >
              Load More Prompts
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
