import React from 'react';
import { Helmet } from 'react-helmet';
import get from 'lodash/get';

const DEFAULT_TITLE = 'SANCTU COMPU - The Safest Place on Earth.';
const DEFAULT_DESCRIPTION =
  'Sanctuary Computer (sanctu • compu) is an artful technology studio in Chinatown, NYC.';
const DEFAULT_IMAGE = '//www.sanctuary.computer/assets/sanctu-share-card.jpg';

const Meta = ({ model }) => {
  const fields = get(model, 'fields');
  const seoTitle = get(fields, 'seoTitle', DEFAULT_TITLE);
  const seoDescription = get(fields, 'seoDescription', DEFAULT_DESCRIPTION);
  const seoShareCard =
    'https:' + get(fields, 'seoShareCard.fields.file.url', DEFAULT_IMAGE);

  return (
    <Helmet>
      <title>{seoTitle}</title>
      <meta
        name="description"
        content="Sanctuary Computer is committed to offering at least one of our healthcare plans with 100% coverage, indefinitely."
      />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@sanctucompu" />
      <meta name="twitter:title" content="Medicare for All (employees)" />
      <meta
        name="twitter:description"
        content="Sanctuary Computer is committed to offering at least one of our healthcare plans with 100% coverage, indefinitely."
      />
      <meta
        name="twitter:image"
        content="https://m4a.sanctuary.computer/assets/share.jpg"
      />
      <meta property="og:title" content="Medicare for All (employees)" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://staging.sanctuary.computer/" />
      <meta
        property="og:image"
        content="https://m4a.sanctuary.computer/assets/share.jpg"
      />
      <meta
        property="og:description"
        content="Sanctuary Computer is committed to offering at least one of our healthcare plans with 100% coverage, indefinitely."
      />
    </Helmet>
  );
};

export default Meta;
