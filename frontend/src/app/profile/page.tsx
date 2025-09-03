'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Settings, 
  Shield, 
  Trophy, 
  TrendingUp, 
  Vote, 
  Eye, 
  AlertTriangle,
  Calendar,
  MapPin,
  Mail,
  Phone,
  Edit,
  Save,
  X
} from 'lucide-react';
import GamificationSystem from '@/components/GamificationSystem';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  district: string;
  joinDate: string;
  totalVotes: number;
  corruptionReports: number;
  transparencyScore: number;
  votingStreak: number;
  level: number;
  rank: string;
  bio: string;
  interests: string[];
  verified: boolean;
}

// Mock user profile data
const mockProfile: UserProfile = {
  id: '1',
  name: 'Citizen Rebel',
  email: 'citizen@stavanger-twin.no',
  district: 'Centrum',
  joinDate: '2024-11-01',
  totalVotes: 47,
  corruptionReports: 2,
  transparencyScore: 87,
  votingStreak: 5,
  level: 12,
  rank: 'Active Citizen',
  bio: 'Fighting for transparency and democracy in Stavanger. No more corruption, no more lies. The people deserve better.',
  interests: ['Transparency', 'Anti-Corruption', 'Digital Democracy', 'Environmental Policy'],
  verified: true
};

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile>(mockProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<UserProfile>(profile);

  const handleEdit = () => {
    setEditData(profile);
    setIsEditing(true);
  };

  const handleSave = () => {
    setProfile(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(profile);
    setIsEditing(false);
  };

  const getRankColor = (rank: string) => {
    switch (rank) {
      case 'Democracy Legend': return 'text-rebel-400';
      case 'People\'s Hero': return 'text-people-400';
      case 'Truth Warrior': return 'text-truth-400';
      case 'Active Citizen': return 'text-truth-400';
      default: return 'text-corruption-400';
    }
  };

  const getRankIcon = (rank: string) => {
    switch (rank) {
      case 'Democracy Legend': return '👑';
      case 'People\'s Hero': return '🦸';
      case 'Truth Warrior': return '⚔️';
      case 'Active Citizen': return '🗳️';
      default: return '👤';
    }
  };

  return (
    <div className="min-h-screen bg-corruption-900 text-foreground py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            <span className="text-truth-400">CITIZEN</span>{' '}
            <span className="text-people-400">PROFILE</span>
          </motion.h1>
          <p className="text-xl text-corruption-300 max-w-3xl mx-auto">
            Your digital democracy journey. Track your impact, earn badges, and fight for transparency.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-corruption-800 rounded-lg p-6 sticky top-8">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-truth-400 to-people-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-12 h-12 text-white" />
                </div>
                
                {isEditing ? (
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={editData.name}
                      onChange={(e) => setEditData({...editData, name: e.target.value})}
                      className="w-full bg-corruption-700 border border-corruption-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-truth-400"
                    />
                    <textarea
                      value={editData.bio}
                      onChange={(e) => setEditData({...editData, bio: e.target.value})}
                      rows={3}
                      className="w-full bg-corruption-700 border border-corruption-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-truth-400 resize-none"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={handleSave}
                        className="flex-1 bg-people-500 hover:bg-people-600 text-white py-2 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                      >
                        <Save className="w-4 h-4" />
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="flex-1 bg-corruption-600 hover:bg-corruption-500 text-white py-2 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                      >
                        <X className="w-4 h-4" />
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h2 className="text-2xl font-bold text-truth-300 mb-2">{profile.name}</h2>
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <span className={`text-lg ${getRankColor(profile.rank)}`}>
                        {getRankIcon(profile.rank)}
                      </span>
                      <span className={`font-semibold ${getRankColor(profile.rank)}`}>
                        {profile.rank}
                      </span>
                      {profile.verified && (
                        <Shield className="w-5 h-5 text-truth-400" />
                      )}
                    </div>
                    <p className="text-sm text-corruption-300 mb-4">{profile.bio}</p>
                    <button
                      onClick={handleEdit}
                      className="bg-truth-500 hover:bg-truth-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2 mx-auto"
                    >
                      <Edit className="w-4 h-4" />
                      Edit Profile
                    </button>
                  </div>
                )}
              </div>

              {/* Profile Stats */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="w-4 h-4 text-corruption-400" />
                  <span className="text-corruption-300">{profile.district}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="w-4 h-4 text-corruption-400" />
                  <span className="text-corruption-300">
                    Joined {new Date(profile.joinDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="w-4 h-4 text-corruption-400" />
                  <span className="text-corruption-300">{profile.email}</span>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="mt-6 pt-6 border-t border-corruption-600">
                <h3 className="text-lg font-bold text-truth-400 mb-4">Quick Stats</h3>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-people-400">{profile.totalVotes}</div>
                    <div className="text-xs text-corruption-400">Votes Cast</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-rebel-400">{profile.corruptionReports}</div>
                    <div className="text-xs text-corruption-400">Reports</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-truth-400">{profile.transparencyScore}%</div>
                    <div className="text-xs text-corruption-400">Transparency</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-people-400">{profile.votingStreak}</div>
                    <div className="text-xs text-corruption-400">Streak</div>
                  </div>
                </div>
              </div>

              {/* Interests */}
              <div className="mt-6 pt-6 border-t border-corruption-600">
                <h3 className="text-lg font-bold text-truth-400 mb-3">Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {profile.interests.map((interest, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-truth-500/20 text-truth-300 rounded-full text-sm"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Gamification System */}
            <GamificationSystem />

            {/* Activity Feed */}
            <div className="mt-8 bg-corruption-800 rounded-lg p-6">
              <h3 className="text-xl font-bold text-truth-400 mb-6 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Recent Activity
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-corruption-700 rounded-lg">
                  <div className="p-2 bg-people-500/20 rounded-full">
                    <Vote className="w-5 h-5 text-people-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-truth-300 mb-1">Voted on Green Energy Initiative</h4>
                    <p className="text-sm text-corruption-400 mb-2">
                      Supported the €5M renewable energy investment proposal
                    </p>
                    <div className="flex items-center gap-4 text-xs text-corruption-500">
                      <span>2 hours ago</span>
                      <span>+25 points</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-corruption-700 rounded-lg">
                  <div className="p-2 bg-rebel-500/20 rounded-full">
                    <AlertTriangle className="w-5 h-5 text-rebel-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-truth-300 mb-1">Reported Corruption</h4>
                    <p className="text-sm text-corruption-400 mb-2">
                      Exposed Councilor X's undisclosed business interests
                    </p>
                    <div className="flex items-center gap-4 text-xs text-corruption-500">
                      <span>1 day ago</span>
                      <span>+100 points</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-corruption-700 rounded-lg">
                  <div className="p-2 bg-truth-500/20 rounded-full">
                    <Eye className="w-5 h-5 text-truth-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-truth-300 mb-1">Viewed Politician Dossier</h4>
                    <p className="text-sm text-corruption-400 mb-2">
                      Analyzed Mayor Y's transparency record
                    </p>
                    <div className="flex items-center gap-4 text-xs text-corruption-500">
                      <span>2 days ago</span>
                      <span>+10 points</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-corruption-700 rounded-lg">
                  <div className="p-2 bg-people-500/20 rounded-full">
                    <Trophy className="w-5 h-5 text-people-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-truth-300 mb-1">Badge Earned: Truth Seeker</h4>
                    <p className="text-sm text-corruption-400 mb-2">
                      Viewed 10 politician dossiers
                    </p>
                    <div className="flex items-center gap-4 text-xs text-corruption-500">
                      <span>3 days ago</span>
                      <span>+25 points</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Settings */}
            <div className="mt-8 bg-corruption-800 rounded-lg p-6">
              <h3 className="text-xl font-bold text-truth-400 mb-6 flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Account Settings
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-corruption-700 rounded-lg">
                  <div>
                    <h4 className="font-semibold text-truth-300">Email Notifications</h4>
                    <p className="text-sm text-corruption-400">Receive updates on votes and corruption alerts</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-corruption-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-truth-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-corruption-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-truth-500"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-corruption-700 rounded-lg">
                  <div>
                    <h4 className="font-semibold text-truth-300">Public Profile</h4>
                    <p className="text-sm text-corruption-400">Allow others to see your voting record</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-corruption-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-truth-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-corruption-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-truth-500"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-corruption-700 rounded-lg">
                  <div>
                    <h4 className="font-semibold text-truth-300">Data Sharing</h4>
                    <p className="text-sm text-corruption-400">Help improve the platform with anonymous usage data</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-corruption-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-truth-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-corruption-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-truth-500"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
