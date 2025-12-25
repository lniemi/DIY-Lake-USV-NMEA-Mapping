import { useParams } from 'react-router-dom';
import { useLocale } from '../hooks/useLocale';
import { useDocs } from '../hooks/useDocs';
import { useContent } from '../hooks/useContent';
import { DocNav } from '../components/content/DocNav';
import { DocPage } from '../components/content/DocPage';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { NotFound } from '../components/common/NotFound';
import type { DocSection } from '../types';

export function DocPageWrapper() {
  const { '*': slug } = useParams();
  const { locale } = useLocale();
  const { sections, loading: docsLoading } = useDocs(locale);

  // Find the section that matches the current slug
  const findSection = (sectionList: DocSection[], targetSlug: string): DocSection | undefined => {
    for (const section of sectionList) {
      if (section.slug === targetSlug) {
        return section;
      }
      if (section.children) {
        const found = findSection(section.children, targetSlug);
        if (found) return found;
      }
    }
    return undefined;
  };

  const currentSection = slug ? findSection(sections, slug) : undefined;
  const filePath = currentSection?.file?.replace(`.${locale}.md`, '') || `docs/${slug}`;
  const { content, loading: contentLoading, error } = useContent(filePath, locale);

  if (docsLoading || contentLoading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !content) {
    return <NotFound />;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex gap-12">
        {/* Sidebar - hidden on mobile */}
        <aside className="hidden md:block w-64 flex-shrink-0">
          <DocNav sections={sections} />
        </aside>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          <DocPage
            title={currentSection?.title || slug || ''}
            content={content}
          />
        </div>
      </div>
    </div>
  );
}
