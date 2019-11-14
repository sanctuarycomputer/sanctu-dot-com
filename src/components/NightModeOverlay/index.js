import React, { PureComponent } from 'react';
// import get from "utils/get";
// import simpleFragmentToListItems from "utils/simpleFragmentToListItems";

// import { List } from "components/base";
import Footer from "components/Footer";
import SignUpForm from "components/SignUpForm";

import cx from 'classnames';
import "./NightModeOverlay.scss";

class NightModeOverlay extends PureComponent {
  constructor(props) {
    super(...arguments);

    this.state = {
      isActive: this.props.isNightMode
    }

  };

  render() {

    const {
      className
    } = this.props;

    const { isActive } = this.state

    return (
      <div
      className={cx(
        'NightModeOverlay absolute fixed vh100 vw100 flex flex-col z3 col-12 overflow-hidden',
        className
      )}>
        <div className="flex flex-col md:flex-row col-12 justify-between">
          <div className="NightModeOverlay__navigation flex flex-col col-1 p1">
            <div className="small md:block none">Social Media:</div>
              <nav 
                aria-label="Navigation for Sanctuary Computer Social Media Links"
                className="NightModeOverlay__social-media-links md:block col-4 md:mb6 px1 pb1 small">
                  <a href="www.sanctuary.computer" className="block">Twitter</a>
                  <a href="www.sanctuary.computer" className="block">Instagram</a>
                  <a href="www.sanctuary.computer" className="block">Medium</a>
                  <a href="www.sanctuary.computer" className="none md:block">Github</a>
                  <a href="www.sanctuary.computer" className="none md:block">Podcast</a>
              </nav>
            <div className="NightModeOverlay__sign-up-form none md:block md:mt4">
              <SignUpForm title={`Email Updates:`} />
            </div>
          </div>
          <div className="NightModeOverlay__paragraph p1 md:col-4 col-12 pr6">
            <p className="pb2">Thanks for visiting Sanctuary Computer. Our website is currently closed.
            </p>
            <p>Hours are Monday to Friday 7 AM - 7 PM.</p>
          </div>
        </div>
        <div className="NightModeOverlay__footer absolute fixed b0 r0 pr_5">
          <Footer />
        </div>
      </div>
    )
  }
}

export default NightModeOverlay;
