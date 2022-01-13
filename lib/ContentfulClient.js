import { createClient } from 'contentful';
import ENV from 'config/Environment';

export default () =>
  createClient({
    space: ENV.CONTENTFUL_SPACE_ID,
    accessToken: ENV.CONTENTFUL_ACCESS_TOKEN,
    host: ENV.CONTENTFUL_HOST
  });
