import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { preferences } from "../state";

const height = 4
const width = 5
const lenOffset = 10
function Border({ start, end, negOffset = false, gate = false }) {
  const ref = useRef()

  useEffect(() => {
    const mesh = ref.current

    const dir = end.clone().sub(start).normalize()
    const xDir = new THREE.Vector3(1, 0, 0)
    mesh.quaternion.setFromUnitVectors(xDir, dir)

    const wOffset = width / 2
    const gateOffset = preferences.gateWidth / 2
    mesh.geometry.translate(gate ? gateOffset : 0, negOffset ? -wOffset : wOffset, 0)
  }, [end, start, negOffset, gate])

  const len = end.distanceTo(start) + lenOffset * (gate ? 1 : 2)

  return (
    <mesh ref={ref} position={start.clone().lerp(end, 0.5)} >
      <boxBufferGeometry attach="geometry" args={[len, width, height]} />
      <meshStandardMaterial attach="material" color="#e1eaed" />
    </mesh>
  );
}

function Point({ position }) {
  return (
    <mesh position={position}>
      <sphereGeometry attach="geometry" args={[preferences.bulletRadius, 32, 32]} />
      <meshLambertMaterial attach="material" color="black" />
    </mesh>
  )
}

export function Field() {
  const p1 = new THREE.Vector3(-preferences.fieldW / 2, preferences.fieldH / 2, 0)
  const p2 = new THREE.Vector3(preferences.fieldW / 2, preferences.fieldH / 2, 0)
  const p3 = new THREE.Vector3(preferences.fieldW / 2, -preferences.fieldH / 2, 0)
  const p4 = new THREE.Vector3(-preferences.fieldW / 2, -preferences.fieldH / 2, 0)

  const gateBot = new THREE.Vector3(-preferences.fieldW / 2, -preferences.gateWidth / 2, 0)
  const gateUp = new THREE.Vector3(-preferences.fieldW / 2, preferences.gateWidth / 2, 0)

  return (
    <>
      {/* <Point position={p1} />
      <Point position={p2} />
      <Point position={p3} />
      <Point position={p4} /> */}

      <Border start={p1} end={p2} />
      <Border start={p2} end={p3} />
      <Border start={p4} end={p3} negOffset />

      <Border start={gateUp} end={p1} gate />
      <Border start={gateBot} end={p4} gate negOffset/>
    </>
  );
}
