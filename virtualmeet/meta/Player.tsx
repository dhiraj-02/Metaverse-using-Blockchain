import { OrbitControls, useAnimations, useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { useInput } from "./hooks/useInput";
import * as THREE from "three"
import { CanvasHTMLAttributes } from "react";
import { CSS2DRenderer, CSS2DObject} from 'three/examples/jsm/renderers/CSS2DRenderer';  

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyD1Sg7c6Vv1m0gNg7WksY5rn8BKeGL4h7k",
  authDomain: "virtualmeet2023.firebaseapp.com",
  databaseURL: "https://virtualmeet2023-default-rtdb.firebaseio.com",
  projectId: "virtualmeet2023",
  storageBucket: "virtualmeet2023.appspot.com",
  messagingSenderId: "960887403176",
  appId: "1:960887403176:web:c2e6783a12a34d3a92489d",
  measurementId: "G-4RQMD3X03F"
};

const app = initializeApp(firebaseConfig);

import {
    getDatabase,
    get,
    ref,
    set,
    child,
    update,
    remove,
} from "firebase/database";
import { ChatAppContect } from "@/Context/ChatAppContext";
  
const db = getDatabase();


let x=0;
let z=0;
let moveX=0;
let moveZ=0;

function updateCoordinates(){
  // console.log(x,z);
    update(ref(db, "coordinates/3001"),{
        
        x: x,
        y: z
    })
    .then(()=>{
      //console.log("data stored");
    })
    .catch((error)=>{
      console.log("failed"+error);
    });
}

setInterval(() => {
	updateCoordinates();
}, 100);


var message: string | any[] = [];
const dbref = ref(db);
    get(child(dbref,"meet/")).then((snapshot)=>{
        if(snapshot.exists()){
            message =  snapshot.val().messages;
            //console.log(x);
            //console.log(z);
        }
        else
        {
          console.log("no match");
        }
    })
    .catch((error)=>{
        console.log("failed"+error);
    });

    
var l = message.length;



let walkDirection = new THREE.Vector3();
let rotateAngle = new THREE.Vector3(0,1,0);
let rotateQuaternion = new THREE.Quaternion();
let cameraTarget = new THREE.Vector3();

const directionOffset = ({forward, backward,left,right}) =>{
    var directionOffset = 0; //w

    if(forward) {
        if(left){
            directionOffset = Math.PI/4; //w+a
        }
        else if (right){
            directionOffset = -Math.PI/4;   //w+d
        }
    }else if (backward) {
            if(left) {
                directionOffset = Math.PI/4 +Math.PI /2; //s+a
            } else if (right){
                directionOffset = -Math.PI/4 - Math.PI/2; //s+d
            }   else{
                directionOffset = Math.PI ; //s
            }
        }else if(left){
            directionOffset = Math.PI/2; //a
        } else if(right) {
            directionOffset = -Math.PI/2; //d
        }

        return directionOffset;
    };
    // var geometry = new THREE.BoxGeometry();
      
    //   var canvas = document.createElement("canvas");
    //   canvas.width = 100;
    //   canvas.height = 128;
    //   var ctx = canvas.getContext("2d");
    //   var texture = new THREE.CanvasTexture(canvas);
		// 	var material = new THREE.MeshBasicMaterial( { map: texture } );
    //   //var label = new THREE.Mesh(new THREE.PlaneGeometry, new THREE.MeshBasicMaterial({map:texture}));
    
    //     ctx.fillStyle = "#ffffff";
    //     ctx.fillRect(0, 0, 128, 128);
    //     ctx.fillStyle = "green";
    //     ctx.fillRect(10, 10, 128, 128);
    //     ctx.fillStyle = "white";
    //     ctx.font = "10px sans-serif";
    //     //ctx.fillText("tyson iiiiiiiii", 20, 100);
    //     texture.needsUpdate = true;
      
		// 	var cube = new THREE.Mesh( new THREE.PlaneGeometry, material );
			


// const labelRenderer = new CSS2DRenderer();
// labelRenderer.setSize(window.innerWidth, window.innerHeight);
// labelRenderer.domElement.style.position= 'absolute';
// labelRenderer.domElement.style.top = '0px';
// labelRenderer.domElement.style.pointerEvents = 'none';
// document.body.appendChild(labelRenderer.domElement);

import { useContext } from "react";

const Player = ({avatar}) =>{
  const {
    
    account,
} = useContext(ChatAppContect);


  console.log(avatar);

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
    const model = useGLTF(`http://localhost:3000/avatars/${avatar}.glb`)
    const {actions} = useAnimations(model.animations,model.scene);
     //model.scene.add(cube);
    // model.scene.remove(cube);
    cube.position.set(0,2.5,0);
    model.scene.scale.set(11,11,11);
    
    setInterval(() => {
      const dbref = ref(db);
    get(child(dbref,"meet/")).then((snapshot)=>{
        if(snapshot.exists()){
            message =  snapshot.val().messages;
            //console.log("messgage got");
            //console.log(x);
            //console.log(z);
        }
        else
        {
          //console.log("no match");
        }
    })
    .catch((error)=>{
        console.log("failed"+error);
    });
  
    if(message.length>l)
    {
      l=message.length;
      console.log(message[l-1].substring(0,42));
      
      if(message[l-1].substring(0,42)===account)
      {
        console.log("out");
        var r = message[message.length-1].substring(42,);
        console.log(r);
        setCTX(r);
      }
    }
          
  }, 1000);
  //model.scene.add(cube);

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
    camera.position.x = 70;
        camera.position.z = 58;
        camera.position.y = 30;
        
    const updateCameraTarget =(moveX : number , moveZ :number) =>{
        //move camera
        camera.position.x += moveX;
        camera.position.z =+ moveZ;

        //update camera target 
        cameraTarget.x = model.scene.position.x;
        cameraTarget.y = model.scene.position.y + 2;
        cameraTarget.z = model.scene.position.z; 
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

    useFrame((state ,delta) => {
        
        if(
            currentAction.current == "running"  || 
            currentAction.current == "walking"
        ) {
            // calculate towards camera direction
            let angleYCameraDirection = Math.atan2(
                camera.position.x  - model.scene.position.x,
                camera.position.z - model.scene.position.z
            );

            // diagonal movement angle offset
            let newDirectionOffset = directionOffset({
                forward,
                backward,
                left,
                right,
            } );

            //rotate model
            rotateQuaternion.setFromAxisAngle(
                rotateAngle,
                angleYCameraDirection + newDirectionOffset
            );
            model.scene.quaternion.rotateTowards(rotateQuaternion,0.2);

            //calculate direction
            camera.getWorldDirection(walkDirection);
            walkDirection.y = 0;
            walkDirection.normalize();
            walkDirection.applyAxisAngle(rotateAngle,newDirectionOffset);

            // run/walk velocity
            const velocity = currentAction.current == "running" ? 50 : 25;

            // move model & camera
            moveX = walkDirection.x * velocity *delta;
            moveZ = walkDirection.z * velocity *delta;
            model.scene.position.x += moveX;
            x=model.scene.position.x;
            model.scene.position.z += moveZ;
            z=model.scene.position.z;
            
            
        }
    });
    return (
    <>
    <OrbitControls ref={controlsRef} />
    <primitive object={model.scene}/>;
    </>
    );
  }

  export default Player;