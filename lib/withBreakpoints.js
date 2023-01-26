import React, { Component } from 'react';

export const Breakpoints = {
  EXTRA_SMALL: {
    label: 'EXTRA_SMALL',
    lowerBound: 0,
    upperBound: 640,
  },
  SMALL: {
    label: 'SMALL',
    lowerBound: 640,
    upperBound: 832,
  },
  MEDIUM: {
    label: 'MEDIUM',
    lowerBound: 832,
    upperBound: 1024,
  },
  LARGE: {
    label: 'LARGE',
    lowerBound: 1024,
    upperBound: 1152,
  },
  EXTRA_LARGE: {
    label: 'EXTRA_LARGE',
    lowerBound: 1152,
    upperBound: 1000000,
  },
};

const withBreakpoints = (WrappedComponent) => {
  class WithBreakpoints extends Component {
    constructor(props) {
      super(props);

      this.state = {
        currentBreakpoint: this.getCurrentBreakpoint(),
      };
    }

    componentDidMount() {
      if (typeof window === 'undefined') return;

      window.addEventListener('resize', this.checkBreakpoints);
    }

    componentWillUnmount() {
      if (typeof window === 'undefined') return;

      window.removeEventListener('resize', this.checkBreakpoints);
    }

    checkBreakpoints = () => {
      let currentBreakpoint = this.getCurrentBreakpoint();

      if (currentBreakpoint !== this.state.currentBreakpoint) {
        this.setState({ currentBreakpoint });
      }
    };

    getCurrentBreakpoint = () => {
      if (typeof window === 'undefined') return null;

      const currentViewportWidth = Math.round(window.innerWidth);

      return (
        Object.keys(Breakpoints).find(
          (key) =>
            Breakpoints[key].lowerBound <= currentViewportWidth &&
            Breakpoints[key].upperBound > currentViewportWidth
        ) || null
      );
    };

    render() {
      return (
        <WrappedComponent
          {...this.props}
          currentBreakpoint={this.state.currentBreakpoint}
        />
      );
    }
  }

  return WithBreakpoints;
};

export default withBreakpoints;
