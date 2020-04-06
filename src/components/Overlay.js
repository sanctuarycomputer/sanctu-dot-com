import React from "react";
import cx from "classnames";
import simpleFragmentToListItems from "utils/simpleFragmentToListItems";

import { List } from "components/base";
import Footer from "components/Footer";
import SignUpForm from "components/SignUpForm";

const Overlay = ({ socialMedia, shouldShowOverlay }) => {
  
  return (
    <div 
        aria-hidden={ !shouldShowOverlay }
        className={cx('Overlay fixed vw100 vh100 flex flex-col overflow-hidden col-12 bg-color-gray-darkest color-white z3', {
        'Overlay--active opacity-1': shouldShowOverlay,
        'opacity-0': !shouldShowOverlay,
        })}
      >
        <div className="flex flex-col">
          <div className="flex flex-row justify-between items-start pt1 px1 pb2 md:pb4">
            <div className="Overlay__navigation flex flex-col col-2">
                <h6 className="small md:block none">Social Media:</h6>
                <div className="Overlay__social-media-list md:block col-4 md:mb5 pb1">
                  <List
                    listItems={simpleFragmentToListItems(socialMedia)}
                  />
                </div>
            </div>
            <div className="Overlay__paragraph pl1_25 pr6 md:px3 col-12 md:col-4">
              <p>
                Thank you for visiting Sanctuary Computer. Our website is currently closed.
              </p>
            </div>
        </div>
        <div className="flex flex-row justify-between items-start px1">
          <div className="none md:block col-2">
            <SignUpForm 
              overlayMode={ shouldShowOverlay }
              title='Email Updates'
            /> 
          </div>
          <div className="Overlay__paragraph pl1_25 pr6 md:px3 col-12 md:col-4">
            <p>Website hours are Monday to Friday 7 AM - 7 PM (in your browser's local time).</p>
          </div>
        </div>
        <div className="Overlay__footer fixed b0 r0 pr_5">
          <Footer hidden={ shouldShowOverlay }/>
        </div>
      </div>
    </div>
  )
};

export default Overlay;
