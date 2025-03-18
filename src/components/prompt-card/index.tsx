
import React, { useState } from 'react';
import { Copy, Zap, CheckCircle2 } from 'lucide-react';
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
  
  // Determine compatibility based on the prompt type/category
  const aiCompatibility = ['GPT-4', 'Claude', 'Gemini'];
  
  // Estimated time savings (this would be real data in a production app)
  const estimatedTimeSaved = '~25 min';

  return (
    <div className="prompt-card rounded-xl border border-border bg-card p-5 hover:shadow-md transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-primary/10 text-primary">
            {category}
          </span>
        </div>
        
        <div className="flex items-center text-xs text-muted-foreground gap-2">
          <span className="flex items-center">
            <Zap className="w-3 h-3 mr-1 text-amber-500" /> 
            <span title="Estimated time saved">{estimatedTimeSaved}</span>
          </span>
          <span className="flex items-center">
            <Copy className="w-3 h-3 mr-1" /> 
            <span>{copyCount}</span>
          </span>
        </div>
      </div>
      
      <h3 className="text-lg font-semibold mb-3 group-hover:text-primary transition-colors">
        {title}
      </h3>
      
      <PromptCardDescription description={description} />
      
      <PromptCardCodeDisplay code={code} />
      
      <div className="flex justify-between items-center mb-3 text-xs text-muted-foreground">
        <div className="flex gap-1">
          <span className="flex items-center">
            <CheckCircle2 className="w-3 h-3 mr-1 text-green-500" />
            Works with:
          </span>
          <span>{aiCompatibility.join(', ')}</span>
        </div>
        
        <div>
          <span title="Developer satisfaction rating">Satisfaction: {Math.round((totalReactions / (totalReactions + 10)) * 100)}%</span>
        </div>
      </div>
      
      <PromptCardReactions 
        reactions={userReactions} 
        onReaction={handleReaction} 
      />
    </div>
  );
};

export default PromptCard;
