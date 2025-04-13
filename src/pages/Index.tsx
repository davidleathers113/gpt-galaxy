
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import AdvancedSearch from '@/components/AdvancedSearch';
import PromptGrid from '@/components/prompt-grid';
import Footer from '@/components/Footer';

// Define SearchCriteria type (can be moved later)
interface SearchCriteria {
  query: string;
  category: string;
  sortBy: 'popular' | 'recent' | 'trending';
  minCopies: number | null;
}
const Index = () => {
  const [searchCriteria, setSearchCriteria] = useState<SearchCriteria>({
    query: '',
    category: 'all',
    sortBy: 'popular',
    minCopies: null,
  });

  const handleSearch = (criteria: SearchCriteria) => {
    console.log('Search criteria received in Index:', criteria);
    setSearchCriteria(criteria);
  };
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>PromptVault - Your AI Prompt Collection</title>
        <meta name="description" content="Discover and share the best AI prompts for developers and creators with PromptVault." />
      </Helmet>

      <Header />

      <main className="flex-1 pt-24">
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

        <PromptGrid searchCriteria={searchCriteria} />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
