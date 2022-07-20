import React, { PureComponent } from 'react';

import Link from 'next/link';

import PropTypes from 'prop-types';

import { ContentfulMedia, SimpleFragment } from 'models';

import { Markdown, Image } from 'components/base';

import get from 'utils/get';
import flattenImageData from 'utils/flattenImageData';

const pauseStartVideo = (videoId) => {
  const video = document.getElementById(videoId);
  const videoButtonText = document.getElementById(`${videoId}--video-button-text`).innerText;

  if (videoButtonText == '(Pause)') {
    video.pause();
    document.getElementById(`${videoId}--video-button-text`).innerText = '(Play)';
  } else {
    video.play();
    document.getElementById(`${videoId}--video-button-text`).innerText = '(Pause)';
  }
}

const renderWorkOverlay = (work) => {
  const workIsImage = work.fields.asset.fields.file.contentType.startsWith("image/");

  return (
    <div className="WorkSectionAsGallery__work-hover-overlay">
      <div className="WorkSectionAsGallery__work-hover-overlay--info">
        <div className="WorkSectionAsGallery__work-hover-overlay--title">{work.fields.title}</div>
        {work.fields.caseStudySlug ? 
          <Link
            href={work.fields.caseStudySlug}
            passHref
          >
            <a
              className="decoration-none color-white"
              aria-label="read the case study"
              rel="noopener noreferrer"
            >
            (read case study)
            </a>
          </Link> : 
          <Link
            href={work.fields.link}
          >
            <a
              className="decoration-none color-white"
              aria-label="visit the site"
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
          id={`${work.sys.id}--video-button-text`}
          className="WorkSectionAsGallery__work-hover-overlay--video-button"
          onClick={() => pauseStartVideo(work.sys.id)}
        >
          (Pause)
        </button>
      }
    </div>
  );
}

const renderWorkAsImageOrVideo = (work) => {
  const workIsImage = work.fields.asset.fields.file.contentType.startsWith("image/");
  const workImage = flattenImageData(work.fields.asset);

  return (
    <div>
      {workIsImage ? 
        <Image
          src={workImage.url}
          width={workImage.width}
          height={workImage.height}
          sizes='50vw'
        />  :
        <video
          id={work.sys.id}
          key={work.sys.id}
          style={{
            width: '100%', 
            height: '100%' 
          }}
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={work.fields.video.fields.file.url}></source>
        </video>
      }
    </div>
  );
}

const renderWorkGalleryBlock = (workGalleryBlock, index) => {
  const fullWidthWork = get(workGalleryBlock, 'fields.fullWidthWork', {});
  const halfWidthWorkOne = get(workGalleryBlock, 'fields.halfWidthWorkOne', {});
  const halfWidthWorkTwo = get(workGalleryBlock, 'fields.halfWidthWorkTwo', {});

  return (
    <div className="flex-col">
      {workGalleryBlock.fields.displayFullWidthAssetAtTop && 
        <div className="block col-8 relative">
          {renderWorkOverlay(fullWidthWork)}
          {renderWorkAsImageOrVideo(fullWidthWork)}
        </div>
      }
      <div className="flex col-8 pb_5 md:pb1 items-end" key={index}>
        <div className="block col-4 pr_25 md:pr_5">
          <div className="relative">
            {renderWorkOverlay(halfWidthWorkOne)}
            {renderWorkAsImageOrVideo(halfWidthWorkOne)}
          </div>
        </div>
        <div className="block col-4 pr_25 md:pr_5">
          <div className="relative">
            {renderWorkOverlay(halfWidthWorkTwo)}
            {renderWorkAsImageOrVideo(halfWidthWorkTwo)}
          </div>
        </div>
      </div>
      {!workGalleryBlock.fields.displayFullWidthAssetAtTop && 
        <div className="block col-8 relative">
          {renderWorkOverlay(fullWidthWork)}
          {renderWorkAsImageOrVideo(fullWidthWork)}
        </div>
      }
    </div>
  );
}

class WorkSectionAsGallery extends PureComponent {
  render() {
    const fields = get(this, 'props.workGallery.fields', {}); 
    const workGalleryBlockOne = get(fields, 'workGalleryBlockOne', {});
    const workGalleryTextOne = get(fields, 'workGalleryTextOne', '');
    const workGalleryBlockTwo = get(fields, 'workGalleryBlockTwo', {});
    const workGalleryTextTwo = get(fields, 'workGalleryTextTwo', '');
    const workGalleryBlockAnyRemaining = get(fields, 'workGalleryBlockAnyRemaining', []);

    return (
      <div className="WorkSectionAsGallery">
        {renderWorkGalleryBlock(workGalleryBlockOne)}
        <Markdown
          className="WorkSectionAsGallery__work-gallery-text Markdown--medium"
          src={workGalleryTextOne}
        />
        {renderWorkGalleryBlock(workGalleryBlockTwo)}
        <Markdown
          className="WorkSectionAsGallery__work-gallery-text Markdown--medium"
          src={workGalleryTextTwo}
        />
        {workGalleryBlockAnyRemaining.map((block) => renderWorkGalleryBlock(block))}
      </div>
    );
  }
}

const workGalleryBlockPropType = PropTypes.shape({
  title: PropTypes.string, 
  fullWidthWork: PropTypes.shape({
    fields: PropTypes.shape({
      title: PropTypes.string,
      caseStudySlug: PropTypes.string,
      asset: ContentfulMedia,
      link: PropTypes.string,
      linkLabel: PropTypes.string,
      stack: SimpleFragment,
      collaborators: SimpleFragment
    })
  }),
  halfWidthWorkOne: PropTypes.shape({
    fields: PropTypes.shape({
      title: PropTypes.string,
      caseStudySlug: PropTypes.string,
      asset: ContentfulMedia,
      link: PropTypes.string,
      linkLabel: PropTypes.string,
      stack: SimpleFragment,
      collaborators: SimpleFragment
    })
  }), 
  halfWidthWorkTwo: PropTypes.shape({
    fields: PropTypes.shape({
      title: PropTypes.string,
      caseStudySlug: PropTypes.string,
      asset: ContentfulMedia,
      link: PropTypes.string,
      linkLabel: PropTypes.string,
      stack: SimpleFragment,
      collaborators: SimpleFragment
    })
  }), 
  displayFullWidthAssetAtTop: PropTypes.bool
});

WorkSectionAsGallery.propTypes = {
  workGallery: PropTypes.shape({
    fields: PropTypes.shape({
      title: PropTypes.string, 
      workGalleryBlockOne: workGalleryBlockPropType,
      workGalleryTextOne: PropTypes.string,
      workGalleryBlockTwo: workGalleryBlockPropType,
      workGalleryTextTwo: PropTypes.string,
      workGalleryBlockAnyRemaining: PropTypes.arrayOf(workGalleryBlockPropType)
    })
  })
}

export default WorkSectionAsGallery;
