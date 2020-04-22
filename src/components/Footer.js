import React from 'react';
import SanctuLogoBlack from 'assets/sanctu_logo_black.svg';
import SanctuLogoWhite from 'assets/sanctu_logo_white.svg';

import { Link } from 'react-router-dom';

const Footer = ({ hidden }) => (
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
    <div className="flex justify-end items-end">
      <Link
        className="small link decoration-none"
        aria-label="View our capabilities"
        to="/"
        rel="noopener noreferrer"
      >
        Working with us →
      </Link>
    </div>
  </footer>
);

export default Footer;
