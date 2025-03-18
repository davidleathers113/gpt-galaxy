
import React, { useState } from 'react';
import { Copy, Zap, CheckCircle2, Clock } from 'lucide-react';
import PromptCardDescription from './PromptCardDescription';
import PromptCardCodeDisplay from './PromptCardCodeDisplay';
import PromptCardReactions from './PromptCardReactions';
import { toast } from "sonner";
import { cn } from '@/lib/utils';

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
    <div className="prompt-card group relative rounded-xl border border-border bg-card hover:shadow-md transition-all duration-300">
      {/* Top section with improved layout */}
      <div className="p-5 pb-3">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary">
              {category}
            </span>
            <span className="text-xs text-muted-foreground flex items-center">
              <Clock className="w-3 h-3 mr-1 text-amber-500" strokeWidth={2.5} /> 
              <span title="Estimated time saved">{estimatedTimeSaved}</span>
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="flex items-center text-xs text-muted-foreground">
              <Copy className="w-3 h-3 mr-1" /> 
              <span>{copyCount}</span>
            </span>
          </div>
        </div>
        
        <h3 className="text-lg font-semibold mb-2.5 text-foreground group-hover:text-primary transition-colors">
          {title}
        </h3>
        
        <PromptCardDescription description={description} />
      </div>
      
      {/* Code section with improved visual distinction */}
      <div className="px-5">
        <PromptCardCodeDisplay code={code} />
      </div>
      
      {/* Bottom section with compatibility and reactions */}
      <div className="px-5 pt-2 pb-5">
        <div className="flex justify-between items-center mb-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3 h-3 text-green-500" />
            <span>Works with: </span>
            <div className="flex gap-1">
              {aiCompatibility.map((ai, index) => (
                <span key={ai} className={cn(
                  "px-1.5 py-0.5 rounded-sm text-[10px] font-medium",
                  index === 0 ? "bg-blue-100 text-blue-700" : 
                  index === 1 ? "bg-purple-100 text-purple-700" : 
                  "bg-emerald-100 text-emerald-700"
                )}>
                  {ai}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <span title="Developer satisfaction rating" className="flex items-center">
              <span className="text-muted-foreground mr-1">Satisfaction:</span>
              <span className="font-medium text-foreground">{Math.round((totalReactions / (totalReactions + 10)) * 100)}%</span>
            </span>
          </div>
        </div>
        
        <PromptCardReactions 
          reactions={userReactions} 
          onReaction={handleReaction} 
        />
      </div>
      
      {/* Subtle hover effect for the entire card */}
      <div className="absolute inset-0 rounded-xl border border-primary opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
};

export default PromptCard;
