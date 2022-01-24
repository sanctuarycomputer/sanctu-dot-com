import get from './get';

export default (imageFile, query) => {
  if (
    typeof get(imageFile, 'url') === 'string' 
  ) {
    return imageFile;
  }

  const imageUrl = get(imageFile, 'fields.file.url', '')
  const sanitizedQuery = query ? Object.entries(query).map((entry) => `&${entry[0]}=${entry[1]}`).join('') : ''
  const webpImageUrl = imageUrl.endsWith('.gif') ? imageUrl : `${imageUrl}?${sanitizedQuery}`

  return {
    title: get(imageFile, 'fields.title', ''),
    url: imageUrl ? `https:${webpImageUrl}` : '',
    description: get(imageFile, 'fields.description', ''),
    width: get(imageFile, 'fields.file.details.image.width', undefined),
    height: get(imageFile, 'fields.file.details.image.height', undefined),
  };
};
