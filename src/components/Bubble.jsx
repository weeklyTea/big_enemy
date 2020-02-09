import React, { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "react-three-fiber";

import { state, preferences } from '../state'


const CrossHair = React.memo(function() {
  const { speed, gravity, angle } = preferences.shot
  const len = ((speed * speed) / gravity) * Math.sin(2 * angle)

  const ref = useRef()
  useFrame(() => {
    ref.current.rotation.z += 0.04
  })

  return (
    <mesh position={[len, 0, 0]} rotation={[0, 0, THREE.Math.degToRad(-90)]} ref={ref}>
      <octahedronBufferGeometry attach="geometry" args={[2, 0]} />
      <meshBasicMaterial attach="material" color="#e6f508" transparent={true} opacity="0.8" />
    </mesh>
  )

})

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
      <mesh >
        <sphereGeometry attach="geometry" args={[preferences.bubbleRadius, 32, 32]} />
        <meshLambertMaterial attach="material" color={preferences.bubbleColors[pId - 1]} />
      </mesh>
      <mesh position={[11, 0, 0]} rotation={[0, 0, THREE.Math.degToRad(-90)]}>
        <coneBufferGeometry attach="geometry" args={[2, 4, 15]} />
        <meshBasicMaterial attach="material" color={preferences.bubbleColors[pId - 1]} transparent={true} opacity="0.5" />
      </mesh>
      <CrossHair />
    </group>
  );
}
