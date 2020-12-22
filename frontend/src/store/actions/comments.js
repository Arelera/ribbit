import commentService from '../../services/commentService';

export const getComments = (id) => {
  return async (dispatch) => {
    const comments = await commentService.getByPost(id);

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
    const { username, token } = JSON.parse(localStorage.getItem('user'));
    const newComment = await commentService.commentOn(
      id,
      { comment, parentComment },
      token
    );
    dispatch({
      type: 'ADD_COMMENT',
      comment: { ...newComment, username },
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
