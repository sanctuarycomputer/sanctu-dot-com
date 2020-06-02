import React, { Fragment } from 'react';
import get from 'utils/get';

import Meta from 'components/Meta';
import CaseStudyTopNav from 'components/CaseStudyTopNav';
import CaseStudyBlockSwitch from 'components/CaseStudyBlockSwitch';

const NotificationView = ({ model }) => {
  if (!model || model.isError || !model.sys || !model.fields)
    return <h1>Something went wrong...</h1>;

  return (
    <div className="pt1 px1">
      <img className="pb1" style={{ width: '100px' }} src="/assets/fist.svg" />
      <a
        className="block"
        href="https://www.naacpldf.org/about-us/"
        target="_blank"
      >
        NAACP
      </a>
      <a
        className="block"
        href="https://www.blackvisionsmn.org/about"
        target="_blank"
      >
        Black Visions Collective
      </a>
      <a className="block" href="https://www.nonewjails.nyc/" target="_blank">
        No New Jails NYC
      </a>
      <a className="block" href="https://bailproject.org/" target="_blank">
        The Bail Project
      </a>
      <a
        className="block"
        href="https://www.knowyourrightscamp.com/"
        target="_blank"
      >
        Know Your Rights Camp
      </a>
      <a
        className="block"
        href="https://actionnetwork.org/fundraising/support-justiceforgeorgefloyd-protesters-in-atlanta"
        target="_blank"
      >
        Atlanta Solidarity Fund
      </a>
      <a
        className="block"
        href="https://www.communityjusticeexchange.org/nbfn-directory"
        target="_blank"
      >
        National Bail Fund Network
      </a>
      <a
        className="block"
        href="https://www.cuapb.org/what_we_do"
        target="_blank"
      >
        Communities United Against Police Brutality
      </a>
      <a
        className="block"
        href="https://twitter.com/BaconTribe/status/1266897075456917504"
        target="_blank"
      >
        Gas Mask Fund
      </a>
      <a
        className="block"
        href="https://northstarhealth.wordpress.com/about-us/"
        target="blank"
      >
        Northstar Health Collective
      </a>
    </div>
  );
};

export default NotificationView;
