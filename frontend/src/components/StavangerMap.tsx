'use client';

import { useRef, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Box } from '@react-three/drei';
import * as THREE from 'three';
import { AlertTriangle, MapPin, Users, Shield } from 'lucide-react';

// Stavanger neighborhood data with vote sentiment
interface NeighborhoodData {
  id: string;
  name: string;
  position: [number, number, number];
  votePercentage: number;
  sentiment: 'positive' | 'negative' | 'neutral';
  population: number;
  corruptionLevel: number;
}

// Mock data for Stavanger neighborhoods
const stavangerNeighborhoods: NeighborhoodData[] = [
  { id: '1', name: 'Centrum', position: [0, 0, 0], votePercentage: 78, sentiment: 'positive', population: 12000, corruptionLevel: 2 },
  { id: '2', name: 'Hillevåg', position: [-2, 0, 0], votePercentage: 65, sentiment: 'neutral', population: 8500, corruptionLevel: 4 },
  { id: '3', name: 'Madla', position: [2, 0, 0], votePercentage: 82, sentiment: 'positive', population: 6500, corruptionLevel: 1 },
  { id: '4', name: 'Tasta', position: [0, -2, 0], votePercentage: 45, sentiment: 'negative', population: 9500, corruptionLevel: 7 },
  { id: '5', name: 'Eiganes', position: [0, 2, 0], votePercentage: 91, sentiment: 'positive', population: 4200, corruptionLevel: 1 },
  { id: '6', name: 'Våland', position: [-1, 1, 0], votePercentage: 73, sentiment: 'positive', population: 3800, corruptionLevel: 3 },
  { id: '7', name: 'Kampen', position: [1, -1, 0], votePercentage: 58, sentiment: 'neutral', population: 5200, corruptionLevel: 5 },
  { id: '8', name: 'Sørmarka', position: [0, 3, 0], votePercentage: 88, sentiment: 'positive', population: 2100, corruptionLevel: 1 },
];

// Individual neighborhood block component
function NeighborhoodBlock({ data, onClick }: { data: NeighborhoodData; onClick: (data: NeighborhoodData) => void }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Get color based on sentiment and corruption level
  const getColor = () => {
    if (data.corruptionLevel > 5) return '#ef4444'; // Rebel red for high corruption
    if (data.sentiment === 'positive') return '#22c55e'; // People green
    if (data.sentiment === 'negative') return '#f59e0b'; // Warning orange
    return '#64748b'; // Neutral gray
  };

  // Get height based on vote percentage
  const height = (data.votePercentage / 100) * 2 + 0.5;

  useFrame((state) => {
    if (meshRef.current) {
      // Subtle animation for corruption hotspots
      if (data.corruptionLevel > 5) {
        meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 2) * 0.1;
      }
    }
  });

  return (
    <group position={data.position}>
      <Box
        ref={meshRef}
        args={[1, height, 1]}
        onClick={() => onClick(data)}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.1 : 1}
      >
        <meshStandardMaterial
          color={getColor()}
          transparent
          opacity={hovered ? 0.9 : 0.7}
          emissive={data.corruptionLevel > 5 ? '#ef4444' : '#000000'}
          emissiveIntensity={data.corruptionLevel > 5 ? 0.2 : 0}
        />
      </Box>
      
      {/* Neighborhood label */}
      <Text
        position={[0, height + 0.5, 0]}
        fontSize={0.3}
        color={hovered ? '#ffffff' : '#e2e8f0'}
        anchorX="center"
        anchorY="middle"
      >
        {data.name}
      </Text>
      
      {/* Vote percentage */}
      <Text
        position={[0, height + 0.8, 0]}
        fontSize={0.2}
        color={data.votePercentage > 70 ? '#22c55e' : data.votePercentage > 50 ? '#f59e0b' : '#ef4444'}
        anchorX="center"
        anchorY="middle"
      >
        {data.votePercentage}%
      </Text>
    </group>
  );
}

