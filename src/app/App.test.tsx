import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { App } from './App';

vi.mock('@/hooks/useTheme', () => ({
  useTheme: () => ({ theme: 'light' }),
}));

describe('App', () => {
  it('should render without errors and set theme', () => {
    render(<App />);
    expect(document.body).toHaveAttribute('data-theme', 'light');
  });
});
