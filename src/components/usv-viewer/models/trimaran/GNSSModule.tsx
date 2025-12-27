import type { GNSSModuleConfig, MaterialConfig } from '../../../../types/usv-config';

interface GNSSModuleProps {
  config: GNSSModuleConfig;
  material: MaterialConfig;
  visible?: boolean;
}

export function GNSSModule({ config, material, visible = true }: GNSSModuleProps) {
  if (!visible) return null;

  const { baseWidth, baseHeight, antennaDiameter, antennaHeight } = config;

  // Position for trimaran (0.9m hull) - forward on deck
  const zPosition = 0.22;
  const yBase = 0.08;

  return (
    <group position={[0, yBase, zPosition]}>
      {/* Mounting base */}
      <mesh position={[0, baseHeight / 2, 0]}>
        <boxGeometry args={[baseWidth, baseHeight, baseWidth]} />
        <meshStandardMaterial
          color={material.color}
          transparent={material.opacity < 1}
          opacity={material.opacity}
          roughness={material.roughness}
          metalness={material.metalness}
        />
      </mesh>

      {/* GNSS antenna puck/dome */}
      <mesh position={[0, baseHeight + antennaHeight / 2, 0]}>
        <cylinderGeometry args={[antennaDiameter / 2, antennaDiameter / 2, antennaHeight, 16]} />
        <meshStandardMaterial
          color="#2D3748"
          roughness={0.3}
          metalness={0.5}
        />
      </mesh>

      {/* Antenna dome top */}
      <mesh position={[0, baseHeight + antennaHeight, 0]}>
        <sphereGeometry args={[antennaDiameter / 2.5, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial
          color="#1A202C"
          roughness={0.2}
          metalness={0.6}
        />
      </mesh>
    </group>
  );
}
