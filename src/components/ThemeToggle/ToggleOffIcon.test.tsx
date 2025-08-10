import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ToggleOffIcon } from './ToggleOffIcon';

describe('ToggleOffIcon', () => {
  it('should render with the passed class', () => {
    render(<ToggleOffIcon className="test-svg" pathClassName="test-path" />);
    const svgElement = screen.getByTestId('toggle-off-icon');

    expect(svgElement).toBeInTheDocument();
    expect(svgElement).toHaveClass('test-svg');
  });
});
