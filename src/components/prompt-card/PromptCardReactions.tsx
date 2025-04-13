
import React, { useState } from 'react';
import { Heart, Smile, ThumbsUp, Star, MoreHorizontal } from 'lucide-react';
import { toast } from "sonner";
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button'; // Added
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip"; // Added
import { useIsMobile } from "@/hooks/use-mobile";

export interface Reaction {
  id: string;
  icon: React.ReactNode;
  label: string;
  // Restore color properties for Option A
  color: string; // Base text color for icon
  // hoverColor: string; // No longer needed
  // activeColor: string; // No longer needed
}

export const reactions: Reaction[] = [
  {
    id: 'like',
    icon: <ThumbsUp className="w-3.5 h-3.5" />,
    label: 'Helpful',
    color: 'text-blue-600',
  },
  {
    id: 'love',
    icon: <Heart className="w-3.5 h-3.5" />,
    label: 'Love',
    color: 'text-red-600',
  },
  {
    id: 'smile',
    icon: <Smile className="w-3.5 h-3.5" />,
    label: 'Brilliant',
    color: 'text-amber-600',
  },
  {
    id: 'save',
    icon: <Star className="w-3.5 h-3.5" />,
    label: 'Save',
    color: 'text-purple-600',
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
  // Removed hoveredReaction state, Tooltip handles hover
  const isMobile = useIsMobile();

  // Calculate threshold for small screen: 380px is approximately extra small screens
  const isExtraSmallScreen = typeof window !== 'undefined' && window.innerWidth < 380;
  const shouldCollapseReactions = isExtraSmallScreen;

  // Stop propagation for reaction button clicks/keydowns
  const handleReactionClick = (e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>, reactionId: string) => {
    e.stopPropagation(); // Prevent card click trigger
    onReaction(reactionId);
    setRecentlyClicked(reactionId);

    // Remove animation class after animation completes
    setTimeout(() => {
      setRecentlyClicked(null);
    }, 300);
  };

  const handleReactionKeyDown = (e: React.KeyboardEvent<HTMLButtonElement | HTMLDivElement>, reactionId: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      // Allow default button activation but stop propagation to the card
      e.stopPropagation();
      // Note: The actual reaction logic is triggered by onClick,
      // but stopping propagation here prevents the card's keydown handler.
    }
  };

  // Render collapsible menu for small screens
  if (shouldCollapseReactions) {
    return (
      <div className="flex justify-start">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="secondary"
              size="sm"
              className="text-xs rounded-full px-3 py-1.5 h-auto gap-1.5 border"
              aria-label="Show reaction options"
            >
              <MoreHorizontal className="w-3.5 h-3.5" />
              <span className="font-medium">React</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="min-w-[150px]">
            {reactions.map((reaction) => (
              <DropdownMenuItem
                key={reaction.id}
                onClick={(e) => handleReactionClick(e, reaction.id)}
                onKeyDown={(e) => handleReactionKeyDown(e, reaction.id)} // Add keydown handler for dropdown items
                className="flex items-center gap-2 text-sm cursor-pointer"
              >
                <span className={cn(reaction.color)}>{reaction.icon}</span>
                <span>{reaction.label}</span>
                <span className="ml-auto font-mono text-xs text-muted-foreground tabular-nums">
                  {userReactions[reaction.id] || 0}
                </span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }

  // Standard rendering for normal screens
  return (
    <TooltipProvider delayDuration={300}> {/* Added TooltipProvider */}
      <div
        className="flex flex-wrap gap-2"
        role="group"
        aria-label="Prompt reactions"
      >
        {reactions.map((reaction) => (
          <Tooltip key={reaction.id}>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => handleReactionClick(e, reaction.id)}
                onKeyDown={(e) => handleReactionKeyDown(e, reaction.id)}
                className={cn(
                  "text-xs rounded-full px-3 py-1.5 h-auto flex items-center gap-1.5 transition-all duration-200 border", // Base outline styles
                  "hover:bg-accent hover:text-accent-foreground",
                  "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
                  "active:scale-95",
                  recentlyClicked === reaction.id && "animate-reaction-pulse"
                )}
                aria-label={`React with ${reaction.label}`}
                aria-pressed={!!userReactions[reaction.id] && userReactions[reaction.id] > 0}
              >
                {/* Apply theme color only to the icon */}
                <span className={cn(reaction.color)}>{reaction.icon}</span>
                <span className="font-medium tabular-nums">{userReactions[reaction.id] || 0}</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top" className="text-xs"> {/* Use TooltipContent */}
              <p>{reaction.label}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
};

export default PromptCardReactions;
