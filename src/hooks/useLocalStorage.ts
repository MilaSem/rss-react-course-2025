import { useState, useEffect, useCallback } from 'react';

export const useLocalStorage = <T>(
  key: string,
  initialValue: T,
): [T, (value: T) => void] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      if (item) {
        return JSON.parse(item) as T;
      }
    } catch (error) {
      console.error(`Error reading LS key "${key}"`, error);
    }
    return initialValue;
  });

  const setValue = useCallback((value: T) => {
    setStoredValue(value);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(`Error setting LS key "${key}"`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setValue];
};
