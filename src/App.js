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
import { Wave } from './components/Wave'
import { Field } from './components/Field';
import { WaterCircles } from "./components/WaterCircles";
import { Score } from './components/Score';

import './style.css';

function useForceUpdate() {
  const [, forceUpdate] = useState()

  return useCallback(() => forceUpdate({}), [])
}

function App() {
  const [prefs, updatePrefs] = useState(preferences);
  const [score, setScore] = useState([0, 0]);
  const forceUpdate = useForceUpdate()
  
  useEffect(() => {
    for (let prop in prefs)
      preferences[prop] = prefs[prop];
  }, [prefs]);

  useEffect(() => {
    addEffect(mainCycle(forceUpdate, setScore));
    window.addEventListener("keyup", keyUp);
    window.addEventListener("keydown", keyDown);
  }, []);
  const skyColor = "0xffffff";
  const groundColor = "#888888";
  return (
    <div>
      {/* <DatGui data={prefs} onUpdate={updatePrefs}>
        <DatNumber path="maxSpeed" label="maxSpeed" min={0} max={400} step={1} />
        <DatNumber path="accel" label="accel" min={0} max={400} step={1} />
        <DatNumber path="friction" label="friction" min={0} max={400} step={0.1} />
        <DatNumber path="rotateSpeed" label="rotateSpeed" min={0} max={360} step={1} />
        <DatNumber path="skiddingC" label="skiddingC" min={0} max={400} step={0.1} />
      </DatGui> */}
      <Canvas
        style={{ height: window.innerHeight }}
        camera={{ fov: 30, position: [0, -400, 340] }}
        onCreated={({ camera }) => camera.lookAt(0, 0, 0)}
        shadowMap={true}
      >
        <ambientLight intensity={0.1} />
        <pointLight position={[0, 0, 160]} intensity={0.4} castShadow={true} distance={360}/>
        <hemisphereLight skyColor={skyColor} groundColor={groundColor} intensity={0.7} />
        <directionalLight position={[0, 0, 200]} intensity={0.5} />
        <Surface color={prefs.colorSurf} />
        <Bubble pId={1} color={prefs.color1} />
        <Bubble pId={2} color={prefs.color2} />
        { state.bullets.map((bullet, idx) => <Bullet key={bullet.id} id={idx} pId={bullet.playerId} />) }
        { state.bullets.map((bullet, idx) => <WaterCircles key={bullet.id + 1} bullet={bullet} />) }
        { Array.from(Array(20)).map((x, i) => <Wave key={i} />) }
        <Field />
      </Canvas>
      <Score score={score}/>
    </div>
  );
}

export default App;
