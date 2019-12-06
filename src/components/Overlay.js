import React from "react";
import cx from 'classnames';

const Overlay = ({ shouldShowOverlay }) => {

  return (
    <div 
      aria-hidden={ !shouldShowOverlay }
      className={cx('Overlay fixed vw100 vh100 bg-color-black z3', {
      'Overlay--active': shouldShowOverlay
    })}
    >
    </div>
  )
};

export default Overlay;
