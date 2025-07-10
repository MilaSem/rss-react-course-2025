import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App.tsx';

import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary.tsx';

const container = document.createElement('div');
document.body.appendChild(container);

const root = createRoot(container);

root.render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
