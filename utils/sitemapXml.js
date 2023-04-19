import get from 'lodash/get';

export default (data, originUrl = 'https://www.sanctuary.computer') => {
  const projectsXML = data.reduce((xml, page) => {
    const pageSlug = get(page, 'fields.slug', '');

    const contentType = page.sys.contentType.sys.id; //caseStudy or capability

    if (!pageSlug || pageSlug === '/style-guide') {
      return xml;
    }

    let projectURL = `${originUrl}${pageSlug}`;
    if (contentType === 'capability') {
      projectURL = `${originUrl}/capabilities${pageSlug}`;
    }
    let priority = 0.5;
    if (contentType === 'capability') priority = 0.8;
    if (pageSlug === '/capabilities') priority = 0.9;

    const lastModified = page.sys.updatedAt.split('T')[0];

    if (pageSlug === '/') {
      return (
        `
          <url>
            <loc>${originUrl}/</loc>
            <lastmod>${lastModified}</lastmod>
            <priority>1.00</priority>
          </url>
        ` + xml
      );
    } else {
      return (
        xml +
        `
          <url>
            <loc>${projectURL}</loc>
            <lastmod>${lastModified}</lastmod>
            <priority>${priority}</priority>
          </url>
        `
      );
    }
  }, '');

  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${projectsXML}
    </urlset>`;
};
