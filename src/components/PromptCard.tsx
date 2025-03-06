
import React, { useState } from 'react';
import { Copy, Check, Heart, Smile, ThumbsUp, Star, ChevronDown, ChevronUp } from 'lucide-react';
import { toast } from "sonner";
import { cn } from '@/lib/utils';

interface Reaction {
  id: string;
  icon: React.ReactNode;
  label: string;
  color: string;
}

interface PromptCardProps {
  id: string;
  title: string;
  description: string;
  code: string;
  category: string;
  copyCount: number;
  reactions: Record<string, number>;
}

const reactions: Reaction[] = [
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

const PromptCard: React.FC<PromptCardProps> = ({
  id,
  title,
  description,
  code,
  category,
  copyCount,
  reactions: initialReactions,
}) => {
  const [copied, setCopied] = useState(false);
  const [userReactions, setUserReactions] = useState(initialReactions);
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);
  const [codeExpanded, setCodeExpanded] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success("Copied to clipboard!");
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  
  const handleReaction = (reactionId: string) => {
    setUserReactions(prev => ({
      ...prev,
      [reactionId]: (prev[reactionId] || 0) + 1
    }));
    
    // Find the reaction object to get its label
    const reactionObj = reactions.find(r => r.id === reactionId);
    const reactionLabel = reactionObj ? reactionObj.label : reactionId;
    
    toast(`You reacted with ${reactionLabel}!`);
  };

  const toggleDescriptionExpand = () => {
    setDescriptionExpanded(!descriptionExpanded);
  };

  const toggleCodeExpand = () => {
    setCodeExpanded(!codeExpanded);
  };

  return (
    <div className="prompt-card group animate-fade-in">
      <div className="flex justify-between items-start mb-3">
        <div>
          <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-secondary text-secondary-foreground">
            {category}
          </span>
        </div>
        <div className="flex items-center text-xs text-muted-foreground">
          <Copy className="w-3 h-3 mr-1" /> 
          <span>{copyCount}</span>
        </div>
      </div>
      
      <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
        {title}
      </h3>
      
      <div className="relative mb-4">
        <p className={cn(
          "text-sm text-muted-foreground",
          descriptionExpanded ? "" : "line-clamp-2"
        )}>
          {description}
        </p>
        
        {description.length > 100 && (
          <button 
            onClick={toggleDescriptionExpand} 
            className="text-xs flex items-center text-primary hover:underline mt-1"
            aria-expanded={descriptionExpanded}
            aria-label={descriptionExpanded ? "Show less description" : "Read more description"}
          >
            {descriptionExpanded ? (
              <>
                <ChevronUp className="w-3 h-3 mr-1" /> Show less
              </>
            ) : (
              <>
                <ChevronDown className="w-3 h-3 mr-1" /> Read more
              </>
            )}
          </button>
        )}
      </div>
      
      <div className="prompt-code mb-4 group-hover:shadow-sm transition-all relative">
        <button 
          onClick={handleCopy}
          className="absolute top-2 right-2 p-1.5 rounded-md bg-background/50 hover:bg-background backdrop-blur-sm transition-all"
          aria-label="Copy code to clipboard"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-500" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </button>
        <div className={cn(
          "relative",
          codeExpanded ? "max-h-96" : "max-h-32"
        )}>
          <pre className="text-xs sm:text-sm overflow-x-auto elegant-scroll pb-2">
            <code className="block whitespace-pre">{code}</code>
          </pre>
          
          {!codeExpanded && code.length > 150 && (
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-secondary/80 to-transparent pointer-events-none" />
          )}
        </div>
        
        <div className="text-xs text-muted-foreground mt-2 text-center italic">
          <span>Scroll horizontally to see more →</span>
        </div>
      </div>
      
      {code.length > 150 && (
        <div className="text-center mb-4">
          <button 
            onClick={toggleCodeExpand} 
            className="text-xs inline-flex items-center text-primary hover:underline"
            aria-expanded={codeExpanded}
            aria-label={codeExpanded ? "Show less code" : "Show more code"}
          >
            {codeExpanded ? (
              <>
                <ChevronUp className="w-3 h-3 mr-1" /> Show less code
              </>
            ) : (
              <>
                <ChevronDown className="w-3 h-3 mr-1" /> Show more code
              </>
            )}
          </button>
        </div>
      )}
      
      <div className="flex flex-wrap gap-2">
        {reactions.map((reaction) => (
          <button
            key={reaction.id}
            onClick={() => handleReaction(reaction.id)}
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
    </div>
  );
};

export default PromptCard;
