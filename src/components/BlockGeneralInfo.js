import React from 'react';
import PropTypes from "prop-types";

import get from 'utils/get';

const BlockGeneralInfo = props => {
  const fields = get(props, 'block.fields');
  const header = get(fields, 'header', '');
  const description = get(fields, 'description', '');
  const design = get(fields, 'design', []);
  const techStack = get(fields, 'techStack', []);
  const contentAlign = get(fields, 'contentAlign', 'Horizontal').toLowerCase();

  return (
    <div className="BlockGeneralInfo case-study-block-container">
      {header && <h1 className="BlockGeneralInfo__header text-case-study-xl mb1_5">{header}</h1>}
      {description && <p className="BlockGeneralInfo__description text-case-study-xs mb1_5">{description}</p>}
      {design.length && (
        <div className={`BlockGeneralInfo__design BlockGeneralInfo__design--${contentAlign} text-case-study-xs`}>
          <p>Design:</p>
          <div className="ml1_5">
            {design.map((text) => <p key={text}>{text}</p>)}
          </div>
        </div>
      )}
      {techStack.length && (
        <div className={`BlockGeneralInfo__tech-stack BlockGeneralInfo__tech-stack--${contentAlign} text-case-study-xs`}>
          <p>Tech Stack:</p>
          <div className="ml1_5">
            {techStack.map((text) => <p key={text}>{text}</p>)}
          </div>
        </div>
      )}
    </div>
  );
};

BlockGeneralInfo.propTypes = {
  block: PropTypes.shape({
    fields: PropTypes.shape({
      header: PropTypes.string,
      description: PropTypes.string,
      design: PropTypes.arrayOf(PropTypes.string),
      techStack: PropTypes.arrayOf(PropTypes.string),
      contentAlign: PropTypes.string
    })
  })
};

export default BlockGeneralInfo;
