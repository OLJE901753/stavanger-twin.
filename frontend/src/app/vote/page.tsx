'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Vote, 
  Shield, 
  CheckCircle, 
  AlertTriangle, 
  Users, 
  TrendingUp,
  Clock,
  Lock,
  Eye,
  Zap
} from 'lucide-react';
import HCaptcha from '@hcaptcha/react-hcaptcha';

interface VotingOption {
  id: string;
  title: string;
  description: string;
  category: 'policy' | 'budget' | 'infrastructure' | 'environment';
  impact: 'high' | 'medium' | 'low';
  votes: number;
  percentage: number;
  blockchainHash?: string;
}

interface ActiveVote {
  id: string;
  title: string;
  description: string;
  options: VotingOption[];
  deadline: string;
  totalVotes: number;
  category: string;
  verified: boolean;
}

// Mock active voting data
const activeVotes: ActiveVote[] = [
  {
    id: '1',
    title: 'Parking Fee Increase Proposal',
    description: 'City council proposes increasing parking fees by 50% to fund infrastructure projects. Citizens have the power to reject this.',
    category: 'budget',
    deadline: '2024-12-15',
    totalVotes: 1247,
    verified: true,
    options: [
      {
        id: '1a',
        title: 'REJECT - Keep current fees',
        description: 'Maintain current parking fees. Find alternative funding sources.',
        category: 'budget',
        impact: 'high',
        votes: 1023,
        percentage: 82,
        blockchainHash: '0x1234...5678'
      },
      {
        id: '1b',
        title: 'ACCEPT - Increase fees',
        description: 'Support the 50% increase to fund infrastructure improvements.',
        category: 'budget',
        impact: 'high',
        votes: 224,
        percentage: 18,
        blockchainHash: '0x8765...4321'
      }
    ]
  },
  {
    id: '2',
    title: 'Green Energy Initiative',
    description: 'Proposal to invest €5M in renewable energy projects for municipal buildings.',
    category: 'environment',
    deadline: '2024-12-20',
    totalVotes: 892,
    verified: true,
    options: [
      {
        id: '2a',
        title: 'SUPPORT - Full investment',
        description: 'Invest the full €5M in solar and wind energy projects.',
        category: 'environment',
        impact: 'high',
        votes: 712,
        percentage: 80,
        blockchainHash: '0xabcd...efgh'
      },
      {
        id: '2b',
        title: 'PARTIAL - €2.5M investment',
        description: 'Invest half the amount and evaluate results.',
        category: 'environment',
        impact: 'medium',
        votes: 180,
        percentage: 20,
        blockchainHash: '0xefgh...ijkl'
      }
    ]
  }
];

