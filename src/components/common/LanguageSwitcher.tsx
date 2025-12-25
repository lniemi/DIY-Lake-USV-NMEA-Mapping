import { useTranslation } from 'react-i18next';
import { useLocale } from '../../hooks/useLocale';

export function LanguageSwitcher() {
  const { t } = useTranslation();
  const { switchLocale } = useLocale();

  return (
    <button
      onClick={switchLocale}
      className="text-sm text-slate-600 hover:text-blue-600 transition-colors font-medium"
    >
      {t('common.switchLanguage')}
    </button>
  );
}
