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
    detail:
      "https://notion.liuyinze.online/preview/j57dnrvhjhkj3exp3jftzm7xsd6mrdcg",
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
    detail:
      "https://notion.liuyinze.online/preview/j579g0vb1w9hgczapw3ew166ts6mr86r",
    image: "projects/imageLabel.png",
    description:
      "ImageLabel efficiently annotates images and exports JSON files, serving as datasets for image recognition tasks ...",
  },
  {
    title: "Chat With Pdf",
    url: "https://chatwithpdf.liuyinze.online",
    detail:
      "https://notion.liuyinze.online/preview/j57d02fgr6zxamnnheejna7ny56mrzfm",
    image: "projects/chatWithPdf.png",
    description:
      "Utilizing the OpenAI interface, this project enables seamless interaction with PDF files, allowing users to engage in unrestricted conversations. ",
  },
  {
    title: "Super Admin",
    url: "https://superadmin.liuyinze.online",
    detail:
      "https://notion.liuyinze.online/preview/j57ecf93qjp4f8hxeq5pzvn1zd6ms19f",
    image: "projects/superAdmin.png",
    description:
      "SuperAdmin is a template for CMS systems, featuring a variety of components and layouts for rapid CMS development. With responsive design and smooth user experience, it enables seamless navigation and operation.",
  },
  {
    title: "Sudoku",
    url: "https://sudoku.liuyinze.online",
    detail:
      "https://notion.liuyinze.online/preview/j57f7zaatrf9k6w3kh7mqtf3nx6mr3p8",
    image: "projects/sudoku.png",
    description:
      "Sudoku offers a vast collection of Sudoku puzzles to enjoy in your free time. Challenge yourself with puzzles of varying difficulty levels and indulge in the satisfying logic-solving experience.",
  },
  {
    title: "PathFind",
    url: "https://pathfind.liuyinze.online",
    detail:
      "https://notion.liuyinze.online/preview/j579stdxwk1jpr5c3mpe3tmvax6ms7p5",
    image: "projects/pathFind.png",
    description:
      "pathFind is a visualization tool showcasing various pathfinding algorithms. It serves as a valuable resource for studying different algorithms, aiding in algorithm comprehension and learning.",
  },
  {
    title: "PeerToPeer",
    url: "https://peertopeer.liuyinze.online",
    detail:
      "https://notion.liuyinze.online/preview/j57cmtfjdw5tey4gfpwj8z3hp16msfbc",
    image: "projects/PeerToPeer.png",
    description:
      "PeerToPeer is a demo showcase of a WebRTC application, facilitating video calls between two users.",
  },
  {
    title: "AgoraChat",
    url: "https://agorachat.liuyinze.online",
    detail:
      "https://notion.liuyinze.online/preview/j57b1k8jzv0pdsjcdhk1p8xsnd6msmn1",
    image: "projects/AgoraChat.png",
    description:
      "AgoraChat is a demo showcase of a multi-user chat room built using the Agora SDK. It was developed as part of my learning journey with WebRTC technology.",
  },
  {
    title: "Weather",
    url: "https://weather.liuyinze.online",
    detail:
      "https://notion.liuyinze.online/preview/j57ctdp8z27rb8pnzkwp0t5wcn6ms90t",
    image: "projects/Weather.png",
    description:
      "Weather is an application that displays weather based on current coordinates. It's my first project while learning Next.js.",
  },
  {
    title: "High-end Certification",
    url: "https://lyz-notion.vercel.app/preview/j571v24b2pwcymd5x5mqzthc2n6mrdpq",
    detail:
      "https://lyz-notion.vercel.app/preview/j571v24b2pwcymd5x5mqzthc2n6mrdpq",
    image: "projects/High-endFinance.png",
    description:
      "This is a Hybrid page module created during my work at Hithink RoyalFlush company, designed to conduct asset authentication for individuals interested in purchasing specific financial products in compliance with national regulations.",
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
        onClick={() => {
          if (project.url) window.open(project.url, "_blank");
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
        maxWidth={2.4}
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
