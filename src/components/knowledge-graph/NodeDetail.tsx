import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLocale } from '../../hooks/useLocale';
import type { GraphNode, GraphLink } from '../../types/knowledge-graph';

interface NodeDetailProps {
  node: GraphNode;
  links: GraphLink[];
  allNodes: GraphNode[];
  onClose: () => void;
  onNodeSelect: (node: GraphNode) => void;
}

export function NodeDetail({
  node,
  links,
  allNodes,
  onClose,
  onNodeSelect,
}: NodeDetailProps) {
  const { t } = useTranslation();
  const { locale } = useLocale();
  const docsPath = locale === 'fi' ? 'dokumentaatio' : 'docs';

  // Find connected nodes
  const connectedLinks = links.filter((link) => {
    const sourceId = typeof link.source === 'string' ? link.source : link.source.id;
    const targetId = typeof link.target === 'string' ? link.target : link.target.id;
    return sourceId === node.id || targetId === node.id;
  });

  const connectedNodes = connectedLinks
    .map((link) => {
      const sourceId = typeof link.source === 'string' ? link.source : link.source.id;
      const targetId = typeof link.target === 'string' ? link.target : link.target.id;
      const connectedId = sourceId === node.id ? targetId : sourceId;
      const connectedNode = allNodes.find((n) => n.id === connectedId);
      if (!connectedNode) return null;
      return {
        node: connectedNode,
        relationship: link.label,
        direction: sourceId === node.id ? 'outgoing' : 'incoming',
      };
    })
    .filter(Boolean) as {
      node: GraphNode;
      relationship: string;
      direction: 'outgoing' | 'incoming';
    }[];

  return (
    <div className="bg-white rounded-lg shadow-lg border border-paper-200 p-4 w-80 max-h-[calc(100vh-200px)] overflow-y-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span
            className="w-4 h-4 rounded-full flex-shrink-0"
            style={{ backgroundColor: node.color }}
          />
          <h3 className="font-semibold text-paper-900">{node.label}</h3>
        </div>
        <button
          onClick={onClose}
          className="text-paper-400 hover:text-paper-600 p-1"
          aria-label={t('graph.close')}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Type badge */}
      <div className="mb-3">
        <span className="inline-block px-2 py-0.5 text-xs font-medium rounded-full bg-paper-100 text-paper-600 capitalize">
          {node.type === 'document' ? t('graph.document') : t('graph.concept')}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-paper-600 mb-4">{node.description}</p>

      {/* Navigate to doc button */}
      {node.slug && (
        <Link
          to={`/${locale}/${docsPath}/${node.slug}`}
          className="btn-primary w-full text-center mb-4 block"
        >
          {t('graph.openDoc')}
        </Link>
      )}

      {/* Connected nodes */}
      {connectedNodes.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-paper-900 mb-2">
            {t('graph.connectedNodes')} ({connectedNodes.length})
          </h4>
          <ul className="space-y-2">
            {connectedNodes.map(({ node: connectedNode, relationship, direction }) => (
              <li key={connectedNode.id}>
                <button
                  onClick={() => onNodeSelect(connectedNode)}
                  className="w-full text-left p-2 rounded hover:bg-paper-50 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: connectedNode.color }}
                    />
                    <span className="text-sm text-paper-800 truncate">
                      {connectedNode.label}
                    </span>
                  </div>
                  <div className="text-xs text-paper-500 ml-4 mt-0.5">
                    {direction === 'outgoing' ? '→' : '←'} {relationship}
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
