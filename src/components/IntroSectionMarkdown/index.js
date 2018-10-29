import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import get from 'utils/get';

import cx from 'classnames';
import './IntroSectionMarkdown.scss';

import { Markdown } from 'components/base';

class IntroSectionMarkdown extends PureComponent {
  constructor(props) {
    super(...arguments);

    this.state = {};
  }

  render() {
    return (
      <div className={cx('IntroSectionMarkdown p1 flex flex-col md:flex-row')}>
        <div className="col-8">
          <div className="IntroSectionMarkdown__paragraph">
            <Markdown src={get(this, 'props.introParagraph')} />
          </div>
        </div>
      </div>
    );
  }
}

IntroSectionMarkdown.propTypes = {
  introParagraph: PropTypes.string
};

export default IntroSectionMarkdown;