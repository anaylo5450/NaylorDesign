// src/components/ModelViewer.jsx
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Center, ContactShadows, useGLTF } from "@react-three/drei";

function GLB({ url }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

export default function ModelViewer({ url, bg = "#1c1c1c" }) {
  if (!url) return null;
  return (
    <Canvas camera={{ fov: 45, position: [2.5, 2, 3] }} onCreated={({ gl }) => gl.setClearColor(bg)} dpr={[1, 1.8]}>
      <ambientLight intensity={0.6} />
      <directionalLight intensity={1.0} position={[5, 5, 5]} />
      <directionalLight intensity={0.4} position={[-5, 2, -3]} />
      <Suspense fallback={null}>
        <Center top>
          <GLB url={url} />
        </Center>
      </Suspense>
      <ContactShadows position={[0, -0.6, 0]} opacity={0.4} blur={2.5} far={5} />
      <OrbitControls enablePan enableRotate enableZoom />
    </Canvas>
  );
}
