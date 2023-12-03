import { OrbitControls, useAnimations, useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";




const character = ({avatar}) =>{


    
    
    var av = "http://localhost:3000/avatars/"+avatar+".glb";
    console.log(av);
    const model = useGLTF(av);
    model.scene.scale.set(11,11,11);
    
    //model.scene.name ="tyson";
    model.scene.traverse((object) => {
      if(object.isMesh) {
        object.castShadow = true;
      }
    });
  
    const currentAction = useRef("");
    const controlsRef = useRef<typeof OrbitControls>();
    const camera = useThree((state) => state.camera);
    
    
  
   
    return (
    <>
    <object3D position={[0,-2,0]} scale={[2.75,2.75,2.75]}>
    <OrbitControls ref={controlsRef} />
    <primitive object={model.scene}/>;
    </object3D>
    </>
    );
  }

  export default character;