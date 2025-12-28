import type { MotorMountConfig, MaterialConfig } from '../../../../types/usv-config';

interface MotorMountProps {
  config: MotorMountConfig;
  material: MaterialConfig;
  visible?: boolean;
}

export function MotorMount({ config, material, visible = true }: MotorMountProps) {
  if (!visible) return null;

  const { width, height, depth } = config;

  // Position for medium USV (0.9m hull) - at stern
  return (
    <mesh position={[0, 0, -0.38]}>
      <boxGeometry args={[width, height, depth]} />
      <meshStandardMaterial
        color={material.color}
        transparent={material.opacity < 1}
        opacity={material.opacity}
        roughness={material.roughness}
        metalness={material.metalness}
      />
    </mesh>
  );
}
