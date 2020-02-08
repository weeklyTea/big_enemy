import React from "react";
import { preferences } from "../state";

export function Hole() {
  return (
    <mesh position={[0, 0, 1]}>
      <circleGeometry attach="geometry" args={[5, 32]} />
      <meshBasicMaterial attach="material" color="#d2f0fa" />
    </mesh>
  );
}
