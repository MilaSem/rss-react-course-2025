import { useEffect } from 'react';
import { BrowserRouter } from 'react-router';
import { AppRoutes } from './AppRoutes';
import { useTheme } from '@/hooks/useTheme';
import { ThemeToggle } from '@/components/ThemeToggle/ThemeToggle';
import { ThemeProvider } from '@/context/ThemeProvider';

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
    <ThemeProvider>
      <InnerApp />
    </ThemeProvider>
  );
};
