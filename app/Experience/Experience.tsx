"use client"

import { Canvas } from "@react-three/fiber"
import { Room } from "./Room"
import { Suspense } from "react"

export const Experience = () => {
    return <>

        <Canvas >

            <Suspense>
                <Room />
            </Suspense>

        </Canvas>

    </>
}