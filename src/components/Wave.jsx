import React from "react";
import { preferences } from "../state";
import * as THREE from 'three';

const getRandomFloat = function (min, max) {
  return Math.random() * (max - min) + min;
}

const randSize = () => Math.floor(Math.random() * 3) + 1;
const randOpacity = () => Math.abs(Math.random() - 0.2);
const randPosition = () => [
  getRandomFloat(-100, 100),
  getRandomFloat(-100, 100),
  1
];

export function Wave() {
  return (
    <mesh position={randPosition()} rotation={[0, 0, THREE.Math.degToRad(-90)]}>
      <circleGeometry attach="geometry" args={[randSize(), 6]}/>
      <meshBasicMaterial attach="material" color="#ffffff" transparent opacity={randOpacity()} />
    </mesh>
  );
}
