
import React from 'react';
import { Footerdemo } from '@/components/ui/footer-section';
import { useTheme } from '@/hooks/use-theme';

const Footer = () => {
  const { isDarkMode, setIsDarkMode } = useTheme();
  
  return <Footerdemo isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />;
};

export default Footer;
