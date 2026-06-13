import React, { useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Text } from '@react-three/drei';
import * as THREE from 'three';
import { useWrappedStore } from '../../store/useWrappedStore';
import { ArrowLeft } from 'lucide-react';
import { GitHubRepo } from '../../services/github';

// Helper to assign colors based on language
const getLanguageColor = (lang: string | null) => {
  const colors: Record<string, string> = {
    JavaScript: '#f1e05a',
    TypeScript: '#3178c6',
    Python: '#3572A5',
    Java: '#b07219',
    'C++': '#f34b7d',
    Ruby: '#701516',
    Go: '#00ADD8',
    Rust: '#dea584',
    HTML: '#e34c26',
    CSS: '#563d7c',
  };
  return lang && colors[lang] ? colors[lang] : '#8b949e';
};

const Planet: React.FC<{ repo: GitHubRepo; index: number; total: number }> = ({ repo, index, total }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Distribute planets in orbits
  const orbitRadius = 10 + (index * 1.5); 
  const orbitSpeed = (0.5 / orbitRadius) + (repo.size / 1000000); // larger repos orbit faster
  const angleOffset = (index / total) * Math.PI * 2;
  
  // Size based on stars (min 0.5, max 3)
  const size = Math.min(3, Math.max(0.5, 0.5 + (repo.stargazers_count / 100)));
  const color = getLanguageColor(repo.language);

  // Moons based on forks (limit to 5 visual moons)
  const moonCount = Math.min(5, repo.forks_count);
  const moons = useMemo(() => Array.from({ length: moonCount }), [moonCount]);

  const [hovered, setHover] = useState(false);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    // Orbit around the center
    meshRef.current.position.x = Math.cos(t * orbitSpeed + angleOffset) * orbitRadius;
    meshRef.current.position.z = Math.sin(t * orbitSpeed + angleOffset) * orbitRadius;
    // Rotate the planet itself
    meshRef.current.rotation.y += 0.01;
  });

  return (
    <group>
      {/* Orbit Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[orbitRadius - 0.05, orbitRadius + 0.05, 64]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.05} side={THREE.DoubleSide} />
      </mesh>

      {/* The Planet */}
      <mesh 
        ref={meshRef}
        onPointerOver={(e) => { e.stopPropagation(); setHover(true); document.body.style.cursor = 'pointer'; }}
        onPointerOut={(e) => { e.stopPropagation(); setHover(false); document.body.style.cursor = 'default'; }}
      >
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={hovered ? 0.8 : 0.2} roughness={0.7} />
        
        {/* Label */}
        {hovered && (
          <Text 
            position={[0, size + 1, 0]} 
            fontSize={0.8} 
            color="white" 
            anchorX="center" 
            anchorY="middle"
            outlineWidth={0.1}
            outlineColor="#000000"
          >
            {repo.name} ({repo.stargazers_count}★)
          </Text>
        )}

        {/* Moons */}
        {moons.map((_, i) => (
          <mesh 
            key={i} 
            position={[
              Math.cos((i / moonCount) * Math.PI * 2) * (size + 1), 
              0, 
              Math.sin((i / moonCount) * Math.PI * 2) * (size + 1)
            ]}
          >
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshStandardMaterial color="#cccccc" />
          </mesh>
        ))}
      </mesh>
    </group>
  );
};

export const RepositoryGalaxy: React.FC = () => {
  const { repos, setStage, userData } = useWrappedStore();

  return (
    <div className="fixed inset-0 bg-black">
      {/* UI Overlay */}
      <div className="absolute top-0 left-0 right-0 p-6 z-10 flex justify-between items-start pointer-events-none">
        <button 
          onClick={() => setStage('dashboard')}
          className="pointer-events-auto flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg text-white hover:bg-white/20 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </button>
        <div className="text-right pointer-events-auto bg-black/50 p-4 rounded-xl backdrop-blur-md border border-white/10">
          <h2 className="text-xl font-bold text-white mb-1">Repository Galaxy</h2>
          <p className="text-gray-400 text-sm">{userData?.login}'s Open Source Universe</p>
          <div className="mt-4 flex flex-col gap-2 text-xs text-gray-500">
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-white block"></span> Planets = Repositories</div>
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-yellow-400 block"></span> Size = Stars</div>
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-gray-400 block"></span> Moons = Forks</div>
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-blue-400 block"></span> Color = Language</div>
          </div>
        </div>
      </div>

      <Canvas camera={{ position: [0, 20, 40], fov: 60 }}>
        <color attach="background" args={['#050505']} />
        <ambientLight intensity={0.5} />
        <pointLight position={[0, 0, 0]} intensity={2} color="#ffffff" />
        
        {/* Central Sun (The Developer) */}
        <mesh>
          <sphereGeometry args={[4, 64, 64]} />
          <meshBasicMaterial color="#ffffff" />
          <pointLight intensity={5} distance={100} color="#58a6ff" />
        </mesh>

        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

        {repos.map((repo, index) => (
          <Planet key={repo.id} repo={repo} index={index} total={repos.length} />
        ))}

        <OrbitControls 
          enablePan={true} 
          enableZoom={true} 
          enableRotate={true}
          autoRotate={false}
          maxDistance={100}
          minDistance={10}
        />
      </Canvas>
    </div>
  );
};
