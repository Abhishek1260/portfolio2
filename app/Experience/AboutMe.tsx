import { Text, Text3D } from "@react-three/drei"
import { useThree } from "@react-three/fiber"
import gsap from 'gsap'
import { useStore } from "../store/store"

export const AboutMe = () => {

    const { camera } = useThree()
    const { cameraPos, setLookAt } = useStore((state: any) => ({ cameraPos: state.cameraPos, setLookAt: state.setLookAt }))

    return <>
        <Text position={[-100, 5, 0]} font="poppins" rotation={[0, Math.PI / 2, 0]} textAlign="justify" fillOpacity={0} strokeWidth={2} strokeColor={"white"} strokeOpacity={1} >

            I&apos;m Abhishek Bansal, a passionate computer science enthusiast with a knack{"\n"}
            for turning ideas into reality through code. From a young age, I&apos;ve been{"\n"}
            captivated by the world of technology, and my journey into the realm of programming{"\n"}
            began when I was just getting started with computers. Since then, I&apos;ve honed my skills in{"\n"}
            various domains, including web development, Android app development, iOS app development,{"\n"}
            and machine learning.{"\n"}
            My expertise lies in crafting robust, user-friendly applications that not only meet the needs{"\n"}
            of users butalso push the boundaries of what&apos;s possible. Whether it&apos;s creating intuitive{"\n"}
            user interfaces, optimizing backend performance, or delving into the complexities of machine{"\n"}
            learning algorithms, I thrive on the challenges that come with each project.{"\n"}
            Aside from coding, I&apos;m deeply interested in exploring the intersection of technology and creativity.{"\n"}
            I enjoy working with tools like Blender to create visually stunning 3D models and animations.{"\n"}
            The ability to blend technical prowess with artistic flair is something that fascinates{"\n"}
            me and keeps me motivated to learn and grow in both fields.{"\n"}

            When I&apos;m not coding or experimenting with new technologies, you can find{"\n"}
            me exploring the great outdoors, indulging in a good book, or tinkering with DIY projects.{"\n"}
            I believe in the power of continuous learning and am always seeking{"\n"}
            new opportunities to expand my horizons and contribute to meaningful projects that{"\n"}
            make a difference.
        </Text>

        <mesh position={[-100, -6, 0]} scale={[1, 2, 10]} onClick={() => {
            setLookAt(0, 2, 0)
            gsap.to(camera.position, { x: cameraPos.x, y: cameraPos.y, z: cameraPos.z, duration: 1, ease: "circ.in" })
        }}>
            <boxGeometry args={[1, 1, 1, 1, 1]} />
            <meshBasicMaterial color={"cyan"} />
        </mesh>

        <Text position={[-99, -6, 0]} color="blue" rotation={[0, Math.PI / 2, 0]}>
            Go Back
        </Text>

    </>
}