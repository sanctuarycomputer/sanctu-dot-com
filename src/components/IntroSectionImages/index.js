import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import get from 'utils/get';

import cx from 'classnames';
import './IntroSectionImages.scss';

import { Image } from 'components/base';

const getRandomImage = imagesArray => imagesArray[Math.floor(Math.random() * imagesArray.length)];

class IntroSectionImages extends PureComponent {
  constructor(props) {
    super(...arguments);

    this.state = {
      activeImage: getRandomImage(get(props, 'images', []))
    };
  }

  render() {
    return (
      <div className={cx('IntroSectionImages p1 flex flex-col md:flex-row')}>
        <div className="col-8">
          <div className="aspect-portrait">
            <Image className="bg-cover bg-no-repeat" bg src={get(this, 'state.activeImage.fields.file.url')} />
          </div>
        </div>
      </div>
    );
  }
}

IntroSectionImages.propTypes = {
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

export default IntroSectionImages;