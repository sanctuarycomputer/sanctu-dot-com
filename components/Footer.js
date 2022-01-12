import React from 'react';
import cx from 'classnames';

import Link from 'next/link';

const Footer = ({ hidden, hideCapabilitiesLink }) => (
  <footer
    aria-hidden={hidden}
    className="Footer col-8 p1 flex md:flex-row justify-between"
  >
    <div>
      <img
        className="Footer__icon"
        src={hidden ? '/assets/sanctu_logo_white.svg' : '/assets/sanctu_logo_black.svg'}
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
          href="/capabilities"
          rel="noopener noreferrer"
        >
          Working with us →
        </Link>
      </div>
    )}
  </footer>
);

export default Footer;
