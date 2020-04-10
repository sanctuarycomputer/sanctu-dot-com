import React from 'react';
import PropTypes from 'prop-types';

import get from 'utils/get';

import { Markdown } from 'components/base';

const BlockGeneralParagraph = props => {
  const fields = get(props, 'block.fields');
  const header = get(fields, 'header', '');
  const description = get(fields, 'description', '');
  const marginBottom = get(fields, 'marginBottom', 0);
  const marginTop = get(fields, 'marginTop', 0);

  return (
    <div
      style={{
        marginBottom: `${marginBottom}rem`,
        marginTop: `${marginTop}rem`
      }}
      className="BlockGeneralParagraph flex flex-col md:flex-row col-8 md:col-6 mxauto px1 md:px0 pb2 md:pb10"
    >
      {header && (
        <h1 className="BlockGeneralParagraph__header paragraph col-8 md:col-4 pb2 md:pb0 md:pr2">{header}</h1>
      )}
      <div className="col-8 md:col-4">
        {description && <Markdown fontSize="medium" src={description} />}
      </div>
    </div>
  );
};

BlockGeneralParagraph.propTypes = {
  block: PropTypes.shape({
    fields: PropTypes.shape({
      header: PropTypes.string,
      description: PropTypes.string,
      marginBottom: PropTypes.number,
      marginTop: PropTypes.number
    })
  })
};

export default BlockGeneralParagraph;
