const reducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_ALL_POSTS':
      return action.posts;
    case 'GET_POST_BY_SUB':
      return action.post;
    default:
      return state;
  }
};

export default reducer;
