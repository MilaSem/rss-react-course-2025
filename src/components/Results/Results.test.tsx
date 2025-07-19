import { describe, it, expect } from 'vitest';
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
    render(<Results loading={false} error={null} items={mockItems} />);
    const results = screen.getAllByTestId('result-item');
    expect(results.length).toBe(mockItems.length);
  });

  it('should display the clear message if the data array is empty', () => {
    render(<Results loading={false} error={null} items={[]} />);
    expect(screen.getByText('Results are not found')).toBeInTheDocument();
  });

  it('should show loading status when requesting data', () => {
    render(<Results loading={true} error={null} items={[]} />);
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('should hide spinner when loading is false', () => {
    render(<Results loading={false} error={null} items={mockItems} />);
    expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
  });
});
