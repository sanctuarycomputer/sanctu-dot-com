import React from 'react';
import PropTypes from 'prop-types';

import get from 'utils/get';
import simpleFragmentToListItems from 'utils/simpleFragmentToListItems';
import cx from 'classnames';

import { SimpleFragment } from 'models';

import { List, Markdown } from 'components/base';

const BlockGeneralInfo = (props) => {
  const fields = get(props, 'block.fields');
  const header = get(fields, 'header', '');
  const description = get(fields, 'description', '');
  const design = get(fields, 'design.simpleFragments', {});
  const techStack = get(fields, 'techStack.simpleFragments', {});
  const contentAlign = get(fields, 'contentAlign', 'Horizontal').toLowerCase();
  const horizontalContentColumn = get(
    fields,
    'horizontalContentColumn',
    'Left'
  ).toLowerCase();
  const marginBottom = get(fields, 'marginBottom', 1);
  const marginTop = get(fields, 'marginTop', 1);
  /* frequently used class conditions */
  const isContentHorizontalRight =
    contentAlign === 'horizontal' && horizontalContentColumn !== 'left';
  const isContentVerticalOrHorizontalLeft =
    (contentAlign === 'horizontal' && horizontalContentColumn === 'left') ||
    contentAlign === 'vertical';

  return (
    <div
      style={{
        marginBottom: `${marginBottom}rem`,
        marginTop: `${marginTop}rem`,
      }}
      className="BlockGeneralInfo px1 flex flex-col"
    >
      <div
        className={cx('col-8', {
          'md:col-4 self-end md:flex md:flex-row': isContentHorizontalRight,
          'md:col-3': isContentVerticalOrHorizontalLeft,
        })}
      >
        {header && (
          <h1
            className={cx('BlockGeneralInfo__header paragraph mb1_5', {
              'md:col-6': isContentHorizontalRight,
            })}
          >
            {header}
          </h1>
        )}
      </div>
      <div
        className={cx('flex flex-col', {
          'md:justify-between': contentAlign === 'horizontal',
          'md:flex-row': isContentVerticalOrHorizontalLeft,
          'md:flex-row-reverse': isContentHorizontalRight,
          'md:flex-col': contentAlign === 'vertical',
        })}
      >
        <div
          className={cx('col-8 mb2', {
            'md:col-3': isContentVerticalOrHorizontalLeft,
            'md:col-4 md:flex md:flex-row': isContentHorizontalRight,
          })}
        >
          {description && (
            <Markdown
              fontSize="small"
              src={description}
              className={cx({
                'md:col-6': isContentHorizontalRight,
              })}
            />
          )}
        </div>
        <div
          className={cx('col-8 flex flex-row', {
            'md:col-4 justify-end': contentAlign === 'horizontal',
            'md:col-3 justify-between': contentAlign === 'vertical',
          })}
        >
          <div className="col-4 md:col-2">
            <List
              title="Design:"
              listItems={simpleFragmentToListItems(design)}
            />
          </div>
          <div className="col-4 md:col-2 flex justify-end md:justify-start">
            <List
              title="Tech Stack:"
              listItems={simpleFragmentToListItems(techStack)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

BlockGeneralInfo.propTypes = {
  block: PropTypes.shape({
    fields: PropTypes.shape({
      header: PropTypes.string,
      description: PropTypes.string,
      design: SimpleFragment,
      techStack: SimpleFragment,
      contentAlign: PropTypes.string,
      marginBottom: PropTypes.number,
      marginTop: PropTypes.number,
    }),
  }),
};

export default BlockGeneralInfo;
