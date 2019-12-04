import React, { Fragment } from "react";
import get from "utils/get";

const CaseStudyView = ({ model }) => {
  if (!model || model.isError || !model.sys || !model.fields) return <h1>Something went wrong...</h1>;

  return (
    <Fragment>
      CaseStudyView
    </Fragment>
  );
};

export default CaseStudyView;
