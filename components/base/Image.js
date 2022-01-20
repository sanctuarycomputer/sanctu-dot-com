import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import NextImage from 'next/image'

class Image extends Component {
  constructor(props) {
    super(...arguments);

    this.state = {
      loaded: false,
      classes: cx('Image preload', props.className),
      styles: cx('Image', props.styleName)
    };
  }

  onLoadCallBack = () => {
    const { className } = this.props;
    const classes = `${className}`;
    const loaded = true;

    if (this.state.classes === classes && this.state.loaded === loaded) return;

    this.props.onImgLoad();
    this.setState({ classes, loaded });
  }

  render() {
    const { src, alt, style, bg, children, width, height, quality, layout, loading, sizes } = this.props;
    const { classes } = this.state;

    let bgStyle = {
      ...style,
      backgroundColor: 'whitesmoke',
      backgroundImage: `url(${src})`
    };

    if (!bg) {
      if (Object.keys(style).length > 0) {
        console.error('You cannot use style on next/image')
      }

      if (layout !== 'fill' && (!width && !height)) {
        console.error('width and height must supplied for next/image')
      }
    }

    const styleNames = cx('Image', {
      'Image--active': this.state.loaded
    });

    if (!bg) {
      return (
        <NextImage
          className={`${classes} ${styleNames}`}
          src={src}
          alt={alt}
          width={width}
          height={height}
          quality={quality}
          layout={layout}
          loading={loading}
          onLoadingComplete={this.onLoadCallBack}
          sizes={['fixed', 'intrinsic'].includes(layout) ? undefined : sizes}
        />
      );
    }
    return (
      <div className={`${classes} ${styleNames}`} style={bgStyle}>
        {children}
      </div>
    );
  }
}

Image.propTypes = {
  alt: PropTypes.string,
  bg: PropTypes.bool,
  src: PropTypes.string.isRequired,
  style: PropTypes.object,
  className: PropTypes.string,
  styleName: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onImgLoad: PropTypes.func,
  width: PropTypes.number,
  height: PropTypes.number,
  quality: PropTypes.number,
  layout: PropTypes.oneOf(['responsive', 'intrinsic', 'fixed', 'fill']),
  loading: PropTypes.oneOf(['lazy', 'eager']),
  sizes: PropTypes.string,
};

Image.defaultProps = {
  alt: '',
  bg: false,
  src: '',
  style: {},
  children: null,
  className: 'w100',
  onImgLoad: () => {},
  layout: 'responsive',
  quality: 85,
  loading: 'lazy',
  sizes: '100vw',
};

export default Image;
