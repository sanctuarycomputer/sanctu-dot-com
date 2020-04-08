import React from 'react';
import PropTypes from 'prop-types';

import get from 'utils/get';

const BlockFooterLinks = props => {
  const fields = get(props, 'block.fields');
  const siteLinkText = get(fields, 'siteLinkText', '');
  const siteLink = get(fields, 'siteLink', '');
  const marginBottom = get(fields, 'marginBottom', 0);
  const marginTop = get(fields, 'marginTop', 0);

  return (
    <div
      style={{
        marginBottom: `${marginBottom}rem`,
        marginTop: `${marginTop}rem`
      }}
      className='BlockFooterLinks flex flex-row col-8 md:col-6 px1 pb2 md:px0 md:pb7'
    >
      <span className="BlockFooterLinks__siteLinkText small">← Back Home</span>
      {siteLinkText && siteLink && (
        <span>
          <a
            className="small link underline"
            alt={`Visit ${siteLink}`}
            href={siteLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            {siteLinkText}
          </a>
        </span>
      )}
    </div>
  );
};

BlockFooterLinks.propTypes = {
  block: PropTypes.shape({
    fields: PropTypes.shape({
      siteLinkText: PropTypes.string,
      siteLink: PropTypes.string,
      marginBottom: PropTypes.number,
      marginTop: PropTypes.number
    })
  })
};

export default BlockFooterLinks;
