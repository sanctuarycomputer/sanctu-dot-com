import React from 'react';
import PropTypes from 'prop-types';
import get from 'utils/get';

import './List.scss';

const List = ({ title, listItems }) => {
  const hasListItems = !!(listItems && listItems.length);
  console.log(listItems)

  return (
    <div className="List">
      <h3 className="small">{title}</h3>
      <ul>
        {(hasListItems && listItems).map(listItem => (
          <li className="small">
            {listItem.hasLink ? (
              <a className="link" href={listItem.url} target="_blank" rel="noopener noreferrer">{listItem.title}</a>
            ) : (
              listItem.title
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default List;