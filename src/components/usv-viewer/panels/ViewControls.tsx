import { useTranslation } from 'react-i18next';

interface ViewControlsProps {
  showGrid: boolean;
  showAxes: boolean;
  showMeasurements: boolean;
  onToggleGrid: () => void;
  onToggleAxes: () => void;
  onToggleMeasurements: () => void;
}

export function ViewControls({
  showGrid,
  showAxes,
  showMeasurements,
  onToggleGrid,
  onToggleAxes,
  onToggleMeasurements,
}: ViewControlsProps) {
  const { t } = useTranslation();

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-paper-700 mb-3">View</h3>

      <label className="flex items-center gap-2 text-sm text-paper-700 cursor-pointer">
        <input
          type="checkbox"
          checked={showGrid}
          onChange={onToggleGrid}
          className="w-4 h-4"
        />
        {t('viewer.controls.grid')}
      </label>

      <label className="flex items-center gap-2 text-sm text-paper-700 cursor-pointer">
        <input
          type="checkbox"
          checked={showAxes}
          onChange={onToggleAxes}
          className="w-4 h-4"
        />
        {t('viewer.controls.axes')}
      </label>

      <label className="flex items-center gap-2 text-sm text-paper-700 cursor-pointer">
        <input
          type="checkbox"
          checked={showMeasurements}
          onChange={onToggleMeasurements}
          className="w-4 h-4"
        />
        {t('viewer.controls.measurements')}
      </label>
    </div>
  );
}
