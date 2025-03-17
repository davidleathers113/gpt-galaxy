
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
    icon: <ThumbsUp className="w-4 h-4" />, 
    label: 'Helpful', 
    color: 'bg-blue-100 text-blue-600', 
    hoverColor: 'hover:bg-blue-200',
    activeColor: 'active:bg-blue-300'
  },
  { 
    id: 'love', 
    icon: <Heart className="w-4 h-4" />, 
    label: 'Love', 
    color: 'bg-red-100 text-red-600',
    hoverColor: 'hover:bg-red-200',
    activeColor: 'active:bg-red-300'
  },
  { 
    id: 'smile', 
    icon: <Smile className="w-4 h-4" />, 
    label: 'Brilliant', 
    color: 'bg-yellow-100 text-yellow-600',
    hoverColor: 'hover:bg-yellow-200',
    activeColor: 'active:bg-yellow-300'
  },
  { 
    id: 'save', 
    icon: <Star className="w-4 h-4" />, 
    label: 'Save', 
    color: 'bg-purple-100 text-purple-600',
    hoverColor: 'hover:bg-purple-200',
    activeColor: 'active:bg-purple-300'
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

  const handleReactionClick = (reactionId: string) => {
    onReaction(reactionId);
    setRecentlyClicked(reactionId);
    
    // Remove animation class after animation completes
    setTimeout(() => {
      setRecentlyClicked(null);
    }, 300);
  };

  return (
    <div className="flex flex-wrap gap-2 md:gap-3">
      {reactions.map((reaction) => (
        <button
          key={reaction.id}
          onClick={() => handleReactionClick(reaction.id)}
          className={cn(
            "text-xs md:text-sm rounded-full px-3 py-1.5 md:px-3.5 md:py-2 flex items-center gap-1.5 transition-all",
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
          <span className="font-medium">{userReactions[reaction.id] || 0}</span>
        </button>
      ))}
    </div>
  );
};

export default PromptCardReactions;
