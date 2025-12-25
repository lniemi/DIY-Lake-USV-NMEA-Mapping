import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLocale } from '../../hooks/useLocale';

export function NotFound() {
  const { t } = useTranslation();
  const { locale } = useLocale();

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <div className="text-lake-400 mb-6">
        <svg className="w-24 h-24 mx-auto" viewBox="0 0 96 96" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <circle cx="48" cy="48" r="8" />
          <path d="M48 28v-8M48 76v-8M28 48h-8M76 48h-8" />
          <path d="M8 48c8-6 16 6 24 0s16-6 24 0 16 6 24 0 16-6 24 0" strokeWidth="1.5" opacity="0.5" />
          <path d="M8 60c8-6 16 6 24 0s16-6 24 0 16 6 24 0 16-6 24 0" strokeWidth="1.5" opacity="0.3" />
        </svg>
      </div>
      <h1 className="text-6xl font-bold text-paper-300 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-paper-800 mb-2">
        {t('common.notFound')}
      </h2>
      <p className="text-paper-600 mb-8">
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
