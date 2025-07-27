import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import { useAnimeDetails } from '@/hooks/useAnimeDetails';
import { AnimeDetails } from './AnimeDetails';
import { mockAnimeFullData } from '@/test-utils/mockMedia';

vi.mock('@/hooks/useAnimeDetails');

const mockedUseAnimeDetails = vi.mocked(useAnimeDetails);

describe('AnimeDetails', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render Spinner when loading', () => {
    mockedUseAnimeDetails.mockReturnValue({
      animeData: null,
      loading: true,
      error: '',
    });
    render(
      <MemoryRouter initialEntries={['/?details=1']}>
        <AnimeDetails />
      </MemoryRouter>,
    );
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('should render error message when error occurs', () => {
    mockedUseAnimeDetails.mockReturnValue({
      animeData: null,
      loading: false,
      error: 'Some error',
    });
    render(
      <MemoryRouter initialEntries={['/?details=1']}>
        <AnimeDetails />
      </MemoryRouter>,
    );
    expect(screen.getByText(/Error:/)).toHaveTextContent('Error: Some error');
  });

  it('should render anime data when loaded', () => {
    mockedUseAnimeDetails.mockReturnValue({
      animeData: mockAnimeFullData,
      loading: false,
      error: '',
    });
    render(
      <MemoryRouter initialEntries={['/?details=1']}>
        <AnimeDetails />
      </MemoryRouter>,
    );
    expect(screen.getByTestId('description')).toHaveTextContent('Sample');
  });

  it('should display default message when description is empty', () => {
    const mockDataWithNoDescription = {
      ...mockAnimeFullData,
      description: '',
    };

    mockedUseAnimeDetails.mockReturnValue({
      animeData: mockDataWithNoDescription,
      loading: false,
      error: '',
    });

    render(
      <MemoryRouter initialEntries={['/?details=1']}>
        <AnimeDetails />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('description')).toHaveTextContent(
      'No description for this item',
    );
  });

  it('should return null if no "details" param in URL', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/']}>
        <AnimeDetails />
      </MemoryRouter>,
    );

    expect(container).toBeEmptyDOMElement();
  });
});
