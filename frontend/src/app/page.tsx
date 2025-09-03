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
  BarChart3,
  Eye,
  Zap
} from 'lucide-react';

// Import our custom components (we'll create these next)
import StavangerMap from '@/components/StavangerMap';
import CityUpdate from '@/components/CityUpdate';

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
    <div className="min-h-screen bg-white text-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50 opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="text-blue-600">STAVANGER</span>{' '}
              <span className="text-green-600">TWIN</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto px-4">
              Digital twin platform for smart city governance. Empowering citizens, 
              enhancing transparency, and improving municipal services through data-driven insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
              <Link
                href="/vote"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold transition-all duration-300 text-sm sm:text-base"
              >
                <Vote className="inline-block mr-2" size={18} />
                Participate in Voting
              </Link>
              <Link
                href="/dossiers"
                className="bg-green-600 hover:bg-green-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold transition-all duration-300 text-sm sm:text-base"
              >
                <Eye className="inline-block mr-2" size={18} />
                View City Data
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Live Stats Dashboard */}
      <section className="py-8 sm:py-12 lg:py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-gray-800">
            City Statistics Dashboard
            <div className="text-sm sm:text-base text-gray-600 font-normal mt-2">
              Real-time insights into municipal services and citizen engagement
            </div>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white p-4 sm:p-6 rounded-lg text-center shadow-md"
            >
              <Users className="mx-auto mb-2 sm:mb-3 text-blue-600" size={24} />
              <div className="text-lg sm:text-2xl font-bold text-gray-800">{stats.totalVotes.toLocaleString()}</div>
              <div className="text-xs sm:text-sm text-gray-600">Votes Cast</div>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white p-6 rounded-lg text-center shadow-md"
            >
              <Shield className="mx-auto mb-3 text-green-600" size={32} />
              <div className="text-2xl font-bold text-gray-800">{stats.transparencyIndex}%</div>
              <div className="text-sm text-gray-600">Transparency Index</div>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white p-6 rounded-lg text-center shadow-md"
            >
              <TrendingUp className="mx-auto mb-3 text-blue-600" size={32} />
              <div className="text-2xl font-bold text-gray-800">{stats.peopleSatisfied}%</div>
              <div className="text-sm text-gray-600">Citizen Satisfaction</div>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white p-6 rounded-lg text-center shadow-md"
            >
              <AlertTriangle className="mx-auto mb-3 text-orange-600" size={32} />
              <div className="text-2xl font-bold text-gray-800">{stats.corruptionExposed}</div>
              <div className="text-sm text-gray-600">Issues Reported</div>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white p-6 rounded-lg text-center shadow-md"
            >
              <BarChart3 className="mx-auto mb-3 text-green-600" size={32} />
              <div className="text-2xl font-bold text-gray-800">{stats.activePoliticians}</div>
              <div className="text-sm text-gray-600">Active Representatives</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3D Stavanger Map Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">
              Interactive Stavanger Map
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore citizen engagement, service quality, and community feedback by neighborhood. 
              Discover how different areas of Stavanger are performing.
            </p>
          </div>
          
          {/* 3D Map Container */}
          <div className="bg-white rounded-lg p-4 shadow-lg border">
            <StavangerMap />
          </div>
        </div>
      </section>

      {/* City Updates */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Latest City Updates
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <CityUpdate
              title="New Parking Policy Implementation"
              description="The city council has implemented new parking fees based on citizen feedback. 82% of residents participated in the consultation process."
              severity="medium"
              timestamp="2 hours ago"
            />
            <CityUpdate
              title="Infrastructure Investment Announcement"
              description="€2.3M allocated to infrastructure improvements across the city. Public consultation sessions scheduled for next week."
              severity="low"
              timestamp="5 hours ago"
            />
            <CityUpdate
              title="Community Partnership Initiative"
              description="New partnership with local organizations to improve civic engagement. Digital platform integration planned for Q2."
              severity="low"
              timestamp="1 day ago"
            />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-6">
            Join Stavanger's Digital Transformation
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Your participation matters. Help shape the future of our city through digital engagement and transparent governance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/vote"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              <Zap className="inline-block mr-2" size={20} />
              Participate Now
            </Link>
            <Link
              href="/transparency"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              <Shield className="inline-block mr-2" size={20} />
              View City Reports
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}