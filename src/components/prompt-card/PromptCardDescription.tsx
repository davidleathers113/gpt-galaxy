
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PromptCardDescriptionProps {
  description: string;
}

const PromptCardDescription: React.FC<PromptCardDescriptionProps> = ({ description }) => {
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);
  
  const toggleDescriptionExpand = () => {
    setDescriptionExpanded(!descriptionExpanded);
  };

  // Check if description is long enough to need expansion
  const needsExpansion = description.length > 80;

  return (
    <div className="relative mb-3 group/description">
      <p 
        className={cn(
          "text-sm text-muted-foreground/90",
          descriptionExpanded ? "" : "line-clamp-2"
        )}
      >
        {description}
      </p>
      
      {needsExpansion && (
        <button 
          onClick={toggleDescriptionExpand} 
          className="text-xs flex items-center text-primary/80 hover:text-primary hover:underline mt-1 group focus:outline-none focus-visible:ring-1 focus-visible:ring-primary/30 rounded"
          aria-expanded={descriptionExpanded}
          aria-label={descriptionExpanded ? "Show less of the description" : "Read more of the description"}
        >
          {descriptionExpanded ? (
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
        </button>
      )}
    </div>
  );
};

export default PromptCardDescription;
