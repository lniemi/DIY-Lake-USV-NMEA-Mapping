import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { Locale } from '../types';

export function useLocale() {
  const location = useLocation();
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  const pathParts = location.pathname.split('/').filter(Boolean);
  const currentLocale: Locale = (pathParts[0] === 'fi' ? 'fi' : 'en');

  const switchLocale = () => {
    const newLocale: Locale = currentLocale === 'en' ? 'fi' : 'en';

    // Get path without locale prefix
    const pathWithoutLocale = '/' + pathParts.slice(1).join('/');

    // Map route paths between languages
    let newPath = pathWithoutLocale;
    if (currentLocale === 'en') {
      newPath = newPath
        .replace('/blog', '/blogi')
        .replace('/docs', '/dokumentaatio');
    } else {
      newPath = newPath
        .replace('/blogi', '/blog')
        .replace('/dokumentaatio', '/docs');
    }

    i18n.changeLanguage(newLocale);
    navigate(`/${newLocale}${newPath}`);
  };

  return {
    locale: currentLocale,
    switchLocale,
    isEnglish: currentLocale === 'en',
    isFinnish: currentLocale === 'fi',
  };
}
