'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  WifiOff, 
  RefreshCw, 
  AlertTriangle, 
  Shield, 
  Users, 
  Vote,
  Eye,
  FileText,
  CheckCircle,
  Clock,
  Zap
} from 'lucide-react';

export default function OfflinePage() {
  const [isOnline, setIsOnline] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Check initial status
    setIsOnline(navigator.onLine);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    window.location.reload();
  };

  const offlineFeatures = [
    {
      icon: <Vote className="w-6 h-6" />,
      title: 'Vote Offline',
      description: 'Your votes are saved locally and will sync when connection is restored'
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: 'View Cached Data',
      description: 'Access previously loaded politician dossiers and policy data'
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: 'Read Transparency Reports',
      description: 'Browse blockchain records and corruption reports from cache'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Report Corruption',
      description: 'Submit corruption reports that will be sent when online'
    }
  ];

  return (
    <div className="min-h-screen bg-corruption-900 text-foreground flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-corruption-800 rounded-lg p-8"
        >
          {/* Offline Icon */}
          <div className="w-24 h-24 bg-rebel-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <WifiOff className="w-12 h-12 text-rebel-400" />
          </div>

          {/* Main Message */}
          <h1 className="text-4xl font-bold text-rebel-400 mb-4">
            You're Offline
          </h1>
          <p className="text-xl text-corruption-300 mb-8 max-w-2xl mx-auto">
            Don't worry! The democracy revolution continues even without internet. 
            Your actions are saved locally and will sync when you're back online.
          </p>

          {/* Connection Status */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-people-400' : 'bg-rebel-400'}`}></div>
            <span className="text-sm text-corruption-400">
              {isOnline ? 'Connection restored!' : 'No internet connection'}
            </span>
          </div>

          {/* Retry Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRetry}
            disabled={!isOnline}
            className={`px-8 py-4 rounded-lg font-semibold transition-colors flex items-center gap-2 mx-auto mb-8 ${
              isOnline 
                ? 'bg-people-500 hover:bg-people-600 text-white' 
                : 'bg-corruption-600 text-corruption-400 cursor-not-allowed'
            }`}
          >
            <RefreshCw className={`w-5 h-5 ${isOnline ? 'animate-spin' : ''}`} />
            {isOnline ? 'Reconnect to Democracy' : 'Retry Connection'}
          </motion.button>

          {/* Offline Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {offlineFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-corruption-700 rounded-lg p-6 text-left"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-truth-500/20 rounded-full">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-truth-300 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-corruption-400">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Offline Actions */}
          <div className="bg-corruption-700 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-bold text-truth-400 mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Available Offline Actions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="bg-truth-500 hover:bg-truth-600 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
                <Vote className="w-4 h-4" />
                Cast Vote
              </button>
              <button className="bg-rebel-500 hover:bg-rebel-600 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Report Corruption
              </button>
              <button className="bg-people-500 hover:bg-people-600 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
                <Eye className="w-4 h-4" />
                View Dossiers
              </button>
            </div>
          </div>

          {/* Sync Status */}
          <div className="bg-corruption-700 rounded-lg p-6">
            <h3 className="text-lg font-bold text-truth-400 mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Sync Status
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-corruption-300">Pending Votes:</span>
                <span className="text-sm text-people-400 font-semibold">3</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-corruption-300">Pending Reports:</span>
                <span className="text-sm text-rebel-400 font-semibold">1</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-corruption-300">Last Sync:</span>
                <span className="text-sm text-corruption-400">2 hours ago</span>
              </div>
            </div>
            
            {isOnline && (
              <div className="mt-4 pt-4 border-t border-corruption-600">
                <div className="flex items-center gap-2 text-truth-400">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm">Ready to sync when you take action</span>
                </div>
              </div>
            )}
          </div>

          {/* People's Oath */}
          <div className="mt-8 pt-6 border-t border-corruption-600">
            <p className="text-sm text-corruption-400 italic">
              "The revolution doesn't stop when the internet goes down. 
              We fight for the people, not the system. For the honor, not the glory."
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
