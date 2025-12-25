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
      {/* Hero section */}
      <section className="bg-gradient-to-b from-lake-100 to-paper-50 py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-paper-900 mb-4">
            {t('home.title')}
          </h1>
          <p className="text-xl text-lake-700 font-medium mb-6">
            {t('home.subtitle')}
          </p>
          <p className="text-lg text-paper-600 mb-8 max-w-2xl mx-auto">
            {t('home.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={`/${locale}/${docsPath}`} className="btn-primary">
              {t('home.getStarted')}
            </Link>
            <Link to={`/${locale}/${blogPath}`} className="btn-secondary">
              {t('home.readBlog')}
            </Link>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-paper-900 text-center mb-12">
            {t('home.features.title')}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              }
              title={t('home.features.reusable.title')}
              description={t('home.features.reusable.desc')}
            />
            <FeatureCard
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              }
              title={t('home.features.open.title')}
              description={t('home.features.open.desc')}
            />
            <FeatureCard
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              }
              title={t('home.features.nmea.title')}
              description={t('home.features.nmea.desc')}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="card">
      <div className="text-lake-500 mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-paper-900 mb-2">{title}</h3>
      <p className="text-paper-600">{description}</p>
    </div>
  );
}
