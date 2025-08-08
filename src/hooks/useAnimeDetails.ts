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

    setLoading(true);
    fetchAnimeById(id)
      .then((data) => {
        setAnimeData(data);
        setError('');
      })
      .catch((err: unknown) => {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Unknown error occurred');
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  return { animeData, loading, error };
};
