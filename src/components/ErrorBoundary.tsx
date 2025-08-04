import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}
interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("ErrorBoundary caught:", error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div style={{ padding: "2rem", textAlign: "center" }} role="alert">
            <h2>Something went wrong.</h2>
            <button
              style={{ padding: "0.5rem 1.5rem" }}
              onClick={() => this.setState({ hasError: false })}
              aria-label="Retry loading board"
            >
              Retry
            </button>
          </div>
        )
      );
    }
    return this.props.children;
  }
}
