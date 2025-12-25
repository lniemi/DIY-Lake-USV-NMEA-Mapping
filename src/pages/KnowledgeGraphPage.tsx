import { useTranslation } from 'react-i18next';
import { KnowledgeGraph } from '../components/knowledge-graph';

export function KnowledgeGraphPage() {
  const { t } = useTranslation();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-paper-900 mb-2">
          {t('graph.title')}
        </h1>
        <p className="text-paper-600">
          {t('graph.subtitle')}
        </p>
      </div>
      <KnowledgeGraph />
    </div>
  );
}
