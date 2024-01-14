"use client"

import { useGLTF } from "@react-three/drei"
import { useFrame, useGraph, useLoader } from "@react-three/fiber"
import { useRef, useState } from "react"
import { TextureLoader } from 'three'
import * as THREE from 'three'

export const SceneThree = ({ time }: { time: string }) => {

    const { scene } = useGLTF("/texture3.glb")
    const colorMap = useLoader(TextureLoader, `/texture3/${time}.jpg`)
    colorMap.encoding = THREE.sRGBEncoding
    colorMap.flipY = false


    const ref = useRef()


    scene.traverse((e) => {
        if (e instanceof THREE.Mesh) {
            e.material = new THREE.MeshBasicMaterial({ map: colorMap })

        }
    })

    const [movement, setMovement] = useState(0)
    useFrame(() => {
        const obj = scene.getObjectByName("ChairHead")
        if (obj) {
            if (obj.rotation.y > 7 * Math.PI / 8 && movement == 1) {
                setMovement(0)
            } else if (obj.rotation.y < 2 * Math.PI / 8 && movement == 0) {
                setMovement(1)
            }

            if (movement == 1) {
                obj.rotation.set(0, obj.rotation.y + 0.01, 0)
            } else {
                obj.rotation.set(0, obj.rotation.y - 0.01, 0)
            }
        }
    })


    return <>

        <primitive object={scene} />

    </>

}