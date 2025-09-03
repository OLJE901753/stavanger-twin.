'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, Shield, Clock, ExternalLink, TrendingUp, Users } from 'lucide-react';

interface CorruptionAlertProps {
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: string;
  votes?: number;
  verified?: boolean;
  category?: 'budget' | 'policy' | 'contract' | 'transparency' | 'election';
}

export default function CorruptionAlert({
  title,
  description,
  severity,
  timestamp,
  votes = 0,
  verified = true,
  category = 'transparency'
}: CorruptionAlertProps) {
  
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
          bg: 'bg-rebel-500/20',
          border: 'border-rebel-500',
          text: 'text-rebel-300',
          icon: 'text-rebel-400',
          badge: 'bg-rebel-500/30 text-rebel-300'
        };
      case 'medium':
        return {
          bg: 'bg-f59e0b/20',
          border: 'border-f59e0b',
          text: 'text-f59e0b',
          icon: 'text-f59e0b',
          badge: 'bg-f59e0b/30 text-f59e0b'
        };
      case 'low':
        return {
          bg: 'bg-corruption-500/20',
          border: 'border-corruption-500',
          text: 'text-corruption-300',
          icon: 'text-corruption-400',
          badge: 'bg-corruption-500/30 text-corruption-300'
        };
      default:
        return {
          bg: 'bg-corruption-500/20',
          border: 'border-corruption-500',
          text: 'text-corruption-300',
          icon: 'text-corruption-400',
          badge: 'bg-corruption-500/30 text-corruption-300'
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
        
        <button className="text-corruption-400 hover:text-white transition-colors">
          <ExternalLink className="w-4 h-4" />
        </button>
      </div>

      {/* Description */}
      <p className="text-sm text-corruption-300 mb-4 leading-relaxed">
        {description}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-corruption-400">
          <Clock className="w-3 h-3" />
          <span>{timestamp}</span>
        </div>
        
        {votes > 0 && (
          <div className="flex items-center gap-1 text-xs text-people-400">
            <Users className="w-3 h-3" />
            <span>{votes.toLocaleString()} votes</span>
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div className="mt-4 flex gap-2">
        <button className="flex-1 bg-rebel-500 hover:bg-rebel-600 text-white px-3 py-2 rounded text-xs font-medium transition-colors">
          Report Corruption
        </button>
        <button className="flex-1 bg-truth-500 hover:bg-truth-600 text-white px-3 py-2 rounded text-xs font-medium transition-colors">
          View Evidence
        </button>
      </div>

      {/* Blockchain verification indicator */}
      {verified && (
        <div className="mt-3 pt-3 border-t border-corruption-600">
          <div className="flex items-center gap-2 text-xs text-truth-400">
            <div className="w-2 h-2 bg-truth-400 rounded-full animate-pulse"></div>
            <span>Blockchain verified on Polygon</span>
          </div>
        </div>
      )}
    </motion.div>
  );
}
