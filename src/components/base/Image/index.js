import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './Image.scss';

class Image extends Component {
  constructor(props) {
    super(...arguments);

    this.state = {
      loaded: false,
      classes: cx('Image preload', props.className),
      styles: cx('Image', props.styleName)
    };
  }

  componentWillMount() {
    const { src } = this.props;
    const loader = new window.Image();
    loader.src = '';
    loader.onload = () => this.didLoad();
    loader.src = src;
  }

  didLoad() {
    if (this.outOfView) return;
    const { className } = this.props;
    const classes = `${className}`;
    const loaded = true;
    this.props.onImgLoad();
    this.setState({ classes, loaded });
  }

  componentWillUnmount() {
    this.outOfView = true;
  }

  render() {
    const { src, alt, style, bg, children } = this.props;
    const { classes } = this.state;
    let bgStyle = {
      ...style,
      backgroundColor: 'gray',
      backgroundImage: `url(${src})`
    };

    const styleNames = cx(styles['Image'], {
      [styles['Image--active']]: this.state.loaded
    });

    if (!bg) {
      return (
        <img
          style={style}
          className={`${classes} ${styleNames}`}
          src={src}
          alt={alt}
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
  onImgLoad: PropTypes.func
};

Image.defaultProps = {
  alt: '',
  bg: false,
  src: '',
  style: {},
  children: null,
  className: 'w100',
  onImgLoad: () => {}
};

export default Image;