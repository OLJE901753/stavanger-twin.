'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, Shield, Clock, ExternalLink, TrendingUp, Users } from 'lucide-react';

interface CityUpdateProps {
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: string;
  votes?: number;
  verified?: boolean;
  category?: 'budget' | 'policy' | 'contract' | 'transparency' | 'election';
}

export default function CityUpdate({
  title,
  description,
  severity,
  timestamp,
  votes = 0,
  verified = true,
  category = 'transparency'
}: CityUpdateProps) {
  
  const getSeverityColor = () => {
    switch (severity) {
      case 'critical':
        return {
          bg: 'bg-red-900/30',
          border: 'border-red-500',
          text: 'text-red-300',
          icon: 'text-red-400',
          badge: 'bg-red-500/30 text-red-300'
        };
      case 'high':
        return {
          bg: 'bg-orange-500/20',
          border: 'border-orange-500',
          text: 'text-orange-700',
          icon: 'text-orange-600',
          badge: 'bg-orange-500/30 text-orange-700'
        };
      case 'medium':
        return {
          bg: 'bg-yellow-500/20',
          border: 'border-yellow-500',
          text: 'text-yellow-700',
          icon: 'text-yellow-600',
          badge: 'bg-yellow-500/30 text-yellow-700'
        };
      case 'low':
        return {
          bg: 'bg-green-500/20',
          border: 'border-green-500',
          text: 'text-green-700',
          icon: 'text-green-600',
          badge: 'bg-green-500/30 text-green-700'
        };
      default:
        return {
          bg: 'bg-gray-500/20',
          border: 'border-gray-500',
          text: 'text-gray-700',
          icon: 'text-gray-600',
          badge: 'bg-gray-500/30 text-gray-700'
        };
    }
  };

  const getCategoryIcon = () => {
    switch (category) {
      case 'budget':
        return <TrendingUp className="w-4 h-4" />;
      case 'policy':
        return <Users className="w-4 h-4" />;
      case 'contract':
        return <Shield className="w-4 h-4" />;
      case 'election':
        return <Users className="w-4 h-4" />;
      default:
        return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const colors = getSeverityColor();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className={`${colors.bg} ${colors.border} border rounded-lg p-4 hover:shadow-lg transition-all duration-300`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-full ${colors.bg}`}>
            <AlertTriangle className={`w-5 h-5 ${colors.icon}`} />
          </div>
          <div>
            <h3 className={`font-semibold ${colors.text} text-sm`}>
              {title}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span className={`text-xs px-2 py-1 rounded ${colors.badge}`}>
                {severity.toUpperCase()}
              </span>
              {verified && (
                <div className="flex items-center gap-1 text-xs text-truth-400">
                  <Shield className="w-3 h-3" />
                  <span>Verified</span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <button className="text-gray-400 hover:text-gray-600 transition-colors">
          <ExternalLink className="w-4 h-4" />
        </button>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 mb-4 leading-relaxed">
        {description}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Clock className="w-3 h-3" />
          <span>{timestamp}</span>
        </div>
        
        {votes > 0 && (
          <div className="flex items-center gap-1 text-xs text-blue-600">
            <Users className="w-3 h-3" />
            <span>{votes.toLocaleString()} participants</span>
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div className="mt-4 flex gap-2">
        <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-xs font-medium transition-colors">
          Learn More
        </button>
        <button className="flex-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded text-xs font-medium transition-colors">
          Participate
        </button>
      </div>

      {/* Verification indicator */}
      {verified && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <div className="flex items-center gap-2 text-xs text-green-600">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Verified by city officials</span>
          </div>
        </div>
      )}
    </motion.div>
  );
}
