import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import NukaCarousel from 'nuka-carousel';
import get from 'utils/get';

class Slider extends PureComponent {
  render() {
    return (
      <NukaCarousel
        slideIndex={this.props.activeIndex}
        transitionMode={this.props.transitionMode}
        afterSlide={slideIndex => this.props.resolveSlideIndex(slideIndex)}
      >
        {React.Children.map(get(this, 'props.children'), child => child)}
      </NukaCarousel>
    );
  }
}

export default Slider;