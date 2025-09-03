'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, X, Settings, CheckCircle, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

interface ConsentPreferences {
  necessary: boolean;
  analytics: boolean;
  functional: boolean;
}

export default function GDPRConsentBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<ConsentPreferences>({
    necessary: true, // Always required
    analytics: false,
    functional: false
  });

  useEffect(() => {
    // Check if user has already given consent
    const consent = localStorage.getItem('stavanger-twin-consent');
    if (!consent) {
      setShowBanner(true);
    } else {
      const savedPreferences = JSON.parse(consent);
      setPreferences(savedPreferences);
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      functional: true
    };
    setPreferences(allAccepted);
    localStorage.setItem('stavanger-twin-consent', JSON.stringify(allAccepted));
    setShowBanner(false);
  };

  const handleRejectAll = () => {
    const onlyNecessary = {
      necessary: true,
      analytics: false,
      functional: false
    };
    setPreferences(onlyNecessary);
    localStorage.setItem('stavanger-twin-consent', JSON.stringify(onlyNecessary));
    setShowBanner(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem('stavanger-twin-consent', JSON.stringify(preferences));
    setShowBanner(false);
    setShowSettings(false);
  };

  const handlePreferenceChange = (key: keyof ConsentPreferences, value: boolean) => {
    if (key === 'necessary') return; // Can't disable necessary cookies
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  if (!showBanner) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-corruption-800 border-t border-corruption-700 p-4"
      >
        <div className="max-w-7xl mx-auto">
          {!showSettings ? (
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="flex items-start gap-3 flex-1">
                <div className="p-2 bg-truth-500/20 rounded-full">
                  <Shield className="w-5 h-5 text-truth-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-truth-300 mb-1">
                    Privacy & Democracy
                  </h3>
                  <p className="text-sm text-corruption-300">
                    We use minimal cookies to make democracy work. No tracking, no ads, no BS. 
                    Your data is sacred. <Link href="/privacy" className="text-truth-400 hover:text-truth-300 underline">Read our privacy policy</Link>.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowSettings(true)}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-corruption-300 hover:text-white transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  Customize
                </button>
                <button
                  onClick={handleRejectAll}
                  className="px-4 py-2 text-sm text-corruption-300 hover:text-white transition-colors"
                >
                  Reject All
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="px-6 py-2 bg-truth-500 hover:bg-truth-600 text-white rounded-lg font-semibold transition-colors"
                >
                  Accept All
                </button>
                <button
                  onClick={() => setShowBanner(false)}
                  className="p-2 text-corruption-400 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-truth-300">
                  Cookie Preferences
                </h3>
                <button
                  onClick={() => setShowSettings(false)}
                  className="p-2 text-corruption-400 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Necessary Cookies */}
                <div className="flex items-center justify-between p-4 bg-corruption-700 rounded-lg">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-people-400 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-truth-300">Necessary Cookies</h4>
                      <p className="text-sm text-corruption-400">
                        Required for basic platform functionality, voting, and security.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-people-400 font-semibold">Always Active</span>
                    <div className="w-12 h-6 bg-people-500 rounded-full relative">
                      <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5"></div>
                    </div>
                  </div>
                </div>

                {/* Analytics Cookies */}
                <div className="flex items-center justify-between p-4 bg-corruption-700 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-truth-400 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-truth-300">Analytics Cookies</h4>
                      <p className="text-sm text-corruption-400">
                        Anonymous usage statistics to improve the platform. No personal data.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-corruption-400">
                      {preferences.analytics ? 'Active' : 'Inactive'}
                    </span>
                    <button
                      onClick={() => handlePreferenceChange('analytics', !preferences.analytics)}
                      className={`w-12 h-6 rounded-full relative transition-colors ${
                        preferences.analytics ? 'bg-truth-500' : 'bg-corruption-600'
                      }`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                        preferences.analytics ? 'translate-x-6' : 'translate-x-0.5'
                      }`}></div>
                    </button>
                  </div>
                </div>

                {/* Functional Cookies */}
                <div className="flex items-center justify-between p-4 bg-corruption-700 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Settings className="w-5 h-5 text-truth-400 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-truth-300">Functional Cookies</h4>
                      <p className="text-sm text-corruption-400">
                        Remember your language preference and gamification progress.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-corruption-400">
                      {preferences.functional ? 'Active' : 'Inactive'}
                    </span>
                    <button
                      onClick={() => handlePreferenceChange('functional', !preferences.functional)}
                      className={`w-12 h-6 rounded-full relative transition-colors ${
                        preferences.functional ? 'bg-truth-500' : 'bg-corruption-600'
                      }`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                        preferences.functional ? 'translate-x-6' : 'translate-x-0.5'
                      }`}></div>
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-corruption-600">
                <p className="text-sm text-corruption-400">
                  <Link href="/privacy" className="text-truth-400 hover:text-truth-300 underline">
                    Read our full privacy policy
                  </Link> for detailed information.
                </p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleRejectAll}
                    className="px-4 py-2 text-sm text-corruption-300 hover:text-white transition-colors"
                  >
                    Reject All
                  </button>
                  <button
                    onClick={handleSavePreferences}
                    className="px-6 py-2 bg-truth-500 hover:bg-truth-600 text-white rounded-lg font-semibold transition-colors"
                  >
                    Save Preferences
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
