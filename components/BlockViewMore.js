import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import get from 'utils/get';
import { ContentfulMedia } from 'models';
import flattenImageData from 'utils/flattenImageData';
import withBreakpoints, { Breakpoints } from 'lib/withBreakpoints';

import { Asset } from 'components/base';

const BlockViewMore = (props) => {
  const currentBreakpoint = get(props, 'currentBreakpoint', '');
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
  const selectedSizes = [
    Breakpoints.EXTRA_SMALL.label,
    Breakpoints.SMALL.label,
  ].includes(currentBreakpoint)
    ? '100vw'
    : '50vw';

  return (
    <div
      style={{
        marginBottom: `${marginBottom}rem`,
        marginTop: `${marginTop}rem`,
      }}
      className="BlockViewMore flex flex-col px1 pb3 md:pb7"
    >
      <div className="flex flex-col">
        {header && <span className="paragraph sm:none pb1">{header}</span>}
        <div className="flex flex-col md:flex-row">
          <div className="md:col-4 flex flex-col pb2 md:pb0">
            {linkOneText && linkOne && (
              <Link href={linkOne} passHref>
                <a
                  className="BlockViewMore__left-side small link decoration-none"
                  aria-label={linkOneText}
                  rel="noopener noreferrer"
                >
                  <div className="flex flex-col">
                    <Asset
                      className="h100 w100 hauto fit-cover"
                      asset={linkOneImage}
                      sizes={selectedSizes}
                    />
                    {linkOneImageCaption && (
                      <p className="image-caption small color-gray-darkest pt1 pb_5">
                        {linkOneImageCaption}
                      </p>
                    )}
                    <p className="pt1">→ {linkOneText}</p>
                  </div>
                </a>
              </Link>
            )}
          </div>
          <div className="md:col-4 flex flex-col">
            {linkTwoText && linkTwo && (
              <Link href={linkTwo} passHref>
                <a
                  className="BlockViewMore__right-side small link decoration-none"
                  aria-label={linkTwoText}
                  rel="noopener noreferrer"
                >
                  <div className="flex flex-col">
                    <Asset
                      className="right-side h100 w100 hauto fit-cover"
                      asset={linkTwoImage}
                      sizes={selectedSizes}
                    />
                    {linkTwoImageCaption && (
                      <p className="image-caption small color-gray-darkest pt1 pb_5">
                        {linkTwoImageCaption}
                      </p>
                    )}
                    <p className="pt1">→ {linkTwoText}</p>
                  </div>
                </a>
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
      marginTop: PropTypes.number,
    }),
  }),
};

export default withBreakpoints(BlockViewMore);
