import type { SensorBracketConfig, MaterialConfig } from '../../../../types/usv-config';

interface SensorBracketProps {
  config: SensorBracketConfig;
  material: MaterialConfig;
  visible?: boolean;
}

export function SensorBracket({ config, material, visible = true }: SensorBracketProps) {
  if (!visible) return null;

  const { armWidth, depthBelowHull, transducerDiameter } = config;

  // Position for small USV (0.65m hull) - forward of center
  const zPosition = 0.16;

  return (
    <group>
      {/* Mounting arm */}
      <mesh position={[0, -depthBelowHull / 2, zPosition]}>
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
      <mesh position={[0, -depthBelowHull, zPosition]}>
        <cylinderGeometry args={[transducerDiameter / 2, transducerDiameter / 2, 0.03, 16]} />
        <meshStandardMaterial color="#1B6B7A" />
      </mesh>
    </group>
  );
}
