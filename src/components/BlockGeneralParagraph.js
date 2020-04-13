import React from 'react';
import PropTypes from 'prop-types';

import get from 'utils/get';

import { Markdown } from 'components/base';

const BlockGeneralParagraph = props => {
  const fields = get(props, 'block.fields');
  const header = get(fields, 'header', '');
  const description = get(fields, 'description', '');
  const marginBottomDesktop = `md:mb${get(fields, 'marginBottomDesktop', 0)}`;
  const marginTopDesktop = `md:mt${get(fields, 'marginTopDesktop', 0)}`;
  const marginBottomMobile = `mb${get(fields, 'marginBottomMobile', 0)}`;
  const marginTopMobile = `mt${get(fields, 'marginTopMobile', 0)}`;

  return (
    <div
      className={`BlockGeneralParagraph flex flex-col md:flex-row col-8 md:col-5 mxauto px1 md:px0 ${marginBottomMobile} ${marginBottomDesktop} ${marginTopMobile} ${marginTopDesktop}`}
    >
      {header && (
        <h1 className="BlockGeneralParagraph__header paragraph col-8 md:col-4 pb2 md:pb0 md:pr2">
          {header}
        </h1>
      )}
      <div className="col-8 md:col-4">
        {description && (
          <Markdown
            className="BlockGeneralParagraph__paragraph"
            fontSize="small"
            src={description}
          />
        )}
      </div>
    </div>
  );
};

BlockGeneralParagraph.propTypes = {
  block: PropTypes.shape({
    fields: PropTypes.shape({
      header: PropTypes.string,
      description: PropTypes.string,
      marginBottomDesktop: PropTypes.number,
      marginTopDesktop: PropTypes.number,
      marginBottomMobile: PropTypes.number,
      marginTopMobile: PropTypes.number
    })
  })
};

export default BlockGeneralParagraph;
