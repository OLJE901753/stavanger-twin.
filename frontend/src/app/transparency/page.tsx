'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Lock, 
  Eye, 
  CheckCircle, 
  AlertTriangle, 
  TrendingUp, 
  Users, 
  FileText,
  ExternalLink,
  Copy,
  Download,
  Search,
  Filter,
  Calendar,
  Hash,
  Zap,
  Globe,
  Database,
  Cpu,
  Network
} from 'lucide-react';

interface BlockchainRecord {
  id: string;
  type: 'vote' | 'corruption_report' | 'policy_analysis' | 'transparency_update';
  title: string;
  description: string;
  hash: string;
  timestamp: string;
  blockNumber: number;
  verified: boolean;
  data: any;
  impact: 'low' | 'medium' | 'high' | 'critical';
}

interface TransparencyMetrics {
  totalRecords: number;
  verifiedRecords: number;
  corruptionExposed: number;
  votesRecorded: number;
  transparencyScore: number;
  lastUpdate: string;
  blockchainHealth: number;
}

// Mock blockchain records
const blockchainRecords: BlockchainRecord[] = [
  {
    id: '1',
    type: 'vote',
    title: 'Green Energy Initiative Vote',
    description: 'Citizen vote on €5M renewable energy investment',
    hash: '0x1234567890abcdef1234567890abcdef12345678',
    timestamp: '2024-12-03T14:30:00Z',
    blockNumber: 18472947,
    verified: true,
    data: { vote: 'yes', citizenId: 'citizen_001', policyId: 'green_energy_2024' },
    impact: 'high'
  },
  {
    id: '2',
    type: 'corruption_report',
    title: 'Councilor X Undisclosed Interests',
    description: 'Report of undisclosed business interests in parking management',
    hash: '0xabcdef1234567890abcdef1234567890abcdef12',
    timestamp: '2024-12-03T10:15:00Z',
    blockNumber: 18472923,
    verified: true,
    data: { reporterId: 'citizen_002', politicianId: 'councilor_x', evidence: 'business_registry' },
    impact: 'critical'
  },
  {
    id: '3',
    type: 'policy_analysis',
    title: 'Parking Fee Impact Analysis',
    description: 'Comprehensive analysis of parking fee increase proposal',
    hash: '0x567890abcdef1234567890abcdef1234567890ab',
    timestamp: '2024-12-02T16:45:00Z',
    blockNumber: 18472891,
    verified: true,
    data: { analystId: 'policy_team', analysisType: 'economic_impact', methodology: 'cost_benefit' },
    impact: 'high'
  },
  {
    id: '4',
    type: 'transparency_update',
    title: 'Budget Allocation Transparency',
    description: 'Updated budget allocation data for Q4 2024',
    hash: '0x90abcdef1234567890abcdef1234567890abcdef',
    timestamp: '2024-12-01T09:20:00Z',
    blockNumber: 18472845,
    verified: true,
    data: { department: 'finance', period: 'Q4_2024', amount: 2500000, currency: 'EUR' },
    impact: 'medium'
  }
];

// Mock transparency metrics
const mockMetrics: TransparencyMetrics = {
  totalRecords: 1247,
  verifiedRecords: 1247,
  corruptionExposed: 23,
  votesRecorded: 892,
  transparencyScore: 94,
  lastUpdate: '2024-12-03T15:00:00Z',
  blockchainHealth: 99.8
};

