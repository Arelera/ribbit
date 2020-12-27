const reducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_COMMENTS':
      return action.comments;
    case 'SORT_COMMENTS':
      return sorter(state, action.sortBy);
    case 'ADD_COMMENT':
      return [{ ...action.comment }, ...state];
    case 'EDIT_COMMENT':
      return state.map((comment) =>
        comment.id === action.comment.id ? action.comment : comment
      );
    case 'DELETE_COMMENT':
      return state.filter((comm) => comm.id !== action.id);
    case 'VOTE_COMMENT':
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

      return state.map((comment) =>
        comment.id === action.id
          ? {
              ...comment,
              points: +comment.points + voteChange,
              isUpvote: oldVote === newVote ? null : newVote,
            }
          : comment
      );
    default:
      return state;
  }
};

const sorter = (array, sortBy) => {
  switch (sortBy) {
    case 'bottom':
      return [...array.sort((a, b) => a.points - b.points)];
    case 'new':
      return [
        ...array.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
      ];
    case 'old':
      return [
        ...array.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)),
      ];
    default:
      return [...array.sort((a, b) => b.points - a.points)];
  }
};

export default reducer;
