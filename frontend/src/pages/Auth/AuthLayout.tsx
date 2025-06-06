import { Stars } from "@react-three/drei";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import React, { Suspense, useRef } from "react";
import styled from "styled-components";
import * as THREE from "three";
import MoonTexture from "../../assets/Office/textures/Moon.png";
import { Outlet, useNavigate } from "react-router";
import { IoIosHome } from "react-icons/io";
import LogoSVG from "../../assets/Office/GlobeImage.svg";

const FullScreenCanvas = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #00040c;
  position: relative;
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 10;
  pointer-events: none; /* Allow canvas interactions below unless overridden */
`;

const MoonOrbit: React.FC = () => {
  const moon = useLoader(THREE.TextureLoader, MoonTexture);
  const smallSphereRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    const radius = 5;
    const speed = 1;
    const rotationSpeed = 0.5;

    if (smallSphereRef.current) {
      smallSphereRef.current.position.x =
        radius * Math.cos(elapsedTime * speed);
      smallSphereRef.current.position.y =
        radius * Math.sin(elapsedTime * speed);
      smallSphereRef.current.position.z =
        radius * Math.sin(elapsedTime * speed) * 0.7;
      smallSphereRef.current.rotation.y += rotationSpeed * 0.1;
    }
  });

  return (
    <mesh ref={smallSphereRef} scale={[1.2, 1.2, 1.2]}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial map={moon} />
    </mesh>
  );
};

const AuthLayout = () => {
  const navigate = useNavigate();

  return (
    <FullScreenCanvas>
      <Canvas>
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <pointLight color="#f6f3ea" position={[2, 0, 5]} intensity={15.2} />
          <Stars
            radius={300}
            depth={60}
            count={10000}
            factor={7}
            saturation={0}
            fade={true}
          />
          <MoonOrbit />
        </Suspense>
      </Canvas>

      <Overlay>
        {/* Home Icon + Tooltip */}
        <div
          className="absolute top-5 left-5 z-20 group pointer-events-auto"
          onClick={() => navigate("/")}
        >
          <div className="relative p-3 bg-white/20 rounded-full backdrop-blur-md shadow-lg transition-transform hover:scale-110 cursor-pointer">
            <IoIosHome className="text-white text-3xl sm:text-4xl transition-colors group-hover:text-blue-400" />
            <span className="absolute top-16 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-white/20 text-white backdrop-blur-md rounded shadow opacity-0 group-hover:opacity-100 transition-opacity z-30 whitespace-nowrap">
              Go to Home
            </span>
          </div>
        </div>

        {/* Centered Main Outlet Content */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-auto px-4">
          <div className="flex flex-col items-center text-center w-full max-w-md">
            <h1
              className="text-white text-3xl sm:text-4xl font-bold mb-6 drop-shadow-md relative text-center"
              style={{
                backgroundImage: `url(${LogoSVG})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "40% auto",
              }}
            >
              Universal Stationery Suppliers
            </h1>
            <div
              style={{ width: "100%", height: "auto", position: "relative" }}
              className="bg-white/8 backdrop-blur-xl rounded-l shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] max-w-md mx-auto overflow-hidden p-8  text-white"
            >
              <div
                style={{
                  position: "absolute",
                  top: "-50%",
                  left: "-25%",
                  width: "150%",
                  height: "200%",
                  background:
                    "linear-gradient(115deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.05) 60%, rgba(255,255,255,0.3) 100%)",
                  transform: "rotate(25deg)",
                  pointerEvents: "none",
                  filter: "blur(40px)",
                  animation: "shineAnimation 5s ease-in-out infinite",
                }}
              />
              <Outlet />
              <style>{`
                    @keyframes shineAnimation {
                      0% {
                        transform: rotate(25deg) translateX(-100%);
                        opacity: 0.3;
                      }
                      50% {
                        transform: rotate(25deg) translateX(100%);
                        opacity: 0.6;
                      }
                      100% {
                        transform: rotate(25deg) translateX(-100%);
                        opacity: 0.3;
                      }
                    }
              `}</style>
            </div>
          </div>
        </div>
      </Overlay>
    </FullScreenCanvas>
  );
};

export default AuthLayout;
