import React from 'react';
import cx from 'classnames';

import SanctuLogoBlack from 'assets/sanctu_logo_black.svg';
import SanctuLogoWhite from 'assets/sanctu_logo_white.svg';

import { Link } from 'react-router-dom';

const Footer = ({ hidden, hideCapabilitiesLink }) => (
  <footer
    aria-hidden={hidden}
    className="Footer col-8 p1 flex md:flex-row justify-between"
  >
    <div>
      <img
        className="Footer__icon"
        src={hidden ? SanctuLogoWhite : SanctuLogoBlack}
        alt="sanctuary computer logo"
      />
    </div>

    {!hideCapabilitiesLink && (
      <div className="flex justify-end items-end">
        <Link
          className={cx('small link decoration-none', {
            'Footer__link--overlay-is-active': hidden,
            'Footer__link--overlay-is-inactive': !hidden
          })}
          aria-label="View our capabilities"
          to="/capabilities"
          rel="noopener noreferrer"
        >
          Working with us →
        </Link>
      </div>
    )}
  </footer>
);

export default Footer;
