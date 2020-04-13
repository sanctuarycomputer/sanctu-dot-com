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
  const marginBottomDesktop = `md:mb${get(fields, 'marginBottomDesktop', 0)}`;
  const marginTopDesktop = `md:mt${get(fields, 'marginTopDesktop', 0)}`;
  const marginBottomMobile = `mb${get(fields, 'marginBottomMobile', 0)}`;
  const marginTopMobile = `mt${get(fields, 'marginTopMobile', 0)}`;

  return (
    <div
      className={`BlockThreeColumnList flex flex-col col-8 md:col-5 mxauto px1 md:px0 ${marginBottomMobile} ${marginBottomDesktop} ${marginTopMobile} ${marginTopDesktop}`}
    >
      {header && (
        <h1 className="BlockThreeColumnList__header small col-8 md:col-4 pb2">
          {header}
        </h1>
      )}
      <ol className="flex flex-col md:flex-row justify-between">
        {columnOne && (
          <li className="flex flex-row pb2 md:pb0 md:pr1">
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
          <li className="flex flex-row pb2 md:pb0 md:pr1">
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
          <li className="flex flex-row md:pb0 md:pr1">
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
      marginBottomDesktop: PropTypes.number,
      marginTopDesktop: PropTypes.number,
      marginBottomMobile: PropTypes.number,
      marginTopMobile: PropTypes.number
    })
  })
};

export default BlockThreeColumnList;
