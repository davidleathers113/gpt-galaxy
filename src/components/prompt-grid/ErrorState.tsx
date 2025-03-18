
import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from "sonner";

interface ErrorStateProps {
  errorMessage: string;
  onRetry: () => void;
}

export function ErrorState({ errorMessage, onRetry }: ErrorStateProps) {
  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col items-center justify-center bg-destructive/10 rounded-xl p-10 text-center gap-4 border border-dashed border-destructive/30">
        <AlertCircle className="h-12 w-12 text-destructive" />
        <div>
          <h3 className="text-lg font-semibold mb-1 text-destructive">Error Loading Prompts</h3>
          <p className="text-destructive/80 max-w-md">
            {errorMessage || "Failed to load prompts from Supabase. Please check your connection and database."}
          </p>
        </div>
        <Button 
          variant="outline" 
          className="border-destructive/30 hover:bg-destructive/10 text-destructive"
          onClick={() => {
            toast.info("Retrying connection to Supabase...")
            onRetry();
          }}
        >
          Retry
        </Button>
      </div>
    </div>
  );
}
