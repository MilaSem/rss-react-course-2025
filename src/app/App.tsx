import { useEffect } from 'react';
import { BrowserRouter } from 'react-router';
import { AppRoutes } from './AppRoutes';
import { useThemeStore } from '@/store/useThemeStore';
import { ThemeToggle } from '@/components/ThemeToggle/ThemeToggle';

export const App = () => {
  const { theme } = useThemeStore();

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
