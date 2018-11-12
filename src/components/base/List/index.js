import React from 'react';
import PropTypes from 'prop-types';
import get from 'utils/get';

import cx from 'classnames';
import './List.scss';

const List = ({ title, listItems, className }) => {
  const hasListItems = !!(listItems && listItems.length);
  if (!hasListItems) return null;
  return (
    <div className={cx('List', {[className]: !!className})}>
      <h3 className="small">{title}</h3>
      <ul className="ml1_25">
        {(listItems).map(listItem => (
          <li key={get(listItem, 'uuid')} className="small">
            {listItem.hasLink ? (
              <a 
                className="link decoration-none" 
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
  className: null,
  title: '',
  listItems: [],
};

List.propTypes = {
  className: PropTypes.string,
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
