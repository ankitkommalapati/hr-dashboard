'use client';

import { Component } from 'react';
import Button from '@/components/ui/Button';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[400px] flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Oops! Something went wrong
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              We are sorry for the inconvenience. Please try refreshing the page.
            </p>
            <Button
              onClick={() => window.location.reload()}
              variant="primary"
            >
              Refresh Page
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}