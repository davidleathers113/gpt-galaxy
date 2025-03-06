
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

  return (
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
  );
};

export default PromptCardDescription;
