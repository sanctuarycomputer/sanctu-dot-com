const initialState = {
  isNightMode: false
};

export default (
  state = initialState,
  action
) => {
  switch (action.type) {
    case 'SET_NIGHTMODE':
      return {
        ...state,
        isNightMode: action.payload
      };
    default:
      return state;
  }
};
