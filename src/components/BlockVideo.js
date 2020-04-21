import React from 'react';
import PropTypes from 'prop-types';

import get from 'utils/get';
import cx from 'classnames';
import flattenImageData from 'utils/flattenImageData';

import { ContentfulMedia } from 'models';
import { Image } from 'components/base';

const BlockVideo = props => {
  const fields = get(props, 'block.fields');
  const video = get(fields, 'video', '');
  const image = flattenImageData(get(fields, 'image', {}));
  const videoSize = get(props, 'block.fields.videoSize', 'Full').toLowerCase();
  const autoPlay = get(fields, 'autoPlayVideo', true);
  const loop = get(fields, 'loopVideo', true);
  const hasTwoElements =
    videoSize === 'two' && image.url && video.fields.file.url;

  return (
    <div
      className={cx('BlockVideo pb3 md:pb7', {
        'md:col-8 mxauto': videoSize === 'full',
        'md:col-8 px1 mxauto': videoSize === 'xlarge',
        'md:col-6 px1 md:px0 mxauto': videoSize === 'large',
        'md:col-8 px1 md:px0 flex sm:justify-start':
          videoSize === 'half-left-align',
        'md:col-8 px1 md:px0 flex sm:justify-end':
          videoSize === 'half-right-align'
      })}
    >
      {!hasTwoElements && (
        <div
          className={cx({
            'sm:col-4 sm:pl1': videoSize === 'half-left-align',
            'sm:col-4 sm:pr1': videoSize === 'half-right-align'
          })}
        >
          <video
            className="BlockVideo__video block hauto w100"
            autoPlay={autoPlay}
            loop={loop}
            muted
            playsInline
          >
            <source src={get(video, 'fields.file.url', '')}></source>
          </video>
        </div>
      )}
      {hasTwoElements && (
        <div
          className={cx({
            'flex flex-col md:flex-row px1': videoSize === 'two'
          })}
        >
          <div className="pb1 md:pb0 md:pr1 md:col-4">
            <video
              className="BlockVideo__video h100 w100 fit-cover"
              autoPlay={autoPlay}
              loop={loop}
              muted
              playsInline
            >
              <source src={get(video, 'fields.file.url', '')}></source>
            </video>
          </div>
          <div className="md:col-4">
            <Image
              className="BlockImage__image h100 w100"
              alt={image.description}
              src={image.url}
            />
          </div>
        </div>
      )}
    </div>
  );
};

BlockVideo.propTypes = {
  block: PropTypes.shape({
    fields: PropTypes.shape({
      video: ContentfulMedia,
      image: ContentfulMedia,
      videoSize: PropTypes.string,
      autoPlay: PropTypes.bool,
      loop: PropTypes.bool
    })
  })
};

export default BlockVideo;
