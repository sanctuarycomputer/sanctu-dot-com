import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import flattenImageData from 'utils/flattenImageData';
import cx from 'classnames';
import { useSwipeable } from 'react-swipeable';

import withBreakpoints, { Breakpoints } from 'lib/withBreakpoints';
import get from 'utils/get';
import simpleFragmentToListItems from 'utils/simpleFragmentToListItems';

import { ContentfulMedia, SimpleFragment } from 'models';

import { List } from 'components/base';
import { Aspects } from 'constants/Sizes';

const { LANDSCAPE } = Aspects;

const VERTICAL_GUTTER = 32;

const WorkSection = (props) => {
  const [slideCount, setSlideCount] = useState(get(props, 'selectedWorks', []).length);
  const [activeIndex, setActiveIndex] = useState(0);
  const [mediaDimensions, setMediaDimensions] = useState({ width: 0, height: 0 })
  const [isIntersecting, setIsIntersecting] = useState(false);

  const mediaContainer = useRef();
  const infoContainer = useRef();
  
  const adjustSize = () => {
    const infoHeight = infoContainer.current ? infoContainer.current.offsetHeight : 0;
    const mediaWidth = mediaContainer.current ? mediaContainer.current.offsetWidth : 0;
    const mediaHeight = mediaWidth / LANDSCAPE;
    const moduleHeight = infoHeight + mediaHeight;

    if (moduleHeight < window.innerHeight) {
      setMediaDimensions({ width: mediaWidth, height: mediaHeight })
    } else {
      const height = window.innerHeight - infoHeight - VERTICAL_GUTTER;
      const width = height * LANDSCAPE;
      setMediaDimensions({ width, height })
    }
  };

  const handleResize = () => {
    adjustSize();
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      adjustSize();
  
      const observer = new IntersectionObserver(
        ([entry]) => setIsIntersecting(entry.isIntersecting)
      )
  
      mediaContainer.current && observer.observe(mediaContainer.current)

      return () => window.removeEventListener('resize', handleResize);
    }    
  }, [mediaContainer.current])

  const setNextSlide = () => {
      const potentialNextSlide = activeIndex + 1;
      const lastAvailableSlide = slideCount - 1;

      const nextSlideIndex =
        activeIndex < lastAvailableSlide ? potentialNextSlide : 0;

      setActiveIndex(nextSlideIndex);
  };

  const setPreviousSlide = () => {
      const potentialPreviousSlide = activeIndex - 1;
      const lastAvailableSlide = slideCount - 1;

      const previousSlideIndex =
        potentialPreviousSlide >= 0
          ? potentialPreviousSlide
          : lastAvailableSlide;

      setActiveIndex(previousSlideIndex);
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: setNextSlide,
    onSwipedRight: setPreviousSlide,
  });

  const renderWork = () => {
    const activeProject = get(props, `selectedWorks[${activeIndex}]`);
    const currentBreakpoint = get(props, 'currentBreakpoint', '');
    const breakpointIsMobile =
      currentBreakpoint === Breakpoints.EXTRA_SMALL.label ||
      currentBreakpoint === Breakpoints.SMALL.label;

    if (breakpointIsMobile) {
      return (
        <div ref={mediaContainer}>
          <div className="relative" {...swipeHandlers} >
            {get(props, 'selectedWorks', []).map((work, index) => (
              <div 
                key={get(work, 'sys.id')}
                className={cx("WorkSection__video block mxauto", {
                  'absolute t0 opacity-0 events-none': index !== activeIndex
                })}
              >
                <div className="MediaContainer relative">
                  <video
                    className="block mxauto"
                    poster={`${flattenImageData(get(work, 'fields.previewImage', {})).url}?fm=webp`}
                    style={{
                      width: mediaDimensions.width,
                      height: mediaDimensions.height
                    }}
                    autoPlay
                    loop
                    muted
                    playsInline
                  >
                    {breakpointIsMobile && isIntersecting && (activeIndex === index) && (
                      <source
                        src={get(work, 'fields.video.fields.file.url')}
                      ></source>
                    )}
                  </video>
                  <div
                    onClick={setPreviousSlide}
                    className="MediaContainer__previous"
                  />
                  <div onClick={setNextSlide} className="MediaContainer__next" />
                </div>
                <div ref={infoContainer} className="col-8 flex flex-col pt2">
                  <div className="mb2 col-8 flex flex-row justify-between">
                    <div>
                      <h2 className="paragraph mb_5">
                        {get(work, 'fields.title', '')}
                      </h2>
                      <div className="flex flex-row flex-wrap">
                        {get(work, 'fields.caseStudySlug', '') && (
                          <Link
                            href={get(work, 'fields.caseStudySlug', '')}
                            passHref
                          >
                            <a
                              className="small link decoration-none pb1 pr2"
                              aria-label="View case study"
                              rel="noopener noreferrer"
                            >
                              → View case study
                            </a>
                          </Link>
                        )}
                        <Link
                          href={get(work, 'fields.link', '')}
                          passHref
                        >
                          <a
                            className="small link underline"
                            aria-label="Project Link"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {get(work, 'fields.linkLabel', '')}
                          </a>
                        </Link>
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
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <>
        <div className="MediaContainer" ref={mediaContainer}>
          <div 
            style={{
              width: mediaDimensions.width,
              height: mediaDimensions.height
            }}
            className="relative mxauto"
          >
          {get(props, 'selectedWorks', []).map((work, index) => (
            <video
              key={get(work, 'sys.id')}
              className={cx("WorkSection__video block mxauto absolute t0", {
                'opacity-0 events-none': index !== activeIndex
              })}
              poster={`${flattenImageData(get(work, 'fields.previewImage', {})).url}?fm=webp`}
              style={{
                width: mediaDimensions.width,
                height: mediaDimensions.height
              }}
              autoPlay
              loop
              muted
              playsInline
            >
              {!breakpointIsMobile && isIntersecting && (activeIndex === index) && (
                <source
                  src={get(work, 'fields.video.fields.file.url')}
                ></source>
              )}
            </video>
          ))}
          </div>
          <div
            onClick={setPreviousSlide}
            className="MediaContainer__previous"
          />
          <div onClick={setNextSlide} className="MediaContainer__next" />
        </div>
        <div ref={infoContainer} className="col-8 flex flex-row pt3">
          <div className="col-4 flex flex-col">
            <div className="mb2">
              <h2 className="paragraph mb1">
                {get(activeProject, 'fields.title', '')}
              </h2>
              {get(activeProject, 'fields.caseStudySlug', '') && (
                <Link
                  href={get(activeProject, 'fields.caseStudySlug', '')}
                  passHref
                >
                  <a
                    className="small link decoration-none pb1 pr2"
                    aria-label="View case study"
                    rel="noopener noreferrer"
                  >
                    → View case study
                  </a>
                </Link>
              )}
              <Link
                href={get(activeProject, 'fields.link')}
                passHref
              >
                <a
                  className="small link underline"
                  aria-label="Project Link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {get(activeProject, 'fields.linkLabel', '')}
                </a>
              </Link>
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
      </>
    );
  };

  return <div className="WorkSection px1 py6">{renderWork()}</div>;
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
