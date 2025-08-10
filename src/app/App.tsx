import { useEffect } from 'react';
import { BrowserRouter } from 'react-router';
import { AppRoutes } from './AppRoutes';
import { useTheme } from '@/hooks/useTheme';
import { ThemeToggle } from '@/components/ThemeToggle/ThemeToggle';
import { ThemeProvider } from '@/context/ThemeProvider';

import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/api/queryClient';

const InnerApp = () => {
  const { theme } = useTheme();

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <BrowserRouter>
      <ThemeToggle />
      <AppRoutes />
    </BrowserRouter>
  );
};

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <InnerApp />
      </ThemeProvider>
    </QueryClientProvider>
  );
};
