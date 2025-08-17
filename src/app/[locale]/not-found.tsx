import { useTranslations } from 'next-intl';
import '@/app/globals.css';

const NotFoundPage = () => {
  const t = useTranslations('NotFoundPage');
  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
    </div>
  );
};

export default NotFoundPage;
