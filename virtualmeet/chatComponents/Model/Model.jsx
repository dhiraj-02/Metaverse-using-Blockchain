import React, { useState, useContext } from "react";
import Image from "next/image";
import { lazy, Suspense } from 'react'
import { Canvas, } from '@react-three/fiber'
import Lights from '@/meta/Lights';


const ModelComponent = lazy(() => import("../../meta/character"));
//INTERNAL IMPORT
import Style from "./Model.module.css";
import images from "../../assets";
import { ChatAppContect } from "../../Context/ChatAppContext";
import { Loader } from "../index";


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
  
const db = getDatabase();



// const dbref = ref(db);
//        get(child(dbref,"avatars/")).then((snapshot)=>{
//           if(snapshot.exists()){
//               avatars=snapshot.val().list;
//               console.log(avatars);
//           }
//           else
//           {
//             console.log("no match");
//           }
//       })
//       .catch((error)=>{
//           console.log("failed"+error);
//       });

// function setAvatar(){
//   update(ref(db, "avatars/"),{
//     list:avatars,
// })
// .then(()=>{
//   //console.log("data stored");
// })
// .catch((error)=>{
//   console.log("failed"+error);
// });
// }
import {
  ChechIfWalletConnected,
  connectWallet,
  connectingWithContract,
} from "../../Utils/apiFeature";

const Model = ({
  openBox,
  title,
  address,
  head,
  info,
  smallInfo,
  image,
  functionName,
}) => {
  //USESTATE





  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState([]);
  const [chosen, setChosen] = useState("");
  const [accountAddress, setAccountAddress] = useState("");
  let list=[];

  async function getList(){
    const dbref = ref(db);
     await get(child(dbref,"avatars/")).then((snapshot)=>{
      if(snapshot.exists()){
          list = snapshot.val().list;
      }
    });
  }

  getList();

  const { loading } = useContext(ChatAppContect);
  function display(){
    console.log(list);
    //var id= event.srcElement.id;
    const img = list.map((item, i) => {
      return (

        
        <div class={Style.float_child}>
          {!item ? (<Image
                className={Style.UserCard_box_img}
                src={images[`Avatar${i+1}`]}
                alt={i+1}
                id={i}
                width={100}
                height={100}
                onClick={()=>selectAvatar()}
                
              />) : (" ") }
                
         
       </div>
      );
    });
    setAvatar(img);
  }
  
  let avatarNames = ["Manager" , "Purpleman", "Girl", "Commando"];
  var final;
  
  const [index, setInd] = useState();

 


  function selectAvatar(){
    var id= event.srcElement.id;
    final = parseInt(id);
    setInd(final);
    //console.log(typeof(id));
    document.getElementById("avatar").value=avatarNames[final];
    setChosen(avatarNames[final]);
    //setChosen(true);
    }
     

  

  async function submit(){
    let ava = document.getElementById("avatar").value;
    if(name == "" || ava=="")
    {
      alert("Enter details properly and select avatar for yourself");
    }
    else{
      
      console.log(index);
      list[index] = true;
      console.log(list);
      

      update(ref(db, "avatars/"),{
        list:list
    })
    .then(()=>{
        alert("data stored");
    })
    .catch((error)=>{
        alert("failed"+error);
    });



      const contract = await connectingWithContract();
      const addMessage = await contract.createAccount(name, ava);
      window.location.reload();

    }
  }

  return (
    <div className={Style.Model}>
      <div className={Style.head}><h1>Welcome to Virtual Meet powered by Blockchain</h1></div>
      <div className={Style.Model_box}>
        <div className={Style.Model_box_left}>
          {chosen?(
            <div className={Style.av}>
        <Canvas>
            <Lights/>
            <ModelComponent
              avatar = {avatarNames[index]}
            />
        </Canvas>
        </div>
      
    ):(<Image src={image} alt="buddy" width={700} height={700} />)}
          
        </div>
        <div className={Style.Model_box_right}>
          <h1>
            {title} <span>{head}</span>
          </h1>
          <p>{info}</p>
          <small>{smallInfo}</small>

          {loading == true ? (
            <Loader />
          ) : (
            <div className={Style.Model_box_right_name}>
              <div className={Style.sig}><h3>SignUp to continue</h3></div>
              
              <div className={Style.Model_box_right_name_info}>
                <Image
                  src={images.username}
                  alt="user"
                  width={30}
                  height={30}
                />
                <input
                  type="text"
                  placeholder="your name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className={Style.Model_box_right_name_info}>
                <Image
                  src={images.username}
                  alt="user"
                  width={30}
                  height={30}
                />
                <input
                  type="text"
                  placeholder="avatar"
                  id="avatar"
                />
              </div>
              <div className={Style.Model_box_right_name_info}>
                <Image src={images.account} alt="user" width={30} height={30} />
                <input
                  type="text"
                  placeholder={address || "Enter address.."}
                  onChange={(e) => setAccountAddress(e.target.value)}
                />
              </div>
              <div>
              <button onClick={display}> Display</button>
                      <div className={Style.float_container}>
                      {avatar}
                        </div>
              </div>
            <div className={Style.tm}>
              <div className={Style.Model_box_right_name_btn}>
                <button onClick={submit}>
                  {""}
                  <Image src={images.send} alt="send" width={30} height={30} />
                  {""}
                  Submit
                </button>

                <button onClick={() => openBox(false)}>
                  {""}
                  <Image src={images.close} alt="send" width={30} height={30} />
                  {""}
                  Cancel
                </button>
              </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Model;
