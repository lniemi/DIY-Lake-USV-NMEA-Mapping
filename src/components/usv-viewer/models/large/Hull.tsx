import type { HullConfig, MaterialConfig } from '../../../../types/usv-config';

interface HullProps {
  config: HullConfig;
  material: MaterialConfig;
  visible?: boolean;
}

export function Hull({ config, material, visible = true }: HullProps) {
  if (!visible) return null;

  const { length, hullDiameter = 0.12, hullSpacing = 0.45, deckThickness } = config;
  const radius = hullDiameter / 2;

  return (
    <group>
      {/* Left hull pontoon */}
      <mesh position={[-hullSpacing / 2, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[radius, radius, length, 16]} />
        <meshStandardMaterial
          color={material.color}
          transparent={material.opacity < 1}
          opacity={material.opacity}
          roughness={material.roughness}
          metalness={material.metalness}
        />
      </mesh>

      {/* Right hull pontoon */}
      <mesh position={[hullSpacing / 2, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[radius, radius, length, 16]} />
        <meshStandardMaterial
          color={material.color}
          transparent={material.opacity < 1}
          opacity={material.opacity}
          roughness={material.roughness}
          metalness={material.metalness}
        />
      </mesh>

      {/* Deck connecting the pontoons */}
      <mesh position={[0, radius + deckThickness / 2, 0]}>
        <boxGeometry args={[hullSpacing, deckThickness, length * 0.8]} />
        <meshStandardMaterial
          color={material.color}
          transparent={material.opacity < 1}
          opacity={material.opacity}
          roughness={material.roughness}
          metalness={material.metalness}
        />
      </mesh>
    </group>
  );
}
