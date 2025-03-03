import React from 'react';
import cx from 'classnames';
import Image from 'next/image';

import Link from 'next/link';

const Footer = ({ hidden, hideCapabilitiesLink }) => (
  <footer
    aria-hidden={hidden}
    className="Footer col-8 p1 flex flex-col md:flex-row mb2 md:mb0 justify-between"
  >
    <div className="flex md:flex-row">
      <Image
        className="Footer__icon"
        src={
          hidden
            ? '/assets/sanctu_logo_white.svg'
            : '/assets/sanctu_logo_black.svg'
        }
        alt="sanctuary computer logo"
        width="80"
        height="75"
      />
      {!hideCapabilitiesLink && (
        <div className="flex pl1 justify-end items-end">
          <Link href="/capabilities" passHref>
            <a
              className={cx('small link decoration-none', {
                'Footer__link--overlay-is-active': hidden,
                'Footer__link--overlay-is-inactive': !hidden,
              })}
              aria-label="View our capabilities"
              rel="noopener noreferrer"
            >
              View our capabilities →
            </a>
          </Link>
        </div>
      )}
    </div>

    <div className="Footer__g3d-link flex items-end mt2">
      <p className="small decoration-none">
        <span>A proud member of</span>
        <Link href="https://garden3d.net" passHref>
          <a
            className={cx('small link ml_25', {
              'Footer__link--overlay-is-active': hidden,
              'Footer__link--overlay-is-inactive': !hidden,
            })}
            aria-label="Go to the garden3D website"
            target="_blank"
            rel="noopener noreferrer"
          >
            garden3D
          </a>
        </Link>
      </p>
    </div>
  </footer>
);

export default Footer;
