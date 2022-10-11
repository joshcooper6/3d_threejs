import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Plane, Box, EnvironmentCube } from '@react-three/drei';
import { Model } from './ModelDancing';
import * as THREE from 'three';
import { sRGBEncoding } from 'three';

function App(props) {

   const links = [
      { name: 'Ready Player Me', src: '#' },
      { name: 'Blender', src: '#' },
      { name: 'Mixamo', src: '#' }
   ]

   const rendered = links.map((link) => 
        <a href={link.src} target="_blank" children={link.name} />
   )

  return (
   <>
      <h1 style={{
         padding: '1em 0',
         fontSize: '4em',
         textAlign: 'center',
         alignSelf: 'center',
         position: 'fixed',
         minWidth: '100vw'
      }}>{props.name} in 3D with Three.js</h1>
      <div style={{display: 'flex', padding: '3em 0', width: '100%', position: 'absolute', bottom: '0', justifyContent: 'space-around'}}>
         {rendered}
      </div>
   
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
