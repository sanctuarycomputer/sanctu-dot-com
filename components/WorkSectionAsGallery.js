import React from 'react';

import PropTypes from 'prop-types';

import { ContentfulMedia, SimpleFragment } from 'models';

import { Markdown } from 'components/base';
import Work from 'components/Work';

import get from 'utils/get';

const WorkGalleryAssetBlock = ({assetBlock}) => {
  if (!assetBlock) {
    return null; 
  }

  const displayFirstAssetAsFullWidth = get(assetBlock, 'fields.displayFirstAssetAsFullWidth', true);
  const works = get(assetBlock, 'fields.works', []);

  return (
    <div className="flex-col">
      {displayFirstAssetAsFullWidth && 
        <>
          <div className="block col-8 relative">
            <Work work={works[0]}/>
          </div>
          <div className="flex col-8 pb_5 md:pb1 items-end">
            <div className="block col-4 pr_25 md:pr_5">
              <div className="relative">
                <Work work={works[1]}/>
              </div>
            </div>
            <div className="block col-4 pr_25 md:pr_5">
              <div className="relative">
                <Work work={works[2]}/>
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
                <Work work={works[0]}/>
              </div>
            </div>
            <div className="block col-4 pr_25 md:pr_5">
              <div className="relative">
                <Work work={works[1]}/>
              </div>
            </div>
          </div>
          <div className="block col-8 relative">
            <Work work={works[2]}/>
          </div>
        </>
      }
    </div>
  );
}

const WorkGalleryTextBlock = ({textBlock}) => {
  if (!textBlock) {
    return null;
  }

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
        return (
          <div key={index}>
            {renderAssetBlocksFirst && <WorkGalleryAssetBlock assetBlock={workGalleryAssetBlocks[index]}/>}
            <WorkGalleryTextBlock textBlock={workGalleryTextBlocks[index]}/>
            {!renderAssetBlocksFirst && <WorkGalleryAssetBlock assetBlock={workGalleryAssetBlocks[index]}/>}
          </div>
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
    collaborators: SimpleFragment,
    video: ContentfulMedia
  })
}); 

const WorkGalleryTextBlockPropType = PropTypes.shape({
  text: PropTypes.string
})

const WorkGalleryAssetBlockPropType = PropTypes.shape({
  title: PropTypes.string, 
  works: PropTypes.arrayOf(WorkPropType),
  displayFirstAssetAsFullWidth: PropTypes.bool
})

WorkSectionAsGallery.propTypes = {
  workGallery: PropTypes.shape({
    fields: PropTypes.shape({
      title: PropTypes.string, 
      workGalleryAssetBlocks: PropTypes.arrayOf(WorkGalleryAssetBlockPropType),
      workGalleryTextBlocks: PropTypes.arrayOf(WorkGalleryTextBlockPropType),
      renderAssetBlocksFirst: PropTypes.bool
    })
  })
}

export default WorkSectionAsGallery;

