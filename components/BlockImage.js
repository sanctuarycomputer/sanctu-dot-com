import React from 'react';
import PropTypes from 'prop-types';

import withBreakpoints, { Breakpoints } from 'lib/withBreakpoints';
import get from 'utils/get';
import flattenImageData from 'utils/flattenImageData';
import cx from 'classnames';

import { ContentfulMedia } from 'models';

import { Asset } from 'components/base';

const BlockImage = (props) => {
  const fields = get(props, 'block.fields');
  const currentBreakpoint = get(props, 'currentBreakpoint', '');
  const imageHorizontalAlignment = get(
    fields,
    'imageHorizontalAlignment',
    'Center'
  ).toLowerCase();
  const imageVerticalAlignment = get(
    fields,
    'imageVerticalAlignment',
    'Top'
  ).toLowerCase();
  const imageVariant = get(fields, 'imageVariant', 'Full').toLowerCase();
  const desktopImageOne = flattenImageData(get(fields, 'imageOne', {}));
  const desktopImageTwo = flattenImageData(get(fields, 'imageTwo', {}));
  const mobileImageOne = flattenImageData(
    get(fields, 'mobileImageOne', desktopImageOne)
  );
  const mobileImageTwo = flattenImageData(
    get(fields, 'mobileImageTwo', desktopImageTwo)
  );
  const selectedSizes =
    Breakpoints.EXTRA_SMALL.label === currentBreakpoint ? '100vw' : '50vw';
  const isMobile = [
    Breakpoints.EXTRA_SMALL.label,
    Breakpoints.SMALL.label,
  ].includes(currentBreakpoint);
  const imageOne = isMobile ? mobileImageOne : desktopImageOne;
  const imageTwo = isMobile ? mobileImageTwo : desktopImageTwo;
  const imageOneCaption = get(fields, 'imageOneCaption', '');
  const imageTwoCaption = get(fields, 'imageTwoCaption', '');
  const marginBottom = get(fields, 'marginBottom', 0);
  const marginTop = get(fields, 'marginTop', 0);
  const imageOneUrl = imageOne.url;
  const imageTwoUrl = imageTwo.url;
  const hasTwoImages = imageVariant === 'two' && imageOneUrl && imageTwoUrl;
  const hasOneImage = imageVariant !== 'two' && (imageOneUrl || imageTwoUrl);

  return (
    <div
      style={{
        marginBottom: `${marginBottom}rem`,
        marginTop: `${marginTop}rem`,
      }}
      className={cx('BlockImage flex px1 pb3 md:pb12', {
        'justify-center': imageHorizontalAlignment === 'center',
        'justify-start md:px1': imageHorizontalAlignment === 'left',
        'justify-end md:px1': imageHorizontalAlignment === 'right',
        'md:px0': imageVariant === 'full',
      })}
    >
      {hasOneImage && (
        <div
          className={cx('BlockImage__image-container w100', {
            'md:col-8 mxauto':
              imageVariant === 'full' || imageVariant === 'xlarge',
            'md:col-6': imageVariant === 'large',
            'md:col-5': imageVariant === 'medium',
            'md:col-4': imageVariant === 'small',
          })}
        >
          <Asset
            className="w100 hauto fit-cover"
            asset={imageOne}
            sizes={selectedSizes}
          />
          {imageOneCaption && (
            <p className="image-caption small color-gray-darkest mt_5">
              {imageOneCaption}
            </p>
          )}
        </div>
      )}
      {hasTwoImages && (
        <div
          className={cx(
            'BlockTwoImages__image-container col-8 flex flex-col sm:flex-row',
            {
              'sm:items-start': imageVerticalAlignment === 'top',
              'sm:items-end': imageVerticalAlignment === 'bottom',
            }
          )}
        >
          <div className="flex flex-col col-8 sm:col-4 pb3 sm:pb0 sm:mr1">
            <Asset
              className="BlockTwoImages__image w100"
              asset={imageOne}
              sizes={selectedSizes}
            />
            {imageOneCaption && (
              <p className="image-caption small color-gray-darkest mt_5">
                {imageOneCaption}
              </p>
            )}
          </div>
          <div className="flex flex-col col-8 sm:col-4">
            <Asset
              className="BlockTwoImages__image w100"
              asset={imageTwo}
              sizes={selectedSizes}
            />
            {imageTwoCaption && (
              <p className="image-caption small color-gray-darkest mt_5">
                {imageTwoCaption}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

BlockImage.propTypes = {
  block: PropTypes.shape({
    fields: PropTypes.shape({
      imageHorizontalAlignment: PropTypes.string,
      imageVerticalAlignment: PropTypes.string,
      imageVariant: PropTypes.string,
      imageOne: ContentfulMedia,
      imageTwo: ContentfulMedia,
      mobileImageOne: ContentfulMedia,
      mobileImageTwo: ContentfulMedia,
      imageOneCaption: PropTypes.string,
      imageTwoCaption: PropTypes.string,
      marginBottom: PropTypes.number,
      marginTop: PropTypes.number,
    }),
  }),
};

export default withBreakpoints(BlockImage);
