import React, { useRef, useState, useEffect } from 'react';

import PropTypes from 'prop-types';

import { ContentfulMedia, SimpleFragment } from 'models';

import Link from 'next/link';

import { Image } from 'components/base';

import get from 'utils/get';
import flattenImageData from 'utils/flattenImageData';

const PLAY_VIDEO = '(Play)';
const PAUSE_VIDEO = '(Pause)';

const Work = ({ work, width = '100vw' }) => {
  const [videoStatus, setVideoStatus] = useState(PLAY_VIDEO);
  const videoRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    if (videoStatus == PLAY_VIDEO) {
      videoRef.current?.play();

      const button = buttonRef.current;
      if (button) {
        button.textContent = PAUSE_VIDEO;
        button.ariaLabel = `pause video for ${title}`;
      }
    } else {
      videoRef.current?.pause();

      const button = buttonRef.current;
      if (button) {
        button.textContent = PLAY_VIDEO;
        button.ariaLabel = `play video for ${title}`;
      }
    }
  }, [videoStatus]);

  const workIsPlaceholder = !work?.fields?.name;

  if (!work || workIsPlaceholder) {
    return null;
  }

  const workIsImage = get(
    work,
    'fields.asset.fields.file.contentType',
    ''
  ).startsWith('image/');
  const workImage = flattenImageData(get(work, 'fields.asset', {}));
  const title = get(work, 'fields.title', '');
  const caseStudySlug = get(work, 'fields.caseStudySlug', '');
  const link = get(work, 'fields.link', '');
  const src = get(work, 'fields.video.fields.file.url', '');
  const id = get(work, 'sys.id', '');

  return (
    <>
      <div
        className={`WorkSectionAsGallery__work-hover-overlay lg:p1_5 md:p1 p_625 ${
          workIsImage
            ? 'WorkSectionAsGallery__work-hover-overlay--for-image'
            : 'WorkSectionAsGallery__work-hover-overlay--for-video'
        } flex justify-between items-end color-white absolute`}
      >
        <div className="flex flex-col">
          <div className="WorkSectionAsGallery__work-hover-overlay--title">
            {title}
          </div>
          {caseStudySlug ? (
            <Link href={caseStudySlug}>
              <a
                className="decoration-none color-white"
                aria-label={`read the case study for ${title}`}
                rel="noopener noreferrer"
              >
                (read case study)
              </a>
            </Link>
          ) : (
            <Link href={link}>
              <a
                className="decoration-none color-white"
                aria-label={`visit the site for ${title}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                → visit the site
              </a>
            </Link>
          )}
        </div>
        {!workIsImage && (
          <button
            className="WorkSectionAsGallery__work-hover-overlay--video-button"
            aria-label={`pause video for ${title}`}
            ref={buttonRef}
            onClick={() => {
              videoStatus === PAUSE_VIDEO
                ? setVideoStatus(PLAY_VIDEO)
                : setVideoStatus(PAUSE_VIDEO);
            }}
          >
            (Pause)
          </button>
        )}
      </div>
      {workIsImage ? (
        <Image
          alt={workImage.alt}
          src={workImage.url}
          width={workImage.width}
          height={workImage.height}
          sizes={width}
        />
      ) : (
        <video
          id={id}
          key={id}
          className="block w100 h100"
          autoPlay
          loop
          muted
          playsInline
          ref={videoRef}
        >
          <source src={src}></source>
        </video>
      )}
    </>
  );
};

Work.propTypes = {
  work: PropTypes.shape({
    fields: PropTypes.shape({
      title: PropTypes.string,
      caseStudySlug: PropTypes.string,
      asset: ContentfulMedia,
      link: PropTypes.string,
      linkLabel: PropTypes.string,
      stack: SimpleFragment,
      collaborators: SimpleFragment,
      video: ContentfulMedia,
    }),
  }),
};

export default Work;
