import React, { Component } from 'react';
import Link from 'next/link';
import cx from 'classnames';
import { ModalContext } from 'lib/ModalContext';
import { useRouter } from 'next/router';

const Nav = () => {
  const { setCurrentModal } = React.useContext(ModalContext);
  const router = useRouter();

  return (
    <nav>
      <div style={{ height: '50px' }}>{/* Spacer */}</div>

      <div className="fixed  l0 r0 t0 p1 nav-z-index bg-color-white">
        <div
          className={cx('flex', {
            'justify-end': router.pathname === '/',
            'justify-between': router.pathname !== '/',
          })}
        >
          {router.pathname !== '/' && (
            <Link href="/" passHref>
              <a
                className="small link decoration-none"
                aria-label="Visit Sanctuary Computer"
                rel="noopener noreferrer"
              >
                ← Back
              </a>
            </Link>
          )}

          <div className="flex flex-wrap">
            <Link href="/capabilities" passHref>
              <a
                className="small link decoration-none mr_5 md:mr1"
                aria-label="Capabilities"
                rel="noopener noreferrer"
              >
                Capabilities
              </a>
            </Link>

            <a
              className="small link decoration-none mr_5 md:mr1"
              aria-label="Request Pricing Info"
              onClick={() => setCurrentModal('requestPricingInfo')}
            >
              Get Pricing Info
            </a>

            <a
              className="small link decoration-none"
              aria-label="Email us at hello@sanctuary.computer"
              href="mailto:hello@sanctuary.computer"
            >
              <span className="none sm:block">hello@sanctuary.computer</span>
              <span className="block sm:none">Contact</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
