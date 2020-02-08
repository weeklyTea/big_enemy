import React, { useRef, useState } from "react";
import { useFrame } from "react-three-fiber";

import { preferences, state } from '../state'

const color = '#aaaaaa'

export function Bullet({ pId, id }) {
  const [position] = useState(state.bullets[id].position)
  const ref = useRef()
  useFrame(() => {
    const mesh = ref.current
    const { position } = state.bullets[id]
    mesh.position.copy(position)
  })

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry attach="geometry" args={[preferences.bulletRadius, 32, 32]} />
      <meshLambertMaterial attach="material" color={color} />
    </mesh>
  )
}