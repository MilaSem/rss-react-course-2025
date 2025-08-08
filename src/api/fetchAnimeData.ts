import type { Media, PageInfo } from '@/types/anilistTypes';

const API_URL = 'https://graphql.anilist.co';

export interface ApiResponse {
  data: {
    Page: {
      pageInfo: PageInfo;
      media: Media[];
    };
  };
}
export const fetchAnimeData = async <T>(
  query: string,
  variables: Record<string, unknown>,
): Promise<{ data: T }> => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`Network error ${response.status}`);
  }

  const data = (await response.json()) as { data: T };

  return data;
};
