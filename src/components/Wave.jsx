import React, { useState } from "react";
import { preferences } from "../state";
import * as THREE from 'three';
import { useFrame } from "react-three-fiber";


const getRandomFloat = function (min, max) {
  return Math.random() * (max - min) + min;
}

const randSize = () => Math.floor(Math.random() * 3) + 1;
const randOpacity = () => Math.abs(Math.random() - 0.2);
const randPosition = () => [
  getRandomFloat(-100, 100),
  getRandomFloat(-100, 100),
  0.1
];

export function Wave() {
  const [rands, setRands] = useState({ position: randPosition(), size: randSize() });
  const [opacity, setOpacity] = useState(randOpacity());
  const [initOpacity] = useState(opacity);
  const [nextOpacity, setNextOpacity] = useState(0);
  const [toZero, switchOpacityDir] = useState(true);

  useFrame((state, delta) => {
    let step = 1 / (5 / delta);

    if (toZero && nextOpacity < 0) {
      setOpacity(0);
      setRands({ ...rands, position: randPosition() });
      switchOpacityDir(0);
      setNextOpacity(nextOpacity + step);
    } else if (!toZero && nextOpacity > initOpacity) {
      setOpacity(initOpacity);
      switchOpacityDir(1);
      setNextOpacity(nextOpacity - step);
    } else {
      setOpacity(nextOpacity);
      setNextOpacity(nextOpacity + (toZero ? -step : step));
    }
  });

  return (
    <mesh position={rands.position} rotation={[0, 0, THREE.Math.degToRad(-90)]}>
      <circleGeometry attach="geometry" args={[rands.size, 6]}/>
      <meshBasicMaterial attach="material" color="#ffffff" transparent opacity={opacity} />
    </mesh>
  );
}
