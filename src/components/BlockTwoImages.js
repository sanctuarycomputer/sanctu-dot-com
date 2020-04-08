import React from 'react';
import PropTypes from 'prop-types';

import withBreakpoints, { Breakpoints } from 'lib/withBreakpoints';
import get from 'utils/get';
import flattenImageData from 'utils/flattenImageData';
import cx from 'classnames';

import { ContentfulMedia } from 'models';

import { Image } from 'components/base';

const BlockTwoImages = props => {
  const fields = get(props, 'block.fields');
  const currentBreakpoint = get(props, 'currentBreakpoint', '');
  const desktopImageOne = flattenImageData(get(fields, 'imageOne', {}));
  const desktopImageTwo = flattenImageData(get(fields, 'imageTwo', {}));
  const mobileImageOne = flattenImageData(
    get(fields, 'mobileImageOne', desktopImageOne)
  );
  const mobileImageTwo = flattenImageData(
    get(fields, 'mobileImageTwo', desktopImageTwo)
  );
  const imageOne =
    currentBreakpoint === Breakpoints.EXTRA_SMALL.label ||
    currentBreakpoint === Breakpoints.SMALL.label
      ? mobileImageOne
      : desktopImageOne;
  const imageTwo =
    currentBreakpoint === Breakpoints.EXTRA_SMALL.label ||
    currentBreakpoint === Breakpoints.SMALL.label
      ? mobileImageTwo
      : desktopImageTwo;
  const imageOneCaption = get(fields, 'imageOnecaption', '');
  const imageTwoCaption = get(fields, 'imageTwocaption', '');
  const marginBottom = get(fields, 'marginBottom', 0);
  const marginTop = get(fields, 'marginTop', 0);

  return (
    <div
      style={{
        marginBottom: `${marginBottom}rem`,
        marginTop: `${marginTop}rem`
      }}
      className='BlockTwoImages px1 md:px0 flex pb2 md:pb7'
    >
      <div
        className='BlockTwoImages__image-container overflow-hidden'
      >
        <Image
          className="BlockTwoImages__image h100 w100 md:hauto fit-cover"
          alt={imageOne.description}
          src={imageOne.url}
        />
        { imageOneCaption && <p className="BlockTwoImages__caption small color-gray-darkest mt_5">{imageOneCaption}</p>}
        <Image
          className="BlockTwoImages__image h100 w100 md:hauto fit-cover"
          alt={imageTwo.description}
          src={imageTwo.url}
        />
        { imageTwoCaption && <p className="BlockTwoImages__caption small color-gray-darkest mt_5">{imageTwoCaption}</p>}
      </div>
    </div>
  );
};

BlockTwoImages.propTypes = {
  block: PropTypes.shape({
    fields: PropTypes.shape({
      imageOne: ContentfulMedia,
      imageTwo: ContentfulMedia,
      mobileImageOne: ContentfulMedia,
      mobileImageTwo: ContentfulMedia,
      imageOneCaption: PropTypes.string,
      imageTwoCaption: PropTypes.string,
      marginBottom: PropTypes.number,
      marginTop: PropTypes.number,
    })
  })
};

export default withBreakpoints(BlockTwoImages);
