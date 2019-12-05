import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import NukaCarousel from "nuka-carousel";
import get from "utils/get";

class Slider extends PureComponent {
  componentDidMount() {
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 0);
  }

  render() {
    return (
      <NukaCarousel
        wrapAround={this.props.wrapAround}
        slideIndex={this.props.activeIndex}
        transitionMode={this.props.transitionMode}
      >
        {React.Children.map(get(this, "props.children"), child => child)}
      </NukaCarousel>
    );
  }
}

Slider.defaultProps = {
  transitionMode: "fade",
  afterSlide: f => f,
  wrapAround: true,
  swiping: true,
  slideIndex: 0
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
