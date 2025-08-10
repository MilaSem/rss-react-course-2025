import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ToggleOnIcon } from './ToggleOnIcon';

describe('ToggleOffIcon', () => {
  it('should render with the passed class', () => {
    render(<ToggleOnIcon className="test-svg" pathClassName="test-path" />);
    const svgElement = screen.getByTestId('toggle-on-icon');

    expect(svgElement).toBeInTheDocument();
    expect(svgElement).toHaveClass('test-svg');
  });
});
