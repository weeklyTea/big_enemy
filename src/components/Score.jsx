import React, { useState } from "react";
const bubbleColors = ['red', 'lightgreen'];

export function Score({ score }) {
  return (
    <div className="score">
      <h1 className="score__text">Score: <span style={{ color: bubbleColors[1] }}>{score[1]}</span> / <span style={{ color: bubbleColors[0] }}>{score[0]}</span></h1>
    </div>
  );
}
