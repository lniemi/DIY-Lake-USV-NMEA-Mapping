import type { BatteryCompartmentConfig, MaterialConfig } from '../../../../types/usv-config';

interface BatteryCompartmentProps {
  config: BatteryCompartmentConfig;
  material: MaterialConfig;
  visible?: boolean;
}

export function BatteryCompartment({ config, material, visible = true }: BatteryCompartmentProps) {
  if (!visible) return null;

  const { length, width, height } = config;

  // Position for trimaran - on central deck platform, behind electronics
  return (
    <mesh position={[0, 0.12, -0.12]}>
      <boxGeometry args={[width, height, length]} />
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
