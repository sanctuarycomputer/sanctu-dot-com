import React from 'react';
import PropTypes from 'prop-types';

import get from 'utils/get';
import cx from 'classnames';

const BlockLargeParagraph = props => {
  const fields = get(props, 'block.fields');
  const description = get(fields, 'description', '');
  const link = get(fields, 'link', '');
  const marginBottom = get(fields, 'marginBottom', 1);
  const marginTop = get(fields, 'marginTop', 1);

  return (
    <div
      style={{
        marginBottom: `${marginBottom}rem`,
        marginTop: `${marginTop}rem`
      }}
      className='BlockLargeParagraph flex col-8 md:col-6 p1 md:p0 mxauto'
    >
      {description && (
        <p className="BlockLargeParagraph__description paragraph mb1_5">{description}</p>
      )}
      {link && (
        <p className="BlockLargeParagraph__link paragraph mb1_5">{link}</p>
      )}
    </div>
  );
};

BlockLargeParagraph.propTypes = {
  block: PropTypes.shape({
    fields: PropTypes.shape({
      description: PropTypes.string,
      marginBottom: PropTypes.number,
      marginTop: PropTypes.number
    })
  })
};

export default BlockLargeParagraph;
