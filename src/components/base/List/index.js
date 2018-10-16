import React from 'react';
import PropTypes from 'prop-types';
import get from 'utils/get';

import './List.scss';

const List = ({ title, listItems }) => {
  const hasListItems = !!(listItems && listItems.length);
  console.log(listItems)

  return (
    <div>
      <h3>{title}</h3>
      <ul>
        {(hasListItems && listItems).map(listItem => (
          <li>
            {listItem.hasLink ? (
              <a href={listItem.url}>{listItem.title}</a>
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