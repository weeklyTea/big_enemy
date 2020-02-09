import * as THREE from "three";

import { state, preferences, resetState as resetPlayers } from './state'
import { getBubbleRadius } from "./utils";
import uuid from 'uuid/v1';

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

  const { position, moveDir, balls } = state.players[pId]
  const radius = getBubbleRadius(balls)
  curSpeed = state.players[pId].curSpeed

  const rightBorder = preferences.fieldW / 2
  const leftBorder = -rightBorder
  const upBorder = preferences.fieldH / 2
  const bottBorder = - upBorder

  const newX = position.x + curSpeed * tDiff * moveDir.x
  if (newX + radius < rightBorder && newX - radius > leftBorder) {
    state.players[pId].position.setX(newX)
  } else if (
    // radius === preferences.minBubbleRadius && 
    state.players[pId].position.y + radius < preferences.gateWidth / 2 &&
    state.players[pId].position.y - radius > -preferences.gateWidth / 2 ) {
      // If radius is small enough allow to move through the gate
      state.players[pId].position.setX(newX)
  } else {
    state.players[pId].moveDir.x *= -1
    state.players[pId].curSpeed *= preferences.bounceK
  }

  const newY = position.y + curSpeed * tDiff * moveDir.y
  if (newY + radius < upBorder && newY - radius > bottBorder) {
    state.players[pId].position.setY(newY)
  } else {
    state.players[pId].moveDir.y = -state.players[pId].moveDir.y
    state.players[pId].curSpeed *= preferences.bounceK
  }

  // Check if player win.
  const winMaxDepth = 40
  const winMinDepth = 2
  const winZone = new THREE.Box2(
    new THREE.Vector2(-preferences.fieldW / 2 - winMaxDepth, -30),
    new THREE.Vector2(-preferences.fieldW / 2 - winMinDepth, 30),
    )
  const newPos3 = state.players[pId].position
  const pos2 = new THREE.Vector2(newPos3.x, newPos3.y)
  if (winZone.containsPoint(pos2)) {
    console.log(`Player ${pId} win!`)
    resetPlayers()
  }
}

function moveBullet(id, curTime) {
  const { speed, angle, gravity } = preferences.shot

  const { startTime, startPos, dir } = state.bullets[id]
  const shotTDiff = (curTime - startTime) / 1000 // Time diff between shot moment and current moment
  const moveVector = dir.clone().multiplyScalar(speed * Math.cos(angle) * shotTDiff)
  state.bullets[id].position = startPos.clone().add(moveVector)
  state.bullets[id].position.z = speed * Math.sin(angle) * shotTDiff - (gravity * shotTDiff * shotTDiff) / 2
}

function tryShot(pId, forceUpdate) {
  state.keysPressed[pId].shot = false
  const { position, lookDir, shots } = state.players[pId]
  if (shots <= 0)
    return

  state.bullets.push({
    id: uuid(),
    startPos: position.clone(),
    startTime: performance.now(),
    position: position.clone(),
    dir: lookDir.clone(),
    playerId: pId,
    stale: false, // If true ignore this bullet
  })
  state.players[pId].shots -= 1
  state.players[pId].shotsReloading.push(preferences.shot.reloadingTime)

  forceUpdate()
}

function bulletCollision(bullet, enemyId) {
  const bulletPos = bullet.position.clone()
  const bulletR = preferences.bulletRadius

  const enemyPos = state.players[enemyId].position.clone()
  const balls = state.players[enemyId].balls
  const enemyR = getBubbleRadius(balls)

  if (enemyPos.distanceTo(bulletPos) < enemyR + bulletR) {
    const shooterId = bullet.playerId

    state.players[enemyId].balls += 1
    state.players[enemyId].shots += 1
    state.players[shooterId].balls -= 1
    state.players[shooterId].shots -= 1

    // If new size of enemy doesn't fit to the fieldSize move enemy.
    const enemy = state.players[enemyId]
    const enemyR_ = getBubbleRadius(enemy.balls)

    if (enemy.position.x + enemyR_ >= preferences.fieldW / 2) {
      const diff = Math.abs(preferences.fieldW / 2 - (enemy.position.x + enemyR_))
      state.players[enemyId].position.x -= diff + 0.1
    } else if (enemy.position.x - enemyR_ <= -preferences.fieldW / 2) {
      const diff = Math.abs(preferences.fieldW / 2 + (enemy.position.x - enemyR_))
      state.players[enemyId].position.x += diff + 0.1
    }

    if (enemy.position.y + enemyR_ >= preferences.fieldH / 2) {
      const diff = Math.abs(preferences.fieldH / 2 - (enemy.position.y + enemyR_))
      state.players[enemyId].position.y -= diff + 0.1
    } else if (enemy.position.y - enemyR_ <= -preferences.fieldH / 2) {
      const diff = Math.abs(preferences.fieldH / 2 + (enemy.position.y - enemyR_))
      state.players[enemyId].position.y += diff + 0.1
    }

    bullet.stale = true
  }
}

function updateReloadings(pId, tDiff) {
  const reloadings = state.players[pId].shotsReloading
  state.players[pId].shotsReloading = reloadings.map(time => {
    const newT = time - tDiff
    if (newT <= 0) {
      state.players[pId].shots += 1
    }
    return newT
  }).filter(time => time >= 0)
}

let t1 = performance.now();
export const mainCycle = (forceUpdate) => function (t2) {
  const tDiff = (t2 - t1) / 1000; // Time diff between current and last frames in seconds
  t1 = t2;

  movePlayer(1, tDiff)
  movePlayer(2, tDiff)

  updateReloadings(1, tDiff)
  updateReloadings(2, tDiff)

  if (state.keysPressed[1].shot) {
    tryShot(1, forceUpdate)
  }
  if (state.keysPressed[2].shot) {
    tryShot(2, forceUpdate)
  }

  let updateIsNeeded = false
  state.bullets = state.bullets.filter(bullet => {
    if (bullet.position.z + preferences.bulletRadius < -200) {
      updateIsNeeded = true
      return false
    }
    return true
  })

  state.bullets.forEach((bullet, i) => {
    moveBullet(i, t2)
    !bullet.stale && bulletCollision(bullet, bullet.playerId === 1 ? 2 : 1)
  })

  if (updateIsNeeded) {
    forceUpdate()
  }
}
