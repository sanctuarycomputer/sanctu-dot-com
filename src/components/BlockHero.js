import React from 'react';
import PropTypes from 'prop-types';

import cx from 'classnames';
import get from 'utils/get';

const BlockHero = props => {
  const fields = get(props, 'block.fields', {});
  const header = get(fields, 'header', '');
  const description = get(fields, 'description', '');
  const textAlign = get(fields, 'textAlign', 'Bottom').toLowerCase();
  const marginBottom = get(fields, 'marginBottom', 0);
  const marginTop = get(fields, 'marginTop', 0);

  return (
    <div
      style={{
        marginBottom: `${marginBottom}rem`,
        marginTop: `${marginTop}rem`
      }}
      className={cx('BlockHero p1 flex flex-col md:flex-row', {
        'md:items-start': textAlign === 'top',
        'md:items-end': textAlign === 'bottom'
      })}
    >
      {header && <h1 className="header md:pr2 col-8 col-4">{header}</h1>}
      {description && (
        <p className="paragraph mt2 md:mt0 col-8 col-4">{description}</p>
      )}
    </div>
  );
};

BlockHero.propTypes = {
  block: PropTypes.shape({
    fields: PropTypes.shape({
      header: PropTypes.string,
      description: PropTypes.string,
      textAlign: PropTypes.string,
      marginTop: PropTypes.number,
      marginBottom: PropTypes.number
    })
  })
};

export default BlockHero;
