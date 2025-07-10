import { Component, ErrorInfo, ReactNode } from 'react';
import styles from './ErrorBoundary.module.css';
import error from '/error-page.svg';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('Error caught by ErrorBoundary:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
          <h2 className={styles.h2}>Oops! Error detected</h2>
          <p>We are already repairing</p>
          <img className={styles.img} src={error} alt="error" />
        </>
      );
    }
    return this.props.children;
  }
}
