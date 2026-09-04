import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, Float, Sparkles } from '@react-three/drei';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

function FloatingParticles() {
  const points = useMemo(() => {
    const positions = [];
    for (let i = 0; i < 180; i += 1) {
      positions.push(
        (Math.random() - 0.5) * 12,
        Math.random() * 6,
        (Math.random() - 0.5) * 12,
      );
    }
    return new Float32Array(positions);
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={points}
          count={points.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color="#82d9ff" size={0.05} transparent opacity={0.72} />
    </points>
  );
}

function Monitor({ position, rotation, accent = '#7dd3fc' }) {
  return (
    <group position={position} rotation={rotation}>
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[2.5, 1.5, 0.15]} />
        <meshStandardMaterial color="#111827" metalness={0.7} roughness={0.25} />
      </mesh>
      <mesh position={[0, 0, 0.08]}>
        <planeGeometry args={[2.15, 1.1]} />
        <meshStandardMaterial color="#0f172a" emissive={accent} emissiveIntensity={0.55} />
      </mesh>
      <mesh position={[0, -1.1, 0.05]} castShadow>
        <boxGeometry args={[2.8, 0.25, 0.5]} />
        <meshStandardMaterial color="#d1d5db" metalness={0.8} roughness={0.3} />
      </mesh>
    </group>
  );
}

function Terminal({ position, rotation, accent = '#7ae582' }) {
  return (
    <group position={position} rotation={rotation}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.8, 1.1, 1.1]} />
        <meshStandardMaterial color="#111827" metalness={0.8} roughness={0.25} />
      </mesh>
      <mesh position={[0, 0.12, 0.55]}>
        <boxGeometry args={[1.3, 0.6, 0.04]} />
        <meshStandardMaterial color="#0b1120" emissive={accent} emissiveIntensity={0.8} />
      </mesh>
    </group>
  );
}

function Shield({ position, rotation }) {
  return (
    <group position={position} rotation={rotation}>
      <mesh castShadow>
        <cylinderGeometry args={[1.15, 1.15, 0.22, 32]} />
        <meshStandardMaterial color="#0b1329" metalness={0.6} roughness={0.25} />
      </mesh>
      <mesh position={[0, 0, 0.16]}>
        <cylinderGeometry args={[0.82, 0.82, 0.12, 32]} />
        <meshStandardMaterial color="#80ffbe" emissive="#80ffbe" emissiveIntensity={0.7} />
      </mesh>
      <mesh position={[0, 0, 0.2]} rotation={[0, 0, Math.PI / 5]}>
        <torusGeometry args={[0.6, 0.08, 20, 64]} />
        <meshStandardMaterial color="#d0f2ff" emissive="#d0f2ff" emissiveIntensity={1.2} />
      </mesh>
    </group>
  );
}

function CharacterSilhouette() {
  return (
    <group position={[0, -0.7, 0]}>
      <mesh position={[0, 1.2, 0]} castShadow>
        <sphereGeometry args={[0.68, 32, 32]} />
        <meshStandardMaterial color="#1d1f23" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.2, 0]} castShadow>
        <capsuleGeometry args={[0.7, 1.6, 12, 24]} />
        <meshStandardMaterial color="#10151f" roughness={0.8} />
      </mesh>
      <mesh position={[0.2, -1.1, 0.3]} castShadow>
        <capsuleGeometry args={[0.2, 1.2, 6, 12]} />
        <meshStandardMaterial color="#141b26" roughness={0.8} />
      </mesh>
      <mesh position={[-0.2, -1.1, 0.3]} castShadow>
        <capsuleGeometry args={[0.2, 1.2, 6, 12]} />
        <meshStandardMaterial color="#141b26" roughness={0.8} />
      </mesh>
    </group>
  );
}

function FloatingNode({ position, color = '#a5f3fc', scale = 1 }) {
  return (
    <Float speed={2.4} rotationIntensity={1.4} floatIntensity={1.2} position={position}>
      <mesh scale={scale} castShadow>
        <icosahedronGeometry args={[0.32, 1]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} />
      </mesh>
    </Float>
  );
}

