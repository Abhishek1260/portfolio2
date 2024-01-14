import { useGLTF } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import * as THREE from 'three'

export const GoogleLed = () => {

    const { scene } = useGLTF("/GoogleLed.glb")

    scene.traverse((e) => {
        if (e instanceof THREE.Mesh) {
            e.material = new THREE.ShaderMaterial(
                {
                    uniforms: {
                        uTime: {
                            value: 0.0,
                        },
                        uOffset: {
                            value: Math.random() * 100
                        }
                    },
                    transparent: true,
                    vertexShader: `
                        varying vec2 vuv;    

                        void main() {
                            vec4 modelPosition = modelMatrix * vec4(position , 1.0);
                            vec4 viewModel = viewMatrix * modelPosition;
                            vec4 projectionView = projectionMatrix * viewModel;
                            gl_Position = projectionView;

                            vuv = uv;
                        }

                    ` ,
                    fragmentShader: `
                        varying vec2 vuv;
                        uniform float uTime;
                        uniform float uOffset;

                        vec3 hsl2rgb(vec3 c)
                        {
                            vec3 rgb = clamp( abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),6.0)-3.0)-1.0, 0.0, 1.0 );

                            return c.z + c.y * (rgb-0.5)*(1.0-abs(2.0*c.z-1.0));
                        }
                        
                        void main() {
                            vec2 uv = vuv;
                            uv -= vec2(0.5);
                            float alpha = 1.0 - step(0.3 , pow((pow(uv.x , 2.0) + pow(uv.y , 2.0)), 0.5));
                            gl_FragColor = vec4(hsl2rgb(vec3(mod((uTime + uOffset) , 360.0) , 0.5 , 0.5)) , alpha);
                        }    

                    `
                }
            )
        }
    })

    useFrame(({ clock }) => {

        scene.traverse((e) => {
            if (e instanceof THREE.Mesh) {
                e.material.uniforms.uTime.value = clock.getElapsedTime() * 0.7
            }
        })

    })

    return <>

        <primitive object={scene} />

    </>
}