import React, { Fragment } from 'react';
import get from 'utils/get';

import IntroSection from 'components/IntroSection';

const MainView = ({ model }) => {
  if (!model || model.isError) return <h1>Something went wrong...</h1>;
  
  return (
    <Fragment>
      <IntroSection 
        images={get(model, 'fields.introImages', [])} 
        introParagraph={get(model, 'fields.introParagraph')}
      />
    </Fragment>
  )
}

export default MainView;