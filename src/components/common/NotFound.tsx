import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLocale } from '../../hooks/useLocale';

export function NotFound() {
  const { t } = useTranslation();
  const { locale } = useLocale();

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-bold text-slate-300 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-slate-700 mb-2">
        {t('common.notFound')}
      </h2>
      <p className="text-slate-600 mb-8">
        {t('common.notFoundDesc')}
      </p>
      <Link
        to={`/${locale}`}
        className="btn-primary"
      >
        {t('common.goHome')}
      </Link>
    </div>
  );
}
