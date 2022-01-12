import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import get from 'utils/get';
import simpleFragmentToListItems from 'utils/simpleFragmentToListItems';
import { SimpleFragment } from 'models';

import { List } from 'components/base';

const BlockFooterWithLists = props => {
  const fields = get(props, 'block.fields');
  const listOne = get(
    props,
    'global.fields.recentArticles.simpleFragments',
    {}
  );
  const listTwo = get(props, 'global.fields.socialMedia.simpleFragments', {});
  const marginBottom = get(fields, 'marginBottom', 0);
  const marginTop = get(fields, 'marginTop', 0);

  return (
    <div
      style={{
        marginBottom: `${marginBottom}rem`,
        marginTop: `${marginTop}rem`
      }}
      className="BlockFooterWithLists flex flex-col px1 pb1"
    >
      <div className="flex flex-row justify-end">
        <div className="flex flex-col flex-col-reverse md:flex-row col-8 md:col-4">
          <div className="md:col-4 pb2 md:pb0">
            <List
              title={'Recently'}
              listItems={simpleFragmentToListItems(listOne)}
            />
          </div>
          <div className="flex md:col-4 pb2 md:pb0">
            <List
              title={'Social Media'}
              listItems={simpleFragmentToListItems(listTwo)}
            />
          </div>
        </div>
      </div>
      <div className="flex md:flex-row justify-between pt1 md:pt10">
        <div>
          <img
            className="BlockFooterWithLists__icon"
            src='assets/sanctu_logo_black.svg'
            alt="Sanctuary Computer logo"
          />
        </div>
        <div className="flex justify-end items-end">
          <Link
            href="/"
            passHref
          >
            <a 
              className="small link decoration-none"
              aria-label="Visit Sanctuary Computer"
              rel="noopener noreferrer"
            >
              ← Back to Sanctuary
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

BlockFooterWithLists.propTypes = {
  block: PropTypes.shape({
    fields: PropTypes.shape({
      listOne: SimpleFragment,
      listTwo: SimpleFragment,
      listOneTitle: PropTypes.string,
      listTwoTitle: PropTypes.string,
      marginTop: PropTypes.number,
      marginBottom: PropTypes.number
    })
  })
};

export default BlockFooterWithLists;
