import { useTranslation } from 'react-i18next';
import { USVViewer } from '../components/usv-viewer/USVViewer';

export function USVViewerPage() {
  const { t } = useTranslation();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-paper-900 mb-2">
          {t('viewer.title')}
        </h1>
        <p className="text-paper-600">
          {t('viewer.subtitle')}
        </p>
      </div>
      <USVViewer />
    </div>
  );
}
