import React from 'react';
import PropTypes from 'prop-types';

import get from 'utils/get';

import { Markdown } from 'components/base';

const BlockThreeColumnList = props => {
  const fields = get(props, 'block.fields');
  const header = get(fields, 'header', '');
  const columnOne = get(fields, 'columnOne', '');
  const columnOneHeader = get(fields, 'columnOneHeader', '');
  const columnTwo = get(fields, 'columnTwo', '');
  const columnTwoHeader = get(fields, 'columnTwoHeader', '');
  const columnThree = get(fields, 'columnThree', '');
  const columnThreeHeader = get(fields, 'columnThreeHeader', '');
  const marginBottom = get(fields, 'marginBottom', 0);
  const marginTop = get(fields, 'marginTop', 0);

  return (
    <div
      style={{
        marginBottom: `${marginBottom}rem`,
        marginTop: `${marginTop}rem`
      }}
      className="BlockThreeColumnList flex flex-col col-8 md:col-6 mxauto px1 md:px0 pt3 md:pt0 pb2 md:pb7"
    >
      {header && (
        <h1 className="BlockThreeColumnList__header small col-8 md:col-4 pb2">{header}</h1>
      )}
        <div className="flex flex-col md:flex-row justify-between">
          <div className="pb2 md:pb0 md:col-2">
            {columnOneHeader && <span className="small">{columnOneHeader}</span>}
            {columnOne && <Markdown fontSize="small" src={columnOne} />}
          </div>
          <div className="pb2 md:pb0 md:col-2">
            {columnTwoHeader && <span className="small">{columnTwoHeader}</span>}
            {columnTwo && <Markdown fontSize="small" src={columnTwo} />}
          </div>
          <div className="md:pb0 md:col-2">
            {columnThreeHeader && <span className="small">{columnThreeHeader}</span>}
            {columnThree && <Markdown fontSize="small" src={columnThree} />}
          </div>
        </div>
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
