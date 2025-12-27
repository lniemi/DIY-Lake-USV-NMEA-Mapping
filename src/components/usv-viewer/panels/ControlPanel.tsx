import { ViewControls } from './ViewControls';
import { ComponentList } from './ComponentList';
import { ExportPanel } from './ExportPanel';
import type { USVConfig } from '../../../types/usv-config';

interface ControlPanelProps {
  showGrid: boolean;
  showAxes: boolean;
  showMeasurements: boolean;
  onToggleGrid: () => void;
  onToggleAxes: () => void;
  onToggleMeasurements: () => void;
  componentVisibility: Record<string, boolean>;
  onToggleComponent: (key: string) => void;
  config: USVConfig;
}

export function ControlPanel({
  showGrid,
  showAxes,
  showMeasurements,
  onToggleGrid,
  onToggleAxes,
  onToggleMeasurements,
  componentVisibility,
  onToggleComponent,
  config,
}: ControlPanelProps) {
  return (
    <>
      <div className="bg-white rounded-lg border border-paper-200 p-4">
        <ViewControls
          showGrid={showGrid}
          showAxes={showAxes}
          showMeasurements={showMeasurements}
          onToggleGrid={onToggleGrid}
          onToggleAxes={onToggleAxes}
          onToggleMeasurements={onToggleMeasurements}
        />
      </div>

      <div className="bg-white rounded-lg border border-paper-200 p-4">
        <ComponentList
          visibility={componentVisibility}
          onToggle={onToggleComponent}
        />
      </div>

      <div className="bg-white rounded-lg border border-paper-200 p-4">
        <ExportPanel config={config} />
      </div>
    </>
  );
}
