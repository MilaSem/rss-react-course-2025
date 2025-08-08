import type { Media } from '@/types/anilistTypes';
import { Spinner } from '../Spinner/Spinner';
import { ResultItem } from '../ResultItem/ResultItem';

import styles from './Results.module.css';

interface ResultsProps {
  loading: boolean;
  error: string | null;
  items: Media[];
}

export const Results = ({ loading, error, items }: ResultsProps) => {
  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!items || items.length === 0) {
    return <div>Results are not found</div>;
  }

  return (
    <div className={styles.container}>
      {items.map((item) => (
        <ResultItem key={item.id} item={item} />
      ))}
    </div>
  );
};
