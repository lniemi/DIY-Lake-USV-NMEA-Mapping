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
      <p className="text-paper-600 text-center py-12">
        {t('blog.noPosts')}
      </p>
    );
  }

  return (
    <div className="space-y-8">
      {posts.map(post => (
        <article
          key={post.slug}
          className="card"
        >
          <Link to={`/${locale}/${blogPath}/${post.slug}`}>
            <h2 className="text-xl font-semibold text-paper-900 hover:text-lake-700 transition-colors mb-2">
              {post.title}
            </h2>
          </Link>
          <div className="flex items-center gap-4 text-sm text-paper-500 mb-3">
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
          <p className="text-paper-600 mb-4">{post.excerpt}</p>
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <span key={tag} className="tag">
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
