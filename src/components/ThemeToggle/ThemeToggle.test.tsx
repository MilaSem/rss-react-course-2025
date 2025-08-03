import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

interface UseThemeReturn {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

vi.mock('@/hooks/useTheme', () => ({
  useTheme: vi.fn(),
}));

import { useTheme } from '@/hooks/useTheme';
import { ThemeToggle } from './ThemeToggle';

vi.mock('./ToggleOnIcon', () => ({
  ToggleOnIcon: (props: { className?: string; pathClassName?: string }) => (
    <svg data-testid="toggle-on-icon" {...props} />
  ),
}));

vi.mock('./ToggleOffIcon', () => ({
  ToggleOffIcon: (props: { className?: string; pathClassName?: string }) => (
    <svg data-testid="toggle-off-icon" {...props} />
  ),
}));

describe('ThemeToggle', () => {
  const mockedUseTheme = useTheme as unknown as ReturnType<typeof vi.fn> & {
    mockReturnValue: (value: UseThemeReturn) => void;
  };

  it('should render ToggleOnIcon when theme is "light"', () => {
    mockedUseTheme.mockReturnValue({
      theme: 'light',
      toggleTheme: vi.fn(),
    });

    render(<ThemeToggle />);
    expect(screen.getByTestId('toggle-on-icon')).toBeInTheDocument();
    expect(screen.queryByTestId('toggle-off-icon')).not.toBeInTheDocument();
  });

  it('should render ToggleOffIcon when theme is "dark"', () => {
    mockedUseTheme.mockReturnValue({
      theme: 'dark',
      toggleTheme: vi.fn(),
    });

    render(<ThemeToggle />);
    expect(screen.getByTestId('toggle-off-icon')).toBeInTheDocument();
    expect(screen.queryByTestId('toggle-on-icon')).not.toBeInTheDocument();
  });

  it('should call toggleTheme when button is clicked', async () => {
    const toggleMock = vi.fn();
    mockedUseTheme.mockReturnValue({
      theme: 'light',
      toggleTheme: toggleMock,
    });

    render(<ThemeToggle />);
    await userEvent.click(screen.getByRole('button'));
    expect(toggleMock).toHaveBeenCalled();
  });
});
