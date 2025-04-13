
import React from 'react';
import { cn } from '@/lib/utils'; // Keep cn if needed, otherwise remove later if PromptCardCodeDisplay doesn't need it either

interface PromptCardDescriptionProps {
  description: string;
}

const PromptCardDescription: React.FC<PromptCardDescriptionProps> = ({ description }) => {
  return (
    // Apply line-clamp-3 for truncation as per spec
    // Added mb-3 for spacing consistent with original collapsible container
    <div className="mb-2">
      <h3 className="sr-only">Prompt Description</h3>
      <p className={cn(
        "text-sm text-muted-foreground/90 line-clamp-3", // Apply line-clamp-3
        !description && "italic" // Optional: style if description is empty
      )} title={description}> {/* Add title attribute for full text on hover */}
        {description || "No description provided."} {/* Handle empty description */}
      </p>
    </div>
  );
};

export default PromptCardDescription;
