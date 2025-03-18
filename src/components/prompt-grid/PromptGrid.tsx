
import React, { useState, useEffect } from 'react';
import PromptList from './PromptList';
import FilterBar from './FilterBar';
import { usePrompts } from './hooks/usePrompts';
import { LoadingState } from './LoadingState';
import { ErrorState } from './ErrorState';
import { EmptyState } from './EmptyState';
import { Button } from '@/components/ui/button';
import { toast } from "sonner";

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
  
  // For debugging - log when data changes
  useEffect(() => {
    console.log("PromptGrid data:", { 
      promptsData: promptsData?.length, 
      promptColumns: promptColumns.map(col => col.length),
      isLoading,
      error: error ? (error as Error).message : null
    });
  }, [promptsData, promptColumns, isLoading, error]);

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
    toast.info("Loading more prompts...");
  };

  // If we're loading the first page, show the full loading state
  if (isLoading && page === 1) {
    return <LoadingState />;
  }

  // If there's an error, show the error state
  if (error) {
    return <ErrorState 
      errorMessage={(error as Error).message} 
      onRetry={() => {
        toast.info("Retrying connection to Supabase...");
        refetch();
      }} 
    />;
  }

  // If no prompts found after loading, show empty state
  if (!isLoading && (!promptsData || promptsData.length === 0)) {
    return <EmptyState onRetry={refetch} />;
  }

  return (
    <section className="px-6 md:px-10 py-16">
      <div className="container mx-auto max-w-7xl">
        <FilterBar 
          sortBy={sortBy}
          categoryFilter={categoryFilter}
          onSortChange={setSortBy}
          onCategoryChange={setCategoryFilter}
        />
        
        {/* Always render the PromptList if we have data */}
        <PromptList promptColumns={promptColumns} />
        
        {/* Show loading indicator for subsequent pages */}
        {isLoading && page > 1 && (
          <div className="flex justify-center mt-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
          </div>
        )}
        
        {/* Load more button */}
        {promptsData && promptsData.length > 0 && promptsData.length >= 9 && !isLoading && (
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
