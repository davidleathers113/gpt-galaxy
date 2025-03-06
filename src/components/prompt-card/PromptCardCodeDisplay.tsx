
import React, { useState } from 'react';
import { Copy, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { toast } from "sonner";
import { cn } from '@/lib/utils';

interface PromptCardCodeDisplayProps {
  code: string;
}

const PromptCardCodeDisplay: React.FC<PromptCardCodeDisplayProps> = ({ code }) => {
  const [copied, setCopied] = useState(false);
  const [codeExpanded, setCodeExpanded] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success("Copied to clipboard!");
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const toggleCodeExpand = () => {
    setCodeExpanded(!codeExpanded);
  };

  return (
    <>
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
    </>
  );
};

export default PromptCardCodeDisplay;
