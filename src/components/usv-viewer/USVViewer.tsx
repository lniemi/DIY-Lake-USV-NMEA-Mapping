import { useState } from 'react';
import { useUSVConfig } from '../../hooks/useUSVConfig';
import { ViewerCanvas } from './ViewerCanvas';
import { ControlPanel } from './panels/ControlPanel';

export function USVViewer() {
  const { config, loading, error } = useUSVConfig('default');
  const [componentVisibility, setComponentVisibility] = useState<Record<string, boolean>>({
    hull: true,
    motorMount: true,
    sensorBracket: true,
    electronics: true,
    battery: true,
  });
  const [showGrid, setShowGrid] = useState(true);
  const [showAxes, setShowAxes] = useState(true);
  const [showMeasurements, setShowMeasurements] = useState(false);

  if (loading) {
    return (
      <div className="h-[calc(100vh-200px)] min-h-[500px] flex items-center justify-center">
        <div className="text-paper-600">Loading viewer...</div>
      </div>
    );
  }

  if (error || !config) {
    return (
      <div className="h-[calc(100vh-200px)] min-h-[500px] flex items-center justify-center">
        <div className="text-red-600">Error loading configuration</div>
      </div>
    );
  }

  return (
    <div className="relative h-[calc(100vh-200px)] min-h-[500px] flex gap-4">
      {/* Control panels */}
      <div className="w-64 space-y-4 flex-shrink-0">
        <ControlPanel
          showGrid={showGrid}
          showAxes={showAxes}
          showMeasurements={showMeasurements}
          onToggleGrid={() => setShowGrid(!showGrid)}
          onToggleAxes={() => setShowAxes(!showAxes)}
          onToggleMeasurements={() => setShowMeasurements(!showMeasurements)}
          componentVisibility={componentVisibility}
          onToggleComponent={(key) =>
            setComponentVisibility(prev => ({ ...prev, [key]: !prev[key] }))
          }
          config={config}
        />
      </div>

      {/* 3D Canvas */}
      <div className="flex-1">
        <ViewerCanvas
          config={config}
          componentVisibility={componentVisibility}
          showGrid={showGrid}
          showAxes={showAxes}
          showMeasurements={showMeasurements}
        />
      </div>
    </div>
  );
}
