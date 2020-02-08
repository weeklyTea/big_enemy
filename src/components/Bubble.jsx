import React, { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "react-three-fiber";

import { state, preferences } from '../state'

const colors = [ '#DB4A4A', '#54915F' ];

export function Bubble({ pId }) {
  const ref = useRef()

  useFrame(() => {
    const mesh = ref.current
    const { lookDir, position, scale } = state.players[pId]
    mesh.quaternion.setFromUnitVectors(new THREE.Vector3(1, 0, 0), lookDir.clone().normalize())
    mesh.position.copy(position)
    if (scale !== 1) {
      mesh.scale.multiplyScalar(scale)
      state.players[pId].scale = 1
    }
  })

  return (
    <group ref={ref}>
      <mesh>
        <sphereGeometry attach="geometry" args={[preferences.bubbleRadius, 32, 32]} />
        <meshLambertMaterial attach="material" color={colors[pId - 1]} />
      </mesh>
      <mesh position={[11, 0, 0]} rotation={[0, 0, THREE.Math.degToRad(-90)]}>
        <coneBufferGeometry attach="geometry" args={[2, 4, 15]} />
        <meshBasicMaterial attach="material" color={colors[pId - 1]} transparent={true} opacity="0.5" />
      </mesh>
    </group>
  );
}
