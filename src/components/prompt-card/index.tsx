
import React, { useState } from 'react';
import { Copy, CheckCircle2 } from 'lucide-react';
import PromptCardDescription from './PromptCardDescription';
import PromptCardCodeDisplay from './PromptCardCodeDisplay';
import PromptCardReactions from './PromptCardReactions';
import { toast } from "sonner";
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { supabase } from '@/integrations/supabase/client';

export interface PromptCardProps {
  id: string;
  title: string;
  description: string;
  code: string;
  category: string;
  copyCount: number;
  reactions: Record<string, number>;
}

const PromptCard: React.FC<PromptCardProps> = ({
  id,
  title,
  description,
  code,
  category,
  copyCount,
  reactions: initialReactions,
}) => {
  const [userReactions, setUserReactions] = useState(initialReactions);
  const [copied, setCopied] = useState(false);
  
  const handleReaction = async (reactionId: string) => {
    // Update local state first for better UX
    setUserReactions(prev => ({
      ...prev,
      [reactionId]: (prev[reactionId] || 0) + 1
    }));
    
    // Update the reaction in Supabase
    try {
      // Check if this reaction already exists for this prompt
      const { data: existingReaction } = await supabase
        .from('prompt_reactions')
        .select('*')
        .eq('prompt_id', id)
        .eq('reaction_type', reactionId)
        .single();
      
      if (existingReaction) {
        // Update existing reaction count
        await supabase
          .from('prompt_reactions')
          .update({ count: existingReaction.count + 1 })
          .eq('id', existingReaction.id);
      } else {
        // Create new reaction
        await supabase
          .from('prompt_reactions')
          .insert({
            prompt_id: id,
            reaction_type: reactionId,
            count: 1
          });
      }
      
      const reactionLabels = {
        like: 'Helpful',
        love: 'Love',
        smile: 'Brilliant',
        save: 'Saved to your collection'
      };
      
      toast(`You reacted: ${reactionLabels[reactionId as keyof typeof reactionLabels] || 'Reaction'}`);
    } catch (error) {
      console.error('Error updating reaction:', error);
      // Revert local state if there was an error
      setUserReactions(initialReactions);
      toast.error('Failed to save reaction');
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      
      // Update copy count in Supabase
      await supabase
        .from('prompts')
        .update({ copy_count: copyCount + 1 })
        .eq('id', id);
      
      toast.success('Prompt copied to clipboard!');
      
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      toast.error('Failed to copy to clipboard');
    }
  };

  return (
    <article 
      className="prompt-card group relative rounded-xl border border-border/50 bg-card hover:shadow-md transition-all duration-300 hover:border-primary/20 focus-within:border-primary/30 focus-within:ring-1 focus-within:ring-primary/20"
      tabIndex={0}
    >
      {/* Header section with improved visual hierarchy */}
      <div className="p-4 pb-2">
        <header className="flex justify-between items-start mb-2">
          <div className="flex items-center gap-1.5">
            <Badge 
              variant="outline" 
              className="px-2 py-0.5 h-5 text-[10px] font-medium bg-primary/5 hover:bg-primary/10 border-primary/10 text-primary"
            >
              {category}
            </Badge>
          </div>
          
          <button
            onClick={handleCopy}
            className={cn(
              "flex items-center gap-1.5 text-xs text-muted-foreground/80 bg-secondary/50 px-2 py-0.5 rounded-full hover:bg-secondary transition-colors", 
              copied && "text-green-600 bg-green-100"
            )}
            title={copied ? "Copied!" : `Copy prompt (used ${copyCount} times)`}
          >
            {copied ? (
              <CheckCircle2 className="w-3 h-3 mr-0.5" aria-hidden="true" />
            ) : (
              <Copy className="w-3 h-3 mr-0.5" aria-hidden="true" />
            )}
            <span className="tabular-nums font-medium">{copyCount}</span>
          </button>
        </header>
        
        <h2 className="text-base font-semibold mb-2 text-foreground group-hover:text-primary/90 transition-colors line-clamp-1">
          {title}
        </h2>
        
        {/* Description is now collapsible */}
        <PromptCardDescription description={description} />
      </div>
      
      {/* Subtle separator between sections */}
      <Separator className="mb-2 bg-border/40" />
      
      {/* Code section with improved visual distinction */}
      <div className="px-4">
        <PromptCardCodeDisplay code={code} />
      </div>
      
      {/* Bottom section with reactions - more accessible */}
      <div className="px-4 pt-0 pb-4">
        <PromptCardReactions 
          reactions={userReactions} 
          onReaction={handleReaction} 
        />
      </div>
      
      {/* Enhanced focus/hover effect for the entire card */}
      <div 
        className="absolute inset-0 rounded-xl border-2 border-primary/20 opacity-0 pointer-events-none group-hover:opacity-30 group-focus-within:opacity-40 transition-opacity duration-300" 
        aria-hidden="true"
      />
    </article>
  );
};

export default PromptCard;
