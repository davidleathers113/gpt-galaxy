
import React from 'react';
import { Star, ArrowRight } from 'lucide-react';
import PromptCard from './PromptCard';
import { mockPrompts } from '@/data/mockData';

const FeaturedPrompts = () => {
  // Get the top 3 prompts by copy count for the featured section
  const featuredPrompts = [...mockPrompts]
    .sort((a, b) => b.copyCount - a.copyCount)
    .slice(0, 3);

  return (
    <section className="px-6 md:px-10 py-16 bg-gradient-to-b from-primary/5 to-transparent">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10">
          <div>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-3">
              <Star className="w-3.5 h-3.5 mr-1.5" />
              Trusted by 5,000+ Developers
            </div>
            <h2 className="text-2xl font-bold">
              Top-Performing <span className="gradient-text">Time-Savers</span>
            </h2>
          </div>
          
          <a 
            href="#" 
            className="group inline-flex items-center text-sm font-medium mt-4 sm:mt-0 hover:text-primary transition-colors"
          >
            <span>Explore full collection (2,500+ prompts)</span>
            <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredPrompts.map(prompt => (
            <PromptCard 
              key={prompt.id} 
              {...prompt} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPrompts;
