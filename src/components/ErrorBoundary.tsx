import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in component tree:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[60vh] flex items-center justify-center p-4 google-anno-skip" data-google-ad-unit="none">
          <div className="w-full max-w-md rounded-3xl border border-red-500/20 bg-[#181314] p-6 text-center shadow-2xl">
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10 text-red-400">
              <AlertCircle className="h-7 w-7" />
            </div>
            <h3 className="text-xl font-bold text-white">কিছু একটি ত্রুটি হয়েছে</h3>
            <p className="mt-2 text-xs text-gray-400">
              An unexpected error occurred while rendering this interface. Please reload the page to continue your practice session.
            </p>
            <button
              onClick={this.handleReset}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#d7ff64] px-5 py-2 text-xs font-bold text-[#111310] transition hover:bg-[#e6ff8f]"
            >
              <RotateCcw className="h-4 w-4" />
              <span>পেজ রিলোড করুন</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
