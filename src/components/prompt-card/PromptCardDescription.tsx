
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface PromptCardDescriptionProps {
  description: string;
}

const PromptCardDescription: React.FC<PromptCardDescriptionProps> = ({ description }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Get first sentence or first 60 chars for the preview
  const previewText = description.split('.')[0] + '.';
  const shortenedPreview = previewText.length > 60 ? previewText.substring(0, 60) + '...' : previewText;
  
  return (
    <div className="relative mb-3 group/description">
      <h3 className="sr-only">Prompt Description</h3>
      
      <Collapsible 
        open={isOpen} 
        onOpenChange={setIsOpen}
        className="w-full"
      >
        <div className="text-sm text-muted-foreground/90 line-clamp-1" id="preview-text">
          {shortenedPreview}
        </div>
        
        <CollapsibleContent className="mt-2 text-sm text-muted-foreground/90">
          {description}
        </CollapsibleContent>
        
        <CollapsibleTrigger asChild>
          <Button 
            variant="ghost" 
            size="sm"
            className="text-xs h-7 px-2 mt-1 inline-flex items-center gap-1 text-primary/80 hover:text-primary hover:bg-primary/5 focus-visible:bg-primary/10 focus-visible:ring-1 focus-visible:ring-primary/30 rounded transition-all duration-200"
            aria-expanded={isOpen}
            aria-controls="preview-text"
            aria-label={isOpen ? "Show less of the description" : "Show more of the description"}
          >
            {isOpen ? (
              <>
                <ChevronUp className="w-3 h-3 mr-1 group-hover:translate-y-[-1px] transition-transform" /> 
                <span>Show less</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-3 h-3 mr-1 group-hover:translate-y-[1px] transition-transform" /> 
                <span>Show more</span>
              </>
            )}
          </Button>
        </CollapsibleTrigger>
      </Collapsible>
    </div>
  );
};

export default PromptCardDescription;
