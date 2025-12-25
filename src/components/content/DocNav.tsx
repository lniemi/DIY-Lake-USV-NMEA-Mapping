import { NavLink } from 'react-router-dom';
import { useLocale } from '../../hooks/useLocale';
import type { DocSection } from '../../types';

interface DocNavProps {
  sections: DocSection[];
}

export function DocNav({ sections }: DocNavProps) {
  const { locale } = useLocale();
  const docsPath = locale === 'fi' ? 'dokumentaatio' : 'docs';

  const renderSection = (section: DocSection, depth = 0) => {
    const hasChildren = section.children && section.children.length > 0;
    const paddingClass = depth === 0 ? '' : 'pl-4';

    return (
      <li key={section.slug} className={paddingClass}>
        {section.file ? (
          <NavLink
            to={`/${locale}/${docsPath}/${section.slug}`}
            className={({ isActive }) =>
              `block py-1.5 text-sm transition-colors ${
                isActive
                  ? 'text-lake-700 font-medium bg-lake-50 rounded-sm px-2 -mx-2'
                  : 'text-paper-600 hover:text-lake-700'
              }`
            }
          >
            {section.title}
          </NavLink>
        ) : (
          <span className="block py-1.5 text-sm font-semibold text-paper-900">
            {section.title}
          </span>
        )}

        {hasChildren && (
          <ul className="mt-1 border-l-2 border-lake-200 ml-2">
            {section.children!.map(child => renderSection(child, depth + 1))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <nav className="sticky top-20">
      <ul className="space-y-1">
        {sections.map(section => renderSection(section))}
      </ul>
    </nav>
  );
}
