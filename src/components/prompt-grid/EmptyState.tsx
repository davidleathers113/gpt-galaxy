
import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from "sonner";

interface EmptyStateProps {
  onRetry: () => void;
}

export function EmptyState({ onRetry }: EmptyStateProps) {
  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col items-center justify-center bg-muted/30 rounded-xl p-10 text-center gap-4 border border-dashed border-muted-foreground/30">
        <AlertCircle className="h-12 w-12 text-muted-foreground" />
        <div>
          <h3 className="text-lg font-semibold mb-1">No Prompts Found</h3>
          <p className="text-muted-foreground max-w-md">
            There are no prompts in the Supabase database. You need to add some prompts to the 'prompts' table.
          </p>
        </div>
        <Button 
          variant="outline" 
          onClick={() => {
            toast.info("Checking Supabase connection...")
            onRetry();
          }}
          className="mt-2"
        >
          Retry Connection
        </Button>
      </div>
    </div>
  );
}
