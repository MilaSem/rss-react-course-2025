import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { AppRoutes } from './AppRoutes';

describe('AppRouter', () => {
  it('should display MainPage on route /', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRoutes />
      </MemoryRouter>,
    );
    expect(screen.getByText(/Anime Catalog/i)).toBeInTheDocument();
  });

  it('should display AboutPage on route /about', () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <AppRoutes />
      </MemoryRouter>,
    );
    expect(screen.getByText(/About/i)).toBeInTheDocument();
  });

  it('should display Page404 on non-existent route', () => {
    render(
      <MemoryRouter initialEntries={['/non-existent-route']}>
        <AppRoutes />
      </MemoryRouter>,
    );
    expect(screen.getByText(/Oops.../i)).toBeInTheDocument();
  });
});
