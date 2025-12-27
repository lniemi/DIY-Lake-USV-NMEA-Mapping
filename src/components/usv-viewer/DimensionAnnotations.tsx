import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import type { USVConfig } from '../../types/usv-config';

interface DimensionAnnotationsProps {
  config: USVConfig;
}

// Create a text sprite for dimension labels
function createTextSprite(text: string): THREE.Sprite {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d')!;
  canvas.width = 256;
  canvas.height = 64;

  // Background
  context.fillStyle = 'white';
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.strokeStyle = '#888888';
  context.lineWidth = 2;
  context.strokeRect(0, 0, canvas.width, canvas.height);

  // Text
  context.fillStyle = '#333333';
  context.font = 'bold 24px monospace';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText(text, canvas.width / 2, canvas.height / 2);

  const texture = new THREE.CanvasTexture(canvas);
  const material = new THREE.SpriteMaterial({ map: texture });
  const sprite = new THREE.Sprite(material);
  sprite.scale.set(0.3, 0.075, 1);

  return sprite;
}

function DimensionLabel({ position, text }: { position: [number, number, number]; text: string }) {
  const spriteRef = useRef<THREE.Sprite>(null);
  const { camera } = useThree();

  const sprite = useMemo(() => createTextSprite(text), [text]);

  useFrame(() => {
    if (spriteRef.current) {
      // Always face camera
      spriteRef.current.quaternion.copy(camera.quaternion);
    }
  });

  return <primitive ref={spriteRef} object={sprite} position={position} />;
}

export function DimensionAnnotations({ config }: DimensionAnnotationsProps) {
  const hull = config.components.hull;

  return (
    <group>
      {/* Length annotation */}
      <DimensionLabel
        position={[0, 0.2, hull.length / 2 + 0.15]}
        text={`L: ${hull.length.toFixed(2)}m`}
      />

      {/* Width annotation */}
      {hull.hullSpacing && (
        <DimensionLabel
          position={[(hull.hullSpacing / 2) + 0.15, 0.2, 0]}
          text={`W: ${hull.width.toFixed(2)}m`}
        />
      )}
    </group>
  );
}
