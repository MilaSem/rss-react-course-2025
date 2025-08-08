import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Page404 } from './Page404';

describe('Page404', () => {
  it('should render with correct title and description', () => {
    render(<Page404 />);

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('Oops... Something went wrong!');

    const paragraph = screen.getByText(
      'Sorry, the page you requested was not found',
    );
    expect(paragraph).toBeInTheDocument();
  });
});
