import React, { useEffect, useState } from 'react';
import { Search, Menu, X, UploadCloud, ListPlus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from '@/components/ui/sheet';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Consistent navigation links data with icons
  const navLinks = [
    { href: '/submit', label: 'Submit', icon: UploadCloud },
    { href: '/waitlist', label: 'Join Waitlist', icon: ListPlus },
  ];

  // Reusable Logo Component
  const Logo = ({ className = "" }: { className?: string }) => (
    <Link to="/" className={cn("flex items-center space-x-2", className)}>
      <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center flex-shrink-0">
        <span className="text-primary-foreground font-bold text-lg">P</span>
      </div>
      <h1 className="text-lg sm:text-xl font-semibold gradient-text tracking-tight">
        PromptVault
      </h1>
    </Link>
  );


  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-4 sm:px-6 md:px-10 py-3",
        scrolled
          ? "bg-background/90 backdrop-blur-sm shadow-md border-b border-border/30"
          : "bg-background shadow-sm"
      )}
      aria-label="Site header"
    >
      <div className="container mx-auto max-w-7xl">
        <div className="flex items-center justify-between h-14">

          {/* Logo and Site Title */}
          <div className="flex-shrink-0 mr-4">
             <Logo />
          </div>


          {/* Desktop Navigation & Search */}
          <div className="hidden md:flex flex-1 items-center justify-end space-x-6">
            <nav className="flex items-center space-x-2" aria-label="Main navigation">
              {navLinks.map((link) => (
                <Button variant="ghost" asChild key={link.href}>
                  <Link to={link.href}>{link.label}</Link>
                </Button>
              ))}
            </nav>

            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" aria-hidden="true" />
              <Input
                type="search"
                placeholder="Search prompts..."
                className="pl-10 pr-4 py-2 h-9 rounded-md border"
                aria-label="Search prompts"
              />
            </div>
          </div>

          {/* Mobile Triggers */}
          <div className="flex items-center md:hidden space-x-1">
            {/* Mobile Search Trigger (Standard Dialog) */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Search">
                  <Search className="w-5 h-5" aria-hidden="true" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] p-6 pt-4">
                 <div className="text-lg font-semibold mb-4">Search Prompts</div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" aria-hidden="true" />
                  <Input
                    type="search"
                    placeholder="Search prompts..."
                    className="pl-10 pr-4 py-2 h-10 rounded-md border w-full"
                    aria-label="Search prompts"
                  />
                </div>
                {/* Close button for Search Dialog */}
                <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                   <X className="h-4 w-4" />
                   <span className="sr-only">Close</span>
                </DialogClose>
              </DialogContent>
            </Dialog>

            {/* Mobile Navigation Trigger (Full Screen Dialog) */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open navigation menu">
                  <Menu className="w-5 h-5" aria-hidden="true" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full max-w-xs sm:max-w-sm p-0 flex flex-col">
                <SheetHeader className="p-6 pb-4 border-b">
                  <SheetTitle className="flex items-center">
                    <Logo className="mr-3"/> {/* Reuse Logo component */}
                    Navigation
                  </SheetTitle>
                  {/* Removed explicit SheetClose as SheetContent provides one by default, and we are replacing it */}
                </SheetHeader>
                <nav className="flex-1 p-6 space-y-2 overflow-y-auto" aria-label="Mobile navigation">
                  {navLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      // Wrap Link in SheetClose to close sheet on navigation
                      <SheetClose asChild key={link.href}>
                        <Link
                          to={link.href}
                          className={cn(
                            "flex items-center w-full rounded-md p-3 text-base font-medium", // Adjusted styling for sheet context
                            "text-foreground/90",
                            "transition-colors duration-150 ease-in-out",
                            "hover:bg-muted hover:text-primary dark:hover:text-primary",
                            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:bg-muted focus-visible:text-primary"
                          )}
                        >
                          <Icon className="h-5 w-5 mr-3 flex-shrink-0" aria-hidden="true" />
                          <span>{link.label}</span>
                        </Link>
                      </SheetClose>
                    );
                  })}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
