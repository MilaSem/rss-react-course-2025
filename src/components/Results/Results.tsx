import type { Media } from '@/types/anilistTypes';
import { Component } from 'react';
import { Spinner } from '../Spinner/Spinner';
import { ResultItem } from '../ResultItem/ResultItem';

import styles from './Results.module.css';

interface ResultsProps {
  loading: boolean;
  error: string | null;
  items: Media[];
}

export class Results extends Component<ResultsProps> {
  render() {
    const { loading, error, items } = this.props;

    if (loading) {
      return <Spinner />;
    }

    if (error) {
      return <div>Error: {error}</div>;
    }

    if (!items || items.length === 0) {
      return <div>Results are not found</div>;
    }

    return (
      <div className={styles.container}>
        <h2 className={styles.subtitle}>Results ({items.length} item(s)):</h2>
        {items.map((item) => (
          <ResultItem key={item.id} item={item} />
        ))}
      </div>
    );
  }
}
