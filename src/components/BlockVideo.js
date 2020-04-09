import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import withBreakpoints, { Breakpoints } from 'lib/withBreakpoints';
import get from 'utils/get';
import cx from 'classnames';

import { ContentfulMedia } from 'models';

import { Aspects } from 'constants/Sizes';

const { LANDSCAPE } = Aspects;

const VERTICAL_GUTTER = 32;

class BlockVideo extends PureComponent {
  constructor(props) {
    super(...arguments);

    this.state = {
      mediaDimensions: {
        width: 0,
        height: 0
      }
    };

    this.mediaContainer = React.createRef();
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    this.adjustSize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    this.adjustSize();
  };

  adjustSize = () => {
    const mediaWidth = this.mediaContainer.current.offsetWidth;
    const mediaHeight = mediaWidth / LANDSCAPE;

    if (mediaHeight < window.innerHeight) {
      this.setState({
        mediaDimensions: { width: mediaWidth, height: mediaHeight }
      });
    } else {
      const height = window.innerHeight - VERTICAL_GUTTER;
      const width = height * LANDSCAPE;
      this.setState({ mediaDimensions: { width, height } });
    }
  };

  renderVideo = () => {
    const { mediaDimensions } = this.state;
    const fields = get(this.props, 'block.fields');
    const video = get(fields, 'video', '');
    const autoPlay = get(fields, 'autoPlay', true);
    const playOnScroll = get(fields, 'playOnScroll', false);
    const loop = get(fields, 'loop', true);

    return (
      <div className="MediaContainer" ref={this.mediaContainer}>
        <video
          className="block mxauto"
          style={{
            width: mediaDimensions.width,
            height: mediaDimensions.height
          }}
          autoPlay={autoPlay}
          loop={loop}
          muted
          playsInline
        >
          <source
            src={get(video, 'fields.file.url')}
          ></source>
        </video>
      </div>
    );
  };

  render() {
    const videoSize = get(this.props.fields, 'videoSize', 'Full').toLowerCase();

    return (
      <div className={cx('BlockVideo pb2 md:pb7 mxauto', {
        'md:col-8': videoSize === 'full',
        'md:col-6 px1': videoSize === 'large',
        'md:col-5': videoSize === 'medium',
        'md:col-4': videoSize === 'small'
      })}>
      {this.renderVideo()}
      </div>
    )

  };

};

BlockVideo.propTypes = {
  block: PropTypes.shape({
    fields: PropTypes.shape({
      video: ContentfulMedia,
      videoSize: PropTypes.string,
      autoPlay: PropTypes.bool,
      playOnScroll: PropTypes.bool,
      loop: PropTypes.bool,
    })
  })
};

export default withBreakpoints(BlockVideo);
