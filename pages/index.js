import React, { Fragment, useState, useEffect } from 'react';
import get from 'utils/get';

import ContentfulClient from 'lib/ContentfulClient';
import ContentfulData from 'lib/ContentfulData';

import Meta from 'components/Meta';
import IntroSectionImages from 'components/IntroSectionImages';
import IntroSectionParagraph from 'components/IntroSectionParagraph';
import AboutSection from 'components/AboutSection';
import WorkSection from 'components/WorkSection';
import Gallery from 'components/Gallery';
import Footer from 'components/Footer';
import Overlay from 'components/Overlay';

const dayStartTimeInHours = 7; // 7 AM
const dayEndTimeInHours = 19; // 7 PM
let timerID = null;

const MainView = (props) => {
  const getShouldShowOverlay = () => {
    if (typeof window !== 'undefined') {
      const now = new Date();
      const currentTimeInHours = now.getHours();
  
      return currentTimeInHours < dayStartTimeInHours || currentTimeInHours >= dayEndTimeInHours;
    } else {
      return false;
    }
  };

  const [shouldShowOverlay, setShouldShowOverlay] = useState(false)
  const [windowAndHackerDojoIsAvailable, setWindowAndHackerDojoIsAvailable] = useState(false)
  const [renderContent, setRenderContent] = useState(false)

  const toggleDocumentClass = () => {
    const html = document.documentElement;

    if (shouldShowOverlay) {
      html && html.classList.add('overlay-is-active');
    } else {
      html && html.classList.remove('overlay-is-active');
    }
  };

  const addToggleNightmode = () => {
    if (typeof window !== "undefined" && !!window.HackerDojo) {
      window.HackerDojo.on('enableNightmode', () => {
        setShouldShowOverlay(true)
        clearInterval(timerID);
      });
  
      window.HackerDojo.on('disableNightmode', () => {
        setShouldShowOverlay(false)
        clearInterval(timerID);
      });
    } 
  }

  const getWindowAndHackerDojoIsAvailable = () => {
    if (!windowAndHackerDojoIsAvailable && typeof window !== "undefined" && !!window.HackerDojo) {
      setWindowAndHackerDojoIsAvailable(true)
    }
  }

  useEffect(() => {
    setShouldShowOverlay(getShouldShowOverlay())
    getWindowAndHackerDojoIsAvailable()

    timerID = setInterval(() => {
      setShouldShowOverlay(getShouldShowOverlay())
      getWindowAndHackerDojoIsAvailable()
    }, 1000);

    toggleDocumentClass();
    setRenderContent(true)

    return () => {
      clearInterval(timerID);

      const html = document.documentElement;
      html && html.classList.remove('overlay-is-active');
    }
  }, []);


  useEffect(() => {
    addToggleNightmode()
  }, [addToggleNightmode, windowAndHackerDojoIsAvailable])
  

  useEffect(() => {
    toggleDocumentClass();
  }, [shouldShowOverlay])

  const model = props.model;

  if (!model || model.isError) return <h1>Something went wrong...</h1>;

  return (
    <Fragment>
      <Meta model={model} />
      <Overlay
        socialMedia={get(model, 'fields.socialMedia.simpleFragments', {})}
        shouldShowOverlay={shouldShowOverlay}
      />
      {!shouldShowOverlay && renderContent && (
        <div>
          <div
            aria-hidden={shouldShowOverlay}
            className="flex md:flex-row flex-col"
          >
            <div className="col-8 flex flex-col sticky-spacer">
              <IntroSectionImages images={get(model, 'fields.introImages', {})} />
              <AboutSection
                whatWeDo={get(model, 'fields.whatWeDo.simpleFragments', {})}
                selectedClients={get(
                  model,
                  'fields.selectedClients.simpleFragments',
                  {}
                )}
                technologyStack={get(
                  model,
                  'fields.technologyStack.simpleFragments',
                  {}
                )}
                software={get(model, 'fields.software.simpleFragments', {})}
                collaborators={get(
                  model,
                  'fields.collaborators.simpleFragments',
                  {}
                )}
              />
            </div>
            <div className="col-8 flex order-first md:order-last">
              <IntroSectionParagraph
                introParagraph={get(model, 'fields.introParagraph')}
              />
            </div>
          </div>
          <div aria-hidden={shouldShowOverlay}>
            <WorkSection selectedWorks={get(model, 'fields.selectedWorks', [])} />
          </div>
          <div aria-hidden={shouldShowOverlay}>
            <Gallery
              images={get(model, 'fields.gallery', {})}
              settingExpectations={get(model, 'fields.settingExpectations')}
              recentArticles={get(
                model,
                'fields.recentArticles.simpleFragments',
                {}
              )}
              socialMedia={get(model, 'fields.socialMedia.simpleFragments', {})}
              openSourceProjects={get(
                model,
                'fields.openSourceProjects.simpleFragments',
                {}
              )}
              availablePositions={get(
                model,
                'fields.availablePositions.simpleFragments',
                {}
              )}
            />
          </div>
          <Footer hidden={shouldShowOverlay} />
        </div>
      )}
    </Fragment>
  );
}

export const getStaticProps = async () => {
  const contentful = ContentfulClient();
  ContentfulData.setRef(contentful);

  const model = await ContentfulData.getEntries({
    content_type: 'sanctuary',
    include: 4,
  }).then(res => res.items[0]);

  return {
    props: {
      model
    }
  }
};

export default MainView;
