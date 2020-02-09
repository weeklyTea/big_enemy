import React from "react";
import { preferences } from "../state";

export function Border({ width, depth, height, x, y }) {
  return (
    <mesh position={[x, y, 0]}>
      <boxBufferGeometry attach="geometry" args={[width, depth, height]} />
      <meshStandardMaterial attach="material" color="#e1eaed" />
    </mesh>
  );
}
