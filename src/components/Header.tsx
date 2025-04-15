import React, { useEffect, useState, useCallback } from 'react';
import { Search, Menu, X, UploadCloud, ListPlus, Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { useTheme } from '@/hooks/use-theme';

// Throttle utility function with leading and trailing edge options
function throttle<T extends (...args: unknown[]) => void>(
  func: T,
  limit: number,
  options: { leading?: boolean; trailing?: boolean } = { leading: true, trailing: true }
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  let lastResult: unknown;
  let trailingCallScheduled = false;
  let lastArgs: Parameters<T> | null = null;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const throttled = (...args: Parameters<T>) => {
    lastArgs = args; // Always store the latest args

    if (!inThrottle) {
      if (options.leading) {
        // Leading edge call
        lastResult = func(...args);
      }
      inThrottle = true;
      timeoutId = setTimeout(timeoutCallback, limit);
    } else if (options.trailing) {
      // Mark that a trailing call is needed if trailing is enabled
      trailingCallScheduled = true;
    }
    // Note: This implementation doesn't return the function's result consistently,
    // but for event handlers like scroll, the return value is often unused.
    // If the return value were important, more complex handling would be needed.
  };

  const timeoutCallback = () => {
    inThrottle = false;
    timeoutId = null; // Clear the timeout ID

    if (trailingCallScheduled && options.trailing && lastArgs) {
      // If a call was requested during the throttle period and trailing is enabled, execute it now
      trailingCallScheduled = false;
      lastResult = func(...lastArgs); // Execute the trailing call
      // Re-set the timeout for the next potential leading call after this trailing call
      inThrottle = true;
      timeoutId = setTimeout(timeoutCallback, limit);
    } else {
      // Reset lastArgs if no trailing call was needed or executed
      lastArgs = null;
    }
  };

  // Optional: Add a cancel method if needed
  // throttled.cancel = () => {
  //   if (timeoutId) clearTimeout(timeoutId);
  //   inThrottle = false;
  //   trailingCallScheduled = false;
  //   lastArgs = null;
  //   timeoutId = null;
  // };

  return throttled;
}

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const scrollThreshold = 10;
  const throttleDelay = 200; // Throttle delay
  const { isDarkMode, setIsDarkMode } = useTheme();

  // Scroll handling logic will be defined inside useEffect
  useEffect(() => {
    // Define the throttled handler inside the effect
    const handleScroll = throttle(() => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
      // Use the scrollThreshold from the outer scope
      setScrolled(scrollTop > scrollThreshold);
    }, throttleDelay); // Use throttleDelay from the outer scope

    // Attach throttled listener to document
    document.addEventListener('scroll', handleScroll, true);

    // Initial check using global scroll properties
    const initialScrollTop = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
    // Set initial state directly
    setScrolled(initialScrollTop > scrollThreshold);

    // Cleanup: remove the exact same throttled function instance
    return () => {
      document.removeEventListener('scroll', handleScroll, true);
      // If throttle created any timers that need explicit clearing on unmount,
      // the throttle function would need to return a cleanup method.
      // Assuming the current throttle implementation relies only on setTimeout,
      // removing the listener is usually sufficient.
    };
    // Dependencies: scrollThreshold and throttleDelay are used inside the effect's logic
  }, [scrollThreshold, throttleDelay]);

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
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-6 py-2", // Base classes
        { // Conditional classes based on scrolled state
          "bg-background/90 backdrop-blur-sm shadow-md border-b border-border/30": scrolled,
          "bg-background": !scrolled,
        }
      )}
      aria-label="Site header"
    >
       <div className="container mx-auto">
        <div className="flex items-center justify-between h-12">

          {/* Logo and Site Title */}
          <div className="flex-shrink-0 mr-4">
             <Logo />
          </div>


          {/* Desktop Navigation & Search */}
          <div className="hidden md:flex flex-1 items-center justify-end space-x-6">
            <nav className="flex items-center space-x-2" aria-label="Main navigation">
              {navLinks.map((link) => (
                // Use Link styled as a button directly
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    buttonVariants({ variant: "outline" }), // Apply outline button styles
                    "hover:bg-accent hover:text-accent-foreground focus-visible:ring-1 focus-visible:ring-ring" // Add hover/focus styles
                  )}
                >
                  {link.label}
                </Link>
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

            {/* Theme Toggle - Desktop */}
            <div className="flex items-center space-x-2 ml-4">
              <Sun className="h-4 w-4" />
              <Switch
                id="dark-mode-desktop"
                checked={isDarkMode}
                onCheckedChange={setIsDarkMode}
              />
              <Moon className="h-4 w-4" />
              <Label htmlFor="dark-mode-desktop" className="sr-only">
                Toggle dark mode
              </Label>
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

                  {/* Theme Toggle - Mobile */}
                  <div className="mt-6 pt-6 border-t border-border/30">
                    <div className="flex items-center justify-between px-3">
                      <Label htmlFor="dark-mode-mobile" className="text-base font-medium text-foreground/90">Dark Mode</Label>
                      <div className="flex items-center space-x-2">
                        <Sun className="h-4 w-4" />
                        <Switch
                          id="dark-mode-mobile"
                          checked={isDarkMode}
                          onCheckedChange={setIsDarkMode}
                        />
                        <Moon className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
