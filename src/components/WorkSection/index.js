import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import get from 'utils/get';
import simpleFragmentToListItems from 'utils/simpleFragmentToListItems';

import { Slider, List } from 'components/base';

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

  resolveSlideIndex = (slideIndex) => {
    const { activeIndex } = this.state;

    if (slideIndex !== activeIndex) {
      this.setState({ activeIndex: slideIndex});
    }
  }

  render() {
    const { activeIndex, slideCount } = this.state;
    const activeProject = get(this, 'props.selectedWorks')[activeIndex];
    console.log(activeProject)

    return (
      <div className="px1 py8">
        <div>
          <Slider resolveSlideIndex={this.resolveSlideIndex} activeIndex={this.state.activeIndex} transitionMode="fade">
            {get(this, 'props.selectedWorks', []).map(work => (
              <div className="aspect-landscape">
                <img style={{width: '100%'}} alt="project asset" src={get(work, 'fields.media.fields.file.url')} />
              </div>
            ))}
          </Slider>
        </div>
        <div className="col-8 flex">
          <div className="col-4">
            <h2 className="paragraph">{get(activeProject, 'fields.title', '')}</h2>
            <a className="small link underline" alt="project link" href={get(activeProject, 'fields.link')}>
              {get(activeProject, 'fields.linkLabel')}
            </a>
            <span className="color-gray small block">{activeIndex + 1}/{slideCount}</span> 
          </div>
          <div className="col-4 flex justify-end">
            <List 
              title="Stack" 
              listItems={simpleFragmentToListItems(get(activeProject, 'fields.stack.simpleFragments', {}))} 
            />
            <List 
              title="Collaborators" 
              listItems={simpleFragmentToListItems(get(activeProject, 'fields.collaborators.simpleFragments', {}))} 
            />
          </div>
        </div>
         
        <button onClick={this.setNextSlide}>LAST</button>
        <button onClick={this.setNextSlide}>NEXT</button>
      </div>
    );
  }
 }

export default WorkSection;
 