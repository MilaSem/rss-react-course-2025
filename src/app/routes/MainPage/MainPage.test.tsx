import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/test-utils/renderWithProviders';

import { MainPage } from './MainPage';

const mockUpdateUrl = vi.fn();

vi.mock('@/hooks/useQueryParams', () => ({
  useQueryParams: () => ({
    searchTerm: 'test',
    currentPage: 2,
    updateUrl: mockUpdateUrl,
  }),
}));

vi.mock('@/hooks/useAnimeData', () => ({
  useAnimeData: () => ({
    items: [{ id: 1, title: 'Anime 1' }],
    hasNextPage: true,
    loading: false,
    error: '',
  }),
}));

vi.mock('@/hooks/useClickOutside', () => ({
  useClickOutside: () => {},
}));

describe('MainPage', () => {
  it('should render the title with correct text', () => {
    renderWithProviders(<MainPage />);
    expect(screen.getByText('Anime Catalog')).toBeInTheDocument();
  });

  it('should render SearchPanel component', () => {
    renderWithProviders(<MainPage />);
    expect(screen.getByPlaceholderText(/Search/i)).toBeInTheDocument();
  });

  it('should render Pagination when items are present', () => {
    renderWithProviders(<MainPage />);

    expect(screen.getByRole('button', { name: /prev/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
  });

  it('should display details block when "details" param exists', () => {
    renderWithProviders(<MainPage />, {
      routerProps: { initialEntries: ['/?details=1'] },
    });
    expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
  });
});
