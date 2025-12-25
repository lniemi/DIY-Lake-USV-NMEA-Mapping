import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLocale } from '../../hooks/useLocale';
import type { BlogPost } from '../../types';

interface BlogListProps {
  posts: BlogPost[];
}

export function BlogList({ posts }: BlogListProps) {
  const { t } = useTranslation();
  const { locale } = useLocale();
  const blogPath = locale === 'fi' ? 'blogi' : 'blog';

  if (posts.length === 0) {
    return (
      <p className="text-slate-600 text-center py-12">
        {t('blog.noPosts')}
      </p>
    );
  }

  return (
    <div className="space-y-8">
      {posts.map(post => (
        <article
          key={post.slug}
          className="bg-white rounded-lg border border-slate-200 p-6 hover:border-blue-300 transition-colors"
        >
          <Link to={`/${locale}/${blogPath}/${post.slug}`}>
            <h2 className="text-xl font-semibold text-slate-800 hover:text-blue-600 transition-colors mb-2">
              {post.title}
            </h2>
          </Link>
          <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
            <time dateTime={post.date}>
              {t('common.postedOn')} {new Date(post.date).toLocaleDateString(locale === 'fi' ? 'fi-FI' : 'en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            {post.readingTime && (
              <span>{post.readingTime} {t('common.minuteRead')}</span>
            )}
          </div>
          <p className="text-slate-600 mb-4">{post.excerpt}</p>
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <span
                  key={tag}
                  className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </article>
      ))}
    </div>
  );
}
