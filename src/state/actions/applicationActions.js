export const INITIALIZE_APPLICATION = 'INITIALIZE_APPLICATION';
export const initializeApplication = () => dispatch => {
  return dispatch({
    type: INITIALIZE_APPLICATION,
    payload: new Promise((resolve, reject) => {
      const fetchData = Promise.all([]);
      const timeout = new Promise((resolve, reject) => {
        setTimeout(() => reject('Timeout'), 10000);
      });
      const checkTimeout = Promise.race([fetchData, timeout]);

      return checkTimeout
        .then(() =>
          resolve()
        )
        .catch(err => reject(err));
    })
  });
};
