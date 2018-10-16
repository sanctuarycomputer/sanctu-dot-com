import React, { Fragment } from 'react';
import get from 'utils/get';

import IntroSection from 'components/IntroSection';
import AboutSection from 'components/AboutSection';

const MainView = ({ model }) => {
  if (!model || model.isError) return <h1>Something went wrong...</h1>;
  console.log(model)
  return (
    <Fragment>
      <IntroSection 
        images={get(model, 'fields.introImages', [])} 
        introParagraph={get(model, 'fields.introParagraph')}
      />
      <AboutSection 
        whatWeDo={get(model, 'fields.whatWeDo.simpleFragments', [])} 
      />
    </Fragment>
  )
}

export default MainView;