export const isNightMode = (status) => {
  return {
    type: 'SET_NIGHTMODE',
    payload: status
  };
};
