import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import NukaCarousel from 'nuka-carousel';
import get from 'utils/get';

class Slider extends PureComponent {
  render() {
    return (
      <NukaCarousel
        wrapAround={this.props.wrapAround}
        withoutControls={this.props.withoutControls}
        slideIndex={this.props.activeIndex}
        transitionMode={this.props.transitionMode}
      >
        {React.Children.map(get(this, 'props.children'), child => child)}
      </NukaCarousel>
    );
  }
}

Slider.defaultProps = {
  withoutControls: true,
  transitionMode: 'fade',
  afterSlide: f => f,
  wrapAround: true,
  swiping: true,
};

Slider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  slideIndex: PropTypes.number.isRequired,
  withoutControls: PropTypes.bool,
  transitionMode: PropTypes.string,
  afterSlide: PropTypes.func,
  wrapAround: PropTypes.bool,
  swiping: PropTypes.bool,
};

export default Slider;