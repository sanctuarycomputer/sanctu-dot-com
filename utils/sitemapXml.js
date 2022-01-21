import get from 'lodash/get';

export default (data, originUrl = 'https://www.sanctuary.computer') => {

  const projectsXML = data.reduce((xml, page) => {
    const pageSlug = get(page, 'fields.slug', '');

    if (!pageSlug || pageSlug === '/style-guide') {
      return xml;
    }

    const projectURL = `${originUrl}${pageSlug}`;
    const lastModified = page.sys.updatedAt.split('T')[0]

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
            <priority>0.50</priority>
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
