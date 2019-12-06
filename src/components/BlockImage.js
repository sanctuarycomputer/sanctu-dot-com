import React from 'react';
import PropTypes from "prop-types";

import get from 'utils/get';
import flattenImageData from 'utils/flattenImageData';
import withBreakpoints, { Breakpoints } from 'lib/withBreakpoints';

import { ContentfulMedia } from "models";

import { Image } from 'components/base';

const BlockImage = props => {
  const fields = get(props, 'block.fields');
  const currentBreakpoint = get(props, 'currentBreakpoint', '');
  const desktopImage = flattenImageData(get(fields, 'image', {}));
  const mobileImage = flattenImageData(get(fields, 'mobileImage', desktopImage));
  const image = currentBreakpoint === Breakpoints.EXTRA_SMALL.label || currentBreakpoint === Breakpoints.SMALL.label ? mobileImage : desktopImage;
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
      className="BlockImage case-study-block-container"
    >
      <div
        className={`BlockImage__image-container BlockImage__image-container--${imageSize}-${imageAlign} overflow-hidden flex items-center justify-center`}
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
