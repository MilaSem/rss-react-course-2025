import { describe, it, expect, vi, afterEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useAnimeDetails } from './useAnimeDetails';
import { fetchAnimeById } from '@/api/fetchAnimeById';

import { mockMediaItemWithEnglish } from '@/test-utils/mockMedia';

import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/api/queryClient';
import type { ReactNode } from 'react';

vi.mock('@/api/fetchAnimeById');

const mockedFetchAnimeById = vi.mocked(fetchAnimeById);

const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useAnimeDetails', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should set anime data correctly when fetch is successful with english title', async () => {
    mockedFetchAnimeById.mockResolvedValueOnce(mockMediaItemWithEnglish);

    const { result } = renderHook(() => useAnimeDetails(1), { wrapper });

    await waitFor(() => {
      expect(mockedFetchAnimeById).toHaveBeenCalledWith(1);
    });

    await waitFor(() => {
      expect(result.current.animeData).toEqual(mockMediaItemWithEnglish);
    });
  });

  it('should not fetch data and keep state when id is null', () => {
    const { result } = renderHook(() => useAnimeDetails(null), { wrapper });

    expect(mockedFetchAnimeById).not.toHaveBeenCalled();
    expect(result.current.animeData).toBeNull();
  });
});