export default function TransparencyPage() {
  const [metrics, setMetrics] = useState<TransparencyMetrics>(mockMetrics);
  const [records, setRecords] = useState<BlockchainRecord[]>(blockchainRecords);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [copiedHash, setCopiedHash] = useState<string | null>(null);

  const filteredRecords = records.filter(record => {
    const matchesSearch = record.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.hash.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || record.type === filterType;
    return matchesSearch && matchesType;
  });

  const copyToClipboard = async (text: string, hash: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedHash(hash);
      setTimeout(() => setCopiedHash(null), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'vote': return <Users className="w-4 h-4" />;
      case 'corruption_report': return <AlertTriangle className="w-4 h-4" />;
      case 'policy_analysis': return <FileText className="w-4 h-4" />;
      case 'transparency_update': return <Eye className="w-4 h-4" />;
      default: return <Database className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'vote': return 'text-people-400 bg-people-500/20';
      case 'corruption_report': return 'text-rebel-400 bg-rebel-500/20';
      case 'policy_analysis': return 'text-truth-400 bg-truth-500/20';
      case 'transparency_update': return 'text-truth-400 bg-truth-500/20';
      default: return 'text-corruption-400 bg-corruption-500/20';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
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
            <span className="text-truth-400">TRANSPARENCY</span>{' '}
            <span className="text-people-400">REPORT</span>
          </motion.h1>
          <p className="text-xl text-corruption-300 max-w-3xl mx-auto">
            Blockchain-verified transparency. Every vote, every report, every decision 
            is immutable and publicly auditable. No more hidden corruption.
          </p>
        </div>

        {/* Transparency Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-corruption-800 rounded-lg p-6 text-center"
          >
            <div className="w-12 h-12 bg-truth-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Database className="w-6 h-6 text-truth-400" />
            </div>
            <div className="text-2xl font-bold text-truth-300 mb-1">{metrics.totalRecords.toLocaleString()}</div>
            <div className="text-sm text-corruption-400">Total Records</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-corruption-800 rounded-lg p-6 text-center"
          >
            <div className="w-12 h-12 bg-people-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-6 h-6 text-people-400" />
            </div>
            <div className="text-2xl font-bold text-people-300 mb-1">{metrics.verifiedRecords.toLocaleString()}</div>
            <div className="text-sm text-corruption-400">Verified Records</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-corruption-800 rounded-lg p-6 text-center"
          >
            <div className="w-12 h-12 bg-rebel-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-6 h-6 text-rebel-400" />
            </div>
            <div className="text-2xl font-bold text-rebel-300 mb-1">{metrics.corruptionExposed}</div>
            <div className="text-sm text-corruption-400">Corruption Exposed</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-corruption-800 rounded-lg p-6 text-center"
          >
            <div className="w-12 h-12 bg-truth-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-truth-400" />
            </div>
            <div className="text-2xl font-bold text-truth-300 mb-1">{metrics.transparencyScore}%</div>
            <div className="text-sm text-corruption-400">Transparency Score</div>
          </motion.div>
        </div>

        {/* Blockchain Health */}
        <div className="bg-corruption-800 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-truth-400 flex items-center gap-2">
              <Network className="w-5 h-5" />
              Blockchain Health
            </h2>
            <div className="flex items-center gap-2 text-sm text-truth-400">
              <div className="w-2 h-2 bg-truth-400 rounded-full animate-pulse"></div>
              <span>Live</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-people-400 mb-1">{metrics.blockchainHealth}%</div>
              <div className="text-sm text-corruption-400">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-truth-400 mb-1">Polygon</div>
              <div className="text-sm text-corruption-400">Network</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-truth-400 mb-1">2.3s</div>
              <div className="text-sm text-corruption-400">Avg Block Time</div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-corruption-800 rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-corruption-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search records, hashes, or descriptions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-corruption-700 border border-corruption-600 rounded-lg text-white placeholder-corruption-400 focus:outline-none focus:ring-2 focus:ring-truth-400"
              />
            </div>
            
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="bg-corruption-700 border border-corruption-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-truth-400"
            >
              <option value="all">All Types</option>
              <option value="vote">Votes</option>
              <option value="corruption_report">Corruption Reports</option>
              <option value="policy_analysis">Policy Analysis</option>
              <option value="transparency_update">Transparency Updates</option>
            </select>
          </div>
        </div>

        {/* Blockchain Records */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-truth-400 mb-6">
            Blockchain Records ({filteredRecords.length})
          </h2>
          
          {filteredRecords.map((record, index) => (
            <motion.div
              key={record.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-corruption-800 rounded-lg p-6 hover:bg-corruption-700 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-full ${getTypeColor(record.type)}`}>
                    {getTypeIcon(record.type)}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-truth-300 mb-2">{record.title}</h3>
                    <p className="text-corruption-300 text-sm mb-3">{record.description}</p>
                    
                    <div className="flex items-center gap-4 text-sm text-corruption-400">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(record.timestamp).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Hash className="w-4 h-4" />
                        <span>Block #{record.blockNumber.toLocaleString()}</span>
                      </div>
                      {record.verified && (
                        <div className="flex items-center gap-1 text-truth-400">
                          <CheckCircle className="w-4 h-4" />
                          <span>Verified</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-1 rounded ${getImpactColor(record.impact)}`}>
                    {record.impact.toUpperCase()}
                  </span>
                  <button className="text-corruption-400 hover:text-white">
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Blockchain Hash */}
              <div className="bg-corruption-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-truth-400">Blockchain Hash:</span>
                  <button
                    onClick={() => copyToClipboard(record.hash, record.id)}
                    className="text-corruption-400 hover:text-white transition-colors"
                  >
                    {copiedHash === record.id ? (
                      <CheckCircle className="w-4 h-4 text-people-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
                <code className="text-truth-300 text-sm break-all">{record.hash}</code>
              </div>

              {/* Record Data */}
              <div className="mt-4 bg-corruption-700 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-truth-400 mb-2">Record Data:</h4>
                <pre className="text-xs text-corruption-300 overflow-x-auto">
                  {JSON.stringify(record.data, null, 2)}
                </pre>
              </div>
            </motion.div>
          ))}
        </div>

        {/* People's Oath */}
        <div className="mt-12 bg-gradient-to-r from-truth-600 to-people-600 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">People's Oath</h2>
          <p className="text-white/90 text-lg mb-6">
            "We fight for the people, not the system. For the honor, not the glory. 
            Every record is immutable, every decision is transparent, every voice matters."
          </p>
          <div className="flex items-center justify-center gap-4 text-white/80">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              <span>Blockchain Verified</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-5 h-5" />
              <span>Immutable Records</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              <span>Public Audit</span>
            </div>
          </div>
        </div>

        {/* Export Options */}
        <div className="mt-8 bg-corruption-800 rounded-lg p-6">
          <h3 className="text-lg font-bold text-truth-400 mb-4">Export Data</h3>
          <div className="flex gap-4">
            <button className="bg-truth-500 hover:bg-truth-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export All Records
            </button>
            <button className="bg-people-500 hover:bg-people-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Generate Report
            </button>
            <button className="bg-corruption-600 hover:bg-corruption-500 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2">
              <Globe className="w-4 h-4" />
              Public API
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
