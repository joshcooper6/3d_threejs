import React, { useEffect, useRef, useState } from 'react'
import { useLoader } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { AnimationMixer, AnimationClip } from 'three'
import { useFrame } from '@react-three/fiber'

export function Model(props) {
  const group = useRef()
  const { nodes, scene, materials, animations } = useGLTF('/FinishedCharacter.glb')
  const [current, setCurrent] = useState('wave');
  let mixer = new AnimationMixer(scene);
  let actions = mixer._actions;
  useFrame((state, delta) => { mixer.update(delta) } );
  console.log('Current Actions', actions);

  const actsFromAnims = (animations) => {
    animations.forEach((animation) => {
      let action = mixer.clipAction(animation);
      action.setLoop(1, 1);
    });
  };

  actsFromAnims(animations);

  const renderAnimation = (input) => {
    switch(input) {
      case 'wave':
        return actions[3];
        break;
      case 'dance': 
      return actions[0];
      break;
      case 'death': 
      return actions[1];
      break;
      case 'thriller':
      return actions[2];
      break;
    }
  };

  console.log(renderAnimation(current)._clip.duration)

  const currentDuration = renderAnimation(current)._clip.duration;

  useEffect(() => {
    renderAnimation(current).play();
  }, []);



  // const useAnimations = (anims) => {
  //   anims.forEach((animation) => {
  //     let action = mixer.clipAction(animation);
  //     action.setLoop(1, 1);
  //   });

  //   mixer.addEventListener('finished', (e) => {
  //     let currentAction = e.action;
  //     let currentIndex = actions.indexOf(currentAction);
  //     let totalActions = (actions.length - 1);
  
  //     if (currentIndex < totalActions) {
  //       currentAction.stop();
  //       let newIndx = currentIndex + 1;
  //       mixer._actions[newIndx].play();
  //     } else {
  //       let newIndx = 0;
  //       currentAction.stop();
  //       mixer._actions[newIndx].play();
  //     };
  
  //     console.log('Actions Length', actions.length)
  //     console.log('Current Action Index', actions.indexOf(currentAction))
  //     console.log('Needs to be <', totalActions)
  //     console.log('Actions Array', actions);
  //   });

  //   useFrame((state, delta) => { mixer.update(delta) } );
  //   actions[3].play();
  // };
  
  // useAnimations(animations);

  const hc = (e) => {
    // mixer.stopAllAction();
    // actions[4].play();
  }

  return (
    <group  ref={group} {...props} dispose={null}>
      <group onClick={hc} name="Scene">
        <group name="Armature">
          <primitive object={nodes.Hips} />
          <skinnedMesh name="Wolf3D_Body" geometry={nodes.Wolf3D_Body.geometry} material={materials.Wolf3D_Body} skeleton={nodes.Wolf3D_Body.skeleton} />
          <skinnedMesh name="Wolf3D_Hair" geometry={nodes.Wolf3D_Hair.geometry} material={materials.Wolf3D_Hair} skeleton={nodes.Wolf3D_Hair.skeleton} />
          <skinnedMesh name="Wolf3D_Outfit_Bottom" geometry={nodes.Wolf3D_Outfit_Bottom.geometry} material={materials.Wolf3D_Outfit_Bottom} skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton} />
          <skinnedMesh name="Wolf3D_Outfit_Top" geometry={nodes.Wolf3D_Outfit_Top.geometry} material={materials.Wolf3D_Outfit_Top} skeleton={nodes.Wolf3D_Outfit_Top.skeleton} />
          <skinnedMesh name="Wolf3D_Outfit_Footwear" geometry={nodes.Wolf3D_Outfit_Footwear.geometry} material={materials.Wolf3D_Outfit_Footwear} skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton} />
          <skinnedMesh name="EyeLeft" geometry={nodes.EyeLeft.geometry} material={materials.Wolf3D_Eye} skeleton={nodes.EyeLeft.skeleton} morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary} morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences} />
          <skinnedMesh name="EyeRight" geometry={nodes.EyeRight.geometry} material={materials.Wolf3D_Eye} skeleton={nodes.EyeRight.skeleton} morphTargetDictionary={nodes.EyeRight.morphTargetDictionary} morphTargetInfluences={nodes.EyeRight.morphTargetInfluences} />
          <skinnedMesh name="Wolf3D_Head" geometry={nodes.Wolf3D_Head.geometry} material={materials.Wolf3D_Skin} skeleton={nodes.Wolf3D_Head.skeleton} morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary} morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences} />
          <skinnedMesh name="Wolf3D_Teeth" geometry={nodes.Wolf3D_Teeth.geometry} material={materials.Wolf3D_Teeth} skeleton={nodes.Wolf3D_Teeth.skeleton} morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary} morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/FinishedCharacter.glb')
