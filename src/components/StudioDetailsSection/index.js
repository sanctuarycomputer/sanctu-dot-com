import React, { PureComponent } from 'react';
import get from 'utils/get';
import simpleFragmentToListItems from 'utils/simpleFragmentToListItems';

import SignUpForm from '../SignUpForm';

import { SimpleFragment } from 'models';

import { List } from 'components/base';

import cx from 'classnames';
import './StudioDetailsSection.scss';

class StudioDetailsSection extends PureComponent {
  render() {
    return (
      <div className={cx('StudioDetailsSection p1 col-8 md:col-4')}>
        <div className="flex flex-col lg:flex-row mb2">
          <div className="col-8 md:col-6">
            <List
              title={`Recent Articles:`}
              listItems={simpleFragmentToListItems(get(this, 'props.recentArticles', {}))}
            />
          </div>
          <div className="col-8 md:col-2 order-first lg:order-last mb2 lg:mb0">
            <List
              title={`Social Media:`}
              listItems={simpleFragmentToListItems(get(this, 'props.socialMedia', {}))}
            />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row flex-wrap mb2">
          <div className="col-8 md:col-6 mb2">
            <List
              title={`Work Spaces for Rent:`}
              listItems={simpleFragmentToListItems(get(this, 'props.workSpaces', {}))}
            />
          </div>
          <div className="col-8 md:col-6 md:order-last mb2">
            <List
              title={`Available Positions`}
              listItems={simpleFragmentToListItems(get(this, 'props.availablePositions', {}))}
            />
          </div>
          <div className="col-8 md:col-2 mb2 lg:mb0">
            <SignUpForm
              title={`Email Updates`}
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
