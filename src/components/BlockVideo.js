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
    className={cx('BlockVideo pb2 md:pb7 mxauto', {
      'md:col-8': videoSize === 'full',
      'md:col-8 px1': videoSize === 'xlarge',
      'md:col-6 px1 md:px0': videoSize === 'large'
    })}>
      <video
        className="BlockVideo__video block hauto w100 mxauto"
        autoPlay={autoPlay}
        loop={loop}
        muted
        playsInline
      >
        <source
          src={get(video, 'fields.file.url', '')}
        ></source>
      </video>
    </div>
  );
};

BlockVideo.propTypes = {
  block: PropTypes.shape({
    fields: PropTypes.shape({
      video: ContentfulMedia,
      videoSize: PropTypes.string,
      autoPlay: PropTypes.bool,
      loop: PropTypes.bool,
    })
  })
};

export default BlockVideo;
