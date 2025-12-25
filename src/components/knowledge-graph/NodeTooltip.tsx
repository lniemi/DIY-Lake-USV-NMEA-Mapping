import type { GraphNode } from '../../types/knowledge-graph';
import { useTranslation } from 'react-i18next';

interface NodeTooltipProps {
  node: GraphNode;
  position: { x: number; y: number };
}

export function NodeTooltip({ node, position }: NodeTooltipProps) {
  const { t } = useTranslation();

  // Clamp position to viewport
  const clampedX = Math.min(position.x, window.innerWidth - 280);
  const clampedY = Math.min(position.y, window.innerHeight - 150);

  return (
    <div
      className="fixed z-50 pointer-events-none bg-white rounded-lg shadow-lg border border-paper-200 p-3 max-w-[260px]"
      style={{
        left: clampedX + 15,
        top: clampedY + 15,
      }}
    >
      <div className="flex items-center gap-2 mb-1">
        <span
          className="w-3 h-3 rounded-full flex-shrink-0"
          style={{ backgroundColor: node.color }}
        />
        <span className="font-medium text-paper-900 text-sm truncate">
          {node.label}
        </span>
      </div>
      <div className="text-xs text-paper-500 mb-2 capitalize">
        {node.type === 'document' ? t('graph.document') : t('graph.concept')}
      </div>
      <p className="text-xs text-paper-600 line-clamp-3">
        {node.description}
      </p>
      {node.slug && (
        <div className="mt-2 text-xs text-lake-600">
          {t('graph.clickToOpen')}
        </div>
      )}
    </div>
  );
}
