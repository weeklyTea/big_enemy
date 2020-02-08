import React, { useCallback, useEffect, useRef } from "react";
import * as THREE from "three";
import { Canvas, addEffect, useFrame } from "react-three-fiber";

const maxSpeed = 70 // Meters per second.
const accel = 10
const friction = 0.7 // Decrease in 'friction' times curSpeed each second.
const rotateSpeed = THREE.Math.degToRad(70)
const skiddingC = 0.8 // Should be dependent on player weight

const state = {
  player: {
    moveDir: new THREE.Vector3(0, 1, 0),
    lookDir: new THREE.Vector3(0, 1, 0),
    position: new THREE.Vector3(),
    curSpeed: 0
  },
  keysPressed: {
    left: false,
    right: false,
    up: false,
    down: false
  }
};

const shipLen = 40
const shipWidth = 8

function Ship() {
  const ref = useRef();

  useFrame(() => {
    const mesh = ref.current
    mesh.quaternion.setFromUnitVectors(new THREE.Vector3(1,0,0), state.player.lookDir.clone().normalize())
    mesh.position.copy(state.player.position)
  });

  return (
    <mesh ref={ref}>
      <boxBufferGeometry attach="geometry" args={[shipLen, shipWidth, 2]} />
      <meshStandardMaterial attach="material" color="#4871b8" />
    </mesh>
  );
}

let t1 = performance.now();
function mainCycle(t2) {
  const tDiff = (t2 - t1) / 1000; // Time diff in seconds
  t1 = t2;
  const { right, left, up, } = state.keysPressed;

  let curSpeed = state.player.curSpeed;
  if (right) {
    state.player.lookDir.applyEuler(new THREE.Euler(0, 0, -rotateSpeed * tDiff))
  }
  if (left) {
    state.player.lookDir.applyEuler(new THREE.Euler(0, 0, rotateSpeed * tDiff))
  }

  if (up) {
    if (curSpeed + accel <= maxSpeed) {
      state.player.curSpeed += accel * tDiff;
    }

    const { lookDir, moveDir } = state.player
    if (lookDir.angleTo(moveDir) < 0.05) {
      state.player.moveDir = lookDir
    } else {
      state.player.moveDir.lerp(lookDir, skiddingC * tDiff)
    }
  } else if (!up) {
      const d = state.player.curSpeed * friction * tDiff
      if (state.player.curSpeed - d < 0 || d < 0.01) state.player.curSpeed = 0
      else state.player.curSpeed -= d
  }

  const { position, moveDir } = state.player
  curSpeed = state.player.curSpeed
  state.player.position.setX(position.x + curSpeed * tDiff * moveDir.x)
  state.player.position.setY(position.y + curSpeed * tDiff * moveDir.y)
}

function App() {
  const keyDown = useCallback(e => {
    switch (e.keyCode) {
      case 39:
        state.keysPressed.right = true;
        return;
      case 37:
        state.keysPressed.left = true;
        return;
      case 38:
        state.keysPressed.up = true;
        return;
      case 40:
        state.keysPressed.down = true;
        return;
      default:
        return;
    }
  }, []);

  const keyUp = useCallback(e => {
    switch (e.keyCode) {
      case 39:
        state.keysPressed.right = false;
        return;
      case 37:
        state.keysPressed.left = false;
        return;
      case 38:
        state.keysPressed.up = false;
        return;
      case 40:
        state.keysPressed.down = false;
        return;
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
      <Ship />
    </Canvas>
  );
}

export default App;
