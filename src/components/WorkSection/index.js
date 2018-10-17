import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import get from 'utils/get';
import simpleFragmentToListItems from 'utils/simpleFragmentToListItems';
import './WorkSection.scss';

import { Slider, List } from 'components/base';

const aspectRatio = 16 / 9;
const MEDIUM_BREAKPOINT = 832;

class WorkSection extends PureComponent {
  constructor(props) {
    super(...arguments);

    this.state = {
      isMobile: false,
      slideCount: get(props, 'selectedWorks', []).length,
      activeIndex: 0,
      mediaDimensions: {
        width: 0,
        height: 0,
      }
    }

    this.mediaContainer = React.createRef();
    this.infoContainer = React.createRef();
  }

  componentDidMount() {
    window.addEventListener('resize', () =>  { 
      this.checkDeviceWidth(); 
      this.adjustSize(); 
    })
    this.checkDeviceWidth();
    this.adjustSize();
  }

  checkDeviceWidth = () => {
    if (window.innerWidth < MEDIUM_BREAKPOINT) {
      return this.setState((state, props) => { 
        if (state.isMobile) return;
        return {
          isMobile: true
        }
       });
    }

    this.setState((state, props) => { 
      if (!state.isMobile) return;
      return {
        isMobile: false 
      }
    });
  } 

  adjustSize = () => {
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
        potentialPreviousSlide >= 0 ? potentialPreviousSlide : lastAvailableSlide;

      return { activeIndex: previousSlideIndex };
    })
  }

  renderWork = () => {
    const { activeIndex, slideCount, mediaDimensions, isMobile } = this.state;
    const activeProject = get(this, 'props.selectedWorks')[activeIndex];

    if (isMobile) {
      return (
        <Slider>
          {get(this, 'props.selectedWorks', []).map((work, index) => (
            <Fragment>
              <div className="MediaContainer" ref={this.mediaContainer}>
                <img style={{ display: 'block', margin: '0 auto', width: mediaDimensions.width, height: mediaDimensions.height }} alt="project asset" src={get(work, 'fields.media.fields.file.url')} />
              </div>
              <div ref={this.infoContainer} className="col-8 flex flex-col mt2 md:flex-row md:mt3">
                <div className="col-8 flex flex-row justify-between md:flex-col md:col-4">
                  <div className="md:mb2">
                    <h2 className="paragraph">{get(work, 'fields.title', '')}</h2>
                    <a className="small link underline" alt="project link" href={get(work, 'fields.link')}>
                      {get(work, 'fields.linkLabel')}
                    </a>
                  </div>
                  <span className="color-gray small block">{index + 1}/{slideCount}</span> 
                </div>
                <div className="col-8 flex justify-between md:col-4 md:justify-end">
                  <List 
                    title="Stack:" 
                    listItems={simpleFragmentToListItems(get(work, 'fields.stack.simpleFragments', {}))} 
                  />
                  <List 
                    className="ml2"
                    title="Collaborators:" 
                    listItems={simpleFragmentToListItems(get(work, 'fields.collaborators.simpleFragments', {}))} 
                  />
                </div>
              </div>
            </Fragment>
          ))}
        </Slider>
      );
    }

    return (
      <Fragment>
        <div className="MediaContainer" ref={this.mediaContainer}>
          <Slider swiping={false} activeIndex={this.state.activeIndex} transitionMode="fade">
            {get(this, 'props.selectedWorks', []).map((work, index) => (
              <img style={{ display: 'block', margin: '0 auto', width: mediaDimensions.width, height: mediaDimensions.height }} alt="project asset" src={get(work, 'fields.media.fields.file.url')} />
            ))}
          </Slider>
          <div onClick={this.setPreviousSlide} className="MediaContainer__previous" />
          <div onClick={this.setNextSlide} className="MediaContainer__next" />
        </div>
        <div ref={this.infoContainer} className="col-8 flex flex-col mt2 md:flex-row md:mt3">
          <div className="col-8 flex flex-row justify-between md:flex-col md:col-4">
            <div className="md:mb2">
              <h2 className="paragraph">{get(activeProject, 'fields.title', '')}</h2>
              <a className="small link underline" alt="project link" href={get(activeProject, 'fields.link')}>
                {get(activeProject, 'fields.linkLabel')}
              </a>
            </div>
            <span className="color-gray small block">{activeIndex + 1}/{slideCount}</span> 
          </div>
          <div className="col-8 flex justify-between md:col-4 md:justify-end">
            <List 
              title="Stack:" 
              listItems={simpleFragmentToListItems(get(activeProject, 'fields.stack.simpleFragments', {}))} 
            />
            <List 
              className="ml2"
              title="Collaborators:" 
              listItems={simpleFragmentToListItems(get(activeProject, 'fields.collaborators.simpleFragments', {}))} 
            />
          </div>
        </div>
      </Fragment>
    );
  }
  
  render() {
    return (
      <div className="WorkSection px1 py8">
        {this.renderWork()}
      </div>
    );
  }
}

export default WorkSection;
 