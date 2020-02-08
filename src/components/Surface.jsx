import React from "react";
import { preferences } from "../state";

export function Surface () {
  return (
    <mesh position={[0, 0, -8]}>
      <planeGeometry attach="geometry" args={[preferences.fieldW, preferences.fieldH, 32]} />
      <meshStandardMaterial attach="material" color="#4287f5" />
    </mesh>
  );
}
