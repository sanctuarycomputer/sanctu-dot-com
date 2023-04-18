import React, { useEffect } from 'react';
import Script from 'next/script';

import 'styles/index.scss';
import HackerDojo from 'lib/HackerDojo';
import { useCalendlyEventListener } from 'react-calendly';
import { useRouter } from 'next/router';
import Modal from 'react-modal';
import ModalProvider from 'lib/ModalContext';
import Nav from 'components/Nav';
import recordConversion from 'utils/recordConversion';

Modal.setAppElement('#Modal');

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useCalendlyEventListener({
    onProfilePageViewed: () => console.log('onProfilePageViewed'),
    onDateAndTimeSelected: () => console.log('onDateAndTimeSelected'),
    onEventTypeViewed: () => console.log('onEventTypeViewed'),
    onEventScheduled: (e) => recordConversion(),
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.HackerDojo = HackerDojo;

      console.log(`
        ╦ ╦┌─┐┬  ┌─┐┌─┐┌┬┐┌─┐  ┌┬┐┌─┐  ┌┬┐┬ ┬┌─┐  ╔╦╗┌─┐ ╦┌─┐
        ║║║├┤ │  │  │ ││││├┤    │ │ │   │ ├─┤├┤    ║║│ │ ║│ │
        ╚╩╝└─┘┴─┘└─┘└─┘┴ ┴└─┘   ┴ └─┘   ┴ ┴ ┴└─┘  ═╩╝└─┘╚╝└─┘
      `);

      console.log('Explore window.HackerDojo for more info', window.HackerDojo);

      window.document.addEventListener('click', function (e) {
        if (
          e.target &&
          e.target.toString().includes('hello@sanctuary.computer')
        ) {
          recordConversion();
        }
        return true;
      });
    }
  }, []);

  return (
    <>
      <Script src="https://www.google-analytics.com/analytics.js" />
      <Script src="https://www.googletagmanager.com/gtag/js?id=UA-88778470-4" />
      <Script id="linkedin-pixel">
        {`_linkedin_partner_id = "5292849";
          window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
          window._linkedin_data_partner_ids.push(_linkedin_partner_id);
          (function(l) {
          if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
          window.lintrk.q=[]}
          var s = document.getElementsByTagName("script")[0];
          var b = document.createElement("script");
          b.type = "text/javascript";b.async = true;
          b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
          s.parentNode.insertBefore(b, s);})(window.lintrk);`}
      </Script>
      <Script id="google-pixel">
        {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'UA-88778470-4');`}
      </Script>

      {router.query && router.query.note && (
        <p className="Note p1">
          Thank you! We&apos;re looking forward to meeting.
        </p>
      )}

      <ModalProvider>
        <Nav />
        <Component {...pageProps} />
      </ModalProvider>
      <div id="Modal" />
    </>
  );
}

export default MyApp;
