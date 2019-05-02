import React, { PureComponent } from "react";
import get from "utils/get";
import simpleFragmentToListItems from "utils/simpleFragmentToListItems";

import SignUpForm from "components/SignUpForm";

import { SimpleFragment } from "models";

import { List } from "components/base";

import cx from "classnames";
import "./StudioDetailsSection.scss";

class StudioDetailsSection extends PureComponent {
  render() {
    return (
      <div
        className={cx("StudioDetailsSection col-8 pt1", {
          [this.props.className]: !!this.props.className
        })}
      >
        <div className="flex flex-col md:flex-row mb2">
          <div className="col-8 md:col-4 xl:col-6">
            <List
              title={`Recently:`}
              listItems={simpleFragmentToListItems(
                get(this, "props.recentArticles", {})
              )}
            />
          </div>
          <div className="col-8 md:col-4 xl:col-2 order-first md:order-last mb2 lg:mb0">
            <List
              title={`Social Media:`}
              listItems={simpleFragmentToListItems(
                get(this, "props.socialMedia", {})
              )}
            />
          </div>
        </div>
        <div className="flex flex-col xl:flex-row flex-wrap mb2">
          <div className="col-8 xl:col-6 mb2">
            <List
              title={`Work Spaces for Rent:`}
              listItems={simpleFragmentToListItems(
                get(this, "props.workSpaces", {})
              )}
            />
          </div>
          <div className="col-8 xl:col-6 xl:order-last mb2">
            <List
              title={`Available Positions:`}
              listItems={simpleFragmentToListItems(
                get(this, "props.availablePositions", {})
              )}
            />
          </div>
          <div className="col-8 xl:col-2 mb2 xl:mb0">
            <SignUpForm title={`Email Updates:`} />
          </div>
        </div>
      </div>
    );
  }
}

StudioDetailsSection.propTypes = {
  recentArticles: SimpleFragment,
  socialMedia: SimpleFragment,
  workSpaces: SimpleFragment,
  availablePositions: SimpleFragment
};

export default StudioDetailsSection;
