import React from 'react';
import PropTypes from 'prop-types';

import get from 'utils/get';

const BlockLargeParagraph = props => {
  const fields = get(props, 'block.fields');
  const description = get(fields, 'description', '');
  const marginBottom = get(fields, 'marginBottom', 0);
  const marginTop = get(fields, 'marginTop', 0);

  return (
    <div
      style={{
        marginBottom: `${marginBottom}rem`,
        marginTop: `${marginTop}rem`
      }}
      className='BlockLargeParagraph flex col-8 md:col-5 px1 pb5 md:px0 md:pb7 mxauto'
    >
      {description && (
        <p className="BlockLargeParagraph__description paragraph">{description}</p>
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
