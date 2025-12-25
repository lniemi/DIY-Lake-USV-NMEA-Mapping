import { useParams } from 'react-router-dom';
import { useLocale } from '../hooks/useLocale';
import { useBlogPosts } from '../hooks/useBlogPosts';
import { useContent } from '../hooks/useContent';
import { BlogPost } from '../components/content/BlogPost';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { NotFound } from '../components/common/NotFound';

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const { locale } = useLocale();
  const { posts, loading: postsLoading } = useBlogPosts(locale);

  // Find the post metadata
  const postMeta = posts.find(p => p.slug === slug);

  // Get the file path without extension and locale - only when postMeta is available
  const filePath = postMeta?.file?.replace(`.${locale}.md`, '') ?? null;
  const { content, loading: contentLoading, error } = useContent(filePath, locale);

  if (postsLoading || contentLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !content) {
    return <NotFound />;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <BlogPost
        title={postMeta?.title || slug || ''}
        date={postMeta?.date || ''}
        content={content}
        tags={postMeta?.tags}
      />
    </div>
  );
}
