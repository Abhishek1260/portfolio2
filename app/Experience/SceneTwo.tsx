"use client"

import { Html, useGLTF } from "@react-three/drei"
import { useLoader } from "@react-three/fiber"
import { useControls } from "leva"
import { useState } from "react"
import { TextureLoader } from 'three'
import * as THREE from 'three'


interface Pos {
    x: number
    y: number
    z: number
}

export const SceneTwo = () => {



    const { scene } = useGLTF("/texture2.glb")
    const colorMap = useLoader(TextureLoader, "/Texture2.jpg")
    colorMap.encoding = THREE.sRGBEncoding
    colorMap.flipY = false

    const [pos, setPos] = useState<Pos>()

    // const { position, rotation, y } = useControls({
    //     position: {
    //         value: {
    //             x: 0,
    //             z: 0,
    //         },
    //         joystick: true,
    //     },
    //     rotation: {
    //         value: {
    //             x: 0,
    //             y: 0,
    //         },
    //         joystick: true
    //     },
    //     y: {
    //         value: pos ? pos.z : 0.0,
    //         min: 0,
    //         max: 30,
    //         step: 0.01
    //     }
    // })



    scene.traverse((e) => {
        if (e instanceof THREE.Mesh) {
            e.material = new THREE.MeshBasicMaterial({ map: colorMap })
            if (e.name === "Cube947") {
                if (pos) return
                setPos(
                    {
                        x: e.position.x,
                        y: e.position.y,
                        z: e.position.z + 0.01,
                    }
                )
            }
        }
    })



    return <>

        <primitive object={scene} />

        {/* 
        <Html position={[position.x, y, position.z]}>
            <iframe src="https://portfolio-six-omega-17.vercel.app">

            </iframe>
        </Html> */}

    </>

}