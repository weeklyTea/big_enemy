import * as THREE from "three";

export const preferences = {
  maxSpeed: 70, // Meters per second.
  accel: 10,
  friction: 0.2, // Decrease curSpeed in 'friction' times each second.
  rotateSpeed: THREE.Math.degToRad(70),
  skiddingC: 0.8, // Should be dependent on player weight
  bubbleRadius: 8, // Meters
  fieldW: 250, // Meters
  fieldH: 400, // Meters
}

export const state = {
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
}