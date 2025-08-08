import { describe, it, expect, vi } from 'vitest';
import type { Mock } from 'vitest';

import { fetchPopularAnime } from './fetchPopularAnime';
import { mockMediaItems } from '@/test-utils/mockMedia';
import { DEFAULT_PAGE, DEFAULT_PER_PAGE } from './constants';

import type { ApiResponse } from './fetchAnimeData';
import type { MediaStatus } from '@/types/anilistTypes';

vi.mock('./fetchAnimeData', () => {
  return {
    fetchAnimeData: vi.fn(),
  };
});

import { fetchAnimeData } from './fetchAnimeData';

const validStatuses: MediaStatus[] = [
  'FINISHED',
  'RELEASING',
  'NOT_YET_RELEASED',
  'CANCELLED',
  'HIATUS',
];

describe('fetchPopularAnime', () => {
  it('should call fetchAnimeData with the correct params', async () => {
    const mockResponse: ApiResponse = {
      data: {
        Page: {
          pageInfo: { hasNextPage: false },
          media: mockMediaItems,
        },
      },
    };

    (fetchAnimeData as Mock).mockResolvedValue(mockResponse);

    const result = await fetchPopularAnime();

    expect(fetchAnimeData).toHaveBeenLastCalledWith(
      expect.stringContaining('sort: POPULARITY_DESC'),
      {
        page: DEFAULT_PAGE,
        perPage: DEFAULT_PER_PAGE,
      },
    );

    const mediaItems = result.data.Page.media;

    expect(mediaItems).toHaveLength(3);
    mediaItems.forEach((item) => {
      expect(item).toHaveProperty('id');
      expect(item.title).toHaveProperty('english');
      expect(item.coverImage).toHaveProperty('extraLarge');
      expect(validStatuses).toContain(item.status);
    });
  });

  it('should use provided page and perPage parameters', async () => {
    const page = 3;
    const perPage = 10;

    const mockResponse: ApiResponse = {
      data: {
        Page: {
          pageInfo: { hasNextPage: false },
          media: [],
        },
      },
    };

    (fetchAnimeData as Mock).mockResolvedValue(mockResponse);

    await fetchPopularAnime(page, perPage);

    expect(fetchAnimeData).toHaveBeenCalledWith(
      expect.stringContaining('sort: POPULARITY_DESC'),
      {
        page: page,
        perPage: perPage,
      },
    );
  });

  it('should throw an error if fetchAnimeData fails', async () => {
    (fetchAnimeData as Mock).mockRejectedValue(new Error('Network error'));

    await expect(fetchPopularAnime()).rejects.toThrow('Network error');
  });
});
