
import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react'; // Removed ChevronDown, ChevronUp
import { toast } from "sonner";
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface PromptCardCodeDisplayProps {
  code: string;
}

const PromptCardCodeDisplay: React.FC<PromptCardCodeDisplayProps> = ({ code }) => {
  const [copied, setCopied] = useState(false);
  // Removed expanded state

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success("Copied to clipboard!");

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  // Removed toggleExpand function and isCodeLong check
  return (
    <div className="prompt-code-container mb-4 group/code-container">
      <div
        className="prompt-code relative rounded-lg bg-secondary/90 border border-border/50 overflow-hidden shadow-sm group/code transition-shadow duration-200 hover:shadow-md"
        // Removed tabIndex={0}
      >
        {/* Header bar with language indicator and copy button */}
        <div className="flex items-center justify-between px-3 py-1.5 bg-secondary/95 border-b border-border/40">
          <span className="text-xs font-medium text-muted-foreground">Code</span>

          <Button
            variant="ghost"
            size="icon"
            onClick={handleCopy}
            className="h-7 w-7 text-muted-foreground hover:text-foreground" // Adjusted size and colors
            aria-label={copied ? "Copied" : "Copy code to clipboard"}
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-green-500" />
            ) : (
              <Copy className="w-3.5 h-3.5 opacity-70 group-hover/code:opacity-100 transition-opacity" />
            )}
          </Button>
        </div>

        {/* Code content area with line-clamp */}
        <div className="relative px-4 py-3 overflow-hidden"> {/* Keep overflow-hidden for safety */}
          {/* Apply line-clamp-5 to the pre tag */}
          <pre
            className="text-xs sm:text-sm overflow-x-auto elegant-scroll pb-2 line-clamp-5"
            title={code} /* Add title attribute for full code on hover */
          >
            <code className="block whitespace-pre font-mono text-foreground/90">
              {code || "No code provided."} {/* Handle empty code */}
            </code>
          </pre>
          {/* Removed gradient fade */}
        </div>
      </div>

      {/* Removed expand/collapse button */}
      {/* Removed scroll indicator */}
    </div>
  );
};

export default PromptCardCodeDisplay;
