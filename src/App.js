import React, { useEffect, useState } from "react";
import { Canvas, addEffect } from "react-three-fiber";
import DatGui, { DatNumber } from 'react-dat-gui';

import { mainCycle } from './cycle'
import { prefereces } from './state'
import { Bubble } from './components/Bubble'
import { Surface } from './components/Surface'
import { keyDown, keyUp } from './utils'

function App() {
  const [prefs, updatePrefs] = useState(prefereces);
  
  useEffect(() => {
    for (let prop in prefs)
      prefereces[prop] = prefs[prop];
  }, [prefs]);

  useEffect(() => {
    addEffect(mainCycle);
    window.addEventListener("keyup", keyUp);
    window.addEventListener("keydown", keyDown);
  }, []);

  return (
    <div>
      <DatGui data={prefs} onUpdate={updatePrefs}>
        <DatNumber path="maxSpeed" label="maxSpeed" min={0} max={400} step={1} />
        <DatNumber path="accel" label="accel" min={0} max={400} step={1} />
        <DatNumber path="friction" label="friction" min={0} max={400} step={0.1} />
        <DatNumber path="rotateSpeed" label="rotateSpeed" min={0} max={360} step={1} />
        <DatNumber path="skiddingC" label="skiddingC" min={0} max={400} step={0.1} />
      </DatGui>
      <Canvas
        style={{ height: "700px" }}
        camera={{ fov: 30, position: [0, 0, 300] }}
        onCreated={({ camera }) => camera.lookAt(0, 0, 0)}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 100, 100]} intensity={1.2} />
        <Surface />
        <Bubble pId={1} />
        <Bubble pId={2} />
      </Canvas>
    </div>
  );
}

export default App;
