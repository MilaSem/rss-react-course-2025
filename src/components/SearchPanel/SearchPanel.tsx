import { useState, useEffect, useRef } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { SearchIcon } from './SearchIcon';

import styles from './SearchPanel.module.css';

interface SearchPanelProps {
  onSearch: (query: string) => void;
  searchTerm: string;
}

export const SearchPanel = ({ onSearch, searchTerm }: SearchPanelProps) => {
  const [storedSearchTerm, setStoredSearchTerm] = useLocalStorage<string>(
    'searchTerm',
    searchTerm,
  );
  const [inputValue, setInputValue] = useState(storedSearchTerm);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setInputValue(searchTerm);
    setStoredSearchTerm(searchTerm);
  }, [searchTerm, setStoredSearchTerm]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedSearchTerm = inputValue.trim();
    setStoredSearchTerm(trimmedSearchTerm);
    onSearch(trimmedSearchTerm);
  };

  return (
    <form className={styles.control} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        ref={inputRef}
        value={inputValue}
        onChange={handleChange}
        placeholder="Search..."
        aria-label="search input"
      />
      <button
        className={styles.button}
        type="submit"
        aria-label="search button"
      >
        <SearchIcon className={styles.svg} pathClassName={styles.path} />
      </button>
    </form>
  );
};
