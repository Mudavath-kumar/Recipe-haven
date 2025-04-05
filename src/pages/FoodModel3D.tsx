
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage } from "@react-three/drei";
import { Suspense } from "react";

const Donut = () => {
  return (
    <mesh>
      <torusGeometry args={[1.5, 0.7, 16, 32]} />
      <meshPhongMaterial color="#FF69B4" />
    </mesh>
  );
};

const FoodModel3D = () => {
  return (
    <div className="h-[90vh] w-full bg-black">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <Suspense fallback={null}>
          <Stage environment="sunset" intensity={0.5}>
            <Donut />
          </Stage>
          <OrbitControls autoRotate />
        </Suspense>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
      </Canvas>
      <div className="absolute top-4 left-4 text-white">
        <h1 className="text-3xl font-bold">Interactive 3D Food</h1>
        <p className="text-sm opacity-70">Drag to rotate • Scroll to zoom</p>
      </div>
    </div>
  );
};

export default FoodModel3D;
