
import React, { useState, useEffect } from 'react';
import { SlidersHorizontal, Star, ArrowDownUp } from 'lucide-react';
import PromptCard from './PromptCard';
import { Button } from './ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { toast } from "sonner";

type SortOption = 'popular' | 'recent' | 'trending';
type CategoryFilter = 'all' | string;

// Type for prompt from Supabase
interface PromptWithReactions {
  id: string;
  title: string;
  description: string;
  code: string;
  category: string;
  copy_count: number;
  created_at: string;
  reactions: Record<string, number>;
}

const PromptGrid = () => {
  const [sortBy, setSortBy] = useState<SortOption>('popular');
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
  const [page, setPage] = useState(1);
  const itemsPerPage = 9;
  
  const categories = [
    { id: 'Development', label: 'Development', description: 'Code-focused prompts for building software' },
    { id: 'Data Analysis', label: 'Data Analysis', description: 'Extract insights from data sets' },
    { id: 'Creative Writing', label: 'Creative Writing', description: 'Generate documentation and content' },
    { id: 'Documentation', label: 'Documentation', description: 'Create structured technical docs' },
    { id: 'Testing', label: 'Testing', description: 'QA and test case generation' }
  ];

  // Fetch prompts from Supabase
  const fetchPrompts = async (): Promise<PromptWithReactions[]> => {
    let query = supabase
      .from('prompts')
      .select('*');
    
    // Apply category filter if not 'all'
    if (categoryFilter !== 'all') {
      query = query.eq('category', categoryFilter);
    }
    
    // Fetch prompts with pagination
    const { data: prompts, error } = await query
      .order(sortBy === 'popular' ? 'copy_count' : 'created_at', { ascending: false })
      .range((page - 1) * itemsPerPage, page * itemsPerPage - 1);
    
    if (error) {
      console.error('Error fetching prompts:', error);
      toast.error('Failed to load prompts');
      throw error;
    }
    
    // Fetch reactions for all prompts
    const promptIds = prompts.map(prompt => prompt.id);
    const { data: reactions, error: reactionsError } = await supabase
      .from('prompt_reactions')
      .select('*')
      .in('prompt_id', promptIds);
    
    if (reactionsError) {
      console.error('Error fetching reactions:', reactionsError);
    }
    
    // Combine prompts with their reactions
    const promptsWithReactions = prompts.map(prompt => {
      const promptReactions = reactions
        ? reactions.filter(r => r.prompt_id === prompt.id)
        : [];
      
      // Convert to the expected format
      const reactionRecord: Record<string, number> = {};
      
      promptReactions.forEach(reaction => {
        reactionRecord[reaction.reaction_type] = reaction.count;
      });
      
      return {
        id: prompt.id,
        title: prompt.title,
        description: prompt.description,
        code: prompt.code,
        category: prompt.category,
        copy_count: prompt.copy_count,
        created_at: prompt.created_at,
        reactions: reactionRecord
      };
    });
    
    // Apply additional sorting for 'trending' which needs reactions data
    if (sortBy === 'trending') {
      promptsWithReactions.sort((a, b) => {
        const aTotalReactions = Object.values(a.reactions).reduce((sum, count) => sum + count, 0);
        const bTotalReactions = Object.values(b.reactions).reduce((sum, count) => sum + count, 0);
        return bTotalReactions - aTotalReactions;
      });
    }
    
    return promptsWithReactions;
  };
  
  // Use react-query to fetch and cache prompts
  const { 
    data: promptsData, 
    isLoading, 
    error, 
    refetch 
  } = useQuery({
    queryKey: ['prompts', categoryFilter, sortBy, page],
    queryFn: fetchPrompts,
    refetchOnWindowFocus: false,
    staleTime: 60000, // Consider data fresh for 1 minute
  });
  
  useEffect(() => {
    // Reset to page 1 when filters change
    setPage(1);
  }, [categoryFilter, sortBy]);
  
  // Prepare the promptColumns data
  const promptColumns = (() => {
    if (!promptsData) return [[], [], []];
    
    // Divide prompts into three columns
    return [
      promptsData.filter((_, i) => i % 3 === 0),
      promptsData.filter((_, i) => i % 3 === 1),
      promptsData.filter((_, i) => i % 3 === 2),
    ];
  })();
  
  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  return (
    <section className="px-6 md:px-10 py-16">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
          <h2 className="text-2xl font-bold">
            Find Your <span className="gradient-text">Perfect Prompt</span>
          </h2>
          
          <div className="flex flex-wrap gap-3">
            <div className="inline-flex items-center rounded-full bg-secondary/80 px-3 py-1.5 gap-2 border border-border">
              <SlidersHorizontal className="w-4 h-4" />
              <select 
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
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
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="bg-transparent text-sm font-medium outline-none"
              >
                <option value="popular">Most Used</option>
                <option value="trending">Highest Rated</option>
                <option value="recent">Newest Additions</option>
              </select>
            </div>
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[300px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="text-center p-8 bg-destructive/10 rounded-xl">
            <p className="text-destructive font-medium">Failed to load prompts. Please try again.</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => refetch()}
            >
              Retry
            </Button>
          </div>
        ) : promptsData?.length === 0 ? (
          <div className="text-center p-8 bg-muted/50 rounded-xl">
            <p className="text-muted-foreground">No prompts found for the selected category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {promptColumns.map((column, columnIndex) => (
              <div key={columnIndex} className="flex flex-col gap-6">
                {column.map(prompt => (
                  <PromptCard 
                    key={prompt.id}
                    id={prompt.id}
                    title={prompt.title}
                    description={prompt.description}
                    code={prompt.code}
                    category={prompt.category}
                    copyCount={prompt.copy_count}
                    reactions={prompt.reactions}
                  />
                ))}
              </div>
            ))}
          </div>
        )}
        
        {promptsData && promptsData.length > 0 && promptsData.length >= itemsPerPage && (
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
};

export default PromptGrid;
