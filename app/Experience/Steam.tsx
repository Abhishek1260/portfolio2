import { useGLTF } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useControls } from "leva"
import * as THREE from 'three'

export const Steam = () => {

    const { scene } = useGLTF("/steam.glb")


    scene.traverse((e) => {

        if (e instanceof THREE.Mesh) {
            e.material = new THREE.ShaderMaterial(
                {
                    uniforms: {
                        scale: {
                            value: new THREE.Vector2(30, 4.5)
                        },
                        uTime: {
                            value: 0.0
                        },
                        uTimeFreq: {
                            value: 0.1
                        }
                    },
                    side: THREE.DoubleSide,
                    vertexShader: `
                            varying vec2 vUv;

                            void main() {
                                vec4 modelPosition = modelMatrix * vec4(position , 1.0);
                                vec4 viewPosition = viewMatrix * modelPosition;
                                vec4 projectionPosition = projectionMatrix * viewPosition;
                                gl_Position = projectionPosition;

                                vUv = uv;
                            }
                    
                    ` ,
                    transparent: true,
                    fragmentShader: `

                    vec2 fade(vec2 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}
                    vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}

                    float cnoise(vec2 P){
                    vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
                    vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
                    Pi = mod(Pi, 289.0); // To avoid truncation effects in permutation
                    vec4 ix = Pi.xzxz;
                    vec4 iy = Pi.yyww;
                    vec4 fx = Pf.xzxz;
                    vec4 fy = Pf.yyww;
                    vec4 i = permute(permute(ix) + iy);
                    vec4 gx = 2.0 * fract(i * 0.0243902439) - 1.0; // 1/41 = 0.024...
                    vec4 gy = abs(gx) - 0.5;
                    vec4 tx = floor(gx + 0.5);
                    gx = gx - tx;
                    vec2 g00 = vec2(gx.x,gy.x);
                    vec2 g10 = vec2(gx.y,gy.y);
                    vec2 g01 = vec2(gx.z,gy.z);
                    vec2 g11 = vec2(gx.w,gy.w);
                    vec4 norm = 1.79284291400159 - 0.85373472095314 * 
                        vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11));
                    g00 *= norm.x;
                    g01 *= norm.y;
                    g10 *= norm.z;
                    g11 *= norm.w;
                    float n00 = dot(g00, vec2(fx.x, fy.x));
                    float n10 = dot(g10, vec2(fx.y, fy.y));
                    float n01 = dot(g01, vec2(fx.z, fy.z));
                    float n11 = dot(g11, vec2(fx.w, fy.w));
                    vec2 fade_xy = fade(Pf.xy);
                    vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
                    float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
                    return 2.3 * n_xy;
                    }

                    varying vec2 vUv;
                    uniform vec2 scale;
                    uniform float uTime;

                    void main() {
                        vec2 uv = vUv * scale;
                        uv.y +=  uTime ;
                        float borderAlpha = min(vUv.x * 10.0 , ((1.0 - vUv.x) * 10.0));
                        borderAlpha = borderAlpha * vUv.y;
                        float noise = cnoise(uv);
                        noise = borderAlpha * noise;
                        gl_FragColor = vec4(0.8 , 0.8 , 0.8 , noise);
                    }
                    
                    `
                }
            )
        }
    })

    useFrame(({ clock }) => {
        const obj = scene.getObjectByName("Plane042")
        if (obj && obj instanceof THREE.Mesh) {
            obj.material.uniforms.uTime.value = clock.getElapsedTime()
        }
    })

    return <>

        <primitive object={scene} />

    </>



}