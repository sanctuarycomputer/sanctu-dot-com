import React from 'react';
import PropTypes from 'prop-types';

import get from 'utils/get';
import cx from 'classnames';

import { Markdown } from 'components/base';

const BlockTwoColumn = props => {
  const fields = get(props, 'block.fields');
  const header = get(fields, 'header', '');
  const sectionOneTitle = get(fields, 'sectionOneTitle', '');
  const sectionOneText = get(fields, 'sectionOneText', '');
  const sectionTwoTitle = get(fields, 'sectionTwoTitle', '');
  const sectionTwoText = get(fields, 'sectionTwoText', '');
  const sectionThreeTitle = get(fields, 'sectionThreeTitle', '');
  const sectionThreeText = get(fields, 'sectionThreeText', '');
  const sectionFourTitle = get(fields, 'sectionFourTitle', '');
  const sectionFourText = get(fields, 'sectionFourText', '');
  const hideSectionTextOnMobile = get(fields, 'hideSectionTextOnMobile', false);
  const marginBottom = get(fields, 'marginBottom', 0);
  const marginTop = get(fields, 'marginTop', 0);

  return (
    <div
      style={{
        marginBottom: `${marginBottom}rem`,
        marginTop: `${marginTop}rem`
      }}
      className={cx(
        'BlockTwoColumn flex flex-col md:flex-row col-8 xl:col-6 px1 xl:px0 md:pb7 mxauto',
        {
          pb3: !hideSectionTextOnMobile,
          'pt1 pb4': hideSectionTextOnMobile
        }
      )}
    >
      {header && (
        <p className="BlockTwoColumn__header paragraph col-8 md:col-2 pb1 md:pb0 md:pr2">
          {header}
        </p>
      )}
      <div className="flex flex-col col-8 md:col-6">
        <div
          className={cx('flex flex-col md:flex-row', {
            'md:pb2': sectionThreeText
          })}
        >
          {sectionOneText && (
            <div
              className={cx(
                'BlockTwoColumn__paragraph Markdown--small flex flex-col col-8 md:col-4 md:mr1',
                {
                  'pb2 md:pb0': sectionTwoText && !hideSectionTextOnMobile
                }
              )}
            >
              {sectionOneTitle && <p className="pb_5">{sectionOneTitle}</p>}
              <Markdown
                className={cx('BlockTwoColumn__section-text', {
                  'none sm:flex': hideSectionTextOnMobile
                })}
                src={sectionOneText}
                font="small"
              />
            </div>
          )}
          {sectionTwoText && (
            <div
              className={cx(
                'BlockTwoColumn__paragraph Markdown--small flex flex-col col-8 md:col-4 md:pb0',
                {
                  pb2: sectionThreeText && !hideSectionTextOnMobile
                }
              )}
            >
              {sectionTwoTitle && <p className="pb_5">{sectionTwoTitle}</p>}
              <Markdown
                className={cx('BlockTwoColumn__section-text', {
                  'none sm:flex': hideSectionTextOnMobile
                })}
                src={sectionTwoText}
                font="small"
              />
            </div>
          )}
        </div>
        <div className="flex flex-col md:flex-row">
          {sectionThreeText && (
            <div
              className={cx(
                'BlockTwoColumn__paragraph Markdown--small flex flex-col col-8 md:col-4 md:pb0 md:mr1',
                {
                  pb2: sectionFourText && !hideSectionTextOnMobile
                }
              )}
            >
              {sectionThreeTitle && <p className="pb_5">{sectionThreeTitle}</p>}
              <Markdown
                className={cx('BlockTwoColumn__section-text', {
                  'none sm:flex': hideSectionTextOnMobile
                })}
                src={sectionThreeText}
                font="small"
              />
            </div>
          )}
          {sectionFourText && (
            <div className="BlockTwoColumn__paragraph Markdown--small flex flex-col col-8 md:col-4">
              {sectionFourTitle && <p className="pb_5">{sectionFourTitle}</p>}
              <Markdown
                className={cx('BlockTwoColumn__section-text', {
                  'none sm:flex': hideSectionTextOnMobile
                })}
                src={sectionFourText}
                font="small"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

BlockTwoColumn.propTypes = {
  block: PropTypes.shape({
    fields: PropTypes.shape({
      header: PropTypes.string,
      sectionOneTitle: PropTypes.string,
      sectionTwoTitle: PropTypes.string,
      sectionThreeTitle: PropTypes.string,
      sectionFourTitle: PropTypes.string,
      sectionOneText: PropTypes.string,
      sectionTwoText: PropTypes.string,
      sectionThreeText: PropTypes.string,
      sectionFourText: PropTypes.string,
      marginBottom: PropTypes.number,
      marginTop: PropTypes.number
    })
  })
};

export default BlockTwoColumn;
