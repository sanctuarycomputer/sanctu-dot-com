import React from 'react';
import PropTypes from 'prop-types';

import flattenImageData from 'utils/flattenImageData';
import get from 'utils/get';

import { ContentfulMedia } from 'models';

import { Image } from 'components/base';
import { Markdown } from 'components/base';

const BlockThreeColumnHero = (props) => {
  const fields = get(props, 'block.fields');
  const header = get(fields, 'header', '');
  const headerDescription = get(fields, 'headerDescription', '');
  const headerImage = flattenImageData(get(fields, 'headerImage', {}));
  const paragraph = get(fields, 'paragraph', '');
  const marginBottom = get(fields, 'marginBottom', 0);
  const marginTop = get(fields, 'marginTop', 0);

  return (
    <div
      style={{
        marginBottom: `${marginBottom}rem`,
        marginTop: `${marginTop}rem`,
      }}
      className="BlockThreeColumnHero flex flex-col pb3 md:pb7"
    >
      <div className="flex flex-col md:flex-row col-8 mxauto px1 py1 md:pb3 justify-between">
        {header && (
          <h1 className="BlockThreeColumnHero__header paragraph md:col-4">
            {header}
          </h1>
        )}
        <div className="none md:flex col-4 justify-between justify-center items-center">
          {headerDescription && (
            <Markdown
              className="BlockThreeColumnHero__header-description tiny"
              src={headerDescription}
            />
          )}
          {headerImage.url && (
            <div className="BlockThreeColumnHero__image">
              <Image
                alt={headerImage.description}
                src={headerImage.url}
                width={headerImage.width}
                height={headerImage.height}
                sizes="50px"
              />
            </div>
          )}
        </div>
      </div>
      {paragraph && (
        <div className="flex md:justify-end px1 pb1 md:pb0">
          <Markdown
            className="BlockThreeColumnHero__paragraph paragraph md:col-4"
            src={paragraph}
          />
        </div>
      )}
      <div className="flex flex-row md:none justify-between px1 pt2 md:pb4">
        <div className="flex col-4">
          {headerDescription && (
            <Markdown
              className="BlockThreeColumnHero__header-description tiny"
              src={headerDescription}
            />
          )}
        </div>
        <div className="flex col-4 justify-end">
          {headerImage.url && (
            <div className="BlockThreeColumnHero__image">
              <Image
                alt={headerImage.description}
                src={headerImage.url}
                width={headerImage.width}
                height={headerImage.height}
                sizes="50px"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

BlockThreeColumnHero.propTypes = {
  block: PropTypes.shape({
    fields: PropTypes.shape({
      header: PropTypes.string,
      headerDescription: PropTypes.string,
      paragraph: PropTypes.string,
      headerImage: ContentfulMedia,
      marginBottom: PropTypes.number,
      marginTop: PropTypes.number,
    }),
  }),
};

export default BlockThreeColumnHero;
