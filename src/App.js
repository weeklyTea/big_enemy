import React, { useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, addEffect, useFrame } from "react-three-fiber";
import DatGui, { DatNumber } from 'react-dat-gui';


const prefereces = {
  maxSpeed: 70, // Meters per second.
  accel: 10,
  friction: 0.2, // Decrease curSpeed in 'friction' times each second.
  rotateSpeed: THREE.Math.degToRad(70),
  skiddingC: 0.8 // Should be dependent on player weight
}

const state = {
  players: {
    1: {
      moveDir: new THREE.Vector3(0, 1, 0),
      lookDir: new THREE.Vector3(0, 1, 0),
      position: new THREE.Vector3(100, 0, 0),
      curSpeed: 0
    },
    2: {
      moveDir: new THREE.Vector3(0, 1, 0),
      lookDir: new THREE.Vector3(0, 1, 0),
      position: new THREE.Vector3(-100, 0, 0),
      curSpeed: 0
    },
  },
  keysPressed: {
    1: {
      left: false,
      right: false,
      up: false,
      down: false
    },
    2: {
      left: false,
      right: false,
      up: false,
      down: false
    },
  }
};

function Ship({ pId }) {
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
        <sphereGeometry attach="geometry" args={[8, 32, 32]} />
        <meshStandardMaterial attach="material" color="#f54242" />
      </mesh>
      <mesh position={[11, 0, 0]} rotation={[0, 0, THREE.Math.degToRad(-90)]}>
        <coneBufferGeometry attach="geometry" args={[2, 4, 15]} />
        <meshStandardMaterial attach="material" color="#f54242" transparent={true} opacity="0.5" />
      </mesh>
    </group>
  );
}

function Surface () {
  const ref = useRef();
  return (
    <mesh ref={ref} position={[0, 0, -8]}>
      <planeGeometry attach="geometry" args={[200, 200, 32]} />
      <meshStandardMaterial attach="material" color="#4287f5" />
    </mesh>
  );
}

function movePlayer(pId, tDiff) {
  const { right, left, up, } = state.keysPressed[pId];
  const { maxSpeed, accel, friction, rotateSpeed, skiddingC } = prefereces;

  let curSpeed = state.players[pId].curSpeed;
  if (right) {
    state.players[pId].lookDir.applyEuler(new THREE.Euler(0, 0, -rotateSpeed * tDiff))
  }
  if (left) {
    state.players[pId].lookDir.applyEuler(new THREE.Euler(0, 0, rotateSpeed * tDiff))
  }

  if (up) {
    if (curSpeed + accel <= maxSpeed) {
      state.players[pId].curSpeed += accel * tDiff;
    }

    const { lookDir, moveDir } = state.players[pId]
    if (lookDir.angleTo(moveDir) < 0.02) {
      state.players[pId].moveDir.copy(lookDir)
    } else {
      state.players[pId].moveDir.lerp(lookDir, skiddingC * tDiff)
    }
  } else if (!up) {
    const d = state.players[pId].curSpeed * friction * tDiff
    if (state.players[pId].curSpeed - d < 0 || d < 0.01) state.players[pId].curSpeed = 0
    else state.players[pId].curSpeed -= d
  }

  const { position, moveDir } = state.players[pId]
  curSpeed = state.players[pId].curSpeed
  state.players[pId].position.setX(position.x + curSpeed * tDiff * moveDir.x)
  state.players[pId].position.setY(position.y + curSpeed * tDiff * moveDir.y)
}

let t1 = performance.now();
function mainCycle(t2) {
  const tDiff = (t2 - t1) / 1000; // Time diff in seconds
  t1 = t2;

  movePlayer(1, tDiff)
  movePlayer(2, tDiff)
}

function App() {
  const keyDown = useCallback(e => {
    switch (e.keyCode) {
      case 39:
        state.keysPressed[1].right = true;
        return;
      case 37:
        state.keysPressed[1].left = true;
        return;
      case 38:
        state.keysPressed[1].up = true;
        return;
      case 40:
        state.keysPressed[1].down = true;
        return;
      case 68:
        state.keysPressed[2].right = true
        return
      case 65:
        state.keysPressed[2].left = true
        return
      case 87:
        state.keysPressed[2].up = true
        return
      case 83:
        state.keysPressed[2].down = true
        return
      default:
        return;
    }
  }, []);

  const keyUp = useCallback(e => {
    switch (e.keyCode) {
      case 39:
        state.keysPressed[1].right = false;
        return;
      case 37:
        state.keysPressed[1].left = false;
        return;
      case 38:
        state.keysPressed[1].up = false;
        return;
      case 40:
        state.keysPressed[1].down = false;
        return;
      case 68:
        state.keysPressed[2].right = false
        return
      case 65:
        state.keysPressed[2].left = false
        return
      case 87:
        state.keysPressed[2].up = false
        return
      case 83:
        state.keysPressed[2].down = false
        return
      default:
        return;
    }
  }, []);

  const [prefs, updatePrefs] = useState(prefereces);
  
  useEffect(() => {
    console.log(prefs, prefereces);
    for (let prop in prefs)
      prefereces[prop] = prefs[prop];
  }, [prefs]);

  useEffect(() => {
    addEffect(mainCycle);
    window.addEventListener("keyup", keyUp);
    window.addEventListener("keydown", keyDown);
  }, [keyUp, keyDown]);

  return (
    <div>
      <DatGui data={prefs} onUpdate={updatePrefs}>
        <DatNumber path="maxSpeed" label="maxSpeed" min={0} max={400} step={1} />
        <DatNumber path="accel" label="accel" min={0} max={400} step={1} />
        <DatNumber path="friction" label="friction" min={0} max={400} step={0.1} />
        <DatNumber path="rotateSpeed" label="rotateSpeed" min={0} max={360} step={1} />
        <DatNumber path="skiddingC" label="skiddingC" min={0} max={400} step={0.1} />
      </DatGui>
      <Canvas
        style={{ height: "700px" }}
        camera={{ fov: 30, position: [0, 0, 300] }}
        onCreated={({ camera }) => camera.lookAt(0, 0, 0)}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 100, 100]} intensity={1.2} />
        <Surface />
        <Ship pId={1} />
        <Ship pId={2} />
      </Canvas>
    </div>
  );
}

export default App;
