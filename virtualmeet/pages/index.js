import React, { useEffect, useState, useContext } from "react";
import 'regenerator-runtime/runtime';

//INTERNAL IMPORT
// import { ChatAppContect } from "../Context/ChatAppContext";
import { Filter, Friend } from "../chatComponents/index";
import Home from "./Home";

const ChatApp = () => {
  // const {} = useContext(ChatAppContect);
  return (
    <div>
      <Filter/>
      <Friend/>
      
    </div>
  );
};

export default ChatApp;
