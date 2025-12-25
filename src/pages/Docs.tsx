import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useLocale } from '../hooks/useLocale';
import { useDocs } from '../hooks/useDocs';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import type { DocSection } from '../types';

export function Docs() {
  const { t } = useTranslation();
  const { locale } = useLocale();
  const { sections, loading, error } = useDocs(locale);
  const docsPath = locale === 'fi' ? 'dokumentaatio' : 'docs';

  const renderSectionList = (sectionList: DocSection[], depth = 0) => {
    return (
      <ul className={depth === 0 ? 'space-y-4' : 'space-y-2 mt-2 ml-4'}>
        {sectionList.map(section => (
          <li key={section.slug}>
            {section.file ? (
              <Link
                to={`/${locale}/${docsPath}/${section.slug}`}
                className="text-lake-700 hover:text-lake-800 font-medium"
              >
                {section.title}
              </Link>
            ) : (
              <span className="font-semibold text-paper-900">{section.title}</span>
            )}
            {section.children && section.children.length > 0 && (
              renderSectionList(section.children, depth + 1)
            )}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <header className="mb-12 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-paper-900 mb-4">
          {t('docs.title')}
        </h1>
        <p className="text-lg text-paper-600">
          {t('docs.subtitle')}
        </p>
      </header>

      {loading && <LoadingSpinner />}

      {error && (
        <p className="text-center text-red-600">
          Error loading documentation: {error.message}
        </p>
      )}

      {!loading && !error && (
        <div className="card">
          <h2 className="text-xl font-semibold text-paper-900 mb-6">
            {t('docs.tableOfContents')}
          </h2>
          {renderSectionList(sections)}
        </div>
      )}
    </div>
  );
}
