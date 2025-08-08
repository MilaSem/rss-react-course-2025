import { describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
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
    renderWithProviders(
      <ResultItem
        item={mockMediaItemWithEnglish}
        isSelected={false}
        onSelectedChange={() => {}}
      />,
    );
    expect(screen.getByText(/english title/i)).toBeInTheDocument();
  });

  it('should display the romaji title if english title is missing', () => {
    renderWithProviders(
      <ResultItem
        item={mockMediaItemWithRomajiOnly}
        isSelected={false}
        onSelectedChange={() => {}}
      />,
    );
    expect(screen.getByText(/romaji title/i)).toBeInTheDocument();
  });

  it('should display fallback if no title is provided', () => {
    renderWithProviders(
      <ResultItem
        item={mockMediaItemNoTitle}
        isSelected={false}
        onSelectedChange={() => {}}
      />,
    );
    expect(screen.getByText(/no title/i)).toBeInTheDocument();
  });

  it('should display the description if provided', () => {
    renderWithProviders(
      <ResultItem
        item={mockMediaItemWithEnglish}
        isSelected={false}
        onSelectedChange={() => {}}
      />,
    );
    expect(screen.getByText(/some description/i)).toBeInTheDocument();
  });

  it('should display fallback if description is empty', () => {
    renderWithProviders(
      <ResultItem
        item={mockMediaItemNoDescription}
        isSelected={false}
        onSelectedChange={() => {}}
      />,
    );
    expect(
      screen.getByText(/no description for this item/i),
    ).toBeInTheDocument();
  });

  it('should have checked class when isSelected is true', () => {
    renderWithProviders(
      <ResultItem
        item={mockMediaItemWithEnglish}
        isSelected={true}
        onSelectedChange={() => {}}
      />,
    );
    const checkbox = screen.getByRole('checkbox', { name: /select/i });
    expect(checkbox).toBeChecked();
  });

  it('should handle icon click to toggle selection', async () => {
    const onChangeMock = vi.fn();

    renderWithProviders(
      <ResultItem
        item={mockMediaItemWithEnglish}
        isSelected={false}
        onSelectedChange={onChangeMock}
      />,
    );

    const starDiv = screen.getByLabelText(/select/i);
    await userEvent.click(starDiv);
    expect(onChangeMock).toHaveBeenCalledWith(
      mockMediaItemWithEnglish.id,
      true,
    );
  });

  it('should handle pressing Enter or Space keys on the icon', async () => {
    const onChangeMock = vi.fn();
    renderWithProviders(
      <ResultItem
        item={mockMediaItemWithEnglish}
        isSelected={false}
        onSelectedChange={onChangeMock}
      />,
    );

    const starDiv = screen.getByLabelText(/select/i);

    await userEvent.type(starDiv, '{enter}');
    expect(onChangeMock).toHaveBeenCalledWith(
      mockMediaItemWithEnglish.id,
      true,
    );

    await userEvent.type(starDiv, ' ');
    expect(onChangeMock).toHaveBeenCalledWith(
      mockMediaItemWithEnglish.id,
      true,
    );
  });
});
