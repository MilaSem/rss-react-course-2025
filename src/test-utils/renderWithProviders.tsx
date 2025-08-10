import { MemoryRouter } from 'react-router';
import { render } from '@testing-library/react';
import type { ReactNode } from 'react';
import type { MemoryRouterProps } from 'react-router';
import type { RenderOptions } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

interface AllProvidersProps {
  children: ReactNode;
  routerProps?: MemoryRouterProps;
}

const AllProviders = ({ children, routerProps }: AllProvidersProps) => (
  <MemoryRouter {...routerProps}>
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  </MemoryRouter>
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
