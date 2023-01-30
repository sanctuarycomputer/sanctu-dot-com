import React, { useEffect } from 'react';

import 'styles/index.scss';
import HackerDojo from 'lib/HackerDojo';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.HackerDojo = HackerDojo;

      console.log(`
        ╦ ╦┌─┐┬  ┌─┐┌─┐┌┬┐┌─┐  ┌┬┐┌─┐  ┌┬┐┬ ┬┌─┐  ╔╦╗┌─┐ ╦┌─┐
        ║║║├┤ │  │  │ ││││├┤    │ │ │   │ ├─┤├┤    ║║│ │ ║│ │
        ╚╩╝└─┘┴─┘└─┘└─┘┴ ┴└─┘   ┴ └─┘   ┴ ┴ ┴└─┘  ═╩╝└─┘╚╝└─┘
        `);

      console.log('Explore window.HackerDojo for more info', window.HackerDojo);
    }
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
