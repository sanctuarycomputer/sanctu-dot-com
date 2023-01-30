import { Component } from 'react';
import ContentfulClient from 'lib/ContentfulClient';

import get from 'lodash/get';

import sitemapXml from 'utils/sitemapXml';

class Sitemap extends Component {}

export async function getServerSideProps(ctx) {
  const res = ctx.res;

  if (res) {
    const contentful = ContentfulClient();

    const [caseStudyPages, homepage] = await Promise.all([
      contentful
        .getEntries({
          content_type: 'caseStudy',
          select: 'sys.createdAt,sys.updatedAt,fields.slug',
        })
        .then((res) => res.items),
      contentful
        .getEntries({
          content_type: 'sanctuary',
          select: 'sys.createdAt,sys.updatedAt',
        })
        .then((res) => {
          const homepageData = res.items[0];
          homepageData.fields = { slug: '/' };

          return [homepageData];
        }),
    ]);

    const pages = caseStudyPages.concat(homepage);

    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemapXml(pages, `https://${get(ctx, 'req.headers.host', '')}`));
    res.end();
  }

  return {
    props: {},
  };
}

export default Sitemap;
