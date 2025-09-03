'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Check } from 'lucide-react';
import { Language, getCurrentLanguage, setLanguage, getTranslation } from '@/lib/translations';

const languages = [
  { code: 'en' as Language, name: 'English', flag: '🇬🇧' },
  { code: 'sv' as Language, name: 'Svenska', flag: '🇸🇪' },
  { code: 'no' as Language, name: 'Norsk', flag: '🇳🇴' }
];

export default function LanguageSwitcher() {
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setCurrentLang(getCurrentLanguage());
  }, []);

  const handleLanguageChange = (language: Language) => {
    setCurrentLang(language);
    setLanguage(language);
    setIsOpen(false);
    
    // Reload the page to apply new language
    window.location.reload();
  };

  const currentLanguage = languages.find(lang => lang.code === currentLang);

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-corruption-700 hover:bg-corruption-600 rounded-lg text-white transition-colors"
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm font-medium">{currentLanguage?.flag}</span>
        <span className="text-sm font-medium">{currentLanguage?.name}</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full right-0 mt-2 w-48 bg-corruption-800 rounded-lg shadow-lg border border-corruption-600 z-50"
          >
            <div className="py-2">
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => handleLanguageChange(language.code)}
                  className="w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-corruption-700 transition-colors"
                >
                  <span className="text-lg">{language.flag}</span>
                  <span className="text-sm text-white flex-1">{language.name}</span>
                  {currentLang === language.code && (
                    <Check className="w-4 h-4 text-truth-400" />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
