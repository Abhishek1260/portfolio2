import { Text, Text3D, useGLTF } from "@react-three/drei"
import { useLoader, useThree } from "@react-three/fiber"
import gsap from 'gsap'
import { useStore } from "../store/store"
import * as THREE from 'three'

export const AboutMe1 = ({ callback }: { callback: () => void }) => {
    const { scene } = useGLTF("/AboutMe1.glb")

    const { camera } = useThree()
    const { cameraPos, setLookAt, setRemoveMouseDown, toggleZoom } = useStore((state: any) => ({ toggleZoom: state.toggleZoom, cameraPos: state.cameraPos, setLookAt: state.setLookAt, setRemoveMouseDown: state.setRemoveMouseDown }))
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
                    let height = 65
                    if (window.innerWidth < 720) {
                        height = 100
                    }
                    setLookAt(-435, 0, 0)
                    gsap.to(camera.position, { x: -435, y: height, z: 0, duration: 1, ease: "circ.in" })
                }
                if (e.object.name == "Plane001") {
                    setLookAt(0, 2, 0)
                    gsap.to(camera.position, { x: cameraPos.x, y: cameraPos.y, z: cameraPos.z, duration: 1, ease: "circ.in" }).eventCallback("onComplete", () => { toggleZoom(false) })
                }
            }} />
        </group>



    </>
}