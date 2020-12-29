const reducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_ALL_POSTS':
      if (action.page === 0) {
        return action.posts;
      }
      return [...state, ...action.posts];
    case 'GET_POST_BY_SUB':
      return action.post;
    case 'DELETE_POST':
      return state.filter((post) => post.id !== action.id);
    case 'CLEAR_POSTS':
      return [];
    case 'VOTE_POST':
      const oldVote = action.oldVote;
      const newVote = action.isUpvote;
      let voteChange = 0;
      if (oldVote && oldVote === newVote) {
        voteChange = -newVote;
      } else if (oldVote && oldVote !== newVote) {
        voteChange = 2 * newVote;
      } else if (!oldVote) {
        voteChange = newVote;
      }

      return state.map((post) =>
        post.id === action.id
          ? {
              ...post,
              points: +post.points + voteChange,
              isUpvote: oldVote === newVote ? null : newVote,
            }
          : post
      );
    default:
      return state;
  }
};

export default reducer;
