import { useRef, useEffect } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { USVModel } from './models/USVModel';
import { DimensionAnnotations } from './DimensionAnnotations';
import type { USVConfig } from '../../types/usv-config';

interface ViewerCanvasProps {
  config: USVConfig;
  componentVisibility: Record<string, boolean>;
  showGrid: boolean;
  showAxes: boolean;
  showMeasurements: boolean;
}

// Custom OrbitControls component (replaces drei)
function CameraControls() {
  const { camera, gl } = useThree();
  const controlsRef = useRef<OrbitControls | null>(null);

  useEffect(() => {
    const controls = new OrbitControls(camera, gl.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 0.5;
    controls.maxDistance = 10;
    controlsRef.current = controls;

    return () => {
      controls.dispose();
    };
  }, [camera, gl]);

  useFrame(() => {
    controlsRef.current?.update();
  });

  return null;
}

// Custom Grid component (replaces drei Grid)
function Grid({ visible }: { visible: boolean }) {
  if (!visible) return null;

  return (
    <group position={[0, -0.01, 0]}>
      <gridHelper args={[10, 100, '#888888', '#cccccc']} />
    </group>
  );
}

// Custom Axes helper (replaces drei GizmoHelper)
function AxesHelper({ visible }: { visible: boolean }) {
  if (!visible) return null;

  return <axesHelper args={[0.5]} />;
}

// Scene content
function Scene({
  config,
  componentVisibility,
  showGrid,
  showAxes,
  showMeasurements,
}: ViewerCanvasProps) {
  return (
    <>
      {/* Camera controls */}
      <CameraControls />

      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <directionalLight position={[-5, 3, -5]} intensity={0.3} />

      {/* Grid */}
      <Grid visible={showGrid} />

      {/* Axes helper */}
      <AxesHelper visible={showAxes} />

      {/* USV Model */}
      <USVModel config={config} visibility={componentVisibility} />

      {/* Dimension annotations */}
      {showMeasurements && <DimensionAnnotations config={config} />}
    </>
  );
}

export function ViewerCanvas({
  config,
  componentVisibility,
  showGrid,
  showAxes,
  showMeasurements,
}: ViewerCanvasProps) {
  return (
    <div className="w-full h-full bg-paper-50 rounded-lg border border-paper-200 overflow-hidden">
      <Canvas
        camera={{ position: [2, 1.5, 2], fov: 50 }}
        style={{ background: '#FAFAFA' }}
        gl={{ preserveDrawingBuffer: true }}
      >
        <Scene
          config={config}
          componentVisibility={componentVisibility}
          showGrid={showGrid}
          showAxes={showAxes}
          showMeasurements={showMeasurements}
        />
      </Canvas>
    </div>
  );
}
