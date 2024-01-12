"use client"

import { OrbitControls } from "@react-three/drei"
import { Suspense } from "react"
import { SceneOne } from "./SceneOne"
import { SceneFour } from "./SceneFour"


export const Room = () => {




    return <>
        <ambientLight intensity={100} color={"#ffffff"} />
        <OrbitControls />
        <Suspense>
            <SceneOne />
        </Suspense>
        <Suspense>
            <SceneFour />
        </Suspense>

    </>
}  