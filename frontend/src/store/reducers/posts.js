const reducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_ALL_POSTS':
      return action.posts;
    case 'GET_POST_BY_SUB':
      return action.post;
    case 'EDIT_POST':
      return state.map((post) =>
        post.id === action.post.id ? action.post : post
      );
    case 'DELETE_POST':
      return state.filter((post) => post.id !== action.id);
    default:
      return state;
  }
};

export default reducer;
