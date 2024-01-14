import { Text, Text3D, useGLTF } from "@react-three/drei"
import { useLoader, useThree } from "@react-three/fiber"
import gsap from 'gsap'
import { useStore } from "../store/store"
import * as THREE from 'three'

export const AboutMe1 = () => {
    const { scene } = useGLTF("/AboutMe1.glb")

    const { camera } = useThree()
    const { cameraPos, setLookAt } = useStore((state: any) => ({ cameraPos: state.cameraPos, setLookAt: state.setLookAt }))
    const colorMap = useLoader(THREE.TextureLoader, `/AboutMeTexture.jpg`)
    colorMap.encoding = THREE.sRGBEncoding
    colorMap.flipY = false



    scene.traverse((e) => {
        if (e instanceof THREE.Mesh) {
            e.material = new THREE.MeshBasicMaterial({ map: colorMap })
        }
    })


    return <>

        <group position={[-300, 0, 0]} rotation={[0, -Math.PI / 2, 0]} >
            <primitive object={scene} onClick={(e: any) => {
                if (e.object.name == "Plane") {
                    setLookAt(-435, 0, 0)
                    camera.position.set(-435, 65, 0)
                }
                if (e.object.name == "Plane001") {
                    setLookAt(0, 2, 0)
                    gsap.to(camera.position, { x: cameraPos.x, y: cameraPos.y, z: cameraPos.z, duration: 1, ease: "circ.in" })
                }
            }} />
        </group>



    </>
}