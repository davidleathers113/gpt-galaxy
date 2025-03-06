
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
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main>
        <Hero />
        
        <FeaturedPrompts />
        
        <section className="px-6 md:px-10 py-12">
          <div className="container mx-auto max-w-7xl">
            <h2 className="text-2xl font-bold text-center mb-8">
              Find The <span className="gradient-text">Perfect Prompt</span>
            </h2>
            
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
