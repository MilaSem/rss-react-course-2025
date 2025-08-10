import { fetchAnimeById } from '@/api/fetchAnimeById';
import type { Media } from '@/types/anilistTypes';

import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

interface UseAnimeDetailsResult {
  animeData: Media | null;
  error: string | null;
  isFetching: boolean;
  refetch: () => void;
}

export const useAnimeDetails = (id: number | null): UseAnimeDetailsResult => {
  const { data, error, isError, isFetching, refetch } = useQuery({
    queryKey: ['animeDetails', id],
    queryFn: async () => {
      console.log('Request to server for id:', id);
      if (id === null) {
        return null;
      }
      return await fetchAnimeById(id);
    },
    enabled: id !== null,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (data !== undefined && !isFetching) {
      console.log('Data taken from cache for id:', id);
    }
  }, [data, id, isFetching]);

  return {
    animeData: data ?? null,
    error: isError ? error.message : null,
    refetch: () => {
      return void refetch();
    },
    isFetching,
  };
};
