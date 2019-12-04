import React from 'react';
import get from 'utils/get';

import BlockGeneralInfo from 'components/BlockGeneralInfo';

const BlockSwitch = props => {
  const { block } = props;
  const type = get(block, 'sys.contentType.sys.id');

  const Block = type => {
    switch (type) {
      case "caseStudyBlockGeneralInfo":
        return <BlockGeneralInfo block={block} />;
      default:
        return null;
    }
  };

  return Block(type);
};

export default BlockSwitch;