function SceneContent() {
  const sceneRef = useRef();

  useFrame((state) => {
    const { pointer, clock } = state;
    const t = clock.getElapsedTime();

    if (sceneRef.current) {
      sceneRef.current.rotation.y = THREE.MathUtils.lerp(sceneRef.current.rotation.y, pointer.x * 0.45, 0.05);
      sceneRef.current.rotation.x = THREE.MathUtils.lerp(sceneRef.current.rotation.x, pointer.y * 0.12, 0.05);
      sceneRef.current.position.y = Math.sin(t * 1.2) * 0.08;
    }
  });

  return (
    <group ref={sceneRef}>
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.8, 0]}>
        <circleGeometry args={[8, 64]} />
        <meshStandardMaterial color="#0b1220" metalness={0.65} roughness={0.9} />
      </mesh>

      <Monitor position={[-2.8, 0.8, -0.55]} rotation={[0.1, 0.55, 0]} accent="#7dd3fc" />
      <Monitor position={[2.5, 0.9, -0.8]} rotation={[0.08, -0.65, 0]} accent="#f4d35e" />
      <Terminal position={[-0.2, 0.75, -1.3]} rotation={[0, 0.2, 0]} accent="#7ae582" />
      <Shield position={[0, -0.9, 0.2]} rotation={[0, 0.4, 0]} />
      <CharacterSilhouette />

      <Float speed={2} rotationIntensity={0.8} floatIntensity={1.1} position={[0, 2.5, 0.6]}>
        <mesh castShadow>
          <torusKnotGeometry args={[0.62, 0.15, 96, 16]} />
          <meshStandardMaterial color="#b8f2ff" emissive="#b8f2ff" emissiveIntensity={0.8} />
        </mesh>
      </Float>

      <FloatingNode position={[-3.2, 1.9, 1.1]} color="#7dd3fc" scale={1.1} />
      <FloatingNode position={[3.3, 1.6, 1.5]} color="#9ae6b4" scale={0.9} />
      <FloatingNode position={[0, 3.1, -1.9]} color="#ffd166" scale={0.8} />
      <FloatingNode position={[-1.6, 2.9, -0.8]} color="#c084fc" scale={0.75} />

      <Sparkles count={80} scale={[8, 5, 8]} size={2.2} color="#dbeafe" />
      <ContactShadows position={[0, -1.75, 0]} opacity={0.5} scale={8} blur={2.4} far={3} />
    </group>
  );
}

export default function WorldScene() {
  const [webglReady, setWebglReady] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mobileQuery = window.matchMedia('(max-width: 760px), (pointer: coarse)');
    const testCanvas = document.createElement('canvas');
    const context = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');

    setIsMobile(mobileQuery.matches);
    setWebglReady(Boolean(context));

  }, []);

  const fallback = (
    <div className="scene-fallback" aria-label="Interactive developer workspace">
      <div className="fallback-grid" />
      <div className="fallback-orb fallback-orb-one" />
      <div className="fallback-orb fallback-orb-two" />
      <div className="fallback-terminal">&gt; system.ready</div>
      <div className="fallback-shield">JF</div>
    </div>
  );

  if (!webglReady) {
    return fallback;
  }

  return (
    <Canvas
      className="world-canvas"
      shadows={!isMobile}
      dpr={[1, isMobile ? 1 : 2]}
      gl={{ antialias: !isMobile, powerPreference: 'high-performance' }}
      fallback={fallback}
      onCreated={({ gl }) => {
        gl.domElement.addEventListener('webglcontextlost', (event) => {
          event.preventDefault();
          setWebglReady(false);
        });
      }}
      camera={{ position: [0, 1.4, 8], fov: 42 }}
    >
      <color attach="background" args={['#060b14']} />
      <fog attach="fog" args={['#060b14', 7, 16]} />
      <ambientLight intensity={1.3} color="#dfeafe" />
      <directionalLight position={[6, 6, 4]} intensity={1.8} castShadow shadow-mapSize={[1024, 1024]} />
      <pointLight position={[-3, 3, 3]} intensity={18} color="#7dd3fc" />
      <pointLight position={[3, 2, 2]} intensity={12} color="#f4d35e" />
      <SceneContent />
    </Canvas>
  );
}
