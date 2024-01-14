"use client"

import { Canvas, useLoader } from "@react-three/fiber"
import { Room } from "./Room"
import { Suspense } from "react"
import { useStore } from "../store/store"
import { div } from "three/examples/jsm/nodes/Nodes.js"
import { closeSVG } from "../constants/icons"
import { AboutMe } from "./AboutMe"
import { Html, useProgress } from "@react-three/drei"

export const Experience = () => {

    const { zoomed, setGoBack, domain } = useStore((state: any) => ({ zoomed: state.zoomed, setGoBack: state.setGoBack, domain: state.domain }))

    return <>

        <Canvas camera={{ fov: 30 }} >

            <Suspense fallback={<Loader />} >
                <Room />
            </Suspense>



        </Canvas>

        {
            zoomed && domain != "skip" ? <div className="w-screen h-screen absolute top-0 left-0 bg-black">
                <div className="relative w-full h-full p-4">
                    <button className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-sm" onClick={() => {
                        setGoBack(true)
                    }}>
                        <span className="scale-x-75 scale-y-75">
                            {closeSVG}
                        </span>
                    </button>
                    <iframe className="w-full h-full" src={`https://portfolio-six-omega-17.vercel.app/${domain}`} />
                </div>
            </div >
                : null
        }

    </>
}

export const Loader = () => {

    const { progress } = useProgress()

    return <>

        <Html center>
            {
                progress
            } % loaded
        </Html>

    </>
}