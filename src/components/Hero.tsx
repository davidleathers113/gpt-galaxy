
import React from 'react';
import { ArrowRight, Search, Star } from 'lucide-react';
import { AuroraBackground } from '@/components/ui/aurora-background';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      <AuroraBackground className="min-h-[90vh] py-32">
        <motion.div
          initial={{ opacity: 0.0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="container mx-auto max-w-3xl px-6 md:px-10"
        >
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-3 py-1 mb-6 rounded-full bg-primary/10 text-primary text-sm font-medium animate-pulse-light">
              <Star className="w-3.5 h-3.5 mr-1" />
              Developer-Tested AI Prompts That Solve Real Problems
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-balance dark:text-white">
              Cut Your Coding Time in <span className="gradient-text">Half</span> with Expert-Crafted AI Instructions
            </h1>
            
            <p className="text-lg dark:text-neutral-200 text-muted-foreground mb-8 max-w-2xl mx-auto text-balance">
              Browse our collection of 2,500+ AI prompts specifically designed for software developers at every skill level. Each prompt has been tested and refined to produce consistent, high-quality outputs.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <div className="search-input rounded-full px-5 py-3 flex items-center space-x-3 w-full sm:w-auto sm:min-w-80 border border-border">
                <Search className="w-5 h-5 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Find your perfect prompt..." 
                  className="bg-transparent text-base w-full outline-none placeholder:text-muted-foreground/60"
                />
              </div>
              
              <button className="rounded-full px-6 py-3 bg-primary text-primary-foreground font-medium flex items-center space-x-2 transition-all hover:brightness-110 w-full sm:w-auto">
                <span>Boost Your Dev Workflow</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              <span className="font-medium text-foreground dark:text-white">Top use cases:</span>
              {['Code Refactoring', 'Architecture Design', 'Data Analysis', 'Testing & QA', 'Documentation'].map((tag) => (
                <a 
                  key={tag} 
                  href="#" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {tag}
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </AuroraBackground>
    </section>
  );
};

export default Hero;
