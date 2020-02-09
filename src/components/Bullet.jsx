import React, { useRef, useState } from "react";
import { useFrame } from "react-three-fiber";

import { preferences, state } from '../state'

export function Bullet({ pId, id }) {
  const [position] = useState(state.bullets[id].position)
  const ref = useRef()

  const curRadius = useRef(state.bullets[id].radius)
  const [radius, setRadius] = useState(state.bullets[id].radius)

  useFrame(() => {
    const mesh = ref.current
    const { position } = state.bullets[id]
    mesh.position.copy(position)

    if (state.bullets[id].radius !== curRadius.current) {
      curRadius.current = state.players[pId].balls
      setRadius(curRadius.current)
    }
  })

  return (
    <mesh ref={ref} position={position} castShadow={true} receiveShadow={false}>
      <sphereGeometry attach="geometry" args={[radius, 32, 32]} />
      <meshLambertMaterial attach="material" color={preferences.bulletColors[pId - 1]} />
    </mesh>
  )
}