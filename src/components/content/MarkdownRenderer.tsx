import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  // Remove frontmatter if present
  const cleanContent = content.replace(/^---[\s\S]*?---\n/, '');

  return (
    <div className="prose prose-slate max-w-none prose-headings:scroll-mt-20 prose-headings:text-paper-900 prose-p:text-paper-700 prose-a:text-lake-700 prose-a:underline-offset-2 prose-strong:text-paper-900 prose-img:rounded-md prose-img:shadow-md prose-blockquote:border-lake-400 prose-blockquote:bg-lake-50/50 prose-blockquote:rounded-r-md prose-code:bg-lake-50 prose-code:text-lake-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-sm prose-code:before:content-none prose-code:after:content-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            const isInline = !match;

            if (isInline) {
              return (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            }

            return (
              <SyntaxHighlighter
                style={oneDark}
                language={match[1]}
                PreTag="div"
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            );
          },
          img({ src, alt }) {
            // Handle relative image paths
            const imageSrc = src?.startsWith('/')
              ? `${import.meta.env.BASE_URL}${src.slice(1)}`
              : src;
            return <img src={imageSrc} alt={alt || ''} loading="lazy" />;
          },
        }}
      >
        {cleanContent}
      </ReactMarkdown>
    </div>
  );
}
