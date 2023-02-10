import React from 'react';

import PropTypes from 'prop-types';

import { ContentfulMedia, SimpleFragment } from 'models';

import { Markdown } from 'components/base';
import Work from 'components/Work';

import get from 'utils/get';
import cx from 'classnames';

const WorkGalleryAssetBlock = ({ assetBlock }) => {
  if (!assetBlock) {
    return null;
  }

  const displayFirstAssetAsFullWidth = get(
    assetBlock,
    'fields.displayFirstAssetAsFullWidth',
    true
  );
  const works = get(assetBlock, 'fields.works', []);
  const doubleColumnVerticalAlignment = get(
    assetBlock,
    'fields.doubleColumnVerticalAlignment',
    'bottom'
  );

  return (
    <div className="flex-col pt_5 md:pt1 pr1 pl1">
      {displayFirstAssetAsFullWidth && (
        <>
          <div className="block col-8 mb0 md:mb1 relative">
            <Work work={works[0]} />
          </div>
          <div
            className={cx('flex col-8 pb_5 md:pb1 md:flex-row flex-col', {
              'items-start': doubleColumnVerticalAlignment === 'top',
              'items-end': doubleColumnVerticalAlignment === 'bottom',
            })}
          >
            <div className="block md:col-4 col-8">
              <div className="relative">
                <Work work={works[1]} width="50vw" />
              </div>
            </div>
            <div className="block md:col-4 col-8 md:ml_5 md:ml1">
              <div className="relative">
                <Work work={works[2]} width="50vw" />
              </div>
            </div>
          </div>
        </>
      )}
      {!displayFirstAssetAsFullWidth && (
        <>
          <div
            className={cx('flex col-8 pb0 md:pb1 md:flex-row flex-col', {
              'items-start': doubleColumnVerticalAlignment === 'top',
              'items-end': doubleColumnVerticalAlignment === 'bottom',
            })}
          >
            <div className="block md:col-4 col-8">
              <div className="relative">
                <Work work={works[0]} width="50vw" />
              </div>
            </div>
            <div className="block md:col-4 col-8 md:ml_5 md:ml1">
              <div className="relative">
                <Work work={works[1]} width="50vw" />
              </div>
            </div>
          </div>
          <div className="block col-8 relative">
            <Work work={works[2]} />
          </div>
        </>
      )}
    </div>
  );
};

const WorkGalleryTextBlock = ({ textBlock }) => {
  if (!textBlock) {
    return null;
  }

  const text = get(textBlock, 'fields.text', '');
  return (
    <div>
      {text && (
        <Markdown
          className="WorkSectionAsGallery__work-gallery-text px1_25 py5 md:p13 Markdown--medium"
          src={text}
        />
      )}
    </div>
  );
};

const WorkSectionAsGallery = (props) => {
  const fields = get(props, 'workGallery.fields', {});
  const workGalleryAssetBlocks = get(fields, 'workGalleryAssetBlocks', []);
  const workGalleryTextBlocks = get(fields, 'workGalleryTextBlocks', []);
  const renderAssetBlocksFirst = get(fields, 'renderAssetBlocksFirst', true);

  // In order to render all elements of both arrays, we need to loop an amount equal to the longer of the two arrays.
  const numberOfBlocksToLoopThrough =
    workGalleryAssetBlocks.length > workGalleryTextBlocks.length
      ? [...Array(workGalleryAssetBlocks.length).keys()]
      : [...Array(workGalleryTextBlocks.length).keys()];

  return (
    <div className="WorkSectionAsGallery mt2">
      {numberOfBlocksToLoopThrough.map((index) => {
        return (
          <div key={index}>
            {renderAssetBlocksFirst && (
              <WorkGalleryAssetBlock
                assetBlock={workGalleryAssetBlocks[index]}
              />
            )}
            <WorkGalleryTextBlock textBlock={workGalleryTextBlocks[index]} />
            {!renderAssetBlocksFirst && (
              <WorkGalleryAssetBlock
                assetBlock={workGalleryAssetBlocks[index]}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

const WorkPropType = PropTypes.shape({
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
});

const WorkGalleryTextBlockPropType = PropTypes.shape({
  text: PropTypes.string,
});

const WorkGalleryAssetBlockPropType = PropTypes.shape({
  title: PropTypes.string,
  works: PropTypes.arrayOf(WorkPropType),
  displayFirstAssetAsFullWidth: PropTypes.bool,
});

WorkSectionAsGallery.propTypes = {
  workGallery: PropTypes.shape({
    fields: PropTypes.shape({
      title: PropTypes.string,
      workGalleryAssetBlocks: PropTypes.arrayOf(WorkGalleryAssetBlockPropType),
      workGalleryTextBlocks: PropTypes.arrayOf(WorkGalleryTextBlockPropType),
      renderAssetBlocksFirst: PropTypes.bool,
    }),
  }),
};

export default WorkSectionAsGallery;
