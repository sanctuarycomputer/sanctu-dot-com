import React, { PureComponent } from 'react';

import Link from 'next/link';

import PropTypes from 'prop-types';

import { ContentfulMedia, SimpleFragment } from 'models';

import get from 'utils/get';
import flattenImageData from 'utils/flattenImageData';

const pauseStartVideo = (videoId) => {
    const video = document.getElementById(videoId);
    const videoButtonText = document.getElementById(`${videoId}--video-button-text`).innerHTML;

    if (videoButtonText == '(Pause)') {
        video.pause();
        document.getElementById(`${videoId}--video-button-text`).innerHTML = '(Play)';
    } else {
        video.play();
        document.getElementById(`${videoId}--video-button-text`).innerHTML = '(Pause)';
    }
}

  
const renderGalleryRowTest = (worksGroup, index, worksMatrix) => {
    return (
        <div className="flex col-8 pb_5 md:pb1 items-end" key={index}>
        {worksGroup.map((work) =>
            <div className="block col-4 pr_25 md:pr_5">
            <div className="relative">
                <div className="WorkSectionAsGallery__case-study-hover-overlay">
                <div className="WorkSectionAsGallery__case-study-hover-overlay--info">
                    <div className="WorkSectionAsGallery__case-study-hover-overlay--title">{work.fields.title}</div>
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
                <button 
                    id={`${work.sys.id}--video-button-text`}
                    className="WorkSectionAsGallery__case-study-hover-overlay--video-button"
                    onClick={() => pauseStartVideo(work.sys.id)}
                >
                    (Pause)
                </button>
                </div>
                <video
                id={work.sys.id}
                key={work.sys.id}
                poster={work.fields.previewImage && `${flattenImageData(work.fields.previewImage).url}?fm=webp`}
                style={{
                    width: '100%', 
                    height: '100%' 
                }}
                autoPlay
                loop
                muted
                playsInline
                >
                <source
                    src={work.fields.video.fields.file.url}
                ></source>
                </video>
            </div>
            </div>
        )}
        </div>
    );
    };

class WorkSectionAsGallery extends PureComponent {
    render() {
        const selectedWorks = get(this, 'props.selectedWorks', []); 
        const worksMatrix = selectedWorks.reduce(
            (rows, work, index) =>
              (index % 2 === 0
                ? rows.push([work])
                : rows[rows.length - 1].push(work)) && rows,
            []
          );

        return (
        <div className="col-8 p1 flex flex-wrap">
            {worksMatrix.map((worksGroup, index) =>
            renderGalleryRowTest(worksGroup, index, worksMatrix)
            )}
        </div>
        );
    }
}

WorkSectionAsGallery.propTypes = {
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
}

export default WorkSectionAsGallery;
