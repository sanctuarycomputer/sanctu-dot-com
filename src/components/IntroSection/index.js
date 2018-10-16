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
      <div className={cx('IntroSection p1 flex flex-col md:flex-row')}>
        <div className="col-8 md:col-4">
          <div className="aspect-portrait">
            <Image className="bg-cover bg-no-repeat" bg src={get(this, 'state.activeImage.fields.file.url')} />
          </div>
        </div>
        <div className="col-8 pl1 order-first md:col-4 md:order-last">
          <div className="IntroSection__paragraph-column">
            <Markdown src={get(this, 'props.introParagraph')} />
          </div>
        </div>
      </div>
    );
  }
}

IntroSection.propTypes = {
  introParagraph: PropTypes.string,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      fields: PropTypes.shape({
        file: PropTypes.shape({
          url: PropTypes.string,
        })
      })
    })
  )
};

export default IntroSection;