import { useTranslation } from 'react-i18next';

interface GraphControlsProps {
  showLabels: boolean;
  onToggleLabels: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetView: () => void;
}

export function GraphControls({
  showLabels,
  onToggleLabels,
  onZoomIn,
  onZoomOut,
  onResetView,
}: GraphControlsProps) {
  const { t } = useTranslation();

  return (
    <div className="flex items-center gap-1 bg-white rounded-lg shadow border border-paper-200 p-1">
      {/* Zoom in */}
      <button
        onClick={onZoomIn}
        className="p-2 rounded hover:bg-paper-100 transition-colors"
        title={t('graph.zoomIn')}
        aria-label={t('graph.zoomIn')}
      >
        <svg className="w-5 h-5 text-paper-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
        </svg>
      </button>

      {/* Zoom out */}
      <button
        onClick={onZoomOut}
        className="p-2 rounded hover:bg-paper-100 transition-colors"
        title={t('graph.zoomOut')}
        aria-label={t('graph.zoomOut')}
      >
        <svg className="w-5 h-5 text-paper-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
        </svg>
      </button>

      {/* Reset view */}
      <button
        onClick={onResetView}
        className="p-2 rounded hover:bg-paper-100 transition-colors"
        title={t('graph.resetView')}
        aria-label={t('graph.resetView')}
      >
        <svg className="w-5 h-5 text-paper-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
        </svg>
      </button>

      <div className="w-px h-6 bg-paper-200 mx-1" />

      {/* Toggle labels */}
      <button
        onClick={onToggleLabels}
        className={`p-2 rounded transition-colors ${
          showLabels ? 'bg-lake-100 text-lake-700' : 'hover:bg-paper-100 text-paper-600'
        }`}
        title={t('graph.toggleLabels')}
        aria-label={t('graph.toggleLabels')}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
        </svg>
      </button>
    </div>
  );
}
