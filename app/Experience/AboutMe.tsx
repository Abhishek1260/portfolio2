import { Text, Text3D, useGLTF } from "@react-three/drei"
import { useLoader, useThree } from "@react-three/fiber"
import gsap from 'gsap'
import { useStore } from "../store/store"
import * as THREE from 'three'
import { AboutMe1 } from "./AboutMe1"
import { AboutMe2 } from "./AboutMe2"

export const AboutMe = ({ callback }: { callback: () => void }) => {


    return <>

        <AboutMe1 callback={callback} />
        <AboutMe2 callback={callback} />


    </>
}