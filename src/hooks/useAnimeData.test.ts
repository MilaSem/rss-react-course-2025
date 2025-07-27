import { describe, it, expect, vi, afterEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useAnimeData } from './useAnimeData';
import {
  mockApiResponse,
  mockApiResponseWithoutPageInfo,
  mockMediaItems,
} from '@/test-utils/mockMedia';

vi.mock('@/api/fetchAnimeBySearchTerm');
vi.mock('@/api/fetchPopularAnime');

import { fetchAnimeBySearchTerm } from '@/api/fetchAnimeBySearchTerm';
import { fetchPopularAnime } from '@/api/fetchPopularAnime';

const mockedFetchAnimeBySearchTerm = vi.mocked(fetchAnimeBySearchTerm);
const mockedFetchPopularAnime = vi.mocked(fetchPopularAnime);

describe('useAnimeData', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should load data correctly when searching with a search term', async () => {
    mockedFetchAnimeBySearchTerm.mockResolvedValueOnce(mockApiResponse);

    const { result } = renderHook(() =>
      useAnimeData({ searchTerm: 'Naruto', page: 1 }),
    );

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(mockedFetchAnimeBySearchTerm).toHaveBeenCalledWith('Naruto', 1);
    expect(result.current.items).toEqual(mockMediaItems);
    expect(result.current.hasNextPage).toBe(true);
    expect(result.current.error).toBeNull();
  });

  it('should use fetchPopularAnime when search term is empty', async () => {
    mockedFetchPopularAnime.mockResolvedValueOnce(mockApiResponse);

    const { result } = renderHook(() =>
      useAnimeData({ searchTerm: '', page: 2 }),
    );

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(mockedFetchPopularAnime).toHaveBeenCalledWith(2);
    expect(result.current.items).toEqual(mockMediaItems);
    expect(result.current.hasNextPage).toBe(true);
    expect(result.current.error).toBeNull();
  });

  it('should handle API errors gracefully', async () => {
    const errorMsg = 'Network error';
    mockedFetchPopularAnime.mockRejectedValueOnce(new Error(errorMsg));

    const { result } = renderHook(() =>
      useAnimeData({ searchTerm: '', page: 1 }),
    );

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe(errorMsg);
    expect(result.current.items).toEqual([]);
  });

  it('should set hasNextPage to false if pageInfo or hasNextPage is missing', async () => {
    mockedFetchPopularAnime.mockResolvedValueOnce(
      mockApiResponseWithoutPageInfo,
    );

    const { result } = renderHook(() =>
      useAnimeData({ searchTerm: '', page: 3 }),
    );

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.hasNextPage).toBe(false);
    expect(result.current.items).toEqual(mockMediaItems);
    expect(result.current.error).toBeNull();
  });
});
