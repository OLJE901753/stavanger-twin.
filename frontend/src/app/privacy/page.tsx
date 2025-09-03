'use client';

import { motion } from 'framer-motion';
import { 
  Shield, 
  Lock, 
  Eye, 
  Database, 
  User, 
  Mail, 
  Trash2, 
  Download,
  CheckCircle,
  AlertTriangle,
  FileText,
  Globe,
  Cpu
} from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-corruption-900 text-foreground py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            <span className="text-truth-400">PRIVACY</span>{' '}
            <span className="text-people-400">POLICY</span>
          </motion.h1>
          <p className="text-xl text-corruption-300 max-w-3xl mx-auto">
            Your privacy is sacred. We collect minimal data, store nothing unnecessary, 
            and fight for your digital rights. GDPR compliant by design.
          </p>
        </div>

        {/* Key Principles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-corruption-800 rounded-lg p-6 text-center"
          >
            <div className="w-12 h-12 bg-truth-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-truth-400" />
            </div>
            <h3 className="text-lg font-bold text-truth-400 mb-2">Minimal Data</h3>
            <p className="text-sm text-corruption-300">
              We only collect what's absolutely necessary for democracy to function.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-corruption-800 rounded-lg p-6 text-center"
          >
            <div className="w-12 h-12 bg-people-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-6 h-6 text-people-400" />
            </div>
            <h3 className="text-lg font-bold text-people-400 mb-2">Blockchain Security</h3>
            <p className="text-sm text-corruption-300">
              Your votes and reports are cryptographically secured and immutable.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-corruption-800 rounded-lg p-6 text-center"
          >
            <div className="w-12 h-12 bg-rebel-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Eye className="w-6 h-6 text-rebel-400" />
            </div>
            <h3 className="text-lg font-bold text-rebel-400 mb-2">Full Transparency</h3>
            <p className="text-sm text-corruption-300">
              Every data point is publicly auditable. No hidden tracking, no dark patterns.
            </p>
          </motion.div>
        </div>

        {/* Data Collection */}
        <div className="bg-corruption-800 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-truth-400 mb-6 flex items-center gap-2">
            <Database className="w-6 h-6" />
            What We Collect
          </h2>
          
          <div className="space-y-6">
            <div className="border-l-4 border-truth-400 pl-6">
              <h3 className="text-lg font-bold text-truth-300 mb-2">Voting Data</h3>
              <p className="text-corruption-300 mb-2">
                When you vote, we store only the essential information:
              </p>
              <ul className="list-disc list-inside text-sm text-corruption-400 space-y-1">
                <li>Your vote choice (YES/NO)</li>
                <li>Policy ID you voted on</li>
                <li>Timestamp of your vote</li>
                <li>Blockchain transaction hash</li>
              </ul>
              <p className="text-sm text-truth-400 mt-2">
                <strong>We do NOT store:</strong> Your IP address, personal identifiers, or any tracking data.
              </p>
            </div>

            <div className="border-l-4 border-people-400 pl-6">
              <h3 className="text-lg font-bold text-people-300 mb-2">Corruption Reports</h3>
              <p className="text-corruption-300 mb-2">
                When you report corruption, we collect:
              </p>
              <ul className="list-disc list-inside text-sm text-corruption-400 space-y-1">
                <li>Report content (anonymized)</li>
                <li>Evidence attachments</li>
                <li>Timestamp of report</li>
                <li>Blockchain verification hash</li>
              </ul>
              <p className="text-sm text-people-400 mt-2">
                <strong>Anonymous by default:</strong> No personal information required for reporting.
              </p>
            </div>

            <div className="border-l-4 border-rebel-400 pl-6">
              <h3 className="text-lg font-bold text-rebel-300 mb-2">Profile Data (Optional)</h3>
              <p className="text-corruption-300 mb-2">
                If you choose to create a profile, we store:
              </p>
              <ul className="list-disc list-inside text-sm text-corruption-400 space-y-1">
                <li>Display name (can be pseudonym)</li>
                <li>District/area (for local relevance)</li>
                <li>Language preference</li>
                <li>Gamification progress (badges, points)</li>
              </ul>
              <p className="text-sm text-rebel-400 mt-2">
                <strong>All optional:</strong> You can use the platform without creating any profile.
              </p>
            </div>
          </div>
        </div>

        {/* Data Usage */}
        <div className="bg-corruption-800 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-truth-400 mb-6 flex items-center gap-2">
            <Cpu className="w-6 h-6" />
            How We Use Your Data
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-people-400">Legitimate Purposes</h3>
              <ul className="space-y-2 text-sm text-corruption-300">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-people-400 mt-0.5 flex-shrink-0" />
                  <span>Counting votes and displaying results</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-people-400 mt-0.5 flex-shrink-0" />
                  <span>Verifying corruption reports</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-people-400 mt-0.5 flex-shrink-0" />
                  <span>Providing gamification features</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-people-400 mt-0.5 flex-shrink-0" />
                  <span>Ensuring platform security</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-rebel-400">What We DON'T Do</h3>
              <ul className="space-y-2 text-sm text-corruption-300">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-rebel-400 mt-0.5 flex-shrink-0" />
                  <span>No advertising or marketing</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-rebel-400 mt-0.5 flex-shrink-0" />
                  <span>No data selling to third parties</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-rebel-400 mt-0.5 flex-shrink-0" />
                  <span>No behavioral tracking</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-rebel-400 mt-0.5 flex-shrink-0" />
                  <span>No profiling for commercial purposes</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Your Rights */}
        <div className="bg-corruption-800 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-truth-400 mb-6 flex items-center gap-2">
            <User className="w-6 h-6" />
            Your GDPR Rights
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Eye className="w-5 h-5 text-truth-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-truth-300">Right to Access</h3>
                  <p className="text-sm text-corruption-400">
                    Request all data we have about you at any time.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Trash2 className="w-5 h-5 text-rebel-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-rebel-300">Right to Erasure</h3>
                  <p className="text-sm text-corruption-400">
                    Delete your account and all associated data.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Download className="w-5 h-5 text-people-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-people-300">Right to Portability</h3>
                  <p className="text-sm text-corruption-400">
                    Export your data in a machine-readable format.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-truth-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-truth-300">Right to Rectification</h3>
                  <p className="text-sm text-corruption-400">
                    Correct any inaccurate personal information.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-people-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-people-300">Right to Object</h3>
                  <p className="text-sm text-corruption-400">
                    Object to processing of your personal data.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Globe className="w-5 h-5 text-rebel-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-rebel-300">Right to Complain</h3>
                  <p className="text-sm text-corruption-400">
                    Lodge a complaint with your data protection authority.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Data Retention */}
        <div className="bg-corruption-800 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-truth-400 mb-6 flex items-center gap-2">
            <Database className="w-6 h-6" />
            Data Retention
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-corruption-700 rounded-lg">
              <div>
                <h3 className="font-bold text-truth-300">Voting Records</h3>
                <p className="text-sm text-corruption-400">Blockchain-verified votes</p>
              </div>
              <span className="text-sm text-people-400 font-semibold">Permanent</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-corruption-700 rounded-lg">
              <div>
                <h3 className="font-bold text-truth-300">Corruption Reports</h3>
                <p className="text-sm text-corruption-400">Public transparency records</p>
              </div>
              <span className="text-sm text-people-400 font-semibold">Permanent</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-corruption-700 rounded-lg">
              <div>
                <h3 className="font-bold text-truth-300">Profile Data</h3>
                <p className="text-sm text-corruption-400">User account information</p>
              </div>
              <span className="text-sm text-truth-400 font-semibold">Until Deleted</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-corruption-700 rounded-lg">
              <div>
                <h3 className="font-bold text-truth-300">Analytics Data</h3>
                <p className="text-sm text-corruption-400">Anonymous usage statistics</p>
              </div>
              <span className="text-sm text-corruption-400 font-semibold">1 Year</span>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="bg-corruption-800 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-truth-400 mb-6 flex items-center gap-2">
            <Mail className="w-6 h-6" />
            Contact & Data Requests
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-bold text-truth-300 mb-3">Data Protection Officer</h3>
              <p className="text-sm text-corruption-300 mb-2">
                For all GDPR-related requests and concerns:
              </p>
              <p className="text-sm text-truth-400">
                Email: privacy@stavanger-twin.no<br />
                Response time: 72 hours
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-truth-300 mb-3">Technical Support</h3>
              <p className="text-sm text-corruption-300 mb-2">
                For technical issues and general questions:
              </p>
              <p className="text-sm text-truth-400">
                Email: support@stavanger-twin.no<br />
                Response time: 24 hours
              </p>
            </div>
          </div>
        </div>

        {/* People's Oath */}
        <div className="bg-gradient-to-r from-truth-600 to-people-600 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Privacy Oath</h2>
          <p className="text-white/90 text-lg mb-6">
            "We protect your data like we protect democracy. Minimal collection, 
            maximum security, complete transparency. Your privacy is not for sale."
          </p>
          <div className="flex items-center justify-center gap-4 text-white/80">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              <span>GDPR Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-5 h-5" />
              <span>Blockchain Secured</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              <span>Fully Transparent</span>
            </div>
          </div>
        </div>

        {/* Last Updated */}
        <div className="text-center mt-8">
          <p className="text-sm text-corruption-500">
            Last updated: December 3, 2024 | Version 1.0
          </p>
        </div>
      </div>
    </div>
  );
}
