"use client"

import { OrbitControls } from "@react-three/drei"
import { Suspense } from "react"
import { SceneOne } from "./SceneOne"
import { SceneFour } from "./SceneFour"
import { SceneTwo } from "./SceneTwo"
import { SceneThree } from "./SceneThree"
import { useFrame, useThree } from "@react-three/fiber"


export const Room = () => {

    useFrame(({ camera }) => {

        camera.position.set(-15, 13, 15)

    })


    return <>
        <ambientLight intensity={100} color={"#ffffff"} />
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

    </>
}  