import React, { useRef, useState, useEffect } from 'react';

import Link from 'next/link';

import PropTypes from 'prop-types';

import { ContentfulMedia, SimpleFragment } from 'models';

import { Markdown, Image } from 'components/base';

import get from 'utils/get';
import flattenImageData from 'utils/flattenImageData';

const PLAY_VIDEO = "(Play)";
const PAUSE_VIDEO = "(Pause)"; 

const renderWork = (work) => {
  const [videoStatus, setVideoStatus] = useState(PLAY_VIDEO);
  const videoRef = useRef(null);
  const buttonRef = useRef(null); 

  useEffect(() => {
    if (videoStatus === PLAY_VIDEO) {
      videoRef.current?.play(); 
      buttonRef.current?.textContent = PAUSE_VIDEO;
      buttonRef.current?.ariaLabel = `pause video for ${title}`

    } else {
      videoRef.current?.pause();
      buttonRef.current?.textContent = PLAY_VIDEO;
      buttonRef.current?.ariaLabel = `play video for ${title}`
    }
  }, [videoStatus])

  const workIsImage = get(work, 'fields.asset.fields.file.contentType', '').startsWith("image/");  
  const workImage = flattenImageData(get(work, 'fields.asset', {}));
  const title = get(work, 'fields.title', '');
  const caseStudySlug = get(work, 'fields.caseStudySlug', '');
  const link = get(work, 'fields.link', '');
  const src = get(work, 'fields.video.fields.file.url', '');
  const id = get(work, 'sys.id', '');

 return (
   <>
    <div className="WorkSectionAsGallery__work-hover-overlay flex justify-between items-end color-white absolute h100 w100">
      <div className="WorkSectionAsGallery__work-hover-overlay--info flex flex-col justify-evenly mb_5 ml_5">
        <div className="WorkSectionAsGallery__work-hover-overlay--title">{title}</div>
        {caseStudySlug ? 
          <Link
            href={caseStudySlug}
          >
            <a
              className="decoration-none color-white"
              aria-label={`read the case study for ${title}`}
              rel="noopener noreferrer"
            >
            (read case study)
            </a>
          </Link> : 
          <Link
            href={link}
          >
            <a
              className="decoration-none color-white"
              aria-label={`visit the site for ${title}`}
              target="_blank"
              rel="noopener noreferrer"
            >
            → visit the site 
            </a>
          </Link>
        }
      </div>
      {!workIsImage &&
        <button 
          className="WorkSectionAsGallery__work-hover-overlay--video-button"
          aria-label={`pause video for ${title}`}
          ref={buttonRef}
          onClick={() => {
            videoStatus === PAUSE_VIDEO ? setVideoStatus(PLAY_VIDEO) : setVideoStatus(PAUSE_VIDEO)
          }}
        >
          (Pause)
        </button>
      }
    </div>
    {workIsImage ? 
      <Image
        src={workImage.url}
        width={workImage.width}
        height={workImage.height}
        sizes='50vw'
      />  :
      <video
        id={id}
        key={id}
        style={{
          width: '100%', 
          height: '100%' 
        }}
        autoPlay
        loop
        muted
        playsInline
        ref={videoRef}
      >
        <source src={src}></source>
      </video>
    }
    </>
 );
}

const renderWorkGalleryAssetBlock = (workGalleryBlock) => {
  const displayFirstAssetAsFullWidth = get(workGalleryBlock, 'fields.displayFirstAssetAsFullWidth', true);
  const works = get(workGalleryBlock, 'fields.works', []);

  return (
    <div className="flex-col">
      {displayFirstAssetAsFullWidth && 
        <>
          <div className="block col-8 relative">
            {renderWork(works[0])}
          </div>
          <div className="flex col-8 pb_5 md:pb1 items-end">
            <div className="block col-4 pr_25 md:pr_5">
              <div className="relative">
                {renderWork(works[1])}
              </div>
            </div>
            <div className="block col-4 pr_25 md:pr_5">
              <div className="relative">
                {renderWork(works[2])}
              </div>
            </div>
          </div>
        </>
      }
      {!displayFirstAssetAsFullWidth && 
        <>
          <div className="flex col-8 pb_5 md:pb1 items-end">
            <div className="block col-4 pr_25 md:pr_5">
              <div className="relative">
                {renderWork(works[0])}
              </div>
            </div>
            <div className="block col-4 pr_25 md:pr_5">
              <div className="relative">
                {renderWork(works[1])}
              </div>
            </div>
          </div>
          <div className="block col-8 relative">
            {renderWork(works[2])}
          </div>
        </>
      }
    </div>
  );
}

const renderWorkGalleryTextBlock = (textBlock) => {
  const text = get(textBlock, 'fields.text', '');
  return (
    <div>
      {text &&
        <Markdown
          className="WorkSectionAsGallery__work-gallery-text my4 lg:my10 px1_25 md:px5 lg:px10 Markdown--medium"
          src={text}
        />
      }
    </div>
  );
};

const WorkSectionAsGallery = (props) => {
  const fields = get(props, 'workGallery.fields', {}); 
  const workGalleryAssetBlocks = get(fields, 'workGalleryAssetBlocks', []);
  const workGalleryTextBlocks = get(fields, 'workGalleryTextBlocks', []);
  const renderAssetBlocksFirst = get(fields, 'renderAssetBlocksFirst', true);
  const maximumLengthBlocks = workGalleryAssetBlocks.length > workGalleryTextBlocks.length ? [...Array(workGalleryAssetBlocks.length).keys()] : [...Array(workGalleryTextBlocks.length).keys()]; 
  
  return (
    <div className="WorkSectionAsGallery mt2">
      {maximumLengthBlocks.map((index) => {
        const workGalleryBlock = renderWorkGalleryAssetBlock(workGalleryAssetBlocks[index]);
        const textBlock = renderWorkGalleryTextBlock(workGalleryTextBlocks[index])
        return (
          <>
            {renderAssetBlocksFirst && workGalleryBlock}
            {textBlock}
            {!renderAssetBlocksFirst && workGalleryBlock}
          </>
        );
      })}
    </div>
  );
}

const WorkPropType = PropTypes.shape({
  fields: PropTypes.shape({
    title: PropTypes.string,
    caseStudySlug: PropTypes.string,
    asset: ContentfulMedia,
    link: PropTypes.string,
    linkLabel: PropTypes.string,
    stack: SimpleFragment,
    collaborators: SimpleFragment
  })
}); 

const WorkGalleryBlockPropType = PropTypes.shape({
  title: PropTypes.string, 
  fullWidthWork: WorkPropType,
  halfWidthWorkOne: WorkPropType,
  halfWidthWorkTwo: WorkPropType,
  displayFullWidthAssetAtTop: PropTypes.bool
});

WorkSectionAsGallery.propTypes = {
  workGallery: PropTypes.shape({
    fields: PropTypes.shape({
      title: PropTypes.string, 
      workGalleryBlockOne: WorkGalleryBlockPropType,
      workGalleryTextOne: PropTypes.string,
      workGalleryBlockTwo: WorkGalleryBlockPropType,
      workGalleryTextTwo: PropTypes.string,
      workGalleryBlockAnyRemaining: PropTypes.arrayOf(WorkGalleryBlockPropType)
    })
  })
}

export default WorkSectionAsGallery;

