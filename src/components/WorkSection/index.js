import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import get from 'utils/get';
import simpleFragmentToListItems from 'utils/simpleFragmentToListItems';
import './WorkSection.scss';

import { Slider, List } from 'components/base';

const aspectRatio = 16 / 9;

class WorkSection extends PureComponent {
  constructor(props) {
    super(...arguments);

    this.state = {
      slideCount: get(props, 'selectedWorks', []).length,
      activeIndex: 0,
      mediaDimensions: {
        width: 0,
        height: 0,
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
      this.setState({ mediaDimensions: { width: mediaWidth, height: mediaHeight } });
    } else {
      const height = window.innerHeight - infoHeight;
      const width = height * aspectRatio;
      this.setState({ mediaDimensions: { width, height } });
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
    const { activeIndex, slideCount, mediaDimensions } = this.state;
    const activeProject = get(this, 'props.selectedWorks')[activeIndex];
    console.log(activeProject)

    return (
      <div className="WorkSection px1 py8">
        <div className="MediaContainer" ref={this.mediaContainer}>
          <Slider resolveSlideIndex={this.resolveSlideIndex} activeIndex={this.state.activeIndex} transitionMode="fade">
            {get(this, 'props.selectedWorks', []).map((work, index) => (
              <div ref={ref => this.media[index] = ref}>
                <img style={{ display: 'block', margin: '0 auto', width: mediaDimensions.width, height: mediaDimensions.height }} alt="project asset" src={get(work, 'fields.media.fields.file.url')} />
              </div>
            ))}
          </Slider>
          <div className="MediaContainer__previous" />
          <div className="MediaContainer__next" />
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
 