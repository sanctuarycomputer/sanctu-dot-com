import React, { Fragment } from "react";
import get from "utils/get";

import CaseStudyBlockSwitch from 'components/CaseStudyBlockSwitch';

const CaseStudyView = ({ model }) => {
  if (!model || model.isError || !model.sys || !model.fields) return <h1>Something went wrong...</h1>;

  return (
    <Fragment>
      {get(model, 'fields.contentBlocks', []).map((block, i) => (
        <CaseStudyBlockSwitch key={get(block, 'sys.id', i)} block={block}/>
      ))}
    </Fragment>
  );
};

export default CaseStudyView;
