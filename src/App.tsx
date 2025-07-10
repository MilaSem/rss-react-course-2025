import { Component } from 'react';

interface AppState {
  triggerError: boolean;
}

export class App extends Component<Record<string, never>, AppState> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      triggerError: false,
    };
  }

  render() {
    if (this.state.triggerError) {
      throw new Error('Test error from render');
    }
    return (
      <>
        <h1>Anime Catalog</h1>
        <button onClick={() => this.setState({ triggerError: true })}>
          Error
        </button>
      </>
    );
  }
}
