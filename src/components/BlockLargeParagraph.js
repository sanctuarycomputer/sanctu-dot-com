import React from 'react';
import PropTypes from 'prop-types';

import get from 'utils/get';

const BlockLargeParagraph = props => {
  const fields = get(props, 'block.fields');
  const description = get(fields, 'description', '');
  const marginBottomDesktop = `md:mb${get(fields, 'marginBottomDesktop', 0)}`;
  const marginTopDesktop = `md:mt${get(fields, 'marginTopDesktop', 0)}`;
  const marginBottomMobile = `mb${get(fields, 'marginBottomMobile', 0)}`;
  const marginTopMobile = `mt${get(fields, 'marginTopMobile', 0)}`;

  return (
    <div
      className={`BlockLargeParagraph flex col-8 md:col-5 px1 md:px0 ${marginBottomMobile} ${marginBottomDesktop} ${marginTopMobile} ${marginTopDesktop} mxauto`}
    >
      {description && (
        <p className="BlockLargeParagraph__description paragraph">
          {description}
        </p>
      )}
    </div>
  );
};

BlockLargeParagraph.propTypes = {
  block: PropTypes.shape({
    fields: PropTypes.shape({
      description: PropTypes.string,
      marginBottomDesktop: PropTypes.number,
      marginTopDesktop: PropTypes.number,
      marginBottomMobile: PropTypes.number,
      marginTopMobile: PropTypes.number
    })
  })
};

export default BlockLargeParagraph;
