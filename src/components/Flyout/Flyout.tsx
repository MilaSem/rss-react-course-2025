import { useSelectedItems } from '@/store/useSelectedItems';
import { useAnimeCache } from '@/store/useAnimeCache';
import { cleanAndTrimText } from '@/utils/cleanAndTrimText';
import { downloadBlob } from '@/utils/downloadBlob';
import { prepareCsv } from '@/utils/prepareCsv';

import styles from './Flyout.module.css';

const MAX_LENGTH = 500;

export const Flyout = () => {
  const { selectedIds, removeItem } = useSelectedItems();
  const cache = useAnimeCache((state) => state.cache);

  const count = selectedIds.length;

  const handleUnselectAll = () => {
    selectedIds.forEach((id) => removeItem(id));
  };

  const handleDownload = () => {
    if (count === 0) return;

    const fullDataArray = selectedIds.map((id) => cache[id]).filter(Boolean);

    const data = fullDataArray.map((item) => ({
      name: item.title?.english || item.title?.romaji || 'No Title',
      description: cleanAndTrimText(MAX_LENGTH, item.description),
    }));

    const csvContent = prepareCsv(data);
    downloadBlob(csvContent, `${count}_items.csv`);
  };

  return (
    <div className={styles.flyout}>
      <div>
        {count} item{count !== 1 ? 's' : ''} are selected
      </div>

      <div>
        <button className={styles.button} onClick={handleUnselectAll}>
          Unselect all
        </button>
        <button className={styles.button} onClick={handleDownload}>
          Download
        </button>
      </div>
    </div>
  );
};
