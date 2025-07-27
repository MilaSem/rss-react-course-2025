import { useState, useEffect } from 'react';
import { fetchAnimeById } from '@/api/fetchAnimeById';
import type { Media } from '@/types/anilistTypes';

interface UseAnimeDetailsResult {
  animeData: Media | null;
  loading: boolean;
  error: string;
}

export const useAnimeDetails = (id: number | null): UseAnimeDetailsResult => {
  const [animeData, setAnimeData] = useState<Media | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (id === null) {
      setAnimeData(null);
      setError('');
      return;
    }

    let isMounted = true;

    setLoading(true);
    fetchAnimeById(id)
      .then((data) => {
        if (isMounted) {
          setAnimeData(data);
          setError('');
        }
      })
      .catch((err: unknown) => {
        if (isMounted) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError('Unknown error occurred');
          }
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  return { animeData, loading, error };
};
