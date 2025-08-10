import { RefreshIcon } from './RefreshIcon';
import styles from './RefreshButton.module.css';

export const RefreshButton = ({ onClick }: { onClick: () => void }) => (
  <button className={styles.refresh} onClick={onClick}>
    <RefreshIcon className={styles.svg} pathClassName={styles.path} />
  </button>
);
