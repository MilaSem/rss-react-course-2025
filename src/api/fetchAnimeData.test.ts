import { describe, it, expect, vi } from 'vitest';
import { fetchAnimeData } from './fetchAnimeData';
import { mockMediaItems } from '@/test-utils/mockMedia';

const mockResponse = {
  data: {
    Page: {
      pageInfo: { hasNextPage: true },
      media: mockMediaItems,
    },
  },
};

const mockFetchResponse: Response = {
  ok: true,
  status: 200,
  json: () => Promise.resolve(mockResponse),
} as Response;

describe('fetchAnimeData', () => {
  it('should successfully return data and calls fetch with correct parameters', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(mockFetchResponse);

    const query = 'some query';
    const variables = { search: 'test', page: 2, perPage: 15 };

    const result = await fetchAnimeData(query, variables);

    expect(globalThis.fetch).toHaveBeenCalledWith(
      'https://graphql.anilist.co',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, variables }),
      }),
    );

    expect(result).toEqual(mockResponse);
  });

  it('should throw an error on unsuccessful response', async () => {
    const mockFetchResponseFail = {
      ok: false,
      status: 500,
      json: () => Promise.resolve({}),
    } as Response;

    vi.spyOn(globalThis, 'fetch').mockResolvedValue(mockFetchResponseFail);

    await expect(
      fetchAnimeData('query', { page: 1, perPage: 10 }),
    ).rejects.toThrow('Network error 500');
  });
});
