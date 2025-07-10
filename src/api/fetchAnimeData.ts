import { Media, PageInfo } from '@/types/anilistTypes';

const API_URL = 'https://graphql.anilist.co';

interface Variables {
  search?: string;
  page: number;
  perPage: number;
}

export interface ApiResponse {
  data: {
    Page: {
      pageInfo: PageInfo;
      media: Media[];
    };
  };
}

export const fetchAnimeData = async (
  query: string,
  variables: Variables,
): Promise<ApiResponse> => {
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

  const data = (await response.json()) as ApiResponse;

  return data;
};
