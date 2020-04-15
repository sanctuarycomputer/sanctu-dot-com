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
      <meta name="description" content={seoDescription} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={seoShareCard} />
      <meta property="og:site_name" content="Sanctuary Computer" />
      <meta property="og:locale" content="en_US" />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:seoDescription" content={seoDescription} />
      <meta name="twitter:image" content={seoShareCard} />
      <meta name="twitter:site" content="@sanctucompu" />
      <meta name="twitter:creator" content="@sanctucompu" />
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>
  );
};

export default Meta;
