import { MemoryRouter } from 'react-router';
import { render } from '@testing-library/react';
import type { ReactNode } from 'react';
import type { MemoryRouterProps } from 'react-router';
import type { RenderOptions } from '@testing-library/react';

interface AllProvidersProps {
  children: ReactNode;
  routerProps?: MemoryRouterProps;
}

const AllProviders = ({ children, routerProps }: AllProvidersProps) => (
  <MemoryRouter {...routerProps}>{children}</MemoryRouter>
);

export const renderWithProviders = (
  ui: ReactNode,
  options?: {
    routerProps?: MemoryRouterProps;
    renderOptions?: Omit<RenderOptions, 'wrapper'>;
  },
) => {
  const { routerProps, renderOptions } = options || {};
  return render(ui, {
    wrapper: (props) => <AllProviders {...props} routerProps={routerProps} />,
    ...renderOptions,
  });
};
