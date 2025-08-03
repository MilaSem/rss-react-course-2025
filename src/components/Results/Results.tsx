import type { Media } from '@/types/anilistTypes';
import { Spinner } from '../Spinner/Spinner';
import { ResultItem } from '../ResultItem/ResultItem';
import { useSelectedItems } from '@/store/useSelectedItems';

import styles from './Results.module.css';

interface ResultsProps {
  loading: boolean;
  error: string | null;
  items: Media[];
}

export const Results = ({ loading, error, items }: ResultsProps) => {
  const { selectedIds, addItem, removeItem } = useSelectedItems();

  const handleSelectedChange = (id: number, selected: boolean) => {
    console.log(id, selected);
    if (selected) {
      addItem(id);
    } else {
      removeItem(id);
    }
  };

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
        <ResultItem
          key={item.id}
          item={item}
          isSelected={selectedIds.includes(item.id)}
          onSelectedChange={handleSelectedChange}
        />
      ))}
    </div>
  );
};