// Loading fallback component
function MapLoadingFallback() {
  return (
    <div className="w-full h-96 bg-corruption-800 rounded-lg flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-truth-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-corruption-300">Loading Stavanger's democratic pulse...</p>
      </div>
    </div>
  );
}

// Error boundary component
function MapErrorFallback({ error, retry }: { error: Error; retry: () => void }) {
  return (
    <div className="w-full h-96 bg-corruption-800 rounded-lg flex items-center justify-center">
      <div className="text-center max-w-md">
        <AlertTriangle className="w-12 h-12 text-rebel-400 mx-auto mb-4" />
        <h3 className="text-lg font-bold text-rebel-300 mb-2">Map Loading Failed</h3>
        <p className="text-corruption-300 mb-4">
          The 3D map couldn't load. This might be due to browser compatibility or network issues.
        </p>
        <button
          onClick={retry}
          className="bg-truth-500 hover:bg-truth-600 text-white px-4 py-2 rounded transition-colors"
        >
          Retry Loading Map
        </button>
      </div>
    </div>
  );
}

// Main map component with error handling
export default function StavangerMap() {
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<NeighborhoodData | null>(null);
  const [mapStats, setMapStats] = useState({
    totalVotes: 0,
    averageSentiment: 0,
    corruptionHotspots: 0
  });
  const [hasError, setHasError] = useState(false);
  const [isWebGLSupported, setIsWebGLSupported] = useState(true);

  // Check WebGL support and calculate map statistics
  useEffect(() => {
    // Check WebGL support for older browsers
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    setIsWebGLSupported(!!gl);

    const totalVotes = stavangerNeighborhoods.reduce((sum, n) => sum + n.votePercentage, 0);
    const averageSentiment = totalVotes / stavangerNeighborhoods.length;
    const corruptionHotspots = stavangerNeighborhoods.filter(n => n.corruptionLevel > 5).length;
    
    setMapStats({
      totalVotes: Math.round(totalVotes),
      averageSentiment: Math.round(averageSentiment),
      corruptionHotspots
    });
  }, []);

  const handleNeighborhoodClick = (data: NeighborhoodData) => {
    setSelectedNeighborhood(data);
  };

  const retryMap = () => {
    setHasError(false);
    setIsWebGLSupported(true);
  };

  // Show error fallback if WebGL is not supported or there's an error
  if (hasError) {
    return <MapErrorFallback error={new Error('Map failed to load')} retry={retryMap} />;
  }

  if (!isWebGLSupported) {
    return (
      <div className="w-full h-96 bg-corruption-800 rounded-lg flex items-center justify-center">
        <div className="text-center max-w-md">
          <MapPin className="w-12 h-12 text-corruption-500 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-corruption-300 mb-2">2D Map View</h3>
          <p className="text-corruption-400 mb-4">
            Your browser doesn't support 3D graphics. Here's a simplified view of Stavanger's democratic pulse.
          </p>
          <div className="grid grid-cols-2 gap-4 text-sm">
            {stavangerNeighborhoods.map((neighborhood) => (
              <div
                key={neighborhood.id}
                className="bg-corruption-700 rounded p-3 cursor-pointer hover:bg-corruption-600 transition-colors"
                onClick={() => handleNeighborhoodClick(neighborhood)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && handleNeighborhoodClick(neighborhood)}
                aria-label={`View details for ${neighborhood.name} neighborhood`}
              >
                <div className="font-semibold text-truth-300">{neighborhood.name}</div>
                <div className="text-corruption-300">{neighborhood.votePercentage}% votes</div>
                <div className={`text-xs ${
                  neighborhood.corruptionLevel > 5 ? 'text-rebel-300' : 'text-people-300'
                }`}>
                  Corruption: {neighborhood.corruptionLevel}/10
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-96 relative" role="img" aria-label="Interactive 3D map of Stavanger neighborhoods showing voting sentiment and corruption levels">
      {/* Map Statistics Overlay */}
      <div className="absolute top-4 left-4 z-10 bg-corruption-800/90 backdrop-blur-sm rounded-lg p-4 text-sm">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-people-400 rounded-full"></div>
            <span className="text-people-300">Avg Vote: {mapStats.averageSentiment}%</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-rebel-400 rounded-full"></div>
            <span className="text-rebel-300">Corruption Hotspots: {mapStats.corruptionHotspots}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-truth-400 rounded-full"></div>
            <span className="text-truth-300">Total Votes: {mapStats.totalVotes}</span>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="absolute top-4 right-4 z-10 bg-corruption-800/90 backdrop-blur-sm rounded-lg p-4 text-sm">
        <h4 className="font-semibold mb-2 text-truth-400">Legend</h4>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-people-400 rounded"></div>
            <span>Positive Sentiment</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-amber-500 rounded"></div>
            <span>Negative Sentiment</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-rebel-400 rounded animate-pulse"></div>
            <span>Corruption Alert</span>
          </div>
        </div>
      </div>

      {/* 3D Map Canvas with Suspense and error handling */}
      <Suspense fallback={<MapLoadingFallback />}>
        <Canvas 
          camera={{ position: [8, 8, 8], fov: 50 }}
          onError={() => setHasError(true)}
          style={{ background: 'transparent' }}
        >
          <ambientLight intensity={0.4} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -5]} intensity={0.5} color="#0ea5e9" />
          
          {/* Render neighborhood blocks */}
          {stavangerNeighborhoods.map((neighborhood) => (
            <NeighborhoodBlock
              key={neighborhood.id}
              data={neighborhood}
              onClick={handleNeighborhoodClick}
            />
          ))}
          
          {/* Ground plane */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
            <planeGeometry args={[20, 20]} />
            <meshStandardMaterial color="#1e293b" transparent opacity={0.3} />
          </mesh>
          
          <OrbitControls 
            enablePan={true} 
            enableZoom={true} 
            enableRotate={true}
            minDistance={5}
            maxDistance={20}
            enableDamping={true}
            dampingFactor={0.05}
          />
        </Canvas>
      </Suspense>

      {/* Neighborhood Details Panel */}
      {selectedNeighborhood && (
        <div className="absolute bottom-4 left-4 right-4 z-10 bg-corruption-800/95 backdrop-blur-sm rounded-lg p-4">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-lg font-bold text-truth-400">{selectedNeighborhood.name}</h3>
            <button
              onClick={() => setSelectedNeighborhood(null)}
              className="text-corruption-400 hover:text-white"
            >
              ✕
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <div className="text-corruption-400">Vote %</div>
              <div className="text-people-300 font-semibold">{selectedNeighborhood.votePercentage}%</div>
            </div>
            <div>
              <div className="text-corruption-400">Population</div>
              <div className="text-truth-300 font-semibold">{selectedNeighborhood.population.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-corruption-400">Sentiment</div>
              <div className={`font-semibold ${
                selectedNeighborhood.sentiment === 'positive' ? 'text-people-300' :
                selectedNeighborhood.sentiment === 'negative' ? 'text-rebel-300' :
                'text-corruption-300'
              }`}>
                {selectedNeighborhood.sentiment}
              </div>
            </div>
            <div>
              <div className="text-corruption-400">Corruption Level</div>
              <div className={`font-semibold ${
                selectedNeighborhood.corruptionLevel > 5 ? 'text-rebel-300' :
                selectedNeighborhood.corruptionLevel > 3 ? 'text-f59e0b' :
                'text-people-300'
              }`}>
                {selectedNeighborhood.corruptionLevel}/10
              </div>
            </div>
          </div>
          
          {/* Action buttons */}
          <div className="mt-4 flex gap-2">
            <button className="bg-rebel-500 hover:bg-rebel-600 text-white px-4 py-2 rounded text-sm transition-colors">
              Report Corruption
            </button>
            <button className="bg-truth-500 hover:bg-truth-600 text-white px-4 py-2 rounded text-sm transition-colors">
              View Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
