import React from 'react';
import PropTypes from 'prop-types';

import get from 'utils/get';
import flattenImageData from 'utils/flattenImageData';
import cx from 'classnames';

import { ContentfulMedia } from 'models';

import { Image } from 'components/base';

const BlockImageText = props => {
  const fields = get(props, 'block.fields');
  const header = get(fields, 'header', '');
  const description = get(fields, 'description', '');
  const descriptionFont = get(
    fields,
    'descriptionFont',
    'sans-serif'
  ).toLowerCase();
  const image = flattenImageData(get(fields, 'image', {}));
  const linkText = get(fields, 'linkText', '');
  const link = get(fields, 'link', '');
  const headerOnTop = get(fields, 'headerOnTop', false);
  const imageTextRatio = get(fields, 'imageTextRatio', '4:4');
  const headerAlign = get(fields, 'headerAlign', 'Left').toLowerCase();
  const headerWidth = get(fields, 'headerWidth', 0);
  const descriptionAlign = get(
    fields,
    'descriptionAlign',
    'Left'
  ).toLowerCase();
  const descriptionWidth = get(fields, 'descriptionWidth', 0);
  const imageTextAlign = get(
    fields,
    'imageTextAlign',
    'Image:Text'
  ).toLowerCase();
  const imageTextAlignOnMobile = get(
    fields,
    'imageTextAlignOnMobile',
    'Image:Text'
  ).toLowerCase();
  const verticalAlign = get(fields, 'verticalAlign', 'Top').toLowerCase();
  const marginBottom = get(fields, 'marginBottom', 0);
  const marginTop = get(fields, 'marginTop', 0);

  return (
    <div
      style={{
        marginBottom: `${marginBottom}rem`,
        marginTop: `${marginTop}rem`
      }}
      className="BlockImageText px1 flex flex-col pb1"
    >
      {header && headerOnTop && (
        <p
          className={cx('mb3 paragraph', {
            'none md:block': headerOnTop
          })}
        >
          {header}
        </p>
      )}
      <div
        className={cx('w100 flex flex-col', {
          'md:flex-row': imageTextAlign === 'image:text',
          'md:flex-row-reverse': imageTextAlign === 'text:image',
          'sm:items-start': verticalAlign === 'top',
          'sm:items-end': verticalAlign === 'bottom',
          'flex-col-reverse': imageTextAlignOnMobile === 'text:image'
        })}
      >
        <div
          className={cx('col-8', {
            'md:col-6': imageTextRatio === '6:2',
            'md:col-5': imageTextRatio === '5:3',
            'md:col-4': imageTextRatio === '4:4',
            'md:col-3': imageTextRatio === '3:5',
            'md:col-2': imageTextRatio === '2:6',
            'md:mr_5': imageTextAlign === 'image:text',
            'md:ml_5': imageTextAlign === 'text:image',
            'mb1 md:mb0': imageTextAlignOnMobile === 'image:text'
          })}
        >
          <Image alt={image.description} src={image.url} />
        </div>
        <div
          className={cx('col-8 flex flex-col', {
            'md:col-2': imageTextRatio === '6:2',
            'md:col-3': imageTextRatio === '5:3',
            'md:col-4': imageTextRatio === '4:4',
            'md:col-5': imageTextRatio === '3:5',
            'md:col-6': imageTextRatio === '2:6',
            'md:ml_5': imageTextAlign === 'image:text',
            'md:mr_5': imageTextAlign === 'text:image',
            'mb1 md:mb0': imageTextAlignOnMobile === 'text:image'
          })}
        >
          {header && (
            <div
              className={cx('mb2 md:mb5', {
                'md:none': headerOnTop,
                'self-center': headerAlign === 'center',
                'self-end': headerAlign === 'right',
                'BlockImageText__header--1': headerWidth === 1,
                'BlockImageText__header--2': headerWidth === 2,
                'BlockImageText__header--3': headerWidth === 3,
                'BlockImageText__header--4': headerWidth === 4,
                'BlockImageText__header--5': headerWidth === 5,
                'BlockImageText__header--6': headerWidth === 6
              })}
            >
              <p className="paragraph">{header}</p>
            </div>
          )}
          <div
            className={cx({
              'self-center': descriptionAlign === 'center',
              'self-end': descriptionAlign === 'right',
              'BlockImageText__description--1': descriptionWidth === 1,
              'BlockImageText__description--2': descriptionWidth === 2,
              'BlockImageText__description--3': descriptionWidth === 3,
              'BlockImageText__description--4': descriptionWidth === 4,
              'BlockImageText__description--5': descriptionWidth === 5,
              'BlockImageText__description--6': descriptionWidth === 6
            })}
          >
            {description && (
              <p
                className={cx({
                  paragraph: descriptionFont === 'serif',
                  small: descriptionFont === 'sans-serif'
                })}
              >
                {description}
              </p>
            )}
            {linkText && link && (
              <div className="mt2">
                <a
                  className="small link underline"
                  alt="Project Link"
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {linkText}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

BlockImageText.propTypes = {
  block: PropTypes.shape({
    fields: PropTypes.shape({
      header: PropTypes.string,
      description: PropTypes.string,
      image: ContentfulMedia,
      linkText: PropTypes.string,
      link: PropTypes.string,
      headerOnTop: PropTypes.bool,
      imageTextRatio: PropTypes.string,
      headerAlign: PropTypes.string,
      headerWidth: PropTypes.number,
      descriptionAlign: PropTypes.string,
      descriptionWidth: PropTypes.number,
      imageTextAlign: PropTypes.string,
      imageTextAlignOnMobile: PropTypes.string,
      marginBottom: PropTypes.number,
      marginTop: PropTypes.number
    })
  })
};

export default BlockImageText;
