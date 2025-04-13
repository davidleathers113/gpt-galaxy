import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import PromptList from './PromptList';
import FilterBar from './FilterBar';
import { usePrompts, PromptWithReactions } from './hooks/usePrompts';
import { LoadingState } from './LoadingState';
import { ErrorState } from './ErrorState';
import { EmptyState } from './EmptyState';
import PromptDetailModal from '@/components/PromptDetailModal';
import { toast } from "sonner";
import { supabase } from '@/integrations/supabase/client';
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';
import { Button } from '@/components/ui/button'; // Import Button for Retry
export function PromptGrid() {
  const [sortBy, setSortBy] = useState('popular');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [displayedPrompts, setDisplayedPrompts] = useState<PromptWithReactions[]>([]); // State for accumulated prompts
  const [hasMore, setHasMore] = useState(true); // State to track if more pages exist
  const itemsPerPage = 9; // Define itemsPerPage, should match usePrompts
  const [loadError, setLoadError] = useState<Error | null>(null); // State for subsequent load errors
  const [newPromptsCount, setNewPromptsCount] = useState(0); // State for announcing new prompts

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState<PromptWithReactions | null>(null);
  // Call the hook
  const {
    promptsData, // This now holds only the *current* page's data
    isLoading,
    error,
    refetch
  }: { // Explicitly type the hook's return value if needed, especially after removing promptColumns
    promptsData: PromptWithReactions[] | undefined;
    isLoading: boolean;
    error: Error | null; // Use Error | null type
    refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<PromptWithReactions[], Error>>;
  } = usePrompts(categoryFilter, sortBy, page);

  // Ref for the Intersection Observer
  const observer = useRef<IntersectionObserver | null>(null);
  // Store the node for cleanup in callback ref
  const loadMoreSentinelNode = useRef<HTMLDivElement | null>(null);
  const isLoadingRef = useRef(isLoading); // Ref to track loading state for observer
  const hasMoreRef = useRef(hasMore); // Ref to track hasMore state for observer

  // Effect to reset state when filters change
  useEffect(() => {
    setPage(1);
    setDisplayedPrompts([]); // Clear existing prompts
    setHasMore(true); // Assume more pages exist on filter change
    setLoadError(null); // Reset load error on filter change
    setNewPromptsCount(0); // Reset announcement count
    // Optional: Scroll to top when filters change
    // window.scrollTo(0, 0);
  }, [categoryFilter, sortBy]);

  // Infinite scroll observer callback - reads state from refs
  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    console.log(`Observer callback fired. Intersecting: ${target.isIntersecting}, isLoading: ${isLoadingRef.current}, hasMore: ${hasMoreRef.current}`); // Add detailed log
    // Read latest state from refs inside the callback
    if (target.isIntersecting && !isLoadingRef.current && hasMoreRef.current) {
      console.log(">>> Conditions met! Incrementing page."); // Log condition success
      // Use functional update for setPage to avoid needing page in dependencies
      setPage(prevPage => {
        console.log(`>>> Setting page from ${prevPage} to ${prevPage + 1}`); // Log page update
        return prevPage + 1;
      });
    } else if (target.isIntersecting) {
      console.log(`>>> Intersecting but conditions not met: isLoading=${isLoadingRef.current}, hasMore=${hasMoreRef.current}`); // Log why conditions failed
    }
  }, []); // No dependencies needed as it reads from refs

  // Setup Intersection Observer - Create instance once
  useEffect(() => {
    const options = {
      root: null, // relative to document viewport
      rootMargin: '200px', // Load somewhat before it's fully visible
      threshold: 0.01 // Trigger even if only a tiny part is visible
    };

    // Create observer instance if it doesn't exist
    if (!observer.current) {
      console.log("Creating IntersectionObserver instance.");
      observer.current = new IntersectionObserver(handleObserver, options);
    }

    // Return cleanup function to disconnect observer on component unmount
    return () => {
      if (observer.current) {
        console.log("Disconnecting IntersectionObserver on unmount.");
        observer.current.disconnect();
        observer.current = null;
      }
    };
    // }, [handleObserver]); // handleObserver is stable due to useCallback([])
  }, []); // Run only once on mount

  // Callback Ref for the sentinel element
  const loadMoreRef = useCallback((node: HTMLDivElement | null) => {
    const currentObserver = observer.current;
    if (!currentObserver) {
      console.log("Observer not ready yet in callback ref.");
      return; // Observer not created yet
    }

    // Disconnect from previous node if it exists
    if (loadMoreSentinelNode.current) {
      console.log("Callback ref: Detaching observer from previous node:", loadMoreSentinelNode.current);
      currentObserver.unobserve(loadMoreSentinelNode.current);
    }

    // If node exists, observe it and store it
    if (node) {
      console.log("Callback ref: Attaching observer to new node:", node);
      currentObserver.observe(node);
      loadMoreSentinelNode.current = node; // Store the node itself
    } else {
      // Node is null (unmounted)
      loadMoreSentinelNode.current = null;
    }
    // }, [handleObserver]); // Recreate callback if handleObserver changes (it shouldn't)
  }, []); // Dependency array is empty because handleObserver is stable

  // Effect to update refs for the observer callback (keep this separate)
  useEffect(() => {
    isLoadingRef.current = isLoading;
    hasMoreRef.current = hasMore;
  }, [isLoading, hasMore]);

  // Effect to append data and update hasMore (Observer management removed)
  useEffect(() => {
    // Append data logic
    if (!isLoading && promptsData) {
      if (page === 1) {
        console.log("Setting initial prompts:", promptsData.length);
        setDisplayedPrompts(promptsData);
      } else {
        console.log("Appending prompts:", promptsData.length);
        let newlyAddedCount = 0;
        setDisplayedPrompts(prevPrompts => {
          const existingIds = new Set(prevPrompts.map(p => p.id));
          const newPrompts = promptsData.filter(p => !existingIds.has(p.id));
          newlyAddedCount = newPrompts.length; // Capture count of *actually* new prompts
          return newPrompts.length > 0 ? [...prevPrompts, ...newPrompts] : prevPrompts;
        });
        setNewPromptsCount(newlyAddedCount); // Set count for screen reader announcement
      }
      // Update hasMore
      const moreDataExists = promptsData.length === itemsPerPage;
      setHasMore(moreDataExists);
      console.log(`Updated hasMore based on fetch: ${moreDataExists} (fetched ${promptsData.length})`);
      setLoadError(null); // Clear previous load error on successful fetch

    } else if (!isLoading && error && page > 1) {
      // Handle error case for subsequent loads
      console.error("Error occurred while loading more prompts:", error);
      setLoadError(error); // Set the specific error
      // Do not set hasMore to false here, allow retry
      // Do not show toast here, use inline error message
    }
    // No observer cleanup needed here anymore
  }, [promptsData, page, isLoading, error]); // Dependencies related to data processing


  // Calculate balanced columns based on accumulated displayedPrompts
  const promptColumns = useMemo(() => {
    if (!displayedPrompts) return [[], []];
    const columns: PromptWithReactions[][] = [[], []];
    displayedPrompts.forEach((prompt) => {
      // Simple balancing logic (same as before, but using displayedPrompts)
      // This estimation is basic; real-world might need actual height measurement after render
      const estimatedHeight =
        (prompt.title?.length || 0) * 1.5 + // Title weight
        (prompt.description?.length || 0) * 1.0 + // Description weight
        (prompt.code?.length || 0) * 0.8; // Code weight

      const column0Height = columns[0].reduce((sum, p) =>
        sum + (p.title?.length || 0) * 1.5 + (p.description?.length || 0) * 1.0 + (p.code?.length || 0) * 0.8, 0);
      const column1Height = columns[1].reduce((sum, p) =>
        sum + (p.title?.length || 0) * 1.5 + (p.description?.length || 0) * 1.0 + (p.code?.length || 0) * 0.8, 0);

      if (column0Height <= column1Height) {
        columns[0].push(prompt);
      } else {
        columns[1].push(prompt);
      }
    });
    return columns;
  }, [displayedPrompts]); // Recalculate only when displayedPrompts changes


  // For debugging - log when relevant state changes
  useEffect(() => {
    console.log("PromptGrid State:", {
      page,
      isLoading,
      hasMore,
      displayedPrompts: displayedPrompts?.length,
      currentFetchData: promptsData?.length, // Log length of last fetch
      error: error ? (error as Error).message : null,
      loadError: loadError ? loadError.message : null, // Log subsequent load error
    });
  }, [displayedPrompts, promptsData, isLoading, error, page, hasMore, loadError]);


  const handleCardClick = (promptId: string) => {
    // Find prompt in the accumulated list
    const prompt = displayedPrompts?.find(p => p.id === promptId);
    if (prompt) {
      setSelectedPrompt(prompt);
      setIsModalOpen(true);
    } else {
      console.error(`Prompt with id ${promptId} not found in displayedPrompts.`);
      toast.error("Could not load prompt details.");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPrompt(null);
  };


  const handleReactionUpdate = async (promptId: string, reactionId: string) => {
    // Find prompt in the accumulated list
    const prompt = displayedPrompts?.find(p => p.id === promptId);
    if (!prompt) {
      toast.error("Cannot update reaction: Prompt not found.");
      return;
    }

    // Optimistic UI Update (optional but good UX)
    // Temporarily update local state before waiting for DB
    setDisplayedPrompts(prev => prev.map(p => {
      if (p.id === promptId) {
        const newReactions = { ...p.reactions };
        newReactions[reactionId] = (newReactions[reactionId] || 0) + 1;
        return { ...p, reactions: newReactions };
      }
      return p;
    }));


    try {
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
        const { error: updateError } = await supabase
          .from('prompt_reactions')
          .update({ count: existingReaction.count + 1 })
          .eq('id', existingReaction.id);
        if (updateError) throw updateError;
      } else {
        const { error: insertError } = await supabase
          .from('prompt_reactions')
          .insert({
            prompt_id: promptId,
            reaction_type: reactionId,
            count: 1
          });
        if (insertError) throw insertError;
      }

      // No need to refetch() if optimistic update is sufficient and accurate
      // refetch(); // Refetch data to ensure consistency if optimistic update is complex/risky

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
      // Revert optimistic update on error
      refetch(); // Refetch to get correct state from DB after error
    }
  };

  // ----- Render Logic -----

  // If we're loading the first page, show the full loading state
  if (isLoading && page === 1) {
    return <LoadingState />;
  }

  // If there's an error on the first page load, show the error state
  if (error && page === 1 && !isLoading && !loadError) { // Ensure not loading and no subsequent error active
    return <ErrorState
      errorMessage={(error as Error).message || "An unknown error occurred"}
      onRetry={() => {
        toast.info("Retrying connection...");
        setPage(1); // Ensure we retry page 1
        setDisplayedPrompts([]); // Clear potentially stale data
        setHasMore(true); // Reset hasMore
        setLoadError(null); // Also clear subsequent load error state
        refetch();
      }}
    />;
  }

  // If no prompts found after initial load (and no error), show empty state
  if (!isLoading && page === 1 && (!displayedPrompts || displayedPrompts.length === 0) && !error && !loadError) {
    return <EmptyState onRetry={() => { setPage(1); setLoadError(null); refetch(); }} />; // Ensure retry fetches page 1 and clears errors
  }

  // If we have prompts (even if loading more), render the list
  return (
    <section className="px-6 md:px-10 py-16" aria-busy={isLoading}> {/* Indicate busy state */}
      <div className="container mx-auto max-w-7xl">
        {/* Visually hidden announcer for screen readers */}
        {newPromptsCount > 0 && (
          <div role="status" aria-live="polite" className="sr-only">
            {newPromptsCount} new prompts loaded.
          </div>
        )}
        <FilterBar
          sortBy={sortBy}
          categoryFilter={categoryFilter}
          onSortChange={setSortBy}
          onCategoryChange={setCategoryFilter}
        />

        {/* Render PromptList if we have columns with content */}
        {promptColumns && (promptColumns[0].length > 0 || promptColumns[1].length > 0) && (
          <PromptList
            promptColumns={promptColumns}
            onCardClick={handleCardClick}
            onReactionUpdate={handleReactionUpdate}
          />
        )}

        {/* Sentinel Element for Intersection Observer - Render conditionally */}
        {/* Attach observer via callback ref */}
        {/* Render sentinel only if there's more data AND no subsequent load error */}
        {hasMore && !isLoading && !loadError && (
          <div ref={loadMoreRef} style={{ height: '1px', margin: '1px 0' }} aria-hidden="true" /> /* Make it small but present */
        )}


        {/* Show loading indicator for subsequent pages */}
        {/* Loading Indicator for subsequent pages (page > 1) */}
        {isLoading && page > 1 && !loadError && (
          <div role="status" aria-live="polite" className="flex justify-center items-center mt-8 mb-8 text-muted-foreground">
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-primary mr-2"></div>
            <span>Loading more prompts...</span>
          </div>
        )}

        {/* Inline Error Message for Subsequent Loads */}
        {loadError && !isLoading && (
          <div role="status" className="text-center text-destructive mt-8 mb-8 border border-destructive/50 bg-destructive/10 p-4 rounded-md">
            <p className="mb-2">Error loading prompts: {loadError.message || "An unknown error occurred."}</p>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => {
                console.log("Retrying fetch...");
                setLoadError(null); // Clear the error
                // Optional: Indicate loading state immediately for better UX
                // isLoadingRef.current = true; // Manually update ref if needed, though react-query might handle this
                refetch(); // Trigger react-query refetch
              }}
            >
              Retry
            </Button>
          </div>
        )}

        {/* Indicate when there are no more prompts to load */}
        {/* End of List Message */}
        {!hasMore && !isLoading && !loadError && displayedPrompts && displayedPrompts.length > 0 && (
          <div role="status" className="text-center text-muted-foreground mt-16">
            You've reached the end! No more prompts to load.
          </div>
        )}

      </div>

      <PromptDetailModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        prompt={selectedPrompt}
        onReactionUpdate={handleReactionUpdate}
      />
    </section>
  );
}
