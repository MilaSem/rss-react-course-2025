import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

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
    render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>,
    );
    expect(screen.getByText('Anime Catalog')).toBeInTheDocument();
  });

  it('should render SearchPanel component', () => {
    render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>,
    );
    expect(screen.getByPlaceholderText(/Search/i)).toBeInTheDocument();
  });

  it('should render Pagination when items are present', () => {
    render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>,
    );

    expect(screen.getByRole('button', { name: /prev/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
  });

  it('should display details block when "details" param exists', () => {
    render(
      <MemoryRouter initialEntries={['/?details=1']}>
        <MainPage />
      </MemoryRouter>,
    );
    expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
  });
});
