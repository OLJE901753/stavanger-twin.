'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  PieChart, 
  Activity,
  DollarSign,
  Users,
  Building,
  TreePine,
  Car,
  Zap,
  AlertTriangle,
  CheckCircle,
  Eye,
  Download
} from 'lucide-react';
import dynamic from 'next/dynamic';

// Dynamically import Plotly to avoid SSR issues
const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

interface PolicySimulation {
  id: string;
  title: string;
  description: string;
  category: 'budget' | 'environment' | 'infrastructure' | 'social';
  impact: {
    economic: number;
    environmental: number;
    social: number;
    political: number;
  };
  timeline: {
    year: number;
    cost: number;
    benefit: number;
    publicSupport: number;
  }[];
  stakeholders: {
    name: string;
    support: number;
    influence: number;
  }[];
}

// Mock policy simulations data
const policySimulations: PolicySimulation[] = [
  {
    id: '1',
    title: 'Parking Fee Increase (50%)',
    description: 'Proposed increase in parking fees to fund infrastructure projects. Citizens overwhelmingly oppose this measure.',
    category: 'budget',
    impact: {
      economic: 7.5,
      environmental: 3.2,
      social: 1.8,
      political: 8.9
    },
    timeline: [
      { year: 2024, cost: 0, benefit: 0, publicSupport: 18 },
      { year: 2025, cost: 2500000, benefit: 1200000, publicSupport: 15 },
      { year: 2026, cost: 2800000, benefit: 1500000, publicSupport: 12 },
      { year: 2027, cost: 3000000, benefit: 1800000, publicSupport: 8 }
    ],
    stakeholders: [
      { name: 'Citizens', support: 18, influence: 9.5 },
      { name: 'City Council', support: 85, influence: 8.0 },
      { name: 'Business Owners', support: 25, influence: 6.5 },
      { name: 'Parking Companies', support: 95, influence: 4.0 }
    ]
  },
  {
    id: '2',
    title: 'Green Energy Initiative',
    description: 'Investment in renewable energy projects for municipal buildings. High public support and environmental benefits.',
    category: 'environment',
    impact: {
      economic: 6.8,
      environmental: 9.2,
      social: 8.5,
      political: 7.1
    },
    timeline: [
      { year: 2024, cost: 5000000, benefit: 0, publicSupport: 80 },
      { year: 2025, cost: 3000000, benefit: 800000, publicSupport: 82 },
      { year: 2026, cost: 2000000, benefit: 1500000, publicSupport: 85 },
      { year: 2027, cost: 1000000, benefit: 2200000, publicSupport: 88 }
    ],
    stakeholders: [
      { name: 'Citizens', support: 80, influence: 9.5 },
      { name: 'Environmental Groups', support: 95, influence: 7.0 },
      { name: 'Energy Companies', support: 60, influence: 8.5 },
      { name: 'City Council', support: 75, influence: 8.0 }
    ]
  },
  {
    id: '3',
    title: 'Public Transport Expansion',
    description: 'Expanding bus routes and frequency to reduce car dependency. Moderate cost with high social impact.',
    category: 'infrastructure',
    impact: {
      economic: 5.5,
      environmental: 8.8,
      social: 9.1,
      political: 6.2
    },
    timeline: [
      { year: 2024, cost: 8000000, benefit: 0, publicSupport: 72 },
      { year: 2025, cost: 4000000, benefit: 1200000, publicSupport: 75 },
      { year: 2026, cost: 3000000, benefit: 2000000, publicSupport: 78 },
      { year: 2027, cost: 2000000, benefit: 2800000, publicSupport: 82 }
    ],
    stakeholders: [
      { name: 'Citizens', support: 72, influence: 9.5 },
      { name: 'Transport Workers', support: 85, influence: 6.0 },
      { name: 'Car Owners', support: 45, influence: 7.5 },
      { name: 'City Council', support: 68, influence: 8.0 }
    ]
  }
];

