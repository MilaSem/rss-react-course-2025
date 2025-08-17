import { usePathname, Link } from '@/i18n/navigation';
import styles from './LanguageSwitcher.module.css';

const LanguageSwitcher = () => {
  const pathname = usePathname();
  const segments = pathname?.split('/').filter(Boolean) || [];
  const locales = ['en', 'ru'];

  return (
    <div className={styles.switcher}>
      {locales.map((locale) => {
        const newSegments = [...segments];
        if (newSegments.length > 0) {
          newSegments[0] = locale;
        } else {
          newSegments.push(locale);
        }

        const href = newSegments.join('/');

        return (
          <Link className={styles.locale} key={locale} href={href}>
            {locale}
          </Link>
        );
      })}
    </div>
  );
};

export default LanguageSwitcher;
