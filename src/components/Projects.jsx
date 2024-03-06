import { Image, Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { animate, useMotionValue } from "framer-motion";
import { useState } from "react";
import { motion } from "framer-motion-3d";
import { atom, useAtom } from "jotai";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import * as THREE from "three";

const isMobile = window.innerWidth < 768;
export const projects = [
  {
    title: "Wupen",
    url: "http://www.wupen.org/",
    image: "projects/wupen.png",
    description:
      "Wupen is an international educational federation for urban planning students, facilitating studies and competition participation. It's the external portal for Academician Wu Zhiqiang's research team at Tongji University. ",
  },
  {
    title: "Notion Copy",
    url: "https://notion.liuyinze.online/",
    detail:
      "https://notion.liuyinze.online/preview/j571xdaz4vxyyz03941bhdytrh6ms4ea",
    image: "projects/notion.png",
    description:
      "The Fullstack Notion Clone project is a web application inspired by Notion, designed for efficient recording and sharing of information, showing my projects introduction ... ",
  },
  {
    title: "ImageLabel",
    url: "https://imagelabel.liuyinze.online",
    image: "projects/imageLabel.png",
    description:
      "ImageLabel efficiently annotates images and exports JSON files, serving as datasets for image recognition tasks ...",
  },
  {
    title: "Chat With Pdf",
    url: "https://imagelabel.liuyinze.online",
    image: "projects/chatWithPdf.png",
    description:
      "Utilizing the OpenAI interface, this project enables seamless interaction with PDF files, allowing users to engage in unrestricted conversations. ",
  },
  {
    title: "Super Admin",
    url: "https://imagelabel.liuyinze.online",
    image: "projects/superAdmin.png",
    description:
      "SuperAdmin is a template for CMS systems, featuring a variety of components and layouts for rapid CMS development. With responsive design and smooth user experience, it enables seamless navigation and operation.",
  },
  {
    title: "Sudoku",
    url: "https://imagelabel.liuyinze.online",
    image: "projects/sudoku.png",
    description:
      "Sudoku offers a vast collection of Sudoku puzzles to enjoy in your free time. Challenge yourself with puzzles of varying difficulty levels and indulge in the satisfying logic-solving experience.",
  },
  {
    title: "pathFind",
    url: "https://imagelabel.liuyinze.online",
    image: "projects/pathFind.png",
    description:
      "pathFind is a visualization tool showcasing various pathfinding algorithms. It serves as a valuable resource for studying different algorithms, aiding in algorithm comprehension and learning.",
  },
  {
    title: "PeerToPeer",
    url: "https://imagelabel.liuyinze.online",
    image: "projects/PeerToPeer.png",
    description:
      "PeerToPeer is a demo showcase of a WebRTC application, facilitating video calls between two users.",
  },
  {
    title: "AgoraChat",
    url: "https://imagelabel.liuyinze.online",
    image: "projects/AgoraChat.png",
    description:
      "AgoraChat is a demo showcase of a multi-user chat room built using the Agora SDK. It was developed as part of my learning journey with WebRTC technology.",
  },
  {
    title: "Weather",
    url: "https://imagelabel.liuyinze.online",
    image: "projects/Weather.png",
    description:
      "Weather is an application that displays weather based on current coordinates. It's my first project while learning Next.js.",
  },
];

const Project = (props) => {
  // const isMobile = window.innerWidth < 768;

  const { project, highlighted } = props;
  const [isHovered, setIsHovered] = useState(false);
  const background = useRef();
  const bgOpacity = useMotionValue(0.4);
  const textRef1 = useRef();
  const textRef2 = useRef();
  useEffect(() => {
    animate(bgOpacity, highlighted ? 0.7 : 0.4);
  }, [highlighted]);

  const clickItem = () => {
    window.open(project.url, "_blank");
  };

  useFrame(() => {
    background.current.material.opacity = bgOpacity.get();
    // if (ref) {
    //   ref.current.rotation.y += 0.01;
    // }
  });
  const handleHover = (node) => {
    gsap.to(node.current.scale, { x: 1.2, y: 1, z: 1, duration: 0.2 });
    node.current.color = new THREE.Color("#900C3F");
  };
  const handleHoverOut = (node, color) => {
    node.current.color = new THREE.Color(color);
    gsap.to(node.current.scale, { x: 1, y: 1, z: 1, duration: 0.2 });
    // 移出时恢复原大小动画
  };

  return (
    <motion.group {...props} position-y={0.5}>
      <mesh position-z={-0.001} ref={background}>
        <planeGeometry
          antialias="true"
          args={!isMobile ? [4, 3.5] : [2, 2]}
          transparent={true}
        />
        <meshBasicMaterial antialias="true" color="#F7F6E7" transparent />
      </mesh>
      <Image
        onPointerEnter={() => {
          console.log(213);
        }}
        scale={!isMobile ? [3.5, 2, 1] : [1.8, 1.07, 1]}
        url={project.image}
        toneMapped={false}
        position-y={!isMobile ? 0.65 : 0.4}
      />
      <Text
        onClick={() => {
          if (project.url) window.open(project.url, "_blank");
        }}
        antialias="true"
        color={"black"}
        ref={textRef1}
        onPointerOver={(e) => {
          setIsHovered(true);
          console.log(e);
          handleHover(textRef1);
        }}
        onPointerOut={(e) => {
          setIsHovered(false);
          handleHoverOut(textRef1, "black");
        }}
        maxWidth={2}
        anchorX={"left"}
        anchorY={"top"}
        fontSize={!isMobile ? 0.24 : 0.15}
        position={!isMobile ? [-1.8, -0.5, 0] : [-0.92, -0.25, 0]}
      >
        {project.title}
      </Text>
      <Text
        strokeWidth={0}
        lineHeight={1.3}
        maxWidth={!isMobile ? 3.6 : 1.8}
        maxHeight={!isMobile ? 3.6 : 1.8}
        color={"#1E212D"}
        strokeColor={"blue"}
        anchorX="left"
        anchorY="top"
        fontSize={!isMobile ? 0.12 : 0.08}
        // position={[-1.8, -0.8, 0]}
        position={!isMobile ? [-1.8, -0.8, 0] : [-0.92, -0.45, 0]}
      >
        {!isMobile
          ? project.description
          : project.description.slice(0, 120) + "..."}
      </Text>

      <Text
        ref={textRef2}
        color={"#E11D48"}
        maxWidth={2}
        anchorX="left"
        anchorY="top"
        fontSize={!isMobile ? 0.12 : 0.1}
        border={"1px solid black"}
        position={!isMobile ? [-1.8, -1.5, 0] : [-0.92, -0.82, 0]}
        onPointerOver={(e) => {
          handleHover(textRef2);
        }}
        onPointerOut={(e) => {
          handleHoverOut(textRef2, "#E11D48");
        }}
        onClick={() => {
          if (project.detail) window.open(project.detail, "_blank");
        }}
      >
        View Details
      </Text>
    </motion.group>
  );
};

export const currentProjectAtom = atom(Math.floor(3));

export const Projects = () => {
  const { viewport } = useThree();
  const [currentProject] = useAtom(currentProjectAtom);

  return (
    <group position-y={-viewport.height * 2 + 1}>
      {projects.map((project, index) => (
        <motion.group
          key={"project_" + index}
          position={[index * 2.5, 0, -3]}
          animate={{
            x: 0 + (index - currentProject) * `${!isMobile ? 4.5 : 2.5}`,
            y: currentProject === index ? -1 : -1.1,
            z: currentProject === index ? 1 : -3,
            rotateX: currentProject === index ? 0 : -Math.PI / 3,
            rotateZ: currentProject === index ? 0 : -0.1 * Math.PI,
          }}
        >
          <Project project={project} highlighted={index === currentProject} />
        </motion.group>
      ))}
    </group>
  );
};