export default function VotePage() {
  const [selectedVote, setSelectedVote] = useState<ActiveVote | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [isVoting, setIsVoting] = useState(false);
  const [voteSubmitted, setVoteSubmitted] = useState(false);
  const [userStats, setUserStats] = useState({
    totalVotes: 0,
    streak: 0,
    badges: ['First Vote', 'Truth Seeker'],
    level: 'Citizen'
  });

  const handleVoteSelect = (vote: ActiveVote) => {
    setSelectedVote(vote);
    setSelectedOption(null);
    setVoteSubmitted(false);
  };

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
  };

  const handleCaptchaVerify = (token: string) => {
    setCaptchaToken(token);
  };

  const handleSubmitVote = async () => {
    if (!selectedOption || !captchaToken) return;

    setIsVoting(true);
    
    // Simulate blockchain transaction
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Update user stats
    setUserStats(prev => ({
      ...prev,
      totalVotes: prev.totalVotes + 1,
      streak: prev.streak + 1
    }));
    
    setVoteSubmitted(true);
    setIsVoting(false);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'budget': return 'text-rebel-400 bg-rebel-500/20';
      case 'environment': return 'text-people-400 bg-people-500/20';
      case 'infrastructure': return 'text-truth-400 bg-truth-500/20';
      case 'policy': return 'text-f59e0b bg-f59e0b/20';
      default: return 'text-corruption-400 bg-corruption-500/20';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-rebel-400';
      case 'medium': return 'text-f59e0b';
      case 'low': return 'text-corruption-400';
      default: return 'text-corruption-400';
    }
  };

  return (
    <div className="min-h-screen bg-corruption-900 text-foreground py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight"
          >
            <span className="text-rebel-500">PEOPLE'S</span>{' '}
            <span className="text-truth-400">VOTE</span>
          </motion.h1>
          <p className="text-lg sm:text-xl text-corruption-300 max-w-3xl mx-auto px-4">
            Your voice matters. Cast your vote on critical issues affecting Stavanger. 
            Every vote is blockchain-verified and immutable. <span className="text-rebel-400 font-semibold">Make the politicians listen!</span>
          </p>
        </div>

        {/* User Stats */}
        <div className="bg-corruption-800 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl font-bold text-truth-400 mb-4">
            Your Voting Power
            <div className="text-sm text-corruption-400 font-normal">
              Every vote is a rebellion against the status quo!
            </div>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-people-300">{userStats.totalVotes}</div>
              <div className="text-sm text-corruption-400">Total Votes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-truth-300">{userStats.streak}</div>
              <div className="text-sm text-corruption-400">Vote Streak</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-people-300">{userStats.badges.length}</div>
              <div className="text-sm text-corruption-400">Badges Earned</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-truth-300">{userStats.level}</div>
              <div className="text-sm text-corruption-400">Citizen Level</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Active Votes List */}
          <div className="lg:col-span-2">
            <h2 className="text-xl sm:text-2xl font-bold text-truth-400 mb-4 sm:mb-6">
              Active Votes
              <div className="text-sm text-corruption-400 font-normal">
                Choose your battles. Every vote counts in the revolution!
              </div>
            </h2>
            <div className="space-y-4">
              {activeVotes.map((vote) => (
                <motion.div
                  key={vote.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02 }}
                  className={`bg-corruption-800 rounded-lg p-6 cursor-pointer transition-all ${
                    selectedVote?.id === vote.id ? 'ring-2 ring-truth-400' : 'hover:bg-corruption-700'
                  }`}
                  onClick={() => handleVoteSelect(vote)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-truth-300 mb-2">{vote.title}</h3>
                      <p className="text-corruption-300 text-sm mb-3">{vote.description}</p>
                    </div>
                    {vote.verified && (
                      <div className="flex items-center gap-1 text-truth-400 text-sm">
                        <Shield className="w-4 h-4" />
                        <span>Verified</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-4 mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(vote.category)}`}>
                      {vote.category.toUpperCase()}
                    </span>
                    <div className="flex items-center gap-1 text-corruption-400 text-sm">
                      <Users className="w-4 h-4" />
                      <span>{vote.totalVotes.toLocaleString()} votes</span>
                    </div>
                    <div className="flex items-center gap-1 text-corruption-400 text-sm">
                      <Clock className="w-4 h-4" />
                      <span>Ends {new Date(vote.deadline).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* Vote Results Preview */}
                  <div className="space-y-2">
                    {vote.options.map((option) => (
                      <div key={option.id} className="flex items-center gap-3">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium text-corruption-200">
                              {option.title}
                            </span>
                            <span className="text-sm text-corruption-400">
                              {option.percentage}%
                            </span>
                          </div>
                          <div className="w-full bg-corruption-700 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                option.percentage > 50 ? 'bg-people-400' : 'bg-rebel-400'
                              }`}
                              style={{ width: `${option.percentage}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Voting Panel */}
          <div className="lg:col-span-1">
            {selectedVote ? (
              <div className="bg-corruption-800 rounded-lg p-6 sticky top-8">
                <h3 className="text-xl font-bold text-truth-400 mb-4">
                  Cast Your Vote
                  <div className="text-sm text-corruption-400 font-normal">
                    Strike back against corruption with your voice!
                  </div>
                </h3>
                
                {!voteSubmitted ? (
                  <div className="space-y-4">
                    <div className="text-sm text-corruption-300 mb-4">
                      Select your choice for: <strong>{selectedVote.title}</strong>
                    </div>

                    {selectedVote.options.map((option) => (
                      <motion.button
                        key={option.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                          selectedOption === option.id
                            ? 'border-truth-400 bg-truth-500/20'
                            : 'border-corruption-600 hover:border-corruption-500'
                        }`}
                        onClick={() => handleOptionSelect(option.id)}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-4 h-4 rounded-full border-2 mt-1 ${
                            selectedOption === option.id
                              ? 'border-truth-400 bg-truth-400'
                              : 'border-corruption-500'
                          }`}>
                            {selectedOption === option.id && (
                              <CheckCircle className="w-4 h-4 text-white" />
                            )}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-corruption-200 mb-1">
                              {option.title}
                            </h4>
                            <p className="text-sm text-corruption-400 mb-2">
                              {option.description}
                            </p>
                            <div className="flex items-center gap-2">
                              <span className={`text-xs px-2 py-1 rounded ${getCategoryColor(option.category)}`}>
                                {option.category}
                              </span>
                              <span className={`text-xs ${getImpactColor(option.impact)}`}>
                                {option.impact} impact
                              </span>
                            </div>
                          </div>
                        </div>
                      </motion.button>
                    ))}

                    {/* hCaptcha - Troll-resistant voting protection */}
                    {selectedOption && (
                      <div className="mt-4">
                        <div className="mb-2 text-xs text-corruption-400">
                          <Shield className="inline w-3 h-3 mr-1" />
                          Anti-bot protection for democratic integrity
                        </div>
                        <HCaptcha
                          sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY || "10000000-ffff-ffff-ffff-000000000001"}
                          onVerify={handleCaptchaVerify}
                          onError={(error) => console.error('hCaptcha error:', error)}
                          onExpire={() => setCaptchaToken(null)}
                          theme="dark"
                          size="normal"
                        />
                      </div>
                    )}

                    {/* Submit Button */}
                    {selectedOption && captchaToken && (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleSubmitVote}
                        disabled={isVoting}
                        className="w-full bg-people-500 hover:bg-people-600 disabled:bg-corruption-600 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                      >
                        {isVoting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Submitting to Blockchain...
                          </>
                        ) : (
                          <>
                            <Vote className="w-4 h-4" />
                            Submit Vote
                          </>
                        )}
                      </motion.button>
                    )}
                  </div>
                ) : (
                  <div className="text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-16 h-16 bg-people-500 rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                      <CheckCircle className="w-8 h-8 text-white" />
                    </motion.div>
                    <h4 className="text-lg font-bold text-people-300 mb-2">
                      Vote Submitted!
                    </h4>
                    <p className="text-sm text-corruption-300 mb-4">
                      Your vote has been recorded on the blockchain and is immutable. 
                      <span className="text-rebel-400 font-semibold">The establishment can't ignore this!</span>
                    </p>
                    <div className="bg-corruption-700 rounded-lg p-3 text-xs text-corruption-400">
                      <div className="flex items-center gap-2 mb-1">
                        <Lock className="w-3 h-3" />
                        <span>Blockchain Hash:</span>
                      </div>
                      <code className="text-truth-400">
                        0x{Math.random().toString(16).substr(2, 8)}...{Math.random().toString(16).substr(2, 8)}
                      </code>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-corruption-800 rounded-lg p-6 text-center">
                <Vote className="w-12 h-12 text-corruption-500 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-corruption-400 mb-2">
                  Select a Vote
                </h3>
                <p className="text-sm text-corruption-500">
                  Choose a voting issue from the list to cast your vote.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
