import React from 'react';
import PropTypes from 'prop-types';

import get from 'utils/get';

const BlockFooterLinks = props => {
  const fields = get(props, 'block.fields');
  const siteLinkTitle = get(fields, 'siteLinkTitle', '');
  const marginBottom = get(fields, 'marginBottom', 0);
  const marginTop = get(fields, 'marginTop', 0);

  return (
    <div
      style={{
        marginBottom: `${marginBottom}rem`,
        marginTop: `${marginTop}rem`
      }}
      className='BlockFooterLinks flex col-8 md:col-6 px1 pb2 md:px0 md:pb7 mxauto'
    >
      {siteLinkTitle && (
        <p className="BlockFooterLinks__siteLinkTitle paragraph">{siteLinkTitle}</p>
      )}
    </div>
  );
};

BlockFooterLinks.propTypes = {
  block: PropTypes.shape({
    fields: PropTypes.shape({
      siteLinkTitle: PropTypes.string,
      marginBottom: PropTypes.number,
      marginTop: PropTypes.number
    })
  })
};

export default BlockFooterLinks;
