import React from 'react';
import PropTypes from 'prop-types';

import cx from 'classnames';
import simpleFragmentToListItems from 'utils/simpleFragmentToListItems';
import get from 'utils/get';
import { SimpleFragment } from 'models';

import { List } from 'components/base';

const BlockHero = props => {
  const fields = get(props, 'block.fields', {});
  const header = get(fields, 'header', '');
  const description = get(fields, 'description', '');
  const columnOne = get(fields, 'columnOne.simpleFragments', {});
  const columnTwo = get(fields, 'columnTwo.simpleFragments', {});
  const columnThree = get(fields, 'columnThree.simpleFragments', {});
  const columnOneTitle = get(fields, 'columnOneTitle', '');
  const columnTwoTitle = get(fields, 'columnTwoTitle', '');
  const columnThreeTitle = get(fields, 'columnThreeTitle', '');
  const link = get(fields, 'link', '');
  const linkText = get(fields, 'linkText', '');
  const textAlign = get(fields, 'textAlign', 'Bottom').toLowerCase();
  const marginBottom = get(fields, 'marginBottom', 0);
  const marginTop = get(fields, 'marginTop', 0);
  const isTwoColumnList =
    !Object.keys(columnTwo).length || !Object.keys(columnThree).length;

  return (
    <div
      style={{
        marginBottom: `${marginBottom}rem`,
        marginTop: `${marginTop}rem`
      }}
      className="BlockHero flex flex-col px1 pt1 pb2 md:pb7"
    >
      <div
        className={cx('col-8 flex flex-col md:flex-row', {
          'md:items-start': textAlign === 'top',
          'md:items-end': textAlign === 'bottom'
        })}
      >
        {header && (
          <h1 className="BlockHero__header col-8 md:col-4">{header}</h1>
        )}
        {description && (
          <p className="paragraph col-8 md:col-4 mt2 md:mt0">{description}</p>
        )}
      </div>
      <div className="flex flex-row justify-end my3 md:mb6">
        <div className="BlockHero__list flex flex-row col-8 md:col-4">
          <div className="col-4 md:col-3 pb2 md:pb0">
            <List
              title={columnOneTitle}
              listItems={simpleFragmentToListItems(columnOne)}
            />
          </div>
          {!isTwoColumnList ? (
            <>
              <div className="flex col-4 md:col-3 md:justify-start pb2 md:pb0">
                <List
                  title={columnTwoTitle}
                  listItems={simpleFragmentToListItems(columnTwo)}
                />
              </div>
              <div className="flex col-4 md:col-3 md:justify-start">
                <List
                  title={columnThreeTitle}
                  listItems={simpleFragmentToListItems(columnThree)}
                />
              </div>
            </>
          ) : (
            ''
          )}
          {isTwoColumnList && Object.keys(columnTwo).length ? (
            <div className="flex col-4 md:col-3 md:justify-start">
              <List
                title={columnTwoTitle}
                listItems={simpleFragmentToListItems(columnTwo)}
              />
            </div>
          ) : (
            ''
          )}
          {isTwoColumnList && Object.keys(columnThree).length ? (
            <div className="flex col-4 md:col-3 md:justify-start">
              <List
                title={columnThreeTitle}
                listItems={simpleFragmentToListItems(columnThree)}
              />
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
      {linkText && link && (
        <div className="flex flex-row">
          <span className="none md:flex md:col-4"></span>
          <span className="flex flex-row col-4">
            <a
              className="small link underline"
              alt={linkText || 'Visit project'}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {linkText}
            </a>
          </span>
        </div>
      )}
    </div>
  );
};

BlockHero.propTypes = {
  block: PropTypes.shape({
    fields: PropTypes.shape({
      header: PropTypes.string,
      description: PropTypes.string,
      columnOne: SimpleFragment,
      columnTwo: SimpleFragment,
      columnThree: SimpleFragment,
      columnOneTitle: PropTypes.string,
      columnTwoTitle: PropTypes.string,
      columnThreeTitle: PropTypes.string,
      link: PropTypes.string,
      linkText: PropTypes.string,
      textAlign: PropTypes.string,
      marginTop: PropTypes.number,
      marginBottom: PropTypes.number
    })
  })
};

export default BlockHero;
