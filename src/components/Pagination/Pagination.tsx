import styles from './Pagination.module.css';
import { PrevIcon } from './PrevIcon';
import { NextIcon } from './NextIcon';

interface PaginationProps {
  currentPage: number;
  hasNextPage: boolean;
  onPrevPage: () => void;
  onNextPage: () => void;
}

export const Pagination = ({
  currentPage,
  hasNextPage,
  onPrevPage,
  onNextPage,
}: PaginationProps) => {
  return (
    <div className={styles.pagination}>
      <button
        className={styles.arrow}
        onClick={onPrevPage}
        disabled={currentPage === 1}
        aria-label="prev"
      >
        <PrevIcon className={styles.svg} pathClassName={styles.path} />
      </button>
      <span>{currentPage}</span>
      <button
        className={styles.arrow}
        onClick={onNextPage}
        disabled={!hasNextPage}
        aria-label="next"
      >
        <NextIcon className={styles.svg} pathClassName={styles.path} />
      </button>
    </div>
  );
};
