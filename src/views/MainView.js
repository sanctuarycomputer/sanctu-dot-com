import React, { Fragment, PureComponent } from "react";
import get from "utils/get";

import IntroSectionImages from "components/IntroSectionImages";
import IntroSectionParagraph from "components/IntroSectionParagraph";
import AboutSection from "components/AboutSection";
import WorkSection from "components/WorkSection";
import Gallery from "components/Gallery";
import Footer from "components/Footer";
import Overlay from "components/Overlay";

const overlayStartTimeInMinutes =  19 * 60; //7 PM
const overlayEndTimeInMinutes =  7 * 60; //7 AM
let timerID = null;

class MainView extends PureComponent {

  constructor(props) {
    super(props)

    this.state = {
      shouldShowOverlay: this.shouldShowOverlay()
    }
  }

  componentDidMount() {
    timerID = setInterval(() => {
      this.setState({
        shouldShowOverlay: this.shouldShowOverlay()
      })
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(timerID)
  }

  shouldShowOverlay = () => {
    const now = new Date();
    //get time, get hours of date x 60, plus minutes 
    const time = now.getHours() * 60 + now.getMinutes();
    
    const shouldShowOverlay =
      time >= overlayStartTimeInMinutes && time < overlayEndTimeInMinutes;

    return shouldShowOverlay;
  }
  
  render() {
    const model = this.props.model;

    if (!model || model.isError) return <h1>Something went wrong...</h1>;

    return (
      <Fragment>
        <Overlay shouldShowOverlay={ this.state.shouldShowOverlay } />
        <div aria-hidden={ this.state.shouldShowOverlay }
          className="flex md:flex-row flex-col">
          <div className="col-8 flex flex-col sticky-spacer">
            <IntroSectionImages images={get(model, "fields.introImages", {})} />
            <AboutSection
              whatWeDo={get(model, "fields.whatWeDo.simpleFragments", {})}
              selectedClients={get(
                model,
                "fields.selectedClients.simpleFragments",
                {}
              )}
              technologyStack={get(
                model,
                "fields.technologyStack.simpleFragments",
                {}
              )}
              software={get(model, "fields.software.simpleFragments", {})}
              collaborators={get(
                model,
                "fields.collaborators.simpleFragments",
                {}
              )}
            />
          </div>
          <div className="col-8 flex order-first md:order-last">
            <IntroSectionParagraph
              introParagraph={get(model, "fields.introParagraph")}
            />
          </div>
        </div>
        <div aria-hidden={ this.state.shouldShowOverlay }>
          <WorkSection selectedWorks={get(model, "fields.selectedWorks", [])} />
        </div>
        <div aria-hidden={ this.state.shouldShowOverlay }>
          <Gallery
            images={get(model, "fields.gallery", {})}
            settingExpectations={get(model, "fields.settingExpectations")}
            recentArticles={get(
              model,
              "fields.recentArticles.simpleFragments",
              {}
            )}
            socialMedia={get(model, "fields.socialMedia.simpleFragments", {})}
            openSourceProjects={get(model, "fields.openSourceProjects.simpleFragments", {})}
            availablePositions={get(
              model,
              "fields.availablePositions.simpleFragments",
              {}
            )}
          />
        </div>
        <Footer hidden={ this.state.shouldShowOverlay }/>
      </Fragment>
    );
  }

  
};

export default MainView;
