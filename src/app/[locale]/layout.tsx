import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import type { ReactNode } from 'react';
import styles from './layout.module.css';

interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

const LocaleLayout = async ({ children, params }: LocaleLayoutProps) => {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const headerTitle = locale === 'ru' ? 'Каталог Аниме' : 'Anime Catalog';

  return (
    <NextIntlClientProvider locale={locale}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>{headerTitle}</h1>
        </header>
        {children}
        <footer className={styles.footer}>Mila Sem 2025, RSSchool</footer>
      </div>
    </NextIntlClientProvider>
  );
};

export default LocaleLayout;
