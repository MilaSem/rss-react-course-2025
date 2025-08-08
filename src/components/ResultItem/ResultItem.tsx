import { useCallback } from 'react';
import { useSearchParams } from 'react-router';
import { fetchAnimeById } from '@/api/fetchAnimeById';
import { cleanAndTrimText } from '@/utils/cleanAndTrimText';
import type { Media } from '@/types/anilistTypes';
import type { ChangeEvent, MouseEvent, KeyboardEvent } from 'react';
import { StarIcon } from './StarIcon';

import styles from './ResultItem.module.css';

const MAX_LENGTH = 300;

interface ResultItemProps {
  item: Media;
  isSelected: boolean;
  onSelectedChange: (id: number, selected: boolean) => void;
}

export const ResultItem = ({
  item,
  isSelected,
  onSelectedChange,
}: ResultItemProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleClick = useCallback(() => {
    searchParams.set('details', `${item.id}`);
    setSearchParams(searchParams);
    fetchAnimeById(item.id).catch((error) => {
      console.error('Error fetching anime details:', error);
    });
  }, [item.id]);

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    onSelectedChange(item.id, e.target.checked);
  };

  const handleIconClick = (
    e: MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>,
  ) => {
    e.stopPropagation();
    onSelectedChange(item.id, !isSelected);
  };

  const title = item.title.english || item.title.romaji || 'No title';

  return (
    <button className={styles.item} onClick={handleClick}>
      <p className={styles.title}>{title}</p>
      <div className={styles.info}>
        <p className={styles.description}>
          {cleanAndTrimText(MAX_LENGTH, item.description) ||
            'No description for this item'}
        </p>
        <div
          className={`${styles.star} ${isSelected ? styles.checked : ''}`}
          role="button"
          tabIndex={0}
          onClick={handleIconClick}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleIconClick(e);
            }
          }}
        >
          <input
            className={styles.checkbox}
            type="checkbox"
            checked={isSelected}
            onChange={handleCheckboxChange}
            aria-label={`Select ${title}`}
          />
          <StarIcon className={styles.svg} pathClassName={styles.path} />
        </div>
      </div>
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
