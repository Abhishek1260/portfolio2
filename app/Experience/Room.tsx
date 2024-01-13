"use client"

import { Suspense, useEffect, useRef, useState } from "react"
import { SceneOne } from "./SceneOne"
import { SceneFour } from "./SceneFour"
import * as THREE from 'three'
import { SceneTwo } from "./SceneTwo"
import { SceneThree } from "./SceneThree"
import { useFrame, useThree } from "@react-three/fiber"
import { Group, Object3DEventMap } from "three"
import { Float, Sky, Sparkles, Stars } from "@react-three/drei"
import { useStore } from "../store/store"
import gsap from 'gsap'


export const Room = () => {

    const [sphere, setShpere] = useState(new THREE.Spherical(40, - Math.PI / 3, 3 * Math.PI / 4))
    const [radius, setRadius] = useState(40)

    const [time, setTime] = useState("White")

    const { camera } = useThree()

    const { lookAt, setLookAt, zoomed, toggleZoom, goBack, setGoBack, cameraPos, setCameraPos } = useStore((state: any) => {
        return { lookAt: state.lookAt, setLookAt: state.setLookAt, zoomed: state.zoomed, toggleZoom: state.toggleZoom, goBack: state.goBack, setGoBack: state.setGoBack, cameraPos: state.cameraPos, setCameraPos: state.setCameraPos }
    })

    const meshRef = useRef<Group<Object3DEventMap>>(null)

    useEffect(() => {
        setGoBack(false)
        setLookAt(0, 2, 0)
        if (zoomed) {
            toggleZoom(false)
            gsap.to(camera.position, { x: cameraPos.x, y: cameraPos.y, z: cameraPos.z, duration: 0.5, ease: "circ.in" })

        }
    }, [goBack])

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
        if (zoomed) {
            setLookAt(0, 2, 0)
            toggleZoom(false)
        }
        const normalX = (e.clientX / window.innerWidth - 0.5) * 2
        const normalY = -1 * (e.clientY / window.innerHeight - 0.5) * 2
        sphere.theta = normalX * Math.PI / 8 + 3 * Math.PI / 4
        sphere.radius = normalY * 3 + radius
        const position = new THREE.Vector3().setFromSpherical(sphere)
        camera.position.set(position.x, position.y, position.z)
        camera.lookAt(lookAt.x, lookAt.y, lookAt.z)
    }

    window.addEventListener("mousedown", mouseDownHandler)

    const touchMove = (e: TouchEvent) => {
        if (zoomed) {
            setLookAt(0, 2, 0)
            toggleZoom(false)
        }
        const normalX = (e.touches[0].clientX / window.innerWidth - 0.5) * 2
        const normalY = -1 * (e.touches[0].clientY / window.innerHeight - 0.5) * 2
        sphere.theta = normalX * Math.PI / 8 + 3 * Math.PI / 4
        sphere.radius = normalY * 3 + radius
        const position = new THREE.Vector3().setFromSpherical(sphere)
        camera.position.set(position.x, position.y, position.z)
        camera.lookAt(lookAt.x, lookAt.y, lookAt.z)
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
        window.removeEventListener("mousemove", mouseMoveGenericFunction)
        window.addEventListener("touchmove", touchMove)
        window.addEventListener("touchcancel", touchEnd)
    }

    window.addEventListener("touchstart", touchStart)

    useFrame(() => {
        camera.lookAt(lookAt.x, lookAt.y, lookAt.z)

    })



    useEffect(() => {
        const date = new Date()
        const hour = date.getHours()
        if (hour >= 6 && hour < 14) {
            setTime("White")
        } else if (hour >= 14 && hour < 22) {
            setTime("Day")
        } else {
            setTime("Night")
        }
        if (window.innerWidth < 720) {
            sphere.radius = 50
            setRadius(50)
        }
        const position = new THREE.Vector3().setFromSpherical(sphere)
        camera.position.set(position.x, position.y, position.z)
        setCameraPos(position.x, position.y, position.z)
        camera.lookAt(0, 2, 0)
    }, [])

    useEffect(() => {
        if (meshRef == undefined || meshRef.current == undefined) return
        if (window.innerWidth < 720) {
            meshRef.current.scale.set(0.5, 0.5, 0.5)
        }
    }, [meshRef])




    return <>
        {
            time == "Night" ? <Stars /> : <Sky />
        }
        <group ref={meshRef}>
            <Suspense>
                <SceneOne time={time} />
            </Suspense>
            <Suspense>
                <SceneFour time={time} />
            </Suspense>
            <Suspense>
                <SceneTwo time={time} />
            </Suspense>
            <Suspense>
                <SceneThree time={time} />
            </Suspense>
        </group>

    </>
}  