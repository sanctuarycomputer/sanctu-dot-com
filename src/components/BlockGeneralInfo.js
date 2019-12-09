import React from 'react';
import PropTypes from 'prop-types';

import get from 'utils/get';
import simpleFragmentToListItems from 'utils/simpleFragmentToListItems';
import cx from 'classnames';

import { SimpleFragment } from 'models';

import { List, Markdown } from 'components/base';

const BlockGeneralInfo = props => {
  const fields = get(props, 'block.fields');
  const header = get(fields, 'header', '');
  const description = get(fields, 'description', '');
  const design = get(fields, 'design.simpleFragments', {});
  const techStack = get(fields, 'techStack.simpleFragments', {});
  const contentAlign = get(fields, 'contentAlign', 'Horizontal').toLowerCase();

  return (
    <div className={cx('BlockGeneralInfo p1 flex flex-col')}>
      <div className="col-8 md:col-3">
        {header && (
          <h1 className="BlockGeneralInfo__header paragraph mb1_5">{header}</h1>
        )}
      </div>
      <div
        className={cx('flex flex-col', {
          'md:flex-row md:justify-between': contentAlign === 'horizontal',
          'md:flex-col': contentAlign === 'vertical'
        })}
      >
        <div className="col-8 md:col-3 mb2">
          {description && <Markdown fontSize="small" src={description} />}
        </div>
        <div
          className={cx('col-8 flex flex-row', {
            'md:col-4 justify-end': contentAlign === 'horizontal',
            'md:col-3 justify-between': contentAlign === 'vertical'
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
      contentAlign: PropTypes.string
    })
  })
};

export default BlockGeneralInfo;
