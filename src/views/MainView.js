import React, { Fragment } from 'react';
import get from 'utils/get';

import IntroSection from 'components/IntroSection';
import AboutSection from 'components/AboutSection';

const MainView = ({ model }) => {
  if (!model || model.isError) return <h1>Something went wrong...</h1>;
  
  return (
    <Fragment>
      <IntroSection 
        images={get(model, 'fields.introImages', {})} 
        introParagraph={get(model, 'fields.introParagraph')}
      />
      <AboutSection 
        whatWeDo={get(model, 'fields.whatWeDo.simpleFragments', {})} 
        selectedClients={get(model, 'fields.selectedClients.simpleFragments', {})}
        technologyStack={get(model, 'fields.technologyStack.simpleFragments', {})}
        software={get(model, 'fields.software.simpleFragments', {})}
        collaborators={get(model, 'fields.collaborators.simpleFragments', {})}
      />
    </Fragment>
  )
}

export default MainView;