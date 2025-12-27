import type { MotorMountConfig, MaterialConfig } from '../../../../types/usv-config';

interface MotorMountProps {
  config: MotorMountConfig;
  material: MaterialConfig;
  visible?: boolean;
}

export function MotorMount({ config, material, visible = true }: MotorMountProps) {
  if (!visible) return null;

  const { width, height, depth } = config;

  // Position for trimaran (0.9m hull) - mounted at rear of center hull
  return (
    <mesh position={[0, 0.02, -0.4]}>
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
