
import React, { useState } from 'react';
import { Heart, Smile, ThumbsUp, Star } from 'lucide-react';
import { toast } from "sonner";
import { cn } from '@/lib/utils';

export interface Reaction {
  id: string;
  icon: React.ReactNode;
  label: string;
  color: string;
  hoverColor: string;
  activeColor: string;
}

export const reactions: Reaction[] = [
  { 
    id: 'like', 
    icon: <ThumbsUp className="w-3.5 h-3.5" />, 
    label: 'Helpful', 
    color: 'bg-blue-50 text-blue-600 border-blue-100', 
    hoverColor: 'hover:bg-blue-100 hover:border-blue-200',
    activeColor: 'active:bg-blue-200'
  },
  { 
    id: 'love', 
    icon: <Heart className="w-3.5 h-3.5" />, 
    label: 'Love', 
    color: 'bg-red-50 text-red-600 border-red-100',
    hoverColor: 'hover:bg-red-100 hover:border-red-200',
    activeColor: 'active:bg-red-200'
  },
  { 
    id: 'smile', 
    icon: <Smile className="w-3.5 h-3.5" />, 
    label: 'Brilliant', 
    color: 'bg-amber-50 text-amber-600 border-amber-100',
    hoverColor: 'hover:bg-amber-100 hover:border-amber-200',
    activeColor: 'active:bg-amber-200'
  },
  { 
    id: 'save', 
    icon: <Star className="w-3.5 h-3.5" />, 
    label: 'Save', 
    color: 'bg-purple-50 text-purple-600 border-purple-100',
    hoverColor: 'hover:bg-purple-100 hover:border-purple-200',
    activeColor: 'active:bg-purple-200'
  },
];

interface PromptCardReactionsProps {
  reactions: Record<string, number>;
  onReaction: (reactionId: string) => void;
}

const PromptCardReactions: React.FC<PromptCardReactionsProps> = ({ 
  reactions: userReactions, 
  onReaction 
}) => {
  const [recentlyClicked, setRecentlyClicked] = useState<string | null>(null);
  const [hoveredReaction, setHoveredReaction] = useState<string | null>(null);

  const handleReactionClick = (reactionId: string) => {
    onReaction(reactionId);
    setRecentlyClicked(reactionId);
    
    // Remove animation class after animation completes
    setTimeout(() => {
      setRecentlyClicked(null);
    }, 300);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {reactions.map((reaction) => (
        <div className="relative" key={reaction.id}>
          <button
            onClick={() => handleReactionClick(reaction.id)}
            onMouseEnter={() => setHoveredReaction(reaction.id)}
            onMouseLeave={() => setHoveredReaction(null)}
            className={cn(
              "text-xs rounded-full px-3 py-1.5 flex items-center gap-1.5 transition-all border",
              reaction.color,
              reaction.hoverColor,
              reaction.activeColor,
              "hover:scale-105 active:scale-95",
              "touch-manipulation", // Better touch handling
              recentlyClicked === reaction.id && "animate-reaction-pulse"
            )}
            aria-label={`React with ${reaction.label}`}
          >
            {reaction.icon}
            <span className="font-medium tabular-nums">{userReactions[reaction.id] || 0}</span>
          </button>
          
          {/* Tooltip on hover */}
          {hoveredReaction === reaction.id && (
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1.5 px-2 py-1 bg-foreground text-background text-[10px] rounded whitespace-nowrap animate-fade-in z-10">
              {reaction.label}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-2 h-2 bg-foreground rotate-45"></div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PromptCardReactions;
