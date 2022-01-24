import React from 'react';
import cx from 'classnames';
import Image from 'next/image';

import Link from 'next/link';

const Footer = ({ hidden, hideCapabilitiesLink }) => (
  <footer
    aria-hidden={hidden}
    className="Footer col-8 p1 flex md:flex-row justify-between"
  >
    <div>
      <Image
        className="Footer__icon"
        src={hidden ? '/assets/sanctu_logo_white.svg' : '/assets/sanctu_logo_black.svg'}
        alt="sanctuary computer logo"
        width='80'
        height='75'
      />
    </div>

    {!hideCapabilitiesLink && (
      <div className="flex justify-end items-end">
        <Link
          href="/capabilities"
          passHref
        >
          <a
            className={cx('small link decoration-none', {
              'Footer__link--overlay-is-active': hidden,
              'Footer__link--overlay-is-inactive': !hidden
            })}
            aria-label="View our capabilities"
            rel="noopener noreferrer"
          >
            Working with us →
          </a>
        </Link>
      </div>
    )}
  </footer>
);

export default Footer;
