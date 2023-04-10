import React, { useEffect } from 'react';
import Script from 'next/script';

import 'styles/index.scss';
import HackerDojo from 'lib/HackerDojo';
import { PopupButton, useCalendlyEventListener } from 'react-calendly';
import { useRouter } from 'next/router';

function recordConversion() {
  console.log('Will fire conversion events');
  window.gtag &&
    window.gtag('event', 'conversion', {
      send_to: 'AW-557434647/ZQWfCIOv-ZQYEJeO54kC',
    });
  window.lintrk && window.lintrk('track', { conversion_id: 12933769 });
}

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useCalendlyEventListener({
    onProfilePageViewed: () => console.log('onProfilePageViewed'),
    onDateAndTimeSelected: () => console.log('onDateAndTimeSelected'),
    onEventTypeViewed: () => recordConversion(),
    onEventScheduled: (e) => console.log(e.data.payload),
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
        <p className="Note">
          😌 Thank you! We&apos;re looking forward to meeting.
        </p>
      )}

      <PopupButton
        className="ContactCTA"
        url="https://calendly.com/sanctu-compu/hello"
        rootElement={
          typeof window !== 'undefined'
            ? document.getElementById('__next')
            : null
        }
        text="👋 Contact Us"
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
