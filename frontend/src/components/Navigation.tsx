'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  Vote, 
  User, 
  FileText, 
  BarChart3, 
  Eye,
  Menu,
  X,
  Shield
} from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import { getCurrentLanguage, getTranslation } from '@/lib/translations';

const navigationItems = [
  { href: '/', label: 'nav.home', icon: Home },
  { href: '/vote', label: 'nav.vote', icon: Vote },
  { href: '/dossiers', label: 'nav.dossiers', icon: User },
  { href: '/simulations', label: 'nav.simulations', icon: BarChart3 },
  { href: '/profile', label: 'nav.profile', icon: User },
  { href: '/transparency', label: 'nav.transparency', icon: Eye }
];

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const language = getCurrentLanguage();

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <nav className="bg-corruption-800 border-b border-corruption-700 sticky top-8 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-truth-400 to-people-400 rounded-full flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-truth-400">
              Stavanger Twin
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? 'bg-truth-500 text-white'
                      : 'text-corruption-300 hover:text-white hover:bg-corruption-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {getTranslation(language, item.label)}
                </Link>
              );
            })}
          </div>

          {/* Right side - Language Switcher */}
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-corruption-300 hover:text-white hover:bg-corruption-700 rounded-lg transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-corruption-700 py-4"
          >
            <div className="space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      isActive(item.href)
                        ? 'bg-truth-500 text-white'
                        : 'text-corruption-300 hover:text-white hover:bg-corruption-700'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {getTranslation(language, item.label)}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
}
