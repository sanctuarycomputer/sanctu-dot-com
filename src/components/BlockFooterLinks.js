import React from 'react';
import PropTypes from 'prop-types';

import get from 'utils/get';

const BlockFooterLinks = props => {
  const fields = get(props, 'block.fields');
  const linkText = get(fields, 'linkText', '');
  const link = get(fields, 'link', '');
  const marginBottom = get(fields, 'marginBottom', 0);
  const marginTop = get(fields, 'marginTop', 0);

  return (
    <div
      style={{
        marginBottom: `${marginBottom}rem`,
        marginTop: `${marginTop}rem`
      }}
      className='BlockFooterLinks flex flex-row col-8 md:col-6 mxauto px1 md:px0 py3 md:py0 md:pb7'
    >
      <a 
        className="small link text-decoration-none pr4"
        alt='Visit Sanctuary Computer'
        href='/'
        rel="noopener noreferrer"
      >
        ← Back to Sanctuary
      </a>
      {linkText && link && (
        <span>
          <a
            className="small link"
            alt={linkText}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {linkText}
          </a>
        </span>
      )}
    </div>
  );
};

BlockFooterLinks.propTypes = {
  block: PropTypes.shape({
    fields: PropTypes.shape({
      linkText: PropTypes.string,
      link: PropTypes.string,
      marginBottom: PropTypes.number,
      marginTop: PropTypes.number
    })
  })
};

export default BlockFooterLinks;
