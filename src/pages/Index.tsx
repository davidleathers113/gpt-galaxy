
import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import FeaturedPrompts from '@/components/FeaturedPrompts';
import AdvancedSearch from '@/components/AdvancedSearch';
import PromptGrid from '@/components/PromptGrid';
import Footer from '@/components/Footer';

const Index = () => {
  const handleSearch = (criteria: any) => {
    console.log('Search criteria:', criteria);
    // In a real app, this would filter the prompts based on criteria
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        <Hero />
        
        <FeaturedPrompts />
        
        <section className="border-t border-border/40 bg-card/50 px-6 md:px-10 py-12">
          <div className="container mx-auto max-w-7xl">
            <h2 className="text-2xl font-bold text-center mb-4">
              Advanced <span className="gradient-text">Search</span>
            </h2>
            <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
              Find exactly what you need with our powerful search tools. Filter by use case, complexity level, or specific programming language.
            </p>
            
            <AdvancedSearch onSearch={handleSearch} />
          </div>
        </section>
        
        <PromptGrid />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
