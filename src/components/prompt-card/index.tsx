
import React, { useState } from 'react';
import { Copy, CheckCircle2 } from 'lucide-react';
import PromptCardDescription from './PromptCardDescription';
import PromptCardCodeDisplay from './PromptCardCodeDisplay';
import PromptCardReactions from './PromptCardReactions';
import { toast } from "sonner";
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button'; // Added
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
  onCardClick: (id: string) => void; // Callback when the card itself is clicked
  onReactionUpdate: (promptId: string, reactionId: string) => void; // Callback to update reaction in DB
}

const PromptCard: React.FC<PromptCardProps> = ({
  id,
  title,
  description,
  code,
  category,
  copyCount,
  reactions: initialReactions,
  onCardClick, // Destructure the card click prop
  onReactionUpdate, // Destructure the reaction update prop
}) => {
  const [userReactions, setUserReactions] = useState(initialReactions);
  const [copied, setCopied] = useState(false);

  const handleReaction = (reactionId: string) => {
    // Update local state first for optimistic UI
    setUserReactions(prev => ({
      ...prev,
      [reactionId]: (prev[reactionId] || 0) + 1
    }));

    // Call the handler passed from PromptGrid to update the backend and refetch
    onReactionUpdate(id, reactionId);

    // Note: Toast notifications are now handled in PromptGrid after successful update/refetch
    // We could add an immediate local toast here, but it might be redundant.
  };

  // Stop propagation for the header copy button click
  const handleHeaderCopyClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    handleCopy(); // Call the original copy logic
  };

  // Stop propagation for the header copy button keydown
  const handleHeaderCopyKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      // Allow default button activation but stop propagation to the card
      e.stopPropagation();
    }
  };

  const handleCopy = async () => { // Original copy logic remains
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
      className={cn(
        "prompt-card group relative rounded-xl border border-border/50 bg-card transition-all duration-300",
        "hover:shadow-md hover:border-primary/20", // Existing hover
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", // Standard focus ring
        "cursor-pointer" // Make it clear it's clickable
      )}
      onClick={() => onCardClick(id)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault(); // Prevent spacebar scrolling
          onCardClick(id);
        }
      }}
      role="button" // Announce as button
      tabIndex={0} // Make focusable
      aria-label={`View details for prompt: ${title}`} // Accessibility label
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

          <Button
            variant="secondary"
            size="sm" // Corrected size from 'xs' to 'sm'
            onClick={handleHeaderCopyClick} // Use wrapper function
            onKeyDown={handleHeaderCopyKeyDown} // Add keydown handler
            className={cn(
              "h-auto px-2 py-0.5 rounded-full text-xs gap-1.5", // Adjusted classes for Button
              copied && "text-green-600 bg-green-100 hover:bg-green-100/90" // Adjusted copied state style
            )}
            title={copied ? "Copied!" : `Copy prompt (used ${copyCount} times)`}
            aria-label={copied ? "Copied!" : `Copy prompt`} // Added aria-label
          >
            {copied ? (
              <CheckCircle2 className="w-3 h-3" aria-hidden="true" /> // Removed mr-0.5, rely on gap
            ) : (
              <Copy className="w-3 h-3" aria-hidden="true" /> // Removed mr-0.5, rely on gap
            )}
            <span className="tabular-nums font-medium">{copyCount}</span>
          </Button>
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
          onReaction={handleReaction} // Pass the updated local handler
        />
      </div>

      {/* Removed the extra overlay div, relying on standard focus/hover styles now */}
    </article>
  );
};

export default PromptCard;
