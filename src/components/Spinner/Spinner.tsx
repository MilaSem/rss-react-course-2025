import { Component } from 'react';
import styles from './Spinner.module.css';

export class Spinner extends Component {
  render() {
    return (
      <div
        className={styles.spinner}
        aria-label="Loading"
        aria-busy="true"
        data-testid="spinner"
      ></div>
    );
  }
}
