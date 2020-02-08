import React, { useEffect, useState, useCallback } from "react";
import { Canvas, addEffect } from "react-three-fiber";
import DatGui, { DatNumber } from 'react-dat-gui';
import './index.css';

import { mainCycle } from './cycle'
import { preferences, state } from './state'
import { Bubble } from './components/Bubble'
import { Surface } from './components/Surface'
import { keyDown, keyUp } from './utils'
import { Bullet } from "./components/Bullet";

function useForceUpdate() {
  const [, forceUpdate] = useState()

  return useCallback(() => forceUpdate({}), [])
}

function App() {
  const [prefs, updatePrefs] = useState(preferences);

  const forceUpdate = useForceUpdate()
  
  useEffect(() => {
    for (let prop in prefs)
      preferences[prop] = prefs[prop];
  }, [prefs]);

  useEffect(() => {
    addEffect(mainCycle(forceUpdate));
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
        camera={{ fov: 30, position: [0, -200, 200] }}
        onCreated={({ camera }) => camera.lookAt(0, 0, 0)}
      >
        <ambientLight intensity={0.7} />
        <spotLight position={[0, 0, 100]} intensity={0.7} />
        {/* <pointLight position={[-50, -50, -50]} intensity={0.6} /> */}
        <Surface color={prefs.colorSurf} />
        <Bubble pId={1} color={prefs.color1} />
        <Bubble pId={2} color={prefs.color2} />
        { state.bullets.map((bullet, idx) => <Bullet key={idx} id={idx} pId={bullet.playerId} />) }
      </Canvas>
    </div>
  );
}

export default App;