export default function SimulationsPage() {
  const [selectedSimulation, setSelectedSimulation] = useState<PolicySimulation | null>(null);
  const [activeChart, setActiveChart] = useState<'timeline' | 'impact' | 'stakeholders'>('timeline');

  // Generate Plotly data for timeline chart
  const getTimelineData = (simulation: PolicySimulation) => {
    const years = simulation.timeline.map(t => t.year);
    const costs = simulation.timeline.map(t => t.cost / 1000000); // Convert to millions
    const benefits = simulation.timeline.map(t => t.benefit / 1000000);
    const support = simulation.timeline.map(t => t.publicSupport);

    return [
      {
        x: years,
        y: costs,
        type: 'scatter',
        mode: 'lines+markers',
        name: 'Cost (€M)',
        line: { color: '#ef4444', width: 3 },
        marker: { size: 8 }
      },
      {
        x: years,
        y: benefits,
        type: 'scatter',
        mode: 'lines+markers',
        name: 'Benefit (€M)',
        line: { color: '#22c55e', width: 3 },
        marker: { size: 8 }
      },
      {
        x: years,
        y: support,
        type: 'scatter',
        mode: 'lines+markers',
        name: 'Public Support (%)',
        line: { color: '#0ea5e9', width: 3 },
        marker: { size: 8 },
        yaxis: 'y2'
      }
    ];
  };

  // Generate Plotly data for impact radar chart
  const getImpactData = (simulation: PolicySimulation) => {
    const categories = ['Economic', 'Environmental', 'Social', 'Political'];
    const values = [
      simulation.impact.economic,
      simulation.impact.environmental,
      simulation.impact.social,
      simulation.impact.political
    ];

    return [{
      type: 'scatterpolar',
      r: values,
      theta: categories,
      fill: 'toself',
      name: simulation.title,
      line: { color: '#0ea5e9' },
      fillcolor: 'rgba(14, 165, 233, 0.2)'
    }];
  };

  // Generate Plotly data for stakeholder support chart
  const getStakeholderData = (simulation: PolicySimulation) => {
    const names = simulation.stakeholders.map(s => s.name);
    const support = simulation.stakeholders.map(s => s.support);
    const influence = simulation.stakeholders.map(s => s.influence);

    return [{
      x: support,
      y: influence,
      mode: 'markers+text',
      type: 'scatter',
      text: names,
      textposition: 'top center',
      marker: {
        size: support.map(s => Math.max(10, s / 2)),
        color: support.map(s => s > 70 ? '#22c55e' : s > 40 ? '#f59e0b' : '#ef4444'),
        opacity: 0.7
      },
      name: 'Stakeholders'
    }];
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'budget': return <DollarSign className="w-5 h-5" />;
      case 'environment': return <TreePine className="w-5 h-5" />;
      case 'infrastructure': return <Building className="w-5 h-5" />;
      case 'social': return <Users className="w-5 h-5" />;
      default: return <BarChart3 className="w-5 h-5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'budget': return 'text-rebel-400 bg-rebel-500/20';
      case 'environment': return 'text-people-400 bg-people-500/20';
      case 'infrastructure': return 'text-truth-400 bg-truth-500/20';
      case 'social': return 'text-f59e0b bg-f59e0b/20';
      default: return 'text-corruption-400 bg-corruption-500/20';
    }
  };

  const getImpactColor = (value: number) => {
    if (value > 7) return 'text-people-400';
    if (value > 5) return 'text-truth-400';
    if (value > 3) return 'text-f59e0b';
    return 'text-rebel-400';
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
            <span className="text-truth-400">POLICY</span>{' '}
            <span className="text-people-400">SIMULATIONS</span>
          </motion.h1>
          <p className="text-xl text-corruption-300 max-w-3xl mx-auto">
            Visualize policy outcomes, track public sentiment, and expose the real impact 
            of political decisions. Data-driven democracy in action.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Policy List */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold text-truth-400 mb-6">
              Active Policies ({policySimulations.length})
            </h2>
            <div className="space-y-4">
              {policySimulations.map((policy) => (
                <motion.div
                  key={policy.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  whileHover={{ scale: 1.02 }}
                  className={`bg-corruption-800 rounded-lg p-4 cursor-pointer transition-all ${
                    selectedSimulation?.id === policy.id ? 'ring-2 ring-truth-400' : 'hover:bg-corruption-700'
                  }`}
                  onClick={() => setSelectedSimulation(policy)}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`p-2 rounded-full ${getCategoryColor(policy.category)}`}>
                      {getCategoryIcon(policy.category)}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-truth-300 mb-1">{policy.title}</h3>
                      <p className="text-sm text-corruption-400 mb-2">{policy.description}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-corruption-400">Economic:</span>
                      <span className={getImpactColor(policy.impact.economic)}>
                        {policy.impact.economic}/10
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-corruption-400">Social:</span>
                      <span className={getImpactColor(policy.impact.social)}>
                        {policy.impact.social}/10
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-corruption-400">Environmental:</span>
                      <span className={getImpactColor(policy.impact.environmental)}>
                        {policy.impact.environmental}/10
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-corruption-400">Political:</span>
                      <span className={getImpactColor(policy.impact.political)}>
                        {policy.impact.political}/10
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-corruption-600">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-corruption-400">Public Support:</span>
                      <span className={`font-semibold ${
                        policy.timeline[0].publicSupport > 70 ? 'text-people-400' :
                        policy.timeline[0].publicSupport > 40 ? 'text-f59e0b' :
                        'text-rebel-400'
                      }`}>
                        {policy.timeline[0].publicSupport}%
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Simulation Charts */}
          <div className="lg:col-span-2">
            {selectedSimulation ? (
              <div className="bg-corruption-800 rounded-lg p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-truth-400 mb-2">
                      {selectedSimulation.title}
                    </h3>
                    <p className="text-corruption-300 mb-4">{selectedSimulation.description}</p>
                  </div>
                  <button
                    onClick={() => setSelectedSimulation(null)}
                    className="text-corruption-400 hover:text-white"
                  >
                    ✕
                  </button>
                </div>

                {/* Chart Type Selector */}
                <div className="flex gap-2 mb-6">
                  {[
                    { id: 'timeline', label: 'Timeline', icon: <Activity className="w-4 h-4" /> },
                    { id: 'impact', label: 'Impact', icon: <PieChart className="w-4 h-4" /> },
                    { id: 'stakeholders', label: 'Stakeholders', icon: <Users className="w-4 h-4" /> }
                  ].map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setActiveChart(type.id as any)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeChart === type.id
                          ? 'bg-truth-500 text-white'
                          : 'bg-corruption-700 text-corruption-300 hover:bg-corruption-600'
                      }`}
                    >
                      {type.icon}
                      {type.label}
                    </button>
                  ))}
                </div>

                {/* Chart Container */}
                <div className="bg-corruption-900 rounded-lg p-4 mb-6">
                  {activeChart === 'timeline' && (
                    <Plot
                      data={getTimelineData(selectedSimulation)}
                      layout={{
                        title: {
                          text: 'Policy Timeline Analysis',
                          font: { color: '#e2e8f0', size: 16 }
                        },
                        paper_bgcolor: 'rgba(0,0,0,0)',
                        plot_bgcolor: 'rgba(0,0,0,0)',
                        font: { color: '#e2e8f0' },
                        xaxis: {
                          title: 'Year',
                          gridcolor: '#374151',
                          color: '#e2e8f0'
                        },
                        yaxis: {
                          title: 'Amount (€M)',
                          gridcolor: '#374151',
                          color: '#e2e8f0'
                        },
                        yaxis2: {
                          title: 'Public Support (%)',
                          overlaying: 'y',
                          side: 'right',
                          gridcolor: '#374151',
                          color: '#e2e8f0'
                        },
                        legend: {
                          font: { color: '#e2e8f0' }
                        },
                        margin: { t: 50, r: 50, b: 50, l: 50 }
                      }}
                      config={{
                        displayModeBar: false,
                        responsive: true
                      }}
                      style={{ width: '100%', height: '400px' }}
                    />
                  )}

                  {activeChart === 'impact' && (
                    <Plot
                      data={getImpactData(selectedSimulation)}
                      layout={{
                        title: {
                          text: 'Multi-Dimensional Impact Analysis',
                          font: { color: '#e2e8f0', size: 16 }
                        },
                        paper_bgcolor: 'rgba(0,0,0,0)',
                        plot_bgcolor: 'rgba(0,0,0,0)',
                        font: { color: '#e2e8f0' },
                        polar: {
                          radialaxis: {
                            visible: true,
                            range: [0, 10],
                            gridcolor: '#374151',
                            color: '#e2e8f0'
                          },
                          angularaxis: {
                            gridcolor: '#374151',
                            color: '#e2e8f0'
                          }
                        },
                        margin: { t: 50, r: 50, b: 50, l: 50 }
                      }}
                      config={{
                        displayModeBar: false,
                        responsive: true
                      }}
                      style={{ width: '100%', height: '400px' }}
                    />
                  )}

                  {activeChart === 'stakeholders' && (
                    <Plot
                      data={getStakeholderData(selectedSimulation)}
                      layout={{
                        title: {
                          text: 'Stakeholder Support vs Influence',
                          font: { color: '#e2e8f0', size: 16 }
                        },
                        paper_bgcolor: 'rgba(0,0,0,0)',
                        plot_bgcolor: 'rgba(0,0,0,0)',
                        font: { color: '#e2e8f0' },
                        xaxis: {
                          title: 'Support Level (%)',
                          gridcolor: '#374151',
                          color: '#e2e8f0',
                          range: [0, 100]
                        },
                        yaxis: {
                          title: 'Influence Level (1-10)',
                          gridcolor: '#374151',
                          color: '#e2e8f0',
                          range: [0, 10]
                        },
                        margin: { t: 50, r: 50, b: 50, l: 50 }
                      }}
                      config={{
                        displayModeBar: false,
                        responsive: true
                      }}
                      style={{ width: '100%', height: '400px' }}
                    />
                  )}
                </div>

                {/* Key Insights */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-corruption-700 rounded-lg p-4">
                    <h4 className="font-bold text-truth-400 mb-3 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      Key Insights
                    </h4>
                    <ul className="space-y-2 text-sm text-corruption-300">
                      <li>• Public support: {selectedSimulation.timeline[0].publicSupport}%</li>
                      <li>• Total cost: €{selectedSimulation.timeline.reduce((sum, t) => sum + t.cost, 0).toLocaleString()}</li>
                      <li>• Expected benefit: €{selectedSimulation.timeline.reduce((sum, t) => sum + t.benefit, 0).toLocaleString()}</li>
                      <li>• ROI: {((selectedSimulation.timeline.reduce((sum, t) => sum + t.benefit, 0) / selectedSimulation.timeline.reduce((sum, t) => sum + t.cost, 0)) * 100).toFixed(1)}%</li>
                    </ul>
                  </div>

                  <div className="bg-corruption-700 rounded-lg p-4">
                    <h4 className="font-bold text-rebel-400 mb-3 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      Risk Assessment
                    </h4>
                    <ul className="space-y-2 text-sm text-corruption-300">
                      <li>• Political risk: {selectedSimulation.impact.political > 7 ? 'High' : selectedSimulation.impact.political > 4 ? 'Medium' : 'Low'}</li>
                      <li>• Public opposition: {selectedSimulation.timeline[0].publicSupport < 30 ? 'High' : selectedSimulation.timeline[0].publicSupport < 60 ? 'Medium' : 'Low'}</li>
                      <li>• Implementation complexity: {selectedSimulation.impact.economic > 7 ? 'High' : 'Medium'}</li>
                      <li>• Long-term sustainability: {selectedSimulation.impact.environmental > 7 ? 'High' : 'Medium'}</li>
                    </ul>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex gap-4">
                  <button className="flex-1 bg-truth-500 hover:bg-truth-600 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
                    <Eye className="w-4 h-4" />
                    View Detailed Analysis
                  </button>
                  <button className="flex-1 bg-people-500 hover:bg-people-600 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
                    <Download className="w-4 h-4" />
                    Export Data
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-corruption-800 rounded-lg p-12 text-center">
                <BarChart3 className="w-16 h-16 text-corruption-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-corruption-400 mb-2">
                  Select a Policy
                </h3>
                <p className="text-corruption-500">
                  Choose a policy from the list to view detailed simulations and impact analysis.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
