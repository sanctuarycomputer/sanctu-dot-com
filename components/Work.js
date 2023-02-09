import React, { useRef, useState, useEffect } from 'react';

import PropTypes from 'prop-types';

import { ContentfulMedia, SimpleFragment } from 'models';

import Link from 'next/link';

import { Image } from 'components/base';

import get from 'utils/get';
import flattenImageData from 'utils/flattenImageData';

import cx from 'classnames';

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
  const hoveredStateTheme = get(
    work,
    'fields.hoveredStateTheme',
    'Dark'
  ).toLowerCase();
  const disableOverlayOnDarkTheme = get(
    work,
    'fields.disableOverlayOnDarkTheme',
    'false'
  );
  const title = get(work, 'fields.title', '');
  const caseStudySlug = get(work, 'fields.caseStudySlug', '');
  const link = get(work, 'fields.link', '');
  const src = get(work, 'fields.video.fields.file.url', '');
  const id = get(work, 'sys.id', '');

  return (
    <Link href={caseStudySlug || link}>
      <a
        aria-label={
          caseStudySlug
            ? `read the case study for ${title}`
            : `visit the site for ${title}`
        }
        rel="noopener noreferrer"
        target={caseStudySlug ? '_self' : '_blank'}
        className="decoration-none"
      >
        <div className="flex flex-col-reverse md:block">
          <div
            className={cx(
              `WorkSectionAsGallery__work-hover-overlay pointer md:p1 pt_625 pb1 px0 flex justify-between items-end md:absolute relative`,
              {
                'WorkSectionAsGallery__work-hover-overlay--dark':
                  hoveredStateTheme === 'dark',
                'WorkSectionAsGallery__work-hover-overlay--dark-gradient':
                  hoveredStateTheme === 'dark' &&
                  disableOverlayOnDarkTheme === 'false',
                'WorkSectionAsGallery__work-hover-overlay--light':
                  hoveredStateTheme === 'light',
                'WorkSectionAsGallery__work-hover-overlay--for-image':
                  workIsImage,
                'WorkSectionAsGallery__work-hover-overlay--for-video':
                  !workIsImage,
              }
            )}
          >
            <div className="flex flex-col">
              <div className="WorkSectionAsGallery__work-hover-overlay--title">
                {title}
              </div>
              <div className="WorkSectionAsGallery__work-hover-overlay--caption">
                {caseStudySlug ? '(read case study)' : '→ visit the site'}
              </div>
            </div>
            {!workIsImage && (
              <button
                className="WorkSectionAsGallery__work-hover-overlay--video-button"
                aria-label={`pause video for ${title}`}
                ref={buttonRef}
                onClick={(e) => {
                  e.preventDefault();
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
        </div>
      </a>
    </Link>
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
