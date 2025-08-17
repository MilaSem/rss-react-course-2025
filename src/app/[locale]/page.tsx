'use client';

import LanguageSwitcher from '../components/LanguageSwitcher/LanguageSwitcher';
import '@/app/globals.css';
import PopularPage from '../popular';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function MainPage() {
  const t = useTranslations('MainPage');

  return (
    <div className="list">
      <Link href="/about">{t('about')}</Link>
      <LanguageSwitcher />
      <PopularPage />
    </div>
  );
}
