import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import get from 'lodash/get';
import throttle from 'lodash/throttle';

import cx from 'classnames';

class CaseStudyTopNav extends Component {
  state = {
    showCaseStudyTopNav: false
  };

  handleScroll = () => {
    const pageOffset =
      get(window, 'pageYOffset', 0) ||
      get(document, 'documentElement.scrollTop', 0);

    const scrollAtBottom =
      get(window, 'innerHeight', 0) + get(window, 'scrollY', 0) >=
      get(document, 'body.offsetHeight', 0) - 450;

    if (pageOffset < 40) {
      this.setState({ showCaseStudyTopNav: false });
    } else {
      if (pageOffset > 0 && !scrollAtBottom) {
        this.setState({ showCaseStudyTopNav: true });
      } else {
        this.setState({ showCaseStudyTopNav: false });
      }
    }
  };

  throttleHandleScrollTop = throttle(this.handleScroll, 150);

  componentDidMount() {
    window.addEventListener('scroll', this.throttleHandleScrollTop);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.throttleHandleScrollTop);
  }

  render() {
    const { showCaseStudyTopNav } = this.state;

    return (
      <>
        <div className="md:none p1">
          <Link
            className="small link decoration-none"
            aria-label="Visit Sanctuary Computer"
            to="/"
            rel="noopener noreferrer"
          >
            ← Back to Sanctuary
          </Link>
        </div>
        <div
          className={cx(
            'CaseStudyTopNav events-none none opacity-0 l0 r0 t0 p1',
            {
              'CaseStudyTopNav--active opacity-1 events-all': showCaseStudyTopNav
            }
          )}
        >
          <Link
            className="small link decoration-none"
            aria-label="Visit Sanctuary Computer"
            to="/"
            rel="noopener noreferrer"
          >
            ← Back to Sanctuary
          </Link>
        </div>
      </>
    );
  }
}

export default CaseStudyTopNav;
