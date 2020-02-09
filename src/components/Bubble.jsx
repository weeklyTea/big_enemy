import React, { useRef, useState } from "react";
import * as THREE from "three";
import { useFrame } from "react-three-fiber";

import { state, preferences } from '../state'
import { getBubbleRadius } from "../utils";


const CrossHair = React.memo(function({color}) {
  const { speed, gravity, angle } = preferences.shot
  const len = ((speed * speed) / gravity) * Math.sin(2 * angle)

  const ref = useRef()
  useFrame(() => {
    ref.current.rotation.z += 0.04
  })

  return (
    <mesh position={[len, 0, 1]} rotation={[0, 0, THREE.Math.degToRad(-90)]} ref={ref}>
      <octahedronBufferGeometry attach="geometry" args={[2, 0]} />
      <meshBasicMaterial attach="material" color={color} transparent={true} opacity="0.8" wireframe={true}/>
    </mesh>
  )

})

export function Bubble({ pId }) {
  const ref = useRef()
  const curBalls = useRef(state.players[pId].balls)
  const [radius, setRadius] = useState(getBubbleRadius(curBalls.current))

  const { bubbleColors, crossHairColors } = preferences;

  useFrame(() => {
    const mesh = ref.current
    const { lookDir, position } = state.players[pId]
    mesh.quaternion.setFromUnitVectors(new THREE.Vector3(1, 0, 0), lookDir.clone().normalize())
    mesh.position.copy(position)
    if (state.players[pId].balls !== curBalls.current) {
      curBalls.current = state.players[pId].balls
      const newR = getBubbleRadius(curBalls.current)
      setRadius(newR)
    }
  })

  return (
    <group ref={ref}>
      <mesh receiveShadow={true}>
        <sphereGeometry attach="geometry" args={[radius, 32, 32]} />
        <meshLambertMaterial attach="material" color={bubbleColors[pId - 1]} />
      </mesh>
      <mesh position={[radius + 3, 0, 0]} rotation={[0, 0, THREE.Math.degToRad(-90)]}>
        <coneBufferGeometry attach="geometry" args={[2, 4, 15]} />
        <meshBasicMaterial attach="material" color={bubbleColors[pId - 1]} transparent={true} opacity="0.5" />
      </mesh>
      <CrossHair color={crossHairColors[pId - 1]} />
    </group>
  );
}
