import styles from './Spinner.module.css';

const Spinner = () => {
  return (
    <div
      className={styles.spinner}
      aria-label="Loading"
      aria-busy="true"
      data-testid="spinner"
    ></div>
  );
};

export default Spinner;
