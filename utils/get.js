import _get from 'lodash/get';

export default (obj, path = '', fallback) => {
  const val = _get(obj, path, fallback);

  if (val === null) return fallback;
  return val;
};
