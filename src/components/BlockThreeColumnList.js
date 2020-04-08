import React from 'react';
import PropTypes from 'prop-types';

import get from 'utils/get';

import { Markdown } from 'components/base';

const BlockThreeColumnList = props => {
  const fields = get(props, 'block.fields');
  const header = get(fields, 'header', '');
  const columnOne = get(fields, 'columnOne', '');
  const columnTwo = get(fields, 'columnTwo', '');
  const columnThree = get(fields, 'columnThree', '');
  const marginBottom = get(fields, 'marginBottom', 0);
  const marginTop = get(fields, 'marginTop', 0);

  return (
    <div
      style={{
        marginBottom: `${marginBottom}rem`,
        marginTop: `${marginTop}rem`
      }}
      className="BlockThreeColumnList flex flex-col p1 md:p0 col-8 md:col-6 mxauto"
    >
      {header && (
        <h1 className="BlockThreeColumnList__header small col-8 md:col-4 pb2">{header}</h1>
      )}

        <div className="flex flex-col md:flex-row justify-between">
          <p className="pb2 md:pb0 md:col-2">
            <span className="small">1.</span>
            {columnOne && <Markdown fontSize="small" src={columnOne} />}
          </p>
          <p className="pb2 md:pb0 md:col-2">
            <span className="small">2.</span>
            {columnTwo && <Markdown fontSize="small" src={columnTwo} />}
          </p>
          <p className="pb2 md:pb0 md:col-2">
            <span className="small">3.</span>
            {columnThree && <Markdown fontSize="small" src={columnThree} />}
          </p>
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
