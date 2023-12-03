import  { useEffect } from "react";
import 'regenerator-runtime/runtime';
import {useSpeechSynthesis} from 'react-speech-kit'
import SpeechRecognition, {useSpeechRecognition} from 'react-speech-recognition';
import Image from "next/image";
import { useRouter } from "next/router";
import Style from "../chatComponents/Friend/Chat/Chat.module.css";

//INTERNAL IMPORT
//import Style from "./Chat.module.css";
import { redirect } from 'next/navigation';
import images from "../assets";
import { converTime } from "../Utils/apiFeature";
import { Loader } from "../chatComponents/index";
import { ChatAppContect } from "../Context/ChatAppContext";
import React, { useState, useContext } from "react";

import { lazy, Suspense } from 'react'
import { Canvas, } from '@react-three/fiber'
import Ground from '../meta/Ground';
import Lights from '@/meta/Lights';

import {
  ChechIfWalletConnected,
  connectWallet,
  connectingWithContract,
} from "../Utils/apiFeature";

var messages = []
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


const ModelComponent = lazy(() => import("../meta/Player"));
const ModelComponent1 = lazy(() => import("../meta/Player2"));
const ModelComponent2 = lazy(() => import("../meta/Chair"));
const ModelComponent3 = lazy(() => import("../meta/Bench"));
const ModelComponent4 = lazy(() => import("../meta/DeskLaptop"));
const ModelComponent5 = lazy(() => import("../meta/DeskLaptop1"));
const ModelComponent6 = lazy(() => import("../meta/ReceptCounter"));
const ModelComponent7 = lazy(() => import("../meta/room"));
const ModelComponent8 = lazy(() => import("../meta/Tree"));
const ModelComponent9 = lazy(() => import("../meta/Table"));
const ModelComponent10 = lazy(() => import("../meta/Cap_boy"));
const ModelComponent11 = lazy(() => import("../meta/Player3"));
const ModelComponent12 = lazy(() => import("../meta/Player4"));
const ModelComponent13 = lazy(() => import("../meta/Player5"));
const ModelComponent14 = lazy(() => import("../meta/Player6"));
const ModelComponent15 = lazy(() => import("../meta/Player7"));
const ModelComponent16 = lazy(() => import("../meta/Player9"));


// var msg1 = new SpeechSynthesisUtterance();
const speechHandler1 = (msg) => {
  var ourText=msg;
  var msg1 = new SpeechSynthesisUtterance()
  msg1.text = ourText
  window.speechSynthesis.speak(msg1)
}

function TextToSpeech()
{
  const handleClick=()=>{
    var  text1="thanks";
    var value1=new SpeechSynthesisUtterance();
    value1.text=text1;
    window.SpeechSynthesis.speak(value1);
  }
  return(
    <button onClick={handleClick}>speak</button>
  )
 
}

function App1(ty) {
   var ourText=ty;
  const msg = new SpeechSynthesisUtterance()

  const speechHandler = (msg) => {
    msg.text = ourText
    window.speechSynthesis.speak(msg)
  }

  return (
    <div className='App'>
      
      {/* <input
        type='text'
        value={ourText}
        placeholder='Enter Text'
        onChange={(e) => setOurText(e.target.value)}
      /> */}
      <button className={Style.but} onClick={() => speechHandler(msg)}>SPEAK</button>
    </div>
  )
}


