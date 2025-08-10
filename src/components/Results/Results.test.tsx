import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Results } from './Results';
import { mockMediaItems } from '@/test-utils/mockMedia';
import type { Media } from '@/types/anilistTypes';

vi.mock('../ResultItem/ResultItem', () => ({
  ResultItem: ({ item }: { item: Media }) => (
    <div data-testid="result-item">
      <div>{item.title?.english || item.title?.romaji}</div>
      <div>{item.description}</div>
    </div>
  ),
}));

const mockItems = mockMediaItems;

describe('Results', () => {
  it('should display the correct number of items', () => {
    render(<Results isFetching={false} error={null} items={mockItems} />);
    const results = screen.getAllByTestId('result-item');
    expect(results.length).toBe(mockItems.length);
  });

  it('should display the clear message if the data array is empty', () => {
    render(<Results isFetching={false} error={null} items={[]} />);
    expect(screen.getByText(/results are not found/i)).toBeInTheDocument();
  });

  it('should show loading status when requesting data', () => {
    render(<Results isFetching={true} error={null} items={[]} />);
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('should hide spinner when loading is false', () => {
    render(<Results isFetching={false} error={null} items={mockItems} />);
    expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
  });

  it('should display error message when error prop is set', () => {
    const errorMsg = 'Network error';
    render(<Results isFetching={false} error={errorMsg} items={[]} />);
    expect(screen.getByText(`Error: ${errorMsg}`)).toBeInTheDocument();
  });
});
