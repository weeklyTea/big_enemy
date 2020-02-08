import * as THREE from "three";

export const preferences = {
  maxSpeed: 70, // Meters per second.
  accel: 10,
  friction: 0.2, // Decrease curSpeed in 'friction' times each second.
  rotateSpeed: THREE.Math.degToRad(90),
  skiddingC: 0.8, // Should be dependent on player weight
  bubbleRadius: 8, // Meters
  bulletRadius: 3,
  fieldW: 250, // Meters
  fieldH: 150, // Meters
  shot: {
    gravity: 850,
    speed: 550, // m/s
    angle: THREE.Math.degToRad(80),
  }
}

export const state = {
  players: {
    1: {
      moveDir: new THREE.Vector3(0, 1, 0),
      lookDir: new THREE.Vector3(-1, 0, 0),
      position: new THREE.Vector3(100, 0, 0),
      curRadius: preferences.bubbleRadius,
      curSpeed: 0,
    },
    2: {
      moveDir: new THREE.Vector3(0, 1, 0),
      lookDir: new THREE.Vector3(0, 1, 0),
      position: new THREE.Vector3(-100, 0, 0),
      curRadius: preferences.bubbleRadius,
      curSpeed: 0,
    },
  },
  bullets: [
  //   {
  //   startPos: new THREE.Vector3(0, 0, 0),
  //   startTime: performance.now(),
  //   position: new THREE.Vector3(0, 0, 0),
  //   dir: new THREE.Vector3(0.5, 0.5, 0),
  //   playerId: 2
  // }
],
  keysPressed: {
    1: {
      left: false,
      right: false,
      up: false,
      down: false,
      shot: false,
    },
    2: {
      left: false,
      right: false,
      up: false,
      down: false,
      shot: false,
    },
  }
}