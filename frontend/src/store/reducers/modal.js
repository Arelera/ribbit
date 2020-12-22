const reducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_MODAL':
      return action;
    case 'CLEAR_MODAL':
      return null;
    default:
      return state;
  }
};

export default reducer;
