import { useTranslation } from 'react-i18next';

export function LoadingSpinner() {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-center py-12">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-lake-500"></div>
      <span className="ml-3 text-paper-600">{t('common.loading')}</span>
    </div>
  );
}
