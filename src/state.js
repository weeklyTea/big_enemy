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
  radIncrease: 4,
  shot: {
    // gravity: 850,
    // speed: 550, // m/s
    gravity: 250,
    speed: 170, // m/s
    angle: THREE.Math.degToRad(60),
  }
}

export const state = {
  players: {
    1: {
      moveDir: new THREE.Vector3(0, 1, 0),
      lookDir: new THREE.Vector3(-1, 0, 0),
      position: new THREE.Vector3(100, 0, 0),
      radius: preferences.bubbleRadius,
      curSpeed: 0,
      scale: 1,
    },
    2: {
      moveDir: new THREE.Vector3(0, 1, 0),
      lookDir: new THREE.Vector3(0, 1, 0),
      position: new THREE.Vector3(-100, 0, 0),
      radius: preferences.bubbleRadius,
      curSpeed: 0,
      scale: 1,
    },
  },
  bullets: [],
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