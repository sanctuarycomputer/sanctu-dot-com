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
  const desktopImage = flattenImageData(get(fields, 'image', {}));
  const mobileImage = flattenImageData(
    get(fields, 'mobileImage', desktopImage)
  );
  const image =
    currentBreakpoint === Breakpoints.EXTRA_SMALL.label ||
    currentBreakpoint === Breakpoints.SMALL.label
      ? mobileImage
      : desktopImage;
  const imageAlign = get(fields, 'imageAlign', 'Center').toLowerCase();
  const imageSize = get(fields, 'imageSize', 'Full').toLowerCase();
  const marginBottom = get(fields, 'marginBottom', 1);
  const marginTop = get(fields, 'marginTop', 1);

  return (
    <div
      style={{
        marginBottom: `${marginBottom}rem`,
        marginTop: `${marginTop}rem`
      }}
      className={cx('BlockImage px1 flex', {
        'justify-center': imageAlign === 'center',
        'justify-start': imageAlign === 'left',
        'justify-end': imageAlign === 'right'
      })}
    >
      <div
        className={cx('BlockImage__image-container overflow-hidden', {
          'md:col-12': imageSize === 'full',
          'md:col-6': imageSize === 'large',
          'md:col-5': imageSize === 'medium',
          'md:col-4': imageSize === 'small'
        })}
      >
        <Image
          className="BlockImage__image h100 w100 md:hauto fit-cover"
          alt={image.description}
          src={image.url}
        />
      </div>
    </div>
  );
};

BlockImage.propTypes = {
  block: PropTypes.shape({
    fields: PropTypes.shape({
      image: ContentfulMedia,
      mobileImage: ContentfulMedia,
      imageAlign: PropTypes.string,
      imageSize: PropTypes.string,
      marginBottom: PropTypes.number,
      marginTop: PropTypes.number
    })
  })
};

export default withBreakpoints(BlockImage);
