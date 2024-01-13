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
    const [radius, setRadius] = useState(40)

    const { camera } = useThree()

    const meshRef = useRef<Group<Object3DEventMap>>(null)

    const mouseDownHandler = () => {
        window.removeEventListener("mousemove", mouseMoveGenericFunction)
        window.addEventListener("mouseup", mouseUpHandler)
        window.addEventListener("mousemove", mouseMoveHandler)
    }

    const mouseUpHandler = () => {
        window.removeEventListener("mousemove", mouseMoveHandler)
        window.removeEventListener("mouseup", mouseUpHandler)
        window.addEventListener("mousemove", mouseMoveGenericFunction)
    }

    const mouseMoveHandler = (e: MouseEvent) => {
        const normalX = (e.clientX / window.innerWidth - 0.5) * 2
        const normalY = -1 * (e.clientY / window.innerHeight - 0.5) * 2
        sphere.theta = normalX * Math.PI / 8 + 3 * Math.PI / 4
        sphere.radius = normalY * 3 + radius
        const position = new THREE.Vector3().setFromSpherical(sphere)
        camera.position.set(position.x, position.y, position.z)
        camera.lookAt(0, 2, 0)
    }

    window.addEventListener("mousedown", mouseDownHandler)

    const touchMove = (e: TouchEvent) => {
        const normalX = (e.touches[0].clientX / window.innerWidth - 0.5) * 2
        const normalY = -1 * (e.touches[0].clientY / window.innerHeight - 0.5) * 2
        sphere.theta = normalX * Math.PI / 8 + 3 * Math.PI / 4
        sphere.radius = normalY * 3 + radius
        const position = new THREE.Vector3().setFromSpherical(sphere)
        camera.position.set(position.x, position.y, position.z)
        camera.lookAt(0, 2, 0)
    }

    const mouseMoveGenericFunction = (e: MouseEvent) => {
        if (meshRef == undefined || meshRef.current == undefined) return
        const normalX = (e.clientX / window.innerWidth - 0.5) * 2
        const normalY = -1 * (e.clientY / window.innerHeight - 0.5) * 2
        meshRef.current.position.set(-normalX * 0.5, -normalY * 0.5, meshRef.current.position.z)
    }

    window.addEventListener("mousemove", mouseMoveGenericFunction)

    const touchEnd = () => {
        window.removeEventListener("touchmove", touchMove)
        window.removeEventListener("touchcancel", touchEnd)
        window.addEventListener("mousemove", mouseMoveGenericFunction)
    }

    const touchStart = () => {
        window.addEventListener("touchmove", touchMove)
        window.addEventListener("touchcancel", touchEnd)
        window.removeEventListener("mousemove", mouseMoveGenericFunction)
    }

    window.addEventListener("touchstart", touchStart)

    useEffect(() => {
        if (window.innerWidth < 720) {
            sphere.radius = 50
            setRadius(50)
        }
        const position = new THREE.Vector3().setFromSpherical(sphere)
        camera.position.set(position.x, position.y, position.z)
        camera.lookAt(0, 2, 0)
    }, [])

    useEffect(() => {
        if (meshRef == undefined || meshRef.current == undefined) return
        if (window.innerWidth < 720) {
            meshRef.current.scale.set(0.5, 0.5, 0.5)
        }
    }, [meshRef])




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