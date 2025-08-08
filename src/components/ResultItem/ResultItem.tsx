import { useCallback } from 'react';
import { cleanAndTrimText } from '@/utils/cleanAndTrimText';
import { fetchAnimeById } from '@/api/fetchAnimeById';
import type { Media } from '@/types/anilistTypes';

import styles from './ResultItem.module.css';
import { useSearchParams } from 'react-router';

const MAX_LENGTH = 300;

interface ResultItemProps {
  item: Media;
}

export const ResultItem = ({ item }: ResultItemProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const handleClick = useCallback(() => {
    searchParams.set('details', `${item.id}`);
    setSearchParams(searchParams);
    fetchAnimeById(item.id).catch((error) => {
      console.error('Error fetching anime details:', error);
    });
  }, [item.id]);

  return (
    <button className={styles.item} onClick={handleClick}>
      <p className={styles.title}>
        {item.title.english || item.title.romaji || 'Title not available'}
      </p>
      <p className={styles.description}>
        {cleanAndTrimText(MAX_LENGTH, item.description) ||
          'No description for this item'}
      </p>
      {item.coverImage?.extraLarge && (
        <img
          src={item.coverImage.extraLarge}
          alt={item.title.english || item.title.romaji || 'Poster'}
          className={styles.poster}
        />
      )}
    </button>
  );
};
