'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Vote, 
  Users, 
  Shield, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle,
  MapPin,
  BarChart3,
  Eye,
  Zap
} from 'lucide-react';

// Import our custom components (we'll create these next)
import StavangerMap from '@/components/StavangerMap';
import PeoplePulse from '@/components/PeoplePulse';
import CorruptionAlert from '@/components/CorruptionAlert';

export default function Home() {
  const [stats, setStats] = useState({
    totalVotes: 1247,
    transparencyIndex: 94,
    activePoliticians: 23,
    corruptionExposed: 3,
    peopleSatisfied: 82
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        totalVotes: prev.totalVotes + Math.floor(Math.random() * 3),
        transparencyIndex: Math.min(100, prev.transparencyIndex + Math.random() * 0.1),
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-corruption-900 text-foreground">
      {/* Hero Section - The People's Revolution */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 corruption-bg opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-rebel-500">STAVANGER</span>{' '}
              <span className="text-truth-400">TWIN</span>
            </h1>
            <p className="text-xl md:text-2xl text-corruption-300 mb-8 max-w-3xl mx-auto">
              Digital democracy revolution. Empowering citizens, exposing corruption, 
              revolutionizing governance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/vote"
                className="bg-rebel-500 hover:bg-rebel-600 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 rebel-pulse"
              >
                <Vote className="inline-block mr-2" size={20} />
                Cast Your Vote
              </Link>
              <Link
                href="/dossiers"
                className="bg-truth-500 hover:bg-truth-600 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300"
              >
                <Eye className="inline-block mr-2" size={20} />
                Expose Corruption
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Live Stats Dashboard */}
      <section className="py-16 bg-corruption-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-people-400">
            People's Power in Real-Time
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-corruption-700 p-6 rounded-lg text-center people-glow"
            >
              <Users className="mx-auto mb-3 text-people-400" size={32} />
              <div className="text-2xl font-bold text-people-300">{stats.totalVotes.toLocaleString()}</div>
              <div className="text-sm text-corruption-300">Votes Cast</div>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-corruption-700 p-6 rounded-lg text-center"
            >
              <Shield className="mx-auto mb-3 text-truth-400" size={32} />
              <div className="text-2xl font-bold text-truth-300">{stats.transparencyIndex}%</div>
              <div className="text-sm text-corruption-300">Transparency Index</div>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-corruption-700 p-6 rounded-lg text-center"
            >
              <TrendingUp className="mx-auto mb-3 text-people-400" size={32} />
              <div className="text-2xl font-bold text-people-300">{stats.peopleSatisfied}%</div>
              <div className="text-sm text-corruption-300">People Satisfied</div>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-corruption-700 p-6 rounded-lg text-center"
            >
              <AlertTriangle className="mx-auto mb-3 text-rebel-400" size={32} />
              <div className="text-2xl font-bold text-rebel-300">{stats.corruptionExposed}</div>
              <div className="text-sm text-corruption-300">Corruption Exposed</div>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-corruption-700 p-6 rounded-lg text-center"
            >
              <BarChart3 className="mx-auto mb-3 text-truth-400" size={32} />
              <div className="text-2xl font-bold text-truth-300">{stats.activePoliticians}</div>
              <div className="text-sm text-corruption-300">Politicians Tracked</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3D Stavanger Map Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-truth-400">
              Interactive Stavanger Map
            </h2>
            <p className="text-corruption-300 max-w-2xl mx-auto">
              Explore vote distribution, sentiment analysis, and policy impact by neighborhood. 
              See where the people stand and where corruption hides.
            </p>
          </div>
          
          {/* 3D Map Container */}
          <div className="bg-corruption-800 rounded-lg p-4 shadow-2xl">
            <StavangerMap />
          </div>
        </div>
      </section>

      {/* Corruption Alerts */}
      <section className="py-16 bg-corruption-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-rebel-400">
            Latest Corruption Alerts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <CorruptionAlert
              title="Councilor X Ignores 82% Vote Against Fees"
              description="Despite overwhelming public opposition, Councilor X pushed through new parking fees. Blockchain verification shows 1,247 votes against."
              severity="high"
              timestamp="2 hours ago"
            />
            <CorruptionAlert
              title="Missing Transparency in Budget Allocation"
              description="€2.3M allocated to 'infrastructure' without public consultation. Citizens demand accountability."
              severity="medium"
              timestamp="5 hours ago"
            />
            <CorruptionAlert
              title="NGO Partnership Violation Exposed"
              description="Local civic group reports contract manipulation. Investigation ongoing with Polygon verification."
              severity="high"
              timestamp="1 day ago"
            />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-rebel-600 to-truth-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-6">
            Join the Digital Democracy Revolution
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Your voice matters. Your vote counts. Your transparency demands accountability.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/vote"
              className="bg-white text-rebel-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              <Zap className="inline-block mr-2" size={20} />
              Start Voting Now
            </Link>
            <Link
              href="/transparency"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-rebel-600 transition-colors"
            >
              <Shield className="inline-block mr-2" size={20} />
              View Transparency Report
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}