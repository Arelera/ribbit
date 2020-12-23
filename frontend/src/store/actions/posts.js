import { sub } from 'date-fns';
import postService from '../../services/postService';

export const getAllPosts = ({ subribbit, sort, t }) => {
  return async (dispatch) => {
    let [timeStart, now] = [null, new Date()];

    if (t === 'today') {
      timeStart = sub(now, { days: 1 });
    } else if (t === 'week') {
      timeStart = sub(now, { weeks: 1 });
    } else if (t === 'month') {
      timeStart = sub(now, { months: 1 });
    } else if (t === 'year') {
      timeStart = sub(now, { years: 1 });
    }

    const posts = await postService.getAll({
      subribbit,
      sort,
      timeStart,
    });
    dispatch({
      type: 'GET_ALL_POSTS',
      posts,
    });
  };
};

export const editPost = (id, content) => {
  return async (dispatch) => {
    const { token } = JSON.parse(localStorage.getItem('user'));
    const post = await postService.editOne(id, content, token);
    dispatch({
      type: 'EDIT_POST',
      post,
    });
  };
};

export const deletePost = (id) => {
  return async (dispatch) => {
    const { token } = JSON.parse(localStorage.getItem('user'));
    await postService.deleteOne(id, token);
    dispatch({ type: 'DELETE_POST', id });
    dispatch({ type: 'CLEAR_MODAL' });
  };
};
