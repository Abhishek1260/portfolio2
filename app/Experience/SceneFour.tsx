"use client"

import { useGLTF } from "@react-three/drei"
import { useLoader, useThree } from "@react-three/fiber"
import { Html } from "@react-three/drei"
import { TextureLoader } from 'three'
import * as THREE from 'three'
import { useState } from "react"

export const SceneFour = ({ time }: { time: string }) => {

    const { camera } = useThree()
    const { scene } = useGLTF("/texture4.glb")
    const colorMap = useLoader(TextureLoader, `/texture4/${time}.jpg`)
    colorMap.encoding = THREE.sRGBEncoding
    colorMap.flipY = false

    scene.traverse((e) => {
        if (e instanceof THREE.Mesh) {
            e.material = new THREE.MeshBasicMaterial({ map: colorMap })
        }
    })

    const [matrix, setMatrix] = useState<THREE.Matrix4>()


    return <>

        <primitive object={scene} onClick={(e: any) => {
            if (window.innerWidth < 720) {
                return
            }
            if (e.object.name === "Plane011") {
                camera.position.set(e.object.position.x - 10, e.object.position.y, e.object.position.z)
                camera.lookAt(e.object.position.x, e.object.position.y, e.object.position.z)
                setMatrix(e.object.matrixWorld)

            }
        }} />


        {
            matrix ? <Html >
                <iframe src="https://portfolio-six-omega-17.vercel.app" />
            </Html> : null
        }


    </>

}