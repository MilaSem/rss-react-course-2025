import { describe, it, expect, vi, afterEach } from 'vitest';
import { screen } from '@testing-library/react';
import { useAnimeDetails } from '@/hooks/useAnimeDetails';
import { AnimeDetails } from './AnimeDetails';
import { mockAnimeFullData } from '@/test-utils/mockMedia';
import { renderWithProviders } from '@/test-utils/renderWithProviders';

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
    renderWithProviders(<AnimeDetails />, {
      routerProps: { initialEntries: ['/?details=1'] },
    });
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('should render error message when error occurs', () => {
    mockedUseAnimeDetails.mockReturnValue({
      animeData: null,
      loading: false,
      error: 'Some error',
    });
    renderWithProviders(<AnimeDetails />, {
      routerProps: { initialEntries: ['/?details=1'] },
    });
    expect(screen.getByText(/Error:/)).toHaveTextContent('Error: Some error');
  });

  it('should render anime data when loaded', () => {
    mockedUseAnimeDetails.mockReturnValue({
      animeData: mockAnimeFullData,
      loading: false,
      error: '',
    });
    renderWithProviders(<AnimeDetails />, {
      routerProps: { initialEntries: ['/?details=1'] },
    });
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

    renderWithProviders(<AnimeDetails />, {
      routerProps: { initialEntries: ['/?details=1'] },
    });

    expect(screen.getByTestId('description')).toHaveTextContent(
      'No description for this item',
    );
  });

  it('should return null if no "details" param in URL', () => {
    const { container } = renderWithProviders(<AnimeDetails />, {
      routerProps: { initialEntries: [`/`] },
    });

    expect(container).toBeEmptyDOMElement();
  });
});
