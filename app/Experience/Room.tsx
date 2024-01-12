"use client"

import { OrbitControls, useGLTF } from "@react-three/drei"
import { useLoader, useThree } from "@react-three/fiber"
import { TextureLoader } from 'three'
import * as THREE from 'three'
import { useEffect } from "react"


export const Room = () => {

    const { scene } = useGLTF("/portfolio.glb")
    const colorMap = useLoader(TextureLoader, "/Baked1.jpg")
    colorMap.encoding = THREE.sRGBEncoding
    colorMap.flipY = false

    scene.traverse((e) => {
        if (e instanceof THREE.Mesh) {
            e.material = new THREE.MeshBasicMaterial({ map: colorMap })
        }
    })

    useEffect(() => {

    }, [])



    return <>
        <ambientLight intensity={100} color={"#ffffff"} />
        <OrbitControls />
        <primitive object={scene} />

    </>
}  