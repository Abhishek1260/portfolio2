"use client"

import { useGLTF } from "@react-three/drei"
import { useLoader, useThree } from "@react-three/fiber"
import gsap from 'gsap'
import { TextureLoader } from 'three'
import * as THREE from 'three'
import { useStore } from "../store/store"


interface Pos {
    x: number
    y: number
    z: number
}

export const SceneTwo = ({ time }: { time: string }) => {



    const { scene } = useGLTF("/texture2.glb")
    const colorMap = useLoader(TextureLoader, `/texture2/${time}.jpg`)
    colorMap.encoding = THREE.sRGBEncoding
    colorMap.flipY = false

    const { camera } = useThree()



    scene.traverse((e) => {
        if (e instanceof THREE.Mesh) {
            e.material = new THREE.MeshBasicMaterial({ map: colorMap })
            if (e.name === "Cube947") {

            }
        }
    })

    const { setLookAt, toggleZoom, zoomed, setCameraPos, setDomain } = useStore((state: any) => ({ setDomain: state.setDomain, setLookAt: state.setLookAt, toggleZoom: state.toggleZoom, zoomed: state.zoomed, setCameraPos: state.setCameraPos }))


    return <>

        <primitive object={scene} onClick={(e: any) => {

            if (e.object.name === "Cube947" || e.object.name == "Cube951") {
                if (zoomed) {
                    return
                }
                if (e.object.name === "Cube947") {
                    setDomain("skills")
                }
                if (e.object.name === "Cube951") {
                    setDomain("project")
                }
                setCameraPos(camera.position.x, camera.position.y, camera.position.z)
                setLookAt(e.object.position.x, e.object.position.y, e.object.position.z)
                gsap.to(camera.position, { x: e.object.position.x, y: e.object.position.y, z: e.object.position.z, duration: 1, ease: "circ.in" }).eventCallback("onComplete", () => { toggleZoom(true) })
            }
        }} />


    </>

}