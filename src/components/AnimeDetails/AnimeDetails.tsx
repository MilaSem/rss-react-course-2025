import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { fetchAnimeById } from '@/api/fetchAnimeById';
import { cleanAndTrimText } from '@/utils/cleanAndTrimText';
import { Spinner } from '../Spinner/Spinner';
import type { Media } from '@/types/anilistTypes';

import styles from './AnimeDetails.module.css';

export const AnimeDetails = () => {
  const [searchParams] = useSearchParams();
  const idParam = searchParams.get('details');
  const id = idParam ? parseInt(idParam, 10) : null;

  const [animeData, setAnimeData] = useState<Media | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetchAnimeById(id)
        .then((data) => {
          setAnimeData(data);
          setLoading(false);
        })
        .catch((error: unknown) => {
          let message = '';
          if (error instanceof Error) {
            message = error.message;
            setError(message);
          }
          setLoading(false);
        });
    }
  }, [id]);

  if (!id) return null;

  if (loading) return <Spinner />;
  if (error) return <div>Error: {error}</div>;

  const MAX_LENGTH = 1000;

  return (
    <div>
      {animeData && (
        <div className={styles.details}>
          <p className={styles.title}>
            {animeData.title?.english || animeData.title?.romaji || 'No title'}
          </p>

          <p>
            {cleanAndTrimText(MAX_LENGTH, animeData.description) ||
              'No description for this item'}
          </p>
          <p>
            <span>Score:</span> {animeData.averageScore}
          </p>
          <p>
            <span>Genres:</span> {animeData.genres?.join(', ')}
          </p>
          <p>
            <span>Episodes:</span> {animeData.episodes}
          </p>
          <p>
            <span>Status:</span> {animeData.status}
          </p>
        </div>
      )}
    </div>
  );
};
