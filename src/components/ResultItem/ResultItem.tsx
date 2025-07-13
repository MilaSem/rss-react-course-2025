import { Component } from 'react';
import type { Media } from '@/types/anilistTypes';

import styles from './ResultItem.module.css';
import { cleanAndTrimText } from '@/utils/cleanAndTrimText';

const MAX_LENGTH = 300;

interface ResultItemProps {
  item: Media;
}

export class ResultItem extends Component<ResultItemProps> {
  render() {
    const { item } = this.props;

    return (
      <div className={styles.item}>
        <p className={styles.title}>
          {item.title.english || item.title.romaji}
        </p>
        <p className={styles.description}>
          {cleanAndTrimText(MAX_LENGTH, item.description) ||
            'No description for this item'}
        </p>
        {item.coverImage?.extraLarge && (
          <img
            src={item.coverImage.extraLarge}
            alt={item.title.english || item.title.romaji || 'Poster'}
            className={styles.poster}
          />
        )}
      </div>
    );
  }
}
