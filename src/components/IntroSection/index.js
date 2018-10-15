import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import get from 'utils/get';

import cx from 'classnames';
import './IntroSection.scss';

import { Image, Markdown } from 'components/base';

const getRandomImage = imagesArray => imagesArray[Math.floor(Math.random() * imagesArray.length)];

class IntroSection extends PureComponent {
  constructor(props) {
    super(...arguments);

    this.state = {
      activeImage: getRandomImage(get(props, 'images', []))
    };
  }

  render() {
    return (
      <div className={cx('IntroSection flex p1')}>
        <div className="col-6">
          <div className="aspect-portrait">
            <Image bg  style={{ backgroundSize: 'cover', backgorundRepeat: 'no-repeat' }} src={get(this, 'state.activeImage.fields.file.url')} />
          </div>
        </div>
        <div className="col-6 pl1">
          <div className="IntroSection__paragraph-column">
            <Markdown src={get(this, 'props.introParagraph')} />
          </div>
        </div>
      </div>
    );
  }
}

export default IntroSection;