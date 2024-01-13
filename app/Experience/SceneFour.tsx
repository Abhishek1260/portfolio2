"use client"

import { useGLTF } from "@react-three/drei"
import { useLoader, useThree } from "@react-three/fiber"
import { Html } from "@react-three/drei"
import { TextureLoader } from 'three'
import * as THREE from 'three'
import { useRef, useState } from "react"

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

    const [object, setObject] = useState<THREE.Object3D>()

    return <>

        <primitive object={scene} onClick={(e: any) => {
            if (window.innerWidth < 720 || htmlRef == null || htmlRef.current == null || htmlRef != undefined) {
                return
            }
            if (e.object.name === "Plane011") {

                camera.position.set(e.object.position.x - 10, e.object.position.y, e.object.position.z)
                camera.lookAt(e.object.position.x, e.object.position.y, e.object.position.z)
                const box = new THREE.Box3()
                box.expandByObject(e.object)
                const size = box.getSize(new THREE.Vector3())
                setObject(e.object)


            }
        }} />


        {
            object ? <Html ref={htmlRef} >
                <iframe src="https://portfolio-six-omega-17.vercel.app" width="200px" height={"200px"} />
            </Html> : null
        }


    </>

}