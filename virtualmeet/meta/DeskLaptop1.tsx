import { OrbitControls, useAnimations, useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { useInput } from "./hooks/useInput";
import * as THREE from "three"
import { CanvasHTMLAttributes } from "react";
import { CSS2DRenderer, CSS2DObject} from 'three/examples/jsm/renderers/CSS2DRenderer';  



let x=0;
let z=0;
let moveX=0;
let moveZ=0;


let walkDirection = new THREE.Vector3();
let rotateAngle = new THREE.Vector3(0,1,0);
let rotateQuaternion = new THREE.Quaternion();
let cameraTarget = new THREE.Vector3();


const Desktop1 = () =>{

  

var canvas = document.createElement("canvas");
    canvas.width = 100;
    canvas.height = 128;
    var ctx = canvas.getContext("2d");
    var texture = new THREE.CanvasTexture(canvas);
		var material = new THREE.MeshBasicMaterial( { map: texture } );
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, 128, 128);
    ctx.fillStyle = "green";
    ctx.fillRect(10, 10, 128, 128);
    ctx.fillStyle = "white";
    ctx.font = "20px sans-serif";
    //ctx.fillText(rec, 20, 100);
    var cube = new THREE.Mesh( new THREE.PlaneGeometry, material );
    const { forward,backward, left , right , jump , shift } = useInput();
    // const model = useGLTF("http://localhost:3000/new_final_avatar1.glb")
    const model = useGLTF("http://localhost:3000/office/DeskLaptop1.glb")
    const {actions} = useAnimations(model.animations,model.scene);
     //model.scene.add(cube);
    // model.scene.remove(cube);
    // cube.position.set(0,2.5,0);
    // model.scene.scale.set(9,9,9);
  

    function setCTX(r){
      console.log("popup");
      
      ctx?.fillText(r,20,100);
      model.scene.add(cube);
      setTimeout(() => {
        model.scene.remove(cube);
      }, 5000);
      
      
   }
    //model.scene.name ="tyson";
    model.scene.traverse((object) => {
      if(object.isMesh) {
        object.castShadow = true;
      }
    });
  
    const currentAction = useRef("");
    const controlsRef = useRef<typeof OrbitControls>();
    const camera = useThree((state) => state.camera);
    
    const updateCameraTarget =(moveX : number , moveZ :number) =>{
        //move camera
        camera.position.x = 10;
        camera.position.z = 10;

        
        if(controlsRef.current) controlsRef.current.target = cameraTarget;   
        

    };
  
    useEffect(()=>{
      let action = "";
  
      if(forward || backward || left || right){
        action = "walking";
        if(shift) {
          action = "running";

        }
      }
      else if(jump) {
        action = "jumping";
      }
      else{
        action = "idle";
      }
      //actions?.idle?.play();
  
      if ( currentAction.current != action){
        const nextActionToPlay = actions[action];
        const current = actions[currentAction.current];
        current?.fadeOut(0.2);
        nextActionToPlay?.reset().fadeIn(0.2).play();
        currentAction.current = action;
      }
  
    },[forward,backward, left , right , jump , shift]);

    return (
    <>
    <object3D position={[105,1.2,52]} scale={[5,5,5]}>
    <OrbitControls ref={controlsRef} />
    <primitive object={model.scene}/>;
    </object3D>
    </>
    );
  }

  export default Desktop1;