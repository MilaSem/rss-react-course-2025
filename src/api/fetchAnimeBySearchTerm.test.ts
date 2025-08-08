import { describe, it, expect, vi } from 'vitest';
import type { Mock } from 'vitest';

import { fetchAnimeBySearchTerm } from './fetchAnimeBySearchTerm';
import { mockMediaItemsBySearchTerm } from '@/test-utils/mockMedia';
import { DEFAULT_PAGE, DEFAULT_PER_PAGE } from './constants';

import type { ApiResponse } from './fetchAnimeData';

vi.mock('./fetchAnimeData', () => {
  return {
    fetchAnimeData: vi.fn(),
  };
});

import { fetchAnimeData } from './fetchAnimeData';

describe('fetchAnimeBySearchTerm', () => {
  it('should call fetchAnimeData with the correct params', async () => {
    const mockResponse: ApiResponse = {
      data: {
        Page: {
          pageInfo: { hasNextPage: false },
          media: mockMediaItemsBySearchTerm,
        },
      },
    };

    (fetchAnimeData as Mock).mockResolvedValue(mockResponse);

    const searchTerm = 'English Title';

    const result = await fetchAnimeBySearchTerm(searchTerm);

    expect(fetchAnimeData).toHaveBeenCalledWith(
      expect.stringContaining('search: $search'),
      {
        search: searchTerm,
        page: DEFAULT_PAGE,
        perPage: DEFAULT_PER_PAGE,
      },
    );

    const mediaItems = result.data.Page.media;
    mediaItems.forEach((item) => {
      expect(item.title.english).toContain(searchTerm);
    });
  });

  it('should throw an error if fetchAnimeData fails', async () => {
    (fetchAnimeData as Mock).mockRejectedValue(new Error('Network error'));

    await expect(fetchAnimeBySearchTerm('Test')).rejects.toThrow(
      'Network error',
    );
  });
});
