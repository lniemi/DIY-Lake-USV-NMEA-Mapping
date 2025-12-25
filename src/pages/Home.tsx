import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLocale } from '../hooks/useLocale';

export function Home() {
  const { t } = useTranslation();
  const { locale } = useLocale();
  const docsPath = locale === 'fi' ? 'dokumentaatio' : 'docs';
  const blogPath = locale === 'fi' ? 'blogi' : 'blog';

  return (
    <div>
      {/* Project header */}
      <section className="py-12 md:py-16 border-b border-paper-200">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-paper-900 mb-4">
            {t('home.title')}
          </h1>
          <p className="text-lg text-paper-600 mb-6">
            {t('home.description')}
          </p>
          <nav className="flex gap-6 text-sm">
            <Link
              to={`/${locale}/${docsPath}`}
              className="text-lake-700 hover:text-lake-800 font-medium"
            >
              {t('home.viewDocs')} →
            </Link>
            <Link
              to={`/${locale}/${blogPath}`}
              className="text-lake-700 hover:text-lake-800 font-medium"
            >
              {t('home.viewLog')} →
            </Link>
          </nav>
        </div>
      </section>

      {/* Project scope */}
      <section className="py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-xl font-semibold text-paper-900 mb-8">
            {t('home.scope.title')}
          </h2>
          <div className="space-y-6">
            <ScopeItem
              title={t('home.scope.hardware.title')}
              description={t('home.scope.hardware.desc')}
            />
            <ScopeItem
              title={t('home.scope.data.title')}
              description={t('home.scope.data.desc')}
            />
            <ScopeItem
              title={t('home.scope.methods.title')}
              description={t('home.scope.methods.desc')}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

interface ScopeItemProps {
  title: string;
  description: string;
}

function ScopeItem({ title, description }: ScopeItemProps) {
  return (
    <div className="border-l-2 border-lake-300 pl-4">
      <h3 className="font-medium text-paper-900">{title}</h3>
      <p className="text-paper-600 text-sm mt-1">{description}</p>
    </div>
  );
}
