import React from 'react';
import get from 'utils/get';
import dynamic from 'next/dynamic';

const BlockGeneralInfo = dynamic(() => import('components/BlockGeneralInfo'));
const BlockGeneralParagraph = dynamic(() =>
  import('components/BlockGeneralParagraph')
);
const BlockLargeParagraph = dynamic(() =>
  import('components/BlockLargeParagraph')
);
const BlockThreeColumnList = dynamic(() =>
  import('components/BlockThreeColumnList')
);
const BlockImage = dynamic(() => import('components/BlockImage'));
const BlockImageText = dynamic(() => import('components/BlockImageText'));
const BlockHero = dynamic(() => import('components/BlockHero'));
const BlockVideo = dynamic(() => import('components/BlockVideo'));
const BlockFooterLinks = dynamic(() => import('components/BlockFooterLinks'));
const BlockViewMore = dynamic(() => import('components/BlockViewMore'));
const BlockTwoColumn = dynamic(() => import('components/BlockTwoColumn'));
const BlockThreeColumnHero = dynamic(() =>
  import('components/BlockThreeColumnHero')
);
const BlockFooterWithLists = dynamic(() =>
  import('components/BlockFooterWithLists')
);

const CaseStudyBlockSwitch = (props) => {
  const { block, global } = props;
  const type = get(block, 'sys.contentType.sys.id');

  const Block = (type) => {
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
      case 'caseStudyBlockVideo':
        return <BlockVideo block={block} />;
      case 'caseStudyBlockFooterLinks':
        return <BlockFooterLinks block={block} />;
      case 'caseStudyBlockViewMore':
        return <BlockViewMore block={block} />;
      case 'caseStudyBlockTwoColumn':
        return <BlockTwoColumn block={block} />;
      case 'caseStudyBlockThreeColumnHero':
        return <BlockThreeColumnHero block={block} />;
      case 'caseStudyBlockFooterWithLists':
        return <BlockFooterWithLists block={block} global={global} />;
      default:
        return null;
    }
  };

  return Block(type);
};

export default CaseStudyBlockSwitch;
