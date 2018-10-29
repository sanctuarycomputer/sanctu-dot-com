import React, { PureComponent } from 'react';
import get from 'utils/get';
import simpleFragmentToListItems from 'utils/simpleFragmentToListItems';

import { SimpleFragment } from 'models';

import { List } from 'components/base';

import cx from 'classnames';
import './StudioDetailsSection.scss';

class StudioDetailsSection extends PureComponent {
  render() {
    return (
      <div className={cx('StudioDetailsSection p1 col-8 md:col-4')}>
        <div className="flex mb4">
          <div className="col-4">
            <List
              title={`Recent Articles:`}
              listItems={simpleFragmentToListItems(get(this, 'props.recentArticles', {}))}
            />
          </div>
          <div className="col-4">
            <List
              title={`Social Media:`}
              listItems={simpleFragmentToListItems(get(this, 'props.socialMedia', {}))}
            />
          </div>
        </div>
        <div className="flex mb4">
          <div className="col-4">
            <List
              title={`Work Spaces for Rent:`}
              listItems={simpleFragmentToListItems(get(this, 'props.workSpaces', {}))}
            />
          </div>
        </div>
        <div className="flex">
          <div className="col-4">
            <List
              title={`Available Positions`}
              listItems={simpleFragmentToListItems(get(this, 'props.availablePositions', {}))}
            />
          </div>
        </div>
      </div>
    );
  }
}

StudioDetailsSection.propTypes = {
  recentArticles: SimpleFragment,
  socialMedia: SimpleFragment,
  workSpaces: SimpleFragment,
  availablePositions: SimpleFragment,
};

export default StudioDetailsSection;