import React, { useCallback, useEffect, useRef } from "react";
import * as THREE from "three";
import { Canvas, addEffect, useFrame } from "react-three-fiber";

const maxSpeed = 70 // Meters per second.
const accel = 10
const friction = 0.2 // Decrease in 'friction' times curSpeed each second.
const rotateSpeed = THREE.Math.degToRad(70)
const skiddingC = 0.8 // Should be dependent on player weight

const shipLen = 39
const shipWidth = 8

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
    <mesh ref={ref}>
      <boxBufferGeometry attach="geometry" args={[shipLen, shipWidth, 2]} />
      <meshStandardMaterial attach="material" color="#4871b8" />
    </mesh>
  );
}

function movePlayer(pId, tDiff) {
  const { right, left, up, } = state.keysPressed[pId];

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

  useEffect(() => {
    addEffect(mainCycle);
    window.addEventListener("keyup", keyUp);
    window.addEventListener("keydown", keyDown);
  }, [keyUp, keyDown]);

  return (
    <Canvas
      style={{ height: "700px" }}
      camera={{ fov: 75, position: [0, 0, 300] }}
    >
      <ambientLight intensity={0.1} />
      <pointLight position={[100, 100, 100]} intensity={2.2} />
      <Ship pId={1}/>
      <Ship pId={2}/>
    </Canvas>
  );
}

export default App;
