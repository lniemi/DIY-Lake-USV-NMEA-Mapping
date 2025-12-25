import { useJsonContent } from './useContent';
import type { BlogIndex, Locale } from '../types';

export function useBlogPosts(locale: Locale) {
  const { data, loading, error } = useJsonContent<BlogIndex>('blog/index', locale);

  return {
    posts: data?.posts ?? [],
    loading,
    error,
  };
}
