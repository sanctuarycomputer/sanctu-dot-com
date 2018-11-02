import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import get from 'utils/get';

import cx from 'classnames';
import './Gallery.scss';

import { Image } from 'components/base';

class Gallery extends PureComponent {
  render() {        
    return (
      <div className={cx('Gallery p1 flex flex-col')}>
        {
          get(this, 'props.images', []).map((image, index) => {
            if (index === 0 || index % 2 === 0) {
              return (
                <div className="col-8 flex">
                  <div className="col-4 flex flex-col justify-end mr_5 mb1 ">
                    <div>
                      <Image className="w100" src={get(image, 'fields.file.url', '')} />
                    </div>
                  </div>
                  <div className="col-4 flex flex-col justify-end ml_5 mb1 ">
                    <div>
                      <Image className="w100" src={get(this.props.images[index + 1], 'fields.file.url', '')} />
                    </div>
                  </div>
                </div>
              )
            }
          })
        }
      </div>
    );
  }
}

Gallery.propTypes = {
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

export default Gallery;
