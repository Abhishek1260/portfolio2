"use client"

import { Suspense, useEffect, useRef } from "react"
import { SceneOne } from "./SceneOne"
import { SceneFour } from "./SceneFour"
import { SceneTwo } from "./SceneTwo"
import { SceneThree } from "./SceneThree"
import { useThree } from "@react-three/fiber"
import { Group, Object3DEventMap } from "three"

export const Room = () => {

    const { camera } = useThree()

    const meshRef = useRef<Group<Object3DEventMap>>(null)

    document.addEventListener("mousemove", (e) => {
        if (meshRef == null || meshRef.current == null) return
        const normalX = (e.clientX / window.innerWidth - 0.5) * 2
        meshRef.current.rotation.set(0, normalX * Math.PI / 8, 0)
    })

    useEffect(() => {
        camera.position.set(-15, 13, 15)
        camera.lookAt(0, 0, 0)
    }, [])


    return <>
        <ambientLight intensity={100} color={"#ffffff"} />
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