import React from 'react';
import PropTypes from 'prop-types';

import get from 'utils/get';

import { Markdown } from 'components/base';

const BlockThreeColumnList = props => {
  const fields = get(props, 'block.fields');
  const header = get(fields, 'header', '');
  const columnOne = get(fields, 'columnOne', '');
  const columnOneNumber = get(fields, 'columnOneNumber', '');
  const columnTwo = get(fields, 'columnTwo', '');
  const columnTwoNumber = get(fields, 'columnTwoNumber', '');
  const columnThree = get(fields, 'columnThree', '');
  const columnThreeNumber = get(fields, 'columnThreeNumber', '');
  const marginBottom = get(fields, 'marginBottom', 0);
  const marginTop = get(fields, 'marginTop', 0);

  return (
    <div
      style={{
        marginBottom: `${marginBottom}rem`,
        marginTop: `${marginTop}rem`
      }}
      className="BlockThreeColumnList flex flex-col col-8 md:col-5 mxauto px1 md:px0 pb3 md:pb7"
    >
      {header && (
        <h1 className="BlockThreeColumnList__header small col-8 md:col-4 pb2">
          {header}
        </h1>
      )}
      <ol className="flex flex-col md:flex-row">
        {columnOne && (
          <li className="flex flex-row pb2 md:pb0 md:pr1 md:col-4">
            {columnOneNumber && (
              <span className="BlockThreeColumnList__number small pr1">
                {columnOneNumber}
              </span>
            )}
            <Markdown
              className="BlockThreeColumnList__list-item"
              fontSize="small"
              src={columnOne}
            />
          </li>
        )}
        {columnTwo && (
          <li className="flex flex-row pb2 md:pb0 md:pr1 md:col-4">
            {columnTwoNumber && (
              <span className="BlockThreeColumnList__number small pr1">
                {columnTwoNumber}
              </span>
            )}
            <Markdown
              className="BlockThreeColumnList__list-item"
              fontSize="small"
              src={columnTwo}
            />
          </li>
        )}
        {columnThree && (
          <li className="flex flex-row md:pb0 md:pr1 md:col-4">
            {columnThreeNumber && (
              <span className="BlockThreeColumnList__number small pr1">
                {columnThreeNumber}
              </span>
            )}
            <Markdown
              className="BlockThreeColumnList__list-item"
              fontSize="small"
              src={columnThree}
            />
          </li>
        )}
      </ol>
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
      columnOneNumber: PropTypes.string,
      columnTwoNumber: PropTypes.string,
      columnThreeNumber: PropTypes.string,
      marginBottom: PropTypes.number,
      marginTop: PropTypes.number
    })
  })
};

export default BlockThreeColumnList;
