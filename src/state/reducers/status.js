import { FULFILLED, IDLE, PENDING, REJECTED } from 'constants/Status';

const initialState = {
  initializeApplication: IDLE
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'INITIALIZE_APPLICATION_PENDING':
      return { ...state, initializeApplication: PENDING };
    case 'INITIALIZE_APPLICATION_FULFILLED':
      return { ...state, initializeApplication: FULFILLED };
    case 'INITIALIZE_APPLICATION_REJECTED':
      return { ...state, initializeApplication: REJECTED };
    default:
      return state;
  }
};
