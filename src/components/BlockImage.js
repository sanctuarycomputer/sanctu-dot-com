import React from 'react';
import PropTypes from "prop-types";

import get from 'utils/get';
import flattenImageData from 'utils/flattenImageData';

import { Image } from 'components/base';

const BlockImage = props => {
  const fields = get(props, 'block.fields');
  const image = flattenImageData(get(fields, 'image', {}));
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
        className={`BlockImage__image-container BlockImage__image-container--${imageSize}-${imageAlign}`}
      >
        <Image
          className="w100"
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
    })
  })
};


export default BlockImage;
