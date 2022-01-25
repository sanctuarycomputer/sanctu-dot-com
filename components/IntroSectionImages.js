import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import get from 'utils/get';
import flattenImageData from 'utils/flattenImageData';
import withBreakpoints, { Breakpoints } from 'lib/withBreakpoints';

import { Image } from 'components/base';

const getRandomImage = imagesArray =>
  imagesArray[Math.floor(Math.random() * imagesArray.length)];

class IntroSectionImages extends PureComponent {
  constructor(props) {
    super(...arguments);

    this.state = {
      activeImage: getRandomImage(get(props, 'images', []))
    };
  }
  render() {
    const currentBreakpoint = get(this, 'props.currentBreakpoint', '');
    const selectedImage = flattenImageData(this.state.activeImage)
    const selectedSizes = [Breakpoints.EXTRA_SMALL.label, Breakpoints.SMALL.label].includes(currentBreakpoint) ? '100vw' : '50vw';

    return (
      <div className={cx('IntroSectionImages p1 flex flex-col md:flex-row')}>
        <div className="col-8">
          <div className="aspect-portrait">
            <Image
              src={selectedImage.url}
              layout='fill'
              alt={selectedImage.description}
              sizes='50vw'
            />
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
          url: PropTypes.string
        })
      })
    })
  )
};

export default withBreakpoints(IntroSectionImages);
