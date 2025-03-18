
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PromptCardCodeDisplayProps {
  code: string;
}

const PromptCardCodeDisplay: React.FC<PromptCardCodeDisplayProps> = ({ code }) => {
  const [codeExpanded, setCodeExpanded] = useState(false);

  const toggleCodeExpand = () => {
    setCodeExpanded(!codeExpanded);
  };

  return (
    <div className="prompt-code-container mb-4">
      <div className="prompt-code relative rounded-lg bg-secondary/70 border border-border/40 overflow-hidden">
        <div className={cn(
          "relative transition-all duration-300 p-4",
          codeExpanded ? "max-h-96" : "max-h-32"
        )}>
          <pre className="text-xs sm:text-sm overflow-x-auto elegant-scroll pb-2">
            <code className="block whitespace-pre font-mono">{code}</code>
          </pre>
          
          {!codeExpanded && code.length > 150 && (
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-secondary/90 to-transparent pointer-events-none" />
          )}
        </div>
      </div>
      
      {code.length > 150 && (
        <div className="flex justify-center mt-2 mb-0">
          <button 
            onClick={toggleCodeExpand} 
            className="text-xs inline-flex items-center text-primary hover:bg-primary/5 px-2 py-1 rounded-md transition-colors"
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
      
      <div className="text-[10px] text-muted-foreground/70 mt-1 text-center">
        <span>Scroll horizontally to see more →</span>
      </div>
    </div>
  );
};

export default PromptCardCodeDisplay;
