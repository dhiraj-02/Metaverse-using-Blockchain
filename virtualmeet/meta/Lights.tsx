import { useHelper } from "@react-three/drei";
import { useRef } from "react";
import { DirectionalLightHelper } from "three";

const Lights: React.FC =  () => {
    const lightRef = useRef<THREE.DirectionalLight>();
    useHelper(lightRef,DirectionalLightHelper,5,"red");

    return (
        <>
        <ambientLight intensity={0.4}/>
        {/* <directionalLight  position={[-10,10,-10]} castShadow /> */}
        <directionalLight  position={[70,30,58]} castShadow />
        </>
    );
};

export default Lights;

//<directionalLight  position={[0,30,-70]} castShadow />