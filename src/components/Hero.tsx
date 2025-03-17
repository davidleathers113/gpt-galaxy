
import React from 'react';
import { ArrowRight, Search, Star } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative pt-32 pb-16 px-6 md:px-10 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[100vh] bg-gradient-to-b from-primary/5 to-transparent -z-10"></div>
      
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-3 py-1 mb-6 rounded-full bg-primary/10 text-primary text-sm font-medium animate-pulse-light">
            <Star className="w-3.5 h-3.5 mr-1" />
            Discover the best AI prompts for developers
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-balance">
            Elevate Your AI Development with <span className="gradient-text">Perfect Prompts</span>
          </h1>
          
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto text-balance">
            A curated collection of powerful AI prompts designed to boost your productivity, spark creativity, and solve complex problems.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <div className="search-input rounded-full px-5 py-3 flex items-center space-x-3 w-full sm:w-auto sm:min-w-80 border border-border">
              <Search className="w-5 h-5 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search for prompts..." 
                className="bg-transparent text-base w-full outline-none placeholder:text-muted-foreground/60"
              />
            </div>
            
            <button className="rounded-full px-6 py-3 bg-primary text-primary-foreground font-medium flex items-center space-x-2 transition-all hover:brightness-110 w-full sm:w-auto">
              <span>Explore All</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3 text-sm">
            <span className="font-medium text-foreground">Popular:</span>
            {['Development', 'Data Analysis', 'Content Creation', 'Debugging', 'Creative Writing'].map((tag) => (
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
      </div>
    </section>
  );
};

export default Hero;
