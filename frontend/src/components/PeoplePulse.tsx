'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Users, Shield } from 'lucide-react';

interface PulseItem {
  id: string;
  type: 'vote' | 'corruption' | 'transparency' | 'achievement';
  title: string;
  description: string;
  timestamp: string;
  impact: 'high' | 'medium' | 'low';
  verified: boolean;
}

// Mock data for people's pulse
const pulseData: PulseItem[] = [
  {
    id: '1',
    type: 'vote',
    title: '82% voted NO on parking fees',
    description: 'Councilor X ignored overwhelming public opposition',
    timestamp: '2 hours ago',
    impact: 'high',
    verified: true
  },
  {
    id: '2',
    type: 'corruption',
    title: 'Budget transparency violation exposed',
    description: '€2.3M allocated without public consultation',
    timestamp: '5 hours ago',
    impact: 'high',
    verified: true
  },
  {
    id: '3',
    type: 'transparency',
    title: 'Blockchain verification: 1,247 votes',
    description: 'All votes cryptographically verified on Polygon',
    timestamp: '1 day ago',
    impact: 'medium',
    verified: true
  },
  {
    id: '4',
    type: 'achievement',
    title: 'NGO partnership established',
    description: 'Local civic groups join transparency initiative',
    timestamp: '2 days ago',
    impact: 'medium',
    verified: true
  },
  {
    id: '5',
    type: 'vote',
    title: 'New policy proposal: Green energy',
    description: 'Citizens can now vote on renewable energy projects',
    timestamp: '3 days ago',
    impact: 'low',
    verified: true
  }
];

export default function PeoplePulse() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // Rotate through pulse items
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % pulseData.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case 'vote':
        return <Users className="w-4 h-4" />;
      case 'corruption':
        return <AlertTriangle className="w-4 h-4" />;
      case 'transparency':
        return <Shield className="w-4 h-4" />;
      case 'achievement':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <TrendingUp className="w-4 h-4" />;
    }
  };

  const getColor = (type: string, impact: string) => {
    if (type === 'corruption') return 'text-rebel-400';
    if (type === 'vote' && impact === 'high') return 'text-people-400';
    if (type === 'transparency') return 'text-truth-400';
    if (type === 'achievement') return 'text-people-400';
    return 'text-corruption-300';
  };

  const getBackgroundColor = (type: string, impact: string) => {
    if (type === 'corruption') return 'bg-rebel-500/20';
    if (type === 'vote' && impact === 'high') return 'bg-people-500/20';
    if (type === 'transparency') return 'bg-truth-500/20';
    if (type === 'achievement') return 'bg-people-500/20';
    return 'bg-corruption-500/20';
  };

  const currentItem = pulseData[currentIndex];

  return (
    <div className="w-full bg-corruption-800 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-truth-400 flex items-center gap-2">
          <div className="w-2 h-2 bg-truth-400 rounded-full animate-pulse"></div>
          People's Pulse
        </h3>
        <div className="text-xs text-corruption-400">
          {currentIndex + 1} of {pulseData.length}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentItem.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
          className={`p-4 rounded-lg ${getBackgroundColor(currentItem.type, currentItem.impact)}`}
        >
          <div className="flex items-start gap-3">
            <div className={`p-2 rounded-full ${getBackgroundColor(currentItem.type, currentItem.impact)}`}>
              {getIcon(currentItem.type)}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h4 className={`font-semibold ${getColor(currentItem.type, currentItem.impact)}`}>
                  {currentItem.title}
                </h4>
                {currentItem.verified && (
                  <div className="flex items-center gap-1 text-xs text-truth-400">
                    <Shield className="w-3 h-3" />
                    <span>Verified</span>
                  </div>
                )}
              </div>
              
              <p className="text-sm text-corruption-300 mb-2">
                {currentItem.description}
              </p>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-corruption-400">
                  {currentItem.timestamp}
                </span>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-1 rounded ${
                    currentItem.impact === 'high' ? 'bg-rebel-500/30 text-rebel-300' :
                    currentItem.impact === 'medium' ? 'bg-f59e0b/30 text-f59e0b' :
                    'bg-corruption-500/30 text-corruption-300'
                  }`}>
                    {currentItem.impact} impact
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Progress indicator */}
      <div className="mt-4 flex gap-1">
        {pulseData.map((_, index) => (
          <div
            key={index}
            className={`h-1 flex-1 rounded ${
              index === currentIndex ? 'bg-truth-400' : 'bg-corruption-600'
            }`}
          />
        ))}
      </div>

      {/* Quick stats */}
      <div className="mt-4 grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-lg font-bold text-people-300">
            {pulseData.filter(item => item.type === 'vote').length}
          </div>
          <div className="text-xs text-corruption-400">Vote Updates</div>
        </div>
        <div>
          <div className="text-lg font-bold text-rebel-300">
            {pulseData.filter(item => item.type === 'corruption').length}
          </div>
          <div className="text-xs text-corruption-400">Corruption Alerts</div>
        </div>
        <div>
          <div className="text-lg font-bold text-truth-300">
            {pulseData.filter(item => item.verified).length}
          </div>
          <div className="text-xs text-corruption-400">Verified Items</div>
        </div>
      </div>
    </div>
  );
}
