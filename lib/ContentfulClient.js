import { createClient } from 'contentful';
import ENV from 'config/Environment';

const ContentfulClient = () =>
  createClient({
    space: ENV.CONTENTFUL_SPACE_ID,
    accessToken: ENV.CONTENTFUL_ACCESS_TOKEN,
    host: ENV.CONTENTFUL_HOST,
  });

export default ContentfulClient;
