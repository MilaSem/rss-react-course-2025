import { useTranslations } from 'next-intl';
import '@/app/globals.css';
import styles from './page.module.css';

const AboutPage = () => {
  const t = useTranslations('AboutPage');

  return (
    <div className={styles.about}>
      <h1 className={styles.title}>{t('title')}</h1>
      <p>
        {t('author')}
        <a
          className={styles.link}
          href="https://github.com/MilaSem"
          target="_blank"
          rel="noreferrer"
        >
          {t('authorName')}
        </a>
      </p>
      <p>
        {t('appDescription')}
        <a
          className={styles.link}
          href="https://rs.school/courses/reactjs"
          target="_blank"
          rel="noreferrer"
        >
          {t('courseLink')}
        </a>
      </p>
      <p>{t('courseDescription')}</p>
    </div>
  );
};

export default AboutPage;
