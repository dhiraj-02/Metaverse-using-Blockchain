import { lazy, Suspense } from 'react'
import { Canvas, } from '@react-three/fiber'
import Ground from '../meta/Ground';
import Lights from '@/meta/Lights';
import Style from "../styles/avatar.module.css";
import { Filter, Friend } from '../chatComponents';

const ModelComponent = lazy(() => import("../meta/Player"));
const ModelComponent1 = lazy(() => import("../meta/Player2"));


export default function Home({account }) {
  return (
    <>



    <div class={Style.container}>
    <Suspense fallback={"loading"}>
      <Canvas
        camera={{ position: [1, 1, 1] }}
      >
        <ModelComponent1
          account={account}
        />
        <Ground/>
        
        <Lights/>
        <ModelComponent/>
        
      </Canvas>
    </Suspense>
    </div>
 

    
    </>
  )
}