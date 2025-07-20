import { Component } from 'react';
import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { App } from '@/App';
import { ErrorBoundary } from './ErrorBoundary';

class FaultyComponent extends Component {
  componentDidMount() {
    throw new Error('Error inside component');
  }
  render() {
    return null;
  }
}

describe('ErrorBoundary', () => {
  it('should detect and handle errors in child components', () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <FaultyComponent />
      </ErrorBoundary>,
    );

    const text = screen.getByText('Oops! Error detected');
    const img = screen.getByAltText('error');

    expect(text).toBeInTheDocument();
    expect(img).toBeInTheDocument();

    expect(consoleErrorSpy).toHaveBeenCalled();
    consoleErrorSpy.mockRestore();
  });
});

describe('Error button', () => {
  it('should throw error on clicked', () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <App />
      </ErrorBoundary>,
    );

    const errorButton = screen.getByText('Error');
    fireEvent.click(errorButton);

    const text = screen.getByText('Oops! Error detected');
    const img = screen.getByAltText('error');

    expect(text).toBeInTheDocument();
    expect(img).toBeInTheDocument();

    expect(consoleErrorSpy).toHaveBeenCalled();
    consoleErrorSpy.mockRestore();
  });
});
