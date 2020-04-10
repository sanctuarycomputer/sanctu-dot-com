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
  const imageCaption = get(fields, 'imageCaption', '');
  const marginBottom = get(fields, 'marginBottom', 0);
  const marginTop = get(fields, 'marginTop', 0);
  const imageAlign = get(fields, 'imageAlign', 'Center').toLowerCase();
  const imageSize = get(fields, 'imageSize', 'Full').toLowerCase();

  return (
    <div
      style={{
        marginBottom: `${marginBottom}rem`,
        marginTop: `${marginTop}rem`
      }}
      className={cx('BlockImage flex px1 md:px0 md:pb10', {
        'justify-center': imageAlign === 'center',
        'justify-start md:px1': imageAlign === 'left',
        'justify-end md:px1': imageAlign === 'right',
        'pb6': imageCaption,
        'pb5': !imageCaption
      })}
    >
      <div
        className={cx('BlockImage__image-container', {
          'md:col-8 mxauto': imageSize === 'full',
          'md:col-8 md:px1 mxauto': imageSize === 'xlarge',
          'md:col-6': imageSize === 'large',
          'md:col-5': imageSize === 'medium',
          'md:col-4': imageSize === 'small',
        })}
      >
        <Image
        className="BlockImage__image h100 w100 hauto fit-cover"
        alt={image.description}
        src={image.url}
        />
        {imageCaption && <p className="image-caption small color-gray-darkest mt_5">{imageCaption}</p>}
    </div>
  </div>
  );
};

BlockImage.propTypes = {
  block: PropTypes.shape({
    fields: PropTypes.shape({
      imageAlign: PropTypes.string,
      imageVariant: PropTypes.string,
      image: ContentfulMedia,
      mobileImage: ContentfulMedia,
      imageCaption: PropTypes.string,
      marginBottom: PropTypes.number,
      marginTop: PropTypes.number,
    })
  })
};

export default withBreakpoints(BlockImage);
