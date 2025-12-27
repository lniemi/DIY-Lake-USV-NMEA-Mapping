import type { BatteryCompartmentConfig, MaterialConfig } from '../../../../types/usv-config';

interface BatteryCompartmentProps {
  config: BatteryCompartmentConfig;
  material: MaterialConfig;
  visible?: boolean;
}

export function BatteryCompartment({ config, material, visible = true }: BatteryCompartmentProps) {
  if (!visible) return null;

  const { length, width, height } = config;

  // Position for small USV (0.65m hull) - on deck, mid-rear
  return (
    <mesh position={[0, 0.05, -0.1]}>
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
