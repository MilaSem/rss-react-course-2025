import { Component } from 'react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { App } from '@/App';
import { ErrorBoundary } from './ErrorBoundary';
import userEvent from '@testing-library/user-event';

const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

afterEach(() => {
  consoleErrorSpy.mockClear();
});

describe('ErrorBoundary', () => {
  class FaultyComponent extends Component {
    componentDidMount() {
      throw new Error('Error inside component');
    }
    render() {
      return null;
    }
  }

  it('should detect and handle errors in child components', () => {
    render(
      <ErrorBoundary>
        <FaultyComponent />
      </ErrorBoundary>,
    );

    expect(screen.getByText('Oops! Error detected')).toBeInTheDocument();
    expect(screen.getByAltText('error')).toBeInTheDocument();
    expect(consoleErrorSpy).toHaveBeenCalled();
  });
});

describe('Error button', () => {
  it('should throw error on clicked', async () => {
    render(
      <ErrorBoundary>
        <App />
      </ErrorBoundary>,
    );

    await userEvent.click(screen.getByText('Error'));

    await waitFor(() => {
      expect(screen.getByText('Oops! Error detected')).toBeInTheDocument();
    });
    expect(screen.getByAltText('error')).toBeInTheDocument();
    expect(consoleErrorSpy).toHaveBeenCalled();
  });
});
