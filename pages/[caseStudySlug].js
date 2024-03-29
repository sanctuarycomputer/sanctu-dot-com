import React, { Fragment } from 'react';
import get from 'utils/get';

import ContentfulClient from 'lib/ContentfulClient';

import Meta from 'components/Meta';
import CaseStudyBlockSwitch from 'components/CaseStudyBlockSwitch';

const CaseStudyView = ({ model }) => {
  if (!model || model.isError) {
    return <h1>Something went wrong...</h1>;
  }

  const caseStudy = model.caseStudy;
  if (!caseStudy.sys || !caseStudy.fields) {
    return <h1>Something went wrong...</h1>;
  }

  return (
    <Fragment>
      <Meta model={caseStudy} />
      {get(caseStudy, 'fields.contentBlocks', []).map((block, i) => (
        <CaseStudyBlockSwitch
          key={get(block, 'sys.id', i)}
          block={block}
          global={model.global}
        />
      ))}
    </Fragment>
  );
};

export const getStaticPaths = async () => {
  const contentful = ContentfulClient();
  const caseStudyPages = await contentful
    .getEntries({
      content_type: 'caseStudy',
      select: 'fields.slug',
    })
    .then((res) => res.items);

  // Get the paths we want to pre-render based on generic pages
  const paths = caseStudyPages.map((page) => ({
    params: { caseStudySlug: page.fields.slug.split('/').pop() },
  }));

  // Pre-render these paths at build time, fall back to 404 if not present.
  return { paths, fallback: false };
};

export const getStaticProps = async (ctx) => {
  const caseStudySlug = get(ctx, 'params.caseStudySlug', '');

  if (!caseStudySlug) {
    return {
      props: {
        model: null,
      },
    };
  }

  const contentful = ContentfulClient();
  const model = await Promise.all([
    contentful
      .getEntries({
        content_type: 'caseStudy',
        'fields.slug': `/${caseStudySlug}`,
        include: 4,
      })
      .then((res) => res.items[0]),
    contentful
      .getEntries({
        content_type: 'sanctuary',
        include: 4,
      })
      .then((res) => res.items[0]),
  ]).then((res) => {
    return { caseStudy: res[0], global: res[1] };
  });

  return {
    props: {
      model,
    },
  };
};

export default CaseStudyView;
