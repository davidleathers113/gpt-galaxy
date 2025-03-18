
import React, { useState } from 'react';
import { Copy, Zap, CheckCircle2, Clock } from 'lucide-react';
import PromptCardDescription from './PromptCardDescription';
import PromptCardCodeDisplay from './PromptCardCodeDisplay';
import PromptCardReactions from './PromptCardReactions';
import { toast } from "sonner";
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

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
  
  const handleReaction = (reactionId: string) => {
    setUserReactions(prev => ({
      ...prev,
      [reactionId]: (prev[reactionId] || 0) + 1
    }));
    
    const reactionLabels = {
      like: 'Helpful',
      love: 'Love',
      smile: 'Brilliant',
      save: 'Saved to your collection'
    };
    
    toast(`You reacted: ${reactionLabels[reactionId as keyof typeof reactionLabels] || 'Reaction'}`);
  };

  // Calculate total reactions as a proxy for effectiveness
  const totalReactions = Object.values(userReactions).reduce((sum, count) => sum + count, 0);

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
          
          <div 
            className="flex items-center gap-1.5 text-xs text-muted-foreground/80 bg-secondary/50 px-2 py-0.5 rounded-full" 
            title={`Copied ${copyCount} times`}
          >
            <Copy className="w-3 h-3 mr-0.5" /> 
            <span className="tabular-nums font-medium">{copyCount}</span>
          </div>
        </header>
        
        <h2 className="text-base font-semibold mb-2 text-foreground group-hover:text-primary/90 transition-colors line-clamp-1">
          {title}
        </h2>
        
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
