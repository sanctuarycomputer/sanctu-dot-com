import get from './get';

export default imageFile => {
  if (
    typeof get(imageFile, 'url') === 'string' 
  ) {
    return imageFile;
  }

  const imageUrl = get(imageFile, 'fields.file.url', '')

  return {
    title: get(imageFile, 'fields.title', ''),
    url: imageUrl ? `https:${imageUrl}` : '',
    description: get(imageFile, 'fields.description', ''),
    width: get(imageFile, 'fields.file.details.image.width', undefined),
    height: get(imageFile, 'fields.file.details.image.height', undefined),
  };
};
