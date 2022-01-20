import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import get from 'lodash/get';

const DEFAULT_TITLE = 'SANCTU COMPU - The Safest Place on Earth.';
const DEFAULT_DESCRIPTION =
  'Sanctuary Computer (sanctu • compu) is an artful technology studio in Chinatown, NYC.';
const DEFAULT_IMAGE = "/assets/sanctu-share-card.jpg";

const Meta = ({ model }) => {
  const [origin, setOrigin] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setOrigin(window.location.origin)
    }
  }, [])
  const fields = get(model, 'fields');
  const seoTitle = get(fields, 'seoTitle', DEFAULT_TITLE);
  const seoDescription = get(fields, 'seoDescription', DEFAULT_DESCRIPTION);
  const seoShareCardUrl = get(fields, 'seoShareCard.fields.file.url');
  const seoShareCard = seoShareCardUrl ? `https:${seoShareCardUrl}` :  `${origin}${DEFAULT_IMAGE}`;

  return (
    <Head>
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={seoShareCard} />
      <meta property="og:site_name" content="Sanctuary Computer" />
      <meta property="og:locale" content="en_US" />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={seoShareCard} />
      <meta name="twitter:site" content="@sanctucompu" />
      <meta name="twitter:creator" content="@sanctucompu" />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  );
};

export default Meta;
