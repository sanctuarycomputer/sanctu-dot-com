import React, { Fragment, PureComponent } from "react";
import PropTypes from "prop-types";
import get from "utils/get";
import simpleFragmentToListItems from "utils/simpleFragmentToListItems";
import "./WorkSection.scss";
import { ContentfulMedia, SimpleFragment } from "models";

import { Slider, List } from "components/base";
import { Aspects, Breakpoints } from "constants/Sizes";

const { MEDIUM } = Breakpoints;
const { LANDSCAPE } = Aspects;

class WorkSection extends PureComponent {
  constructor(props) {
    super(...arguments);

    this.state = {
      isMobile: false,
      slideCount: get(props, "selectedWorks", []).length,
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
    window.addEventListener("resize", this.handleResize);
    this.checkDeviceWidth();
    this.adjustSize();
  }

  componentDidUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize = () => {
    this.checkDeviceWidth();
    this.adjustSize();
  };

  checkDeviceWidth = () => {
    if (window.innerWidth < MEDIUM) {
      return this.setState((state, props) => {
        if (state.isMobile) return;
        return {
          isMobile: true
        };
      });
    }

    this.setState((state, props) => {
      if (!state.isMobile) return;
      return {
        isMobile: false
      };
    });
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
      const height = window.innerHeight - infoHeight - 32;
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
    const { activeIndex, slideCount, mediaDimensions, isMobile } = this.state;
    const activeProject = get(this, "props.selectedWorks")[activeIndex];

    if (isMobile) {
      return (
        <Slider>
          {get(this, "props.selectedWorks", []).map((work, index) => (
            <Fragment key={get(work, "sys.id")}>
              <div className="MediaContainer" ref={this.mediaContainer}>
                <img
                  className="block mx-auto"
                  style={{
                    width: mediaDimensions.width,
                    height: mediaDimensions.height
                  }}
                  alt="project asset"
                  src={get(work, "fields.media.fields.file.url")}
                />
              </div>
              <div ref={this.infoContainer} className="col-8 flex flex-col pt2">
                <div className="mb2 col-8 flex flex-row justify-between">
                  <div>
                    <h2 className="paragraph mb_5">
                      {get(work, "fields.title", "")}
                    </h2>
                    <a
                      className="small link underline"
                      alt="project link"
                      href={get(work, "fields.link")}
                    >
                      {get(work, "fields.linkLabel")}
                    </a>
                  </div>
                  <span className="color-gray small block">
                    {index + 1}/{slideCount}
                  </span>
                </div>
                <div className="col-8 flex justify-between">
                  <List
                    title="Stack:"
                    listItems={simpleFragmentToListItems(
                      get(work, "fields.stack.simpleFragments", {})
                    )}
                  />
                  <List
                    className="ml2"
                    title="Collaborators:"
                    listItems={simpleFragmentToListItems(
                      get(work, "fields.collaborators.simpleFragments", {})
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
            {get(this, "props.selectedWorks", []).map((work, index) => (
              <img
                key={get(work, "sys.id")}
                className="block mxauto"
                style={{
                  width: mediaDimensions.width,
                  height: mediaDimensions.height
                }}
                alt="project asset"
                src={get(work, "fields.media.fields.file.url")}
              />
            ))}
          </Slider>
          <div
            onClick={this.setPreviousSlide}
            className="MediaContainer__previous"
          />
          <div onClick={this.setNextSlide} className="MediaContainer__next" />
        </div>
        <div ref={this.infoContainer} className="col-8 flex flex-row pt3">
          <div className="col-4 flex flex-col justify-between">
            <div className="mb2">
              <h2 className="paragraph mb1">
                {get(activeProject, "fields.title", "")}
              </h2>
              <a
                className="small link underline"
                alt="project link"
                href={get(activeProject, "fields.link")}
              >
                {get(activeProject, "fields.linkLabel")}
              </a>
            </div>
            <span className="color-gray small block">
              {activeIndex + 1}/{slideCount}
            </span>
          </div>
          <div className="col-4 flex justify-end">
            <div className="col-4 xl:col-2">
              <List
                title="Stack:"
                listItems={simpleFragmentToListItems(
                  get(activeProject, "fields.stack.simpleFragments", {})
                )}
              />
            </div>
            <div className="col-4 xl:col-2">
              <List
                className="ml2"
                title="Collaborators:"
                listItems={simpleFragmentToListItems(
                  get(activeProject, "fields.collaborators.simpleFragments", {})
                )}
              />
            </div>
          </div>
        </div>
      </Fragment>
    );
  };

  render() {
    return <div className="WorkSection px1 py8">{this.renderWork()}</div>;
  }
}

WorkSection.propType = {
  selectedWorks: PropTypes.arrayOf(
    PropTypes.shape({
      fields: PropTypes.shape({
        media: ContentfulMedia,
        title: PropTypes.string,
        link: PropTypes.string,
        linkLabel: PropTypes.string,
        stack: SimpleFragment,
        collaborators: SimpleFragment
      })
    })
  )
};

export default WorkSection;
