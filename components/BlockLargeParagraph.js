import React from 'react';
import PropTypes from 'prop-types';

import get from 'utils/get';
import cx from 'classnames';

import { Markdown } from 'components/base';

const BlockLargeParagraph = (props) => {
  const fields = get(props, 'block.fields');
  const description = get(fields, 'description', '');
  const textAlign = get(fields, 'textAlign', 'Center').toLowerCase();
  const marginBottom = get(fields, 'marginBottom', 0);
  const marginTop = get(fields, 'marginTop', 0);

  return (
    <div
      style={{
        marginBottom: `${marginBottom}rem`,
        marginTop: `${marginTop}rem`,
      }}
      className={cx('BlockLargeParagraph flex px1', {
        'md:col-5 mxauto md:px0 pb3': textAlign === 'center',
        'md:justify-end pr1 pb1': textAlign === 'right',
        'md:justify-start pl1 pb1': textAlign === 'left',
      })}
    >
      <div
        className={cx({
          'md:col-4': textAlign === 'right' || textAlign === 'left',
        })}
      >
        {description && (
          <Markdown
            className="BlockLargeParagraph__description paragraph"
            src={description}
          />
        )}
      </div>
    </div>
  );
};

BlockLargeParagraph.propTypes = {
  block: PropTypes.shape({
    fields: PropTypes.shape({
      description: PropTypes.string,
      marginBottom: PropTypes.number,
      marginTop: PropTypes.number,
    }),
  }),
};

export default BlockLargeParagraph;
