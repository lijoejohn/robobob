import { Component, ReactNode } from "react";
import { LABELS } from "../constants/language";
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
          <h3 className="">{LABELS.ERROR_TEXT}</h3>
        </div>
      );
    }
    const { children } = this.props;
    return children;
  }
}
