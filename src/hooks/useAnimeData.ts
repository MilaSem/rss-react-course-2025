import { useState, useEffect } from 'react';
import { fetchAnimeBySearchTerm } from '@/api/fetchAnimeBySearchTerm';
import { fetchPopularAnime } from '@/api/fetchPopularAnime';
import { useAnimeCache } from '@/store/useAnimeCache';
import type { Media } from '@/types/anilistTypes';

interface UseAnimeDataProps {
  searchTerm: string;
  page: number;
}

interface UseAnimeData {
  items: Media[];
  hasNextPage: boolean;
  loading: boolean;
  error: string | null;
}
export const useAnimeData = ({
  searchTerm,
  page,
}: UseAnimeDataProps): UseAnimeData => {
  const [items, setItems] = useState<Media[]>([]);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addItemsToCache = useAnimeCache((state) => state.addItems);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      setError(null);

      try {
        const response =
          searchTerm.trim() !== ''
            ? await fetchAnimeBySearchTerm(searchTerm, page)
            : await fetchPopularAnime(page);
        const fetchedItems = response.data.Page.media;
        setItems(fetchedItems);
        addItemsToCache(fetchedItems);
        setHasNextPage(Boolean(response.data.Page.pageInfo?.hasNextPage));
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    void fetchItems();
  }, [searchTerm, page]);

  return { items, hasNextPage, loading, error };
};
