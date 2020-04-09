import React, { Fragment, PureComponent } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import withBreakpoints, { Breakpoints } from 'lib/withBreakpoints';
import get from 'utils/get';
import simpleFragmentToListItems from 'utils/simpleFragmentToListItems';

import { ContentfulMedia, SimpleFragment } from 'models';

import { Slider, List } from 'components/base';
import { Aspects } from 'constants/Sizes';

const { LANDSCAPE } = Aspects;

const VERTICAL_GUTTER = 32;

class WorkSection extends PureComponent {
  constructor(props) {
    super(...arguments);

    this.state = {
      slideCount: get(props, 'selectedWorks', []).length,
      activeIndex: 0,
      mediaDimensions: {
        width: 0,
        height: 0
      }
    };

    this.mediaContainer = React.createRef();
    this.infoContainer = React.createRef();
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    this.adjustSize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    this.adjustSize();
  };

  adjustSize = () => {
    const infoHeight = this.infoContainer.current.offsetHeight;
    const mediaWidth = this.mediaContainer.current.offsetWidth;
    const mediaHeight = mediaWidth / LANDSCAPE;
    const moduleHeight = infoHeight + mediaHeight;

    if (moduleHeight < window.innerHeight) {
      this.setState({
        mediaDimensions: { width: mediaWidth, height: mediaHeight }
      });
    } else {
      const height = window.innerHeight - infoHeight - VERTICAL_GUTTER;
      const width = height * LANDSCAPE;
      this.setState({ mediaDimensions: { width, height } });
    }
  };

  setNextSlide = () => {
    const { slideCount } = this.state;

    this.setState(state => {
      const potentialNextSlide = state.activeIndex + 1;
      const lastAvailableSlide = slideCount - 1;

      const nextSlideIndex =
        state.activeIndex < lastAvailableSlide ? potentialNextSlide : 0;

      return { activeIndex: nextSlideIndex };
    });
  };

  setPreviousSlide = () => {
    const { slideCount } = this.state;

    this.setState(state => {
      const potentialPreviousSlide = state.activeIndex - 1;
      const lastAvailableSlide = slideCount - 1;

      const previousSlideIndex =
        potentialPreviousSlide >= 0
          ? potentialPreviousSlide
          : lastAvailableSlide;

      return { activeIndex: previousSlideIndex };
    });
  };

  renderWork = () => {
    const { activeIndex, slideCount, mediaDimensions } = this.state;
    const activeProject = get(this, `props.selectedWorks[${activeIndex}]`);
    const currentBreakpoint = get(this, 'props.currentBreakpoint', '');
    const breakpointIsMobile =
      currentBreakpoint === Breakpoints.EXTRA_SMALL.label ||
      currentBreakpoint === Breakpoints.SMALL.label;

    if (breakpointIsMobile) {
      return (
        <Slider>
          {get(this, 'props.selectedWorks', []).map((work, index) => (
            <Fragment key={get(work, 'sys.id')}>
              <div className="MediaContainer" ref={this.mediaContainer}>
                <video
                  className="block mxauto"
                  poster={get(work, 'fields.previewImage.fields.file.url')}
                  style={{
                    width: mediaDimensions.width,
                    height: mediaDimensions.height
                  }}
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source
                    src={get(work, 'fields.video.fields.file.url')}
                  ></source>
                </video>
              </div>
              <div ref={this.infoContainer} className="col-8 flex flex-col pt2">
                <div className="mb2 col-8 flex flex-row justify-between">
                  <div>
                    <h2 className="paragraph mb_5">
                      {get(work, 'fields.title', '')}
                    </h2>
                    <div className="flex flex-row flex-wrap">
                      {get(work, 'fields.caseStudySlug', '') && (
                        <Link
                          className="small link text-no-decoration pb1 pr2"
                          ariaLabel="View case study"
                          to={get(work, 'fields.caseStudySlug', '')}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                        → View Case Study
                        </Link>
                      )}
                      <a
                        className="small link underline"
                        ariaLabel="Project Link"
                        href={get(work, 'fields.link')}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {get(work, 'fields.linkLabel')}
                      </a>
                    </div>
                  </div>
                  <span className="color-gray small block">
                    {index + 1}/{slideCount}
                  </span>
                </div>
                <div className="col-8 flex justify-between">
                  <List
                    title="Tech Stack:"
                    listItems={simpleFragmentToListItems(
                      get(work, 'fields.stack.simpleFragments', {})
                    )}
                  />
                  <List
                    className="ml2"
                    title="Collaborators:"
                    listItems={simpleFragmentToListItems(
                      get(work, 'fields.collaborators.simpleFragments', {})
                    )}
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
          <Slider
            swiping={false}
            activeIndex={this.state.activeIndex}
            transitionMode="fade"
          >
            {get(this, 'props.selectedWorks', []).map((work, index) => (
              <video
                key={get(work, 'sys.id')}
                className="block mxauto"
                poster={get(work, 'fields.previewImage.fields.file.url')}
                style={{
                  width: mediaDimensions.width,
                  height: mediaDimensions.height
                }}
                autoPlay
                loop
                muted
                playsInline
              >
                <source
                  src={get(work, 'fields.video.fields.file.url')}
                ></source>
              </video>
            ))}
          </Slider>
          <div
            onClick={this.setPreviousSlide}
            className="MediaContainer__previous"
          />
          <div onClick={this.setNextSlide} className="MediaContainer__next" />
        </div>
        <div ref={this.infoContainer} className="col-8 flex flex-row pt3">
          <div className="col-4 flex flex-col">
            <div className="mb2">
              <h2 className="paragraph mb1">
                {get(activeProject, 'fields.title', '')}
              </h2>
              {get(activeProject, 'fields.caseStudySlug', '') && (
                <Link
                  className="small link text-no-decoration pb1 pr2"
                  ariaLabel="View case study"
                  to={get(activeProject, 'fields.caseStudySlug', '')}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                → View Case Study
                </Link>
              )}
              <a
                className="small link underline"
                ariaLabel="Project Link"
                href={get(activeProject, 'fields.link')}
                target="_blank"
                rel="noopener noreferrer"
              >
                {get(activeProject, 'fields.linkLabel')}
              </a>
            </div>
            <span className="color-gray small block">
              {activeIndex + 1}/{slideCount}
            </span>
          </div>
          <div className="col-4 flex justify-end">
            <div className="col-4 xl:col-2">
              <List
                title="Tech Stack:"
                listItems={simpleFragmentToListItems(
                  get(activeProject, 'fields.stack.simpleFragments', {})
                )}
              />
            </div>
            <div className="col-4 xl:col-2">
              <List
                className="ml2"
                title="Collaborators:"
                listItems={simpleFragmentToListItems(
                  get(activeProject, 'fields.collaborators.simpleFragments', {})
                )}
              />
            </div>
          </div>
        </div>
      </Fragment>
    );
  };

  render() {
    return <div className="WorkSection px1 py6">{this.renderWork()}</div>;
  }
}

WorkSection.propType = {
  selectedWorks: PropTypes.arrayOf(
    PropTypes.shape({
      fields: PropTypes.shape({
        media: ContentfulMedia,
        title: PropTypes.string,
        caseStudySlug: PropTypes.string,
        link: PropTypes.string,
        linkLabel: PropTypes.string,
        stack: SimpleFragment,
        collaborators: SimpleFragment
      })
    })
  )
};

export default withBreakpoints(WorkSection);
