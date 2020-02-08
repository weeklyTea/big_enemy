import * as THREE from "three";

import { state, preferences } from './state'

function movePlayer(pId, tDiff) {
  const { right, left, up, } = state.keysPressed[pId];
  const { maxSpeed, accel, friction, rotateSpeed, skiddingC } = preferences;

  let curSpeed = state.players[pId].curSpeed;
  if (right) {
    state.players[pId].lookDir.applyEuler(new THREE.Euler(0, 0, -rotateSpeed * tDiff))
  }
  if (left) {
    state.players[pId].lookDir.applyEuler(new THREE.Euler(0, 0, rotateSpeed * tDiff))
  }

  if (up) {
    const { lookDir, moveDir } = state.players[pId]
    if (curSpeed + accel <= maxSpeed) {
      state.players[pId].curSpeed += accel * tDiff;
    }

    if (lookDir.angleTo(moveDir) < 0.02) {
      state.players[pId].moveDir.copy(lookDir)
    } else {
      let alfa = curSpeed < 10 ? 1 : skiddingC * tDiff
      state.players[pId].moveDir.lerp(lookDir, alfa)
    }
  } else if (!up) {
    const d = state.players[pId].curSpeed * friction * tDiff
    if (state.players[pId].curSpeed - d < 0 || d < 0.01) state.players[pId].curSpeed = 0
    else state.players[pId].curSpeed -= d
  }

  const { position, moveDir, curRadius } = state.players[pId]
  curSpeed = state.players[pId].curSpeed

  const rightBorder = preferences.fieldW / 2
  const leftBorder = -rightBorder
  const upBorder = preferences.fieldH / 2
  const bottBorder = - upBorder

  const newX = position.x + curSpeed * tDiff * moveDir.x
  if (newX + curRadius < rightBorder && newX - curRadius > leftBorder) {
    state.players[pId].position.setX(newX)
  }
  const newY = position.y + curSpeed * tDiff * moveDir.y
  if (newY + curRadius < upBorder && newY - curRadius > bottBorder) {
    state.players[pId].position.setY(newY)
  }

}

let t1 = performance.now();
export function mainCycle(t2) {
  const tDiff = (t2 - t1) / 1000; // Time diff in seconds
  t1 = t2;

  movePlayer(1, tDiff)
  movePlayer(2, tDiff)
}
