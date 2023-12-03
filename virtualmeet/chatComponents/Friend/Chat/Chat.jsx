import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
//INTERNAL IMPORT
import Style from "./Chat.module.css";

import images from "../../../assets";
import { converTime } from "../../../Utils/apiFeature";
import { Loader } from "../../index";


import { lazy, Suspense } from 'react'
import { Canvas, } from '@react-three/fiber'
import Ground from '../../../meta/Ground';
import Lights from '@/meta/Lights';

let messages = [];
let empty = [];
let name="office";

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


const ModelComponent = lazy(() => import("../../../meta/Player"));
const ModelComponent1 = lazy(() => import("../../../meta/Player2"));
const Chat = ({
  functionName,
  readMessage,
  friendMsg,
  account,
  userName,
  loading,
  currentUserName,
  currentUserAddress,
  readUser,
}) => {
  //USTE STATE
  const [message, setMessage] = useState("");
  const [meetingData, setMeetData] = useState([]);
  const [chatData, setChatData] = useState({
    name: "",
    address: "",
  });
  const [meet, setMeet] = useState();
  async function started(){
    const dbref = ref(db);
      await get(child(dbref,"startMeet/")).then((snapshot)=>{
          if(snapshot.exists()){
            console.log("Meet-"+snapshot.val().started);
              setMeet(snapshot.val().started);
              console.log(meet);
          }
      })
    }
    started();

  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    setChatData(router.query);
  }, [router.isReady]);

  useEffect(() => {
    if (chatData.address) {
      readMessage(chatData.address);
      readUser(chatData.address);
    }
  }, []);

  function pushEle(){
    messages.push(message);
    console.log(messages);
  }

  //console.log(friendMsg);

  async function updateMeetData(){
    const dbref = ref(db);
      await get(child(dbref,"meet/")).then((snapshot)=>{
          if(snapshot.exists()){
              messages=snapshot.val().messages;
              console.log(messages);
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
      
      var ele = document.getElementById("mes");
      if(ele.value!=="")
      {
        messages.push(account+ele.value);
        ele.value = "";
        console.log(messages);
        update(ref(db, "meet/"),{
            messages:messages,
        })
        .then(()=>{
          console.log(messages);
        })
        .catch((error)=>{
          console.log("failed"+error);
        });
      }
      else
      {
        alert("message cannot be empty");
      }
      
  }

  async function pushMeet(){
    if(messages.length===0)
    {
      alert("No coversation to store");
    }
    else{
    await functionName({ name:name, msg: messages, address: chatData.address })
    messages=empty;
    update(ref(db, "meet/"),{
        messages:empty,
    })
    .then(()=>{
      console.log(messages);
    })
    .catch((error)=>{
      console.log("failed"+error);
    });
  }
  }

  async function clearMeet(){
    messages = empty;
    await update(ref(db, "meet/"),{
      messages:empty,
  })
  .then(()=>{
    console.log(messages);
  })
  .catch((error)=>{
    console.log("failed"+error);
  });
  }
  
  function display(){
    var id= event.srcElement.id;
    const images = friendMsg[id].messages.map((item, i) => {
      return (
        <div class={Style.chatp}>

        <a>{item}</a>
      </div>
      );
    });
    setMeetData(images);
  }
  async function startMeet(){
    await update(ref(db, "startMeet/"),{
      started:true,
  })
}
  function clear(){
    const images = empty.map((item, i) => {
      return (
        <div class={Style.chat}>

        <a>{item}</a>
      </div>
      );
    });
    setMeetData(images);
  }

  return (
    <div className={Style.full}>
      {currentUserName && currentUserAddress ? (
        <div>
        <div className={Style.Chat_user_info}>
          <Image src={images.accountName} alt="image" width={70} height={70} />
          <div className={Style.Chat_user_info_box}>
            <h4>{currentUserName}</h4>
            <p className={Style.show}>{currentUserAddress}</p>
          </div>
      </div>
      
        <div className={Style.Chat_box_box}>
  
<div className={Style.Chat_box}>
    <div className={Style.Chat_box_left}>
    <button className={Style.but} onClick={clear}>
        Back      
    </button>
      {friendMsg.map((el, i) => (
        <div>
          {
            <button id={i} onClick={display}>
              {el.name}
            </button>
          }
        </div>
      ))}
    </div>
  </div>
  <div class={Style.chat}>
      {meetingData}
      </div>
          {meet?(
            <div>
              <Link
                  className={Style.NavBar_box_right_menu_items_link}
                  href='/Meet'
              >
                <button className={Style.but} style={{ height:40,width:400 }}>Join Meet</button>
                
              </Link>
            </div>
          ):(
            <div>
              <Link
                  className={Style.NavBar_box_right_menu_items_link}
                  href='/Meet'
              >
                <button className={Style.but} style={{ height:40,width:400 }} onClick={startMeet}>Start Meet</button>
              </Link>
            </div>
          )}

</div> 
      </div>
      ) : (
        ""
      )}
    </div>
   
  );
};

export default Chat;


{/* <div className={Style.Chat}>
{currentUserName && currentUserAddress ? (
  <div className={Style.Chat_user_info}>
    <Image src={images.accountName} alt="image" width={70} height={70} />
    <div className={Style.Chat_user_info_box}>
      <h4>{currentUserName}</h4>
      <p className={Style.show}>{currentUserAddress}</p>
    </div>
  </div>
) : (
  ""
)}

<div className={Style.Chat_box_box}>
  
<div className={Style.Chat_box}>
    <div className={Style.Chat_box_left}>
      {friendMsg.map((el, i) => (
        <div>
          {
            <button onClick={display()}>
              {el.name}
            </button>
          }
          <p key={i + 1}>
            {el.messages[0]}
            {""}
            {""}
          </p>
        </div>
      ))}
    </div>
  </div>
</div>
<Link
    className={Style.NavBar_box_right_menu_items_link}
    href='/Meet'
          >
            Start Meet
</Link>
</div> */}


{/* <div >
      

      <div className={Style.Chat_box_box}>
        
        {currentUserName && currentUserAddress ? (
          <div className={Style.Chat_box_send}>
            <div className={Style.Chat_box_send_img}>
              <Image src={images.smile} alt="smile" width={50} height={50} />
              <input
                type="text"
                id="mes"
                placeholder="type your message"
                onChange={(e) => setMessage(e.target.value)}
              />
              <Image src={images.file} alt="file" width={50} height={50} />
              {loading == true ? (
                <Loader />
              ) : (
                <Image
                  src={images.send}
                  alt="file"
                  width={50}
                  height={50}
                  onClick={updateMeetData}
                />
                
              )}
               {loading == true ? (
                <Loader />
              ) : (
                <Image
                  src={images.send}
                  alt="file"
                  width={50}
                  height={50}
                  onClick={pushMeet}
                />
                
              )}
              {loading == true ? (
                <Loader />
              ) : (
                <Image
                  src={images.send}
                  alt="file"
                  width={50}
                  height={50}
                  onClick={clearMeet}
                />
                
              )}
              <br />
              <input type="text" id='name' onChange={getNamefromUser} onPointerMove={getNamefromUser}/>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      <div class={Style.Ch}>
      <div class={Style.container}>
      <Suspense fallback={"loading"}>
      <Canvas
        camera={{ position: [1, 1, 1] }}
      >
        <ModelComponent1
          avatar={currentUserAddress}
        />
        <Ground/>
        
        <Lights/>
        <ModelComponent
          avatar={account}
        />
        
      </Canvas>
    </Suspense>
      </div>
    
      <div class={Style.chat}>
      {chat}
      </div>
      </div>
    </div> */}
  