const dbref = ref(db);
    get(child(dbref,"meet/")).then((snapshot)=>{
        if(snapshot.exists()){
            message =  snapshot.val().messages;
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

    
var lt= 0;
var lt1=0;



const Meet = () => {
  //USTE STATE
  
  const {
    sendMessage,
    account,
    friendLists,
    readMessage,
    userName,
    avatar,
    loading,
    friendMsg,
    currentUserName,
    currentUserAddress,
    readUser,
  } = useContext(ChatAppContect);
  useEffect(()=>{
    alert("Meeting started with "+currentUserName);
  },[])
  
  const [message, setMessage] = useState("");
  const [meetName, setMeetName] = useState("");
  const [chatData, setChatData] = useState({
    name: "",
    address: "",
  });

  const [chat, setChat] = useState([]); 
  const router = useRouter();
  const [l,setl]=useState(chat.length);

  // const App=()=>{
  //   const{ transcript,listening,resetTranscript,browserSupportsSpeechRecognition}=useSpeechRecognition();
  //   if(!browserSupportsSpeechRecognition){return<span>Browser doesnot support</span>}
  
  // return(
  //   <div>
  //     <p>Microphone: {listening?'on':'off'}</p>
  //     <button onClick={SpeechRecognition.startListening}>Start</button>
  //     <button  onClick={SpeechRecognition.stopListening}>Stop</button>
  //     <button onClick={resetTranscript}>Reset</button>
  //     <p>{transcript}</p>
  //   </div>
  // )
  
  // }
  setInterval(() => {
    const dbref = ref(db);
    
  get(child(dbref,"meet/")).then((snapshot)=>{
      if(snapshot.exists()){
          snapshot.val().messages;
          console.log(snapshot.val().messages.length);
          console.log(lt);
          if(snapshot.val().messages.length>lt )
          {lt =snapshot.val().messages.length;
            if(account!=snapshot.val().messages[lt-1].substring(0,42))
            {speechHandler1(snapshot.val().messages[lt-1].substring(42,));}
          
          }
      }
      else
      {
        
        //console.log("no match");
      }
  })
  .catch((error)=>{
      console.log("failed"+error);
  });

        
}, 2000);

if(lt1==0)
{
  lt1=1;speechHandler1("Welcome to virtual Meet powered by blockchain");
}


  





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

  

  console.log(friendMsg);
// speechHandler1("Welcome to Virtual meet powered by blockchain");
  async function getInitialChat(){
    const dbref = ref(db);
      await get(child(dbref,"meet/")).then((snapshot)=>{
          if(snapshot.exists()){
              messages=snapshot.val().messages;
              console.log("initial");
              // console.log(messages);
              // console.log(messages.length);
            
              //console.log(x);
              //console.log(z);
              console.log("in");
                const images = messages.map((item, i) => {
                      if(String(item).substring(0,42)==account)
                        return (
                          
                          <div class={Style.chat}>
                
                          <a>{String(item).substring(42,)}</a>
                          <div>{App1(String(item).substring(42,))}</div>
                        </div>
                        )
                        else
                        return (
                          
                          <div class={Style.chat1}>
                
                          <a>{String(item).substring(42,)}</a>
                          <div>{App1(String(item).substring(42,))}</div>          
                                        </div>
                        )
                      });
                      setChat(images);
          }
          else
          {
            messages  = empty;
            console.log("no match");
          }
      })
     
      
  }
  getInitialChat();
  


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
            messages = empty;
          }
      })
      .catch((error)=>{
          console.log("failed"+error);
      });
      
      
      var ele = document.getElementById("mes");
      var ele1=document.getElementById("mes1");
    

       if(ele.value!="" || ele1.value!="")
      {  
        if(ele.value!="")
        {messages.push(account+" - "+ele.value);ele.value = "";}
        else
        {messages.push(account+" - "+ele1.value);}
        //messages.push(account+message);
        
        console.log(messages);
        update(ref(db, "meet/"),{
            messages:messages,
        })
        .then(()=>{
          console.log(messages);
          
          const images = messages.map((item, i) => {
            var t;
            if(String(item).substring(0,42)==account)
            {
              t=true;
            }
            else
            {t=false;}
            
            return (
              <div>{t ? ( <div class={Style.chat}>
                
                <a>{String(item).substring(0,)}</a>
                
              </div>):( <div class={Style.chat1}>
                
                <a>{String(item).substring(0,)}</a>
              </div>)}</div>
              
            );
          });
          setChat(images);
              
                
              
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
  var n = "";
  function getNamefromUser()
  {
    n=document.getElementById('name').value;
    setMeetName(n);
    console.log(n);
  }
  async function pushMeet(){
    if(messages.length===0 )
    {
      alert("No coversation to store or no name for meeting provied");
    }
    else if(meetName.length==0)
    {
      alert("No Name");
    }
    else{
      try {
        // if (msg || address) return setError("Please Type your Message");
  
        const contract = await connectingWithContract();
        const addMessage = await contract.sendMessage(currentUserAddress, meetName, messages);
        alert("Meeting saved into blockchain successfully");
        endMeet();
        //router.push('/');
        
        
      } catch (error) {
        console.log(error);
      }
    
    messages=empty;
    remove(ref(db, "meet/"))
  }
  }
  
  function clearMeet(){
    
    remove(ref(db, "meet/"))
    console.log("cleared");
    messages = empty;
    alert("You are ending Meet without pushing to blockchain");
    endMeet();
    //router.push('/');
  
  }

  var id = setInterval(() => {
    ended();
  }, 5000);

  async function ended(){
    const dbref = ref(db);
      await get(child(dbref,"startMeet/")).then((snapshot)=>{
      if(snapshot.exists()){
          if(snapshot.val().started==false)
          {
            clearInterval(id);
            alert("Meeting Ended");
            router.push('/');
          }
      }
    });
  }
  
  
  function display(){
    console.log("in");
  }
  //console.log(currentUserAddress, account);

  async function endMeet(){
    await update(ref(db, "startMeet/"),{
      started:false,
  })
}
const{ transcript,listening,resetTranscript,browserSupportsSpeechRecognition}=useSpeechRecognition();
  if(!browserSupportsSpeechRecognition){return<span>Browser doesnot support</span>}

 



  return (
    
    <div >
      
      
      <div className={Style.Chat_box_box}>
        
        {currentUserName && currentUserAddress ? (
          <div className={Style.Chat_box_send}>
            <div className={Style.Chat_box_send_img}>
              <Image src={images.smile} alt="smile" width={30} height={30} />
        
      <div style={{ color: 'black', border:10,display:"flex" }}>
    <div>{App1("Welcome to Virtual meet")}</div> 
  

     <input
                type="text"
                id="mes"
                placeholder="type your message"
                onChange={(e) => {setMessage(e.target.value);}}
                style={{ height:40,width:400,display:"inline" }}
              />  
<div style={{marginLeft:30}}>
{listening ? <p style={{fontFamily:"serif",color:"red"}}>Microphone ON</p>:<p style={{fontFamily:"monospace",color:"black"}}>Microphone OFF</p>}
</div>
{/* <p style={{fontFamily:"cursive"}}>Microphone: {listening ?'on':'off'}</p> */}
      {/* <button onClick={SpeechRecognition.startListening}>Start</button> */}
      <div style={{ display:"inline" ,width:100}}>
      <Image
                  src={images.mic2}
                  alt="file"
                  width={30}
                  height={30}
                  onClick={SpeechRecognition.startListening}
                />
          <Image
                  src={images.stop}
                  alt="file"
                  width={30}
                  height={30}
                  onClick={SpeechRecognition.stopListening}
                />
                 <Image
                  src={images.reset}
                  alt="file"
                  width={30}
                  height={30}
                  onClick={resetTranscript}
                />
              </div>
      {/* <button  onClick={SpeechRecognition.stopListening}>pause</button> */}
      {/* <button onClick={resetTranscript}>Reset</button> */}
      {/* <p>{transcript}</p> */}
      <input  id="mes1" value={transcript} style={{ height:40,width:400 ,display:"flex"}}/>
      </div>
   
              {/* <input
                type="text"
                id="mes"
                placeholder="type your message"
                onChange={(e) => setMessage(e.target.value)}
              /> */}

              {/* <div>{App()}</div> */}

            

              {/* <Image src={images.file} alt="file" width={50} height={50} /> */}
              
              {loading == true ? (
                <Loader />
              ) : (
                <Image
                  src={images.send}
                  alt="file"
                  width={30}
                  height={30}
                  onClick={updateMeetData}
                />
                
              )}
               {loading == true ? (
                <Loader />
              ) : (
                <Image
                  src={images.create}
                  alt="file"
                  width={30}
                  height={30}
                  onClick={pushMeet}
                />
                
              )}
              {loading == true ? (
                <Loader />
              ) : (
                <Image
                  src={images.clear}
                  alt="file"
                  width={30}
                  height={30}
                  onClick={clearMeet}
                />
                
              )}
              <br />
              <input type="text" id='name' onChange={getNamefromUser} onPointerMove={getNamefromUser} placeholder="Enter Meeting Name" style={{ height:40,width:200 ,display:"flex"}}/>
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
          avatar={currentUserName}
        />
        <Ground/>
        
        <Lights/>
        <ModelComponent
          avatar={avatar}
        />
        <ModelComponent2 
        />
        <ModelComponent3 
        /> 
        <ModelComponent4
        />
        <ModelComponent5
        /> 
        <ModelComponent6
        /> 
        <ModelComponent7
        /> 
        <ModelComponent8/>
        <ModelComponent9/>
        <ModelComponent10/>
        <ModelComponent11/>
        <ModelComponent12/>
        <ModelComponent13/>
        <ModelComponent14/>
        
        
        
        
      </Canvas>
    </Suspense>
      </div>
        <h3>Chat Window</h3>
      <div class={Style.chat}>
      {chat}
      </div>
      </div>
    </div>
  
  );
};

export default Meet;
