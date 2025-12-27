import { useTranslation } from 'react-i18next';
import type { USVConfig } from '../../../types/usv-config';

interface ExportPanelProps {
  config: USVConfig;
}

export function ExportPanel({ config }: ExportPanelProps) {
  const { t } = useTranslation();

  const exportSTL = () => {
    // STL export requires traversing the scene - placeholder for now
    alert('STL export: To be implemented');
  };

  const exportGLTF = () => {
    // GLTF export requires traversing the scene - placeholder for now
    alert('GLTF export: To be implemented');
  };

  const exportConfig = () => {
    const json = JSON.stringify(config, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'usv-config.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const exportScreenshot = () => {
    const canvas = document.querySelector('canvas');
    if (!canvas) return;

    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'usv-screenshot.png';
        link.click();
        URL.revokeObjectURL(url);
      }
    });
  };

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-paper-700 mb-3">
        {t('viewer.export.title')}
      </h3>

      <button
        onClick={exportSTL}
        className="w-full px-3 py-2 text-sm bg-paper-100 hover:bg-paper-200 border border-paper-300 rounded transition-colors"
      >
        {t('viewer.export.stl')}
      </button>

      <button
        onClick={exportGLTF}
        className="w-full px-3 py-2 text-sm bg-paper-100 hover:bg-paper-200 border border-paper-300 rounded transition-colors"
      >
        {t('viewer.export.gltf')}
      </button>

      <button
        onClick={exportConfig}
        className="w-full px-3 py-2 text-sm bg-paper-100 hover:bg-paper-200 border border-paper-300 rounded transition-colors"
      >
        {t('viewer.export.config')}
      </button>

      <button
        onClick={exportScreenshot}
        className="w-full px-3 py-2 text-sm bg-paper-100 hover:bg-paper-200 border border-paper-300 rounded transition-colors"
      >
        {t('viewer.export.screenshot')}
      </button>
    </div>
  );
}
