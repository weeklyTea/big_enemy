import { state, preferences } from './state'

export function getBubbleRadius(ballsCount) {
  return preferences.minBubbleRadius + ballsCount * preferences.radiusPerBall
}

export const keyDown = e => {
  console.log(e.keyCode)
  switch (e.keyCode) {
    case 13: // enter
      state.keysPressed[1].shot = true;
      return;
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

    case 84: //t
      state.keysPressed[2].shot = true;
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
}

export const keyUp = e => {
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
}
