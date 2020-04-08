import React from 'react';
import get from 'utils/get';

import BlockGeneralInfo from 'components/BlockGeneralInfo';
import BlockGeneralParagraph from 'components/BlockGeneralParagraph';
import BlockLargeParagraph from 'components/BlockLargeParagraph';
import BlockThreeColumnList from 'components/BlockThreeColumnList';
import BlockImage from 'components/BlockImage';
import BlockImageText from 'components/BlockImageText';
import BlockHero from 'components/BlockHero';

const CaseStudyBlockSwitch = props => {
  const { block } = props;
  const type = get(block, 'sys.contentType.sys.id');

  const Block = type => {
    switch (type) {
      case 'caseStudyBlockGeneralInfo':
        return <BlockGeneralInfo block={block} />;
      case 'caseStudyBlockGeneralParagraph':
        return <BlockGeneralParagraph block={block} />;
      case 'caseStudyBlockLargeParagraph':
        return <BlockLargeParagraph block={block} />;
      case 'caseStudyBlockThreeColumnList':
        return <BlockThreeColumnList block={block} />;
      case 'caseStudyBlockImage':
        return <BlockImage block={block} />;
      case 'caseStudyBlockImageText':
        return <BlockImageText block={block} />;
      case 'caseStudyBlockHero':
        return <BlockHero block={block} />;
      default:
        return null;
    }
  };

  return Block(type);
};

export default CaseStudyBlockSwitch;
