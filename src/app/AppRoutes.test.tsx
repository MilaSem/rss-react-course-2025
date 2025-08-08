import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/test-utils/renderWithProviders';
import { AppRoutes } from './AppRoutes';

describe('AppRouter', () => {
  it('should display MainPage on route /', () => {
    renderWithProviders(<AppRoutes />, {
      routerProps: { initialEntries: ['/'] },
    });
    expect(screen.getByText(/Anime Catalog/i)).toBeInTheDocument();
  });

  it('should display AboutPage on route /about', () => {
    renderWithProviders(<AppRoutes />, {
      routerProps: { initialEntries: ['/about'] },
    });
    expect(screen.getByText(/About/i)).toBeInTheDocument();
  });

  it('should display Page404 on non-existent route', () => {
    renderWithProviders(<AppRoutes />, {
      routerProps: { initialEntries: ['/non-existent-route'] },
    });
    expect(screen.getByText(/Oops.../i)).toBeInTheDocument();
  });
});
