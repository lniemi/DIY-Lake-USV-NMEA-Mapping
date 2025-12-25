import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLocale } from '../../hooks/useLocale';
import { MarkdownRenderer } from './MarkdownRenderer';

interface BlogPostProps {
  title: string;
  date: string;
  content: string;
  tags?: string[];
}

export function BlogPost({ title, date, content, tags }: BlogPostProps) {
  const { t } = useTranslation();
  const { locale } = useLocale();
  const blogPath = locale === 'fi' ? 'blogi' : 'blog';

  return (
    <article className="max-w-3xl mx-auto">
      <Link
        to={`/${locale}/${blogPath}`}
        className="text-lake-700 hover:text-lake-800 text-sm mb-6 inline-block"
      >
        &larr; {t('common.backToBlog')}
      </Link>

      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-paper-900 mb-4">
          {title}
        </h1>
        <div className="flex items-center gap-4 text-sm text-paper-500">
          <time dateTime={date}>
            {t('common.postedOn')} {new Date(date).toLocaleDateString(locale === 'fi' ? 'fi-FI' : 'en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
        </div>
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {tags.map(tag => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      <MarkdownRenderer content={content} />
    </article>
  );
}
