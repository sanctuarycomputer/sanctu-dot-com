import React, { Fragment } from 'react';
import get from 'utils/get';

import Meta from 'components/Meta';
import CaseStudyTopNav from 'components/CaseStudyTopNav';
import CaseStudyBlockSwitch from 'components/CaseStudyBlockSwitch';

const CaseStudyView = ({ model }) => {
  if (!model || model.isError) {
    return <h1>Something went wrong...</h1>;
  }

  const caseStudy = model.caseStudy;
  if (!caseStudy.sys || !caseStudy.fields) {
    return <h1>Something went wrong...</h1>;
  }

  return (
    <Fragment>
      <Meta model={caseStudy} />
      <CaseStudyTopNav />
      {get(caseStudy, 'fields.contentBlocks', []).map((block, i) => (
        <CaseStudyBlockSwitch
          key={get(block, 'sys.id', i)}
          block={block}
          global={model.global}
        />
      ))}
    </Fragment>
  );
};

export default CaseStudyView;
