import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Plane, Box, EnvironmentCube } from '@react-three/drei';
import { Model } from './ModelDancing';
import * as THREE from 'three';
import { sRGBEncoding } from 'three';

function App(props) {

  return (
   <>
      {/* <h1 style={{
         margin: '0',
         padding: '1em',
         fontSize: '4em',
         textAlign: 'center',
      }}>{props.name} in 3D with Three.js</h1> */}
   
      <Canvas
      camera={{ position: [0, 0, 12.25], fov: 15 }}
      style={{
         backgroundColor: 'transparent',
         // backgroundImage: `url('/neon.jpg')`,
         backgroundSize: 'cover',
         backgroundPosition: 'center',
         width: '100vw',
         height: '100vh',
      }}
   >
      <ambientLight intensity={1.3} />
      <ambientLight intensity={0.5} />
      <directionalLight intensity={0.4} />
      <Suspense fallback={null}>
         <Model position={[0.025, -0.9, 1]} />
      </Suspense>
      <OrbitControls />
   </Canvas>
 </>
  );
}

export default App;
