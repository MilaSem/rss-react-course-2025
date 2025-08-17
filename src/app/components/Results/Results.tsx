import Image from 'next/image';
import { cleanAndTrimText } from '@/utils/cleanAndTrimText';
import { useTranslations } from 'next-intl';
import type { Media } from '@/types/anilistTypes';
import styles from './Results.module.css';

interface ResultsProps {
  items: Media[];
}

const MAX_LENGTH = 300;

const Results = ({ items }: ResultsProps) => {
  const t = useTranslations('Results');
  return (
    <div className={styles.container}>
      {items.length === 0 ? (
        <p>{t('message')}</p>
      ) : (
        <ul className={styles.list}>
          {items.map((item) => (
            <li key={item.id} className={styles.card}>
              <h2 className={styles.subtitle}>
                {t('subtitle')}: {item.title.romaji}
              </h2>
              <p>
                <span className={styles.span}>{t('description')}: </span>
                {cleanAndTrimText(MAX_LENGTH, item.description) ||
                  'No description for this item'}
              </p>
              {item.coverImage?.extraLarge && (
                <Image
                  src={item.coverImage.extraLarge}
                  alt={item.title.english || item.title.romaji || 'Poster'}
                  className={styles.poster}
                  width={150}
                  height={200}
                />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Results;
