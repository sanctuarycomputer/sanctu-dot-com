import React, { Fragment } from 'react';
import get from 'utils/get';

import IntroSectionImages from 'components/IntroSectionImages';
import IntroSectionParagraph from 'components/IntroSectionParagraph';
import AboutSection from 'components/AboutSection';

const MainView = ({ model }) => {
  if (!model || model.isError) return <h1>Something went wrong...</h1>;
  
  return (
    <Fragment>
      <div className='flex md:flex-row flex-col'>
        <div className='col-8 flex flex-col'> 
          <IntroSectionImages 
            images={get(model, 'fields.introImages', {})} 
          />
          <AboutSection
            whatWeDo={get(model, 'fields.whatWeDo.simpleFragments', {})}
            selectedClients={get(model, 'fields.selectedClients.simpleFragments', {})}
            technologyStack={get(model, 'fields.technologyStack.simpleFragments', {})}
            software={get(model, 'fields.software.simpleFragments', {})}
            collaborators={get(model, 'fields.collaborators.simpleFragments', {})}
          />
        </div>
        <div className='col-8 flex order-first md:order-last'>
          <IntroSectionParagraph
            introParagraph={get(model, 'fields.introParagraph')}
          />
        </div>
      </div>
    </Fragment>
  )
}

export default MainView;