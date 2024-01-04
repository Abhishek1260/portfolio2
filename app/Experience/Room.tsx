"use client"

import { OrbitControls, useGLTF } from "@react-three/drei"


export const Room = () => {

    const { scene } = useGLTF("/portfolio.glb")

    return <>

        <ambientLight color={"0xffffff"} intensity={10} />
        <pointLight position={[-5, 5, 0]} intensity={100} color={0xffffff} />
        <OrbitControls />
        <primitive object={scene} />

    </>
}