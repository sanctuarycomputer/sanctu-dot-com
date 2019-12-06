import React from 'react';
import PropTypes from 'prop-types';

import Remarkable from 'react-remarkable';

const Markdown = ({ src, fontSize = '' }) => (
  <div className={`Markdown Markdown--${fontSize}`}>
    <Remarkable source={src} />
  </div>
);

Markdown.propTypes = {
  src: PropTypes.string,
  fontSize: PropTypes.string
};

export default Markdown;