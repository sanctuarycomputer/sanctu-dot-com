import React from 'react';
import PropTypes from 'prop-types';

import get from 'utils/get';
import cx from 'classnames';

import { ContentfulMedia } from 'models';

const BlockVideo = props => {
  const fields = get(props, 'block.fields');
  const video = get(fields, 'video', '');
  const videoSize = get(props, 'block.fields.videoSize', 'Full').toLowerCase();
  const autoPlay = get(fields, 'autoPlayVideo', true);
  const loop = get(fields, 'loopVideo', true);

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
      <div
        className={cx({
          'flex sm:col-4 sm:pl1': videoSize === 'half-left-align',
          'flex sm:col-4 sm:pr1': videoSize === 'half-right-align'
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
    </div>
  );
};

BlockVideo.propTypes = {
  block: PropTypes.shape({
    fields: PropTypes.shape({
      video: ContentfulMedia,
      videoSize: PropTypes.string,
      autoPlay: PropTypes.bool,
      loop: PropTypes.bool
    })
  })
};

export default BlockVideo;
