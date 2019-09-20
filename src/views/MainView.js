import React, { Fragment } from "react";
import get from "utils/get";

import IntroSectionImages from "components/IntroSectionImages";
import IntroSectionParagraph from "components/IntroSectionParagraph";
import AboutSection from "components/AboutSection";
import WorkSection from "components/WorkSection";
import Gallery from "components/Gallery";
import Footer from "components/Footer";

const MainView = ({ model }) => {
  if (!model || model.isError) return <h1>Something went wrong...</h1>;

  return (
    <Fragment>
      <div className="flex md:flex-row flex-col">
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
      <div>
        <WorkSection selectedWorks={get(model, "fields.selectedWorks", [])} />
      </div>
      <div>
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
      <Footer />
    </Fragment>
  );
};

export default MainView;
