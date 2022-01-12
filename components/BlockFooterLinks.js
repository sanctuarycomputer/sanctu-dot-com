import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

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
      className="BlockFooterLinks flex flex-row col-8 md:col-5 mxauto px1 md:px0 pb3 md:py0 md:pb15"
    >
      <Link
        className="small link decoration-none pr5"
        aria-label="Visit Sanctuary Computer"
        href="/"
        rel="noopener noreferrer"
      >
        ← Back to Sanctuary
      </Link>
      {linkText && link && (
        <span>
          <Link
            className="small link decoration-none"
            aria-label="Visit next case study"
            href={link}
            rel="noopener noreferrer"
          >
            {linkText} →
          </Link>
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
