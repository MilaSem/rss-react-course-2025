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
      error: '',
      isFetching: true,
      refetch: vi.fn(),
    });
    renderWithProviders(<AnimeDetails />, {
      routerProps: { initialEntries: ['/?details=1'] },
    });
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('should render error message when error occurs', () => {
    mockedUseAnimeDetails.mockReturnValue({
      animeData: null,
      error: 'Some error',
      isFetching: false,
      refetch: vi.fn(),
    });
    renderWithProviders(<AnimeDetails />, {
      routerProps: { initialEntries: ['/?details=1'] },
    });
    expect(screen.getByText(/Error:/)).toHaveTextContent('Error: Some error');
  });

  it('should render anime data when loaded', () => {
    mockedUseAnimeDetails.mockReturnValue({
      animeData: mockAnimeFullData,
      error: '',
      isFetching: false,
      refetch: vi.fn(),
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
      error: '',
      isFetching: false,
      refetch: vi.fn(),
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
