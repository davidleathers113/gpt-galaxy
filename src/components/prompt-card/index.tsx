
import React, { useState } from 'react';
import { Copy } from 'lucide-react';
import PromptCardDescription from './PromptCardDescription';
import PromptCardCodeDisplay from './PromptCardCodeDisplay';
import PromptCardReactions from './PromptCardReactions';
import { toast } from "sonner";

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
    
    toast(`You reacted!`);
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
      
      <PromptCardDescription description={description} />
      
      <PromptCardCodeDisplay code={code} />
      
      <PromptCardReactions 
        reactions={userReactions} 
        onReaction={handleReaction} 
      />
    </div>
  );
};

export default PromptCard;
