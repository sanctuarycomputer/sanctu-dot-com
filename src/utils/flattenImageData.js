import get from './get';

export default imageFile => {
  if (
    typeof get(imageFile, 'url') === 'string' 
  ) {
    return imageFile;
  }

  return {
    title: get(imageFile, 'fields.title', ''),
    url: get(imageFile, 'fields.file.url', ''),
    description: get(imageFile, 'fields.description', '')
  };
};
