import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLocale } from '../../hooks/useLocale';
import { MarkdownRenderer } from './MarkdownRenderer';

interface DocPageProps {
  title: string;
  content: string;
}

export function DocPage({ title, content }: DocPageProps) {
  const { t } = useTranslation();
  const { locale } = useLocale();
  const docsPath = locale === 'fi' ? 'dokumentaatio' : 'docs';

  return (
    <article>
      <Link
        to={`/${locale}/${docsPath}`}
        className="text-lake-700 hover:text-lake-800 text-sm mb-6 inline-block md:hidden"
      >
        &larr; {t('common.backToDocs')}
      </Link>

      <header className="mb-8">
        <h1 className="text-3xl font-bold text-paper-900">
          {title}
        </h1>
      </header>

      <MarkdownRenderer content={content} />
    </article>
  );
}
