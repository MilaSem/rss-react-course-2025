import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { ResultItem } from './ResultItem';
import {
  mockMediaItemWithEnglish,
  mockMediaItemWithRomajiOnly,
  mockMediaItemNoTitle,
  mockMediaItemNoDescription,
} from '@/test-utils/mockMedia';

import { renderWithProviders } from '@/test-utils/renderWithProviders';

describe('ResultItem', () => {
  it('should display the english title when available', () => {
    renderWithProviders(<ResultItem item={mockMediaItemWithEnglish} />);
    expect(screen.getByText(/english title/i)).toBeInTheDocument();
  });

  it('should display the romaji title if english title is missing', () => {
    renderWithProviders(<ResultItem item={mockMediaItemWithRomajiOnly} />);
    expect(screen.getByText(/romaji title/i)).toBeInTheDocument();
  });

  it('should display fallback if no title is provided', () => {
    renderWithProviders(<ResultItem item={mockMediaItemNoTitle} />);
    expect(screen.getByText(/title not available/i)).toBeInTheDocument();
  });

  it('should display the description if provided', () => {
    renderWithProviders(<ResultItem item={mockMediaItemWithEnglish} />);
    expect(screen.getByText(/some description here/i)).toBeInTheDocument();
  });

  it('should display fallback if description is empty', () => {
    renderWithProviders(<ResultItem item={mockMediaItemNoDescription} />);
    expect(
      screen.getByText(/no description for this item/i),
    ).toBeInTheDocument();
  });
});
