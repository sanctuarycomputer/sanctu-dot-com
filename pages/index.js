import React, { Fragment, PureComponent } from 'react';
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

class MainView extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      shouldShowOverlay: this.shouldShowOverlay()
    };

    if (typeof window !== "undefined" && window.HackerDojo) {
      window.HackerDojo.on('enableNightmode', () => {
        this.setState({
          shouldShowOverlay: true
        });
  
        clearInterval(timerID);
      });
  
      window.HackerDojo.on('disableNightmode', () => {
        this.setState({
          shouldShowOverlay: false
        });
  
        clearInterval(timerID);
      });
    }
  }

  componentDidUpdate() {
    this.toggleDocumentClass();
  }

  componentDidMount() {
    timerID = setInterval(() => {
      this.setState({
        shouldShowOverlay: this.shouldShowOverlay()
      });
    }, 1000);

    this.toggleDocumentClass();
  }

  componentWillUnmount() {
    clearInterval(timerID);

    const html = document.documentElement;
    html && html.classList.remove('overlay-is-active');
  }

  shouldShowOverlay = () => {
    const now = new Date();
    const currentTimeInHours = now.getHours();

    const shouldShowOverlay =
      currentTimeInHours < dayStartTimeInHours ||
      currentTimeInHours >= dayEndTimeInHours;

    return shouldShowOverlay;
  };

  toggleDocumentClass = () => {
    const html = document.documentElement;

    if (this.state.shouldShowOverlay) {
      html && html.classList.add('overlay-is-active');
    } else {
      html && html.classList.remove('overlay-is-active');
    }
  };

  render() {
    const model = this.props.model;

    if (!model || model.isError) return <h1>Something went wrong...</h1>;

    return (
      <Fragment>
        <Meta model={model} />
        {this.state.shouldShowOverlay ? (
          <Overlay
            socialMedia={get(model, 'fields.socialMedia.simpleFragments', {})}
            shouldShowOverlay={this.state.shouldShowOverlay}
          />
        ) : (
          <Fragment>
          <div
            aria-hidden={this.state.shouldShowOverlay}
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
          <div aria-hidden={this.state.shouldShowOverlay}>
            <WorkSection selectedWorks={get(model, 'fields.selectedWorks', [])} />
          </div>
          <div aria-hidden={this.state.shouldShowOverlay}>
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
          <Footer hidden={this.state.shouldShowOverlay} />
          </Fragment>
        )}
      </Fragment>
    );
  }
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
