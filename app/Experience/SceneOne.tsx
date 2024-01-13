"use client"

import { useGLTF } from "@react-three/drei"
import { useLoader } from "@react-three/fiber"
import { TextureLoader } from 'three'
import * as THREE from 'three'

export const SceneOne = ({ time }: { time: string }) => {

    const { scene } = useGLTF("/texture1.glb")
    const colorMap = useLoader(TextureLoader, `/texture1/${time}.jpg`)
    colorMap.encoding = THREE.sRGBEncoding
    colorMap.flipY = false

    scene.traverse((e) => {
        if (e instanceof THREE.Mesh) {
            e.material = new THREE.MeshBasicMaterial({ map: colorMap })
        }
    })



    return <>

        <primitive object={scene} />

    </>

}