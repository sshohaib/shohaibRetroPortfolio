import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  props: any;
  state: { hasError: boolean; error: any; };
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("System Failure:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black text-green-500 font-mono p-8 flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl font-bold mb-4 border-b border-green-500 pb-2">CRITICAL_SYSTEM_FAILURE</h1>
          <p className="mb-4 text-xl">The application encountered a fatal exception.</p>
          <div className="bg-gray-900 border border-green-700 p-4 rounded max-w-2xl w-full text-left overflow-auto">
             <p className="text-red-500 font-bold mb-2">ERROR_LOG:</p>
             <pre className="whitespace-pre-wrap text-sm">{this.state.error?.toString()}</pre>
          </div>
          <button 
            onClick={() => window.location.reload()}
            className="mt-8 px-6 py-2 border border-green-500 hover:bg-green-500 hover:text-black transition-colors"
          >
            REBOOT_SYSTEM
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);