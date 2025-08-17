import { useEffect, useState } from 'react';
import { fetchPopularAnime } from '@/api/fetchPopularAnime';
import Results from './components/Results/Results';
import Spinner from './components/Spinner/Spinner';

import type { Media } from '@/types/anilistTypes';

const PopularPage = () => {
  const [items, setItems] = useState<Media[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetchPopularAnime();
        setItems(response.data.Page.media);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, []);

  return (
    <div>
      {isLoading && <Spinner />}
      {error && <p>Error: {error}</p>}
      <Results items={items} />
    </div>
  );
};

export default PopularPage;
