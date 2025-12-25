import { useJsonContent } from './useContent';
import type { DocsIndex, Locale } from '../types';

export function useDocs(locale: Locale) {
  const { data, loading, error } = useJsonContent<DocsIndex>('docs/index', locale);

  return {
    sections: data?.sections ?? [],
    loading,
    error,
  };
}
