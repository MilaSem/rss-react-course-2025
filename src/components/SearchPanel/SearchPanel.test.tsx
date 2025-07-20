import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { SearchPanel } from './SearchPanel';

describe('SearchPanel', () => {
  const mockOnSearch = vi.fn();

  afterEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('should render input and button', () => {
    render(<SearchPanel onSearch={mockOnSearch} />);
    const input = screen.getByRole('textbox', { name: /search input/i });
    const button = screen.getByRole('button', { name: /search button/i });
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('should display previous search term from localStorage', () => {
    localStorage.setItem('searchTerm', 'previous');
    render(<SearchPanel onSearch={mockOnSearch} />);
    const input = screen.getByRole('textbox', { name: /search input/i });
    expect(input).toHaveValue('previous');
  });

  it('should display empty input when localStorage has no search term', () => {
    render(<SearchPanel onSearch={mockOnSearch} />);
    const input = screen.getByRole('textbox', { name: /search input/i });
    expect(input).toHaveValue('');
  });

  it('should update input value on user typing', async () => {
    const user = userEvent.setup();
    render(<SearchPanel onSearch={mockOnSearch} />);
    const input = screen.getByRole('textbox', { name: /search input/i });
    await user.type(input, 'text');
    expect(input).toHaveValue('text');
  });

  it('should save trimmed query to localStorage when button is clicked', async () => {
    const user = userEvent.setup();
    render(<SearchPanel onSearch={mockOnSearch} />);

    const input = screen.getByRole('textbox', { name: /search input/i });
    const button = screen.getByRole('button', { name: /search button/i });

    await user.type(input, '  test  ');
    await user.click(button);

    expect(localStorage.getItem('searchTerm')).toBe('test');
  });

  it('should call onSearch callback with correct parameter', async () => {
    const user = userEvent.setup();
    render(<SearchPanel onSearch={mockOnSearch} />);

    const input = screen.getByRole('textbox', { name: /search input/i });
    const button = screen.getByRole('button', { name: /search button/i });

    await user.type(input, 'test');
    await user.click(button);
    expect(mockOnSearch).toHaveBeenCalledWith('test');
  });

  it('should update localStorage with new search query', async () => {
    const user = userEvent.setup();
    render(<SearchPanel onSearch={mockOnSearch} />);

    const input = screen.getByRole('textbox', { name: /search input/i });
    const button = screen.getByRole('button', { name: /search button/i });

    await user.type(input, 'first');
    await user.click(button);
    expect(localStorage.getItem('searchTerm')).toBe('first');

    await user.clear(input);
    await user.type(input, 'second');
    await user.click(button);
    expect(localStorage.getItem('searchTerm')).toBe('second');
  });
});
