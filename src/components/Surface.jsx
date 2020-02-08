import React from "react";
import { preferences } from "../state";

export function Surface () {
  return (
    <mesh position={[0, 0, 0]}>
      <planeGeometry attach="geometry" args={[preferences.fieldW, preferences.fieldH, 32]} />
      <meshStandardMaterial attach="material" color="#1781a4" />
    </mesh>
  );
}
