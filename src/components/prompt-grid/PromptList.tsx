
import React from 'react';
import PromptCard from '@/components/PromptCard';
import { PromptWithReactions } from './hooks/usePrompts';

interface PromptListProps {
  promptColumns: PromptWithReactions[][];
}

export default function PromptList({ promptColumns }: PromptListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {promptColumns.map((column, columnIndex) => (
        <div key={columnIndex} className="flex flex-col gap-6">
          {column.map(prompt => (
            <PromptCard 
              key={prompt.id}
              id={prompt.id}
              title={prompt.title}
              description={prompt.description}
              code={prompt.code}
              category={prompt.category}
              copyCount={prompt.copy_count}
              reactions={prompt.reactions}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
