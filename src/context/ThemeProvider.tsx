import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { ThemeContext } from '@/context/ThemeContext';

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const storedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
  const [theme, setTheme] = useState<'light' | 'dark'>(storedTheme || 'light');

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
