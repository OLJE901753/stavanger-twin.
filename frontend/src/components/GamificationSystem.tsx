'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, 
  Star, 
  Zap, 
  Shield, 
  Users, 
  Eye, 
  Vote, 
  TrendingUp,
  Award,
  Target,
  Flame,
  Crown,
  Medal,
  Badge,
  CheckCircle,
  Lock,
  Unlock
} from 'lucide-react';

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  category: 'voting' | 'transparency' | 'corruption' | 'community' | 'achievement';
  points: number;
  unlocked: boolean;
  unlockedAt?: string;
  requirement: string;
}

interface UserStats {
  level: number;
  experience: number;
  totalPoints: number;
  votingStreak: number;
  corruptionReports: number;
  transparencyScore: number;
  badges: Badge[];
  achievements: string[];
  rank: string;
  nextLevelXP: number;
}

// Mock badges data
const availableBadges: Badge[] = [
  {
    id: 'first_vote',
    name: 'First Vote',
    description: 'Cast your first vote in the digital democracy',
    icon: 'Vote',
    rarity: 'common',
    category: 'voting',
    points: 10,
    unlocked: true,
    unlockedAt: '2024-12-01',
    requirement: 'Cast 1 vote'
  },
  {
    id: 'truth_seeker',
    name: 'Truth Seeker',
    description: 'View 10 politician dossiers',
    icon: 'Eye',
    rarity: 'common',
    category: 'transparency',
    points: 25,
    unlocked: true,
    unlockedAt: '2024-12-02',
    requirement: 'View 10 dossiers'
  },
  {
    id: 'corruption_hunter',
    name: 'Corruption Hunter',
    description: 'Report 5 instances of corruption',
    icon: 'Shield',
    rarity: 'rare',
    category: 'corruption',
    points: 100,
    unlocked: false,
    requirement: 'Report 5 corruption cases'
  },
  {
    id: 'voting_streak_7',
    name: 'Weekly Warrior',
    description: 'Maintain a 7-day voting streak',
    icon: 'Flame',
    rarity: 'rare',
    category: 'voting',
    points: 75,
    unlocked: false,
    requirement: '7-day voting streak'
  },
  {
    id: 'people_champion',
    name: 'People\'s Champion',
    description: 'Vote with the people 20 times',
    icon: 'Users',
    rarity: 'epic',
    category: 'voting',
    points: 200,
    unlocked: false,
    requirement: 'Vote with majority 20 times'
  },
  {
    id: 'transparency_guardian',
    name: 'Transparency Guardian',
    description: 'Achieve 95% transparency score',
    icon: 'Shield',
    rarity: 'epic',
    category: 'transparency',
    points: 250,
    unlocked: false,
    requirement: '95% transparency score'
  },
  {
    id: 'democracy_legend',
    name: 'Democracy Legend',
    description: 'Reach level 50 and maintain perfect voting record',
    icon: 'Crown',
    rarity: 'legendary',
    category: 'achievement',
    points: 1000,
    unlocked: false,
    requirement: 'Level 50 + perfect record'
  },
  {
    id: 'shame_starter',
    name: 'Shame Starter',
    description: 'Successfully expose a corrupt politician',
    icon: 'Target',
    rarity: 'epic',
    category: 'corruption',
    points: 300,
    unlocked: false,
    requirement: 'Expose 1 corrupt politician'
  },
  {
    id: 'policy_analyst',
    name: 'Policy Analyst',
    description: 'Analyze 25 policy simulations',
    icon: 'TrendingUp',
    rarity: 'rare',
    category: 'transparency',
    points: 150,
    unlocked: false,
    requirement: 'Analyze 25 policies'
  },
  {
    id: 'community_leader',
    name: 'Community Leader',
    description: 'Help 50 citizens understand policies',
    icon: 'Users',
    rarity: 'epic',
    category: 'community',
    points: 400,
    unlocked: false,
    requirement: 'Help 50 citizens'
  }
];

