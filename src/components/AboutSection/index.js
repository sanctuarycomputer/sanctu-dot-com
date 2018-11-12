import React, { PureComponent } from "react";
import get from "utils/get";
import simpleFragmentToListItems from "utils/simpleFragmentToListItems";

import { SimpleFragment } from "models";

import { List } from "components/base";

import cx from "classnames";
import "./AboutSection.scss";

class AboutSection extends PureComponent {
  render() {
    return (
      <div className={cx("AboutSection p1 col-8")}>
        <div className="mb2">
          <List
            title={`What we do:`}
            listItems={simpleFragmentToListItems(
              get(this, "props.whatWeDo", {})
            )}
          />
        </div>
        <div className="flex flex-wrap">
          <div className="col-4 xl:col-2 mb2 xl:mb0 ">
            <List
              title={`Select Clients:`}
              listItems={simpleFragmentToListItems(
                get(this, "props.selectedClients", {})
              )}
            />
          </div>
          <div className="col-4 xl:col-2 mb2 xl:mb0 ">
            <List
              title={`Tech Stack:`}
              listItems={simpleFragmentToListItems(
                get(this, "props.technologyStack", {})
              )}
            />
          </div>
          <div className="col-4 xl:col-2">
            <List
              title={`Software:`}
              listItems={simpleFragmentToListItems(
                get(this, "props.software", {})
              )}
            />
          </div>
          <div className="col-4 xl:col-2">
            <List
              title={`Collaborators:`}
              listItems={simpleFragmentToListItems(
                get(this, "props.collaborators", {})
              )}
            />
          </div>
        </div>
      </div>
    );
  }
}

AboutSection.propTypes = {
  whatWeDo: SimpleFragment,
  selectedClients: SimpleFragment,
  technologyStack: SimpleFragment,
  software: SimpleFragment,
  collaborators: SimpleFragment
};

export default AboutSection;
