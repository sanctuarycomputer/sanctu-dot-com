import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import get from 'utils/get';

import cx from 'classnames';
import './IntroSectionParagraph.scss';

import { Markdown } from 'components/base';

class IntroSectionParagraph extends PureComponent {
  render() {
    return (
      <div className={cx('IntroSectionParagraph p1 md:pl0 md:pt0 flex flex-col md:flex-row')}>
        <div className="col-8">
          <div className="IntroSectionParagraph__content md:pt_5">
            <Markdown src={get(this, 'props.introParagraph')} />
          </div>
        </div>
      </div>
    );
  }
}

IntroSectionParagraph.propTypes = {
  introParagraph: PropTypes.string
};

export default IntroSectionParagraph;
