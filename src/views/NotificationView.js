import React, { Fragment } from 'react';
import get from 'utils/get';

import Meta from 'components/Meta';
import CaseStudyTopNav from 'components/CaseStudyTopNav';
import CaseStudyBlockSwitch from 'components/CaseStudyBlockSwitch';

const NotificationView = ({ model }) => {
  return (
    <div className="pt1 px1">
      <img className="pb1" style={{ width: '100px' }} src="/assets/fist.svg" />
      <ul>
        <li>
          <a
            className="block pb1"
            href="https://www.instagram.com/justiceforgeorgenyc/"
            target="_blank"
          >
            <strong>
              Live Updates for NYC Protest Sites @justiceforgeorgenyc
            </strong>
          </a>
        </li>
        <li>
          <a
            className="block"
            href="https://www.naacpldf.org/about-us/"
            target="_blank"
          >
            NAACP
          </a>
        </li>
        <li>
          <a
            className="block"
            href="https://www.blackvisionsmn.org/about"
            target="_blank"
          >
            Black Visions Collective
          </a>
        </li>
        <li>
          <a
            className="block"
            href="https://www.nonewjails.nyc/"
            target="_blank"
          >
            No New Jails NYC
          </a>
        </li>
        <li>
          <a className="block" href="https://bailproject.org/" target="_blank">
            The Bail Project
          </a>
        </li>
        <li>
          <a
            className="block"
            href="https://www.knowyourrightscamp.com/"
            target="_blank"
          >
            Know Your Rights Camp
          </a>
        </li>
        <li>
          <a
            className="block"
            href="https://actionnetwork.org/fundraising/support-justiceforgeorgefloyd-protesters-in-atlanta"
            target="_blank"
          >
            Atlanta Solidarity Fund
          </a>
        </li>
        <li>
          <a
            className="block"
            href="https://www.communityjusticeexchange.org/nbfn-directory"
            target="_blank"
          >
            National Bail Fund Network
          </a>
        </li>
        <li>
          <a
            className="block"
            href="https://www.cuapb.org/what_we_do"
            target="_blank"
          >
            Communities United Against Police Brutality
          </a>
        </li>
        <li>
          <a
            className="block"
            href="https://twitter.com/BaconTribe/status/1266897075456917504"
            target="_blank"
          >
            Gas Mask Fund
          </a>
        </li>
        <li>
          <a
            className="block"
            href="https://northstarhealth.wordpress.com/about-us/"
            target="blank"
          >
            Northstar Health Collective
          </a>
        </li>

        <li>
          <a
            className="block"
            href="https://www.paypal.me/BlackImmigrant"
            target="blank"
          >
            Black Immigrant Collective
          </a>
        </li>
        <li>
          <a
            className="block"
            href="http://www.blacktablearts.com/"
            target="blank"
          >
            Black Table Arts
          </a>
        </li>
        <li>
          <a
            className="block"
            href="https://www.gofundme.com/f/minnesota-poc-business-support?utm_source=customer&utm_medium=copy_link-tip&utm_campaign=p_cp+share-sheet"
            target="blank"
          >
            Du Nord Riot Recovery Fund
          </a>
        </li>
        <li>
          <a
            className="block"
            href="https://www.givemn.org/organization/Littleearth"
            target="blank"
          >
            Little Earth Residents Association Inc
          </a>
        </li>
        <li>
          <a
            className="block"
            href="https://www.paypal.me/mnhealingjustice"
            target="blank"
          >
            The Minnesota Healing Justice Network
          </a>
        </li>
        <li>
          <a
            className="block"
            href="https://secure.everyaction.com/ZNYnUikGcU2b9OAYFs1TeQ2"
            target="blank"
          >
            Women for Political Change
          </a>
        </li>
        <li>
          <a
            className="block"
            href="http://www.blackdisability.org/"
            target="blank"
          >
            National Black Disability Coalition
          </a>
        </li>
        <li>
          <a
            className="block"
            href="https://unicornriot.ninja/donate/"
            target="blank"
          >
            Unicorn Riot
          </a>
        </li>
      </ul>

      <a
        href="https://sanctuarycomputer.github.io/blm-resource-embed/index.html"
        className="embed-link"
        target="_blank"
      >
        [add this to your website]
      </a>
    </div>
  );
};

export default NotificationView;
