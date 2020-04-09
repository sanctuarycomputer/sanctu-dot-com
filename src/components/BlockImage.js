import React from 'react';
import PropTypes from 'prop-types';

import withBreakpoints, { Breakpoints } from 'lib/withBreakpoints';
import get from 'utils/get';
import flattenImageData from 'utils/flattenImageData';
import cx from 'classnames';

import { ContentfulMedia } from 'models';

import { Image } from 'components/base';

const BlockImage = props => {
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
  const imageOneCaption = get(fields, 'imageOneCaption', '');
  const imageTwoCaption = get(fields, 'imageTwoCaption', '');
  const marginBottom = get(fields, 'marginBottom', 0);
  const marginTop = get(fields, 'marginTop', 0);
  const imageAlign = get(fields, 'imageAlign', 'Center').toLowerCase();
  const imageVariant = get(fields, 'imageVariant', 'Full').toLowerCase();
  const hasTwoImages = imageVariant === 'two';

  return (
    <div
      style={{
        marginBottom: `${marginBottom}rem`,
        marginTop: `${marginTop}rem`
      }}
      className={cx('BlockImage px1 flex md:pb7', {
        'justify-center': imageAlign === 'center',
        'justify-start': imageAlign === 'left',
        'justify-end': imageAlign === 'right',
        'pb2 md:px0': !hasTwoImages
      })}
    >
      {!hasTwoImages && (
        <div
          className={cx('BlockImage__image-container overflow-hidden', {
            'md:col-8': imageVariant === 'full',
            'md:col-8 md:px1': imageVariant === 'xlarge',
            'md:col-6': imageVariant === 'large',
            'md:col-5': imageVariant === 'medium',
            'md:col-4': imageVariant === 'small',
          })}
        >
          <Image
            className="BlockImage__image h100 w100 md:hauto fit-cover"
            alt={imageOne.description}
            src={imageOne.url}
          />
          { imageOneCaption && <p className="image-caption small color-gray-darkest mt_5">{imageOneCaption}</p>}
        </div>
      )}
      {hasTwoImages && (
        <div
          className='BlockTwoImages__image-container col-8 flex flex-col sm:flex-row'
        >
        <div className="flex flex-col col-8 sm:col-4 pb3 sm:pb0 sm:mr1">
          <Image
            className="BlockTwoImages__image w100"
            alt={imageOne.description}
            src={imageOne.url}
          />
          { imageOneCaption && <p className="image-caption small color-gray-darkest mt_5">{imageOneCaption}</p>}
        </div>
        <div className="flex flex-col col-8 sm:col-4 pb3 sm:pb0">
          <Image
            className="BlockTwoImages__image w100"
            alt={imageTwo.description}
            src={imageTwo.url}
            />
          { imageTwoCaption && <p className="image-caption small color-gray-darkest mt_5">{imageTwoCaption}</p>}
        </div> 
      </div>
    )}
  </div>
  );
};

BlockImage.propTypes = {
  block: PropTypes.shape({
    fields: PropTypes.shape({
      imageAlign: PropTypes.string,
      imageVariant: PropTypes.string,
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

export default withBreakpoints(BlockImage);
