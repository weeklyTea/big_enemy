import * as THREE from "three";

import { state, prefereces } from './state'

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
export function mainCycle(t2) {
  const tDiff = (t2 - t1) / 1000; // Time diff in seconds
  t1 = t2;

  movePlayer(1, tDiff)
  movePlayer(2, tDiff)
}
