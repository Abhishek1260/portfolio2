import { Text, Text3D, useGLTF } from "@react-three/drei"
import { useLoader, useThree } from "@react-three/fiber"
import gsap from 'gsap'
import { useStore } from "../store/store"
import * as THREE from 'three'

export const AboutMe2 = ({ callback }: { callback: () => void }) => {
    const { scene } = useGLTF("/AboutMe2.glb")

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

        <group position={[-400, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
            <primitive object={scene} onClick={(e: any) => {
                console.log(e.object.name)
                if (e.object.name == "Plane002") {
                    let height = 65
                    if (window.innerWidth < 720) {
                        height = 100
                    }
                    gsap.to(camera.position, { x: -300, y: height, z: 0, duration: 1, ease: "circ.in" })
                    setLookAt(-300, 0, 0)
                }
                if (e.object.name == "Plane003") {
                    setLookAt(0, 2, 0)
                    gsap.to(camera.position, { x: cameraPos.x, y: cameraPos.y, z: cameraPos.z, duration: 1, ease: "circ.in" }).eventCallback("onComplete", () => { toggleZoom(false) })
                }
            }
            } />
        </group>



    </>
}