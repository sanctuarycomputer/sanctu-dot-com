import React from 'react';
import get from 'utils/get';

import BlockGeneralInfo from 'components/BlockGeneralInfo';
import BlockImage from 'components/BlockImage';
import BlockImageText from 'components/BlockImageText';

const CaseStudyBlockSwitch = props => {
  const { block } = props;
  const type = get(block, 'sys.contentType.sys.id');

  const Block = type => {
    switch (type) {
      case 'caseStudyBlockGeneralInfo':
        return <BlockGeneralInfo block={block} />;
      case 'caseStudyBlockImage':
        return <BlockImage block={block} />;
      case 'caseStudyBlockImageText':
        return <BlockImageText block={block} />;
      default:
        return null;
    }
  };

  return Block(type);
};

export default CaseStudyBlockSwitch;
