import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ResultItem } from './ResultItem';
import {
  mockMediaItemWithEnglish,
  mockMediaItemWithRomajiOnly,
  mockMediaItemNoTitle,
  mockMediaItemNoDescription,
} from '@/test-utils/mockMedia';

describe('ResultItem', () => {
  it('should display the english title when available', () => {
    render(<ResultItem item={mockMediaItemWithEnglish} />);
    expect(screen.getByText(/english title/i)).toBeInTheDocument();
  });

  it('should display the romaji title if english title is missing', () => {
    render(<ResultItem item={mockMediaItemWithRomajiOnly} />);
    expect(screen.getByText(/romaji title/i)).toBeInTheDocument();
  });

  it('should display fallback if no title is provided', () => {
    render(<ResultItem item={mockMediaItemNoTitle} />);
    expect(screen.getByText(/title not available/i)).toBeInTheDocument();
  });

  it('should display the description if provided', () => {
    render(<ResultItem item={mockMediaItemWithEnglish} />);
    expect(screen.getByText(/some description here/i)).toBeInTheDocument();
  });

  it('should display fallback if description is empty', () => {
    render(<ResultItem item={mockMediaItemNoDescription} />);
    expect(
      screen.getByText(/no description for this item/i),
    ).toBeInTheDocument();
  });
});
