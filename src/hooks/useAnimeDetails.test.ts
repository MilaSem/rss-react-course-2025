import { describe, it, expect, vi, afterEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useAnimeDetails } from './useAnimeDetails';
import { fetchAnimeById } from '@/api/fetchAnimeById';

import { mockMediaItemWithEnglish } from '@/test-utils/mockMedia';

vi.mock('@/api/fetchAnimeById');

const mockedFetchAnimeById = vi.mocked(fetchAnimeById);

describe('useAnimeDetails', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should set anime data correctly when fetch is successful with english title', async () => {
    mockedFetchAnimeById.mockResolvedValueOnce(mockMediaItemWithEnglish);

    const { result } = renderHook(() => useAnimeDetails(1));

    await waitFor(() => {
      expect(mockedFetchAnimeById).toHaveBeenCalledWith(1);
    });

    await waitFor(() => {
      expect(result.current.animeData).toEqual(mockMediaItemWithEnglish);
    });
  });

  it('should handle API errors properly', async () => {
    const errorMsg = 'API error';
    mockedFetchAnimeById.mockRejectedValueOnce(new Error(errorMsg));

    const { result } = renderHook(() => useAnimeDetails(5));

    await waitFor(() => {
      expect(result.current.animeData).toBeNull();
    });
  });

  it('should not fetch data and keep state when id is null', () => {
    const { result } = renderHook(() => useAnimeDetails(null));

    expect(result.current.animeData).toBeNull();
  });
});
