"use client"

import { useGLTF } from "@react-three/drei"
import { useFrame, useLoader, useThree } from "@react-three/fiber"
import { Html } from "@react-three/drei"
import { TextureLoader } from 'three'
import * as THREE from 'three'
import { useRef, useState } from "react"
import gsap from "gsap"
import { useStore } from "../store/store"

interface Pos {
    x: number
    y: number
    z: number
}

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

    const [pos, setPos] = useState<Pos>(
        {
            x: 0,
            y: 0,
            z: 0
        }
    )

    const htmlRef = useRef<HTMLDivElement>(null)

    const { setLookAt, toggleZoom, zoomed, setCameraPos, setDomain } = useStore((state: any) => ({ setDomain: state.setDomain, setLookAt: state.setLookAt, toggleZoom: state.toggleZoom, zoomed: state.zoomed, setCameraPos: state.setCameraPos }))


    return <>

        <primitive object={scene} onClick={(e: any) => {
            if (e.object.name === "Plane011") {
                setDomain("contact")
                setCameraPos(camera.position.x, camera.position.y, camera.position.z)
                setLookAt(e.object.position.x, e.object.position.y, e.object.position.z)
                gsap.to(camera.position, { x: e.object.position.x, y: e.object.position.y, z: e.object.position.z, duration: 1, ease: "circ.in" }).eventCallback("onComplete", () => { toggleZoom(true) })
            }
            if (e.object.name === "Plane") {
                setCameraPos(camera.position.x, camera.position.y, camera.position.z)
                setLookAt(-300, 0, 0)
                gsap.to(camera.position, { x: -300, y: 65, z: 0, duration: 1, ease: "circ.in" })
            }
        }} />




    </>

}