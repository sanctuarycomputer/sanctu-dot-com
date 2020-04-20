import React from 'react';
import PropTypes from 'prop-types';

import get from 'utils/get';
import cx from 'classnames';

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
  const marginBottom = get(fields, 'marginBottom', 0);
  const marginTop = get(fields, 'marginTop', 0);
  const hasTwoRows = sectionOneText && sectionTwoText && sectionThreeText;

  return (
    <div
      style={{
        marginBottom: `${marginBottom}rem`,
        marginTop: `${marginTop}rem`
      }}
      className="BlockTwoColumn flex flex-col md:flex-row col-8 xl:col-6 px1 xl:px0 pb3 mxauto"
    >
      {header && (
        <p className="BlockTwoColumn__header paragraph col-8 md:col-2 pb1 md:pb0 md:pr2">
          {header}
        </p>
      )}
      <div className="flex flex-col col-8 md:col-6">
        <div className="flex flex-col md:flex-row md:pb3">
          {sectionOneText && (
            <div className="BlockTwoColumn__paragraph Markdown--small flex flex-col col-8 md:col-4 pb2 md:pb0 md:mr1">
              {sectionOneTitle && <p className="pb1">{sectionOneTitle}</p>}
              <p>{sectionOneText}</p>
            </div>
          )}
          {sectionTwoText && (
            <div
              className={cx(
                'BlockTwoColumn__paragraph Markdown--small flex flex-col col-8 md:col-4 md:pb0',
                {
                  pb2: hasTwoRows
                }
              )}
            >
              {sectionTwoTitle && <p className="pb1">{sectionTwoTitle}</p>}
              <p>{sectionTwoText}</p>
            </div>
          )}
        </div>
        <div className="flex flex-col md:flex-row">
          {sectionThreeText && (
            <div
              className={cx(
                'BlockTwoColumn__paragraph Markdown--small flex flex-col col-8 md:col-4 md:pb0 md:mr1',
                {
                  pb2: sectionFourText
                }
              )}
            >
              {sectionThreeTitle && <p className="pb1">{sectionThreeTitle}</p>}
              <p>{sectionThreeText}</p>
            </div>
          )}
          {sectionFourText && (
            <div className="BlockTwoColumn__paragraph Markdown--small flex flex-col col-8 md:col-4">
              {sectionFourTitle && <p className="pb1">{sectionFourTitle}</p>}
              <p>{sectionFourText}</p>
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
