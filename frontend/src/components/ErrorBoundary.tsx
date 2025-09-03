'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

// Error boundary for catching JavaScript errors anywhere in the component tree
export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to console for debugging
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // In production, you might want to log this to an error reporting service
    // like Sentry, LogRocket, or similar
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI with rebellious tone
      return (
        <div className="min-h-screen bg-corruption-900 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-corruption-800 rounded-lg p-8 text-center">
            <AlertTriangle className="w-16 h-16 text-rebel-400 mx-auto mb-6" />
            
            <h1 className="text-2xl font-bold text-rebel-300 mb-4">
              System Rebellion Detected
            </h1>
            
            <p className="text-corruption-300 mb-6">
              The establishment's code has failed us! But don't worry - the people's platform 
              is resilient. This error has been logged for our developers to fix.
            </p>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="bg-corruption-700 rounded p-4 mb-6 text-left">
                <h3 className="text-sm font-bold text-rebel-300 mb-2">Error Details:</h3>
                <pre className="text-xs text-corruption-400 overflow-auto">
                  {this.state.error.message}
                </pre>
              </div>
            )}

            <div className="space-y-3">
              <button
                onClick={this.handleRetry}
                className="w-full bg-truth-500 hover:bg-truth-600 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Retry (Fight Back)
              </button>
              
              <Link
                href="/"
                className="w-full bg-corruption-700 hover:bg-corruption-600 text-corruption-200 py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <Home className="w-4 h-4" />
                Return to Democracy Hub
              </Link>
            </div>

            <p className="text-xs text-corruption-500 mt-6">
              For the honor, not the glory - by the people, for the people
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Hook version for functional components
export function useErrorHandler() {
  return (error: Error, errorInfo?: ErrorInfo) => {
    console.error('Error caught by useErrorHandler:', error, errorInfo);
    // You can add additional error reporting logic here
  };
}
