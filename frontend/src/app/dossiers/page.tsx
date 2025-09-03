'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  AlertTriangle, 
  Shield, 
  TrendingDown, 
  TrendingUp,
  Eye,
  FileText,
  Calendar,
  MapPin,
  Vote,
  DollarSign,
  Users,
  Clock,
  ExternalLink,
  Search,
  Filter,
  Star,
  StarOff
} from 'lucide-react';

interface Politician {
  id: string;
  name: string;
  position: string;
  party: string;
  district: string;
  corruptionScore: number;
  transparencyScore: number;
  voteRecord: {
    totalVotes: number;
    againstPeople: number;
    forPeople: number;
    abstained: number;
  };
  scandals: {
    id: string;
    title: string;
    description: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    date: string;
    verified: boolean;
    blockchainHash?: string;
  }[];
  speeches: {
    id: string;
    title: string;
    date: string;
    sentiment: 'positive' | 'negative' | 'neutral';
    keyQuotes: string[];
  }[];
  financial: {
    declaredIncome: number;
    assets: number;
    donations: number;
    suspiciousTransactions: number;
  };
  lastUpdated: string;
  verified: boolean;
}

// Mock politician data - exposing the corrupt ones
const politicians: Politician[] = [
  {
    id: '1',
    name: 'Councilor X',
    position: 'City Council Member',
    party: 'Corruption Party',
    district: 'Centrum',
    corruptionScore: 8.5,
    transparencyScore: 2.1,
    voteRecord: {
      totalVotes: 47,
      againstPeople: 38,
      forPeople: 6,
      abstained: 3
    },
    scandals: [
      {
        id: 's1',
        title: 'Ignored 82% Vote Against Parking Fees',
        description: 'Pushed through parking fee increase despite overwhelming public opposition. 1,247 citizens voted against.',
        severity: 'high',
        date: '2024-11-15',
        verified: true,
        blockchainHash: '0x1234...5678'
      },
      {
        id: 's2',
        title: 'Undisclosed Business Interests',
        description: 'Failed to declare ownership in parking management company that benefits from fee increases.',
        severity: 'critical',
        date: '2024-10-22',
        verified: true,
        blockchainHash: '0x8765...4321'
      }
    ],
    speeches: [
      {
        id: 'sp1',
        title: 'Budget Allocation Speech',
        date: '2024-11-10',
        sentiment: 'negative',
        keyQuotes: [
          '"The people don\'t understand the complexity of city finances"',
          '"We need to make tough decisions for the greater good"'
        ]
      }
    ],
    financial: {
      declaredIncome: 450000,
      assets: 1200000,
      donations: 150000,
      suspiciousTransactions: 3
    },
    lastUpdated: '2024-12-03',
    verified: true
  },
  {
    id: '2',
    name: 'Mayor Y',
    position: 'Mayor',
    party: 'Transparency Alliance',
    district: 'Stavanger',
    corruptionScore: 1.2,
    transparencyScore: 9.1,
    voteRecord: {
      totalVotes: 52,
      againstPeople: 3,
      forPeople: 45,
      abstained: 4
    },
    scandals: [],
    speeches: [
      {
        id: 'sp2',
        title: 'Digital Democracy Initiative',
        date: '2024-11-20',
        sentiment: 'positive',
        keyQuotes: [
          '"Every citizen\'s voice matters in our democracy"',
          '"Transparency is the foundation of trust"'
        ]
      }
    ],
    financial: {
      declaredIncome: 380000,
      assets: 450000,
      donations: 0,
      suspiciousTransactions: 0
    },
    lastUpdated: '2024-12-03',
    verified: true
  },
  {
    id: '3',
    name: 'Councilor Z',
    position: 'City Council Member',
    party: 'Status Quo Party',
    district: 'Hillevåg',
    corruptionScore: 6.8,
    transparencyScore: 4.2,
    voteRecord: {
      totalVotes: 41,
      againstPeople: 28,
      forPeople: 10,
      abstained: 3
    },
    scandals: [
      {
        id: 's3',
        title: 'Budget Manipulation',
        description: 'Allocated €2.3M to infrastructure without public consultation or proper documentation.',
        severity: 'high',
        date: '2024-11-28',
        verified: true,
        blockchainHash: '0xabcd...efgh'
      }
    ],
    speeches: [
      {
        id: 'sp3',
        title: 'Infrastructure Development',
        date: '2024-11-25',
        sentiment: 'neutral',
        keyQuotes: [
          '"We need to move forward with development"',
          '"The process was handled according to regulations"'
        ]
      }
    ],
    financial: {
      declaredIncome: 320000,
      assets: 780000,
      donations: 45000,
      suspiciousTransactions: 1
    },
    lastUpdated: '2024-12-03',
    verified: true
  }
];

