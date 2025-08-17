import type { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <html lang="en">
      <head>
        <title>Anime Catalog</title>
      </head>
      <body>{children}</body>
    </html>
  );
};

export default Layout;
