import React, { useCallback, useEffect, useRef } from "react";
import * as THREE from "three";
import { Canvas, addEffect, useFrame } from "react-three-fiber";

const maxSpeed = 40 // 40 m/sec === 144 km/h
const accel = 10
const friction = 6
const rotateSpeed = THREE.Math.degToRad(30)

const state = {
  ship: {
    angle: Math.PI / 2,
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
    mesh.rotation.z = state.ship.angle
    mesh.position.copy(state.ship.position)
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
  const tDiff = (t2 - t1) / 1000;
  t1 = t2;

  const { right, left, up, down } = state.keysPressed;
  let curSpeed = state.ship.curSpeed;
  const coef = curSpeed / maxSpeed;
  if (right) {
    state.ship.angle -= rotateSpeed * tDiff * coef;
  }
  if (left) {
    state.ship.angle += rotateSpeed * tDiff * coef;
  }

  if (up || down) {
    const a = (up ? accel : -accel) * tDiff;
    if (Math.abs(curSpeed + a) <= maxSpeed) {
      state.ship.curSpeed += a;
    }
  } else if (!up && !down) {
    if (Math.abs(curSpeed) < 0.001) state.ship.curSpeed = 0;
    else {
      const sign = curSpeed < 0 ? -1 : 1;
      state.ship.curSpeed -= friction * sign * tDiff;
    }
  }
  const { position, angle } = state.ship;
  curSpeed = state.ship.curSpeed;
  state.ship.position.setX(position.x + curSpeed * tDiff * Math.cos(angle));
  state.ship.position.setY(position.y + curSpeed * tDiff * Math.sin(angle));
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
