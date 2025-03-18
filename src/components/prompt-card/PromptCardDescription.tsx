
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface PromptCardDescriptionProps {
  description: string;
}

const PromptCardDescription: React.FC<PromptCardDescriptionProps> = ({ description }) => {
  const [expanded, setExpanded] = useState(false);
  
  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  // Check if description is long enough to need expansion
  const needsExpansion = description.length > 80;

  return (
    <div className="relative mb-3 group/description">
      <h3 className="sr-only">Prompt Description</h3>
      <p 
        className={cn(
          "text-sm text-muted-foreground/90",
          expanded ? "" : "line-clamp-2"
        )}
        id="prompt-description"
      >
        {description}
      </p>
      
      {needsExpansion && (
        <Button 
          onClick={toggleExpand} 
          variant="ghost" 
          size="sm"
          className="text-xs h-7 px-2 mt-1 inline-flex items-center gap-1 text-primary/80 hover:text-primary hover:bg-primary/5 focus-visible:bg-primary/10 focus-visible:ring-1 focus-visible:ring-primary/30 rounded transition-all duration-200"
          aria-expanded={expanded}
          aria-controls="prompt-description"
          aria-label={expanded ? "Show less of the description" : "Read more of the description"}
        >
          {expanded ? (
            <>
              <ChevronUp className="w-3 h-3 mr-1 group-hover:translate-y-[-1px] transition-transform" /> 
              <span>Show less</span>
            </>
          ) : (
            <>
              <ChevronDown className="w-3 h-3 mr-1 group-hover:translate-y-[1px] transition-transform" /> 
              <span>Read more</span>
            </>
          )}
        </Button>
      )}
    </div>
  );
};

export default PromptCardDescription;
