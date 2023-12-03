import { lazy, Suspense } from 'react'
import { Canvas, } from '@react-three/fiber'
import Ground from '../meta/Ground';
import Lights from '@/meta/Lights';
import Style from "../styles/avatar.module.css";
import { Filter, Friend } from '../chatComponents';

const ModelComponent = lazy(() => import("../meta/character"));

import { useContext } from 'react';
import { ChatAppContect } from '../Context/ChatAppContext';
export default function Home({ ...props }) {

  const {
    userName,
    avatar,
  } = useContext(ChatAppContect);
  return (
    <>
    <div className={Style.container}>
      
        <Canvas>
            <Lights/>
            <ModelComponent
              avatar={avatar}
            />
        </Canvas>
        <center><h1>{avatar}--{userName}</h1>
        </center>
    </div>
    
    </>
  )
}