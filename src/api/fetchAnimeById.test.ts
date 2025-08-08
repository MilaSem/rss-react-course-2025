import { describe, it, expect, vi } from 'vitest';
import type { Mock } from 'vitest';

import { fetchAnimeData } from './fetchAnimeData';
import { fetchAnimeById } from './fetchAnimeById';
import { mockAnimeFullData } from '@/test-utils/mockMedia';

vi.mock('./fetchAnimeData', () => {
  return {
    fetchAnimeData: vi.fn(),
  };
});

describe('fetchAnimeById', () => {
  it('should call fetchAnimeData with the correct params and return media data', async () => {
    const mockResponse = {
      data: {
        Media: mockAnimeFullData,
      },
    };

    (fetchAnimeData as Mock).mockResolvedValue(mockResponse);

    const id = 123;
    const result = await fetchAnimeById(id);

    expect(fetchAnimeData).toHaveBeenLastCalledWith(
      expect.stringContaining('Media(id: $id)'),
      { id },
    );

    expect(result).toEqual(mockAnimeFullData);
    expect(result.id).toBe(id);
    expect(result.title.english).toBe('Sample English');
    expect(result.coverImage?.extraLarge).toBe(
      'https://example.com/extraLarge.jpg',
    );
    expect(result.status).toBe('RELEASING');
  });

  it('should throw an error if fetchAnimeData rejects', async () => {
    (fetchAnimeData as Mock).mockRejectedValue(new Error('Network error'));

    await expect(fetchAnimeById(789)).rejects.toThrow('Network error');
  });
});
