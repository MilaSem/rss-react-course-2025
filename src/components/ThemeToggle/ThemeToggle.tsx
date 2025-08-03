import { useThemeStore } from '@/store/useThemeStore';
import { ToggleOnIcon } from './ToggleOnIcon';
import { ToggleOffIcon } from './ToggleOffIcon';

import styles from './ThemeToggle.module.css';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useThemeStore();

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
