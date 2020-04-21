import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import get from 'utils/get';
import simpleFragmentToListItems from 'utils/simpleFragmentToListItems';
import flattenImageData from 'utils/flattenImageData';
import { SimpleFragment } from 'models';
import { ContentfulMedia } from 'models';

import { Image, List } from 'components/base';
import SanctuLogoBlack from 'assets/sanctu_logo_black.svg';

const BlockFooterWithLists = props => {
  const fields = get(props, 'block.fields');
  const listOne = get(fields, 'listOne.simpleFragments', {});
  const listTwo = get(fields, 'listTwo.simpleFragments', {});
  const listOneTitle = get(fields, 'listOneTitle', '');
  const listTwoTitle = get(fields, 'listTwoTitle', '');
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
          <div className="md:col-3 pb2 md:pb0 md:col-4">
            <List
              title={listOneTitle}
              listItems={simpleFragmentToListItems(listOne)}
            />
          </div>

          <div className="flex md:col-3 md:justify-end pb2 md:pb0 md:col-4 md:pr3">
            <List
              title={listTwoTitle}
              listItems={simpleFragmentToListItems(listTwo)}
            />
          </div>
        </div>
      </div>
      <div className="flex md:flex-row justify-between pt1 md:pt0">
        <>
          <img
            className="BlockFooterWithLists__icon"
            src={SanctuLogoBlack}
            alt="Sanctuary Computer logo"
          />
          <div className="flex justify-end items-end">
            <Link
              className="small link decoration-none"
              aria-label="Visit Sanctuary Computer"
              to="/"
              rel="noopener noreferrer"
            >
              ← Back to Sanctuary
            </Link>
          </div>
        </>
      </div>
    </div>
  );
};

BlockFooterWithLists.propTypes = {
  block: PropTypes.shape({
    fields: PropTypes.shape({
      header: PropTypes.string,
      linkOneImage: ContentfulMedia,
      linkOneText: PropTypes.string,
      linkOne: PropTypes.string,
      linkTwoImage: ContentfulMedia,
      linkTwoText: PropTypes.string,
      linkTwo: PropTypes.string,
      marginBottom: PropTypes.number,
      marginTop: PropTypes.number
    })
  })
};

export default BlockFooterWithLists;
