import { useState, useEffect } from 'react';
import { fetchAnimeBySearchTerm } from '@/api/fetchAnimeBySearchTerm';
import { fetchPopularAnime } from '@/api/fetchPopularAnime';
import type { Media } from '@/types/anilistTypes';

interface UseAnimeDataProps {
  searchTerm: string;
  page: number;
}

interface UseAnimeDataReturn {
  items: Media[];
  hasNextPage: boolean;
  loading: boolean;
  error: string | null;
}

export const useAnimeData = ({
  searchTerm,
  page,
}: UseAnimeDataProps): UseAnimeDataReturn => {
  const [items, setItems] = useState<Media[]>([]);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      setError(null);

      try {
        const response =
          searchTerm.trim() !== ''
            ? await fetchAnimeBySearchTerm(searchTerm, page)
            : await fetchPopularAnime(page);
        setItems(response.data.Page.media);
        setHasNextPage(response.data.Page.pageInfo?.hasNextPage ?? false);
      } catch (error: unknown) {
        let message = '';
        if (error instanceof Error) {
          message = error.message;

          setError(message);
        }
      } finally {
        setLoading(false);
      }
    };

    void fetchItems();
  }, [searchTerm, page]);

  return { items, hasNextPage, loading, error };
};
