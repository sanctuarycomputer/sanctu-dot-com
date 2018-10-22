import React from 'react';
import PropTypes from 'prop-types';
import get from 'utils/get';

import './List.scss';

const List = ({ title, listItems }) => {
  const hasListItems = !!(listItems && listItems.length);
  return (
    <div className="List">
      <h3 className="small">{title}</h3>
      <ul className="ml1_25">
        {(hasListItems && listItems).map(listItem => (
          <li key={get(listItem, 'uuid')} className="small">
            {listItem.hasLink ? (
              <a 
                className="link" 
                href={listItem.url} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                {get(listItem, 'title')}
              </a>
            ) : (
              listItem.title
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

List.defaultProps = {
  title: '',
  listItems: [],
};

List.propTypes = {
  title: PropTypes.string,
  listItems: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      url: PropTypes.string,
      hasLink: PropTypes.bool,
    })
  )
};

export default List;