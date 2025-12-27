import type { HullConfig, MaterialConfig } from '../../../../types/usv-config';

interface HullProps {
  config: HullConfig;
  material: MaterialConfig;
  visible?: boolean;
}

export function Hull({ config, material, visible = true }: HullProps) {
  if (!visible) return null;

  const {
    length,
    hullDiameter = 0.08,
    centerHullDiameter = 0.12,
    hullSpacing = 0.35,
    deckThickness
  } = config;

  const outerRadius = hullDiameter / 2;
  const centerRadius = centerHullDiameter / 2;

  return (
    <group>
      {/* Left outrigger hull (ama) */}
      <mesh position={[-hullSpacing / 2, -0.02, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[outerRadius, outerRadius * 0.7, length * 0.85, 16]} />
        <meshStandardMaterial
          color={material.color}
          transparent={material.opacity < 1}
          opacity={material.opacity}
          roughness={material.roughness}
          metalness={material.metalness}
        />
      </mesh>

      {/* Right outrigger hull (ama) */}
      <mesh position={[hullSpacing / 2, -0.02, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[outerRadius, outerRadius * 0.7, length * 0.85, 16]} />
        <meshStandardMaterial
          color={material.color}
          transparent={material.opacity < 1}
          opacity={material.opacity}
          roughness={material.roughness}
          metalness={material.metalness}
        />
      </mesh>

      {/* Center main hull (vaka) - larger */}
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[centerRadius, centerRadius * 0.8, length, 16]} />
        <meshStandardMaterial
          color={material.color}
          transparent={material.opacity < 1}
          opacity={material.opacity}
          roughness={material.roughness}
          metalness={material.metalness}
        />
      </mesh>

      {/* Front cross beam (aka) */}
      <mesh position={[0, centerRadius + deckThickness / 2, length * 0.25]}>
        <boxGeometry args={[hullSpacing, deckThickness, 0.04]} />
        <meshStandardMaterial
          color={material.color}
          transparent={material.opacity < 1}
          opacity={material.opacity * 0.9}
          roughness={material.roughness}
          metalness={material.metalness}
        />
      </mesh>

      {/* Rear cross beam (aka) */}
      <mesh position={[0, centerRadius + deckThickness / 2, -length * 0.25]}>
        <boxGeometry args={[hullSpacing, deckThickness, 0.04]} />
        <meshStandardMaterial
          color={material.color}
          transparent={material.opacity < 1}
          opacity={material.opacity * 0.9}
          roughness={material.roughness}
          metalness={material.metalness}
        />
      </mesh>

      {/* Central deck platform */}
      <mesh position={[0, centerRadius + deckThickness, 0]}>
        <boxGeometry args={[hullSpacing * 0.6, deckThickness, length * 0.5]} />
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
