"use client"

import { Suspense, useEffect, useRef, useState } from "react"
import { SceneOne } from "./SceneOne"
import { SceneFour } from "./SceneFour"
import * as THREE from 'three'
import { SceneTwo } from "./SceneTwo"
import { SceneThree } from "./SceneThree"
import { useThree } from "@react-three/fiber"
import { Group, Object3DEventMap } from "three"
import { useControls } from "leva"
import { Float, Sky, Sparkles, Stars } from "@react-three/drei"

export const Room = () => {

    const [sphere, setShpere] = useState(new THREE.Spherical(40, - Math.PI / 3, 3 * Math.PI / 4))


    const { camera } = useThree()

    const meshRef = useRef<Group<Object3DEventMap>>(null)

    const mouseDownHandler = () => {
        window.addEventListener("mouseup", mouseUpHandler)
        window.addEventListener("mousemove", mouseMoveHandler)
    }

    const mouseUpHandler = () => {
        window.removeEventListener("mousemove", mouseMoveHandler)
        window.removeEventListener("mouseup", mouseUpHandler)
    }

    const mouseMoveHandler = (e: MouseEvent) => {
        const normalX = (e.clientX / window.innerWidth - 0.5) * 2
        const normalY = -1 * (e.clientY / window.innerHeight - 0.5) * 2
        sphere.theta = normalX * Math.PI / 8 + 3 * Math.PI / 4
        sphere.radius = normalY * 3 + 40
        const position = new THREE.Vector3().setFromSpherical(sphere)
        camera.position.set(position.x, position.y, position.z)
        camera.lookAt(0, 2, 0)
    }

    window.addEventListener("mousedown", mouseDownHandler)

    useEffect(() => {
        const position = new THREE.Vector3().setFromSpherical(sphere)
        camera.position.set(position.x, position.y, position.z)
        camera.lookAt(0, 2, 0)
    }, [])




    return <>
        <Sky />
        <group ref={meshRef}>
            <Suspense>
                <SceneOne />
            </Suspense>
            <Suspense>
                <SceneFour />
            </Suspense>
            <Suspense>
                <SceneTwo />
            </Suspense>
            <Suspense>
                <SceneThree />
            </Suspense>
        </group>

    </>
}  