import React from 'react';
import PropTypes from 'prop-types';

import Remarkable from 'react-remarkable';
import cx from 'classnames';

const Markdown = ({ className, src, fontSize = '' }) => (
  <div
    className={cx('Markdown', className, {
      'Markdown--large': fontSize === 'large',
      'Markdown--medium': fontSize === 'medium',
      'Markdown--small': fontSize === 'small'
    })}
  >
    <Remarkable source={src} />
  </div>
);

Markdown.propTypes = {
  className: PropTypes.string,
  src: PropTypes.string,
  fontSize: PropTypes.string
};

export default Markdown;
