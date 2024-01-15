"use client"

import { useGLTF } from "@react-three/drei"
import { useLoader } from "@react-three/fiber"
import { TextureLoader } from 'three'
import * as THREE from 'three'

export const SceneOne = ({ time }: { time: string }) => {

    const { scene } = useGLTF("/texture1.glb")
    const colorMap = useLoader(TextureLoader, `/texture1/${time}.jpg`)
    colorMap.flipY = false
    colorMap.encoding = THREE.sRGBEncoding

    scene.traverse((e) => {
        if (e instanceof THREE.Mesh) {
            e.material = new THREE.MeshBasicMaterial({ map: colorMap })
            // e.material = new THREE.ShaderMaterial(
            //     {
            //         uniforms: {
            //             texture1: {
            //                 value: colorMap1,
            //             },
            //             texture2: {
            //                 value: colorMap2,
            //             },
            //             factor: {
            //                 value: factor
            //             }
            //         },
            //         transparent: true,
            //         vertexShader: `

            //             varying vec2 vuv;

            //             void main() {
            //                 gl_Position = projectionMatrix * modelViewMatrix * vec4(position , 1.0);
            //                 vuv = uv;
            //             }

            //         ` ,
            //         fragmentShader: `

            //             uniform sampler2D texture1;
            //             uniform sampler2D texture2;
            //             uniform float factor;
            //             varying vec2 vuv;

            //             void main() {

            //                 vec4 color1 = texture2D(texture1 , vuv);
            //                 vec4 color2 = texture2D(texture2 , vuv);

            //                 vec4 colorMix = mix(color1 , color2 , factor);

            //                 gl_FragColor = colorMix;

            //             }

            //         `
            //     }
            // )
        }
    })



    return <>

        <primitive object={scene} />

    </>

}