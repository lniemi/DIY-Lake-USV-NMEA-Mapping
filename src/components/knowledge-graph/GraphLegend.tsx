import { useTranslation } from 'react-i18next';
import { useLocale } from '../../hooks/useLocale';
import type { KnowledgeGraph } from '../../types/knowledge-graph';

interface GraphLegendProps {
  graph: KnowledgeGraph;
}

export function GraphLegend({ graph }: GraphLegendProps) {
  const { t } = useTranslation();
  const { locale } = useLocale();

  return (
    <div className="bg-white rounded-lg shadow border border-paper-200 p-3">
      <h4 className="text-xs font-medium text-paper-700 mb-2">{t('graph.legend')}</h4>

      {/* Node types */}
      <div className="mb-3">
        <div className="text-xs text-paper-500 mb-1">{t('graph.nodeTypes')}</div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <span className="w-4 h-4 rounded-full border-2 border-paper-400 bg-paper-200" />
            <span className="text-xs text-paper-600">{t('graph.documents')}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-paper-400" />
            <span className="text-xs text-paper-600">{t('graph.concepts')}</span>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="mb-3">
        <div className="text-xs text-paper-500 mb-1">{t('graph.categories')}</div>
        <div className="flex flex-wrap gap-2">
          {Object.entries(graph.categories).map(([key, category]) => (
            <div key={key} className="flex items-center gap-1">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: category.color }}
              />
              <span className="text-xs text-paper-600">
                {category.labels[locale] || category.labels.en}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Edge types */}
      <div>
        <div className="text-xs text-paper-500 mb-1">{t('graph.edgeTypes')}</div>
        <div className="flex flex-wrap gap-3">
          {Object.entries(graph.edgeTypes).map(([key, edgeType]) => (
            <div key={key} className="flex items-center gap-1">
              <svg width="20" height="10" className="text-paper-400">
                <line
                  x1="0"
                  y1="5"
                  x2="20"
                  y2="5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray={
                    edgeType.style === 'dashed'
                      ? '4,2'
                      : edgeType.style === 'dotted'
                      ? '2,2'
                      : undefined
                  }
                />
              </svg>
              <span className="text-xs text-paper-600">
                {edgeType.labels[locale] || edgeType.labels.en}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
