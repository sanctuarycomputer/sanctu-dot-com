import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import get from 'utils/get';
import simpleFragmentToListItems from 'utils/simpleFragmentToListItems';

import { List } from 'components/base';

import cx from 'classnames';
import './AboutSection.scss';

class AboutSection extends PureComponent {
  render() {
    return (
      <div className={cx('AboutSection p1 col-12 md:col-4')}>
        <div className="mb4">
          <List
            title={`What we do:`}
            listItems={simpleFragmentToListItems(get(this, 'props.whatWeDo', {}))}
          />
        </div>
        <div class="flex flex-wrap">
          <div className="mb4 col-4 md:mb0 md:col-2">
            <List
              title={`Selected Clients:`}
              listItems={simpleFragmentToListItems(get(this, 'props.selectedClients', {}))}
            />
          </div>
          <div className="mb4 col-4 md:mb0 md:col-2">
            <List
              title={`Technology Stack:`}
              listItems={simpleFragmentToListItems(get(this, 'props.technologyStack', {}))}
            />
          </div>
          <div className="col-4 md:col-2">
            <List
              title={`Software:`}
              listItems={simpleFragmentToListItems(get(this, 'props.software', {}))}
            />
          </div>
          <div className="col-4 md:col-2">
            <List
              title={`Collaborators:`}
              listItems={simpleFragmentToListItems(get(this, 'props.collaborators', {}))}
            />
          </div>
        </div>
      </div>
    );
  }
}

AboutSection.propTypes = {
};

export default AboutSection;