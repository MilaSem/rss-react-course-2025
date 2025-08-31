import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App.tsx';

import './globals.css';

const container = document.createElement('div');
container.className = 'container';
document.body.append(container);

const root = createRoot(container);

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
