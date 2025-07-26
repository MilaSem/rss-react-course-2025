import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pagination } from './Pagination';

describe('Pagination', () => {
  const onPrev = vi.fn();
  const onNext = vi.fn();

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should display the correct current page number', () => {
    render(
      <Pagination
        currentPage={3}
        hasNextPage={true}
        onPrevPage={onPrev}
        onNextPage={onNext}
      />,
    );
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('should disable the prev button on the first page', () => {
    render(
      <Pagination
        currentPage={1}
        hasNextPage={true}
        onPrevPage={onPrev}
        onNextPage={onNext}
      />,
    );
    const prevButton = screen.getByRole('button', { name: /prev/i });
    expect(prevButton).toBeDisabled();
  });

  it('should call onPrevPage when prev button is clicked', async () => {
    render(
      <Pagination
        currentPage={2}
        hasNextPage={true}
        onPrevPage={onPrev}
        onNextPage={onNext}
      />,
    );
    const prevButton = screen.getByRole('button', { name: /prev/i });
    expect(prevButton).toBeEnabled();

    await userEvent.click(prevButton);
    expect(onPrev).toHaveBeenCalled();
  });

  it('should disable the next button when hasNextPage is false', () => {
    render(
      <Pagination
        currentPage={2}
        hasNextPage={false}
        onPrevPage={onPrev}
        onNextPage={onNext}
      />,
    );
    const nextButton = screen.getByRole('button', { name: /next/i });
    expect(nextButton).toBeDisabled();
  });

  it('should call onNextPage when next button is clicked', async () => {
    render(
      <Pagination
        currentPage={2}
        hasNextPage={true}
        onPrevPage={onPrev}
        onNextPage={onNext}
      />,
    );
    const nextButton = screen.getByRole('button', { name: /next/i });
    expect(nextButton).toBeEnabled();

    await userEvent.click(nextButton);
    expect(onNext).toHaveBeenCalled();
  });
});
