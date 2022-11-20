import React, { Component } from "react";
import { Redirect } from "wouter";

export class ErrorBoundary extends Component<{ children: React.ReactNode }> {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <Redirect to="/seasons" />;
    }

    return this.props.children;
  }
}
