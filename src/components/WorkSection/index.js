import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import get from 'utils/get';

import { Slider } from 'components/base';

class WorkSection extends PureComponent {
  constructor(props) {
    super(...arguments);

    this.state = {
      slideCount: get(props, 'selectedWorks', []).length,
      activeIndex: 0
    }
  }

  setNextSlide = () => {
    const { slideCount } = this.state;

    this.setState((state) => {
      const potentialNextSlide = state.activeIndex + 1;
      const lastAvailableSlide = slideCount - 1;
    
      const nextSlideIndex = 
        state.activeIndex < lastAvailableSlide ? potentialNextSlide : 0;

      return { activeIndex: nextSlideIndex };
    })
  }

  setPreviousSlide = () => {
    const { slideCount } = this.state;

    this.setState((state) => {
      const potentialPreviousSlide = state.activeIndex - 1;
      const lastAvailableSlide = slideCount - 1;
    
      const previousSlideIndex = 
        state.activeIndex > lastAvailableSlide ? potentialPreviousSlide : lastAvailableSlide;

      return { activeIndex: previousSlideIndex };
    })
  }

  render() {
    console.log(this.state)
    return (
      <div className="px1 py8">
        <div>
          <Slider activeIndex={this.state.activeIndex} transitionMode="fade">
            {get(this, 'props.selectedWorks', []).map(work => (
              <div className="aspect-landscape">
                <img style={{width: '100%'}} src={get(work, 'fields.media.fields.file.url')} />
              </div>
            ))}
          </Slider>
        </div>
        {get(this, 'props.selectedWorks')[this.state.activeIndex].fields.title}
        <button onClick={this.setNextSlide}>LAST</button>
        <button onClick={this.setNextSlide}>NEXT</button>
      </div>
    );
  }
 }

export default WorkSection;
 