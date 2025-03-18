
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

// Type for prompt from Supabase
export interface PromptWithReactions {
  id: string;
  title: string;
  description: string;
  code: string;
  category: string;
  copy_count: number;
  created_at: string;
  reactions: Record<string, number>;
}

export function usePrompts(categoryFilter: string, sortBy: string, page: number) {
  const itemsPerPage = 9;
  
  // Fetch prompts from Supabase
  const fetchPrompts = async (): Promise<PromptWithReactions[]> => {
    try {
      // Log the fetch attempt for debugging
      console.log(`Fetching prompts with filter: ${categoryFilter}, sort: ${sortBy}, page: ${page}`);
      
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
        throw error;
      }
      
      // Log what we got from the database for debugging
      console.log('Prompts from Supabase:', prompts);
      
      // If no prompts found, throw a specific error
      if (!prompts || prompts.length === 0) {
        throw new Error('No prompts found in database. You may need to add some prompts to the "prompts" table in Supabase.');
      }
      
      // Fetch reactions for all prompts
      const promptIds = prompts.map(prompt => prompt.id);
      console.log('Fetching reactions for prompt IDs:', promptIds);
      
      const { data: reactions, error: reactionsError } = await supabase
        .from('prompt_reactions')
        .select('*')
        .in('prompt_id', promptIds);
      
      if (reactionsError) {
        console.error('Error fetching reactions:', reactionsError);
        // Don't throw here, just log and continue with empty reactions
      }
      
      console.log('Reactions from Supabase:', reactions);
      
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
    } catch (error) {
      console.error('Failed to fetch prompts:', error);
      // Re-throw the error to be handled by the useQuery's error state
      throw error;
    }
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
  
  // Prepare the promptColumns data with balanced distribution
  const promptColumns = (() => {
    if (!promptsData) return [[], []];
    
    // Create two balanced columns
    const columns: PromptWithReactions[][] = [[], []];
    
    // Calculate total height for balancing
    promptsData.forEach((prompt, index) => {
      // Use a simple height estimation based on content length
      // This is a heuristic - in a real app you might want to measure actual DOM heights
      const estimatedHeight = 
        (prompt.title?.length || 0) + 
        (prompt.description?.length || 0) * 0.5 + 
        (prompt.code?.length || 0) * 0.1;
      
      // Add to the column with the smallest current total height
      const column0Height = columns[0].reduce((sum, p) => 
        sum + (p.title?.length || 0) + (p.description?.length || 0) * 0.5 + (p.code?.length || 0) * 0.1, 0);
      const column1Height = columns[1].reduce((sum, p) => 
        sum + (p.title?.length || 0) + (p.description?.length || 0) * 0.5 + (p.code?.length || 0) * 0.1, 0);
      
      if (column0Height <= column1Height) {
        columns[0].push(prompt);
      } else {
        columns[1].push(prompt);
      }
    });
    
    return columns;
  })();
  
  return {
    promptsData,
    promptColumns,
    isLoading,
    error,
    refetch
  };
}
