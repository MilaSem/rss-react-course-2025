import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ResultItem } from './ResultItem';
import {
  mockMediaItem1,
  mockMediaItem2,
  mockMediaItem3,
} from '@/test-utils/mockMedia';

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

  it('should display romaji title if english title is missing', () => {
    const mockItemWithoutEnglishTitle = mockMediaItem3;
    render(<ResultItem item={mockItemWithoutEnglishTitle} />);
    expect(screen.getByText('Romaji Title 3')).toBeInTheDocument();
  });

  it('should cope with missing description property', () => {
    const mockItemWithoutDescription = mockMediaItem2;
    render(<ResultItem item={mockItemWithoutDescription} />);
    expect(
      screen.getByText('No description for this item'),
    ).toBeInTheDocument();
  });

  it('should display alt text if no title is available', () => {
    const item = {
      ...mockMediaItem3,
      title: {
        english: undefined,
        romaji: undefined,
      },
    };
    render(<ResultItem item={item} />);
    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('alt', 'Poster');
  });
});
