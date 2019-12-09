import React from "react";
import cx from "classnames";
import simpleFragmentToListItems from "utils/simpleFragmentToListItems";

import { List } from "components/base";
import Footer from "components/Footer";
import SignUpForm from "components/SignUpForm";

const Overlay = ({ socialMedia, shouldShowOverlay }) => {

  return (
    <>
      <div 
        aria-hidden={ !shouldShowOverlay }
        className={cx('Overlay fixed vw100 vh100 flex flex-col overflow-hidden col-12 bg-color-gray-darkest color-white z3', {
        'Overlay--active opacity-1': shouldShowOverlay,
        'opacity-0': !shouldShowOverlay,
        })}
      >
        <div className="flex flex-col md:flex-row col-12 justify-between">
          <div className="Overlay__navigation flex flex-col col-2 md:p1">
            <h6 className="small md:block none">Social Media:</h6>
            <div className="Overlay__social-media-list md:block col-4 md:mb5 pb1">
              <List
                listItems={simpleFragmentToListItems(socialMedia)}
              />
            </div>
            <div className="Overlay__sign-up-form none md:block md:mt4">
              <SignUpForm 
                overlayMode={ shouldShowOverlay }
                title={`Email Updates:`} />
            </div>
          </div>
          <div className="Overlay__paragraph py1 pl1_25 md:px3 md:col-4 col-12 pr6">
            <p className="pb2">
              Thanks for visiting Sanctuary Computer. Our website is currently closed.
            </p>
            <p>Hours are Monday to Friday 7 AM - 7 PM.</p>
          </div>
        </div>
        <div className="Overlay__footer fixed b0 r0 pr_5">
          <Footer hidden={ shouldShowOverlay }/>
        </div>
    </div>
    </>
  )
};

export default Overlay;
