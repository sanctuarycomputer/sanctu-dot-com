import React from 'react';
import PropTypes from 'prop-types';
import get from 'utils/get';

const Slider = () => {
  // componentDidMount() {
  //   setTimeout(() => {
  //     window.dispatchEvent(new Event('resize'));
  //   }, 0);
  // }
  //   wrapAround={this.props.wrapAround}
  //   slideIndex={this.props.activeIndex}
  //   transitionMode={this.props.transitionMode}
  //   afterSlide={this.props.afterSlide}

  return (
    <div className="relative overflow-hidden debug">
      <div className="flex debug">
        {React.Children.map(get(this, 'props.children'), child => child)}
      </div>
    </div>
  );
}

Slider.defaultProps = {
  transitionMode: 'fade',
  afterSlide: f => f,
  wrapAround: true,
  swiping: true,
  slideIndex: 0,
};

Slider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  slideIndex: PropTypes.number,
  transitionMode: PropTypes.string,
  afterSlide: PropTypes.func,
  wrapAround: PropTypes.bool,
  swiping: PropTypes.bool
};

export default Slider;
