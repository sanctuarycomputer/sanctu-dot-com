import React from 'react';
import PropTypes from 'prop-types';

import get from 'utils/get';

const BlockThreeColumnList = props => {
  const fields = get(props, 'block.fields');
  const header = get(fields, 'header', '');
  const columnOne = get(fields, 'columnOne', '');
  const columnTwo = get(fields, 'columnTwo', '');
  const columnThree = get(fields, 'columnThree', '');
  const marginBottom = get(fields, 'marginBottom', 1);
  const marginTop = get(fields, 'marginTop', 1);

  return (
    <div
      style={{
        marginBottom: `${marginBottom}rem`,
        marginTop: `${marginTop}rem`
      }}
      className="BlockThreeColumnList flex flex-col p1 md:p0 md:flex-row col-8 md:col-6 mxauto"
    >
      {header && (
        <h1 className="BlockThreeColumnList__header paragraph col-8 md:col-4 md:pr2">{header}</h1>
      )}
    </div>
  );
};

BlockThreeColumnList.propTypes = {
  block: PropTypes.shape({
    fields: PropTypes.shape({
      header: PropTypes.string,
      columnOne: PropTypes.string,
      columnTwo: PropTypes.string,
      columnThree: PropTypes.string,
      marginBottom: PropTypes.number,
      marginTop: PropTypes.number
    })
  })
};

export default BlockThreeColumnList;
