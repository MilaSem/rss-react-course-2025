import { useEffect } from 'react';
import type { RefObject } from 'react';

type Handler = (event: MouseEvent) => void;

export const useClickOutside = <T extends HTMLElement>(
  ref: RefObject<T | null>,
  handler: Handler,
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler(event);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [ref, handler]);
};
