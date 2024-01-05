"use client"

import { OrbitControls, useGLTF } from "@react-three/drei"


export const Room = () => {

    const { scene } = useGLTF("/portfolio.glb")

    return <>
        <pointLight position={[-5, 5, 0]} intensity={100} color={"#ffffff"} />
        <OrbitControls />
        <primitive object={scene} />

    </>
}