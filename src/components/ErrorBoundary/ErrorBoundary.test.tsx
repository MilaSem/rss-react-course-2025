import { Component } from 'react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from './ErrorBoundary';

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
