import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useLocale } from '../../hooks/useLocale';
import { LanguageSwitcher } from '../common/LanguageSwitcher';

export function Header() {
  const { t } = useTranslation();
  const { locale } = useLocale();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const blogPath = locale === 'fi' ? 'blogi' : 'blog';
  const docsPath = locale === 'fi' ? 'dokumentaatio' : 'docs';
  const graphPath = locale === 'fi' ? 'tietograafi' : 'graph';
  const viewerPath = locale === 'fi' ? 'katselin' : 'viewer';

  const navItems = [
    { to: `/${locale}`, label: t('nav.home'), end: true },
    { to: `/${locale}/${blogPath}`, label: t('nav.blog') },
    { to: `/${locale}/${docsPath}`, label: t('nav.docs') },
    { to: `/${locale}/${graphPath}`, label: t('nav.graph') },
    { to: `/${locale}/${viewerPath}`, label: t('nav.viewer') },
  ];

  return (
    <header className="bg-paper-50 border-b border-paper-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to={`/${locale}`} className="flex items-center gap-2 font-bold text-xl text-lake-900">
            <svg className="w-6 h-6 text-lake-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M2 8c3-2 5 2 8 0s5-2 8 0" />
              <path d="M2 12c3-2 5 2 8 0s5-2 8 0" />
              <path d="M2 16c3-2 5 2 8 0s5-2 8 0" />
            </svg>
            Lake USV
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  isActive ? 'nav-link-active' : 'nav-link'
                }
              >
                {item.label}
              </NavLink>
            ))}
            <LanguageSwitcher />
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile nav */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-paper-200">
            <div className="flex flex-col gap-4">
              {navItems.map(item => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    isActive ? 'nav-link-active' : 'nav-link'
                  }
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </NavLink>
              ))}
              <LanguageSwitcher />
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
