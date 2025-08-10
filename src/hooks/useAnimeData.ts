import { fetchAnimeBySearchTerm } from '@/api/fetchAnimeBySearchTerm';
import { fetchPopularAnime } from '@/api/fetchPopularAnime';
import { useAnimeCache } from '@/store/useAnimeCache';
import type { Media } from '@/types/anilistTypes';

import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

interface UseAnimeDataProps {
  searchTerm: string;
  page: number;
}

interface UseAnimeData {
  items: Media[];
  hasNextPage: boolean;
  isFetching: boolean;
  error: string | null;
}

export const useAnimeData = ({
  searchTerm,
  page,
}: UseAnimeDataProps): UseAnimeData & { refetch: () => void } => {
  const addItemsToCache = useAnimeCache((state) => state.addItems);

  const queryKey = ['anime', searchTerm, page];

  const { data, error, isFetching, isError, refetch } = useQuery({
    queryKey,
    queryFn: async () => {
      console.log(
        `Request to server for: searchTerm=${searchTerm}, page=${page}`,
      );
      const response =
        searchTerm.trim() !== ''
          ? await fetchAnimeBySearchTerm(searchTerm, page)
          : await fetchPopularAnime(page);

      const fetchedItems = response.data.Page.media;

      addItemsToCache(fetchedItems);

      return {
        items: fetchedItems,
        hasNextPage: Boolean(response.data.Page.pageInfo?.hasNextPage),
      };
    },
    staleTime: Infinity,
  });

  useEffect(() => {
    if (data !== undefined && !isFetching) {
      console.log('Results data taken from cache');
    }
  }, [data, isFetching]);

  return {
    items: data?.items || [],
    hasNextPage: data?.hasNextPage ?? false,
    isFetching,
    error: isError ? (error?.message ?? null) : null,
    refetch: () => {
      return void refetch();
    },
  };
};
