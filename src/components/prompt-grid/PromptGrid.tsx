
import React, { useState, useEffect } from 'react';
import PromptList from './PromptList';
import FilterBar from './FilterBar';
import { usePrompts } from './hooks/usePrompts';
import { LoadingState } from './LoadingState';
import { ErrorState } from './ErrorState';
import { EmptyState } from './EmptyState';
import PromptDetailModal from '@/components/PromptDetailModal'; // Uncommented
import { Button } from '@/components/ui/button';
import { PromptWithReactions } from './hooks/usePrompts';
import { toast } from "sonner";
import { supabase } from '@/integrations/supabase/client';

export function PromptGrid() {
  const [sortBy, setSortBy] = useState('popular');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [page, setPage] = useState(1);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState<PromptWithReactions | null>(null);
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
  }; // Correctly close handleLoadMore here

  const handleCardClick = (promptId: string) => {
    // Find the prompt in the flat promptsData array
    const prompt = promptsData?.find(p => p.id === promptId);
    if (prompt) {
      setSelectedPrompt(prompt);
      setIsModalOpen(true);
    } else {
      console.error(`Prompt with id ${promptId} not found in promptsData.`);
      toast.error("Could not load prompt details.");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPrompt(null);
  };


  const handleReactionUpdate = async (promptId: string, reactionId: string) => {
    // Find the prompt to get current reactions (optional, could rely on refetch)
    const prompt = promptsData?.find(p => p.id === promptId);
    if (!prompt) {
      toast.error("Cannot update reaction: Prompt not found.");
      return;
    }

    // Optimistic UI update can be handled locally in PromptCard/PromptDetailModal if desired
    // Or we can wait for refetch

    try {
      // Check if this reaction already exists for this prompt
      const { data: existingReaction, error: selectError } = await supabase
        .from('prompt_reactions')
        .select('*')
        .eq('prompt_id', promptId)
        .eq('reaction_type', reactionId)
        .single();

      if (selectError && selectError.code !== 'PGRST116') { // PGRST116 = 'Row not found'
        throw selectError;
      }

      if (existingReaction) {
        // Update existing reaction count
        const { error: updateError } = await supabase
          .from('prompt_reactions')
          .update({ count: existingReaction.count + 1 })
          .eq('id', existingReaction.id);
        if (updateError) throw updateError;
      } else {
        // Create new reaction
        const { error: insertError } = await supabase
          .from('prompt_reactions')
          .insert({
            prompt_id: promptId,
            reaction_type: reactionId,
            count: 1
          });
        if (insertError) throw insertError;
      }

      // Refetch data to update UI globally
      refetch();

      const reactionLabels = {
        like: 'Helpful',
        love: 'Love',
        smile: 'Brilliant',
        save: 'Saved'
      };
      toast.success(`Reacted: ${reactionLabels[reactionId as keyof typeof reactionLabels] || 'Reaction'}`);

    } catch (error) {
      console.error('Error updating reaction in PromptGrid:', error);
      toast.error('Failed to save reaction. Please try again.');
      // Optionally trigger a refetch here too to revert optimistic updates if they were implemented
      refetch();
    }
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
        <PromptList
          promptColumns={promptColumns}
          onCardClick={handleCardClick} // Pass the card click handler
          onReactionUpdate={handleReactionUpdate} // Pass the reaction update handler
        />

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

        {/* Render Modal Placeholder - Will be uncommented after creating the component */}
        <PromptDetailModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          prompt={selectedPrompt}
          onReactionUpdate={handleReactionUpdate} // Pass reaction handler
        />
    </section>
  );
}
