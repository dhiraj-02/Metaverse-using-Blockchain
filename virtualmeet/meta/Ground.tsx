
const Ground: React.FC =  () => {

    return (
        <>
        <mesh rotation-x={Math.PI * -0.5} receiveShadow>
          <planeGeometry args={[600,600]} />
          <meshStandardMaterial color={"#458745"} />
          {/* <meshStandardMaterial color={"6b5129"} /> */}
        </mesh>
        </>
    );
};

export default Ground;