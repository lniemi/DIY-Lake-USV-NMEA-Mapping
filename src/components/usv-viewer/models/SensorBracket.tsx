import type { SensorBracketConfig, MaterialConfig } from '../../../types/usv-config';

interface SensorBracketProps {
  config: SensorBracketConfig;
  material: MaterialConfig;
  visible?: boolean;
}

export function SensorBracket({ config, material, visible = true }: SensorBracketProps) {
  if (!visible) return null;

  const { armWidth, depthBelowHull, transducerDiameter } = config;

  return (
    <group>
      {/* Mounting arm */}
      <mesh position={[0, -depthBelowHull / 2, 0.3]}>
        <boxGeometry args={[armWidth, depthBelowHull, armWidth]} />
        <meshStandardMaterial
          color={material.color}
          transparent={material.opacity < 1}
          opacity={material.opacity}
          roughness={material.roughness}
          metalness={material.metalness}
        />
      </mesh>

      {/* Transducer (sensor) */}
      <mesh position={[0, -depthBelowHull, 0.3]}>
        <cylinderGeometry args={[transducerDiameter / 2, transducerDiameter / 2, 0.05, 16]} />
        <meshStandardMaterial color="#1B6B7A" />
      </mesh>
    </group>
  );
}
