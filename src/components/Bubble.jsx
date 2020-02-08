import React, { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "react-three-fiber";

import { state, preferences } from '../state'

export function Bubble({ pId }) {
  const ref = useRef()

  useFrame(() => {
    const mesh = ref.current
    const { lookDir, position } = state.players[pId]
    mesh.quaternion.setFromUnitVectors(new THREE.Vector3(1, 0, 0), lookDir.clone().normalize())
    mesh.position.copy(position)
  })

  return (
    <group ref={ref}>
      <mesh>
        <sphereGeometry attach="geometry" args={[preferences.bubbleRadius, 32, 32]} />
        <meshStandardMaterial attach="material" color="#f54242" />
      </mesh>
      <mesh position={[11, 0, 0]} rotation={[0, 0, THREE.Math.degToRad(-90)]}>
        <coneBufferGeometry attach="geometry" args={[2, 4, 15]} />
        <meshStandardMaterial attach="material" color="#f54242" transparent={true} opacity="0.5" />
      </mesh>
    </group>
  );
}
