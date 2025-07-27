import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ResultItem } from './ResultItem';
import {
  mockMediaItemWithEnglish,
  mockMediaItemWithRomajiOnly,
  mockMediaItemNoTitle,
  mockMediaItemNoDescription,
} from '@/test-utils/mockMedia';

import { MemoryRouter } from 'react-router';

describe('ResultItem', () => {
  it('should display the english title when available', () => {
    render(
      <MemoryRouter>
        <ResultItem item={mockMediaItemWithEnglish} />
      </MemoryRouter>,
    );
    expect(screen.getByText('English Title')).toBeInTheDocument();
  });

  it('should display the romaji title if english title is missing', () => {
    render(
      <MemoryRouter>
        <ResultItem item={mockMediaItemWithRomajiOnly} />
      </MemoryRouter>,
    );
    expect(screen.getByText('Romaji Title')).toBeInTheDocument();
  });

  it('should display fallback if no title is provided', () => {
    render(
      <MemoryRouter>
        <ResultItem item={mockMediaItemNoTitle} />
      </MemoryRouter>,
    );
    expect(screen.getByText('Title not available')).toBeInTheDocument();
  });

  it('should display the description if provided', () => {
    render(
      <MemoryRouter>
        <ResultItem item={mockMediaItemWithEnglish} />
      </MemoryRouter>,
    );
    expect(screen.getByText('Some description here')).toBeInTheDocument();
  });

  it('should display fallback if description is empty', () => {
    render(
      <MemoryRouter>
        <ResultItem item={mockMediaItemNoDescription} />
      </MemoryRouter>,
    );
    expect(
      screen.getByText('No description for this item'),
    ).toBeInTheDocument();
  });
});
