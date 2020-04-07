import React from 'react';
import PropTypes from 'prop-types';

import cx from 'classnames';
import simpleFragmentToListItems from 'utils/simpleFragmentToListItems';
import get from 'utils/get';

import { SimpleFragment } from 'models';

import { List } from 'components/base';

const BlockHero = props => {
  const fields = get(props, 'block.fields', {});
  const header = get(fields, 'header', '');
  const description = get(fields, 'description', '');
  const design = get(fields, 'design.simpleFragments', {});
  const techStack = get(fields, 'techStack.simpleFragments', {});
  const collaborators = get(fields, 'collaborators.simpleFragments', {});
  const textAlign = get(fields, 'textAlign', 'Bottom').toLowerCase();
  const marginBottom = get(fields, 'marginBottom', 0);
  const marginTop = get(fields, 'marginTop', 0);

  return (
    <div
      style={{
        marginBottom: `${marginBottom}rem`,
        marginTop: `${marginTop}rem`
      }}
      className="BlockHero p1 flex flex-col"
    >
    <div
      className={cx('col-8 flex flex-col md:flex-row', {
        'md:items-start': textAlign === 'top',
        'md:items-end': textAlign === 'bottom'
      })}
    >
      {header && <h1 className="header col-8 col-4">{header}</h1>}
      {description && (
        <p className="paragraph mt2 md:mt0 col-8 col-4">{description}</p>
      )}
    </div>

      <div className='flex flex-row justify-end my3'>
      <div className="col-4 flex flex-row">
        <div className="col-4 md:col-3">
          <List
            title="Tech Stack:"
            listItems={simpleFragmentToListItems(techStack)}
          />
        </div>
        <div className="col-4 md:col-3 flex justify-end md:justify-start">
          <List
            title="Strategy & Design:"
            listItems={simpleFragmentToListItems(design)}
          />
        </div>
        <div className="col-4 md:col-3 flex justify-end md:justify-start">
          <List
            title="Collaborators:"
            listItems={simpleFragmentToListItems(collaborators)}
          />
        </div>
      </div>
      </div>


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
