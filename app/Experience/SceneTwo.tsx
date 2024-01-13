"use client"

import { useGLTF } from "@react-three/drei"
import { useLoader, useThree } from "@react-three/fiber"
import { useState } from "react"
import { TextureLoader } from 'three'
import * as THREE from 'three'


interface Pos {
    x: number
    y: number
    z: number
}

export const SceneTwo = ({ time }: { time: string }) => {



    const { scene, nodes } = useGLTF("/texture2.glb")
    const colorMap = useLoader(TextureLoader, `/texture2/${time}.jpg`)
    colorMap.encoding = THREE.sRGBEncoding
    colorMap.flipY = false

    const { camera } = useThree()

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


    const { raycaster } = useThree()


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

        <primitive object={scene} onClick={(e: any) => {
            if (window.innerWidth < 720) {
                return
            }
            if (e.object.name === "Cube947" || e.object.name == "Cube951") {
                console.log(e.object.position)
                camera.position.set(e.object.position.x, e.object.position.y, e.object.position.z + 5)
                camera.lookAt(e.object.position.x, e.object.position.y, e.object.position.z)
                console.log(e.object)
            }
        }} />

        {/* 
        <Html position={[position.x, y, position.z]}>
            <iframe src="https://portfolio-six-omega-17.vercel.app">

            </iframe>
        </Html> */}

    </>

}