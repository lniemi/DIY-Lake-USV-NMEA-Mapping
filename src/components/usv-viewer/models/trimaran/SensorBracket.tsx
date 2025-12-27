import type { SensorBracketConfig, MaterialConfig } from '../../../../types/usv-config';

interface SensorBracketProps {
  config: SensorBracketConfig;
  material: MaterialConfig;
  visible?: boolean;
}

export function SensorBracket({ config, material, visible = true }: SensorBracketProps) {
  if (!visible) return null;

  const { armWidth, depthBelowHull, transducerDiameter } = config;

  // Position for trimaran - centered under main hull, forward position
  return (
    <group>
      {/* Mounting arm */}
      <mesh position={[0, -depthBelowHull / 2, 0.2]}>
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
      <mesh position={[0, -depthBelowHull, 0.2]}>
        <cylinderGeometry args={[transducerDiameter / 2, transducerDiameter / 2, 0.05, 16]} />
        <meshStandardMaterial color="#1B6B7A" />
      </mesh>
    </group>
  );
}
