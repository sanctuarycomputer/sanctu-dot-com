import React from 'react';
import PropTypes from 'prop-types';

import Remarkable from 'react-remarkable';

const Markdown = ({ src }) => (
  <div className="Markdown">
    <Remarkable source={src} />
  </div>
);

Markdown.propTypes = {
  src: PropTypes.string
};

export default Markdown;