import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { SearchPanel } from './SearchPanel';

describe('SearchPanel', () => {
  const mockOnSearch = vi.fn();
  const user = userEvent.setup();

  afterEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('should render input and button', () => {
    render(<SearchPanel onSearch={mockOnSearch} />);
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button');
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('should display previous search term from localStorage', () => {
    localStorage.setItem('searchTerm', 'previous');
    render(<SearchPanel onSearch={mockOnSearch} />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('previous');
  });

  it('should display empty input when localStorage has no search term', () => {
    render(<SearchPanel onSearch={mockOnSearch} />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('');
  });

  it('should update input value on user typing', async () => {
    render(<SearchPanel onSearch={mockOnSearch} />);
    const input = screen.getByRole('textbox');
    await user.type(input, 'text');
    expect(input).toHaveValue('text');
  });

  it('should save trimmed query to localStorage when button is clicked', async () => {
    render(<SearchPanel onSearch={mockOnSearch} />);
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button');
    await user.type(input, '  test  ');
    await user.click(button);

    expect(localStorage.getItem('searchTerm')).toBe('test');
  });

  it('should call onSearch callback with correct parameter', async () => {
    render(<SearchPanel onSearch={mockOnSearch} />);
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button');
    await user.type(input, 'test');
    await user.click(button);
    expect(mockOnSearch).toHaveBeenCalledWith('test');
  });

  it('should update localStorage with new search query', async () => {
    render(<SearchPanel onSearch={mockOnSearch} />);
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button');
    await user.type(input, 'first');
    await user.click(button);
    expect(localStorage.getItem('searchTerm')).toBe('first');

    await user.clear(input);
    await user.type(input, 'second');
    await user.click(button);
    expect(localStorage.getItem('searchTerm')).toBe('second');
  });
});
