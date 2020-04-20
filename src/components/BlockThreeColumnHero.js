import React from 'react';
import PropTypes from 'prop-types';

import flattenImageData from 'utils/flattenImageData';
import get from 'utils/get';

import { ContentfulMedia } from 'models';

import { Image } from 'components/base';
import { Markdown } from 'components/base';

const BlockThreeColumnHero = props => {
  const fields = get(props, 'block.fields');
  const header = get(fields, 'header', '');
  const description = get(fields, 'description', '');
  const imageOne = flattenImageData(get(fields, 'imageOne', {}));
  const marginBottom = get(fields, 'marginBottom', 0);
  const marginTop = get(fields, 'marginTop', 0);

  return (
    <div
      style={{
        marginBottom: `${marginBottom}rem`,
        marginTop: `${marginTop}rem`
      }}
      className="BlockThreeColumnHero flex flex-col md:flex-row mxauto px1 pt1 pb3 justify-between"
    >
      {header && (
        <h1 className="BlockThreeColumnHero__header paragraph md:col-3">
          {header}
        </h1>
      )}
      <div className="flex md:justify-center items-center md:col-3 py1 md:py0">
        {description && (
          <Markdown
            className="BlockThreeColumnHero__description tiny"
            src={description}
          />
        )}
      </div>
      <div className="flex md:col-3 md:justify-end">
        {imageOne && (
          <Image
            className="BlockThreeColumnHero__image"
            alt={imageOne.description}
            src={imageOne.url}
          />
        )}
      </div>
    </div>
  );
};

BlockThreeColumnHero.propTypes = {
  block: PropTypes.shape({
    fields: PropTypes.shape({
      header: PropTypes.string,
      description: PropTypes.string,
      imageOne: ContentfulMedia,
      marginBottom: PropTypes.number,
      marginTop: PropTypes.number
    })
  })
};

export default BlockThreeColumnHero;
