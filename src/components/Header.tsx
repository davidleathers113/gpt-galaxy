
import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-10 py-4 bg-white/95 backdrop-blur-lg",
        scrolled 
          ? "shadow-md border-b border-border/30" 
          : "shadow-sm"
      )}
      aria-label="Site header"
    >
      <div className="container mx-auto max-w-7xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
              <span className="text-white font-bold text-xl">P</span>
            </div>
            <h1 className="text-xl font-semibold gradient-text tracking-tight">PromptVault</h1>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <nav className="flex items-center space-x-1" aria-label="Main navigation">
              <a href="#" className="nav-link">Discover</a>
              <a href="#" className="nav-link">Categories</a>
              <a href="#" className="nav-link">Trending</a>
              <a href="#" className="nav-link">Submit</a>
            </nav>
            
            <div className="search-input rounded-full px-4 py-2 flex items-center space-x-2 w-64">
              <Search className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
              <input 
                type="text" 
                placeholder="Search prompts..." 
                className="bg-transparent text-sm w-full outline-none placeholder:text-muted-foreground/60"
                aria-label="Search prompts"
              />
            </div>
          </div>
          
          <div className="flex md:hidden">
            <button className="p-2" aria-label="Search">
              <Search className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
