import * as THREE from "three";

export const preferences = {
  maxSpeed: 70, // Meters per second.
  accel: 10,
  friction: 0.2, // Decrease curSpeed in 'friction' times each second.
  bounceK: 0.5, // Decrease curSpeed after hiting the border
  rotateSpeed: THREE.Math.degToRad(90),
  skiddingC: 0.8, // Should be dependent on player weight
  radiusPerBall: 1,
  minBubbleRadius: 2,
  bulletRadius: 2,
  fieldW: 350, // Meters
  fieldH: 250, // Meters
  radIncrease: 4,
  gateW: 10,
  shot: {
    reloadingTime: 2, // sec.
    //// Look from up case:
    // gravity: 850,
    // speed: 550, // m/s
    // angle: THREE.Math.degToRad(80),

    //// Angle look:
    gravity: 250,
    speed: 170, // m/s
    angle: THREE.Math.degToRad(60),

    //// Testing:
    // gravity: 250,
    // speed: 220, // m/s
    // angle: THREE.Math.degToRad(45),
  },
  bubbleColors: ['#DB4A4A', '#54915F'],
  bulletColors: ['#DB4A4A', '#54915F']
}

export const state = {
  players: {
    1: {
      moveDir: new THREE.Vector3(0, 1, 0),
      lookDir: new THREE.Vector3(-1, 0, 0),
      position: new THREE.Vector3(100, 0, 0),
      balls: 7,
      shots: 7,
      shotsReloading: [], // Array with times when shot should be reloaded.
      curSpeed: 0,
    },
    2: {
      moveDir: new THREE.Vector3(0, 1, 0),
      lookDir: new THREE.Vector3(1, 0, 0),
      position: new THREE.Vector3(-100, 0, 0),
      balls: 7,
      shots: 7,
      shotsReloading: [],
      curSpeed: 0,
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