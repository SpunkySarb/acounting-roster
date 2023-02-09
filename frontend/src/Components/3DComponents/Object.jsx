import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

const Object = () => {
  const knotRef = useRef();

  useFrame((state) => {
    if (!!knotRef.current) {
      knotRef.current.rotation.y += 0.01;
      knotRef.current.rotation.x += 0.01;
      knotRef.current.rotation.z += 0.01;
    }
  });

  return (
    <mesh ref={knotRef} position={[0, 8, 0]} scale={0.8}>
      <torusKnotGeometry args={[10, 3, 100, 200]} />
      <meshToonMaterial color="cyan" />
    </mesh>
  );
};

export default Object;
