import type { ElectronicsHousingConfig, MaterialConfig } from '../../../../types/usv-config';

interface ElectronicsHousingProps {
  config: ElectronicsHousingConfig;
  material: MaterialConfig;
  visible?: boolean;
}

export function ElectronicsHousing({ config, material, visible = true }: ElectronicsHousingProps) {
  if (!visible) return null;

  const { length, width, height } = config;

  // Position for trimaran - on central deck platform
  return (
    <mesh position={[0, 0.14, 0.08]}>
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
