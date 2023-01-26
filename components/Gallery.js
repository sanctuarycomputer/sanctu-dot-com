import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import get from 'utils/get';
import flattenImageData from 'utils/flattenImageData';

import { Image, Markdown } from 'components/base';

import StudioDetailsSection from 'components/StudioDetailsSection';

class Gallery extends PureComponent {
  renderAttribution = () => {
    return (
      <p className="small pb1 color-gray">
        Images sourced from pubdomordie.com, Jeremy Turner, and ourselves.
      </p>
    );
  };
  renderGalleryRow = (imageGroup, index, imageMatrix) => {
    const imageOne = flattenImageData(imageGroup[0]);
    const imageTwo = flattenImageData(imageGroup[1]);
    const imageOneUrl = imageOne.url;
    const imageTwoUrl = imageTwo.url;

    if (index === imageMatrix.length - 1) {
      return (
        <div
          className="flex flex-col md:flex-row col-8 pb_5 md:pb1"
          key={index}
        >
          <div className="col-8 md:col-4 pr_25 md:pr_5">
            <Image
              className="col-4 md:col-8"
              alt={imageOne.description}
              src={imageOneUrl}
              width={imageOne.width}
              height={imageOne.height}
              sizes="50vw"
            />
            <StudioDetailsSection
              recentArticles={get(this, 'props.recentArticles', {})}
              socialMedia={get(this, 'props.socialMedia', {})}
              openSourceProjects={get(this, 'props.openSourceProjects', {})}
              availablePositions={get(this, 'props.availablePositions', {})}
            />
          </div>
          <div className="col-8 md:col-4 p_25 md:p_5">
            <div className="sticky">
              <Markdown
                src={get(this, 'props.settingExpectations')}
                fontSize="medium"
              />
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="flex col-8 pb_5 md:pb1 items-end" key={index}>
        <div className="block col-4 pr_25 md:pr_5">
          {index === 0 ? this.renderAttribution() : null}
          <Image
            src={imageOneUrl}
            width={imageOne.width}
            height={imageOne.height}
            alt={imageOne.description}
            sizes="50vw"
          />
        </div>
        <div className="block col-4 pl_25 md:pl_5">
          <Image
            src={imageTwoUrl}
            width={imageTwo.width}
            height={imageTwo.height}
            alt={imageTwo.description}
            sizes="50vw"
          />
        </div>
      </div>
    );
  };

  render() {
    const images = get(this, 'props.images', []);

    const imageMatrix = images.reduce(
      (rows, image, index) =>
        (index % 2 === 0
          ? rows.push([image])
          : rows[rows.length - 1].push(image)) && rows,
      []
    );

    return (
      <div className="col-8 p1 flex flex-wrap">
        {imageMatrix.map((imageGroup, index) =>
          this.renderGalleryRow(imageGroup, index, imageMatrix)
        )}
      </div>
    );
  }
}

Gallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      fields: PropTypes.shape({
        file: PropTypes.shape({
          url: PropTypes.string,
        }),
      }),
    })
  ),
};

export default Gallery;
