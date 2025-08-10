import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useAnimeData } from './useAnimeData';
import {
  mockApiResponse,
  mockApiResponseWithoutPageInfo,
  mockMediaItems,
} from '@/test-utils/mockMedia';

import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/api/queryClient';
import type { ReactNode } from 'react';

vi.mock('@/api/fetchAnimeBySearchTerm');
vi.mock('@/api/fetchPopularAnime');

import { fetchAnimeBySearchTerm } from '@/api/fetchAnimeBySearchTerm';
import { fetchPopularAnime } from '@/api/fetchPopularAnime';

const mockedFetchAnimeBySearchTerm = vi.mocked(fetchAnimeBySearchTerm);
const mockedFetchPopularAnime = vi.mocked(fetchPopularAnime);

const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useAnimeData', () => {
  beforeEach(() => {
    queryClient.clear();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should load data correctly when searching with a search term', async () => {
    mockedFetchAnimeBySearchTerm.mockResolvedValueOnce(mockApiResponse);

    const { result } = renderHook(
      () => useAnimeData({ searchTerm: 'Naruto', page: 1 }),
      { wrapper },
    );

    expect(result.current.isFetching).toBe(true);

    await waitFor(() => {
      expect(result.current.isFetching).toBe(false);
    });

    expect(mockedFetchAnimeBySearchTerm).toHaveBeenCalledWith('Naruto', 1);
    expect(result.current.items).toEqual(mockMediaItems);
    expect(result.current.hasNextPage).toBe(true);
    expect(result.current.error).toBeNull();
  });

  it('should use fetchPopularAnime when search term is empty', async () => {
    mockedFetchPopularAnime.mockResolvedValueOnce(mockApiResponse);

    const { result } = renderHook(
      () => useAnimeData({ searchTerm: '', page: 2 }),
      { wrapper },
    );

    expect(result.current.isFetching).toBe(true);

    await waitFor(() => {
      expect(result.current.isFetching).toBe(false);
    });

    expect(mockedFetchPopularAnime).toHaveBeenCalledWith(2);
    expect(result.current.items).toEqual(mockMediaItems);
    expect(result.current.hasNextPage).toBe(true);
    expect(result.current.error).toBeNull();
  });

  it('should set hasNextPage to false if pageInfo or hasNextPage is missing', async () => {
    mockedFetchPopularAnime.mockResolvedValueOnce(
      mockApiResponseWithoutPageInfo,
    );

    const { result } = renderHook(
      () => useAnimeData({ searchTerm: '', page: 3 }),
      { wrapper },
    );

    expect(result.current.isFetching).toBe(true);

    await waitFor(() => {
      expect(result.current.isFetching).toBe(false);
    });

    expect(result.current.hasNextPage).toBe(false);
    expect(result.current.items).toEqual(mockMediaItems);
    expect(result.current.error).toBeNull();
  });
});
