import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import get from 'utils/get';
import { ContentfulMedia } from 'models';
import flattenImageData from 'utils/flattenImageData';

import { Image } from 'components/base';
import SanctuLogoBlack from 'assets/sanctu_logo_black.svg';

const BlockViewMore = props => {
  const fields = get(props, 'block.fields');
  const header = get(fields, 'header', '');
  const linkOneImage = flattenImageData(get(fields, 'linkOneImage', {}));
  const linkOneText = get(fields, 'linkOneText', '');
  const linkOne = get(fields, 'linkOne', '');
  const linkTwoImage = flattenImageData(get(fields, 'linkTwoImage', {}));
  const linkTwoText = get(fields, 'linkTwoText', '');
  const linkTwo = get(fields, 'linkTwo', '');
  const marginBottom = get(fields, 'marginBottom', 0);
  const marginTop = get(fields, 'marginTop', 0);

  return (
    <div
      style={{
        marginBottom: `${marginBottom}rem`,
        marginTop: `${marginTop}rem`
      }}
      className="BlockViewMore flex flex-col px1 pb1"
    >
      <div className="flex flex-col md:flex-row-reverse md:flex-row justify-between">
        <div className="md:col-4 flex flex-col">
          {header && <span className="small pb1">{header}</span>}
          <div className="flex flex-col md:flex-row">
            <div className="md:col-4 flex flex-col pb2 md:pb0">
              {linkOneText && linkOne && (
                <Link
                  className="small link decoration-none"
                  aria-label={linkOneText}
                  to={linkOne}
                  rel="noopener noreferrer"
                >
                  <div className="flex flex-col">
                    <Image
                      className="h100 w100 hauto fit-cover pb1 md:pr1"
                      alt={linkOneImage.description}
                      src={linkOneImage.url}
                    />
                    → {linkOneText}
                  </div>
                </Link>
              )}
            </div>
            <div className="md:col-4 flex flex-col">
              {linkTwoText && linkTwo && (
                <Link
                  className="small link decoration-none"
                  aria-label={linkTwoText}
                  to={linkTwo}
                  rel="noopener noreferrer"
                >
                  <div className="flex flex-col">
                    <Image
                      className="h100 w100 hauto fit-cover pb1"
                      alt={linkTwoImage.description}
                      src={linkTwoImage.url}
                    />
                    → {linkTwoText}
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
        <div className="col-4 flex flex-col justify-end pt5 md:pt0">
          <img
            className="BlockViewMore__footer-icon"
            src={SanctuLogoBlack}
            alt="Sanctuary Computer logo"
          />
        </div>
      </div>
    </div>
  );
};

BlockViewMore.propTypes = {
  block: PropTypes.shape({
    fields: PropTypes.shape({
      header: PropTypes.string,
      linkOneImage: ContentfulMedia,
      linkOneText: PropTypes.string,
      linkOne: PropTypes.string,
      linkTwoImage: ContentfulMedia,
      linkTwoText: PropTypes.string,
      linkTwo: PropTypes.string,
      marginBottom: PropTypes.number,
      marginTop: PropTypes.number
    })
  })
};

export default BlockViewMore;
