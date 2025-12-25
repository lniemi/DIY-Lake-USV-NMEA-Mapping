import { useTranslation } from 'react-i18next';
import { useLocale } from '../../hooks/useLocale';
import type {
  KnowledgeGraph,
  KnowledgeNodeType,
  EdgeType,
  GraphFilters as GraphFiltersType,
} from '../../types/knowledge-graph';

interface GraphFiltersProps {
  graph: KnowledgeGraph;
  filters: GraphFiltersType;
  onToggleNodeType: (type: KnowledgeNodeType) => void;
  onToggleEdgeType: (type: EdgeType) => void;
  onToggleCategory: (category: string) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
}

export function GraphFilters({
  graph,
  filters,
  onToggleNodeType,
  onToggleEdgeType,
  onToggleCategory,
  onClearFilters,
  hasActiveFilters,
}: GraphFiltersProps) {
  const { t } = useTranslation();
  const { locale } = useLocale();

  const nodeTypes: KnowledgeNodeType[] = ['document', 'concept'];
  const edgeTypes: EdgeType[] = ['references', 'prerequisite', 'covers', 'conceptual'];

  return (
    <div className="bg-white rounded-lg shadow border border-paper-200 p-4 w-64">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-paper-900">{t('graph.filters')}</h3>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="text-xs text-lake-600 hover:text-lake-700"
          >
            {t('graph.clearFilters')}
          </button>
        )}
      </div>

      {/* Node types */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-paper-700 mb-2">
          {t('graph.nodeTypes')}
        </h4>
        <div className="space-y-1">
          {nodeTypes.map((type) => (
            <label key={type} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.nodeTypes.length === 0 || filters.nodeTypes.includes(type)}
                onChange={() => onToggleNodeType(type)}
                className="rounded border-paper-300 text-lake-600 focus:ring-lake-500"
              />
              <span className="text-sm text-paper-600 capitalize">
                {type === 'document' ? t('graph.documents') : t('graph.concepts')}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Edge types */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-paper-700 mb-2">
          {t('graph.edgeTypes')}
        </h4>
        <div className="space-y-1">
          {edgeTypes.map((type) => (
            <label key={type} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.edgeTypes.length === 0 || filters.edgeTypes.includes(type)}
                onChange={() => onToggleEdgeType(type)}
                className="rounded border-paper-300 text-lake-600 focus:ring-lake-500"
              />
              <span className="text-sm text-paper-600">
                {graph.edgeTypes[type]?.labels[locale] || type}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div>
        <h4 className="text-sm font-medium text-paper-700 mb-2">
          {t('graph.categories')}
        </h4>
        <div className="flex flex-wrap gap-1">
          {Object.entries(graph.categories).map(([key, category]) => {
            const isActive = filters.categories.length === 0 || filters.categories.includes(key);
            return (
              <button
                key={key}
                onClick={() => onToggleCategory(key)}
                className={`px-2 py-1 text-xs rounded-full transition-colors ${
                  isActive
                    ? 'text-white'
                    : 'bg-paper-100 text-paper-500'
                }`}
                style={isActive ? { backgroundColor: category.color } : undefined}
              >
                {category.labels[locale] || category.labels.en}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
