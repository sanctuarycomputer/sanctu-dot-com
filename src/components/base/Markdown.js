import React from 'react';
import PropTypes from 'prop-types';

import Remarkable from 'react-remarkable';
import cx from 'classnames';

const Markdown = ({ src, fontSize = '' }) => (
  <div className={cx(`Markdown`, {
    'Markdown--medium': fontSize === 'medium',
    'Markdown--small': fontSize === 'small'
  })}>
    <Remarkable source={src} />
  </div>
);

Markdown.propTypes = {
  src: PropTypes.string,
  fontSize: PropTypes.string
};

export default Markdown;