export default function DossiersPage() {
  const [selectedPolitician, setSelectedPolitician] = useState<Politician | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCorruption, setFilterCorruption] = useState(false);
  const [sortBy, setSortBy] = useState<'corruption' | 'transparency' | 'name'>('corruption');

  const filteredPoliticians = politicians
    .filter(p => 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.district.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(p => !filterCorruption || p.corruptionScore > 5)
    .sort((a, b) => {
      switch (sortBy) {
        case 'corruption':
          return b.corruptionScore - a.corruptionScore;
        case 'transparency':
          return b.transparencyScore - a.transparencyScore;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  const getCorruptionColor = (score: number) => {
    if (score > 7) return 'text-red-400 bg-red-500/20';
    if (score > 5) return 'text-rebel-400 bg-rebel-500/20';
    if (score > 3) return 'text-f59e0b bg-f59e0b/20';
    return 'text-people-400 bg-people-500/20';
  };

  const getTransparencyColor = (score: number) => {
    if (score > 8) return 'text-people-400 bg-people-500/20';
    if (score > 6) return 'text-truth-400 bg-truth-500/20';
    if (score > 4) return 'text-f59e0b bg-f59e0b/20';
    return 'text-rebel-400 bg-rebel-500/20';
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-400 bg-red-500/20';
      case 'high': return 'text-rebel-400 bg-rebel-500/20';
      case 'medium': return 'text-f59e0b bg-f59e0b/20';
      case 'low': return 'text-corruption-400 bg-corruption-500/20';
      default: return 'text-corruption-400 bg-corruption-500/20';
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
            <span className="text-rebel-500">POLITICIAN</span>{' '}
            <span className="text-truth-400">DOSSIERS</span>
          </motion.h1>
          <p className="text-xl text-corruption-300 max-w-3xl mx-auto">
            Expose corruption, track voting records, and hold politicians accountable. 
            Every scandal is blockchain-verified and immutable.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-corruption-800 rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-corruption-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search politicians, positions, or districts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-corruption-700 border border-corruption-600 rounded-lg text-white placeholder-corruption-400 focus:outline-none focus:ring-2 focus:ring-truth-400"
              />
            </div>
            
            <div className="flex gap-4 items-center">
              <label className="flex items-center gap-2 text-sm text-corruption-300">
                <input
                  type="checkbox"
                  checked={filterCorruption}
                  onChange={(e) => setFilterCorruption(e.target.checked)}
                  className="rounded border-corruption-600 bg-corruption-700 text-truth-400 focus:ring-truth-400"
                />
                Show only corrupt politicians
              </label>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-corruption-700 border border-corruption-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-truth-400"
              >
                <option value="corruption">Sort by Corruption</option>
                <option value="transparency">Sort by Transparency</option>
                <option value="name">Sort by Name</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Politicians List */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-truth-400 mb-6">
              Politician Database ({filteredPoliticians.length})
            </h2>
            <div className="space-y-4">
              {filteredPoliticians.map((politician) => (
                <motion.div
                  key={politician.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02 }}
                  className={`bg-corruption-800 rounded-lg p-6 cursor-pointer transition-all ${
                    selectedPolitician?.id === politician.id ? 'ring-2 ring-truth-400' : 'hover:bg-corruption-700'
                  }`}
                  onClick={() => setSelectedPolitician(politician)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-truth-300 mb-1">{politician.name}</h3>
                      <p className="text-corruption-300 text-sm mb-2">{politician.position}</p>
                      <div className="flex items-center gap-2 text-sm text-corruption-400">
                        <MapPin className="w-4 h-4" />
                        <span>{politician.district}</span>
                        <span>•</span>
                        <span>{politician.party}</span>
                      </div>
                    </div>
                    
                    {politician.verified && (
                      <div className="flex items-center gap-1 text-truth-400 text-sm">
                        <Shield className="w-4 h-4" />
                        <span>Verified</span>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center">
                      <div className={`text-2xl font-bold mb-1 ${politician.corruptionScore > 5 ? 'text-rebel-400' : 'text-people-400'}`}>
                        {politician.corruptionScore}/10
                      </div>
                      <div className="text-xs text-corruption-400">Corruption Score</div>
                    </div>
                    <div className="text-center">
                      <div className={`text-2xl font-bold mb-1 ${politician.transparencyScore > 6 ? 'text-people-400' : 'text-rebel-400'}`}>
                        {politician.transparencyScore}/10
                      </div>
                      <div className="text-xs text-corruption-400">Transparency Score</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1 text-corruption-400">
                        <Vote className="w-4 h-4" />
                        <span>{politician.voteRecord.totalVotes} votes</span>
                      </div>
                      <div className="flex items-center gap-1 text-rebel-400">
                        <TrendingDown className="w-4 h-4" />
                        <span>{politician.voteRecord.againstPeople} against people</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {politician.scandals.length > 0 && (
                        <span className="text-xs px-2 py-1 rounded bg-rebel-500/30 text-rebel-300">
                          {politician.scandals.length} scandals
                        </span>
                      )}
                      <ExternalLink className="w-4 h-4 text-corruption-400" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Politician Details Panel */}
          <div className="lg:col-span-1">
            {selectedPolitician ? (
              <div className="bg-corruption-800 rounded-lg p-6 sticky top-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-truth-400 mb-1">
                      {selectedPolitician.name}
                    </h3>
                    <p className="text-corruption-300 text-sm">{selectedPolitician.position}</p>
                  </div>
                  <button
                    onClick={() => setSelectedPolitician(null)}
                    className="text-corruption-400 hover:text-white"
                  >
                    ✕
                  </button>
                </div>

                {/* Scores */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className={`p-3 rounded-lg ${getCorruptionColor(selectedPolitician.corruptionScore)}`}>
                    <div className="text-lg font-bold">Corruption</div>
                    <div className="text-2xl font-bold">{selectedPolitician.corruptionScore}/10</div>
                  </div>
                  <div className={`p-3 rounded-lg ${getTransparencyColor(selectedPolitician.transparencyScore)}`}>
                    <div className="text-lg font-bold">Transparency</div>
                    <div className="text-2xl font-bold">{selectedPolitician.transparencyScore}/10</div>
                  </div>
                </div>

                {/* Vote Record */}
                <div className="mb-6">
                  <h4 className="text-lg font-bold text-truth-400 mb-3">Vote Record</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-corruption-300">For People:</span>
                      <span className="text-people-400 font-semibold">{selectedPolitician.voteRecord.forPeople}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-corruption-300">Against People:</span>
                      <span className="text-rebel-400 font-semibold">{selectedPolitician.voteRecord.againstPeople}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-corruption-300">Abstained:</span>
                      <span className="text-corruption-400 font-semibold">{selectedPolitician.voteRecord.abstained}</span>
                    </div>
                  </div>
                </div>

                {/* Scandals */}
                {selectedPolitician.scandals.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-lg font-bold text-rebel-400 mb-3">
                      Scandals ({selectedPolitician.scandals.length})
                    </h4>
                    <div className="space-y-3">
                      {selectedPolitician.scandals.map((scandal) => (
                        <div key={scandal.id} className="bg-corruption-700 rounded-lg p-3">
                          <div className="flex items-start justify-between mb-2">
                            <h5 className="font-semibold text-corruption-200 text-sm">
                              {scandal.title}
                            </h5>
                            <span className={`text-xs px-2 py-1 rounded ${getSeverityColor(scandal.severity)}`}>
                              {scandal.severity}
                            </span>
                          </div>
                          <p className="text-xs text-corruption-400 mb-2">
                            {scandal.description}
                          </p>
                          <div className="flex items-center justify-between text-xs text-corruption-500">
                            <span>{new Date(scandal.date).toLocaleDateString()}</span>
                            {scandal.verified && (
                              <div className="flex items-center gap-1 text-truth-400">
                                <Shield className="w-3 h-3" />
                                <span>Verified</span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Financial Info */}
                <div className="mb-6">
                  <h4 className="text-lg font-bold text-truth-400 mb-3">Financial</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-corruption-300">Declared Income:</span>
                      <span className="text-truth-400">€{selectedPolitician.financial.declaredIncome.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-corruption-300">Assets:</span>
                      <span className="text-truth-400">€{selectedPolitician.financial.assets.toLocaleString()}</span>
                    </div>
                    {selectedPolitician.financial.suspiciousTransactions > 0 && (
                      <div className="flex justify-between">
                        <span className="text-corruption-300">Suspicious Transactions:</span>
                        <span className="text-rebel-400">{selectedPolitician.financial.suspiciousTransactions}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <button className="w-full bg-rebel-500 hover:bg-rebel-600 text-white py-2 rounded-lg text-sm font-medium transition-colors">
                    Report Corruption
                  </button>
                  <button className="w-full bg-truth-500 hover:bg-truth-600 text-white py-2 rounded-lg text-sm font-medium transition-colors">
                    View Full Dossier
                  </button>
                </div>

                {/* Last Updated */}
                <div className="mt-4 pt-4 border-t border-corruption-600 text-xs text-corruption-500">
                  Last updated: {new Date(selectedPolitician.lastUpdated).toLocaleDateString()}
                </div>
              </div>
            ) : (
              <div className="bg-corruption-800 rounded-lg p-6 text-center">
                <User className="w-12 h-12 text-corruption-500 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-corruption-400 mb-2">
                  Select a Politician
                </h3>
                <p className="text-sm text-corruption-500">
                  Choose a politician from the list to view their detailed dossier.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
