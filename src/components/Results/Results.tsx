import type { Media } from '@/types/anilistTypes';
import { Spinner } from '../Spinner/Spinner';
import { ResultItem } from '../ResultItem/ResultItem';
import { Flyout } from '../Flyout/Flyout';
import { RefreshButton } from '../RefreshButton/RefreshButton';
import { useSelectedItems } from '@/store/useSelectedItems';

import styles from './Results.module.css';

interface ResultsProps {
  error: string | null;
  items: Media[];
  onRefresh?: () => void;
  isFetching: boolean;
}

export const Results = ({
  error,
  items,
  onRefresh,
  isFetching,
}: ResultsProps) => {
  const { selectedIds, addItem, removeItem } = useSelectedItems();

  const handleSelectedChange = (id: number, selected: boolean) => {
    console.log(id, selected);
    if (selected) {
      addItem(id);
    } else {
      removeItem(id);
    }
  };

  if (isFetching) {
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
      {onRefresh && <RefreshButton onClick={onRefresh} />}

      {items.map((item) => (
        <ResultItem
          key={item.id}
          item={item}
          isSelected={selectedIds.includes(item.id)}
          onSelectedChange={handleSelectedChange}
        />
      ))}

      {selectedIds.length > 0 && <Flyout />}
    </div>
  );
};
