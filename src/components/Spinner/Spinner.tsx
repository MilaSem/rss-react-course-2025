import styles from './Spinner.module.css';

export const Spinner = () => {
  return (
    <div
      className={styles.spinner}
      aria-label="Loading"
      aria-busy="true"
      data-testid="spinner"
    ></div>
  );
};
