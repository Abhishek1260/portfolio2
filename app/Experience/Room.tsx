"use client"

import { OrbitControls, useGLTF } from "@react-three/drei"
import { useLoader } from "@react-three/fiber"
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import * as THREE from 'three'
import { useEffect } from "react"


export const Room = () => {

    const { scene } = useGLTF("/portfolio.glb")
    const colorMap = useLoader(TextureLoader, "/BakedTexture6.png")
    colorMap.flipY = false

    scene.traverse((e) => {
        if (e instanceof THREE.Mesh) {
            e.material = new THREE.MeshBasicMaterial({ map: colorMap })
        }
    })

    useEffect(() => {

    }, [])



    return <>
        <pointLight position={[-5, 5, 0]} intensity={100} color={"#ffffff"} />
        <OrbitControls />
        <primitive object={scene} />

    </>
}  