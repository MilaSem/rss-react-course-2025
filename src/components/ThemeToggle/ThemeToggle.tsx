import { useTheme } from '@/hooks/useTheme';
import { ToggleOnIcon } from './ToggleOnIcon';
import { ToggleOffIcon } from './ToggleOffIcon';

import styles from './ThemeToggle.module.css';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button className={styles.button} onClick={toggleTheme}>
      {theme === 'light' ? (
        <ToggleOnIcon className={styles.svg} pathClassName={styles.path} />
      ) : (
        <ToggleOffIcon className={styles.svg} pathClassName={styles.path} />
      )}
    </button>
  );
};
