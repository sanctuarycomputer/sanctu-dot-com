import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import get from 'utils/get';
import { ContentfulMedia } from 'models';
import flattenImageData from 'utils/flattenImageData';

import { Image } from 'components/base';

const BlockViewMore = props => {
  const fields = get(props, 'block.fields');
  const header = get(fields, 'header', '');
  const linkOne = get(fields, 'linkOne', '');
  const linkOneText = get(fields, 'linkOneText', '');
  const linkOneImage = flattenImageData(get(fields, 'linkOneImage', {}));
  const linkOneImageCaption = get(fields, 'linkOneImageCaption', '');
  const linkTwo = get(fields, 'linkTwo', '');
  const linkTwoText = get(fields, 'linkTwoText', '');
  const linkTwoImage = flattenImageData(get(fields, 'linkTwoImage', {}));
  const linkTwoImageCaption = get(fields, 'linkTwoImageCaption', '');
  const marginBottom = get(fields, 'marginBottom', 0);
  const marginTop = get(fields, 'marginTop', 0);

  return (
    <div
      style={{
        marginBottom: `${marginBottom}rem`,
        marginTop: `${marginTop}rem`
      }}
      className="BlockViewMore flex flex-col col-8 md:col-6 mxauto px1 pb3 md:pb7"
    >
      <div className="flex flex-col">
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
                  {linkOneImageCaption && (
                    <p className="image-caption small color-gray-darkest pb_5">
                      {linkOneImageCaption}
                    </p>
                  )}
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
                  {linkTwoImageCaption && (
                    <p className="image-caption small color-gray-darkest pb_5">
                      {linkTwoImageCaption}
                    </p>
                  )}
                  → {linkTwoText}
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

BlockViewMore.propTypes = {
  block: PropTypes.shape({
    fields: PropTypes.shape({
      header: PropTypes.string,
      linkOne: PropTypes.string,
      linkOneText: PropTypes.string,
      linkOneImage: ContentfulMedia,
      linkOneImageCaption: PropTypes.string,
      linkTwo: PropTypes.string,
      linkTwoText: PropTypes.string,
      linkTwoImage: ContentfulMedia,
      linkTwoImageCaption: PropTypes.string,
      marginBottom: PropTypes.number,
      marginTop: PropTypes.number
    })
  })
};

export default BlockViewMore;
