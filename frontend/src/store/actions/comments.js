import commentService from '../../services/commentService';

export const getComments = (id) => {
  return async (dispatch) => {
    const userJson = localStorage.getItem('user');

    let token;
    if (userJson) {
      token = JSON.parse(userJson).token;
    }
    const comments = await commentService.getByPost(id, token);

    dispatch({
      type: 'GET_COMMENTS',
      comments,
    });
  };
};

export const sortComments = (sortBy) => {
  return {
    type: 'SORT_COMMENTS',
    sortBy,
  };
};

export const addComment = (id, comment, parentComment) => {
  return async (dispatch) => {
    const userJson = localStorage.getItem('user');
    if (!userJson) {
      return;
    }
    const { username, token } = JSON.parse(userJson);
    const newComment = await commentService.commentOn(
      id,
      { comment, parentComment },
      token
    );
    dispatch({
      type: 'ADD_COMMENT',
      comment: { ...newComment, points: 0, username },
    });
  };
};

export const editComment = (id, comment) => {
  return async (dispatch) => {
    const { username, token } = JSON.parse(localStorage.getItem('user'));
    const newComment = await commentService.editOne(
      id,
      { comment, updatedAt: new Date().toISOString() },
      token
    );
    dispatch({
      type: 'EDIT_COMMENT',
      comment: { ...newComment, username },
    });
  };
};

export const deleteComment = (id) => {
  return async (dispatch) => {
    const { token } = JSON.parse(localStorage.getItem('user'));
    commentService.deleteOne(id, token);
    dispatch({
      type: 'DELETE_COMMENT',
      id,
    });
  };
};

export const voteOnComment = (id, isUpvote, oldVote) => {
  return async (dispatch) => {
    const userJson = localStorage.getItem('user');
    if (!userJson) {
      return 'No user';
    }
    const { token } = JSON.parse(userJson);

    commentService.voteOn(id, isUpvote, token);
    dispatch({ type: 'VOTE_COMMENT', id, isUpvote, oldVote });
  };
};
