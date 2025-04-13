import React, { useState, useEffect } from 'react';
import { Copy, CheckCircle2, X } from 'lucide-react';
import { toast } from "sonner";
import { cn } from '@/lib/utils';
import { PromptWithReactions } from '@/components/prompt-grid/hooks/usePrompts'; // Assuming type location
import PromptCardReactions from '@/components/prompt-card/PromptCardReactions';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
// ScrollArea is removed as the parent div will handle scrolling
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';

interface PromptDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  prompt: PromptWithReactions | null;
  onReactionUpdate: (promptId: string, reactionId: string) => void;
}

const PromptDetailModal: React.FC<PromptDetailModalProps> = ({
  isOpen,
  onClose,
  prompt,
  onReactionUpdate,
}) => {
  const [copied, setCopied] = useState(false);

  // Reset copied state when modal closes or prompt changes
  useEffect(() => {
    if (!isOpen) {
      setCopied(false);
    }
  }, [isOpen]);

  const handleCopyCode = () => {
    if (!prompt?.code) return;
    navigator.clipboard.writeText(prompt.code);
    setCopied(true);
    toast.success("Code copied to clipboard!");

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  // Prevent rendering if no prompt is selected
  if (!prompt) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="max-w-[90%] max-h-[90vh] flex flex-col p-6" // Keep flex-col structure
        hideDefaultClose={true}
      >
        {/* Header: Fixed */}
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold mb-2">
            {prompt.title}
          </DialogTitle>
          <DialogDescription asChild>
            <div className="flex items-center space-x-2 !mt-1 text-sm text-muted-foreground">
               <Badge
                 variant="outline"
                 className="px-2 py-0.5 text-[10px] font-medium bg-primary/5 hover:bg-primary/10 border-primary/10 text-primary"
               >
                 {prompt.category}
               </Badge>
               <span className="text-sm">
                 (Copied {prompt.copy_count} times)
               </span>
            </div>
          </DialogDescription>
        </DialogHeader>

        {/* Main Content Area: This div grows and handles scrolling */}
        <div className="flex-grow min-h-0 overflow-y-auto py-4 space-y-6 elegant-scroll"> {/* Added elegant-scroll here */}
            {/* Description Section */}
            <div>
              <h3 className="text-sm font-medium mb-1 text-muted-foreground">Description</h3>
              <p className="text-sm text-foreground/90 whitespace-pre-wrap">
                {prompt.description || <span className="italic">No description provided.</span>}
              </p>
            </div>

            {/* Code Section (Conditionally rendered) */}
            {prompt.code && (
              <div className="border-t pt-4 mt-4"> {/* Wrapper for top border */}
                  <h3 className="text-sm font-medium mb-2 text-muted-foreground">Code</h3>
                  {/* Container for code block visuals & copy button */}
                  {/* Apply styling previously on ScrollArea here */}
                  <div className="relative rounded-lg bg-secondary border border-border/30 shadow-sm overflow-hidden"> {/* Added overflow-hidden for rounded corners */}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleCopyCode}
                        className="absolute top-2 right-2 h-7 w-7 text-muted-foreground hover:text-foreground z-10"
                        aria-label={copied ? "Copied" : "Copy code to clipboard"}
                      >
                        {copied ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                        ) : (
                          <Copy className="w-3.5 h-3.5 opacity-70 hover:opacity-100 transition-opacity" />
                        )}
                      </Button>
                      {/* Inner wrapper for padding */}
                      <div className="p-4"> {/* Padding for the code itself */}
                        <pre className="text-xs sm:text-sm max-w-full">
                          <code className="block font-mono text-foreground/90 whitespace-pre-wrap">{prompt.code}</code>
                        </pre>
                      </div>
                  </div>
              </div>
            )}
        </div>

        {/* Footer: Fixed */}
        <DialogFooter className="pt-4 border-t mt-auto flex justify-start">
          <div className="mr-auto"> {/* Wrap reactions and push to the left */}
            <PromptCardReactions
              reactions={prompt.reactions}
              onReaction={(reactionId) => onReactionUpdate(prompt.id, reactionId)}
            />
          </div>
        </DialogFooter>

        {/* Explicit Close Button: Position relative to DialogContent */}
        <DialogClose asChild className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
           <Button variant="ghost" size="icon">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default PromptDetailModal;