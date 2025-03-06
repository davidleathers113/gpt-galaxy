
import React from 'react';
import { Heart, Smile, ThumbsUp, Star } from 'lucide-react';
import { toast } from "sonner";
import { cn } from '@/lib/utils';

export interface Reaction {
  id: string;
  icon: React.ReactNode;
  label: string;
  color: string;
}

export const reactions: Reaction[] = [
  { 
    id: 'like', 
    icon: <ThumbsUp className="w-4 h-4" />, 
    label: 'Helpful', 
    color: 'bg-blue-100 text-blue-600 hover:bg-blue-200' 
  },
  { 
    id: 'love', 
    icon: <Heart className="w-4 h-4" />, 
    label: 'Love', 
    color: 'bg-red-100 text-red-600 hover:bg-red-200' 
  },
  { 
    id: 'smile', 
    icon: <Smile className="w-4 h-4" />, 
    label: 'Brilliant', 
    color: 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200' 
  },
  { 
    id: 'save', 
    icon: <Star className="w-4 h-4" />, 
    label: 'Save', 
    color: 'bg-purple-100 text-purple-600 hover:bg-purple-200' 
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
  return (
    <div className="flex flex-wrap gap-2">
      {reactions.map((reaction) => (
        <button
          key={reaction.id}
          onClick={() => onReaction(reaction.id)}
          className={cn(
            "text-xs rounded-full px-2.5 py-1 flex items-center gap-1 transition-all",
            reaction.color,
            "hover:scale-105 active:scale-95"
          )}
          aria-label={`React with ${reaction.label}`}
        >
          {reaction.icon}
          <span>{userReactions[reaction.id] || 0}</span>
        </button>
      ))}
    </div>
  );
};

export default PromptCardReactions;