// Mock user stats
const mockUserStats: UserStats = {
  level: 12,
  experience: 2450,
  totalPoints: 1250,
  votingStreak: 5,
  corruptionReports: 2,
  transparencyScore: 87,
  badges: availableBadges.filter(b => b.unlocked),
  achievements: ['First Vote', 'Truth Seeker'],
  rank: 'Active Citizen',
  nextLevelXP: 3000
};

export default function GamificationSystem() {
  const [userStats, setUserStats] = useState<UserStats>(mockUserStats);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showUnlockedOnly, setShowUnlockedOnly] = useState(false);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-gray-600 bg-gray-500/20';
      case 'rare': return 'text-green-600 bg-green-500/20';
      case 'epic': return 'text-blue-600 bg-blue-500/20';
      case 'legendary': return 'text-purple-600 bg-purple-500/20';
      default: return 'text-gray-600 bg-gray-500/20';
    }
  };

  const getRarityGlow = (rarity: string) => {
    switch (rarity) {
      case 'common': return '';
      case 'rare': return 'shadow-green';
      case 'epic': return 'shadow-blue';
      case 'legendary': return 'shadow-purple animate-pulse';
      default: return '';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'voting': return <Vote className="w-4 h-4" />;
      case 'transparency': return <Eye className="w-4 h-4" />;
      case 'corruption': return <Shield className="w-4 h-4" />;
      case 'community': return <Users className="w-4 h-4" />;
      case 'achievement': return <Trophy className="w-4 h-4" />;
      default: return <Badge className="w-4 h-4" />;
    }
  };

  const getRankColor = (level: number) => {
    if (level >= 50) return 'text-purple-600';
    if (level >= 25) return 'text-blue-600';
    if (level >= 10) return 'text-green-600';
    return 'text-gray-600';
  };

  const getRankTitle = (level: number) => {
    if (level >= 50) return 'City Champion';
    if (level >= 25) return 'Community Leader';
    if (level >= 15) return 'Active Participant';
    if (level >= 10) return 'Engaged Citizen';
    if (level >= 5) return 'Regular Voter';
    return 'New Member';
  };

  const filteredBadges = availableBadges.filter(badge => {
    const categoryMatch = selectedCategory === 'all' || badge.category === selectedCategory;
    const unlockedMatch = !showUnlockedOnly || badge.unlocked;
    return categoryMatch && unlockedMatch;
  });

  const progressToNextLevel = (userStats.experience / userStats.nextLevelXP) * 100;

  return (
    <div className="bg-corruption-800 rounded-lg p-6">
      <h2 className="text-2xl font-bold text-truth-400 mb-6 flex items-center gap-2">
        <Trophy className="w-6 h-6" />
        Your Democracy Journey
      </h2>

      {/* User Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-corruption-700 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-truth-400 mb-1">Level {userStats.level}</div>
          <div className="text-sm text-corruption-400">{getRankTitle(userStats.level)}</div>
          <div className="mt-2 w-full bg-corruption-600 rounded-full h-2">
            <div 
              className="bg-truth-400 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progressToNextLevel}%` }}
            />
          </div>
          <div className="text-xs text-corruption-500 mt-1">
            {userStats.experience}/{userStats.nextLevelXP} XP
          </div>
        </div>

        <div className="bg-corruption-700 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-people-400 mb-1">{userStats.totalPoints}</div>
          <div className="text-sm text-corruption-400">Total Points</div>
        </div>

        <div className="bg-corruption-700 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-rebel-400 mb-1 flex items-center justify-center gap-1">
            <Flame className="w-5 h-5" />
            {userStats.votingStreak}
          </div>
          <div className="text-sm text-corruption-400">Voting Streak</div>
        </div>

        <div className="bg-corruption-700 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-truth-400 mb-1">{userStats.transparencyScore}%</div>
          <div className="text-sm text-corruption-400">Transparency Score</div>
        </div>
      </div>

      {/* Badge Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
            selectedCategory === 'all' 
              ? 'bg-truth-500 text-white' 
              : 'bg-corruption-700 text-corruption-300 hover:bg-corruption-600'
          }`}
        >
          All Badges
        </button>
        {['voting', 'transparency', 'corruption', 'community', 'achievement'].map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors capitalize ${
              selectedCategory === category 
                ? 'bg-truth-500 text-white' 
                : 'bg-corruption-700 text-corruption-300 hover:bg-corruption-600'
            }`}
          >
            {category}
          </button>
        ))}
        <button
          onClick={() => setShowUnlockedOnly(!showUnlockedOnly)}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
            showUnlockedOnly 
              ? 'bg-people-500 text-white' 
              : 'bg-corruption-700 text-corruption-300 hover:bg-corruption-600'
          }`}
        >
          {showUnlockedOnly ? 'Show All' : 'Unlocked Only'}
        </button>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredBadges.map((badge) => (
          <motion.div
            key={badge.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            className={`bg-corruption-700 rounded-lg p-4 transition-all ${
              badge.unlocked ? 'opacity-100' : 'opacity-60'
            } ${getRarityGlow(badge.rarity)}`}
          >
            <div className="flex items-start gap-3 mb-3">
              <div className={`p-2 rounded-full ${getRarityColor(badge.rarity)}`}>
                {badge.unlocked ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <Lock className="w-5 h-5" />
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-truth-300 mb-1">{badge.name}</h3>
                <p className="text-sm text-corruption-400 mb-2">{badge.description}</p>
              </div>
            </div>

            <div className="flex items-center justify-between mb-3">
              <span className={`text-xs px-2 py-1 rounded ${getRarityColor(badge.rarity)}`}>
                {badge.rarity.toUpperCase()}
              </span>
              <span className="text-sm text-people-400 font-semibold">
                +{badge.points} pts
              </span>
            </div>

            <div className="text-xs text-corruption-500 mb-2">
              <strong>Requirement:</strong> {badge.requirement}
            </div>

            {badge.unlocked && badge.unlockedAt && (
              <div className="text-xs text-truth-400">
                <strong>Unlocked:</strong> {new Date(badge.unlockedAt).toLocaleDateString()}
              </div>
            )}

            {!badge.unlocked && (
              <div className="mt-2 pt-2 border-t border-corruption-600">
                <div className="flex items-center gap-2 text-xs text-corruption-500">
                  <Lock className="w-3 h-3" />
                  <span>Locked</span>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Achievement Progress */}
      <div className="mt-8 bg-corruption-700 rounded-lg p-4">
        <h3 className="text-lg font-bold text-truth-400 mb-4 flex items-center gap-2">
          <Target className="w-5 h-5" />
          Achievement Progress
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-corruption-300">Corruption Hunter</span>
            <div className="flex items-center gap-2">
              <div className="w-24 bg-corruption-600 rounded-full h-2">
                <div 
                  className="bg-rebel-400 h-2 rounded-full"
                  style={{ width: `${(userStats.corruptionReports / 5) * 100}%` }}
                />
              </div>
              <span className="text-xs text-corruption-400">
                {userStats.corruptionReports}/5
              </span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-corruption-300">Weekly Warrior</span>
            <div className="flex items-center gap-2">
              <div className="w-24 bg-corruption-600 rounded-full h-2">
                <div 
                  className="bg-truth-400 h-2 rounded-full"
                  style={{ width: `${(userStats.votingStreak / 7) * 100}%` }}
                />
              </div>
              <span className="text-xs text-corruption-400">
                {userStats.votingStreak}/7
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-corruption-300">Transparency Guardian</span>
            <div className="flex items-center gap-2">
              <div className="w-24 bg-corruption-600 rounded-full h-2">
                <div 
                  className="bg-people-400 h-2 rounded-full"
                  style={{ width: `${(userStats.transparencyScore / 95) * 100}%` }}
                />
              </div>
              <span className="text-xs text-corruption-400">
                {userStats.transparencyScore}/95%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
