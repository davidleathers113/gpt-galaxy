
import React, { createContext, useContext, useState, useEffect } from 'react';

type ThemeContextType = {
  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state from localStorage or default to false (light mode)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedTheme = localStorage.getItem('theme');
      // Consider system preference if no theme is stored
      if (storedTheme) {
        return storedTheme === 'dark';
      } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return true;
      }
    }
    return false; // Default to light mode
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
      // Write preference to localStorage
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('theme', 'dark');
      }
    } else {
      root.classList.remove("dark");
      // Write preference to localStorage
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('theme', 'light');
      }
    }
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
