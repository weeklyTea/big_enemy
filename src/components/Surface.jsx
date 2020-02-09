import React from "react";
import { preferences } from "../state";

export function Surface () {
  return (
    <mesh position={[0, 0, 0]} receiveShadow={true}>
      <planeGeometry attach="geometry" args={[window.innerWidth, window.innerHeight, 32]} />
      <meshStandardMaterial attach="material" color="#1781a4" />
    </mesh>
  );
}
