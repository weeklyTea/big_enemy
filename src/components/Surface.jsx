import React, { useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";

export function Surface () {
  const ref = useRef();
  return (
    <mesh ref={ref} position={[0, 0, -8]}>
      <planeGeometry attach="geometry" args={[200, 200, 32]} />
      <meshStandardMaterial attach="material" color="#4287f5" />
    </mesh>
  );
}
