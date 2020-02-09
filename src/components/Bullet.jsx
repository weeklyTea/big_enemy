import React, { useRef, useState } from "react";
import { useFrame } from "react-three-fiber";

import { preferences, state } from '../state'

export function Bullet({ pId, id }) {
  const [position] = useState(state.bullets[id].position)
  const ref = useRef()
  useFrame(() => {
    const mesh = ref.current
    const { position } = state.bullets[id]
    mesh.position.copy(position)
  })

  return (
    <mesh ref={ref} position={position} castShadow={true} receiveShadow={false}>
      <sphereGeometry attach="geometry" args={[preferences.bulletRadius, 32, 32]} />
      <meshLambertMaterial attach="material" color={preferences.bulletColors[pId - 1]} />
    </mesh>
  )
}