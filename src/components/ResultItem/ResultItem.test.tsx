import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ResultItem } from './ResultItem';
import { mockMediaItem1 } from '@/test-utils/mockMedia';

describe('ResultItem', () => {
  it('should display title and description correctly', () => {
    render(<ResultItem item={mockMediaItem1} />);
    const titleText =
      (mockMediaItem1.title.english || mockMediaItem1.title.romaji) ??
      'Title not available';
    const title = screen.getByText(titleText);
    const descriptionText = mockMediaItem1.description ?? 'No description';
    const description = screen.getByText(descriptionText);
    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });

  it('should cope with missing description property', () => {
    const mockItemWithoutDescription = {
      ...mockMediaItem1,
      description: undefined,
    };
    render(<ResultItem item={mockItemWithoutDescription} />);
    expect(
      screen.getByText('No description for this item'),
    ).toBeInTheDocument();
  });
});
