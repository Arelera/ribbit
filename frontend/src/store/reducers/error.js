const reducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_ERROR':
      return action.error;
    case 'CLEAR_ERROR':
      return null;
    default:
      return state;
  }
};

export default reducer;
