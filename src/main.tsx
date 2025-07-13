import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App.tsx';

import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary.tsx';

import styles from './main.module.css';

const container = document.createElement('div');
container.className = styles.container;
document.body.append(container);

const root = createRoot(container);

root.render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
