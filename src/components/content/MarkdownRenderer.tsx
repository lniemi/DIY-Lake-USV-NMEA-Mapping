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
    <div className="prose prose-slate max-w-none prose-headings:scroll-mt-20 prose-a:text-blue-600 prose-img:rounded-lg">
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
