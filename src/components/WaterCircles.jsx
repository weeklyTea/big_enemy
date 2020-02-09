import React, { useState } from "react";
import { state } from "../state";
import { useFrame } from "react-three-fiber";

export function WaterCircles({ bullet }) {
  const [ c1NextState, setC1NextState ] = useState({ opacity: 0.6, r1: bullet.radius, r2: bullet.radius + 0.8 });
  const [ c2NextState, setC2NextState ] = useState({ opacity: 0.6, r1: bullet.radius, r2: bullet.radius + 0.8 });
  const [ visible, setVisibility ] = useState(false);
  const [ position, setPosition ] = useState(null);

  useFrame((st, delta) => {
    if (bullet.position.z > -10)
      return;

    if (!position)
      setPosition({ x: bullet.position.x, y: bullet.position.y });

    setVisibility(true);
      
    if (delta <= 0 || c2NextState.opacity <= 0)
      return;

    let c1step = 1 / (0.6 / delta),
        c2step = 1 / (0.6 / delta),
        { opacity: c1Opacity, r1: c1R1, r2: c1R2 } = c1NextState,
        { opacity: c2Opacity, r1: c2R1, r2: c2R2 } = c2NextState;

    setC1NextState({ opacity: c1Opacity - c1step, r1: c1R1 + c1step + 0.2, r2: c1R2 + c1step + 0.2 });
    if (c1NextState.opacity < 0.3)
      setC2NextState({ opacity: c2Opacity - c2step, r1: c2R1 + c2step, r2: c2R2 + c2step });
  });

  return (
    visible ?
      <group position={[position.x, position.y, 0.1]}>
        <mesh>
          <ringGeometry attach="geometry" args={[ c1NextState.r1, c1NextState.r2, 24, 1 ]} />
          <meshBasicMaterial attach="material" color="#ffffff" opacity={c1NextState.opacity} transparent/>
        </mesh>
        <mesh>
          <ringGeometry attach="geometry" args={[ c2NextState.r1, c2NextState.r2, 24, 1 ]} />
          <meshBasicMaterial attach="material" color="#ffffff" opacity={c2NextState.opacity} transparent/>
        </mesh>
      </group>
      :
      null
  );
}
