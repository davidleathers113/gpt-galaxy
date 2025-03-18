
import React, { useState } from 'react';
import { Copy, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { toast } from "sonner";
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface PromptCardCodeDisplayProps {
  code: string;
}

const PromptCardCodeDisplay: React.FC<PromptCardCodeDisplayProps> = ({ code }) => {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success("Copied to clipboard!");
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  // Determine if code is long enough to warrant expansion
  const isCodeLong = code.length > 150;

  return (
    <div className="prompt-code-container mb-4 group/code-container">
      <div 
        className="prompt-code relative rounded-lg bg-secondary/90 border border-border/50 overflow-hidden shadow-sm group/code transition-shadow duration-200 hover:shadow-md"
        tabIndex={0}
      >
        {/* Header bar with language indicator and copy button */}
        <div className="flex items-center justify-between px-3 py-1.5 bg-secondary/95 border-b border-border/40">
          <span className="text-xs font-medium text-muted-foreground">Code</span>
          
          <button 
            onClick={handleCopy}
            className="p-1.5 rounded-md hover:bg-background/80 focus-visible:bg-background/90 focus-visible:ring-1 focus-visible:ring-primary/30 transition-colors"
            aria-label="Copy code to clipboard"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-green-500" />
            ) : (
              <Copy className="w-3.5 h-3.5 opacity-70 group-hover/code:opacity-100 transition-opacity" />
            )}
          </button>
        </div>
        
        {/* Code content area with improved scrolling and expansion */}
        <div 
          className={cn(
            "relative transition-all duration-300 px-4 py-3",
            expanded ? "max-h-[500px]" : "max-h-32",
            "overflow-hidden"
          )}
          id="code-content"
        >
          <pre className="text-xs sm:text-sm overflow-x-auto elegant-scroll pb-2">
            <code className="block whitespace-pre font-mono text-foreground/90">{code}</code>
          </pre>
          
          {/* Gradient fade for collapsed code */}
          {!expanded && isCodeLong && (
            <div 
              className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-secondary/95 to-transparent pointer-events-none" 
              aria-hidden="true"
            />
          )}
        </div>
      </div>
      
      {/* Expand/collapse button with improved hover feedback */}
      {isCodeLong && (
        <div className="flex justify-center mt-2 mb-0">
          <Button 
            onClick={toggleExpand} 
            variant="ghost" 
            size="sm"
            className="text-xs h-7 px-2 inline-flex items-center gap-1 text-primary/80 hover:text-primary hover:bg-primary/5 focus-visible:bg-primary/10 focus-visible:ring-1 focus-visible:ring-primary/30 rounded transition-all duration-200"
            aria-expanded={expanded}
            aria-controls="code-content"
            aria-label={expanded ? "Show less code" : "Show more code"}
          >
            {expanded ? (
              <>
                <ChevronUp className="w-3 h-3" /> Show less
              </>
            ) : (
              <>
                <ChevronDown className="w-3 h-3" /> Show more
              </>
            )}
          </Button>
        </div>
      )}
      
      {/* Improved scroll indicator that appears when content is scrollable */}
      <div 
        className="text-[10px] text-muted-foreground/60 mt-1 text-center opacity-0 group-hover/code-container:opacity-100 transition-opacity" 
        aria-hidden="true"
      >
        <span aria-hidden="true">←</span>
        <span className="inline-block mx-1">scroll</span>
        <span aria-hidden="true">→</span>
      </div>
    </div>
  );
};

export default PromptCardCodeDisplay;
