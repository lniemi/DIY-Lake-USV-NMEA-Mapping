import { useTranslation } from 'react-i18next';
import { useLocale } from '../hooks/useLocale';
import { useBlogPosts } from '../hooks/useBlogPosts';
import { BlogList } from '../components/content/BlogList';
import { LoadingSpinner } from '../components/common/LoadingSpinner';

export function Blog() {
  const { t } = useTranslation();
  const { locale } = useLocale();
  const { posts, loading, error } = useBlogPosts(locale);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <header className="mb-12 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
          {t('blog.title')}
        </h1>
        <p className="text-lg text-slate-600">
          {t('blog.subtitle')}
        </p>
      </header>

      {loading && <LoadingSpinner />}

      {error && (
        <p className="text-center text-red-600">
          Error loading posts: {error.message}
        </p>
      )}

      {!loading && !error && <BlogList posts={posts} />}
    </div>
  );
}
