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
      <div className={cx('AboutSection p1')}>
        <List
          title={`What we do:`}
          listItems={simpleFragmentToListItems(get(this, 'props.whatWeDo', {}))}
        />
      </div>
    );
  }
}

AboutSection.propTypes = {
};

export default AboutSection;