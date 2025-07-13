import { Component } from 'react';

import { fetchAnimeBySearchTerm } from './api/fetchAnimeBySearchTerm';
import { fetchPopularAnime } from './api/fetchPopularAnime';

import type { Media } from './types/anilistTypes';
import { SearchPanel } from './components/SearchPanel/SearchPanel';
import { Results } from './components/Results/Results';

import styles from './App.module.css';

interface AppState {
  items: Media[];
  loading: boolean;
  error: string | null;
  isErrorTriggered: boolean;
}

export class App extends Component<Record<string, never>, AppState> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      items: [],
      loading: false,
      error: null,
      isErrorTriggered: false,
    };
  }

  fetchItems = async (searchTerm: string) => {
    this.setState({ loading: true, error: null });

    try {
      const response = searchTerm
        ? await fetchAnimeBySearchTerm(searchTerm)
        : await fetchPopularAnime();

      this.setState({ items: response.data.Page.media, loading: false });
    } catch (error: unknown) {
      let message = '';

      if (error instanceof Error) {
        message = error.message;
      }

      this.setState({
        error: message,
        loading: false,
      });
    }
  };

  handleSearch = (searchTerm: string) => {
    void this.fetchItems(searchTerm);
  };

  render() {
    if (this.state.isErrorTriggered) {
      throw new Error('Test error from render');
    }

    return (
      <>
        <h1 className={styles.title}>Anime Catalog</h1>
        <SearchPanel onSearch={this.handleSearch} />
        <Results
          loading={this.state.loading}
          error={this.state.error}
          items={this.state.items}
        />

        <button
          className={styles.error}
          onClick={() => this.setState({ isErrorTriggered: true })}
        >
          Error
        </button>
      </>
    );
  }
}
