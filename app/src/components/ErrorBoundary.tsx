import { Component, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public render() {
    const { hasError } = this.state;
    if (hasError) {
      return (
        <div className="error-heading">
          <h3 className="">Something went wrong, Please reload the page</h3>
        </div>
      );
    }
    const { children } = this.props;
    return children;
  }
}
