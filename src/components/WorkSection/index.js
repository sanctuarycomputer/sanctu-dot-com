import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import get from 'utils/get';
import simpleFragmentToListItems from 'utils/simpleFragmentToListItems';

import { Slider, List } from 'components/base';

const aspectRatio = 16 / 9;

class WorkSection extends PureComponent {
  constructor(props) {
    super(...arguments);

    this.state = {
      slideCount: get(props, 'selectedWorks', []).length,
      activeIndex: 0,
      containerDimensions: {
        width: 0,
        height: 0
      }
    }

    this.mediaContainer = React.createRef();
    this.infoContainer = React.createRef();
    this.media = {};
  }

  componentDidMount() {
    window.addEventListener('resize', this.adjustSize)
    this.adjustSize();
  }

  adjustSize = () => {
    console.log('i ran')
    const infoHeight = this.infoContainer.current.offsetHeight;
    const mediaWidth = this.mediaContainer.current.offsetWidth;
    const mediaHeight = mediaWidth / aspectRatio;
    const moduleHeight = infoHeight + mediaHeight;

    if (moduleHeight < window.innerHeight) {
      this.setState({ containerDimensions: { width: mediaWidth, height: mediaHeight } });
    } else {
      const newHeight = window.innerHeight - infoHeight;
      const newWidth = newHeight * aspectRatio;
      this.setState({ containerDimensions: { width: newWidth, height: newHeight } });
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
    const { activeIndex, slideCount, containerDimensions: { width, height } } = this.state;
    const activeProject = get(this, 'props.selectedWorks')[activeIndex];
    console.log(this.state.containerDimensions);

    return (
      <div className="px1 py8" style={{maxHeight: '100vh'}}>
        <div ref={this.mediaContainer}>
          <div ref={ref => this.media[activeIndex] = ref}>
            <img style={{width, height}} alt="project asset" src={get(activeProject, 'fields.media.fields.file.url')} />
          </div>
        </div>
        <div ref={this.infoContainer} className="col-8 flex">
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
 