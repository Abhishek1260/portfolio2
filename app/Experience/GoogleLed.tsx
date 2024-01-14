import { useGLTF } from "@react-three/drei"
import * as THREE from 'three'

export const GoogleLed = () => {

    const { scene } = useGLTF("/GoogleLed.glb")

    scene.traverse((e) => {
        if (e instanceof THREE.Mesh) {

        }
    })

    return <>

        <primitive object={scene} />

    </>
}