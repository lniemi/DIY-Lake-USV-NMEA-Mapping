import { useTranslation } from 'react-i18next';
import { useLocale } from '../../hooks/useLocale';

export function LanguageSwitcher() {
  const { t } = useTranslation();
  const { switchLocale } = useLocale();

  return (
    <button
      onClick={switchLocale}
      className="text-sm text-paper-600 hover:text-lake-700 transition-colors font-medium"
    >
      {t('common.switchLanguage')}
    </button>
  );
}
