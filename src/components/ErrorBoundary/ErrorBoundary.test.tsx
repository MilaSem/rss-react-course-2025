import { Component } from 'react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
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

    expect(screen.getByText(/oops/i)).toBeInTheDocument();
    expect(screen.getByAltText(/error/i)).toBeInTheDocument();
    expect(consoleErrorSpy).toHaveBeenCalled();
  });
});

describe('Error button', () => {
  class ErrorButton extends Component {
    state = {
      isErrorTriggered: false,
    };

    render() {
      if (this.state.isErrorTriggered) {
        throw new Error('Test error from button');
      }

      return (
        <button onClick={() => this.setState({ isErrorTriggered: true })}>
          Error
        </button>
      );
    }
  }

  it('should throw error on clicked', async () => {
    render(
      <ErrorBoundary>
        <ErrorButton />
      </ErrorBoundary>,
    );

    const user = userEvent.setup();
    await user.click(screen.getByText(/error/i));

    await waitFor(() => {
      expect(screen.getByText(/oops/i)).toBeInTheDocument();
    });

    expect(screen.getByAltText(/error/i)).toBeInTheDocument();
    expect(consoleErrorSpy).toHaveBeenCalled();
  });
});
