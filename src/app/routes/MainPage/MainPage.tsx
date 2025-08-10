import { useEffect, useRef, useCallback } from 'react';
import { Outlet, useSearchParams, Link } from 'react-router';
import { useQueryParams } from '@/hooks/useQueryParams';
import { useAnimeData } from '@/hooks/useAnimeData';
import { useClickOutside } from '@/hooks/useClickOutside';

import { SearchPanel } from '@/components/SearchPanel/SearchPanel';
import { Results } from '@/components/Results/Results';
import { Pagination } from '@/components/Pagination/Pagination';
import { CloseIcon } from './CloseIcon';

import styles from './MainPage.module.css';

export const MainPage = () => {
  const { searchTerm, currentPage, updateUrl } = useQueryParams();

  const [searchParams, setSearchParams] = useSearchParams();
  const selectedId = searchParams.get('details');

  const { items, hasNextPage, error, refetch, isFetching } = useAnimeData({
    searchTerm: searchTerm,
    page: currentPage,
  });

  const handleSearch = (newSearchTerm: string) => {
    if (newSearchTerm === searchTerm) return;
    updateUrl(newSearchTerm, 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      updateUrl(searchTerm, currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (hasNextPage) {
      updateUrl(searchTerm, currentPage + 1);
    }
  };

  useEffect(() => {
    if (searchTerm) {
      localStorage.setItem('searchTerm', JSON.stringify(searchTerm));
    }
  }, [searchTerm]);

  const outletRef = useRef<HTMLDivElement>(null);

  const handleCloseDetails = useCallback(() => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.delete('details');
    setSearchParams(newSearchParams);
  }, [searchParams, setSearchParams]);

  useClickOutside(outletRef, handleCloseDetails);

  return (
    <>
      <Link to="/about" className={styles.link}>
        About App
      </Link>
      <h1 className={styles.title}>Anime Catalog</h1>

      <SearchPanel onSearch={handleSearch} searchTerm={searchTerm} />

      {items && items.length > 0 && (
        <Pagination
          currentPage={currentPage}
          hasNextPage={hasNextPage}
          onPrevPage={handlePrevPage}
          onNextPage={handleNextPage}
        />
      )}

      <div className={styles.content}>
        <div className={styles.left}>
          <Results
            error={error}
            items={items}
            onRefresh={refetch}
            isFetching={isFetching}
          />
        </div>

        {selectedId && (
          <div className={styles.right} ref={outletRef}>
            <button
              className={styles.close}
              onClick={handleCloseDetails}
              aria-label="close"
            >
              <CloseIcon className={styles.svg} pathClassName={styles.path} />
            </button>

            <Outlet />
          </div>
        )}
      </div>
    </>
  );
};
