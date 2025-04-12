import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

// Define the skeleton component mimicking PromptCard structure
const PromptCardSkeleton = () => (
  <article className="prompt-card group relative rounded-xl border border-border/50 bg-card transition-all duration-300">
    {/* Header section wrapper */}
    <div className="p-4 pb-2">
      <header className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-1.5">
          <Skeleton className="h-5 w-20 rounded-full" />
        </div>
        <Skeleton className="h-6 w-14 rounded-full" />
      </header>
      <Skeleton className="h-5 w-3/4 mb-2" />
      <div className="space-y-1.5">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-5/6" />
      </div>
    </div>
    <Separator className="mb-2 bg-border/40" />
    {/* Code section wrapper */}
    <div className="px-4">
       <div className="prompt-code relative rounded-lg bg-secondary/90 border border-border/50 overflow-hidden shadow-sm mb-4">
         <div className="flex items-center justify-between px-3 py-1.5 bg-secondary/95 border-b border-border/40">
            <Skeleton className="h-3 w-12" />
            <Skeleton className="h-7 w-7 rounded-md" />
         </div>
         <div className="px-4 py-3">
            <Skeleton className="h-16 w-full" />
         </div>
       </div>
    </div>
    {/* Reactions section wrapper */}
    <div className="px-4 pt-0 pb-4">
      <div className="flex flex-wrap gap-2">
        <Skeleton className="h-6 w-10 rounded-full" />
        <Skeleton className="h-6 w-10 rounded-full" />
        <Skeleton className="h-6 w-10 rounded-full" />
      </div>
    </div>
  </article>
);

// Updated LoadingState to include the parent container structure from PromptGrid
export function LoadingState() {
  const skeletonCount = 6;

  return (
    // === Replicate container structure from src/components/prompt-grid/PromptGrid.tsx ===
    <section className="px-6 md:px-10 py-16">
      <div className="container mx-auto max-w-7xl">
        {/* FilterBar Placeholder (Optional, but adds to realism) */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
           <Skeleton className="h-8 w-1/3" /> {/* Title placeholder */}
           <div className="flex flex-wrap gap-3">
             <Skeleton className="h-8 w-32 rounded-full" /> {/* Filter 1 */}
             <Skeleton className="h-8 w-32 rounded-full" /> {/* Filter 2 */}
           </div>
        </div>

        {/* The actual grid of skeletons */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: skeletonCount }).map((_, index) => (
            <PromptCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </section>
    // === End Replicated Container Structure ===
  );
}
